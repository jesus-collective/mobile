import { GraphQLResult } from "@aws-amplify/api-graphql"
import { useEffect, useState } from "react"
import { Data } from "../../components/Data/Data"
import { GroupByTypeQuery, ModelSortDirection } from "../../src/API"

export type Group = NonNullable<
  NonNullable<NonNullable<GraphQLResult<GroupByTypeQuery>["data"]>["groupByType"]>["items"]
>[0]

const loadGroups = async (nextToken: string | null | undefined = null) => {
  const listGroup = await Data.groupByTypeForMyGroups("group", ModelSortDirection.DESC, nextToken)
  const listGroupItems = listGroup.data?.groupByType?.items ?? []
  const listGroupNextToken = listGroup.data?.groupByType?.nextToken ?? null
  const sorted =
    listGroupItems.sort((groupA, groupB) => {
      if (groupA?.name && groupB?.name)
        return groupA.name.toLowerCase().localeCompare(groupB.name.toLowerCase())
      return 0
    }) ?? []
  return { groups: sorted, nextToken: listGroupNextToken }
}

export const sortByName = (data: Group[], reverse?: boolean) => {
  if (reverse)
    return data?.sort((groupA, groupB) => {
      if (groupB?.name && groupA?.name)
        return groupB?.name?.toLowerCase()?.localeCompare(groupA?.name?.toLowerCase())
      return 0
    })
  return data?.sort((groupA, groupB) => {
    if (groupB?.name && groupA?.name)
      return groupA?.name?.toLowerCase()?.localeCompare(groupB.name?.toLowerCase())
    return 0
  })
}
export const useGroups = (filter, reverse) => {
  const [groups, setGroups] = useState<Group[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [nextToken, setNextToken] = useState<string | null | undefined>(null)

  const loadGroupData = async () => {
    setIsLoading(true)
    try {
      const allData: Group[] = []
      const loadAll = async (next: string | undefined | null = null) => {
        const groupData = await loadGroups(next)
        allData.push(...groupData.groups)
        if (groupData.nextToken && filter) await loadAll(groupData.nextToken)
        else return { nextToken: groupData.nextToken }
      }
      const groupData = await loadAll(nextToken)

      setGroups([...groups, ...allData])
      setNextToken(groupData?.nextToken)
    } catch (err) {
      console.error({ err })
    } finally {
      setIsLoading(false)
    }
  }
  const loadMore = loadGroupData
  useEffect(() => {
    loadGroupData()
  }, [reverse, filter])
  return { groups: sortByName(groups), isLoading, loadMore, nextToken }
}
