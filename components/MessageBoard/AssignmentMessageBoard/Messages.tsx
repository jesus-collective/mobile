import { GraphQLResult } from "@aws-amplify/api"
import { API } from "aws-amplify"
import GRAPHQL_AUTH_MODE from "aws-amplify-react-native"
import React, { useEffect, useState } from "react"
import Observable from "zen-observable-ts"
import { DirectMessage } from "../../../src/API"
import {
  GetDirectMessageQuery,
  OnCreateDirectMessageReplySubscription,
  OnCreateDirectMessageSubscription,
} from "../../../src/API-messages"
import * as queries from "../../../src/graphql/queries"
import {
  onCreateDirectMessage,
  onCreateDirectMessageReply,
} from "../../../src/graphql/subscriptions"
import MessageThread, { MessageComment } from "./MessageThread"

interface Props {
  room: {
    directMessage: {
      items: Array<any>
    }
    id: string
  }
  open?: boolean
  recipients: Array<string>
}
export default function Messages(props: Props): JSX.Element {
  const { room, recipients, open } = props
  const firstMessage = room?.directMessage?.items?.[0]
  // messageId and messageRoomId could be mismatched in replies.
  const threadReplies =
    room?.directMessage?.items
      .filter((comment: DirectMessage, index: number) => index > 0) // is first index always thread parent?
      .map((comment: DirectMessage) => {
        const { createdAt, updatedAt, content, author, id } = comment
        const repliesToReplies =
          comment?.replies?.items?.map((rtr) => {
            /*
            console.log("Logging a reply:")
            console.log("messageId", comment?.id, rtr?.id)
            console.log("messageRoomId", room?.id)
            console.log("======================")*/
            return {
              id: rtr?.id,
              name: rtr?.author?.given_name + " " + rtr?.author?.family_name,
              position: rtr?.author?.currentRole,
              comment: rtr?.content,
              authorId: rtr?.author?.id,
              messageId: rtr?.id,
              parentId: comment?.id,
              messageRoomId: room?.id,
              createdAt: rtr?.createdAt,
              updatedAt: rtr?.updatedAt,
            }
          }) ?? []
        /*
        console.log("Logging a response:")
        console.log("messageId", id)
        console.log("messageRoomId", room?.id)
        console.log("======================")*/
        return {
          name: author?.given_name + " " + author?.family_name,
          position: author?.currentRole,
          comment: content,
          authorId: author?.id,
          createdAt: createdAt,
          messageId: id,
          messageRoomId: room?.id,
          updatedAt: updatedAt,
          replies: repliesToReplies,
        }
      }) ?? []

  const [thread, setThread] = useState<MessageComment>({
    recipients,
    authorId: firstMessage?.author?.id,
    name: firstMessage?.author?.given_name + " " + firstMessage?.author?.family_name,
    position: firstMessage?.author?.currentRole ?? "",
    comment: firstMessage?.content ?? "",
    roomId: room?.id, // thread id
    createdAt: firstMessage?.createdAt,
    updatedAt: firstMessage?.updatedAt,
    replies: threadReplies,
  })
  const formatResponse = (rep) => {
    return {
      name: rep?.author?.given_name + " " + rep?.author?.family_name,
      position: rep?.author?.currentRole,
      comment: rep?.content,
      authorId: rep?.author?.id,
      createdAt: rep?.createdAt,
      messageId: rep?.id, //message id
      messageRoomId: room?.id, //thread id
      updatedAt: rep?.updatedAt,
      replies: rep?.replies?.items ?? rep?.replies ?? [],
    }
  }
  const formatReply = (rep) => {
    return {
      name: rep?.author?.given_name + " " + rep?.author?.family_name,
      position: rep?.author?.currentRole,
      comment: rep?.content,
      authorId: rep?.author?.id,
      createdAt: rep?.createdAt,
      messageId: rep?.id, //thread id
      messageRoomId: room?.id, //message id
      updatedAt: rep?.updatedAt,
    }
  }
  const appendNewResponse = (msg) => {
    setThread({ ...thread, replies: [...(thread.replies ?? []), formatResponse(msg)] })
  }

  const loadDirectMessageRoom = async () => {
    // Make EditableCourseAssignment to only fetch room names and ids
    // Fetch room data here
    // This could make switching between "My Assignment" and "Assignments to Review" slower
    // TODO: Improve data transformation code
  }
  useEffect(() => {
    const directMessageSubscription = (API.graphql({
      query: onCreateDirectMessage,
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Observable<{
      provider: any
      value: GraphQLResult<OnCreateDirectMessageSubscription>
    }>).subscribe({
      next: async (incoming) => {
        //console.log("Received a subscription update.")
        if (
          incoming?.value?.data?.onCreateDirectMessage &&
          incoming?.value?.data?.onCreateDirectMessage?.messageRoomID === room?.id
        ) {
          //console.log("Received a response", incoming?.value?.data?.onCreateDirectMessage)
          try {
            const directMessage = (await API.graphql({
              query: queries.getDirectMessage,
              variables: {
                id: incoming.value.data.onCreateDirectMessage.id,
              },
              authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
            })) as GraphQLResult<GetDirectMessageQuery>
            if (directMessage.data?.getDirectMessage) {
              appendNewResponse(directMessage.data?.getDirectMessage)
            }
          } catch (e) {
            console.log("Something went wrong. Exception caught")
            console.log(e)
          }
        } else {
          console.log("UPDATE IS NOT IN THE SAME ROOM (?)")
          console.log(
            "incoming?.value?.data?.onCreateDirectMessage?.messageRoomID",
            incoming?.value?.data?.onCreateDirectMessage?.messageRoomID
          )
          console.log("room?.id", room?.id)
        }
      },
      error: (error) => console.log(error),
    })
    const directmessageReplySubscription = (API.graphql({
      query: onCreateDirectMessageReply,
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Observable<{
      provider: any
      value: GraphQLResult<OnCreateDirectMessageReplySubscription>
    }>).subscribe({
      next: async (incoming) => {
        if (
          incoming?.value?.data?.onCreateDirectMessageReply?.parentMessage?.messageRoomID ===
            room?.id &&
          incoming?.value?.data?.onCreateDirectMessageReply?.messageId
        ) {
          try {
            const parentId = incoming.value.data?.onCreateDirectMessageReply?.messageId
            const updatedMessage = (await API.graphql({
              query: queries.getDirectMessage,
              variables: {
                id: incoming.value.data.onCreateDirectMessageReply.messageId,
              },
              authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
            })) as GraphQLResult<GetDirectMessageQuery>
            if (thread?.replies) {
              /*
                1. Find response that got replied to, lives in thread.replies
                2. Get author data from incoming.value.data.onCreateDirectMessageReply
                3. Get updatedMessage(this is the relevant thread), find the new message data, can be compared with messageId to simplify
                4. Combine author data and new message data, format with formatReply to fit into reply array
                5. Append message to replies that belong to the response
                6. ... is parentId incorrect? cannot find thread response when it has no replies.
                   parentId might not be actual parentId when replying to a response.
              */
              const indexInStaleThread = thread.replies.findIndex((r, ind) => {
                console.log("finding index: r.messageId", r?.messageId, "parentId", parentId)
                return r?.messageId === parentId
              })
              console.log("indexInStaleThread", indexInStaleThread)
              const updatedReplies = updatedMessage?.data?.getDirectMessage?.replies?.items
              console.log("updatedreplies", updatedReplies)
              const oldReplies = thread?.replies?.[indexInStaleThread]?.replies ?? []
              console.log("oldReplies", oldReplies)
              const newReply: any = updatedReplies?.filter(
                ({ id: newId }) => !oldReplies.some(({ messageId: oldId }) => oldId === newId)
              )[0]
              console.log("newReply is", newReply)
              if (incoming.value.data?.onCreateDirectMessageReply?.author) {
                newReply.author = incoming.value.data?.onCreateDirectMessageReply?.author
              }
              const a = [...(thread.replies ?? [])]
              if (a) {
                a[indexInStaleThread].replies.push(formatReply(newReply))
                console.log("setting replies to:", a)
                setThread({ ...thread, replies: a })
              } else {
                console.log("a is undefined")
              }
            }
          } catch (e) {
            console.debug(e)
          }
        } else {
          console.log("wrong room!")
        }
      },
      error: (error) => console.log(error),
    })
    return () => {
      directMessageSubscription.unsubscribe()
      directmessageReplySubscription.unsubscribe()
    }
  }, [])
  if (thread?.name !== "" && thread?.comment !== "")
    return <MessageThread open={open} thread={thread} />
  return <></> // dont return anything if data is missing
}
