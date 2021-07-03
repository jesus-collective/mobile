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
        const replyCount = comment?.replies?.items?.length ?? 0
        const repliesToReplies =
          comment?.replies?.items?.map((rtr) => {
            return {
              id: rtr?.id,
              name: rtr?.author?.given_name + " " + rtr?.author?.family_name,
              position: rtr?.author?.currentRole,
              comment: rtr?.content,
              authorId: rtr?.author?.id,
              messageId: replyCount < 1 ? comment?.id : rtr?.id, // if there is more than one reply to a response, reply will be directed to first reply
              messageRoomId: room?.id,
              createdAt: rtr?.createdAt,
              updatedAt: rtr?.updatedAt,
            }
          }) ?? []
        return {
          name: author?.given_name + " " + author?.family_name,
          position: author?.currentRole,
          comment: content,
          authorId: author?.id,
          createdAt: createdAt,
          messageId: id, // thread id
          messageRoomId: room?.id, // message id
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
      messageId: room?.id, //thread id
      messageRoomId: rep?.id, //message id
      updatedAt: rep?.updatedAt,
      replies: rep?.repliesToReplies,
    }
  }
  const formatReply = (rep) => {
    //console.log("inside formatReply(rep)", rep)
    return {
      name: rep?.author?.given_name + " " + rep?.author?.family_name,
      position: rep?.author?.currentRole,
      comment: rep?.content,
      authorId: rep?.author?.id,
      createdAt: rep?.createdAt,
      messageId: room?.id, //thread id
      messageRoomId: rep?.id, //message id
      updatedAt: rep?.updatedAt,
    }
  }
  const appendNewResponse = (msg) => {
    setThread({ ...thread, replies: [...(thread.replies ?? []), formatResponse(msg)] })
  }
  const updateReplies = (repliesArr, parent) => {
    // update comment replies where reply was added.
    setThread((prev) => {
      return {
        ...prev,
        replies: prev.replies?.map((rep, index) => {
          if (parent === rep?.messageRoomId) {
            return {
              ...rep,
              replies: repliesArr.map((re) => {
                //console.log("formatReply(re)", formatReply(re))
                return formatReply(re)
              }),
            }
            /*if (rep?.replies) rep.replies.push(formatReply(msg))
            else rep.replies = [formatReply(msg)]
            return rep*/
          }
          return rep
        }),
      }
    })
  }
  const connectDirectSubscriptions = () => {
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
          console.log("Received a response", incoming?.value?.data?.onCreateDirectMessage)
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
          console.log("Received a reply", incoming?.value?.data?.onCreateDirectMessageReply)
          try {
            const parent = incoming.value.data?.onCreateDirectMessageReply?.messageId
            /*const updatedMessage = (await API.graphql({
              query: queries.getDirectMessage,
              variables: {
                id: incoming.value.data.onCreateDirectMessageReply.messageId,
              },
              authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
            })) as GraphQLResult<GetDirectMessageQuery>*/

            //if (updatedMessage.data?.getDirectMessage) {
            // replace old message/replies with incoming data
            // MISTAKE: SENDING THE PARENT COMMENT INSTEAD OF THE NEW COMMENT.
            /*console.log(
                "updatedMessage.data.getDirectMessage",
                updatedMessage.data.getDirectMessage
            )

            const repliesArr = updatedMessage.data.getDirectMessage
            console.log("repliesArr", repliesArr)
            updateReplies(repliesArr?.replies?.items ?? [], parent)
            }
            const updatedRoom = (await API.graphql({
              query: queries.getDirectMessageRoom,
              variables: { id: room?.id },
            })) as GraphQLResult<GetDirectMessageRoomQuery>
            console.log("updatedRoom", updatedRoom)*/
          } catch (e) {
            console.debug(e)
          }
        }
      },
      error: (error) => console.log(error),
    })
  }

  const loadDirectMessageRoom = async () => {
    // Make EditableCourseAssignment to only fetch room names and ids
    // Fetch room data here
    // This could make switching between "My Assignment" and "Assignments to Review" slower
    // TODO: Improve data transformation code
  }
  useEffect(() => {
    connectDirectSubscriptions()
    loadDirectMessageRoom()
    return () => {
      // unsubscribe here
    }
  }, [])
  if (thread?.name !== "" && thread?.comment !== "")
    return <MessageThread open={open} thread={thread} />
  return <></> // dont return anything if data is missing
}
