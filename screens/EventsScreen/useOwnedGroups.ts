import { useEffect, useState } from "react"
import { Group } from "src/API"
import { Data } from "../../components/Data/Data"
import { loadUser } from "./GroupUtils"

export const useOwnedGroups = (data: Group[]) => {
  const [user, setUser] = useState<string | null>(null)
  const [ownedGroups, setOwnedGroups] = useState<string[]>([])
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
    if (user) {
      loadOwnerData()
    }
  }, [data, user])
  return { ownedGroups }
}
