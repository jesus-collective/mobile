/* Amplify Params - DO NOT EDIT
	API_JCMOBILE_GRAPHQLAPIENDPOINTOUTPUT
	API_JCMOBILE_GRAPHQLAPIIDOUTPUT
	AUTH_JCMOBILE_USERPOOLID
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

  const updateUser = gql`
mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
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
      items {
        id
        owner
        type
        name
        description
        memberCount
        image
        time
        lastUpdated
        location
        length
        effort
        cost
        eventType
        eventUrl
        createdAt
        updatedAt
      }
      nextToken
    }
    groups {
      items {
        id
        groupID
        userID
        createdAt
        updatedAt
      }
      nextToken
    }
    messages {
      items {
        id
        content
        when
        roomId
        userId
        owner
        createdAt
        updatedAt
      }
      nextToken
    }
    createdAt
    updatedAt
  }
}
`
  const listUsers = gql`
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
        userPoolId: process.env.userPoolId,
        identityPoolRegion: region,
        userPoolWebClientId: process.env.userPoolWebClientId,
        identityPoolId: process.env.identityPoolId
      }
    })
    console.log("Done config")
    await Amplify.Auth.signIn("george.bell@themeetinghouse.com", "")
    console.log("Done login")
    currentSession = await Amplify.Auth.currentSession()

    Amplify.default.configure({
      Authorization: currentSession.getIdToken().getJwtToken(),
    })
    console.log("Done Auth")
    json = await Amplify.API.graphql({
      query: listUsers,
      variables: { limit: 20, filter: { profileState: { eq: "Complete" } }, nextToken: null },
      authMode: "AMAZON_COGNITO_USER_POOLS"
    });
    console.log("Done List Users")
    await Promise.all(json.data.listUsers.items.map(async (item) => {
      //TODO CHECK GROUPS FOR USER AND THEN UPDATE
      //ADMIN->ADMIN
      //Partner->Partner
      //Friend->Friend
      //Complete ProfileState->Verified
      //Everyone else ->UnVerified
      var json2 = await Amplify.API.graphql({
        query: updateUser,
        variables: { input: { id: item.id, mainUserGroup: "Partner" } },
        authMode: "AMAZON_COGNITO_USER_POOLS"
      });
      console.log({ Updated: { id: item.id, mainUserGroup: "Partner" } })
    }))
    console.log("Done");
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
