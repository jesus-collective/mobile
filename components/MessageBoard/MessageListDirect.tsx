import { GraphQLResult } from "@aws-amplify/api"
import { API, Auth } from "aws-amplify"
import GRAPHQL_AUTH_MODE from "aws-amplify-react-native"
import React, { useEffect, useLayoutEffect, useRef, useState } from "react"
import { ActivityIndicator, ScrollView } from "react-native"
import { DirectMessagesByRoomQuery } from "src/API-messages"
import { JCCognitoUser } from "src/types"
import Observable from "zen-observable-ts"
import { Data } from "../../components/Data/Data"
import { OnCreateDirectMessageSubscription } from "../../src/API-messages"
import { onCreateDirectMessage } from "../../src/graphql/subscriptions"
import DMItem from "./DMItem"
import { useDirectMessages } from "./useDirectMessages"

type DMs = NonNullable<DirectMessagesByRoomQuery["directMessagesByRoom"]>["items"]
export type DM = NonNullable<DMs>[0]
type Props = {
  roomId: string
}
export default function MessageListDirect(props: Props) {
  const { directMessages, isLoading, appendDM } = useDirectMessages(props.roomId)
  const listRef = useRef<ScrollView | null>(null)
  const [userData, setUserData] = useState<JCCognitoUser["username"]>("")
  useEffect(() => {
    const loadUser = async () => {
      const user = await Auth.currentAuthenticatedUser()
      setUserData(user.username)
    }
    loadUser()
  }, [])
  useEffect(() => {
    const dmSub = (
      API.graphql({
        query: onCreateDirectMessage,
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      }) as Observable<{
        provider: any
        value: GraphQLResult<OnCreateDirectMessageSubscription>
      }>
    ).subscribe({
      next: async (incoming) => {
        console.log(incoming)
        if (
          incoming.value?.data?.onCreateDirectMessage &&
          incoming.value?.data?.onCreateDirectMessage?.messageRoomID === props.roomId
        ) {
          try {
            const directMessage = await Data.getDirectMessage(
              incoming.value.data.onCreateDirectMessage.id
            )
            if (directMessage.data?.getDirectMessage) {
              appendDM(directMessage.data.getDirectMessage)
            }
          } catch (e: any) {
            console.debug(e)
            if (e.data?.getDirectMessage) {
              appendDM(e.data.getDirectMessage)
            }
          }
        }
      },
    })
    return () => {
      dmSub.unsubscribe()
    }
  }, [props.roomId, appendDM])
  useLayoutEffect(() => {
    if (listRef.current) listRef.current.scrollToEnd({ animated: false })
  }, [directMessages])
  return (
    <ScrollView
      ref={listRef}
      contentContainerStyle={
        isLoading
          ? {
              justifyContent: "center",
              alignItems: "center",
              padding: 16,
              flex: 1,
            }
          : { flex: 1, padding: 16 }
      }
    >
      {isLoading ? (
        <ActivityIndicator size="large" color="#FF4438" />
      ) : (
        <>
          {directMessages?.map((msg, index) => {
            return (
              <DMItem
                previousMsg={index > 0 ? directMessages[index - 1] : null}
                nextMsg={index < directMessages.length - 1 ? directMessages[index + 1] : null}
                key={msg?.id}
                isMine={userData === msg?.userId}
                index={index}
                item={msg}
              />
            )
          })}
        </>
      )}
    </ScrollView>
  )
}
