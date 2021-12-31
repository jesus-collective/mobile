import { GraphQLResult } from "@aws-amplify/api"
import { RouteProp, useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { API } from "aws-amplify"
import GRAPHQL_AUTH_MODE from "aws-amplify-react-native"
import { convertFromRaw } from "draft-js"
import { stateToHTML } from "draft-js-export-html"
import moment from "moment"
import React, { useEffect, useState } from "react"
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from "react-native"
import Observable from "zen-observable-ts"
import { JCState } from "../../components/JCComponent/JCComponent"
import ProfileImage from "../../components/ProfileImage/ProfileImage"
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
import MessageUtils from "./MessageUtils"

type Messages = NonNullable<MessagesByRoomQuery["messagesByRoom"]>["items"]
type Message = NonNullable<Messages>[0]
type Reply = NonNullable<NonNullable<NonNullable<Message>["replies"]>["items"]>[0]

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
  const renderMessageWithReplies = (item: Message, index: number) => {
    //
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
        {renderMessage(item, index, false)}
        {item?.replies?.items.slice(0, 2).map((reply, index) => {
          return renderMessage(reply, index, true)
        })}
        <TouchableOpacity
          onPress={() => null} // increase by 2, need to add state for num replies
        >
          {item?.replies?.items?.length && item?.replies?.items?.length >= 3 ? (
            <Text
              style={{
                marginLeft: 142,
                color: "#6A5E5D",
                fontFamily: "Graphik-Regular-App",
                fontSize: 14,
                lineHeight: 24,
              }}
            >
              View {item.replies.items.length - 2} more comments... (out of{" "}
              {item?.replies?.items?.length})
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
  const renderMessage = (item: Message | Reply, index: number, isReply: boolean) => {
    const showProfile = (id: string | undefined) => {
      if (id) navigation?.push("ProfileScreen", { id: id, create: false })
    }
    const { replies } = props
    const now = moment()
    const datePosted = moment(parseInt(item?.when))
    const daysSince = now.diff(datePosted.format("L"), "days")
    const dateString = `${
      daysSince === 0
        ? "Today"
        : daysSince === 1
        ? "Yesterday"
        : daysSince > 1
        ? daysSince + " days ago"
        : null
    }`
    return (
      <View
        key={index}
        style={{
          paddingHorizontal: 16,
          paddingVertical: 32,
          paddingBottom: !isReply ? 32 : 0,
          marginLeft: isReply ? 64 : 0,
          borderBottomWidth: !isReply ? 1 : 0,
          borderBottomColor: "#E4E1E1",
        }}
      >
        <View>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flexDirection: "column" }}>
              <TouchableOpacity
                key={item?.id}
                onPress={() => {
                  showProfile(item?.author?.id)
                }}
              >
                {item && "owner" in item && (
                  <View style={{ marginRight: 16 }}>
                    <ProfileImage size="editorLarge" user={item?.owner ?? null} />
                  </View>
                )}
                {isReply && (
                  <View style={{ marginLeft: -16 }}>
                    <ProfileImage size="small2" user={item?.author?.id ?? null} />
                  </View>
                )}
              </TouchableOpacity>
            </View>

            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: "row", flex: 1 }}>
                <View style={{ flexDirection: "column", flex: 1 }}>
                  <Text
                    style={{
                      color: "#1A0706",
                      fontFamily: "Graphik-Semibold-App",
                      fontSize: 16,
                      lineHeight: 24,
                    }}
                  >
                    {item?.author?.given_name ?? ""} {item?.author?.family_name ?? ""}
                  </Text>
                  <Text
                    style={{
                      color: "#483938",
                      fontFamily: "Graphik-Regular-App",
                      fontSize: 16,
                      lineHeight: 24,
                    }}
                  >
                    {item?.author?.currentRole ?? ""}
                  </Text>
                </View>
                {item?.when && (
                  <Text
                    style={{
                      color: "#6A5E5D",
                      fontFamily: "Graphik-Regular-App",
                      fontSize: 16,
                      lineHeight: 24,
                    }}
                  >
                    {dateString}
                  </Text>
                )}
              </View>

              <div
                style={{
                  fontFamily: "Graphik-Regular-App",
                  fontWeight: "normal",
                  fontSize: 15,
                  lineHeight: "24px",
                  color: "#1A0706",
                  marginBlockEnd: 0,
                }}
                dangerouslySetInnerHTML={{
                  __html: convertCommentFromJSONToHTML(item?.content ?? null),
                }}
              />

              {item?.attachment ? <View>{MessageUtils.renderFileDownloadBadge(item)}</View> : null}
            </View>
          </View>
        </View>
      </View>
    )
  }
  const convertCommentFromJSONToHTML = (text: string | null) => {
    const errorMarkdown = "<div>" + "Message" + " Can't Be Displayed</div>"

    if (!text) return errorMarkdown

    try {
      return stateToHTML(convertFromRaw(JSON.parse(text)))
    } catch (e) {
      console.error(e)
      return errorMarkdown
    }
  }
  const messagesLoader = () => {
    if (state.nextToken) return <ActivityIndicator animating color="#F0493E" />
    return null
  }
  const navigation = useNavigation<StackNavigationProp<any, any>>()
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
        renderItem={({ item, index }) => renderMessageWithReplies(item, index)}
        data={state.messages}
        onEndReached={!state.fetchingData ? () => getMoreMessages() : undefined}
        refreshing={state.fetchingData}
        onEndReachedThreshold={0.1}
      />
    </View>
  )
}
