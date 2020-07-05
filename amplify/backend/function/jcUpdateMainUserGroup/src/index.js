/* Amplify Params - DO NOT EDIT
	API_JCMOBILE_GRAPHQLAPIENDPOINTOUTPUT
	API_JCMOBILE_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */
const axios = require('axios');
const gql = require('graphql-tag');
const graphql = require('graphql');
const { print } = graphql;

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

exports.handler = async (event) => {
    console.log(event)
    console.log(process.env)
    try {
        const graphqlData = await axios({
            url: process.env.API_URL,
            method: 'post',
            headers: {
                'x-api-key': process.env.API_KEY
            },
            data: {
                query: print(listTodos),
            },
            variables: {
                limit: 20
            }
        });
        console.log(graphqlData.data.data)
        const body = {
            graphqlData: graphqlData.data.data.listTodos
        }

        return {
            statusCode: 200,
            body: JSON.stringify(body),
            headers: {
                "Access-Control-Allow-Origin": "*",
            }
        }
    } catch (err) {
        console.log('error posting to appsync: ', err);
    }
}
