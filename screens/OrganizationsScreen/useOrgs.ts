import { GraphQLResult } from "@aws-amplify/api"
import { useEffect, useState } from "react"
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
  // TODO: Pagination
  const loadOrgs = async () => {
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
          setOrgs((prev) => [...prev, ...tempArr])
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
          setOrgs((prev) => [...prev, ...tempArr])
        }
      } finally {
        setIsLoading(false)
      }
    }
    await loadNext()
  }
  useEffect(() => {
    loadOrgs()
  }, [])
  console.log({ orgs })
  return { orgs, isLoading, loadMore: loadOrgs, nextToken }
}
