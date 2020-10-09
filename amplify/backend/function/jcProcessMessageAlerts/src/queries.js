const graphql = require('graphql');
const { print } = graphql;
const gql = require('graphql-tag');


const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      given_name
      family_name
      email
      owner
      mainUserGroup
      profileImage {
        userId
        filenameSmall
        filenameMedium
        filenameLarge
        filenameUpload
      }
      alertConfig {
        emailDirectMessage
        emailGroupMessage
        emailEventMessage
        emailOrgMessage
        emailResourceMessage
        emailCourseMessage
        emailPromotions
      }
      createdAt
      updatedAt
    }
  }
`;
const groupMemberByGroup = /* GraphQL */ `
  query GroupMemberByGroup(
    $groupID: ID
    $limit: Int
    $nextToken: String
  ) {
    groupMemberByGroup(
      groupID: $groupID
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        groupID
        userID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
module.exports = {
  getUser,
  groupMemberByGroup
}