import { GraphQLResult } from "@aws-amplify/api/lib/types"
import { Auth } from "aws-amplify"
import { useEffect, useState } from "react"
import { JCCognitoUser } from "src/types"
import { Data } from "../../components/Data/Data"
import { GetDirectMessageUserQuery } from "../../src/API-customqueries"

type DMUser = NonNullable<GraphQLResult<GetDirectMessageUserQuery>["data"]>["getDirectMessageUser"]

export const getLastMessageDate = (
  messagesInRoom: NonNullable<NonNullable<NonNullable<DMUser>["room"]>["directMessage"]>["items"]
) => {
  const latestMessageDate = messagesInRoom.sort((messageA, messageB) => {
    return messageB.createdAt.localeCompare(messageA.createdAt)
  })[0]
  return latestMessageDate?.createdAt
}

export const sortMessageRooms = (rooms: DMUser[]) => {
  if (!rooms) return []
  const sortedRooms = rooms?.sort((roomA, roomB) => {
    const compareA = roomA?.room?.directMessage?.items?.length
      ? getLastMessageDate(roomA?.room?.directMessage?.items)
      : roomA?.createdAt ?? ""
    const compareB = roomB?.room?.directMessage?.items?.length
      ? getLastMessageDate(roomB?.room?.directMessage?.items)
      : roomB?.createdAt ?? ""
    return compareB?.localeCompare(compareA)
  })
  return sortedRooms
}
export const loadDmsForRoom = async (roomId: string | undefined) => {
  if (!roomId) return
  const directMessages: any = []
  const loadNext = async (next: string | null | undefined = null) => {
    const dms = await Data.directMessagesByRoom({
      limit: 200,
      messageRoomID: roomId,
      nextToken: next,
    })
    console.log({ dms })
    if (dms?.data?.directMessagesByRoom?.items?.length)
      directMessages.push(...dms.data.directMessagesByRoom.items)
    if (dms?.data?.directMessagesByRoom?.nextToken)
      await loadNext(dms?.data?.directMessagesByRoom?.nextToken)
  }

  await loadNext()
  return directMessages
}

export const removeDirectMessages = async (dmUsers: DMUser[]) => {
  // Takes an Array<DirectMessageUser> and removes each item, and room associated with it
  const roomIds = dmUsers.map((a) => a?.roomID)
  const messageUserIds = dmUsers.map((a) => a?.id)
  const removeRoom = async (id: string) => {
    return Data.deleteDirectMessageRoom(id)
  }
  const removeMessageUser = async (id: string) => {
    return Data.deleteDirectMessageUser(id)
  }
  console.log("========= Removing Stuff ===========")
  try {
    for await (const id of roomIds) {
      if (id) {
        const roomRemoved = await removeRoom(id)
        console.log({ roomRemoved })
      }
    }
  } catch (err: any) {
    console.error({ roomsRemoved: err })
  }
  try {
    for await (const id of messageUserIds) {
      if (id) {
        const messageUsersRemoved = await removeMessageUser(id)
        console.log({ messageUsersRemoved })
      }
    }
  } catch (err: any) {
    console.error({ messageUsersRemoved: err })
  }
  console.log("========= Finished Removing Stuff ===========")
}
export const useDmUsers = () => {
  const [dmUsers, setDmUsers] = useState<DMUser[]>([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const loadAllDmUsers = async () => {
      let count = 0
      if (!isLoading) setIsLoading(true)
      const user = (await Auth.currentAuthenticatedUser()) as JCCognitoUser
      let tempData: DMUser[] = []
      const loadNext = async (next: string | null = null) => {
        count++
        try {
          const query = {
            userID: user["username"],
            limit: 200,
            filter: { roomID: { notContains: "course" } },
            nextToken: next,
          }
          const json = await Data.dmUsersByUserID(query)
          console.log({ [count]: json })
          if (json?.data?.dmUsersByUserID?.nextToken) {
            tempData = [...tempData, ...(json?.data?.dmUsersByUserID?.items ?? [])]
            loadNext(json?.data?.dmUsersByUserID?.nextToken)
          } else if (json?.data?.dmUsersByUserID) {
            tempData = [...tempData, ...(json?.data?.dmUsersByUserID?.items ?? [])]
            // for rooms that have more than 100 dms
            for await (const a of tempData) {
              if (a?.room?.directMessage?.items && a?.room?.directMessage?.nextToken)
                a.room.directMessage.items = await loadDmsForRoom(a?.roomID)
            }
            setDmUsers(tempData)
            if (isLoading) setIsLoading(false)
          }
        } catch (err: any) {
          const tempData = err?.data?.dmUsersByUserID?.items ?? []
          setDmUsers(tempData)
          if (isLoading) setIsLoading(false)
          console.error({ err })
        }
      }
      loadNext()
    }
    loadAllDmUsers()
  }, [])

  return { dmUsers: sortMessageRooms(dmUsers), isLoading, setDmUsers }
}
