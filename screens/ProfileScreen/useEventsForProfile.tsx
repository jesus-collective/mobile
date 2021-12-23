import { useEffect, useState } from "react"
import { Group } from "src/API"
import { Data } from "../../components/Data/Data"
import { JCEvent } from "../../screens/EventsScreen/EventsList"
import { useFetchEvents } from "../../screens/EventsScreen/useFetchEvents"

export const useEventsForProfile = (userId: string) => {
  const { data, isLoading, nextToken, updateEvents } = useFetchEvents({ loadAll: true })
  const [profileUserEvents, setProfileUserEvents] = useState<JCEvent[]>([])
  useEffect(() => {
    const getGroup = async (id: Group["id"]) => {
      const currentEvent = await Data.getGroupForItemPage(id)
      const result =
        Boolean(
          currentEvent?.data?.getGroup?.members?.items?.find((member) => member?.userID === userId)
        ) || currentEvent?.data?.getGroup?.owner === userId
      return result
    }
    const getUserGroups = async () => {
      const isJoined: Array<boolean> = []
      for await (const event of data) {
        const groupData = await getGroup(event?.id)
        isJoined.push(groupData)
      }
      const joinedGroups = data.filter((item, index) => isJoined[index])
      setProfileUserEvents(joinedGroups)
    }
    if (data) getUserGroups()
  }, [data])

  return { events: profileUserEvents, isLoading, nextToken, updateEvents }
}
