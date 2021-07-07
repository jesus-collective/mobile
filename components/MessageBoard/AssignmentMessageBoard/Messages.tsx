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
} from "../../../src/graphql-custom/subscriptions"
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
  const threadReplies: Array<MessageComment> =
    room?.directMessage?.items
      .filter((comment: DirectMessage, index: number) => index > 0) // is first index always thread parent?
      .map((comment: DirectMessage) => {
        const { createdAt, updatedAt, content, author, id } = comment
        const repliesToReplies =
          comment?.replies?.items?.map((rtr) => {
            return {
              id: rtr?.id,
              name: rtr?.author?.given_name + " " + rtr?.author?.family_name,
              currentRole: rtr?.author?.currentRole,
              comment: rtr?.content,
              attachment: rtr?.attachment,
              attachmentName: rtr?.attachmentName,
              attachmentOwner: rtr?.attachmentOwner,
              authorId: rtr?.author?.id,
              messageId: comment?.id,
              messageRoomId: room?.id,
              createdAt: rtr?.createdAt,
              updatedAt: rtr?.updatedAt,
            }
          }) ?? []
        return {
          id: comment?.id,
          name: author?.given_name + " " + author?.family_name,
          currentRole: author?.currentRole,
          attachment: comment?.attachment,
          attachmentName: comment?.attachmentName,
          attachmentOwner: comment?.attachmentOwner,
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
    attachment: firstMessage?.attachment,
    attachmentName: firstMessage?.attachmentName,
    attachmentOwner: firstMessage?.attachmentOwner,
    name: firstMessage?.author?.given_name + " " + firstMessage?.author?.family_name,
    currentRole: firstMessage?.author?.currentRole ?? "",
    comment: firstMessage?.content ?? "",
    roomId: room?.id, // thread id
    createdAt: firstMessage?.createdAt,
    updatedAt: firstMessage?.updatedAt,
    replies: threadReplies,
  })
  const formatResponse = (rep) => {
    return {
      id: rep?.id,
      name: rep?.author?.given_name + " " + rep?.author?.family_name,
      currentRole: rep?.author?.currentRole,
      attachment: rep?.attachment,
      attachmentName: rep?.attachmentName,
      attachmentOwner: rep?.attachmentOwner,
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
      attachment: rep?.attachment,
      attachmentName: rep?.attachmentName,
      attachmentOwner: rep?.attachmentOwner,
      name: rep?.author?.given_name + " " + rep?.author?.family_name,
      currentRole: rep?.author?.currentRole,
      comment: rep?.content,
      authorId: rep?.author?.id,
      createdAt: rep?.createdAt,
      messageId: rep?.messageId, //message id
      messageRoomId: room?.id, //thread id
      updatedAt: rep?.updatedAt,
    }
  }
  const appendNewResponse = (msg: DirectMessage) => {
    setThread({ ...thread, replies: [...(thread.replies ?? []), formatResponse(msg)] })
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
              appendNewResponse(directMessage.data?.getDirectMessage as DirectMessage)
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
              const indexInStaleThread = thread.replies.findIndex((r) => {
                return r?.messageId === parentId
              })
              //console.log("indexInStaleThread", indexInStaleThread)
              if (indexInStaleThread >= 0) {
                const updatedReplies = updatedMessage?.data?.getDirectMessage?.replies?.items
                //console.log("incoming.value.data?.onCreateDirectMessageReply",incoming.value.data?.onCreateDirectMessageReply)
                const newReply = updatedReplies?.filter(
                  (reply) =>
                    reply?.id === incoming.value.data?.onCreateDirectMessageReply?.messageId || // reply to response
                    reply?.id === incoming.value.data?.onCreateDirectMessageReply?.id //reply to reply
                )?.[0]
                console.log(updatedReplies)
                if (newReply) {
                  //console.log("newReply is", newReply)
                  if (incoming.value.data?.onCreateDirectMessageReply?.author) {
                    //doesn't it?
                    newReply.author = incoming.value.data?.onCreateDirectMessageReply?.author
                  }
                  const a = [...(thread.replies ?? [])]
                  a?.[indexInStaleThread]?.replies?.push(formatReply(newReply))
                  setThread({ ...thread, replies: a })
                } else {
                  console.log("newReply doesnt exist")
                }
              } else {
                console.log("indexInStaleThread: ", indexInStaleThread)
              }
            } else {
              console.log("thread.replies not found")
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
  return <MessageThread open={open} thread={thread} />
}
