import API from "@aws-amplify/api"
import { GraphQLResult } from "@aws-amplify/api/lib/types"
import Auth from "@aws-amplify/auth"
import Amplify from "@aws-amplify/core"
import { GetUserQuery } from "./API"
import * as mutations from "./mutations"
import * as queries from "./queries"
const aws = require("aws-sdk")

Amplify.configure({
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

  aws_cloud_logic_custom: [
    {
      name: "AdminQueries",
      endpoint: "https://cvopa45zi3.execute-api.us-east-1.amazonaws.com/beta",
      region: "us-east-1",
    },
  ],
  API: {
    endpoints: [
      {
        name: "AdminQueries",
        endpoint: "https://cvopa45zi3.execute-api.us-east-1.amazonaws.com/beta",
        region: "us-east-1",
      },
    ],
  },
})
type LoginResult =
  | {
      statusCode: string
      error: string
    }
  | {
      statusCode: string
      error: {
        message: any
      }
    }
export default class JCDB {
  static async ensureLogin(): Promise<LoginResult> {
    console.log("Starting Login")
    var secretName = "jcmobile/" + process.env.ENV + "/lamdaSecrets",
      secret,
      decodedBinarySecret
    // Create a Secrets Manager client
    var client = new aws.SecretsManager({
      region: process.env.REGION,
    })
    try {
      const data = await client.getSecretValue({ SecretId: secretName }).promise()
      secret = JSON.parse(data.SecretString)
      console.log("Loading Secret Done")
      try {
        await Auth.signIn(secret.userName, secret.password)
        const currentSession = await Auth.currentSession()
        Amplify.configure({
          Authorization: currentSession.getIdToken().getJwtToken(),
        })
        console.log("Logged in")
        return null
      } catch (e: any) {
        console.log({ error: e })
        return { statusCode: "401", error: "Login Error" + e }
      }
    } catch (error: any) {
      console.log({ ERROR: error })
      return { statusCode: "402", error: { message: error.message } }
    }
  }

  static async cognitoAddUserToGroup(user: string, groupname: string) {
    try {
      console.log(user)
      console.log(groupname)
      const login = await JCDB.ensureLogin()

      const apiName = "AdminQueries"
      const path = "/addUserToGroup"
      const myInit = {
        body: {
          username: user,
          groupname: groupname,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`,
        },
      }
      const { ...rest } = await API.post(apiName, path, myInit)
      return rest
    } catch (e) {
      console.log({ "ERROR:": e })
      return false
    }
  }

  static async getUser(id: string): Promise<{
    stripeCustomerID: string
    email: string
    name: string
    stripeSubscriptionID: string
  }> {
    try {
      const login = await JCDB.ensureLogin()
      if (login != null) throw Error("Login Failure")
      var json = (await API.graphql({
        query: queries.getUser,
        variables: { id: id },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      })) as GraphQLResult<GetUserQuery>
      console.log("Done Get Users")
      const email = json.data.getUser.email
      const stripeCustomerID = json.data.getUser.stripeCustomerID
      const name = json.data.getUser.given_name + " " + json.data.getUser.family_name
      const stripeSubscriptionID = json.data.getUser.stripeSubscriptionID
      return {
        stripeCustomerID: stripeCustomerID,
        email: email,
        name: name,
        stripeSubscriptionID: stripeSubscriptionID,
      }
    } catch (json: any) {
      if (json && json.data && json.data.getUser) {
        const email = json.data.getUser.email
        const stripeCustomerID = json.data.getUser.stripeCustomerID
        const name = json.data.getUser.given_name + " " + json.data.getUser.family_name
        const stripeSubscriptionID = json.data.getUser.stripeSubscriptionID
        return {
          stripeCustomerID: stripeCustomerID,
          email: email,
          name: name,
          stripeSubscriptionID: stripeSubscriptionID,
        }
      }
      console.log({ "Error getting user": json })
      return null
    }
  }
  static async updateUser(id: string, field: string, value: string) {
    console.log(id)
    console.log(process.env)
    try {
      const login = await JCDB.ensureLogin()
      if (login != null) return login
      var json = await API.graphql({
        query: mutations.updateUser,
        variables: {
          input: {
            id: id,
            [field]: value,
          },
        },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      })
      console.log("Done Update Users")
      return true
    } catch (json: any) {
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

  static async updateSubscription(
    id: string,
    subscriptionID: string
  ): Promise<Boolean | LoginResult> {
    try {
      const login = await JCDB.ensureLogin()
      if (login != null) return login
      console.log("Done Auth")

      var json = await API.graphql({
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
    } catch (json: any) {
      console.log({ "Error updating subscription": json })
      console.log({ "Error updating subscription": json.errors[0] })
      return false
    }
  }
}
