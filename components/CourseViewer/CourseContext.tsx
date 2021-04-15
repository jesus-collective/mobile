import { GraphQLResult } from "@aws-amplify/api/lib/types"
import { JCState } from "components/JCComponent/JCComponent"
import { Moment } from "moment"
import * as React from "react"
import { GetGroupQuery, SearchUsersQuery } from "../../src/API"
import { GetCourseInfoQuery } from "../../src/API-courses"

type CourseInfo = NonNullable<GetCourseInfoQuery>["getCourseInfo"]

export type CourseWeek = NonNullable<
  NonNullable<NonNullable<CourseInfo>["courseWeeks"]>["items"]
>[0]

export type CourseLesson = NonNullable<NonNullable<NonNullable<CourseWeek>["lessons"]>["items"]>[0]

export type CourseWeekObj = CourseWeek & { lessons: Record<string, CourseLesson> }

export interface CourseState extends JCState {
  showMap: boolean
  loadId: string
  data: NonNullable<GetGroupQuery>["getGroup"]
  courseData: CourseInfo
  courseWeeks: Record<string, CourseWeekObj>
  editMode: boolean
  isEditable: boolean
  validationError: string
  currentScreen: string
  currentUser: string | null
  activeWeek: string
  activeLesson: string
  activeMessageBoard: string
  activeCourseActivity: string
  showChat: boolean
  dateFilter: string
}

export type CourseToDo = {
  lessonType: string
  time: string
  date: string
  moment: Moment
  week: string
  lesson: string
}

export type MarkedDates = Record<string, { marked: true; dots: Array<{ color: string }> }>

export type AgendaItems = Record<
  string,
  | Array<{
      name: string
      lessonType: string
      lesson: string
      week: string
      time: string
      date: string
    }>
  | undefined
>

export interface CourseActions {
  createCourse: null
  changeCourse: null
  updateCourse: (item: string, value: any) => Promise<void>
  deleteCourse: null
  setActiveScreen: (screen: string) => void
  setActiveWeek: (index: string) => void
  setActiveLesson: (index: string) => void
  createWeek: () => Promise<void>
  updateWeek: (week: string, item: string, value: any) => Promise<void>
  deleteWeek: (week: string) => Promise<void>
  updateWeekOrder: () => void
  createLesson: () => Promise<void>
  updateLesson: (week: string, lesson: string, item: string, value: any) => Promise<void>
  deleteLesson: (week: string, lesson: string) => Promise<void>
  updateTriad: (index: number, item: string, value: any) => Promise<void>
  createTriad: () => Promise<void>
  deleteTriad: (index: number) => Promise<void>
  setEditMode: (editMode: boolean) => void
  updateTriadUsers: (
    index: number,
    value: NonNullable<NonNullable<GraphQLResult<SearchUsersQuery>["data"]>["searchUsers"]>["items"]
  ) => Promise<void>
  updateTriadCoaches: (
    index: number,
    value: NonNullable<NonNullable<GraphQLResult<SearchUsersQuery>["data"]>["searchUsers"]>["items"]
  ) => Promise<void>
  updateInstructors: (
    value: NonNullable<NonNullable<GraphQLResult<SearchUsersQuery>["data"]>["searchUsers"]>["items"]
  ) => Promise<void>
  updateBackOfficeStaff: (
    value: NonNullable<NonNullable<GraphQLResult<SearchUsersQuery>["data"]>["searchUsers"]>["items"]
  ) => Promise<void>
  setActiveMessageBoard: (messageBoard: string) => void
  setActiveCourseActivity: (courseActivity: string) => void
  myCourseGroups: () => { all: any[]; cohort: any[]; completeTriad: any[] }
  getAssignmentList: () => any[] | undefined
  getLessonById: (id: string) => CourseLesson | undefined
  myCourseDates: () => { markedDates: MarkedDates; items: AgendaItems }
  myCourseTodo: () => CourseToDo[]
  setShowChat: () => void
  syncLessonNumbers: () => Promise<void>
  setDateFilter: (date: string) => void
}

type CourseContextType = {
  actions: CourseActions
  state: CourseState | undefined
}

export const CourseContext = React.createContext<CourseContextType>({
  actions: {
    createCourse: null,
    changeCourse: null,
    updateCourse: () => Promise.resolve(),
    deleteCourse: null,
    setActiveScreen: () => null,
    setActiveWeek: () => null,
    setActiveLesson: () => null,
    createWeek: () => Promise.resolve(),
    updateWeek: () => Promise.resolve(),
    deleteWeek: () => Promise.resolve(),
    updateWeekOrder: () => null,
    createLesson: () => Promise.resolve(),
    updateLesson: () => Promise.resolve(),
    deleteLesson: () => Promise.resolve(),
    updateTriad: () => Promise.resolve(),
    createTriad: () => Promise.resolve(),
    deleteTriad: () => Promise.resolve(),
    setEditMode: () => null,
    updateTriadUsers: () => Promise.resolve(),
    updateTriadCoaches: () => Promise.resolve(),
    updateInstructors: () => Promise.resolve(),
    updateBackOfficeStaff: () => Promise.resolve(),
    setActiveMessageBoard: () => null,
    setActiveCourseActivity: () => null,
    myCourseGroups: () => {
      return { all: [], cohort: [], completeTriad: [] }
    },
    getAssignmentList: () => [],
    getLessonById: () => null,
    myCourseDates: () => {
      return { markedDates: {}, items: {} }
    },
    myCourseTodo: () => {
      return []
    },
    setShowChat: () => null,
    syncLessonNumbers: () => Promise.resolve(),
    setDateFilter: () => null,
  },
  state: undefined,
})
