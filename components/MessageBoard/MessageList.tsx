import { GraphQLResult } from "@aws-amplify/api"
import { RouteProp } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { API } from "aws-amplify"
import GRAPHQL_AUTH_MODE from "aws-amplify-react-native"
import React, { useEffect, useState } from "react"
import { FlatList, View } from "react-native"
import Observable from "zen-observable-ts"
import {
  GetMessageQuery,
  MessagesByRoomQuery,
  OnCreateMessageByRoomIdSubscription,
  OnCreateReplySubscription,
} from "../../src/API-messages"
import {
  getMessage,
  messagesByRoom,
  onCreateMessageByRoomId,
  onCreateReply,
} from "../../src/graphql-custom/messages"
import { JCState } from "../JCComponent/JCComponent"
import MessageThread from "./MessageThread"

export type Messages = NonNullable<MessagesByRoomQuery["messagesByRoom"]>["items"]
export type Message = NonNullable<Messages>[0]
export type Reply = NonNullable<NonNullable<NonNullable<Message>["replies"]>["items"]>[0]

interface Props {
  groupId?: string
  inputAt?: "top" | "bottom"
  style: "mini" | "regular" | "course" | "courseResponse"
  onHandlePressReply(item: Message | Reply): void
  onHandleCreated(): void
  route?: RouteProp<any, any>
  navigation?: StackNavigationProp<any, any>
  replies?: boolean
}
interface State extends JCState {
  nextToken: string | null | undefined
  messages: Messages
  fetchingData: boolean
}

export default function MessageList(props: Props): JSX.Element {
  console.log("MessageList", { props })
  const [state, setState] = useState<State>({
    messages: [],
    nextToken: null,
    fetchingData: false,
  })

  const flatListRef = React.createRef<FlatList<any>>()
  useEffect(() => {
    const messageSub = (
      API.graphql({
        query: onCreateMessageByRoomId,
        variables: { roomId: props.groupId },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      }) as Observable<{
        provider: any
        value: GraphQLResult<OnCreateMessageByRoomIdSubscription>
      }>
    ).subscribe({
      next: (incoming) => {
        console.log({ incoming })
        if (incoming.value.data?.onCreateMessageByRoomId) {
          // there is a bug here when no posts exist, appending one extra
          setState((prev) => ({
            ...prev,
            messages: [
              incoming?.value?.data?.onCreateMessageByRoomId ?? ({} as Message),
              ...prev.messages,
            ],
          }))
        }
      },
    })
    const replySub = (
      API.graphql({
        query: onCreateReply,
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      }) as Observable<{
        provider: any
        value: GraphQLResult<OnCreateReplySubscription>
      }>
    ).subscribe({
      next: async (incoming) => {
        console.log({ incoming })
        if (
          incoming.value?.data?.onCreateReply?.parentMessage &&
          incoming.value?.data.onCreateReply?.parentMessage?.roomId === props.groupId
        ) {
          const tempMessages = [...state.messages]
          // find incoming reply's parent message in current state
          const index = tempMessages?.findIndex(
            (m) => m?.id === incoming.value?.data?.onCreateReply?.messageId
          )
          try {
            const updatedMessage = (await API.graphql({
              query: getMessage,
              variables: {
                id: incoming.value.data.onCreateReply.messageId,
              },
              authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
            })) as GraphQLResult<GetMessageQuery>
            if (
              updatedMessage.data?.getMessage &&
              index !== undefined &&
              tempMessages &&
              tempMessages[index]
            ) {
              // prevent other threads from re-rendering
              console.log("exists")
              tempMessages[index] = updatedMessage.data.getMessage
              setState((prev) => ({ ...prev, messages: tempMessages }))
            } else {
              console.error("Something went wrong")
            }
          } catch (e: any) {
            console.error(e)
            if (e.data?.getMessage && index !== undefined && tempMessages && tempMessages[index]) {
              // replace old message/replies with incoming data
              tempMessages[index] = e.data.getMessage
              setState((prev) => ({ ...prev, messages: tempMessages }))
            }
          }
        }
      },
    })

    const loadMessages = async () => {
      try {
        const messages = (await API.graphql({
          query: messagesByRoom,
          variables: {
            roomId: props.groupId,
            sortDirection: "DESC",
            limit: 20,
            nextToken: null,
          },
          authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
        })) as GraphQLResult<MessagesByRoomQuery>

        console.log(messages)

        if (messages.data?.messagesByRoom?.items?.length) {
          setState((prev) => ({
            ...prev,
            messages: messages?.data?.messagesByRoom?.items ?? [],
            nextToken: messages?.data?.messagesByRoom?.nextToken,
          }))
        }
      } catch (e: any) {
        console.error({ e })
        if (e.data?.messagesByRoom) {
          setState((prev) => ({
            ...prev,
            messages: e.data.messagesByRoom.items,
            nextToken: e.data.messagesByRoom.nextToken,
          }))
        }
      }
    }
    if (!state.messages.length) {
      loadMessages()
    }
    return () => {
      replySub.unsubscribe()
      messageSub.unsubscribe()
    }
  }, [props.groupId, state.messages])
  return (
    <View>
      <FlatList
        ref={flatListRef}
        scrollEnabled
        renderItem={({ item, index }) => (
          <MessageThread groupId={props.groupId ?? ""} item={item} index={index} />
        )}
        keyExtractor={(item) => item?.id}
        data={state.messages}
      />
    </View>
  )
}

// const getMoreMessages = async () => {
//   setState((prev) => ({ ...prev, fetchingData: true }))
//   if (state.nextToken) {
//     try {
//       const messages = (await API.graphql({
//         query: messagesByRoom,
//         variables: {
//           roomId: props.groupId,
//           sortDirection: "DESC",
//           limit: 10,
//           nextToken: state.nextToken,
//         },
//         authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
//       })) as GraphQLResult<MessagesByRoomQuery>

//       if (messages.data?.messagesByRoom?.items) {
//         setState((prev) => ({
//           ...prev,
//           messages: [...(prev.messages ?? []), ...(messages?.data?.messagesByRoom?.items ?? [])],
//           nextToken: messages?.data?.messagesByRoom?.nextToken,
//         }))
//       }
//     } catch (e: any) {
//       if (e.data?.messagesByRoom) {
//         setState((prev) => ({
//           ...prev,
//           messages: [...(prev.messages ?? []), ...e.data.messagesByRoom.items],
//           nextToken: e.data.messagesByRoom.nextToken,
//         }))
//       }
//     }
//   }
//   setState((prev) => ({ ...prev, fetchingData: false }))
// }

// const messagesLoader = () => {
//   if (state.nextToken) return <ActivityIndicator animating color="#F0493E" />
//   return null
// }
