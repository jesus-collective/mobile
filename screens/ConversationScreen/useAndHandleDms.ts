import { GraphQLResult } from "@aws-amplify/api/lib/types"
import { API, Auth } from "aws-amplify"
import GRAPHQL_AUTH_MODE from "aws-amplify-react-native"
import { SetStateAction, useEffect } from "react"
import { JCCognitoUser } from "src/types"
import Observable from "zen-observable-ts"
import { Data } from "../../components/Data/Data"
import { OnCreateDirectMessageSubscription } from "../../src/API-messages"
import { onCreateDirectMessageForDms } from "../../src/graphql-custom/subscriptions"
import { loadDmsForRoom, useDmUsers } from "./useDmUsers"
import { useShouldCreateRoom } from "./useShouldCreateRoom"
export const useAndHandleDms = (setRoom: SetStateAction<any>) => {
  const { dmUsers, isLoading, setDmUsers } = useDmUsers()
  const { isCreatingRoom } = useShouldCreateRoom({ setRoom, dmUsers, setDmUsers })
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
            // should fetch individual DirectMessageUser here to update conversation pane preview
            const json = await Data.listDirectMessageUsersForDMs(query)
            const roomItem = json?.data?.listDirectMessageUsers?.items?.[0]
            if (roomItem) {
              // for rooms that have more than 100 dms
              if (
                roomItem?.room?.directMessage?.items &&
                roomItem?.room?.directMessage?.nextToken
              ) {
                const directMessages = await loadDmsForRoom(roomItem?.roomID)
                roomItem.room.directMessage.items = directMessages
              }
              const tempDmUsers = [...dmUsers]
              const indexToUpdate = tempDmUsers.findIndex(
                (dmUser) => dmUser?.roomID === roomItem?.roomID
              )
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
  return { dmUsers, isLoading: isLoading || isCreatingRoom }
}
