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

    const idempotency = event.arguments.idempotency
    const userID = event.identity.username

    const userInfo = await getUser(userID)
    console.log(userInfo.stripeCustomerID)
    const stripeCustomerID = userInfo.stripeCustomerID

    // TODO determine if we have a user created in table (User/stripeCustomerID)
    var invoice
    if (stripeCustomerID != null) {
      invoice = await stripe.invoices.list({
        customer: stripeCustomerID,
      })
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
