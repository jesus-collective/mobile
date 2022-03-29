import Stripe from "stripe"
import JCDB from "../../jcmobileShared/lib/nodejs/JCDB"
import JCStripe from "../../jcmobileShared/lib/nodejs/JCStripe"

export const handler = async (event) => {
  console.log(event)
  try {
    const userID = event.identity.username
    const subscriptionPriceInfo = event.arguments.priceInfo.subscriptionPrices
    const oneOffPriceInfo = event.arguments.priceInfo.oneOffPrices
    const code = event.arguments.priceInfo.coupon
    const idempotency = event.arguments.idempotency

    console.log({ code: code })
    let freeDays = event.arguments.freeDays
    if (freeDays > 90) freeDays = 90
    var stripeCustomerID = event.arguments.stripeCustomerID
    var stripeSubscriptionID = event.arguments.stripeSubscriptionID
    if (stripeCustomerID == null || stripeSubscriptionID == null) {
      const userInfo = await JCDB.getUser(userID)
      console.log(stripeCustomerID)
      console.log(userInfo.stripeCustomerID)
      if (stripeCustomerID == null) stripeCustomerID = userInfo.stripeCustomerID
      if (stripeSubscriptionID == null) stripeSubscriptionID = userInfo.stripeSubscriptionID
    }
    // TODO userID

    // TODO determine if we have a user created in table (User/stripeCustomerID)

    if (stripeCustomerID == null) {
      return { statusCode: "402", error: { message: "No Stripe User" } }
    } else {
      try {
        console.log("Attaching Payment Method")

        await JCStripe.paymentMethodsAttach(event.arguments.paymentMethodId, {
          customer: stripeCustomerID,
        })
      } catch (error: any) {
        console.log(error)
        return { statusCode: "402", error: { message: error.message } }
      }
      try {
        // Change the default invoice settings on the customer to the new payment method
        console.log("UpdatingCustomer Invoice Settings")
        await JCStripe.updateCustomer(
          stripeCustomerID,
          {
            invoice_settings: {
              default_payment_method: event.arguments.paymentMethodId,
            },
          },
          idempotency
        )
      } catch (error: any) {
        console.log(error)
        return { statusCode: "402", error: { message: error.message } }
      }

      // Create the subscription
      try {
        var subscription = null
        if (stripeSubscriptionID == null) {
          var promotionCodes: Stripe.ApiList<Stripe.PromotionCode> = null
          if (code != "")
            promotionCodes = await JCStripe.promotionCodesList({
              active: true,
              code: code,
              limit: 3,
            })
          console.log({ promotionCodes: promotionCodes })

          var promotionCode = ""
          var couponCode = ""
          if (
            promotionCodes != null &&
            promotionCodes &&
            promotionCodes.data &&
            promotionCodes.data.length > 0
          ) {
            promotionCode = promotionCodes.data[0].id
            couponCode = promotionCodes.data[0].coupon.id
          }

          console.log({ promotionCode: promotionCode, couponCode: couponCode })
          if (subscriptionPriceInfo.length > 0) {
            const sub = {
              customer: stripeCustomerID,
              items: subscriptionPriceInfo,
              add_invoice_items: oneOffPriceInfo,
              expand: ["latest_invoice.payment_intent"],
              trial_period_days: freeDays,
            }
            if (promotionCode != "") sub["promotion_code"] = promotionCode
            console.log({ "Creating subscription": sub })
            subscription = await JCStripe.createSubscription(sub, idempotency + "SC")
            await JCDB.updateSubscription(userID, subscription.id)
          } else {
            await Promise.all(
              oneOffPriceInfo.map(async (priceInfo, index) => {
                const sub: Stripe.InvoiceItemCreateParams = {
                  customer: stripeCustomerID,
                  price: priceInfo.price,
                  quantity: priceInfo.quantity,
                }
                console.log({ "Creating invoice": sub })
                await JCStripe.createInvoiceItem(sub, idempotency + "SC" + index)
              })
            )
            const invoiceArgs: Stripe.InvoiceCreateParams = {
              customer: stripeCustomerID,
              auto_advance: true,
            }
            if (promotionCode != "") invoiceArgs.discounts = [{ coupon: couponCode }]
            const finalInvoice = await JCStripe.createInvoice(invoiceArgs, idempotency + "DD")
            console.log({ finalInvoice: finalInvoice })
            const payedInvoice = await JCStripe.payInvoice(finalInvoice.id)
            console.log({ payedInvoice: payedInvoice })
            await JCDB.updateSubscription(userID, "PRODUCTONLY")
            const response = {
              statusCode: 200,
              payedInvoice: payedInvoice,
            }
            return response
          }
        } else {
          var promotionCodes: Stripe.ApiList<Stripe.PromotionCode> = null
          if (code != "")
            promotionCodes = await JCStripe.promotionCodesList({
              active: true,
              code: code,
              limit: 3,
            })
          console.log({ promotionCodes: promotionCodes })
          var promotionCode = ""
          if (
            promotionCodes != null &&
            promotionCodes &&
            promotionCodes.data &&
            promotionCodes.data.length > 0
          ) {
            promotionCode = promotionCodes.data[0].id
            couponCode = promotionCodes.data[0].coupon.id
          }
          console.log({ promotionCode: promotionCode, couponCode: couponCode })
          const sub2 = {
            customer: stripeCustomerID,
            items: subscriptionPriceInfo,
            add_invoice_items: oneOffPriceInfo,
            expand: ["latest_invoice.payment_intent"],
          }
          if (promotionCode != "") sub2["promotion_code"] = promotionCode
          console.log({ "Updating subscription": sub2 })
          subscription = await JCStripe.updateSubscription(
            stripeSubscriptionID,
            sub2,
            idempotency + "SC"
          )
        }

        const response = {
          statusCode: 200,
          subscription: subscription,
        }
        return response
      } catch (error: any) {
        console.log({ ERROR: error })
        return { statusCode: "402", error: { message: error.message } }
      }
    }
  } catch (error: any) {
    console.log(error)
    return { statusCode: "402", error: { message: error.message } }
  }
}
