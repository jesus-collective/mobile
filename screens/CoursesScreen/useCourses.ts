import { Auth } from "aws-amplify"
import { useCallback, useEffect, useState } from "react"
import { JCCognitoUser } from "src/types"
import { Data } from "../../components/Data/Data"
import { Group, ModelSortDirection } from "../../src/API"

export const useCourses = () => {
  const [nextToken, setNextToken] = useState<string | undefined | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [currentUser, setCurrentUser] = useState<JCCognitoUser["username"]>("")
  const [courses, setCourses] = useState<Group[]>([])
  const loadCourses = useCallback(async () => {
    setIsLoading(true)
    let tempArr: Group[] = []
    const loadNext = async (next: string | undefined | null = null) => {
      try {
        const json = await Data.groupByTypeForMyGroups("course", ModelSortDirection.ASC, next)
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
            [...prev, ...tempArr].sort((courseA, courseB) => {
              if (courseA?.name && courseB?.name)
                return courseA.name.toLowerCase()?.localeCompare(courseB.name.toLowerCase())
              return 0
            })
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
            [...prev, ...tempArr].sort((courseA, courseB) => {
              if (courseA?.name && courseB?.name)
                return courseA.name.toLowerCase().localeCompare(courseB.name.toLowerCase())
              return 0
            })
          )
        }
      } finally {
        setIsLoading(false)
      }
    }
    await loadNext()
  }, [nextToken])
  useEffect(() => {
    const loadUser = async () => {
      const user: JCCognitoUser = await Auth.currentAuthenticatedUser()
      setCurrentUser(user.username)
    }
    loadUser()
    if (!courses.length) loadCourses()
  }, [])
  return { currentUser, courses, isLoading, loadMore: loadCourses, nextToken }
}
