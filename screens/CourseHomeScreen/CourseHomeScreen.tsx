import { GraphQLResult } from "@aws-amplify/api/lib/types"
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons"
import { StackNavigationProp } from "@react-navigation/stack"
import { Auth } from "aws-amplify"
import { convertToRaw, EditorState } from "draft-js"
import moment from "moment-timezone"
import React from "react"
import { Dimensions, Modal, ScrollView, View } from "react-native"
import {
  CreateCourseLessonInput,
  CreateCourseTriadsInput,
  CreateCourseWeekInput,
  GetGroupQuery,
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
import { Data } from "../../components/Data/Data"
import FloatingButton from "../../components/FloatingButton/FloatingButton"
import FloatingButtonStyles from "../../components/FloatingButton/FloatingButtonStyles"
import { SearchUser } from "../../components/Forms/EditableUsers"
import JCComponent from "../../components/JCComponent/JCComponent"
import Validate from "../../components/Validate/Validate"

interface Props {
  navigation: StackNavigationProp<any, any>
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
  componentDidMount() {
    this.props.navigation.setOptions({
      headerShown: false,
    })
  }
  setInitialData(props: Props, groups: string[]): void {
    const getGroup = Data.getGroup(props.route.params.id)
    const getCourse = Data.getCourseInfo(props.route.params.id)
    const processResults2 = (json: GraphQLResult<GetCourseInfoQuery>) => {
      const isActive = (user: any) => {
        return !user?.user?.isArchived || user?.user?.isArchived === "false"
      }
      console.log({ courseData: json })
      // remove archived users
      const courseInfo = json.data?.getCourseInfo
      if (courseInfo?.triads) {
        // from triads
        courseInfo.triads.items = courseInfo?.triads?.items.map((triad) => ({
          ...triad,
          users: {
            ...triad?.users,
            items: triad?.users?.items.filter((user) => isActive(user)),
          },
          coaches: {
            ...triad?.coaches,
            items: triad?.coaches?.items.filter((user) => isActive(user)),
          },
        }))
      }
      if (courseInfo?.backOfficeStaff) {
        // from backOffice
        courseInfo.backOfficeStaff.items = courseInfo?.backOfficeStaff?.items.filter(
          (backOfficeStaff) => isActive(backOfficeStaff)
        )
      }
      console.log({ courseInfo })
      this.setState({ courseData: courseInfo })

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
  addBackOfficeStaff = async (userToAddArray: SearchUser[]): Promise<boolean> => {
    const newUser = userToAddArray[0]
    const newUserID = newUser?.id
    if (!newUserID) return false
    try {
      console.log({ Adding: newUser })
      const createCourseBackOfficeStaff = await Data.createCourseBackOfficeStaff({
        courseInfoID: this.state.courseData?.id,
        userID: newUserID,
      })
      console.log({ createCourseBackOfficeStaff })
      const createdCourseBackOfficeStaff =
        createCourseBackOfficeStaff.data?.createCourseBackOfficeStaff
      if (!createdCourseBackOfficeStaff) return false
      const temp = this.state.courseData
      temp?.backOfficeStaff?.items?.push(createdCourseBackOfficeStaff)
      console.log({ temp })
      this.setState({ courseData: temp })
      return true
    } catch (error: any) {
      const createdCourseBackOfficeStaff = error.data?.createCourseBackOfficeStaff
      if (!createdCourseBackOfficeStaff) return false
      const temp = this.state.courseData
      temp?.backOfficeStaff?.items?.push(createdCourseBackOfficeStaff)
      console.log({ temp })
      this.setState({ courseData: temp })
      return true
    }
  }
  deleteBackOfficeStaff = async (userToRemoveArray: SearchUser[]) => {
    const userToRemove = userToRemoveArray[0]
    const backOfficeStaff = this.state.courseData?.backOfficeStaff?.items ?? []
    const userToRemoveID = userToRemove?.id
    const backOfficeStaffexists = backOfficeStaff.find((staff) => staff?.userID === userToRemoveID)
    if (!backOfficeStaffexists) return false
    try {
      console.log("deleting")
      const deleteCourseBackOfficeStaff = await Data.deleteCourseBackOfficeStaff(
        backOfficeStaffexists?.id
      )
      console.log({ deleteCourseBackOfficeStaff })
      const deletedCourseBackOfficeStaff =
        deleteCourseBackOfficeStaff.data?.deleteCourseBackOfficeStaff
      if (!deletedCourseBackOfficeStaff) return false
      const temp = this.state.courseData
      if (temp && temp.backOfficeStaff && temp.backOfficeStaff.items) {
        temp.backOfficeStaff.items = temp.backOfficeStaff?.items?.filter(
          (user) => user?.id !== userToRemoveID
        )
        console.log(temp)
        this.setState({ courseData: temp })
      }
      return true
    } catch (error) {
      console.log(error)
      const temp = this.state.courseData
      if (temp && temp.backOfficeStaff && temp.backOfficeStaff.items) {
        temp.backOfficeStaff.items = temp.backOfficeStaff.items.filter(
          (user) => user?.id !== userToRemoveID
        )
        console.log(temp)
        this.setState({ courseData: temp })
      }
      return true
    }
  }
  addInstructor = async (userToAddArray: SearchUser[]): Promise<boolean> => {
    const newUser = userToAddArray[0]
    const newUserID = newUser?.id
    const instructors = this.state.courseData?.instructors?.items ?? []
    const instructorExists = instructors.find((instructor) => instructor?.userID === newUserID)
    if (instructorExists) return false
    if (!newUserID) {
      console.log("Could not locate user ID")
      return false // Could not locate user ID
    }
    try {
      console.log({ Adding: newUser })
      const createCourseInstructors = await Data.createCourseInstructors({
        courseInfoID: this.state.courseData?.id,
        userID: newUserID,
      })
      console.log({ createCourseInstructors })
      if (!createCourseInstructors?.data?.createCourseInstructors) return false
      const temp = this.state.courseData
      if (temp && temp.instructors && temp.instructors.items) {
        temp.instructors.items.push(createCourseInstructors.data.createCourseInstructors)
        console.log(temp)
        this.setState({ courseData: temp })
        return true
      }
      return false
    } catch (createCourseInstructors: any) {
      console.log({ error: createCourseInstructors })
      const temp = this.state.courseData
      if (temp && temp.instructors && temp.instructors.items) {
        const createdCourseInstructor = createCourseInstructors.data.createCourseInstructors
        if (!createdCourseInstructor) return false
        temp.instructors.items.push(createCourseInstructors.data.createCourseInstructors)
        console.log(temp)
        this.setState({ courseData: temp })
        return true
      }
      return false
    }
  }
  deleteInstructor = async (userToRemoveArray: SearchUser[]): Promise<boolean> => {
    const userToRemove = userToRemoveArray[0]
    const instructors = this.state.courseData?.instructors?.items ?? []
    const userToRemoveID = userToRemove?.id
    const instructorExists = instructors.find((instructor) => instructor?.userID === userToRemoveID)
    if (!instructorExists) return false
    if (!userToRemoveID) {
      console.log("Could not locate user ID")
      return false // Could not locate user ID
    }
    try {
      console.log({ Deleting: userToRemove })
      if (!userToRemoveID) return false
      const deleteCourseInstructors = await Data.deleteCourseInstructors(instructorExists.id)
      console.log({ deleteCourseInstructors })
      const deletedCourseInstructor = deleteCourseInstructors.data?.deleteCourseInstructors
      if (!deletedCourseInstructor) return false
      const temp = this.state.courseData
      if (temp && temp.instructors && temp.instructors.items) {
        temp.instructors.items = temp.instructors.items.filter(
          (user) => user?.userID !== userToRemoveID
        )
        console.log(temp)
        this.setState({ courseData: temp })
      }
      return true
    } catch (createCourseTriadUsers) {
      console.log({ error: createCourseTriadUsers })
      const temp = this.state.courseData
      if (temp && temp.instructors && temp.instructors.items) {
        temp.instructors.items = temp.instructors.items.filter(
          (user) => user?.userID !== userToRemoveID
        )
        console.log(temp)
        this.setState({ courseData: temp })
      }
      return false
    }
  }
  addTriadUser = async (triadIndex: number, newUserArray: SearchUser[]): Promise<boolean> => {
    console.log("Adding user to triad")
    const usersInTriad = this.state.courseData?.triads?.items[triadIndex]?.users?.items ?? []
    const newUser = newUserArray[0]
    console.log({ newUser })
    const newUserID = newUser?.id
    if (!newUserID) {
      console.log("Could not locate user ID")
      return false // Could not locate user ID
    }
    const userExists = usersInTriad.find((userInTriad) => userInTriad?.userID === newUserID)
    if (userExists) {
      console.log("User already exists in triad", { usersInTriad }, { newUserID })
      return false //User already exists in triad
    }
    try {
      const createCourseTriadUsers = await Data.createCourseTriadUsers({
        triadID: this.state.courseData?.triads?.items![triadIndex]?.id,
        userID: newUserID,
      })
      const newCourseTriadUser = createCourseTriadUsers?.data?.createCourseTriadUsers
      if (!newCourseTriadUser) return false // There was a problem creating courseTriadUser
      console.log(
        "Successfully added ",
        newUserID,
        " to triad",
        createCourseTriadUsers.data?.createCourseTriadUsers
      )
      const temp = this.state.courseData
      if (!temp || !temp.triads || !temp.triads.items) return false
      temp.triads.items[triadIndex]!.users?.items?.push(newCourseTriadUser)
      console.log({ newTemp: temp })
      this.setState({ courseData: temp })

      return true
    } catch (error) {
      console.log({ "Error adding user to triad": error })

      return false
    }
  }
  deleteTriadUser = async (
    triadIndex: number,
    usersToRemoveArray: SearchUser[]
  ): Promise<boolean> => {
    const triad = this.state.courseData?.triads?.items[triadIndex]
    const usersInTriad = triad?.users?.items ?? []
    const userToRemove = usersToRemoveArray[0]
    const userToRemoveID = userToRemove?.id

    if (!userToRemoveID) {
      console.log("Could not locate user ID")
      return false // Could not locate user ID
    } else console.log(userToRemoveID)

    const userExists = usersInTriad.find((userInTriad) => userInTriad?.userID === userToRemoveID)
    if (!userExists) {
      console.log("User doesn't exist")
      return false // User doesn't exist
    }

    try {
      const deleteCourseTriadUser = await Data.deleteCourseTriadUsers(userExists.id)
      console.log({ deleteCourseTriadUser })
      const deleteTriadUser = deleteCourseTriadUser?.data?.deleteCourseTriadUsers
      if (!deleteTriadUser) return false // There was a problem deleting courseTriadUser
      console.log(
        "Successfully deleted ",
        userToRemoveID,
        " from triad",
        deleteCourseTriadUser.data?.deleteCourseTriadUsers
      )
      const temp = this.state.courseData
      if (!temp || !temp.triads || !temp.triads.items) return false
      const filteredUsers = usersInTriad.filter((user) => user?.userID !== userToRemoveID)

      temp.triads.items[triadIndex].users.items = filteredUsers
      console.log({ temp })
      this.setState({ courseData: temp })

      return true
    } catch (error) {
      console.log({ "Error adding user to triad": error })
      return false
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
      console.log("a#", { completeTriad }, cohortTemp)
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
  addTriadCoach = async (triadIndex: number, userToAddArray: SearchUser[]): Promise<boolean> => {
    const newUser = userToAddArray[0]
    const newUserID = newUser?.id
    const triads = this.state.courseData?.triads?.items ?? []
    const triad = triads[triadIndex]
    const coaches = triad?.coaches?.items ?? []
    if (!triad) return false
    if (!newUserID) return false
    try {
      console.log({ Adding: newUser })
      const createCourseTriadCoaches = await Data.createCourseTriadCoaches({
        triadID: triad?.id,
        userID: newUserID,
      })
      console.log({ createCourseTriadCoaches })
      const createdCourseTriadCoach = createCourseTriadCoaches.data?.createCourseTriadCoaches
      if (!createdCourseTriadCoach) return false
      const temp = this.state.courseData
      if (temp && temp.triads && temp.triads.items) {
        temp.triads.items[triadIndex]!.coaches?.items?.push(createdCourseTriadCoach)
        console.log(temp)
        this.setState({ courseData: temp })
        return true
      }
      return false
    } catch (createCourseTriadCoaches: any) {
      console.log({ createCourseTriadCoaches })
      const createdCourseTriadCoach = createCourseTriadCoaches.data?.createCourseTriadCoaches
      if (!createdCourseTriadCoach) return false
      const temp = this.state.courseData
      if (temp && temp.triads && temp.triads.items) {
        temp.triads.items[triadIndex]!.coaches?.items?.push(createdCourseTriadCoach)
        console.log(temp)
        this.setState({ courseData: temp })
        return true
      }
      return false
    }
  }
  deleteTriadCoach = async (
    triadIndex: number,
    userToRemoveArray: SearchUser[]
  ): Promise<boolean> => {
    const triad = this.state.courseData?.triads?.items[triadIndex]
    const coachesInTriad = triad?.coaches?.items ?? []
    const userToRemove = userToRemoveArray[0]
    const userToRemoveID = userToRemove?.id

    if (!userToRemoveID) {
      console.log("Could not locate user ID")
      return false // Could not locate user ID
    } else console.log(userToRemoveID)

    const userExists = coachesInTriad.find(
      (coachInTriad) => coachInTriad?.userID === userToRemoveID
    )
    if (!userExists) {
      console.log("User doesn't exist")
      return false // User doesn't exist
    }
    try {
      console.log({ Deleting: userToRemove })

      const deleteCourseTriadCoaches = await Data.deleteCourseTriadCoaches(userExists.id)
      console.log({ deleteCourseTriadCoaches })
      const deletedCourseTriadCoach = deleteCourseTriadCoaches.data?.deleteCourseTriadCoaches
      if (!deletedCourseTriadCoach) return false
      const temp = this.state.courseData
      if (temp && temp.triads && temp.triads.items) {
        temp.triads.items[triadIndex].coaches.items = temp.triads.items[
          triadIndex
        ]!.coaches?.items?.filter((user) => user?.id !== userToRemoveID)
        console.log(temp)
        this.setState({ courseData: temp })
        return true
      }
      return false
    } catch (deleteCourseTriadCoaches) {
      console.log(deleteCourseTriadCoaches)
      const temp = this.state.courseData
      if (temp && temp.triads && temp.triads.items) {
        temp.triads.items![triadIndex].coaches.items = temp.triads.items[
          triadIndex
        ]!.coaches?.items?.filter((user) => user?.id !== userToRemoveID)
        console.log(temp)
        this.setState({ courseData: temp })
        return true
      }
      return false
    }
  }

  updateTriad = async (index: number, item: string, value: any): Promise<void> => {
    try {
      console.log({ "Updating Triad": index })

      const updateCourseTriads = await Data.updateCourseTriads({
        id: this.state.courseData?.triads?.items?.[index]?.id,
        [item]: value,
      })
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

      const createTriad = await Data.deleteCourseTriads(
        this.state.courseData?.triads?.items?.[index]?.id
      )
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

      const createTriad = await Data.createCourseTriads(triad)
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

      const createCourseWeek = await Data.createCourseWeek(input)
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

      const createCourse = await Data.createCourseLesson(resource)
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

      const updateWeek = await Data.updateCourseLesson({
        id: lesson,
        [item]: value,
      })
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

      const updateCourseInfo = await Data.updateCourseInfo({
        id: this.state.courseData?.id,
        [item]: value,
      })
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

      const updateWeek = await Data.updateCourseWeek({
        id: week,
        [item]: value,
      })
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
      const deleteCourseWeek = await Data.deleteCourseWeek(week)
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
      const deleteResource = await Data.deleteCourseLesson(lesson)
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
            addTriadCoach: this.addTriadCoach,
            deleteTriadCoach: this.deleteTriadCoach,
            addTriadUser: this.addTriadUser,
            deleteTriadUser: this.deleteTriadUser,
            addInstructor: this.addInstructor,
            deleteInstructor: this.deleteInstructor,
            addBackOfficeStaff: this.addBackOfficeStaff,
            deleteBackOfficeStaff: this.deleteBackOfficeStaff,
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
          <Modal transparent animationType="slide" visible={this.state.showChat}>
            <ScrollView
              contentContainerStyle={{
                justifyContent: "flex-end",
                alignItems: "flex-end",
              }}
            >
              <CourseChat />
            </ScrollView>
          </Modal>
          <View
            style={[
              this.styles.style.courseHomeScreenMainContainer,
              { opacity: this.state.showChat ? 0.5 : 1 },
            ]}
          >
            <CourseSidebar courseId={this.state.data.id} />
            <CourseHome />
            <CourseDetail />
            <CourseCoaching />
          </View>
        </>
      </CourseHomeScreenImpl.Provider>
    ) : null
  }
}
