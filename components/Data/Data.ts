import { GraphQLResult } from "@aws-amplify/api/lib/types"
import { API } from "aws-amplify"
import GRAPHQL_AUTH_MODE from "aws-amplify-react-native"
import { ListUsersQuery, ListUsersQueryVariables, ModelStringFilterInput } from "../../src/API"
import * as queries from "../../src/graphql/queries"
export enum UserGroupType {
  All = "All",
  Partners = "Partners",
  Friends = "Friends",
  OneStory = "OneStory",
}
export class Data {
  static async listUsers(
    userGroupType: UserGroupType,
    nextToken: string | null | undefined
  ): Promise<GraphQLResult<ListUsersQuery>> {
    let mainUserGroups
    if (userGroupType == UserGroupType.All)
      mainUserGroups = ["Inactive", "Partner", "Admin", "Friend", "OneStory", "Verified"]
    else if (userGroupType == UserGroupType.Friends)
      mainUserGroups = ["Admin", "Friend", "Verified"]
    else if (userGroupType == UserGroupType.OneStory)
      mainUserGroups = ["Admin", "OneStory", "Verified"]
    else mainUserGroups = ["Partner", "Admin"]
    const userGroupList = mainUserGroups?.map((i) => {
      return {
        mainUserGroup: {
          eq: i,
        } as ModelStringFilterInput | null | undefined,
      }
    })
    const query: ListUsersQueryVariables = {
      limit: 100,
      filter: { profileState: { eq: "Complete" }, or: userGroupList },
      nextToken: nextToken,
    }
    return API.graphql({
      query: queries.listUsers,
      variables: query,
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<ListUsersQuery>>
  }
}
