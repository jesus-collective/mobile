/* Amplify Params - DO NOT EDIT
	API_JCMOBILE_GRAPHQLAPIENDPOINTOUTPUT
	API_JCMOBILE_GRAPHQLAPIIDOUTPUT
	AUTH_JCMOBILE_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */
const aws = require("aws-sdk")
const gql = require("graphql-tag")
const graphql = require("graphql")
const queries = require("./queries")
const mutations = require("./mutations")
const Amplify = require("aws-amplify")
global.fetch = require("node-fetch")

async function getGroups(id) {
  const cognitoidentityserviceprovider = new aws.CognitoIdentityServiceProvider({
    apiVersion: "2016-04-18",
  })
  var params = {
    UserPoolId: process.env.userPoolId,
    Username: id,
  }
  console.log(params)
  var groups = await cognitoidentityserviceprovider.adminListGroupsForUser(params).promise()
  console.log({ groups: groups })
  return groups
}
async function updateUser(id, userType) {
  var json2 = await Amplify.API.graphql({
    query: mutations.updateUser,
    variables: { input: { id: id, mainUserGroup: userType } },
    authMode: "AMAZON_COGNITO_USER_POOLS",
  })
  console.log({ Updated: { id: id, mainUserGroup: userType } })
}
async function listUsers(nextToken) {
  return await Amplify.API.graphql({
    query: queries.listUsers,
    variables: {
      limit: 100,
      filter: { profileState: { eq: "Complete" } },
      nextToken: nextToken,
    },
    authMode: "AMAZON_COGNITO_USER_POOLS",
  })
}
async function getAllUsers() {
  var json = await listUsers(null)
  var items = json.data.listUsers.items
  while (json.data.listUsers.nextToken !== null) {
    json = await listUsers(json.data.listUsers.nextToken)
    console.log(json.data.listUsers.nextToken)
    items = [...items, ...json.data.listUsers.items]
  }
  return items
}
exports.handler = async function (event, context) {
  var AWS = require("aws-sdk"),
    region = "us-east-1",
    secretName = "jcmobile/" + process.env.ENV + "/lamdaSecrets",
    secret,
    decodedBinarySecret
  // Create a Secrets Manager client
  var client = new AWS.SecretsManager({
    region: region,
  })

  // In this sample we only handle the specific exceptions for the 'GetSecretValue' API.
  // See https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
  // We rethrow the exception by default.

  try {
    console.log("Loading Secret")
    const data = await client.getSecretValue({ SecretId: secretName }).promise()

    if ("SecretString" in data) {
      secret = JSON.parse(data.SecretString)
    } else {
      let buff = new Buffer(data.SecretBinary, "base64")
      decodedBinarySecret = buff.toString("ascii")
    }
    console.log("Loading Secret Done")

    // Your code goes here.

    var json
    var currentSession
    try {
      //console.log(process.env)

      //      console.log(API_JCMOBILE_GRAPHQLAPIENDPOINTOUTPUT)
      var region = process.env.REGION
      var API_JCMOBILE_GRAPHQLAPIENDPOINTOUTPUT = process.env.API_JCMOBILE_GRAPHQLAPIENDPOINTOUTPUT
      Amplify.default.configure({
        aws_appsync_graphqlEndpoint: API_JCMOBILE_GRAPHQLAPIENDPOINTOUTPUT,
        aws_appsync_region: region,
        aws_appsync_authenticationType: "AMAZON_COGNITO_USER_POOLS",
        Auth: {
          mandatorySignIn: false,
          region: region,
          userPoolId: process.env.userPoolId,
          identityPoolRegion: region,
          userPoolWebClientId: process.env.userPoolWebClientId,
          identityPoolId: process.env.identityPoolId,
        },
      })
      console.log("Done config")

      await Amplify.Auth.signIn(secret.userName, secret.password)
      console.log("Done login")
      currentSession = await Amplify.Auth.currentSession()

      Amplify.default.configure({
        Authorization: currentSession.getIdToken().getJwtToken(),
      })
      console.log("Done Auth")
      const allUsers = await getAllUsers()
      console.log("Done List Users")
      console.log({ allUsers: allUsers })
      await Promise.all(
        allUsers.map(async (item) => {
          //TODO CHECK GROUPS FOR USER AND THEN UPDATE
          //ADMIN->ADMIN
          //Partner->Partner
          //Friend->Friend
          //Complete ProfileState->Verified
          //Everyone else ->UnVerified
          var groups
          try {
            groups = (await getGroups(item.id)).Groups
            console.log({ groupRet: groups })
          } catch (e) {
            console.log({ error: e })
          }
          try {
            var groupName = ""
            if (groups == undefined || groups == null) groupName = "Inactive"
            else if (groups.filter((z) => z.GroupName == "admin").length > 0) groupName = "Admin"
            else if (
              groups.filter((z) => z.GroupName == "partners" || z.GroupName == "legacyUserGroup1")
                .length > 0
            )
              groupName = "Partner"
            else if (groups.filter((z) => z.GroupName == "friends").length > 0) groupName = "Friend"
            else if (
              groups.filter(
                (z) =>
                  z.GroupName == "subscriptionkyearlyyears" ||
                  z.GroupName == "subscriptionkykids" ||
                  z.GroupName == "subscriptionkyyouth"
              ).length > 0
            )
              groupName = "OneStory"
            else groupName = "Verified"

            await updateUser(item.id, groupName)
          } catch (e) {
            console.log({ error: e })
          }
        })
      )
      console.log("Done")
      return {
        statusCode: 200,
        body: JSON.stringify(json),
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    } catch (err) {
      console.log("json", json)
      console.log("error posting to appsync: ", err)
      //console.log('currentSession', currentSession)
    }
  } catch (err) {
    console.log({ Error: err })
    if (err) {
      if (err.code === "DecryptionFailureException")
        // Secrets Manager can't decrypt the protected secret text using the provided KMS key.
        // Deal with the exception here, and/or rethrow at your discretion.
        throw err
      else if (err.code === "InternalServiceErrorException")
        // An error occurred on the server side.
        // Deal with the exception here, and/or rethrow at your discretion.
        throw err
      else if (err.code === "InvalidParameterException")
        // You provided an invalid value for a parameter.
        // Deal with the exception here, and/or rethrow at your discretion.
        throw err
      else if (err.code === "InvalidRequestException")
        // You provided a parameter value that is not valid for the current state of the resource.
        // Deal with the exception here, and/or rethrow at your discretion.
        throw err
      else if (err.code === "ResourceNotFoundException")
        // We can't find the resource that you asked for.
        // Deal with the exception here, and/or rethrow at your discretion.
        throw err
    } else {
      // Decrypts secret using the associated KMS CMK.
      // Depending on whether the secret is a string or binary, one of these fields will be populated.
    }
  }
}
