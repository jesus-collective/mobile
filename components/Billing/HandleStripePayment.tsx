import { GraphQLResult } from "@aws-amplify/api/lib/types"
import { CardNumberElement } from "@stripe/react-stripe-js"
import {
  Stripe,
  StripeCardElement,
  StripeCardNumberElement,
  StripeElements,
  StripeError,
} from "@stripe/stripe-js"
import { CreateSubscriptionMutation, StripePriceInput } from "src/API"
import { Data } from "../../components/Data/Data"
type Subscription = NonNullable<
  NonNullable<NonNullable<GraphQLResult<CreateSubscriptionMutation>>["data"]>["createSubscription"]
>["subscription"]
type Invoice = NonNullable<
  NonNullable<NonNullable<GraphQLResult<CreateSubscriptionMutation>>["data"]>["createSubscription"]
>["payedInvoice"]
export default class HandleStripePayment {
  handleSubmit = async (
    stripe: Stripe,
    elements: StripeElements,
    idempotency: string,
    priceInput: StripePriceInput,
    freeDays: number,
    handleComplete: () => void,
    handleError: (error: Error | StripeError) => void
  ): Promise<void> => {
    console.log("Handle Submit")
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    // event.preventDefault();

    //    const { stripe, elements } = this.props;

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make  sure to disable form submission until Stripe.js has loaded.
      return
    }

    const cardElement = elements.getElement(CardNumberElement)
    // If a previous payment was attempted, get the latest invoice
    const latestInvoicePaymentIntentStatus = localStorage.getItem(
      "latestInvoicePaymentIntentStatus"
    )
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement as StripeCardElement | StripeCardNumberElement,
    })
    //let priceItems = [{ price: "price_1HoU9MLTzrDhiQ927NZpKQjX", quantity: 5 }];

    if (error) {
      console.log("[createPaymentMethod error]", error)
      handleError(error)
    } else {
      console.log("[PaymentMethod]", paymentMethod)
      const paymentMethodId = paymentMethod?.id
      if (latestInvoicePaymentIntentStatus === "requires_payment_method") {
        // Update the payment method and retry invoice payment
        const invoiceId = localStorage.getItem("latestInvoiceId")
        this.retryInvoiceWithNewPaymentMethod(
          {
            stripe,
            paymentMethodId,
            invoiceId,
            priceInput,
          },
          handleComplete,
          handleError
        )
      } else {
        // Create the subscription
        this.createSubscription(
          { stripe, paymentMethodId, priceInput, idempotency, freeDays },
          handleComplete,
          handleError
        )
      }
    }
  }
  handleRequiresPaymentMethod({
    subscription,
    invoice,
    paymentMethodId,
    priceInput,
  }: {
    subscription: Subscription
    invoice: Invoice
    priceInput: StripePriceInput
    paymentMethodId: string | undefined
  }): {
    invoice: Invoice
    subscription: Subscription
    priceInput: StripePriceInput
    paymentMethodId: string | undefined
  } {
    console.log("handleRequiresPaymentMethod")
    if (subscription?.status === "active" || subscription?.status === "trialing") {
      // subscription is active, no customer actions required.
      return { subscription, priceInput, paymentMethodId, invoice }
    } else if (subscription?.latest_invoice?.payment_intent?.status === "requires_payment_method") {
      // Using localStorage to manage the state of the retry here,
      // feel free to replace with what you prefer.
      // Store the latest invoice ID and status.
      localStorage.setItem("latestInvoiceId", subscription.latest_invoice.id ?? "")
      localStorage.setItem(
        "latestInvoicePaymentIntentStatus",
        subscription.latest_invoice.payment_intent.status
      )
      throw { error: { message: "Your card was declined." } }
    } else {
      return { subscription, priceInput, paymentMethodId, invoice }
    }
  }
  retryInvoiceWithNewPaymentMethod(
    {
      stripe,
      paymentMethodId,
      invoiceId,
      priceInput,
    }: {
      stripe: Stripe
      paymentMethodId: string | undefined
      invoiceId: string | null
      priceInput: StripePriceInput
    },
    handleComplete: () => void,
    handleError: (error: Error | StripeError) => void
  ): Promise<void> {
    return (
      fetch("/retry-invoice", {
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          paymentMethodId: paymentMethodId,
          invoiceId: invoiceId,
        }),
      })
        .then((response) => {
          return response
        })
        // If the card is declined, display an error to the user.
        .then((result) => {
          if (result.error) {
            handleError(result?.error ?? { message: "Something went wrong." })
            // The card had an error when trying to attach it to a customer.
            throw result
          }
          return result
        })
        // Normalize the result to contain the object returned by Stripe.
        // Add the additional details we need.
        .then((result) => {
          return {
            // Use the Stripe 'object' property on the
            // returned result to understand what object is returned.
            stripe: stripe,
            invoice: result,
            paymentMethodId: paymentMethodId,
            priceInput: priceInput,
            isRetry: true,
          }
        })
        // Some payment methods require a customer to be on session
        // to complete the payment process. Check the status of the
        // payment intent to handle these actions.
        .then((result) =>
          this.handlePaymentThatRequiresCustomerAction({ ...result, isRetry: false, handleError })
        )
        // No more actions required. Provision your service for the user.
        .then((result) => this.onSubscriptionComplete({ ...result, handleComplete }))
        .catch((error) => {
          // An error has happened. Display the failure to the user here.
          // We utilize the HTML element we created.
          this.displayError(error)
        })
    )
  }
  displayError(error: Error): void {
    console.log({ error: error })
  }
  createSubscription(
    {
      stripe,
      paymentMethodId,
      priceInput,
      idempotency,
      freeDays,
    }: {
      stripe: Stripe
      priceInput: StripePriceInput
      paymentMethodId: string | undefined
      idempotency: string
      freeDays: number
    },
    handleComplete: () => void,
    handleError: (error: any) => void
  ): Promise<void> {
    console.log("Create Subscription")

    return (
      Data.createSubscription({
        paymentMethodId: paymentMethodId,
        priceInfo: priceInput,
        idempotency: idempotency,
        freeDays: freeDays,
      })
        .then((response) => {
          return response
        })
        // If the card is declined, display an error to the user.
        .then((result) => {
          console.log("Error Check")
          if (result.errors) {
            console.log({ resultError: result.errors[0] })
            // The card had an error when trying to attach it to a customer.
            handleError(result?.errors ?? { message: "Something went wrong." })
            throw result
          }
          return result
        })
        // Normalize the result to contain the object returned by Stripe.
        // Add the additional details we need.
        .then(
          (
            result
          ): {
            subscription: Subscription
            stripe: Stripe
            invoice: Invoice
            priceInput: StripePriceInput
            paymentMethodId: string | undefined
          } => {
            console.log("Result Setup")

            console.log({ result: result })
            return {
              stripe: stripe,
              paymentMethodId: paymentMethodId,
              priceInput: priceInput,
              subscription: result.data?.createSubscription?.subscription,
              invoice: result.data?.createSubscription?.payedInvoice,
            }
          }
        )
        // Some payment methods require a customer to be on session
        // to complete the payment process. Check the status of the
        // payment intent to handle these actions.
        .then((result) =>
          this.handlePaymentThatRequiresCustomerAction({
            ...result,
            isRetry: false,
            handleError,
          })
        )
        // If attaching this card to a Customer object succeeds,
        // but attempts to charge the customer fail, you
        // get a requires_payment_method error.
        .then((result) => this.handleRequiresPaymentMethod({ ...result }))
        // No more actions required. Provision your service for the user.
        .then((result) => this.onSubscriptionComplete({ ...result, handleComplete }))
        .catch((error: any) => {
          console.log({ error: error })
          // An error has happened. Display the failure to the user here.
          // We utilize the HTML element we created.
          // showCardError(error);
        })
    )
  }
  static convertToJSONObj(convertToJson: any): Record<string, unknown> {
    const convertToJson1 = convertToJson.substring(
      convertToJson.indexOf("{") + 1,
      convertToJson.lastIndexOf("}")
    )
    const split1 = convertToJson1.split(",")
    const obj: any = {}
    split1.map((row: string) => {
      row = row.toLowerCase().replaceAll("[\\[\\]\\{\\}]", "")
      const key = row.split("=", 2)[0].trim()
      const value = row.split("=", 2)[1].trim()
      obj[key] = value
    })
    return obj
  }
  handlePaymentThatRequiresCustomerAction({
    stripe,
    subscription,
    invoice,
    priceInput,
    paymentMethodId,
    isRetry,
    handleError,
  }: {
    subscription: Subscription
    stripe: Stripe
    invoice: Invoice
    priceInput: StripePriceInput
    paymentMethodId: string | undefined
    isRetry: boolean
    handleError: (error: Error | StripeError) => void
  }): {
    priceInput: StripePriceInput
    subscription: Subscription
    invoice: Invoice
    paymentMethodId: string | undefined
  } {
    console.log("handlePaymentThatRequiresCustomerAction")
    if (invoice) {
      console.log(invoice)
      if (invoice.status === "paid")
        return {
          priceInput: priceInput,
          subscription: subscription,
          invoice: invoice,
          paymentMethodId: paymentMethodId,
        }
    }
    if (
      (subscription && subscription.status === "active") ||
      (subscription && subscription.status === "trialing")
    ) {
      // Subscription is active, no customer actions required.
      return { subscription, priceInput, paymentMethodId, invoice: invoice }
    }
    console.log({ invoice: invoice })

    console.log({ subscription: subscription })
    // If it's a first payment attempt, the payment intent is on the subscription latest invoice.
    // If it's a retry, the payment intent will be on the invoice itself.
    const paymentIntent = invoice
      ? invoice.payment_intent
      : subscription?.latest_invoice?.payment_intent
    if (!paymentIntent?.status) {
      handleError({
        message: "Something went wrong. Please verify your payment information and try again.",
      } as StripeError)
      return
    }
    console.log(paymentIntent.status)
    if (
      paymentIntent.status === "requires_action" ||
      (isRetry === true && paymentIntent.status === "requires_payment_method")
    ) {
      return stripe
        .confirmCardPayment(paymentIntent.client_secret, {
          payment_method: paymentMethodId,
        })
        .then((result) => {
          if (result.error) {
            handleError(result?.error ?? { message: "Something went wrong." })
            // Start code flow to handle updating the payment details.
            // Display error message in your UI.
            // The card was declined (i.e. insufficient funds, card has expired, etc).
            throw result
          } else {
            if (result.paymentIntent.status === "succeeded") {
              // Show a success message to your customer.
              // There's a risk of the customer closing the window before the callback.
              // We recommend setting up webhook endpoints later in this guide.
              return {
                priceInput: priceInput,
                subscription: subscription,
                invoice: invoice,
                paymentMethodId: paymentMethodId,
              }
            }
          }
        })
        .catch((error: any) => {
          handleError(error ?? { message: "Something went wrong." })
          this.displayError(error)
        })
    } else {
      // No customer action needed.
      return { subscription, priceInput, paymentMethodId, invoice: invoice }
    }
  }
  async onSubscriptionComplete({
    priceInput,
    subscription,
    invoice,
    paymentMethodId,
    handleComplete,
  }: {
    priceInput: StripePriceInput
    subscription: Subscription
    invoice: Invoice
    paymentMethodId: string | undefined

    handleComplete: () => void
  }): Promise<void> {
    // Payment was successful.
    console.log({ onSubscriptionComplete: subscription })
    if (invoice?.status == "paid") handleComplete()

    if (subscription?.status === "active" || subscription?.status === "trialing") {
      handleComplete()

      // Change your UI to show a success message to your customer.
      // Call your backend to grant access to your service based on
      // `result.subscription.items.data[0].price.product` the customer subscribed to.
    }
  }
}
