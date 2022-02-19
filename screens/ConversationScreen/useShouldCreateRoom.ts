import { GraphQLResult } from "@aws-amplify/api/lib/types"
import { useRoute } from "@react-navigation/native"
import { Auth } from "aws-amplify"
import { useEffect, useState } from "react"
import { JCCognitoUser } from "src/types"
import { Data } from "../../components/Data/Data"
import { GetDirectMessageUserQuery } from "../../src/API-customqueries"
type DMUser = NonNullable<GraphQLResult<GetDirectMessageUserQuery>["data"]>["getDirectMessageUser"]
type Options = {
  dmUsers: DMUser[]
  setRoom: any
  setDmUsers: any
}
export const useShouldCreateRoom = (options: Options) => {
  const route = useRoute<any>()
  const { dmUsers, setRoom, setDmUsers } = options
  const [roomSet, setRoomSet] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const getNewUser = async (id: string): Promise<void> => {
      try {
        const getDirectMessageUser = await Data.getDirectMessageUser(id)
        console.log({ getDirectMessageUser })
        if (getDirectMessageUser?.data?.getDirectMessageUser) {
          const tempData = [
            ...dmUsers,
            getDirectMessageUser?.data?.getDirectMessageUser,
          ] as DMUser[]
          setDmUsers(tempData)
          setRoom(getDirectMessageUser.data?.getDirectMessageUser?.roomID)
        }
      } catch (err: any) {
        console.error({ err })
        if (err?.data?.getDirectMessageUser) {
          const tempData = [...dmUsers, err?.data?.getDirectMessageUser] as DMUser[]
          if (tempData) {
            setDmUsers(tempData)
            setRoom(err?.data?.getDirectMessageUser?.roomID)
          }
        }
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
        const createDirectMessageUser1 = await Data.createDirectMessageUserCustom({
          roomID: createDirectMessageRoom.data?.createDirectMessageRoom?.id ?? "",
          userID: user["username"],
          userName: myUserName,
        })
        console.log({ createDirectMessageUser1 })

        const createDirectMessageUser2 = await Data.createDirectMessageUserCustom({
          roomID: createDirectMessageRoom.data?.createDirectMessageRoom?.id ?? "",
          userID: toUserID,
          userName: toUserName,
        })
        console.log(createDirectMessageUser2)
        if (createDirectMessageUser2?.data?.createDirectMessageUser)
          await getNewUser(createDirectMessageUser2.data.createDirectMessageUser.id)
      } catch (err) {
        console.error({ err })
      }
    }
    const shouldCreateRoom = async () => {
      if (!isLoading) setIsLoading(true)
      if (route?.params?.initialUserID) {
        if (
          !dmUsers
            .map((item) => {
              if (item && item.room)
                if (item.room.roomType == null || item.room.roomType == "directMessage")
                  if (
                    item.room.messageUsers?.items?.length == 2 &&
                    (item.room.messageUsers?.items![0]?.userID == route?.params?.initialUserID ||
                      item.room.messageUsers?.items![1]?.userID == route?.params?.initialUserID)
                  ) {
                    console.log("Room exists. Setting room")
                    setRoom(item.roomID)
                    setRoomSet(true)
                    return true
                  }
            })
            .some((z) => {
              return z
            })
        ) {
          if (route?.params?.initialUserID && route?.params?.initialUserName)
            await createRoom(route?.params?.initialUserID, route?.params?.initialUserName)
          setRoomSet(true)
        }
      }
    }
    const load = async () => {
      if (
        dmUsers.length &&
        !roomSet &&
        route?.params?.initialUserID &&
        route?.params?.initialUserName
      )
        await shouldCreateRoom()
      setIsLoading(false)
    }
    load()
    console.log("dmUsers changed", { dmUsers })
  }, [dmUsers])

  return { isCreatingRoom: isLoading }
}
