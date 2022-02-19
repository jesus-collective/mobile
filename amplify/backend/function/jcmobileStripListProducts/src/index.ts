/* Amplify Params - DO NOT EDIT
	AUTH_JCMOBILE_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */
import Stripe from "stripe"
import JCDB from "../../jcmobileShared/lib/nodejs/JCDB"
import JCStripe from "../../jcmobileShared/lib/nodejs/JCStripe"
export const handler = async (event) => {
  // TODO implement
  const idempotency = event.arguments.idempotency
  const amount = event.arguments.amount
  const fund = event.arguments.fund
  const user = await JCDB.getUser(event.identity.username)
  const invoiceItem: Stripe.InvoiceItemCreateParams = {
    customer: user.stripeCustomerID,
    price_data: {
      currency: "cad",
      product: fund,
      unit_amount: amount,
      tax_behavior: "inclusive",
    },
    quantity: 1,
    metadata: { WebDonation: "true" },
  }
  const invoice: Stripe.InvoiceCreateParams = {
    customer: user.stripeCustomerID,
    auto_advance: true,
  }
  if (user.stripeCustomerID) {
    await JCStripe.createInvoiceItem(invoiceItem, idempotency)
    return await JCStripe.createInvoice(invoice, idempotency + "2")
  }
  return null
}
