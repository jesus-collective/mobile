import Stripe from "stripe"
import JCDB from "../../jcmobileShared/lib/nodejs/JCDB"
import JCStripe from "../../jcmobileShared/lib/nodejs/JCStripe"

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}
const runIt = async (paymentIntent) => {
  console.log(paymentIntent)

  try {
    var customerId = paymentIntent.customer
    // customerId = "cus_IU6NZZETZUjCd2";
    var customer = (await JCStripe.retrieveCustomer(customerId)) as Stripe.Customer
    console.log(customer)
    var userID = customer.metadata.userID
    var groups = customer.subscriptions.data.map((item) => {
      console.log(item)
      if (item.status == "active" || item.status == "trialing")
        return item.items.data.map((priceItems) => {
          console.log(priceItems)
          if (priceItems.price.metadata.groups) return priceItems.price.metadata.groups.split(",")
        })
    })
    let unique = [...new Set(groups.flat(Infinity))].filter((item) => item !== undefined)
    console.log(unique)
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
export default runIt
