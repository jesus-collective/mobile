import { GraphQLResult } from "@aws-amplify/api/lib/types"
import { CardNumberElement } from "@stripe/react-stripe-js"
import { Stripe, StripeElements, StripeError } from "@stripe/stripe-js"
import { API } from "aws-amplify"
import GRAPHQL_AUTH_MODE from "aws-amplify-react-native"
import { CreateSubscriptionMutation } from "src/API"
import * as mutations from "../../src/graphql/mutations"
type PriceItems =
  | (
      | {
          price: string | null | undefined
          quantity: number
        }
      | undefined
    )[]
  | undefined
type Subscription = NonNullable<
  NonNullable<NonNullable<GraphQLResult<CreateSubscriptionMutation>>["data"]>["createSubscription"]
>["subscription"]
export default class HandleStripePayment {
  handleSubmit = async (
    stripe: Stripe,
    elements: StripeElements,
    idempotency: string,
    priceItems: PriceItems,
    freeDays: number,
    handleComplete: () => void,
    handleError: (error: Error | StripeError) => void
  ) => {
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
    const { error, paymentMethod } = await stripe.createPaymentMethod(
      {
        type: "card",
        card: cardElement,
      },
      {
        idempotency_key: idempotency + "CPM",
      }
    )
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
            priceItems,
          },
          handleComplete,
          handleError
        )
      } else {
        // Create the subscription
        this.createSubscription(
          { stripe, paymentMethodId, priceItems, idempotency, freeDays },
          handleComplete,
          handleError
        )
      }
    }
  }
  handleRequiresPaymentMethod({
    subscription,
    paymentMethodId,
    priceItems,
  }: {
    subscription: Subscription
    priceItems: PriceItems
    paymentMethodId: string | undefined
  }) {
    if (subscription?.status === "active" || subscription?.status === "trialing") {
      // subscription is active, no customer actions required.
      return { subscription, priceItems, paymentMethodId }
    } else if (subscription?.latest_invoice?.payment_intent?.status === "requires_payment_method") {
      // Using localStorage to manage the state of the retry here,
      // feel free to replace with what you prefer.
      // Store the latest invoice ID and status.
      localStorage.setItem("latestInvoiceId", subscription.latest_invoice.id)
      localStorage.setItem(
        "latestInvoicePaymentIntentStatus",
        subscription.latest_invoice.payment_intent.status
      )
      throw { error: { message: "Your card was declined." } }
    } else {
      return { subscription, priceItems, paymentMethodId }
    }
  }
  retryInvoiceWithNewPaymentMethod(
    {
      stripe,
      paymentMethodId,
      invoiceId,
      priceItems,
    }: {
      stripe: Stripe
      invoiceId: string | null
      priceItems: PriceItems
      paymentMethodId: string | undefined
    },
    handleComplete: () => void,
    handleError: (error: Error | StripeError) => void
  ) {
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
            priceItems: priceItems,
            isRetry: true,
          }
        })
        // Some payment methods require a customer to be on session
        // to complete the payment process. Check the status of the
        // payment intent to handle these actions.
        .then((result) => this.handlePaymentThatRequiresCustomerAction({ ...result, handleError }))
        // No more actions required. Provision your service for the user.
        .then((result) => this.onSubscriptionComplete(result, handleComplete))
        .catch((error) => {
          // An error has happened. Display the failure to the user here.
          // We utilize the HTML element we created.
          this.displayError(error)
        })
    )
  }
  displayError(error: Error) {
    console.log({ error: error })
  }
  createSubscription(
    {
      stripe,
      paymentMethodId,
      priceItems,
      idempotency,
      freeDays,
    }: {
      stripe: Stripe
      priceItems: PriceItems
      paymentMethodId: string | undefined
      idempotency: string
      freeDays: number
    },
    handleComplete: () => void,
    handleError: (error: any) => void
  ) {
    return (
      (API.graphql({
        query: mutations.createSubscription,
        variables: {
          paymentMethodId: paymentMethodId,
          priceInfo: { prices: priceItems },
          idempotency: idempotency,
          freeDays: freeDays,
        },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      }) as Promise<GraphQLResult<CreateSubscriptionMutation>>)
        .then((response) => {
          return response
        })
        // If the card is declined, display an error to the user.
        .then((result) => {
          if (result.errors) {
            // The card had an error when trying to attach it to a customer.
            handleError(result?.errors ?? { message: "Something went wrong." })
            throw result
          }
          return result
        })
        // Normalize the result to contain the object returned by Stripe.
        // Add the additional details we need.
        .then((result) => {
          console.log({ result: result })
          return {
            stripe: stripe,
            paymentMethodId: paymentMethodId,
            priceItems: priceItems,
            subscription: result.data.createSubscription.subscription,
          }
        })
        // Some payment methods require a customer to be on session
        // to complete the payment process. Check the status of the
        // payment intent to handle these actions.
        .then((result) => this.handlePaymentThatRequiresCustomerAction({ ...result, handleError }))
        // If attaching this card to a Customer object succeeds,
        // but attempts to charge the customer fail, you
        // get a requires_payment_method error.
        .then((result) => this.handleRequiresPaymentMethod({ ...result }))
        // No more actions required. Provision your service for the user.
        .then((result) => this.onSubscriptionComplete(result, handleComplete))
        .catch((error: any) => {
          console.log(error)
          // An error has happened. Display the failure to the user here.
          // We utilize the HTML element we created.
          // showCardError(error);
        })
    )
  }
  static convertToJSONObj(convertToJson: any) {
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
    priceItems,
    paymentMethodId,
    isRetry,
    handleError,
  }: {
    subscription: Subscription
    stripe: Stripe
    priceItems: PriceItems
    paymentMethodId: string | undefined
    isRetry: boolean
    handleError: (error: Error | StripeError) => void
  }) {
    if (
      (subscription && subscription.status === "active") ||
      (subscription && subscription.status === "trialing")
    ) {
      // Subscription is active, no customer actions required.
      return { subscription, priceItems, paymentMethodId }
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
                priceItems: priceItems,
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
      return { subscription, priceItems, paymentMethodId }
    }
  }
  async onSubscriptionComplete(result, handleComplete: () => void) {
    // Payment was successful.
    console.log({ onSubscriptionComplete: result })
    if (result.subscription.status === "active" || result.subscription.status === "trialing") {
      handleComplete()

      // Change your UI to show a success message to your customer.
      // Call your backend to grant access to your service based on
      // `result.subscription.items.data[0].price.product` the customer subscribed to.
    }
  }
}
