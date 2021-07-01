import React, { useEffect } from "react"
import MessageThread, { Person } from "./MessageThread"

interface Props {
  room: any
  open?: boolean
  recipients: Array<string>
}
export default function Messages(props: Props): JSX.Element {
  const { room, recipients, open } = props
  const personData: Person = {
    recipients,
    authorId: room?.directMessage?.items?.[0]?.author?.id,
    name:
      room?.directMessage?.items?.[0]?.author?.given_name +
      " " +
      room?.directMessage?.items?.[0]?.author?.family_name,
    position: room?.directMessage?.items?.[0]?.author?.currentRole ?? "",
    comment: room?.directMessage?.items?.[0]?.content ?? "",
    roomId: room?.id,
    createdAt: room?.directMessage?.items?.[0]?.createdAt,
    updatedAt: room?.directMessage?.items?.[0]?.updatedAt,
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
            updatedAt: comment?.updatedAt,
            replies: comment?.replies?.items?.map((rtr) => {
              return {
                name: rtr?.author?.given_name + " " + rtr?.author?.family_name,
                position: rtr?.author?.currentRole,
                comment: rtr?.content,
                authorId: rtr?.author?.id,
                createdAt: rtr?.createdAt,
                updatedAt: rtr?.updatedAt,
              }
            }),
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
