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
  const { isCreatingRoom } = useShouldCreateRoom({
    loadingFinished: isLoading === false,
    setRoom,
    dmUsers,
    setDmUsers,
  })
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
            const loadDm = async () => {
              let item: any
              const loadNext = async (next: string | null | undefined = null) => {
                const query = {
                  limit: 200,
                  filter: {
                    userID: { eq: currentUser["username"] },
                    roomID: { eq: incoming.value?.data?.onCreateDirectMessage?.messageRoomID },
                  },
                  nextToken: next,
                }
                // should fetch individual DirectMessageUser here to update conversation pane preview
                const json = await Data.listDirectMessageUsersForDMs(query)
                if (json?.data?.listDirectMessageUsers?.items?.length)
                  item = json?.data?.listDirectMessageUsers?.items?.[0]
                if (json.data?.listDirectMessageUsers?.nextToken && !item)
                  await loadNext(json.data?.listDirectMessageUsers?.nextToken)
              }
              await loadNext(null)
              return item
            }
            const item = await loadDm()
            const roomItem = item
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
              } else {
                console.log("Index not found")
              }
            } else console.log("Room not found")
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
