import { useEffect, useState } from "react"
import { Group } from "screens/GroupsScreen/useGroups"
import { Data } from "../../components/Data/Data"
import { loadUser } from "./GroupUtils"

export const useMyGroups = (data: Group[]) => {
  const [user, setUser] = useState<string | null>(null)
  const [ownedGroups, setOwnedGroups] = useState<string[]>([])
  const [joinedGroups, setJoinedGroups] = useState<string[]>([])
  const handleUpdateJoined = (newJoined: string[]) => {
    setJoinedGroups(newJoined)
  }
  useEffect(() => {
    // TODO: can user be pulled from context?
    const loadUserId = async () => {
      try {
        const userId = await loadUser()
        setUser(userId)
      } catch (err) {
        console.log({ err })
      }
    }
    loadUserId()
  }, [])
  useEffect(() => {
    const loadOwnerData = async () => {
      data.forEach((item) => {
        if (item?.id) {
          const getGroup = Data.getGroupForOwner(item.id)
          getGroup.then((json) => {
            if (json.data?.getGroup?.owner === user) {
              // ???
              if (item?.id) setOwnedGroups((prev) => [...prev, item.id])
            }
          })
        }
      })
    }
    const loadJoinedData = async () => {
      if (data.length) {
        const loadJoinedData = async () => {
          data.forEach((item: any) => {
            if (item?.id) {
              const groupMemberByUser = Data.groupMemberByUser(user, item.id)
              groupMemberByUser.then((json) => {
                if ((json.data?.groupMemberByUser?.items?.length ?? 0) > 0) {
                  setJoinedGroups((prev) => [...prev, item.id])
                }
              })
            }
          })
        }
        loadJoinedData()
      }
    }
    if (user) {
      loadJoinedData()
      loadOwnerData()
    }
  }, [data, user])
  return { ownedGroups, joinedGroups, handleUpdateJoined }
}
