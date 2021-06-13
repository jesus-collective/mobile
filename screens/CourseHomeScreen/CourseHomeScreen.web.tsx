import { GraphQLResult } from "@aws-amplify/api/lib/types"
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons"
import { API, Auth } from "aws-amplify"
import GRAPHQL_AUTH_MODE from "aws-amplify-react-native"
import { convertToRaw, EditorState } from "draft-js"
import moment from "moment-timezone"
import { Container, Drawer, StyleProvider } from "native-base"
import React from "react"
import { Dimensions } from "react-native"
import {
  CreateCourseBackOfficeStaffMutation,
  CreateCourseInstructorsMutation,
  CreateCourseLessonInput,
  CreateCourseLessonMutation,
  CreateCourseTriadCoachesMutation,
  CreateCourseTriadsInput,
  CreateCourseTriadsMutation,
  CreateCourseTriadUsersMutation,
  CreateCourseWeekInput,
  CreateCourseWeekMutation,
  DeleteCourseBackOfficeStaffMutation,
  DeleteCourseInstructorsMutation,
  DeleteCourseLessonMutation,
  DeleteCourseTriadCoachesMutation,
  DeleteCourseTriadsMutation,
  DeleteCourseTriadUsersMutation,
  DeleteCourseWeekMutation,
  GetGroupQuery,
  SearchUsersQuery,
  UpdateCourseInfoMutation,
  UpdateCourseLessonMutation,
  UpdateCourseTriadsMutation,
  UpdateCourseWeekMutation,
} from "src/API"
import { GetCourseInfoQuery } from "src/API-courses"
import { JCCognitoUser } from "src/types"
import CourseSidebar from "../../components/CourseSidebar/CourseSidebar"
import CourseChat from "../../components/CourseViewer/CourseChat"
import CourseCoaching from "../../components/CourseViewer/CourseCoaching"
import {
  AgendaItems,
  CourseContext,
  CourseInfo,
  CourseLesson,
  CourseState,
  CourseToDo,
  CourseWeekObj,
  MarkedDates,
} from "../../components/CourseViewer/CourseContext"
import CourseDetail from "../../components/CourseViewer/CourseDetail"
import CourseHome from "../../components/CourseViewer/CourseHome"
import FloatingButton from "../../components/FloatingButton/FloatingButton"
import FloatingButtonStyles from "../../components/FloatingButton/FloatingButtonStyles"
import JCComponent from "../../components/JCComponent/JCComponent"
import Validate from "../../components/Validate/Validate"
import getTheme from "../../native-base-theme/components"
import * as courseQueries from "../../src/graphql-custom/courses"
import * as mutations from "../../src/graphql/mutations"
import * as queries from "../../src/graphql/queries"

interface Props {
  navigation: any
  route: any
}
type CourseUser = NonNullable<
  NonNullable<
    NonNullable<
      NonNullable<
        NonNullable<
          NonNullable<NonNullable<NonNullable<CourseInfo>["triads"]>["items"]>[0]
        >["users"]
      >["items"]
    >[0]
  >["user"]
>
export default class CourseHomeScreenImpl extends JCComponent<Props, CourseState> {
  constructor(props: Props) {
    super(props)

    this.state = {
      ...super.getInitialState(),
      currentScreen: props.route.params.screen || "Home",
      showMap: false,
      loadId: props.route.params.id,
      data: null,
      currentUser: null,
      courseData: null,
      courseWeeks: {},
      isEditable: false,
      editMode: false,
      validationError: "",
      activeWeek: "",
      activeLesson: "",
      activeMessageBoard: "cohort",
      activeCourseActivity: "today",
      showChat: false,
      dateFilter: "",
    }
    Auth.currentAuthenticatedUser().then((user: JCCognitoUser) => {
      this.setState({ currentUser: user.username }, () => {
        this.setInitialData(
          props,
          user.getSignInUserSession()?.getAccessToken().payload["cognito:groups"]
        )
      })
    })
  }
  static Provider = CourseContext.Provider

  setInitialData(props: Props, groups: string[]): void {
    const getGroup = API.graphql({
      query: queries.getGroup,
      variables: { id: props.route.params.id },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<GetGroupQuery>>
    const getCourse = API.graphql({
      query: courseQueries.getCourseInfo,
      variables: { id: props.route.params.id },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<GetCourseInfoQuery>>
    const processResults2 = (json: GraphQLResult<GetCourseInfoQuery>) => {
      console.log({ courseData: json })
      this.setState({ courseData: json.data?.getCourseInfo })

      const courseWeeks: CourseState["courseWeeks"] = {}

      json.data?.getCourseInfo?.courseWeeks?.items?.forEach((week) => {
        if (week?.id) {
          const lessonsObj: CourseWeekObj["lessons"] = {}

          week.lessons?.items
            ?.sort((a, b) => (a?.time ?? "")?.localeCompare(b?.time ?? ""))
            .forEach((lesson) => {
              if (lesson?.id) {
                lessonsObj[lesson.id] = lesson
              }
            })

          const weekObj: CourseWeekObj = { ...week, lessons: lessonsObj }
          courseWeeks[week.id] = weekObj
        }
      })

      this.setState({ courseWeeks })
      this.setState({ activeWeek: Object.keys(courseWeeks)[0] ?? "" })
    }
    getCourse.then(processResults2).catch(processResults2)
    const processResults = (json: GraphQLResult<GetGroupQuery>) => {
      const isEditable =
        json.data?.getGroup?.owner == this.state.currentUser || groups.includes("courseAdmin")
      console.log({
        isEditable: isEditable,
        groupData: json,
      })
      this.setState({ isEditable: isEditable, data: json.data?.getGroup })
    }
    getGroup.then(processResults).catch(processResults)
  }

  openHome = (): void => {
    this.props.navigation.push("HomeScreen")
  }
  mapChanged = (): void => {
    this.setState({ showMap: !this.state.showMap })
  }
  validate(): boolean {
    const validation = Validate.Course(this.state.data)
    this.setState({ validationError: validation.validationError })
    return validation.result
  }

  setEditMode = (editMode: boolean): void => {
    this.setState({ editMode: editMode }, () => {
      this.forceUpdate()
    })
  }

  setActiveScreen = (screen: string): void => {
    this.setState({
      currentScreen: screen,
    })
  }

  setActiveWeek = (id: string): void => {
    this.setState({
      activeWeek: id,
      activeLesson: "",
      dateFilter: "",
    })
  }

  setActiveLesson = (id: string): void => {
    this.setState({
      activeLesson: id,
    })
  }

  setDateFilter = (dateFilter: string): void => {
    this.setState({ dateFilter })
  }

  setActiveMessageBoard = (messageBoard: string): void => {
    this.setState({
      activeMessageBoard: messageBoard,
    })
  }

  setActiveCourseActivity = (courseActivity: string): void => {
    this.setState({
      activeCourseActivity: courseActivity,
    })
  }

  syncLessonNumbers = async (): Promise<void> => {
    const { lessons } = this.state.courseWeeks[this.state.activeWeek]

    const sortedLessons = Object.values(lessons).sort((a, b) =>
      (a?.time ?? "")?.localeCompare(b?.time ?? "")
    )

    const promises = sortedLessons.map(async (lesson, idx) => {
      if (lesson?.id) {
        await this.updateLesson(
          this.state.activeWeek,
          lesson.id as string,
          "lesson",
          (idx + 1).toString()
        )
      }
    })

    await Promise.all(promises)

    const courseWeeks = { ...this.state.courseWeeks }

    const lessonsPostSort: CourseWeekObj["lessons"] = {}

    Object.values(courseWeeks?.[this.state.activeWeek].lessons)
      .sort((a, b) => (a?.time ?? "")?.localeCompare(b?.time ?? ""))
      .forEach((lesson) => {
        if (lesson?.id) {
          lessonsPostSort[lesson.id] = lesson
        }
      })

    courseWeeks[this.state.activeWeek].lessons = lessonsPostSort

    this.setState({ courseWeeks })

    console.debug("SORT COMPLETE")
  }

  updateBackOfficeStaff = async (
    value: NonNullable<NonNullable<GraphQLResult<SearchUsersQuery>["data"]>["searchUsers"]>["items"]
  ): Promise<void> => {
    console.log(this.state.courseData?.backOfficeStaff?.items)
    const del = this.state.courseData?.backOfficeStaff?.items?.filter(
      (x) => !value?.map((z) => z.id).includes(x?.userID)
    )
    const add = value?.filter(
      (x) => !this.state.courseData?.backOfficeStaff?.items?.map((z) => z.userID).includes(x.id)
    )
    // const delTriadID= this.state.courseData.triads.items[index].users.items.map((item)=>{del.contains(item.})
    console.log({ del: del })
    add?.map(async (item) => {
      let createCourseBackOfficeStaff: any
      try {
        console.log({ Adding: item })

        createCourseBackOfficeStaff = (await API.graphql({
          query: mutations.createCourseBackOfficeStaff,
          variables: {
            input: {
              courseInfoID: this.state.courseData?.id,
              userID: item.id,
            },
          },
          authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
        })) as GraphQLResult<CreateCourseBackOfficeStaffMutation>
        console.log(createCourseBackOfficeStaff)
        const temp = this.state.courseData
        temp?.backOfficeStaff?.items?.push(
          createCourseBackOfficeStaff.data.createCourseBackOfficeStaff
        )
        console.log(temp)
        this.setState({ courseData: temp })
      } catch (createCourseBackOfficeStaff) {
        console.log(createCourseBackOfficeStaff)
        const temp = this.state.courseData
        temp?.backOfficeStaff?.items?.push(
          createCourseBackOfficeStaff.data.createCourseBackOfficeStaff
        )
        console.log(temp)
        this.setState({ courseData: temp })
      }
    })

    del?.map(async (item) => {
      try {
        console.log({ Deleting: item })

        const deleteCourseBackOfficeStaff = (await API.graphql({
          query: mutations.deleteCourseBackOfficeStaff,
          variables: {
            input: {
              id: item?.id,
            },
          },
          authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
        })) as GraphQLResult<DeleteCourseBackOfficeStaffMutation>
        console.log(deleteCourseBackOfficeStaff)
        const temp = this.state.courseData
        if (temp && temp.backOfficeStaff && temp.backOfficeStaff.items) {
          temp.backOfficeStaff.items = temp.backOfficeStaff?.items?.filter(
            (user) => user?.id !== item?.id
          )
          console.log(temp)
          this.setState({ courseData: temp })
        }
      } catch (createCourseTriadUsers) {
        console.log(createCourseTriadUsers)
        const temp = this.state.courseData
        if (temp && temp.backOfficeStaff && temp.backOfficeStaff.items) {
          temp.backOfficeStaff.items = temp.backOfficeStaff.items.filter(
            (user) => user?.id !== item?.id
          )
          console.log(temp)
          this.setState({ courseData: temp })
        }
      }
    })
  }
  updateInstructors = async (
    value: NonNullable<NonNullable<GraphQLResult<SearchUsersQuery>["data"]>["searchUsers"]>["items"]
  ): Promise<void> => {
    console.log(this.state.courseData?.instructors?.items)
    const del = this.state.courseData?.instructors?.items?.filter(
      (x) => !value?.map((z) => z?.id).includes(x?.userID)
    )
    const add = value?.filter(
      (x) => !this.state.courseData?.instructors?.items?.map((z) => z?.userID).includes(x.id)
    )
    // const delTriadID= this.state.courseData.triads.items[index].users.items.map((item)=>{del.contains(item.})
    console.log({ del: del })
    add?.map(async (item) => {
      let createCourseInstructors: any
      try {
        console.log({ Adding: item })

        createCourseInstructors = (await API.graphql({
          query: mutations.createCourseInstructors,
          variables: {
            input: {
              courseInfoID: this.state.courseData?.id,
              userID: item?.id,
            },
          },
          authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
        })) as GraphQLResult<CreateCourseInstructorsMutation>
        console.log(createCourseInstructors)
        const temp = this.state.courseData
        if (temp && temp.instructors && temp.instructors.items) {
          temp.instructors.items.push(createCourseInstructors.data.createCourseInstructors)
          console.log(temp)
          this.setState({ courseData: temp })
        }
      } catch (createCourseInstructors) {
        console.log(createCourseInstructors)
        const temp = this.state.courseData
        if (temp && temp.instructors && temp.instructors.items) {
          temp.instructors.items.push(createCourseInstructors.data.createCourseInstructors)
          console.log(temp)
          this.setState({ courseData: temp })
        }
      }
    })

    del.map(async (item) => {
      try {
        console.log({ Deleting: item })

        const deleteCourseInstructors = (await API.graphql({
          query: mutations.deleteCourseInstructors,
          variables: {
            input: {
              id: item.id,
            },
          },
          authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
        })) as GraphQLResult<DeleteCourseInstructorsMutation>
        console.log(deleteCourseInstructors)
        const temp = this.state.courseData
        if (temp && temp.instructors && temp.instructors.items) {
          temp.instructors.items = temp.instructors.items.filter((user) => user.id !== item.id)
          console.log(temp)
          this.setState({ courseData: temp })
        }
      } catch (createCourseTriadUsers) {
        console.log(createCourseTriadUsers)
        const temp = this.state.courseData
        if (temp && temp.instructors && temp.instructors.items) {
          temp.instructors.items = temp.instructors.items.filter((user) => user.id !== item.id)
          console.log(temp)
          this.setState({ courseData: temp })
        }
      }
    })
  }
  updateTriadUsers = async (
    index: number,
    value: NonNullable<NonNullable<GraphQLResult<SearchUsersQuery>["data"]>["searchUsers"]>["items"]
  ): Promise<void> => {
    if (this.state.courseData?.triads?.items) {
      const del = this.state.courseData.triads.items[index]!.users?.items?.filter(
        (x) => !value?.map((z) => z.id).includes(x.userID)
      )
      const add = value?.filter(
        (x) =>
          !this.state.courseData?.triads
            ?.items![index]!.users?.items?.map((z) => z?.userID)
            ?.includes(x?.id)
      )
      // const delTriadID= this.state.courseData.triads.items[index].users.items.map((item)=>{del.contains(item.})
      console.log({ del: del })
      add?.map(async (item) => {
        let createCourseTriadUsers: any
        try {
          console.log({ Adding: item })

          createCourseTriadUsers = (await API.graphql({
            query: mutations.createCourseTriadUsers,
            variables: {
              input: {
                triadID: this.state.courseData?.triads?.items![index]?.id,
                userID: item?.id,
              },
            },
            authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
          })) as GraphQLResult<CreateCourseTriadUsersMutation>
          console.log(createCourseTriadUsers)
          const temp = this.state.courseData
          if (temp && temp.triads && temp.triads.items) {
            temp.triads.items[index]!.users?.items?.push(
              createCourseTriadUsers.data.createCourseTriadUsers
            )
            console.log(temp)
            this.setState({ courseData: temp })
          }
        } catch (createCourseTriadUsers) {
          console.log(createCourseTriadUsers)
          const temp = this.state.courseData
          if (temp && temp.triads && temp.triads.items) {
            temp.triads.items[index]!.users?.items?.push(
              createCourseTriadUsers.data.createCourseTriadUsers
            )
            console.log(temp)
            this.setState({ courseData: temp })
          }
        }
      })

      del?.map(async (item) => {
        try {
          console.log({ Deleting: item })

          const createCourseTriadUsers = (await API.graphql({
            query: mutations.deleteCourseTriadUsers,
            variables: {
              input: {
                id: item.id,
              },
            },
            authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
          })) as GraphQLResult<DeleteCourseTriadUsersMutation>
          console.log(createCourseTriadUsers)
          const temp = this.state.courseData
          if (temp && temp.triads && temp.triads.items && temp.triads.items[index]) {
            temp.triads.items[index].users.items = temp.triads.items[index]!.users?.items?.filter(
              (user) => user.id !== item.id
            )
            console.log(temp)
            this.setState({ courseData: temp })
          }
        } catch (createCourseTriadUsers) {
          console.log(createCourseTriadUsers)
          const temp = this.state.courseData
          if (temp && temp.triads && temp.triads.items && temp.triads.items[index]) {
            temp.triads.items![index].users.items = temp.triads.items[index]!.users?.items?.filter(
              (user) => user.id !== item.id
            )
            console.log(temp)
            this.setState({ courseData: temp })
          }
        }
      })
    }
  }
  removeDuplicates(originalArray: CourseUser[], prop: string): any[] {
    const newArray = []
    const lookupObject = {}

    for (const i in originalArray) {
      lookupObject[originalArray[i][prop]] = originalArray[i]
    }

    for (const i in lookupObject) {
      newArray.push(lookupObject[i])
    }
    return newArray
  }
  myCourseGroups = (): { all: CourseUser[]; cohort: CourseUser[]; completeTriad: CourseUser[] } => {
    const z:
      | [
          {
            cohort: (CourseUser | null | undefined)[] | undefined | null
            completeTriad: (CourseUser | null | undefined)[] | undefined | null
          }
        ]
      | undefined
      | null = this.state.courseData?.triads?.items?.map((item) => {
      let triadTemp: (CourseUser | null | undefined)[] | undefined | null = []
      let coachTemp: (CourseUser | null | undefined)[] | undefined | null = []
      let cohortTemp: (CourseUser | null | undefined)[] | undefined | null = []
      let completeTriad: {
        triad: (CourseUser | null | undefined)[] | undefined | null
        coach: (CourseUser | null | undefined)[] | undefined | null
        id: string | undefined
      } | null = null
      if (
        (item?.users?.items?.filter((user) => user?.userID == this.state.currentUser).length ??
          0 > 0) ||
        (item?.coaches?.items?.filter((user) => user?.userID == this.state.currentUser).length ??
          0 > 0)
      ) {
        triadTemp = item?.users?.items
          ?.filter((user) => user?.userID != this.state.currentUser)
          .map((item) => item?.user)
        coachTemp = item?.coaches?.items?.map((item) => item?.user)
        completeTriad = { triad: triadTemp, coach: coachTemp, id: item?.id }
      } else {
        cohortTemp = item?.users?.items?.map((item) => item?.user)
        cohortTemp = cohortTemp?.concat(item?.coaches?.items?.map((item) => item?.user))
        // cohort.push(item.coaches.items)
      }
      return { completeTriad: completeTriad, cohort: cohortTemp }
    })
    let fromTriads: (CourseUser | null | undefined)[] | undefined | null =
      this.state.courseData?.triads?.items
        ?.map((item) => {
          if (item?.users?.items && item?.coaches?.items)
            return [...item.users.items, ...item.coaches.items]
          else if (item?.users?.items) return [...item.users.items]
          else if (item?.coaches?.items) return [...item.coaches.items]
        })
        .flat()
        .filter((item) => {
          return item?.user != null
        })
        .map((item) => {
          return item?.user
        })
    if (fromTriads == undefined) fromTriads = []
    const instructors: (CourseUser | null | undefined)[] = this.state.courseData?.instructors?.items
      ? this.state.courseData.instructors.items.map((item) => {
          return item?.user
        })
      : []
    const backOfficeStaff: (CourseUser | null | undefined)[] = this.state.courseData
      ?.backOfficeStaff?.items
      ? this.state.courseData.backOfficeStaff.items.map((item) => {
          return item?.user
        })
      : []
    console.log(instructors)
    console.log(backOfficeStaff)
    console.log(fromTriads)
    const allWithDuplicates = [...fromTriads, ...instructors, ...backOfficeStaff]
    const all = this.removeDuplicates(allWithDuplicates, "id")
    let cohort = [],
      completeTriad = []
    cohort = this.removeDuplicates(
      z
        ?.map((item) => item.cohort)
        .flat()
        .filter((z) => z != null),
      "id"
    )
    completeTriad = z?.map((item) => item.completeTriad).filter((z) => z != null)
    const final = { all: all, cohort: cohort, completeTriad: completeTriad }
    console.log(final)
    return final
  }
  updateTriadCoaches = async (
    index: number,
    value: NonNullable<NonNullable<GraphQLResult<SearchUsersQuery>["data"]>["searchUsers"]>["items"]
  ): Promise<void> => {
    if (this.state.courseData?.triads?.items) {
      const del = this.state.courseData.triads.items[index]!.coaches?.items?.filter(
        (x) => !value?.map((z) => z?.id).includes(x?.userID)
      )
      const add = value?.filter(
        (x) =>
          !this.state.courseData?.triads
            ?.items![index]?.coaches?.items?.map((z) => z?.userID)
            .includes(x?.id)
      )

      // const delTriadID= this.state.courseData.triads.items[index].users.items.map((item)=>{del.contains(item.})
      add.map(async (item: any) => {
        try {
          console.log({ Adding: item })

          const createCourseTriadCoaches = (await API.graphql({
            query: mutations.createCourseTriadCoaches,
            variables: {
              input: {
                triadID: this.state.courseData?.triads?.items![index]?.id,
                userID: item.id,
              },
            },
            authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
          })) as GraphQLResult<CreateCourseTriadCoachesMutation>
          console.log(createCourseTriadCoaches)
          const temp = this.state.courseData
          if (temp && temp.triads && temp.triads.items) {
            temp.triads.items[index]!.coaches?.items?.push(
              createCourseTriadCoaches.data.createCourseTriadCoaches
            )
            console.log(temp)
            this.setState({ courseData: temp })
          }
        } catch (createCourseTriadCoaches) {
          console.log(createCourseTriadCoaches)
          const temp = this.state.courseData
          if (temp && temp.triads && temp.triads.items) {
            temp.triads.items[index]!.coaches?.items?.push(
              createCourseTriadCoaches.data.createCourseTriadCoaches
            )
            console.log(temp)
            this.setState({ courseData: temp })
          }
        }
      })

      del?.map(async (item) => {
        try {
          console.log({ Deleting: item })

          const deleteCourseTriadCoaches = (await API.graphql({
            query: mutations.deleteCourseTriadCoaches,
            variables: {
              input: {
                id: item?.id,
              },
            },
            authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
          })) as GraphQLResult<DeleteCourseTriadCoachesMutation>
          console.log(deleteCourseTriadCoaches)
          const temp = this.state.courseData
          if (temp && temp.triads && temp.triads.items) {
            temp.triads.items[index].coaches.items = temp.triads.items[
              index
            ]!.coaches?.items?.filter((user) => user?.id !== item?.id)
            console.log(temp)
            this.setState({ courseData: temp })
          }
        } catch (deleteCourseTriadCoaches) {
          console.log(deleteCourseTriadCoaches)
          const temp = this.state.courseData
          if (temp && temp.triads && temp.triads.items) {
            temp.triads.items![index].coaches.items = temp.triads.items[
              index
            ]!.coaches?.items?.filter((user) => user?.id !== item?.id)
            console.log(temp)
            this.setState({ courseData: temp })
          }
        }
      })
    }
  }
  updateTriad = async (index: number, item: string, value: any): Promise<void> => {
    try {
      console.log({ "Updating Triad": index })

      const updateCourseTriads = (await API.graphql({
        query: mutations.updateCourseTriads,
        variables: {
          input: {
            id: this.state.courseData?.triads?.items?.[index]?.id,
            [item]: value,
          },
        },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })) as GraphQLResult<UpdateCourseTriadsMutation>
      console.log(updateCourseTriads)
      const temp = this.state.courseData
      if (temp && temp.triads && temp.triads.items) {
        temp.triads.items[index][item] = value
        this.setState({ courseData: temp })
      }
    } catch (e) {
      console.log(e)
    }
  }
  deleteTriad = async (index: number): Promise<void> => {
    try {
      console.log("Deleting Triad")

      const createTriad = (await API.graphql({
        query: mutations.deleteCourseTriads,
        variables: {
          input: { id: this.state.courseData?.triads?.items?.[index]?.id },
        },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })) as GraphQLResult<DeleteCourseTriadsMutation>
      console.log(createTriad)
      const temp = this.state.courseData
      temp?.triads?.items?.splice(index, 1)
      this.setState({ courseData: temp })
    } catch (e) {
      console.log(e)
    }
  }
  createTriad = async (): Promise<void> => {
    const triad: CreateCourseTriadsInput = {
      courseInfoID: this.state.courseData?.id,
    }
    try {
      console.log("Creating Triad")

      const createTriad = (await API.graphql({
        query: mutations.createCourseTriads,
        variables: { input: triad },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })) as GraphQLResult<CreateCourseTriadsMutation>
      console.log(createTriad)
      if (createTriad?.data?.createCourseTriads) {
        const temp = this.state.courseData
        if (createTriad.data.createCourseTriads) {
          temp?.triads?.items?.push(createTriad.data.createCourseTriads)
          console.log(temp)
          this.setState({ courseData: temp }, () => this.forceUpdate())
        }
      }
    } catch (e) {
      console.log(e)
    }
  }

  createWeek = async (): Promise<void> => {
    const input: CreateCourseWeekInput = {
      week: ((Object.keys(this.state.courseWeeks).length ?? 0) + 1).toString(),
      name: "New Menu Item",
      leader: JSON.stringify(convertToRaw(EditorState.createEmpty().getCurrentContent())),
      courseInfoID: this.state.courseData?.id,
    }
    try {
      console.log("Creating Resource")

      const createCourseWeek = (await API.graphql({
        query: mutations.createCourseWeek,
        variables: { input },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })) as GraphQLResult<CreateCourseWeekMutation>
      console.log(createCourseWeek)

      const newWeek = createCourseWeek?.data?.createCourseWeek
      if (newWeek?.id) {
        const temp = this.state.courseWeeks

        temp[newWeek.id] = { ...newWeek, lessons: {} }
        console.log(temp)
        this.setState({ courseWeeks: temp })
      }
    } catch (e) {
      console.log(e)
    }
  }

  createLesson = async (): Promise<void> => {
    const resource: CreateCourseLessonInput = {
      name: "New Lesson",
      lesson: (
        (Object.keys(this.state.courseWeeks[this.state.activeWeek].lessons).length ?? 0) + 1
      ).toString(),
      description: JSON.stringify(convertToRaw(EditorState.createEmpty().getCurrentContent())),
      courseWeekID: this.state.activeWeek,
    }
    try {
      console.log("Creating Resource")

      const createCourse = (await API.graphql({
        query: mutations.createCourseLesson,
        variables: { input: resource },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })) as GraphQLResult<CreateCourseLessonMutation>
      console.log(createCourse)
      if (createCourse?.data?.createCourseLesson?.id) {
        const newLesson = createCourse.data.createCourseLesson
        const { courseWeeks } = this.state
        if (courseWeeks?.[this.state.activeWeek]?.lessons) {
          courseWeeks[this.state.activeWeek].lessons[newLesson.id] = newLesson
          console.log(courseWeeks)
          this.setState({ courseWeeks })
        }
      }
    } catch (e) {
      console.log(e)
    }
  }

  getLessonById = (id: string): CourseLesson | undefined => {
    for (const week of Object.values(this.state.courseWeeks)) {
      if (week.lessons[id]) {
        return week.lessons[id]
      }
    }
  }

  getAssignmentList = (): (CourseLesson | null | undefined)[] | null | undefined => {
    return Object.values(this.state.courseWeeks)
      .map((week) => {
        return Object.values(week.lessons).map((lesson) => {
          if (lesson?.lessonType == "assignment") {
            return lesson
          }
        })
      })
      .flat()
  }

  updateWeekOrder = (): void => {
    try {
      Object.values(this.state.courseWeeks)?.forEach((item, index: number) => {
        this.updateWeek(item.id, "week", index)
      })
    } catch (e) {
      console.log(e)
    }
  }

  updateLesson = async (week: string, lesson: string, item: string, value: any): Promise<void> => {
    try {
      console.log({ "Updating Lesson": lesson })

      const updateWeek = (await API.graphql({
        query: mutations.updateCourseLesson,
        variables: {
          input: {
            id: lesson,
            [item]: value,
          },
        },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })) as GraphQLResult<UpdateCourseLessonMutation>
      console.log(updateWeek)
      const temp = this.state.courseWeeks
      temp[week].lessons[lesson][item] = value
      this.setState({ courseWeeks: temp })
    } catch (e) {
      console.log(e)
    }
  }
  updateCourse = async (item: string, value: any): Promise<void> => {
    try {
      console.log({ "Updating Course": item })

      const updateCourseInfo = (await API.graphql({
        query: mutations.updateCourseInfo,
        variables: {
          input: {
            id: this.state.courseData?.id,
            [item]: value,
          },
        },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })) as GraphQLResult<UpdateCourseInfoMutation>
      console.log(updateCourseInfo)
      const temp = this.state.courseData
      if (temp) {
        temp[item] = value
        this.setState({ courseData: temp })
      }
    } catch (e) {
      console.log(e)
    }
  }
  updateWeek = async (week: string, item: string, value: any): Promise<void> => {
    try {
      console.log({ "Updating Week": week })

      const updateWeek = (await API.graphql({
        query: mutations.updateCourseWeek,
        variables: {
          input: {
            id: week,
            [item]: value,
          },
        },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })) as GraphQLResult<UpdateCourseWeekMutation>
      console.log(updateWeek)
      const temp = this.state.courseWeeks
      if (temp) {
        temp[week][item] = value
        this.setState({ courseWeeks: temp })
      }
    } catch (e) {
      console.log(e)
    }
  }

  myCourseTodo = (): CourseToDo[] => {
    if (this.state.courseWeeks) {
      const toDo = Object.values(this.state.courseWeeks)
        .map((week) => {
          return Object.values(week?.lessons).map((lesson) => {
            return { ...lesson, weekId: week.id }
          })
        })
        .flat()
        .filter((item) => !!item)
        .map((item) => {
          const tz = item?.tz || moment.tz.guess()
          const time = moment.tz(item?.time, tz).format("hh:mm")
          const date = moment.tz(item?.time, tz).format("YYYY-MM-DD")
          const m = moment.tz(item?.time, tz)
          return {
            lessonType: item?.lessonType as string,
            time: time,
            date: date,
            moment: m,
            week: item?.weekId as string,
            lesson: item?.id as string,
          }
        })
        .filter((item) => {
          return item.time !== "Invalid date" && item.lessonType !== "youtube"
        })

      return toDo
        .filter((item) => item.moment.isSameOrAfter(moment()))
        .sort((a, b) => {
          return a.moment.diff(b.moment)
        })
    }

    return []
  }

  getDotColour = (lessonType: string): string => {
    switch (lessonType) {
      case "assignment":
        return "#71C209"
      case "respond":
        return "#0000ff"
      default:
        return "#ff0000"
    }
  }

  myCourseDates = (): { markedDates: MarkedDates; items: AgendaItems } => {
    if (this.state.courseWeeks) {
      const courseDates: { markedDates: MarkedDates; items: AgendaItems } = {
        markedDates: {},
        items: {},
      }

      Object.values(this.state.courseWeeks)
        .map((week) => {
          return Object.values(week?.lessons).map((lesson) => {
            return { ...lesson, weekId: week.id }
          })
        })
        .flat()
        .filter((item) => !!item)
        .forEach((item) => {
          const tz = item?.tz || moment.tz.guess()
          const dateKey = moment.tz(item?.time, tz).format("YYYY-MM-DD")
          if (dateKey !== "Invalid date" && item?.lessonType !== "youtube") {
            let dots: Array<{ color: string }> = []

            if (courseDates.markedDates[dateKey]) {
              dots = courseDates.markedDates[dateKey].dots
            }

            if (dots.length < 4) {
              // max 4 dots to prevent dots from adjacent days from overlapping
              dots.push({ color: this.getDotColour(item?.lessonType ?? "") })
            }

            courseDates.markedDates[dateKey] = {
              marked: true,
              dots,
            }

            if (courseDates.items[dateKey]?.length) {
              courseDates.items[dateKey]?.push({
                week: item.weekId,
                lesson: item.id as string,
                lessonType: item.lessonType as string,
                name: item.name as string,
                time: moment.tz(item?.time, tz).format("hh:mm") as string,
                date: moment.tz(item?.time, tz).format("YYYY-MM-DD") as string,
              })
            } else {
              courseDates.items[dateKey] = [
                {
                  week: item.weekId,
                  lesson: item.id as string,
                  lessonType: item.lessonType as string,
                  name: item.name as string,
                  time: moment.tz(item?.time, tz).format("hh:mm") as string,
                  date: moment.tz(item?.time, tz).format("YYYY-MM-DD") as string,
                },
              ]
            }
          }
        })

      return courseDates
    }

    return { markedDates: {}, items: {} }
  }

  deleteWeek = async (week: string): Promise<void> => {
    try {
      console.log({ "Deleting Course Week": week })
      const deleteCourseWeek = (await API.graphql({
        query: mutations.deleteCourseWeek,
        variables: {
          input: { id: week },
        },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })) as GraphQLResult<DeleteCourseWeekMutation>
      console.log(deleteCourseWeek)
      const temp = this.state.courseWeeks
      delete temp[week]
      this.setState({ courseWeeks: temp }, this.updateWeekOrder)
    } catch (e) {
      console.log(e)
    }
  }

  deleteLesson = async (week: string, lesson: string): Promise<void> => {
    try {
      console.log({ "Deleting Course lesson": week + " " + lesson })
      const deleteResource = (await API.graphql({
        query: mutations.deleteCourseLesson,
        variables: {
          input: {
            id: lesson,
          },
        },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })) as GraphQLResult<DeleteCourseLessonMutation>
      console.log(deleteResource)
      const temp = this.state.courseWeeks
      delete temp[week].lessons[lesson]
      this.setState({ courseWeeks: temp })
    } catch (e) {
      console.log(e)
    }
  }
  render(): React.ReactNode {
    console.log("CourseScreen")

    const { width } = Dimensions.get("window")
    const chatWidth = Math.min(width, 563)

    return this.state.data ? (
      <CourseHomeScreenImpl.Provider
        value={{
          state: {
            ...this.state,
          },
          actions: {
            createCourse: null,
            changeCourse: null,
            updateCourse: this.updateCourse,
            deleteCourse: null,
            setActiveScreen: this.setActiveScreen,
            setActiveWeek: this.setActiveWeek,
            setActiveLesson: this.setActiveLesson,
            createWeek: this.createWeek,
            deleteWeek: this.deleteWeek,
            updateWeek: this.updateWeek,
            updateWeekOrder: this.updateWeekOrder,
            createLesson: this.createLesson,
            updateLesson: this.updateLesson,
            deleteLesson: this.deleteLesson,
            createTriad: this.createTriad,
            updateTriad: this.updateTriad,
            deleteTriad: this.deleteTriad,
            setEditMode: this.setEditMode,
            updateTriadCoaches: this.updateTriadCoaches,
            updateTriadUsers: this.updateTriadUsers,
            updateInstructors: this.updateInstructors,
            updateBackOfficeStaff: this.updateBackOfficeStaff,
            setActiveMessageBoard: this.setActiveMessageBoard,
            myCourseGroups: this.myCourseGroups,
            setActiveCourseActivity: this.setActiveCourseActivity,
            getAssignmentList: this.getAssignmentList,
            getLessonById: this.getLessonById,
            myCourseDates: this.myCourseDates,
            myCourseTodo: this.myCourseTodo,
            setShowChat: () => this.setState({ showChat: !this.state.showChat }),
            syncLessonNumbers: this.syncLessonNumbers,
            setDateFilter: this.setDateFilter,
          },
        }}
      >
        <StyleProvider style={getTheme()}>
          <>
            {this.state.currentScreen == "Details" && !this.state.showChat ? (
              <FloatingButton
                label="Chat"
                customStyle={FloatingButtonStyles.ChatFloatingButtonStyle}
                customLabelStyle={FloatingButtonStyles.ChatFloatingButtonTextStyle}
                smallIcon={<MaterialCommunityIcons name="chat" size={24} color="white" />}
                largeIcon={<AntDesign name="left" size={24} color="#333333" />}
                setShow={() => this.setState({ showChat: true })}
              />
            ) : null}

            <Drawer
              content={<CourseChat />}
              open={this.state.showChat}
              openDrawerOffset={width - chatWidth}
              side="right"
              styles={{}}
              tweenHandler={undefined}
              onClose={() => this.setState({ showChat: false })}
            >
              <Container
                style={[
                  this.styles.style.courseHomeScreenMainContainer,
                  { opacity: this.state.showChat ? 0.5 : 1 },
                ]}
              >
                <CourseSidebar courseId={this.state.data.id} />
                <CourseHome />
                <CourseDetail />
                <CourseCoaching />
              </Container>
            </Drawer>
          </>
        </StyleProvider>
      </CourseHomeScreenImpl.Provider>
    ) : null
  }
}
