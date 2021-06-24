import React from "react"
import MessageThread, { Person } from "./MessageThread"

interface Props {
  room: any
}
export default function Messages(props: Props): JSX.Element {
  const { room } = props
  console.log("room", room)
  const personData: Person = {
    authorId: room?.directMessage?.items?.[0]?.author?.id,
    name:
      room?.directMessage?.items?.[0]?.author?.given_name +
      " " +
      room?.directMessage?.items?.[0]?.author?.family_name,
    position: room?.directMessage?.items?.[0]?.author?.currentRole ?? "",
    comment: room?.directMessage?.items?.[0]?.content ?? "",
    createdAt: room?.directMessage?.items?.[0]?.createdAt,
    replies:
      room?.directMessage?.items
        .filter((a, index) => index > 0) // is first index always thread parent?
        .map((comment) => {
          return {
            name: comment?.author?.given_name + " " + comment?.author?.family_name,
            position: comment?.author?.currentRole,
            comment: comment?.content,
            authorId: comment?.author?.id,
            createdAt: comment?.createdAt,
          }
        }) ?? [],
  }
  if (personData?.name !== "" && personData?.comment !== "")
    return <MessageThread person={personData} />
  return <></> // dont return anything if data is missing
}
