/* Amplify Params - DO NOT EDIT
	ANALYTICS_THEMEETINGHOUSE_ID
	ANALYTICS_THEMEETINGHOUSE_REGION
	ENV
	REGION
Amplify Params - DO NOT EDIT */
import * as aws from "aws-sdk"

async function getUsers(nextToken) {
  const cognito = new aws.CognitoIdentityServiceProvider()
  var params = {
    UserPoolId: process.env.AUTH_JCMOBILE_USERPOOLID,
    Limit: 60,
    PaginationToken: nextToken,
  }
  const users = await cognito.listUsers(params).promise()

  return users
}

async function getAllUsers() {
  var allUsers: aws.CognitoIdentityServiceProvider.UsersListType = []
  var users: aws.CognitoIdentityServiceProvider.ListUsersResponse
  var nextToken = null
  do {
    users = await getUsers(nextToken)
    allUsers.push(...users.Users)
    nextToken = users.PaginationToken
  } while (users.PaginationToken != null)

  return allUsers
}

async function getInactiveEndpoints(user) {
  const pinpoint = new aws.Pinpoint({ apiVersion: "2016-12-01" })
  var params: aws.Pinpoint.GetUserEndpointsRequest = {
    ApplicationId: process.env.ANALYTICS_JCMOBILE_ID,
    UserId: user.Attributes.filter((e) => e.Name == "sub")[0].Value,
  }
  const endpoints = await pinpoint.getUserEndpoints(params).promise()
  const inactiveEndpoints = endpoints.EndpointsResponse.Item.filter(
    (e) => e.EndpointStatus == "INACTIVE"
  )
  console.log({ inactiveEndpoints: inactiveEndpoints })
  return inactiveEndpoints
}
async function deleteEndpoint(endpointId) {
  const pinpoint = new aws.Pinpoint({ apiVersion: "2016-12-01" })
  var params: aws.Pinpoint.DeleteEndpointRequest = {
    ApplicationId: process.env.ANALYTICS_JCMOBILE_ID,
    EndpointId: endpointId,
  }
  const endpoint = await pinpoint.deleteEndpoint(params).promise()
  return endpoint
}
export const handler = async (event) => {
  console.log({ ANALYTICS_JCMOBILE_ID: process.env.ANALYTICS_JCMOBILE_ID })

  try {
    const allUsers = await getAllUsers()
    const map = allUsers.map(async (user) => {
      try {
        console.log({ user: user.Attributes.filter((e) => e.Name == "sub")[0].Value })
        const inactiveEndpoints = await getInactiveEndpoints(user)
        const map2 = inactiveEndpoints.map(async (endpoint) => {
          console.log({ deleting: endpoint.Id })
          return await deleteEndpoint(endpoint.Id)
        })
        await Promise.all(map2)
      } catch (e) {
        console.log({ error: e })
      }
      console.log("Done2")
    })
    await Promise.all(map)
    console.log("DONE")
    const response = {
      statusCode: 200,
      //  Uncomment below to enable CORS requests
      //  headers: {
      //      "Access-Control-Allow-Origin": "*",
      //      "Access-Control-Allow-Headers": "*"
      //  },

      body: JSON.stringify(true),
    }
    return response
  } catch (error) {
    if (error instanceof Error) {
      console.log({ ERROR: error })
      return {
        statusCode: "402",
        error: { message: error.message },
      }
    }
  }
}
