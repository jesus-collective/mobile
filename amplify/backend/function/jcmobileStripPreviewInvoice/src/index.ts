import JCDB from "../../jcmobileShared/lib/nodejs/JCDB"
import JCStripe from "../../jcmobileShared/lib/nodejs/JCStripe"

export const handler = async (event) => {
  console.log(event)
  try {
    var stripeCustomerID = event.arguments.stripeCustomerID
    const idempotency = event.arguments.idempotency
    const subscriptionPrices = event.arguments.priceInfo.subscriptionPrices
    const oneOffPrices = event.arguments.priceInfo.oneOffPrices
    console.log({ prsubscriptionPricesices: subscriptionPrices })
    console.log({ oneOffPrices: oneOffPrices })
    const code = event.arguments.priceInfo.coupon
    const userID = event.identity.username
    if (stripeCustomerID == null) {
      const userInfo = await JCDB.getUser(userID)
      console.log(userInfo.stripeCustomerID)
      stripeCustomerID = userInfo.stripeCustomerID
    }
    // TODO userID

    // TODO determine if we have a user created in table (User/stripeCustomerID)
    var invoice
    if (stripeCustomerID != null) {
      var promotionCodes = null
      if (code != "")
        promotionCodes = await JCStripe.promotionCodesList({
          active: true,
          code: code,
          limit: 3,
        })
      console.log({ promotionCodes: promotionCodes })
      var promotionCode = null
      if (
        promotionCodes != null &&
        promotionCodes &&
        promotionCodes.data &&
        promotionCodes.data.length > 0
      )
        promotionCode = promotionCodes.data[0].coupon
      else promotionCode = ""
      console.log({ promotionCode: promotionCode })

      const sub = {
        customer: stripeCustomerID,
        subscription_items: subscriptionPrices,
        invoice_items: oneOffPrices,
        expand: ["lines"],
      }
      if (code != "") sub["coupon"] = promotionCode.id
      try {
        invoice = await JCStripe.retrieveUpcomingInvoices(sub)
        console.log({ invoice: invoice })
      } catch (error: any) {
        console.log({ error: error })
        return { statusCode: "402", error: { message: error.message } }
      }
    } else {
      return { statusCode: "402", error: { message: "Problem Creating User" } }
    }
    const response = {
      statusCode: 200,
      invoice: invoice,
    }
    return response
  } catch (e: any) {
    console.log({ "Login Error": e })
    return { statusCode: "402", error: { message: e.message } }
  }
}
