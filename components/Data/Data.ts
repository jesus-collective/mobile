import { GraphQLResult } from "@aws-amplify/api/lib/types"
import { API } from "aws-amplify"
import GRAPHQL_AUTH_MODE from "aws-amplify-react-native"
import { InviteType } from "src/types"
import {
  CourseTriadUserByUserQuery,
  EventBriteListEventsQuery,
  EventBriteListTicketClassesQuery,
  EventBriteListTicketClassesQueryVariables,
  GetGroupQuery,
  GetUserQuery,
  GroupByTypeByTimeQuery,
  GroupByTypeQuery,
  GroupMemberByUserQuery,
  ListOrganizationsQuery,
  ListUsersQuery,
  ListUsersQueryVariables,
  ModelStringFilterInput,
} from "../../src/API"
import * as customQueries from "../../src/graphql-custom/queries"
import * as queries from "../../src/graphql/queries"

export enum UserGroupType {
  All = "All",
  Partners = "Partners",
  Friends = "Friends",
  OneStory = "OneStory",
}
export class Data {
  static getGroup(groupId: string) {
    return API.graphql({
      query: queries.getGroup,
      variables: { id: groupId, messages: { sortDirection: "ASC" } },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<GetGroupQuery>>
  }
  static getUser(userId: string) {
    return API.graphql({
      query: queries.getUser,
      variables: { id: userId },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<GetUserQuery>>
  }
  static listOrgs(nextToken: string | null | undefined) {
    return API.graphql({
      query: queries.listOrganizations,
      variables: {
        limit: 20,
        filter: { profileState: { eq: "Complete" } },
        nextToken: nextToken,
      },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<ListOrganizationsQuery>>
  }
  static courseTriadUserByUser(currentUser: string | null) {
    return API.graphql({
      query: queries.courseTriadUserByUser,
      variables: { userID: currentUser },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<CourseTriadUserByUserQuery>>
  }
  static getGroupForOwner(id: string) {
    return API.graphql({
      query: customQueries.getGroupForOwner,
      variables: { id: id },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<GetGroupQuery>>
  }
  static groupMemberByUser(currentUser: string | null, groupId: string | null | undefined) {
    return API.graphql({
      query: queries.groupMemberByUser,
      variables: { userID: currentUser, groupID: { eq: groupId } },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<GroupMemberByUserQuery>>
  }
  static groupByTypeForMyGroups(
    type: string | InviteType | null,
    nextToken: string | null | undefined
  ) {
    return API.graphql({
      query: customQueries.groupByTypeForMyGroups,
      variables: {
        limit: 20,
        type: type,
        nextToken: nextToken,
      },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<GroupByTypeQuery>>
  }
  static async eventBriteListEvents(params: object | undefined) {
    return API.graphql({
      query: queries.eventBriteListEvents,
      variables: params,
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<EventBriteListEventsQuery>>
  }
  static async eventBriteListTicketClasses(
    params: EventBriteListTicketClassesQueryVariables | undefined
  ) {
    return API.graphql({
      query: queries.eventBriteListTicketClasses,
      variables: params,
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<EventBriteListTicketClassesQuery>>
  }
  static async groupByTypeByTime(params: object | undefined) {
    return (await API.graphql({
      query: customQueries.groupByTypeByTime,
      variables: params,
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    })) as GraphQLResult<GroupByTypeByTimeQuery>
  }
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
