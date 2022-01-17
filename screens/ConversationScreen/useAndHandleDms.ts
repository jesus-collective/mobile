import { GraphQLResult } from "@aws-amplify/api/lib/types"
import { API, Auth } from "aws-amplify"
import GRAPHQL_AUTH_MODE from "aws-amplify-react-native"
import { SetStateAction, useEffect } from "react"
import { JCCognitoUser } from "src/types"
import Observable from "zen-observable-ts"
import { Data } from "../../components/Data/Data"
import { OnCreateDirectMessageSubscription } from "../../src/API-messages"
import { onCreateDirectMessageForDms } from "../../src/graphql-custom/subscriptions"
import { useDmUsers } from "./useDmUsers"
import { useShouldCreateRoom } from "./useShouldCreateRoom"

export const useAndHandleDms = (setRoom: SetStateAction<any>) => {
  const { dmUsers, isLoading, setDmUsers } = useDmUsers()
  useShouldCreateRoom({ setRoom, dmUsers, setDmUsers })
  console.log({ dmUsers })

  useEffect(() => {
    const dmSub = (
      API.graphql({
        query: onCreateDirectMessageForDms,
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      }) as Observable<{
        provider: any
        value: GraphQLResult<OnCreateDirectMessageSubscription>
      }>
    ).subscribe({
      next: async (incoming) => {
        console.log(incoming)
        const currentUser = (await Auth.currentAuthenticatedUser()) as JCCognitoUser
        if (
          incoming.value?.data?.onCreateDirectMessage &&
          incoming.value?.data?.onCreateDirectMessage?.messageRoomID &&
          incoming.value?.data?.onCreateDirectMessage?.recipients?.includes(currentUser.username)
        ) {
          try {
            const query = {
              limit: 200,
              filter: {
                userID: { eq: currentUser["username"] },
                roomID: { eq: incoming.value?.data?.onCreateDirectMessage?.messageRoomID },
              },
            }
            const json = await Data.listDirectMessageUsersForDMs(query)
            const roomItem = json?.data?.listDirectMessageUsers?.items?.[0]
            if (roomItem) {
              const tempDmUsers = [...dmUsers]
              const indexToUpdate = tempDmUsers.findIndex((dmUser) => dmUser?.id === roomItem?.id)
              if (indexToUpdate >= 0) {
                tempDmUsers[indexToUpdate] = roomItem
                setDmUsers(tempDmUsers)
              }
            }
          } catch (error: any) {
            console.error({ error })
          }
        }
      },
    })
    return () => {
      dmSub.unsubscribe()
    }
  }, [dmUsers])
  return { dmUsers, isLoading }
}

// useEffect(() => {
//   const removeDMUser = async (id: string) => {
//     try {
//       const a = (await API.graphql({
//         query: mutations.deleteDirectMessageUser,
//         variables: { input: { id: id } },
//         authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
//       })) as Promise<GraphQLResult<DeleteDirectMessageUserMutation>>
//       console.log({ a })
//     } catch (err) {
//       console.error({ err })
//     }
//   }
//   const removeDMRoom = async (id: string) => {
//     try {
//       const a = (await API.graphql({
//         query: mutations.deleteDirectMessageRoom,
//         variables: { input: { id: id } },
//         authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
//       })) as Promise<GraphQLResult<DeleteDirectMessageUserMutation>>
//       console.log({ a })
//     } catch (err) {
//       console.error({ err })
//     }
//   }
// }, [])
