import { JCState } from "components/JCComponent/JCComponent"
import * as React from "react"
import { GetGroupQuery } from "../../src/API"
import { GetCourseInfoQuery } from "../../src/API-courses"
import { NullFunction } from "../../src/types"

export interface CourseState extends JCState {
  showMap: boolean
  loadId: string
  data: NonNullable<GetGroupQuery>["getGroup"]
  courseData: NonNullable<GetCourseInfoQuery>["getCourseInfo"]
  editMode: boolean
  isEditable: boolean
  validationError: string
  currentScreen: string
  currentUser: string
  activeWeek: number
  activeLesson: number | null
  activeMessageBoard: string
  activeCourseActivity: string
  showChat: boolean
}

interface NonNullCourseActions {
  createCourse: null
  changeCourse: null
  updateCourse: (item: string, value: any) => Promise<void>
  deleteCourse: null
  setActiveScreen: (screen: string) => void
  setActiveWeek: (index: number) => void
  setActiveLesson: (index: number) => void
  createWeek: () => Promise<void>
  updateWeek: (index: number, item: string, value: any) => Promise<void>
  deleteWeek: (index: number, item: string, value: any) => Promise<void>
  updateWeekOrder: () => void
  createLesson: () => Promise<void>
  updateLesson: (week: number, lesson: number, item: string, value: any) => Promise<void>
  deleteLesson: (week: number, lesson: number) => Promise<void>
  updateTriad: (index: number, item: string, value: any) => Promise<void>
  createTriad: (index: number, item: string, value: any) => Promise<void>
  deleteTriad: (index: number, item: string, value: any) => Promise<void>
  setEditMode: (editMode: boolean) => void
  updateTriadUsers: (index: number, value: any) => Promise<void>
  updateTriadCoaches: (index: number, value: any) => Promise<void>
  updateInstructors: (value: any) => Promise<void>
  updateBackOfficeStaff: (value: any) => Promise<void>
  setActiveMessageBoard: (messageBoard: string) => void
  setActiveCourseActivity: (courseActivity: string) => void
  myCourseGroups: (courseActivity: string) => void
  getAssignmentList: () => any[]
  getLessonById: (id: string) => any
  myCourseDates: () => {
    zoom: string[] | undefined
    assignments: string[] | undefined
    respond: string[] | undefined
  }
  myCourseTodo: () => {
    lessonType: any
    time: string
    date: string
    moment: moment.Moment
  }[]
  setShowChat: () => void
}

export type CourseActions = NullFunction<NonNullCourseActions>

type CourseContextType = {
  actions: CourseActions
  state: CourseState | undefined
}

export const CourseContext = React.createContext<CourseContextType>({
  actions: {
    createCourse: () => null,
    changeCourse: () => null,
    updateCourse: () => null,
    deleteCourse: () => null,
    setActiveScreen: () => null,
    setActiveWeek: () => null,
    setActiveLesson: () => null,
    createWeek: () => null,
    updateWeek: () => null,
    deleteWeek: () => null,
    updateWeekOrder: () => null,
    createLesson: () => null,
    updateLesson: () => null,
    deleteLesson: () => null,
    updateTriad: () => null,
    createTriad: () => null,
    deleteTriad: () => null,
    setEditMode: () => null,
    updateTriadUsers: () => null,
    updateTriadCoaches: () => null,
    updateInstructors: () => null,
    updateBackOfficeStaff: () => null,
    setActiveMessageBoard: () => null,
    setActiveCourseActivity: () => null,
    myCourseGroups: () => null,
    getAssignmentList: () => null,
    getLessonById: () => null,
    myCourseDates: () => null,
    myCourseTodo: () => null,
    setShowChat: () => null,
  },
  state: undefined,
})
