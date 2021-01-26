const graphql = require("graphql")
const { print } = graphql
const gql = require("graphql-tag")

const updateUser = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      id
      given_name
      family_name
      hasPaidState
      profileState
      mainUserGroup
      joined
      createdAt
      updatedAt
    }
  }
`
exports.updateUser = updateUser
