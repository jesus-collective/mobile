import { CardNumberElement } from "@stripe/react-stripe-js"
import { API } from "aws-amplify"
import GRAPHQL_AUTH_MODE from "aws-amplify-react-native"
import * as mutations from "../../src/graphql/mutations"

export default class HandleStripePayment {
  handleSubmit = async (stripe, elements, idempotency, priceItems, handleComplete) => {
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
    } else {
      console.log("[PaymentMethod]", paymentMethod)
      const paymentMethodId = paymentMethod.id
      if (latestInvoicePaymentIntentStatus === "requires_payment_method") {
        // Update the payment method and retry invoice payment
        const invoiceId = localStorage.getItem("latestInvoiceId")
        this.retryInvoiceWithNewPaymentMethod(
          {
            paymentMethodId,
            invoiceId,
            priceItems,
          },
          handleComplete
        )
      } else {
        // Create the subscription
        this.createSubscription({ paymentMethodId, priceItems, idempotency }, handleComplete)
      }
    }
  }
  handleRequiresPaymentMethod({ subscription, paymentMethodId, priceItems }) {
    if (subscription.status === "active") {
      // subscription is active, no customer actions required.
      return { subscription, priceItems, paymentMethodId }
    } else if (
      subscription.subscription.latest_invoice.payment_intent.status === "requires_payment_method"
    ) {
      // Using localStorage to manage the state of the retry here,
      // feel free to replace with what you prefer.
      // Store the latest invoice ID and status.
      localStorage.setItem("latestInvoiceId", subscription.subscription.latest_invoice.id)
      localStorage.setItem(
        "latestInvoicePaymentIntentStatus",
        subscription.subscription.latest_invoice.payment_intent.status
      )
      throw { error: { message: "Your card was declined." } }
    } else {
      return { subscription, priceItems, paymentMethodId }
    }
  }
  retryInvoiceWithNewPaymentMethod({ paymentMethodId, invoiceId, priceItems }, handleComplete) {
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
            invoice: result,
            paymentMethodId: paymentMethodId,
            priceItems: priceItems,
            isRetry: true,
          }
        })
        // Some payment methods require a customer to be on session
        // to complete the payment process. Check the status of the
        // payment intent to handle these actions.
        .then(this.handlePaymentThatRequiresCustomerAction)
        // No more actions required. Provision your service for the user.
        .then((result) => this.onSubscriptionComplete(result, handleComplete))
        .catch((error) => {
          // An error has happened. Display the failure to the user here.
          // We utilize the HTML element we created.
          this.displayError(error)
        })
    )
  }
  displayError(error) {
    console.log({ error: error })
  }
  createSubscription({ paymentMethodId, priceItems, idempotency }, handleComplete) {
    return (
      API.graphql({
        query: mutations.createSubscription,
        variables: {
          paymentMethodId: paymentMethodId,
          priceInfo: { prices: priceItems },
          idempotency: idempotency,
        },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })
        .then((response) => {
          return response
        })
        // If the card is declined, display an error to the user.
        .then((result) => {
          if (result.error) {
            // The card had an error when trying to attach it to a customer.
            throw result
          }
          return result
        })
        // Normalize the result to contain the object returned by Stripe.
        // Add the additional details we need.
        .then((result) => {
          console.log({ result: result })
          return {
            paymentMethodId: paymentMethodId,
            priceItems: priceItems,
            subscription: result.data.createSubscription.subscription,
          }
        })
        // Some payment methods require a customer to be on session
        // to complete the payment process. Check the status of the
        // payment intent to handle these actions.
        .then(this.handlePaymentThatRequiresCustomerAction)
        // If attaching this card to a Customer object succeeds,
        // but attempts to charge the customer fail, you
        // get a requires_payment_method error.
        .then(this.handleRequiresPaymentMethod)
        // No more actions required. Provision your service for the user.
        .then((result) => this.onSubscriptionComplete(result, handleComplete))
        .catch((error) => {
          console.log(error)
          // An error has happened. Display the failure to the user here.
          // We utilize the HTML element we created.
          // showCardError(error);
        })
    )
  }
  static convertToJSONObj(convertToJson: any) {
    var convertToJson1 = convertToJson.substring(
      convertToJson.indexOf("{") + 1,
      convertToJson.lastIndexOf("}")
    )
    var split1 = convertToJson1.split(",")
    const obj: any = {}
    var map = split1.map((row) => {
      row = row.toLowerCase().replaceAll("[\\[\\]\\{\\}]", "")
      var key = row.split("=", 2)[0].trim()
      var value = row.split("=", 2)[1].trim()
      obj[key] = value
    })
    return obj
  }
  handlePaymentThatRequiresCustomerAction({
    subscription,
    invoice,
    priceItems,
    paymentMethodId,
    isRetry,
  }) {
    if (subscription && subscription.status === "active") {
      // Subscription is active, no customer actions required.
      return { subscription, priceItems, paymentMethodId }
    }
    console.log({ invoice: invoice })
    console.log({ subscription: subscription })
    // If it's a first payment attempt, the payment intent is on the subscription latest invoice.
    // If it's a retry, the payment intent will be on the invoice itself.
    let paymentIntent = invoice
      ? invoice.payment_intent
      : subscription.subscription.latest_invoice.payment_intent

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
        .catch((error) => {
          this.displayError(error)
        })
    } else {
      // No customer action needed.
      return { subscription, priceItems, paymentMethodId }
    }
  }
  async onSubscriptionComplete(result, handleComplete) {
    // Payment was successful.
    console.log({ onSubscriptionComplete: result })
    if (result.subscription.status === "active") {
      handleComplete()

      // Change your UI to show a success message to your customer.
      // Call your backend to grant access to your service based on
      // `result.subscription.items.data[0].price.product` the customer subscribed to.
    }
  }
}
