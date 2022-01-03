import { GraphQLResult } from "@aws-amplify/api"
import { RouteProp } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { API } from "aws-amplify"
import GRAPHQL_AUTH_MODE from "aws-amplify-react-native"
import React, { useEffect, useState } from "react"
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from "react-native"
import Observable from "zen-observable-ts"
import { JCState } from "../../components/JCComponent/JCComponent"
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
import MessageInput from "./MessageInput"
import MessageItem from "./MessageItem"

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
  const [state, setState] = useState<State>({
    messages: [],
    nextToken: null,
    fetchingData: false,
  })
  const getMoreMessages = async () => {
    setState((prev) => ({ ...prev, fetchingData: true }))
    if (state.nextToken) {
      try {
        const messages = (await API.graphql({
          query: messagesByRoom,
          variables: {
            roomId: props.groupId,
            sortDirection: "DESC",
            limit: 10,
            nextToken: state.nextToken,
          },
          authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
        })) as GraphQLResult<MessagesByRoomQuery>

        if (messages.data?.messagesByRoom?.items) {
          setState((prev) => ({
            ...prev,
            messages: [...(prev.messages ?? []), ...(messages?.data?.messagesByRoom?.items ?? [])],
            nextToken: messages?.data?.messagesByRoom?.nextToken,
          }))
        }
      } catch (e: any) {
        if (e.data?.messagesByRoom) {
          setState((prev) => ({
            ...prev,
            messages: [...(prev.messages ?? []), ...e.data.messagesByRoom.items],
            nextToken: e.data.messagesByRoom.nextToken,
          }))
        }
      }
    }
    setState((prev) => ({ ...prev, fetchingData: false }))
  }
  const RenderMessageWithReplies = ({ item, index }: { item: Message; index: number }) => {
    const [showCount, setShowCount] = useState(2)
    return (
      <View
        style={{
          marginBottom: 32,
          borderWidth: 1,
          borderColor: "#E4E1E1",
          borderRadius: 8,
          backgroundColor: "#fff",
        }}
        key={index}
      >
        <MessageItem item={item} index={index} isReply={false} />
        {item?.replies?.items.slice(0, showCount).map((reply, index) => {
          return <MessageItem item={reply} index={index} isReply={true} />
        })}
        <TouchableOpacity
          onPress={() => setShowCount((prev) => prev + 2)} // increase by 2, need to add state for num replies
        >
          {item?.replies?.items?.length && showCount < item?.replies?.items?.length ? (
            <Text
              style={{
                marginLeft: 142,
                color: "#6A5E5D",
                fontFamily: "Graphik-Regular-App",
                fontSize: 14,
                lineHeight: 24,
              }}
            >
              View {item.replies.items.length - showCount} more comments...
            </Text>
          ) : null}
        </TouchableOpacity>
        <MessageInput
          replyMode={true}
          replyState={{
            replyToWho: [],
            replyToId: item?.id,
            replyToRoomId: props.groupId ?? "",
          }}
          clearReplyState={function (): void {
            throw new Error("Function not implemented.")
          }}
          groupId={props.groupId}
        />
      </View>
    )
  }

  const messagesLoader = () => {
    if (state.nextToken) return <ActivityIndicator animating color="#F0493E" />
    return null
  }
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
          const tempMessages = state.messages
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
            console.log({ updatedMessage })
            console.log({ tempMessages })

            console.log("index is ", { index })
            if (
              updatedMessage.data?.getMessage &&
              index !== undefined &&
              tempMessages &&
              tempMessages[index]
            ) {
              // replace old message/replies with incoming data
              tempMessages[index] = updatedMessage.data.getMessage
              setState((prev) => ({ ...prev, messages: tempMessages }))
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
            limit: 10,
          },
          authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
        })) as GraphQLResult<MessagesByRoomQuery>

        console.debug(messages)

        if (messages.data?.messagesByRoom?.items) {
          setState((prev) => ({
            ...prev,
            messages: messages?.data?.messagesByRoom?.items ?? [],
            nextToken: messages?.data?.messagesByRoom?.nextToken,
          }))
          props.onHandleCreated()
        }
      } catch (e: any) {
        console.debug(e)
        if (e.data?.messagesByRoom) {
          setState((prev) => ({
            ...prev,
            messages: e.data.messagesByRoom.items,
            nextToken: e.data.messagesByRoom.nextToken,
          }))
          props.onHandleCreated()
        }
      }
    }
    if (!state.messages.length) loadMessages()
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
        renderItem={({ item, index }) => <RenderMessageWithReplies item={item} index={index} />}
        data={state.messages}
        refreshing={state.fetchingData}
        onEndReachedThreshold={0.1}
      />
    </View>
  )
}
