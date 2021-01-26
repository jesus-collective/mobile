const graphql = require("graphql")
const { print } = graphql
const gql = require("graphql-tag")

const listUsers = gql`
  query ListUsers($filter: ModelUserFilterInput, $limit: Int, $nextToken: String) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        given_name
        family_name
        hasPaidState
        profileState
        mainUserGroup
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`
exports.listUsers = listUsers
