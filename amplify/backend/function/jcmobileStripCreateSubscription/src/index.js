/* Amplify Params - DO NOT EDIT
	API_JCMOBILE_GRAPHQLAPIENDPOINTOUTPUT
	API_JCMOBILE_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */
"use strict"

const Amplify = require("aws-amplify")
global.fetch = require("node-fetch")
const queries = require("./queries")
const mutations = require("./mutations")
Amplify.default.configure({
  aws_appsync_graphqlEndpoint: process.env.API_JCMOBILE_GRAPHQLAPIENDPOINTOUTPUT,
  aws_appsync_region: process.env.region,
  aws_appsync_authenticationType: "AMAZON_COGNITO_USER_POOLS",
  Auth: {
    mandatorySignIn: false,
    region: process.env.region,
    userPoolId: process.env.userPoolId,
    identityPoolRegion: process.env.region,
    userPoolWebClientId: process.env.userPoolWebClientId,
    identityPoolId: process.env.identityPoolId,
  },
})
async function getUser(id) {
  try {
    console.log("Done Auth")

    var json = await Amplify.API.graphql({
      query: queries.getUser,
      variables: { id: id },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    })
    console.log("Done Get Users")
    const email = json.data.getUser.email
    const stripeCustomerID = json.data.getUser.stripeCustomerID
    const name = json.data.getUser.given_name + " " + json.data.getUser.family_name
    return { stripeCustomerID: stripeCustomerID, email: email, name: name }
  } catch (json) {
    if (json && json.data && json.data.getUser) {
      const email = json.data.getUser.email
      const stripeCustomerID = json.data.getUser.stripeCustomerID
      const name = json.data.getUser.given_name + " " + json.data.getUser.family_name
      return { stripeCustomerID: stripeCustomerID, email: email, name: name }
    }
    console.log({ "Error getting user": json })
    return null
  }
}

async function updateSubscription(id, subscriptionID) {
  try {
    console.log("Done Auth")

    var json = await Amplify.API.graphql({
      query: mutations.updateUser,
      variables: {
        input: {
          id: id,
          stripeSubscriptionID: subscriptionID,
        },
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    })
    console.log("Done Update Subscription")

    return true
  } catch (json) {
    console.log({ "Error updating user": json })
    return false
  }
}

exports.handler = async (event) => {
  console.log(event)

  var AWS = require("aws-sdk"),
    region = "us-east-1",
    secretName = "jcmobile/" + process.env.ENV + "/lamdaSecrets",
    secret,
    decodedBinarySecret

  // Create a Secrets Manager client
  var client = new AWS.SecretsManager({
    region: region,
  })
  try {
    const data = await client.getSecretValue({ SecretId: secretName }).promise()

    if ("SecretString" in data) {
      secret = JSON.parse(data.SecretString)
    } else {
      let buff = new Buffer(data.SecretBinary, "base64")
      decodedBinarySecret = buff.toString("ascii")
    }
    console.log("Loading Secret Done")

    await Amplify.Auth.signIn(secret.userName, secret.password)
    const currentSession = await Amplify.Auth.currentSession()
    Amplify.default.configure({
      Authorization: currentSession.getIdToken().getJwtToken(),
    })
    console.log("Logged in")

    const stripe = require("stripe")(secret.stripeSecret, {
      maxNetworkRetries: 5,
    })
    const userID = event.identity.username
    const priceInfo = event.arguments.priceInfo.prices
    let freeDays = event.identity.freeDays
    if (freeDays > 90) freeDays = 90
    var stripeCustomerID = event.arguments.stripeCustomerID
    var stripeSubscriptionID = event.arguments.stripeSubscriptionID
    if (stripeCustomerID == null || stripeSubscriptionID == null) {
      const userInfo = await getUser(userID)
      console.log(userInfo.stripeCustomerID)
      if (stripeCustomerID == null) stripeCustomerID = userInfo.stripeCustomerID
      if (stripeSubscriptionID == null) stripeSubscriptionID = userInfo.stripeSubscriptionID
    }
    // TODO userID

    // TODO determine if we have a user created in table (User/stripeCustomerID)

    if (stripeCustomerID == null) {
      return { statusCode: "402", error: { message: "No Stripe User" } }
    } else {
      const idempotency = event.arguments.idempotency
      try {
        console.log("Attaching Payment Method")

        await stripe.paymentMethods.attach(event.arguments.paymentMethodId, {
          customer: stripeCustomerID,
        })
      } catch (error) {
        console.log(error)
        return { statusCode: "402", error: { message: error.message } }
      }
      try {
        // Change the default invoice settings on the customer to the new payment method
        console.log("UpdatingCustomer Invoice Settings")
        await stripe.customers.update(stripeCustomerID, {
          invoice_settings: {
            default_payment_method: event.arguments.paymentMethodId,
          },
        })
      } catch (error) {
        console.log(error)
        return { statusCode: "402", error: { message: error.message } }
      }
      console.log("Creating subscription")
      // Create the subscription
      try {
        var subscription = null
        if (stripeSubscriptionID == null) {
          subscription = await stripe.subscriptions.create(
            {
              customer: stripeCustomerID,
              items: priceInfo,
              expand: ["latest_invoice.payment_intent"],
              trial_period_days: freeDays,
            },
            {
              idempotencyKey: idempotency + "SC",
            }
          )
          await updateSubscription(stripeCustomerID, subscription.id)
        } else {
          subscription = await stripe.subscriptions.update(
            stripeSubscriptionID,
            {
              customer: stripeCustomerID,
              items: priceInfo,
              expand: ["latest_invoice.payment_intent"],
            },
            {
              idempotencyKey: idempotency + "SC",
            }
          )
        }
        const response = {
          statusCode: 200,
          subscription: subscription,
        }
        return response
      } catch (error) {
        console.log(error)
        return { statusCode: "402", error: { message: error.message } }
      }
    }
  } catch (error) {
    console.log(error)
    return { statusCode: "402", error: { message: error.message } }
  }
}
