/* Amplify Params - DO NOT EDIT
	API_ADMINQUERIES_APIID
	API_ADMINQUERIES_APINAME
	API_JCMOBILE_GRAPHQLAPIENDPOINTOUTPUT
	API_JCMOBILE_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */ /*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/
import awsServerlessExpressMiddleware from "aws-serverless-express/middleware"
import bodyParser from "body-parser"
import express from "express"
import handlePaymentIntentSucceeded from "./handlePaymentIntentSucceeded"
import handleSubscriptionCreated from "./handleSubscriptionCreated"
// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

app.post("/webhook", bodyParser.raw({ type: "application/json" }), async (request, response) => {
  let event

  try {
    event = request.body
  } catch (err: any) {
    response.status(400).send(`Webhook Error: ${err.message}`)
  }
  console.log({ eventBody: event })
  // Handle the event
  switch (event.type) {
    case "customer.subscription.created":
      const subscriptionCreated = event.data.object
      await handleSubscriptionCreated(subscriptionCreated)
      break
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object
      await handlePaymentIntentSucceeded(paymentIntent)
      // Then define and call a method to handle the successful payment intent.
      // handlePaymentIntentSucceeded(paymentIntent);
      break
    case "payment_method.attached":
      const paymentMethod = event.data.object
      // Then define and call a method to handle the successful attachment of a PaymentMethod.
      // handlePaymentMethodAttached(paymentMethod);
      break
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`)
  }

  // Return a response to acknowledge receipt of the event
  response.json({ received: true })
})

app.listen(3000, () => {
  console.log("App started")
})

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
export default app
