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
async function updateUser(id, field, value) {
  console.log(id)
  console.log(process.env)
  try {
    console.log("Done Auth")
    var queryA = {
      query: mutations.updateUser,
      variables: {
        input: {
          id: id,
          [field]: value,
        },
      },
      authMode: "AMAZON_COGNITO_USER_POOLS",
    }
    console.log(queryA)
    var json = await Amplify.API.graphql(queryA)
    console.log("Done Update Users")
    return true
  } catch (json) {
    if (json && json.data && json.data.getUser) {
      return true
    }
    console.log({ "Error Updating user": json })
    console.log({ "Error Updating user": json.errors })
    console.log({ "Error Updating user": json.errors[0].path })
    console.log({ "Error Updating user": json.errors[0].locations })
    return false
  }
}

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
    const email = event.arguments.email
    const phone = event.arguments.phone
    const firstName = event.arguments.firstName
    const lastName = event.arguments.lastName
    const billingAddress = event.arguments.billingAddress
    const userInfo = await getUser(userID)
    // TODO userID

    // TODO determine if we have a user created in table (User/stripeCustomerID)
    var customer
    if (userInfo.stripeCustomerID == null) {
      customer = await stripe.customers.create(
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
        {
          idempotencyKey: idempotency + "CC",
        }
      )
      const updateUserA = await updateUser(userID, "stripeCustomerID", customer.id)
    } else {
      console.log(userInfo.stripeCustomerID)
      customer = await stripe.customers.update(
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
        {
          idempotencyKey: idempotency + "CC",
        }
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
  } catch (error) {
    console.log(error)
    return { statusCode: "402", error: { message: error.message } }
  }
}
