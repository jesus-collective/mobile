import { useEffect, useState } from "react"
import { Data } from "../../components/Data/Data"
import { Group } from "../../src/API"
export const useGroupsForProfile = (id: string) => {
  const [groups, setGroups] = useState<Group[]>([])
  const [isLoading, setIsLoading] = useState(true)
  // this needs to be returned to determine whether to show load more button or not
  useEffect(() => {
    const loadGroups = async (groupType: string) => {
      setIsLoading(true)
      let tempData: Group[] = []
      const loadNext = async (next: string | null = null) => {
        try {
          const loadA = await Data.getUserProfileGroups(id, next, groupType)
          const groupInfo: Promise<Group>[] = []
          const newGroups = loadA.data?.groupMemberByUser?.items ?? []
          newGroups.forEach((group) => {
            const a = Data.getGroupForItemPage(group?.groupID ?? "")
            groupInfo.push(a)
          })
          const allProm = await Promise.all(groupInfo)
          console.log({ allProm })
          const items = allProm
            .filter((b) => b?.data?.getGroup)
            .map((a) => ({ ...a?.data?.getGroup }))
          tempData = [...tempData, ...items]
        } catch (err) {
          console.log({ err })
        }
      }
      await loadNext()
      setGroups(tempData)
    }
    if (id) {
      loadGroups("group")
    }
  }, [id])
  return { groups, isLoading }
}
