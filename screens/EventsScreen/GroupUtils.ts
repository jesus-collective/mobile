import { GraphQLResult } from "@aws-amplify/api/lib/types"
import { Analytics, API, Auth } from "aws-amplify"
import GRAPHQL_AUTH_MODE from "aws-amplify-react-native"
import { GetGroupQueryResult, JCCognitoUser } from "src/types"
import { Data } from "../../components/Data/Data"
import { CreateGroupMemberMutation, DeleteGroupMemberMutation } from "../../src/API"
import * as customMutations from "../../src/graphql-custom/mutations"

export const loadUser = async () => {
  const jcUser: JCCognitoUser = await Auth.currentAuthenticatedUser()
  return jcUser.username
}
export type Group = NonNullable<GetGroupQueryResult["data"]>["getGroup"]
export const joinGroup = async (group: Group, groupType: string): Promise<boolean> => {
  try {
    const user = await loadUser()
    const createGroupMember = (await API.graphql({
      query: customMutations.createGroupMember,
      variables: {
        input: { groupID: group?.id, userID: user },
      },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    })) as GraphQLResult<CreateGroupMemberMutation>
    console.log({ "Success mutations.createGroupMember": createGroupMember })
    Analytics.record({
      name: "joined" + groupType,
      attributes: { id: group?.id, name: group?.name },
    })
    return true
  } catch (err) {
    console.log({ "Error mutations.createGroupMember": err })
    return false
  }
}

export const leaveGroup = async (group: Group, groupType: string): Promise<boolean> => {
  try {
    const user = await loadUser()
    const groupMemberByUser = await Data.groupMemberByUser(user, group?.id)
    console.log({ "Success queries.groupMemberByUser": groupMemberByUser })
    const groupMember = groupMemberByUser?.data?.groupMemberByUser?.items
    for (let i = 0; i < (groupMember?.length ?? 0); i++) {
      try {
        const deleteGroupMember = (await API.graphql({
          query: customMutations.deleteGroupMember,
          variables: { input: { id: groupMember![i]?.id } },
          authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
        })) as GraphQLResult<DeleteGroupMemberMutation>
        console.log({ "Success mutations.deleteGroupMember": deleteGroupMember })
        Analytics.record({
          name: "left" + groupType,
          // Attribute values must be strings
          attributes: { id: group?.id, name: group?.name },
        })
        return true
      } catch (err) {
        console.log({ "Error mutations.deleteGroupMember": err })
        return false
      }
    }
    return false
  } catch (err) {
    console.log({ "Error queries.groupMemberByUser": err })
    return false
  }
}
