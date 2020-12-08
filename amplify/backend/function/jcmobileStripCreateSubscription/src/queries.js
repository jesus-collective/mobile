const graphql = require('graphql');
const { print } = graphql;
const gql = require('graphql-tag');


const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      given_name
      family_name
      stripeCustomerID
      stripeSubscriptionID
      email
      owner
      mainUserGroup
      createdAt
      updatedAt
    }
  }
`;
exports.getUser = getUser;