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
import * as queries from "../../../src/graphql-custom/queries"
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
              messageId: comment?.id,
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
      id: rep?.id,
      name: rep?.author?.given_name + " " + rep?.author?.family_name,
      position: rep?.author?.currentRole,
      comment: rep?.content,
      authorId: rep?.author?.id,
      createdAt: rep?.createdAt,
      messageId: rep?.messageId, //thread id
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
        if (
          incoming?.value?.data?.onCreateDirectMessage &&
          incoming?.value?.data?.onCreateDirectMessage?.messageRoomID === room?.id
        ) {
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
            console.log("Error. Exception caught", e)
          }
        } else {
          console.log("Update is not in this room.")
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
          room?.id === incoming?.value?.data?.onCreateDirectMessageReply?.messageRoomID &&
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
              const indexInStaleThread = thread.replies.findIndex((r, ind) => {
                return r?.messageId === parentId
              })
              //console.log("indexInStaleThread", indexInStaleThread)
              if (indexInStaleThread > 0) {
                const updatedReplies = updatedMessage?.data?.getDirectMessage?.replies?.items
                //console.log("updatedReplies", updatedReplies)
                const oldReplies = thread?.replies?.[indexInStaleThread]?.replies ?? []
                //console.log("oldReplies", oldReplies)
                const newReply: any = updatedReplies?.filter(
                  ({ id: newId }) => !oldReplies.some(({ messageId: oldId }) => oldId === newId)
                )[0]
                //console.log("newReply is", newReply)
                if (incoming.value.data?.onCreateDirectMessageReply?.author) {
                  newReply.author = incoming.value.data?.onCreateDirectMessageReply?.author
                }
                const a = [...(thread.replies ?? [])]
                a[indexInStaleThread].replies.push(formatReply(newReply))
                setThread({ ...thread, replies: a })
              }
            }
          } catch (e) {
            console.debug(e)
          }
        } else {
          console.log("Message not for this room.")
        }
      },
      error: (error) => console.log(error),
    })
    return () => {
      directMessageSubscription.unsubscribe()
      directmessageReplySubscription.unsubscribe()
    }
  }, [thread])
  if (thread?.name !== "" && thread?.comment !== "")
    return <MessageThread open={open} thread={thread} />
  return <></> // dont return anything if data is missing
}
