const graphql = require('graphql');
const { print } = graphql;
const gql = require('graphql-tag');

const updateUser = /* GraphQL */ `
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      id
      stripeCustomerID
      stripeSubscriptionID
      hasPaidState
      profileState
      createdAt
      updatedAt
    }
  }
`;
exports.updateUser = updateUser;
