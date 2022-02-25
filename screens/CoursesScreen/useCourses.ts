import { useCallback, useEffect, useState } from "react"
import { Group } from "src/API"
import { Data } from "../../components/Data/Data"

export const useCourses = () => {
  const [nextToken, setNextToken] = useState<string | undefined | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [courses, setCourses] = useState<Group[]>([])
  const loadCourses = useCallback(async () => {
    setIsLoading(true)
    let tempArr: Group[] = []
    const loadNext = async (next: string | undefined | null = null) => {
      try {
        const json = await Data.groupByTypeForMyGroups("course", next)
        const items = json?.data?.groupByType?.items ?? []
        const token = json?.data?.groupByType?.nextToken ?? null
        if (items.length) {
          tempArr = [...tempArr, ...items]
        }
        if (token) {
          await loadNext(token)
        } else {
          setNextToken(token)
          setCourses((prev) =>
            [...prev, ...tempArr].sort((courseA, courseB) =>
              courseA?.name?.toLowerCase()?.localeCompare(courseB?.name?.toLowerCase())
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
          setCourses((prev) =>
            [...prev, ...tempArr].sort((courseA, courseB) =>
              courseA?.name?.toLowerCase()?.localeCompare(courseB?.name?.toLowerCase())
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
    if (!courses.length) loadCourses()
  }, [])
  return { courses, isLoading, loadMore: loadCourses, nextToken }
}
