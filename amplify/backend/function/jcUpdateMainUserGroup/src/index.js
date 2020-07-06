/* Amplify Params - DO NOT EDIT
	API_JCMOBILE_GRAPHQLAPIENDPOINTOUTPUT
	API_JCMOBILE_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */
const axios = require('axios');
const gql = require('graphql-tag');
const graphql = require('graphql');
const Amplify = require('aws-amplify');
global.fetch = require("node-fetch");
const { print } = graphql;







exports.handler = async function (event, context) {

  const listTodos = gql`
query ListUsers(
 $filter: ModelUserFilterInput
 $limit: Int
 $nextToken: String
) {
 listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
   items {
     id
     given_name
     family_name
     email
     phone
     owner
     hasPaidState
     profileState
     address
     city
     province
     postalCode
     country
     location {
       latitude
       longitude
     }
     profileImage {
       userId
       filenameSmall
       filenameMedium
       filenameLarge
       filenameUpload
     }
     aboutMeShort
     aboutMeLong
     interests
     currentRole
     currentScope
     personality
     orgName
     orgType
     orgSize
     orgDescription
     joined
     owns {
       nextToken
     }
     groups {
       nextToken
     }
     messages {
       nextToken
     }
     createdAt
     updatedAt
   }
   nextToken
 }
}
`
  var json
  var currentSession
  try {
    // console.log(process.env)
    var region = process.env.REGION
    var API_JCMOBILE_GRAPHQLAPIENDPOINTOUTPUT = process.env.API_JCMOBILE_GRAPHQLAPIENDPOINTOUTPUT
    Amplify.default.configure({
      aws_appsync_graphqlEndpoint: API_JCMOBILE_GRAPHQLAPIENDPOINTOUTPUT,
      aws_appsync_region: region,
      aws_appsync_authenticationType: "AMAZON_COGNITO_USER_POOLS",
      Auth: {
        mandatorySignIn: false,
        region: region,
        userPoolId: "us-east-1_fe30GuOOt",
        identityPoolRegion: region,
        userPoolWebClientId: "68v5dgb5s96v9lf87cjfpeqmn9",
        identityPoolId: "us-east-1:7b6acfbf-d55c-46e9-a0de-d3bf264f8fca"
      }
    })
    console.log("Done config")
    await Amplify.Auth.signIn("george.bell@themeetinghouse.com", "")
    console.log("loggedin")
    currentSession = await Amplify.Auth.currentSession()
    console.log(currentSession)
    Amplify.default.configure({
      Authorization: currentSession.getIdToken().getJwtToken(),
    })
    console.log("donecurr")
    console.log(listTodos)
    json = await Amplify.API.graphql({
      query: listTodos,
      variables: { limit: 20, filter: { profileState: { eq: "Complete" } }, nextToken: null },
      authMode: "AMAZON_COGNITO_USER_POOLS"

    });
    console.log("Doneawait");
    console.log(json);
    return {
      statusCode: 200,
      body: JSON.stringify(json),

      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    }
  } catch (err) {
    console.log('json', json)
    console.log('error posting to appsync: ', err);
    //console.log('currentSession', currentSession)
  }
}
