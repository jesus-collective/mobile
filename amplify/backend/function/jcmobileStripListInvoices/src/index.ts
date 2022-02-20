import JCDB from "../../jcmobileShared/lib/nodejs/JCDB"
import JCStripe from "../../jcmobileShared/lib/nodejs/JCStripe"

export const handler = async (event) => {
  console.log(event)

  try {
    const idempotency = event.arguments.idempotency
    const userID = event.identity.username

    const userInfo = await JCDB.getUser(userID)
    console.log(userInfo.stripeCustomerID)
    const stripeCustomerID = userInfo.stripeCustomerID
    // TODO determine if we have a user created in table (User/stripeCustomerID)
    var invoice
    if (stripeCustomerID != null) {
      invoice = await JCStripe.listInvoices(stripeCustomerID)
      console.log(invoice)
    } else
      return {
        statusCode: 400,
        data: invoice.data,
      }
    const response = {
      statusCode: 200,
      data: invoice.data,
    }
    return response
  } catch (e) {
    console.log({ "Login Error": e })
  }
}
