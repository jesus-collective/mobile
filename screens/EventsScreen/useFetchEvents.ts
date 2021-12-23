import { Auth } from "aws-amplify"
import moment from "moment"
import { useEffect, useMemo, useState } from "react"
import { JCCognitoUser } from "src/types"
import { Data } from "../../components/Data/Data"
import { GroupByTypeByTimeQueryVariables, GroupMember, ModelSortDirection } from "../../src/API"
import { JCEvent } from "./EventsList"

export const fetchUpcomingEvents = async (
  reverse?: boolean,
  nextToken: string | undefined | null = null,
  loadAll?: boolean
) => {
  let events: JCEvent[] = []
  let counter = 0
  let cacheNextToken: string | null | undefined = null
  const paginateCount = loadAll ? 100 : 10
  const constructQueryVariables = (
    nextToken: GroupByTypeByTimeQueryVariables["nextToken"],
    limit: number,
    desc?: boolean
  ): GroupByTypeByTimeQueryVariables => {
    return {
      nextToken,
      type: "event",
      limit,
      time: {
        ge: moment().format(),
      },
      sortDirection: desc ? ModelSortDirection.DESC : ModelSortDirection.ASC,
    }
  }
  const loadNext = async (nextToken: string | null = null) => {
    try {
      counter++

      const json = await Data.groupByTypeByTime(
        constructQueryVariables(nextToken, paginateCount, reverse)
      )
      if (json.data?.groupByTypeByTime?.items?.length)
        events = [...events, ...(json.data?.groupByTypeByTime?.items as JCEvent[])]
      if (
        json?.data?.groupByTypeByTime?.nextToken &&
        nextToken !== json?.data?.groupByTypeByTime?.nextToken
      )
        if (loadAll || events.length < paginateCount) {
          await loadNext(json?.data?.groupByTypeByTime?.nextToken)
        } else {
          // Paginate by 10. Will fetch until there are 10 results.
          // If there is still a nextToken when 10 results are returned, it will be stored in cacheNextToken.
          // User can call loadMore() to use this cacheNextToken as nextToken to continue paginating
          cacheNextToken = json?.data?.groupByTypeByTime?.nextToken
        }
    } catch (err) {
      console.error(err)
    }
  }
  await loadNext(nextToken)
  console.debug({ events }, `ran ${counter} times and got: ${events.length} events`, {
    cacheNextToken,
  })
  return { events, cacheNextToken }
}

export const useFetchEvents = ({ reverse, loadAll }: { reverse?: boolean; loadAll?: boolean }) => {
  // Fetches upcoming events
  // Sometimes there is a nextToken even if there are no more items left to be fetched
  // this causes the load more button to display when it shouldn't.
  // Adding the missing key directive to the schema type should fix this.
  const [data, setData] = useState<JCEvent[]>([])
  const [error, setError] = useState<string | undefined>()
  const [currentUser, setCurrentUser] = useState<JCCognitoUser["username"]>()
  const [nextToken, setNextToken] = useState<string | undefined | null>(null)
  const [isLoading, setIsLoading] = useState(true) // should this be reset on call?
  useEffect(() => {
    const loadUser = async () => {
      const getUser: JCCognitoUser = await Auth.currentAuthenticatedUser()
      setCurrentUser(getUser.username)
    }
    loadUser()
  }, [])
  const updateEvents = async (action: any, id: string) => {
    const tempData = [...(data ?? [])]
    const itemLocation = tempData.findIndex((event) => event.id === id)

    const membersArray = tempData[itemLocation].members?.items ?? []
    if (action === "join") {
      membersArray.push({ userID: currentUser } as GroupMember)
      setData(tempData)
    }

    if (action === "leave") {
      const filteredMembers = membersArray?.filter((member) => member?.userID !== currentUser)
      tempData[itemLocation].members.items = filteredMembers
      setData(tempData)
    }
  }
  const loadEvents = async () => {
    try {
      const { events, cacheNextToken } = await fetchUpcomingEvents(reverse, nextToken, loadAll)
      setNextToken(cacheNextToken)
      setData([...data, ...events])
    } catch (err) {
      setError("Something went wrong.")
      setData([])
    } finally {
      setIsLoading(false)
    }
  }
  const joinedGroups: (string | undefined)[] = useMemo(
    () =>
      data
        .filter((eventItem) => eventItem?.members?.items?.find((a) => a?.userID === currentUser))
        .map((event) => event?.id) ?? [],

    [data, currentUser]
  )

  useEffect(() => {
    loadEvents()
  }, [reverse])
  return {
    events: data,
    joinedGroups,
    isLoading,
    error,
    nextToken,
    loadMore: loadEvents,
    updateEvents,
    currentUser,
  }
}
