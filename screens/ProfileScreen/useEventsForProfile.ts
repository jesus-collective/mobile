import { useEffect, useState } from "react"
import { Group } from "src/API"
import { Data } from "../../components/Data/Data"
import { JCEvent } from "../EventsScreen/EventsList"
import { useFetchEvents } from "../EventsScreen/useFetchEvents"

export const useEventsForProfile = (userId: string) => {
  const { events, isLoading, nextToken, updateEvents } = useFetchEvents({
    loadAll: true,
  })
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
      for await (const event of events) {
        const groupData = await getGroup(event?.id)
        isJoined.push(groupData)
      }
      const joinedGroups = events.filter((item, index) => isJoined[index])
      setProfileUserEvents(joinedGroups)
    }
    if (events) getUserGroups()
  }, [events])

  return { events: profileUserEvents, isLoading, nextToken, updateEvents }
}
