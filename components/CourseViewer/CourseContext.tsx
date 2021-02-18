import { JCState } from "components/JCComponent/JCComponent"
import * as React from "react"
import { GetGroupQuery } from "../../src/API"
import { GetCourseInfoQuery } from "../../src/API-courses"

export interface CourseState extends JCState {
  showMap: boolean
  loadId: string
  data: NonNullable<GetGroupQuery>["getGroup"]
  courseData: NonNullable<GetCourseInfoQuery>["getCourseInfo"]
  editMode: boolean
  isEditable: boolean
  validationError: string
  currentScreen: string
  currentUser: string | null
  activeWeek: number
  activeLesson: number | null
  activeMessageBoard: string
  activeCourseActivity: string
  showChat: boolean
}

export type CourseToDo = {
  lessonType: string
  time: string
  date: string
  moment: moment.Moment
  weekNumber: string
  lessonNumber: string
}

export type CourseDates = Record<
  string,
  { marked: true; dotColor: string; weekNumber: string; lessonNumber: string }
>

export interface CourseActions {
  createCourse: null
  changeCourse: null
  updateCourse: (item: string, value: any) => Promise<void>
  deleteCourse: null
  setActiveScreen: (screen: string) => void
  setActiveWeek: (index: number) => void
  setActiveLesson: (index: number) => void
  createWeek: () => Promise<void>
  updateWeek: (index: number, item: string, value: any) => Promise<void>
  deleteWeek: (index: number) => Promise<void>
  updateWeekOrder: () => void
  createLesson: () => Promise<void>
  updateLesson: (week: number, lesson: number, item: string, value: any) => Promise<void>
  deleteLesson: (week: number, lesson: number) => Promise<void>
  updateTriad: (index: number, item: string, value: any) => Promise<void>
  createTriad: () => Promise<void>
  deleteTriad: (index: number) => Promise<void>
  setEditMode: (editMode: boolean) => void
  updateTriadUsers: (index: number, value: any) => Promise<void>
  updateTriadCoaches: (index: number, value: any) => Promise<void>
  updateInstructors: (value: any) => Promise<void>
  updateBackOfficeStaff: (value: any) => Promise<void>
  setActiveMessageBoard: (messageBoard: string) => void
  setActiveCourseActivity: (courseActivity: string) => void
  myCourseGroups: () => { all: any[]; cohort: any[]; completeTriad: any[] }
  getAssignmentList: () => any[] | undefined
  getLessonById: (id: string) => any
  myCourseDates: () => CourseDates
  myCourseTodo: () => CourseToDo[]
  setShowChat: () => void
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
      return {}
    },
    myCourseTodo: () => {
      return []
    },
    setShowChat: () => null,
  },
  state: undefined,
})
