import { GraphQLResult } from "@aws-amplify/api"
import { useCallback, useEffect, useState } from "react"
import { ListOrganizationsQuery } from "src/API"
import { Data } from "../../components/Data/Data"

export type Org = NonNullable<
  NonNullable<
    NonNullable<GraphQLResult<ListOrganizationsQuery>["data"]>["listOrganizations"]
  >["items"]
>[0]
export const useOrgs = () => {
  const [nextToken, setNextToken] = useState<string | undefined | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [orgs, setOrgs] = useState<Org[]>([])
  const loadOrgs = useCallback(async () => {
    setIsLoading(true)
    let tempArr: Org[] = []
    const loadNext = async (next: string | undefined | null = null) => {
      try {
        const json = await Data.listOrgs(next)
        const items = json?.data?.listOrganizations?.items ?? []
        const token = json?.data?.listOrganizations?.nextToken ?? null
        if (items.length) {
          tempArr = [...tempArr, ...items]
        }
        if (token) {
          await loadNext(token)
        } else {
          setNextToken(token)
          setOrgs((prev) =>
            [...prev, ...tempArr].sort((orgA, orgB) =>
              orgA?.orgName?.toLowerCase()?.localeCompare(orgB?.orgName?.toLowerCase())
            )
          )
        }
      } catch (err: any) {
        console.error({ err })
        const items = err?.data?.listOrganizations?.items ?? []
        const token = err?.data?.listOrganizations?.nextToken ?? null
        if (items.length) {
          tempArr = [...tempArr, ...items]
        }
        if (token) {
          await loadNext(token)
        } else {
          setNextToken(token)
          setOrgs((prev) =>
            [...prev, ...tempArr].sort((orgA, orgB) =>
              orgA?.orgName?.toLowerCase()?.localeCompare(orgB?.orgName?.toLowerCase())
            )
          )
        }
      } finally {
        setIsLoading(false)
      }
    }
    await loadNext()
  }, [nextToken])
  useEffect(() => {
    if (!orgs.length) loadOrgs()
  }, [])
  return { orgs, isLoading, loadMore: loadOrgs, nextToken }
}
