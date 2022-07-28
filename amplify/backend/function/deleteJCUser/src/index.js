/* Amplify Params - DO NOT EDIT
	API_JCMOBILE_GRAPHQLAPIENDPOINTOUTPUT
	API_JCMOBILE_GRAPHQLAPIIDOUTPUT
	AUTH_JCMOBILE_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

import CognitoIdentityServiceProvider from "aws-sdk/clients/cognitoidentityserviceprovider.js"

const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      given_name
      family_name
      email
    }
  }
`
const Cognito = new CognitoIdentityServiceProvider({
  apiVersion: "2016-04-19",
  region: process.env.REGION,
})

const deleteCognitoUser = async (userId) => {
  try {
    const deleteUser = await Cognito.adminDeleteUser({
      userPoolId: process.env.AUTH_JCMOBILE_USERPOOLID,
      Username: userId,
    })
    console.log({ deleteUser })
  } catch (error) {
    console.log({ "failed to delete cognito user": error })
  }
}

export const handler = async (event) => {
  const { userID } = event
  if (!userID) return { statusCode: 400, body: "userID is required" }

  const user = await deleteCognitoUser(userID)
  console.log({ user })
  console.log({ env: process.env })
  console.log({
    API_JCMOBILE_GRAPHQLAPIENDPOINTOUTPUT: process.env.API_JCMOBILE_GRAPHQLAPIENDPOINTOUTPUT,
  })
  console.log({ API_JCMOBILE_GRAPHQLAPIIDOUTPUT: process.env.API_JCMOBILE_GRAPHQLAPIIDOUTPUT })
  console.log({ AUTH_JCMOBILE_USERPOOLID: process.env.AUTH_JCMOBILE_USERPOOLID })
  console.log(`EVENT: ${JSON.stringify(event)}`)
  return {
    statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  },
    body: JSON.stringify("Hello from Lambda!"),
  }
}
