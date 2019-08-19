// tslint:disable
// this is an auto generated file. This will be overwritten

export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    given_name
    family_name
    email
    phone
    owner
    hasPaidState
    address
    city
    province
    postalCode
    country
    profileImage
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
  }
}
`;
export const listUsers = `query ListUsers(
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
      address
      city
      province
      postalCode
      country
      profileImage
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
    }
    nextToken
  }
}
`;
