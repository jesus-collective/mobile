import JCDB from "../../jcmobileShared/lib/nodejs/JCDB"
import JCStripe from "../../jcmobileShared/lib/nodejs/JCStripe"

export const handler = async (event) => {
  console.log(event)

  try {
    const idempotency = event.arguments.idempotency
    let userID
    if (event.identity.claims["cognito:groups"].includes("admin") && event.arguments.userId != null)
      userID = event.arguments.userId
    else userID = event.identity.username
    const email = event.arguments.email
    const phone = event.arguments.phone
    const firstName = event.arguments.firstName
    const lastName = event.arguments.lastName
    const orgName = event.arguments.orgName
    const billingAddress = event.arguments.billingAddress
    const userInfo = await JCDB.getUser(userID)

    var customer
    if (userInfo.stripeCustomerID == null) {
      var concatName
      concatName = firstName + " " + lastName
      customer = await JCStripe.createCustomer(
        {
          name: concatName,
          phone: phone,
          address: billingAddress,
          description: "This is a description",
          email: email,
          metadata: {
            userID: userID,
          },
        },
        idempotency + "CC"
      )
      const updateUserA = await JCDB.updateUser(userID, "stripeCustomerID", customer.id)
    } else {
      console.log(userInfo.stripeCustomerID)
      customer = await JCStripe.updateCustomer(
        userInfo.stripeCustomerID,
        {
          name: firstName + " " + lastName,
          phone: phone,
          address: billingAddress,
          description: "This is a description",
          email: email,
          metadata: {
            userID: userID,
          },
        },
        idempotency + "CC"
      )
    }
    // TODO update stripeCustomerID

    const response = {
      statusCode: 200,
      //  Uncomment below to enable CORS requests
      //  headers: {
      //      "Access-Control-Allow-Origin": "*"
      //  },
      customer: customer,
    }
    return response
  } catch (error: any) {
    console.log(error)
    return { statusCode: "402", error: { message: error.message } }
  }
}
