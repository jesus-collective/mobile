import { NavigationProp, RouteProp } from "@react-navigation/native"
import React, { useState } from "react"
import { View } from "react-native"
import { MessagesByRoomQuery } from "../../src/API-messages"
import MessageInput from "./MessageInput"
import MessageList from "./MessageList"
type Messages = NonNullable<MessagesByRoomQuery["messagesByRoom"]>["items"]
type Message = NonNullable<Messages>[0]
type Reply = NonNullable<NonNullable<NonNullable<Message>["replies"]>["items"]>[0]

type Props = {
  groupId?: string
  roomId?: string
  route?: RouteProp<any, any>
  navigation?: NavigationProp<any, any>
  style: "mini" | "regular" | "course" | "courseResponse"
  recipients?: string[]
  showWordCount?: boolean
  totalWordCount?: number
  inputAt?: "top" | "bottom"
  toolbar?: boolean
  replies?: boolean
}
export type ReplyState = {
  replyToWho: string[]
  replyToId: string
  replyToRoomId: string
}
export default function MessageBoard(props: Props): JSX.Element {
  const [state, setState] = useState<ReplyState>({
    replyToWho: [],
    replyToId: "",
    replyToRoomId: "",
  })
  const handlePressReply = (item: Message | Reply) => {
    // this might not be necessary
    if (item) {
      const peopleInThread: string[] = []

      if (item.author?.given_name) {
        peopleInThread.push(item.author.given_name)
      }

      if ("replies" in item) {
        item.replies?.items?.slice(10).forEach((reply) => {
          if (reply?.author?.given_name && !peopleInThread.includes(reply.author.given_name)) {
            peopleInThread.push(reply?.author?.given_name)
          }
        })
        console.log("item.id", item.id)
        setState((prev) => ({ ...prev, replyToId: item.id }))
      } else {
        console.log("replies do not exist", item.messageId)
        setState((prev) => ({ ...prev, replyToId: item.messageId }))
      }
      console.log("default exit", item.roomId, peopleInThread, item.roomId)
      setState((prev) => ({
        ...prev,
        replyToWho: peopleInThread,
        replyToRoomId: item.roomId ?? "",
      }))
    }
  }
  return (
    <View>
      <MessageInput
        groupId={props.groupId}
        clearReplyState={() =>
          setState({ ...state, replyToRoomId: "", replyToId: "", replyToWho: [] })
        }
        replyState={state}
      />
      <MessageList
        groupId={props.groupId}
        replies={props.replies}
        style={props.style}
        inputAt={props.inputAt}
        onHandlePressReply={handlePressReply}
        onHandleCreated={() => null}
      />
    </View>
  )
}
