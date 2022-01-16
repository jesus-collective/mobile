import { GraphQLResult } from "@aws-amplify/api/lib/types"
import { Auth } from "aws-amplify"
import { useEffect, useState } from "react"
import { GetDirectMessageUserQuery } from "src/API-customqueries"
import { JCCognitoUser } from "src/types"
import { Data } from "../../components/Data/Data"
type HandleDMSOptions = {
  initialUserID: string | null
  initialUserName: string | null
  setRoom: (roomId: string) => void
}

export const useAndHandleDms = (options: HandleDMSOptions) => {
  const { initialUserID, initialUserName, setRoom } = options
  const [isLoading, setIsLoading] = useState(true)
  const [dmUsers, setDmUsers] = useState<
    NonNullable<GraphQLResult<GetDirectMessageUserQuery>["data"]>["getDirectMessageUser"][]
  >([])

  useEffect(() => {
    const loadAllDmUsers = async () => {
      if (!isLoading) setIsLoading(true)
      const user = (await Auth.currentAuthenticatedUser()) as JCCognitoUser
      let tempData: any = []
      const loadNext = async (next: string | null = null) => {
        try {
          const query = {
            limit: 200,
            filter: { userID: { eq: user["username"] } },
            nextToken: next,
          }
          const json = await Data.listDirectMessageUsers(query)
          console.log({ json })
          if (json?.data?.listDirectMessageUsers?.nextToken) {
            tempData = [...tempData, ...(json?.data?.listDirectMessageUsers?.items ?? [])]
            loadNext(json?.data?.listDirectMessageUsers?.nextToken)
          } else if (json?.data?.listDirectMessageUsers) {
            tempData = [...tempData, ...(json?.data?.listDirectMessageUsers?.items ?? [])]
            setDmUsers(tempData)
            setIsLoading(false)
          }
        } catch (err) {
          console.error({ err })
        }
      }
      loadNext()
    }
    loadAllDmUsers()
  }, [])
  useEffect(() => {
    //after the completion of loadAllDmusers, must check if should create room.
    const getNewUser = async (id: string): Promise<void> => {
      try {
        const getDirectMessageUser = await Data.getDirectMessageUser(id)
        console.log({ getDirectMessageUser })
        if (getDirectMessageUser?.data?.getDirectMessageUser) {
          setDmUsers((prev) => [...prev, getDirectMessageUser?.data?.getDirectMessageUser])
          setRoom(getDirectMessageUser.data?.getDirectMessageUser?.roomID)
        }
      } catch (err) {
        console.error(err)
      }
    }
    const createRoom = async (toUserID: string, toUserName: string) => {
      try {
        const user: JCCognitoUser = await Auth.currentAuthenticatedUser()
        const createDirectMessageRoom = await Data.createDirectMessageRoom({
          name: "",
          roomType: "directMessage",
        })
        console.log({ createDirectMessageRoom })
        const myUserName = user.attributes?.given_name + " " + user.attributes?.family_name
        const createDirectMessageUser1 = await Data.createDirectMessageUser({
          roomID: createDirectMessageRoom.data?.createDirectMessageRoom?.id ?? "",
          userID: user["username"],
          userName: myUserName,
        })
        console.log({ createDirectMessageUser1 })

        const createDirectMessageUser2 = await Data.createDirectMessageUser({
          roomID: createDirectMessageRoom.data?.createDirectMessageRoom?.id ?? "",
          userID: toUserID,
          userName: toUserName,
        })
        console.log(createDirectMessageUser2)
        if (createDirectMessageUser2?.data?.createDirectMessageUser)
          getNewUser(createDirectMessageUser2.data.createDirectMessageUser.id)
      } catch (err) {
        console.error({ err })
      }
    }
    const shouldCreateRoom = async () => {
      if (initialUserID) {
        if (
          !dmUsers
            .map((item) => {
              if (item && item.room)
                if (item.room.roomType == null || item.room.roomType == "directMessage")
                  if (
                    item.room.messageUsers?.items?.length == 2 &&
                    (item.room.messageUsers?.items![0]?.userID == initialUserID ||
                      item.room.messageUsers?.items![1]?.userID == initialUserID)
                  ) {
                    console.log("Room exists. Setting room")
                    setRoom(item.roomID)
                    return true // not needed
                  }
            })
            .some((z) => {
              return z
            })
        ) {
          if (initialUserID && initialUserName) createRoom(initialUserID, initialUserName)
        }
      }
    }
    if (dmUsers.length && initialUserID && initialUserName) shouldCreateRoom()
  }, [dmUsers])
  useEffect(() => {
    //deleteStuff()
    //checkDirectMessageRooms()
  }, [])
  return { dmUsers, isLoading }
}

// const checkDirectMessageRooms = async () => {
//   const rooms = await Data.listDirectMessageRooms({})
//   console.log({ rooms })
// }
// const deleteStuff = async () => {
//   const directmessagerooms = ["2a7a1daf-3eb7-4c92-9f1c-d4ede6c4cab9"]
//   const directmessageusers = ["4a037e96-b486-41d2-b283-cfc009aa4cf7"]
//   for await (const id of directmessageusers) {
//     try {
//       const deleteStatus = (await API.graphql({
//         query: mutations.deleteDirectMessageUser,
//         variables: {
//           input: {
//             id: id,
//           },
//         },
//         authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
//       })) as Promise<GraphQLResult<DeleteDirectMessageUserMutation>>
//       console.log({ deleteStatus })
//     } catch (err) {
//       console.error({ err })
//     }
//   }
//   for await (const id of directmessagerooms) {
//     try {
//       const deleteStatus = (await API.graphql({
//         query: mutations.deleteDirectMessageRoom,
//         variables: {
//           input: {
//             id: id,
//           },
//         },
//         authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
//       })) as Promise<GraphQLResult<DeleteDirectMessageRoomMutation>>
//       console.log({ deleteStatus })
//     } catch (err) {
//       console.error({ err })
//     }
//   }
// }
