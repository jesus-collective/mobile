import Stripe from "stripe"
import JCDB from "../../jcmobileShared/lib/nodejs/JCDB"
import JCStripe from "../../jcmobileShared/lib/nodejs/JCStripe"

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}
const handleSubscriptionCreated = async (paymentIntent) => {
  console.log({ paymentIntent: paymentIntent })
  try {
    var customerId = paymentIntent.customer
    var groupsA = []
    // customerId = "cus_IU6NZZETZUjCd2";
    var customer = (await JCStripe.retrieveCustomer(customerId)) as Stripe.Customer
    if (paymentIntent.invoice) {
      var invoice = await JCStripe.retrieveInvoice(paymentIntent.invoice)
      console.log({ invoice: invoice.lines.data })
      groupsA = invoice.lines.data.map((invoiceLine) => {
        console.log(invoiceLine.price)
        if (invoiceLine.price.type == "one_time")
          if (invoiceLine.price.metadata.groups) return invoiceLine.price.metadata.groups.split(",")
      })
    }
    console.log({ customer: customer })
    var userID = customer.metadata.userID
    var groupsB = customer.subscriptions.data.map((item) => {
      console.log({ item: item })
      if (item.status == "active" || item.status == "trialing")
        return item.items.data.map((priceItems) => {
          console.log({ priceItems: priceItems })
          if (priceItems.price.metadata.groups) return priceItems.price.metadata.groups.split(",")
        })
    })
    var groups = [...groupsA, ...groupsB]
    let unique = [...new Set(groups.flat(Infinity))].filter((item) => item !== undefined)
    console.log(unique)
    await JCDB.ensureLogin()
    await asyncForEach(unique, async (group) => {
      try {
        const z = await JCDB.cognitoAddUserToGroup(userID, group)
        console.log(z)
      } catch (e) {
        console.log({ Error: e })
      }
    })
  } catch (e) {
    console.log({ "Login Error": e })
  }
}
export default handleSubscriptionCreated
