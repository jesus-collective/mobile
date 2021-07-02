import React, { useEffect } from "react"
import { DirectMessage } from "src/API"
import MessageThread, { Person } from "./MessageThread"

interface Props {
  room: any
  open?: boolean
  recipients: Array<string>
}
export default function Messages(props: Props): JSX.Element {
  const { room, recipients, open } = props
  const currentRoom = room?.directMessage?.items?.[0]
  const personData: Person = {
    recipients,
    authorId: currentRoom?.author?.id,
    name: currentRoom?.author?.given_name + " " + currentRoom?.author?.family_name,
    position: currentRoom?.author?.currentRole ?? "",
    comment: currentRoom?.content ?? "",
    roomId: room?.id,
    createdAt: currentRoom?.createdAt,
    updatedAt: currentRoom?.updatedAt,
    replies:
      room?.directMessage?.items
        .filter((comment: DirectMessage, index: number) => index > 0) // is first index always thread parent?
        .map((comment: DirectMessage) => {
          const { createdAt, updatedAt, content, author, id } = comment
          const replyCount = comment?.replies?.items?.length ?? 0
          // if there is more than one reply to a response, reply will be directed to first reply
          const repliesToReplies =
            comment?.replies?.items?.map((rtr) => {
              return {
                name: rtr?.author?.given_name + " " + rtr?.author?.family_name,
                position: rtr?.author?.currentRole,
                comment: rtr?.content,
                authorId: rtr?.author?.id,
                messageId: room?.id,
                messageRoomId: replyCount < 1 ? rtr?.id : comment?.id,
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
            messageId: room?.id,
            messageRoomId: id,
            updatedAt: updatedAt,
            replies: repliesToReplies,
          }
        }) ?? [],
  }
  const loadDirectMessageRoom = async () => {
    // Make EditableCourseAssignment to only fetch room names and ids
    // Fetch room data here
    // This could make switching between "My Assignment" and "Assignments to Review" slower
    // Improve data transformation logic
  }
  useEffect(() => {
    console.log("rerendering")
    loadDirectMessageRoom()
  }, [])
  if (personData?.name !== "" && personData?.comment !== "")
    return <MessageThread open={open} person={personData} />
  return <></> // dont return anything if data is missing
}
