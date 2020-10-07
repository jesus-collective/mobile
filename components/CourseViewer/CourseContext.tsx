
import { JCState } from 'components/JCComponent/JCComponent';
import * as React from 'react';
export interface CourseState extends JCState {
    showMap: boolean
    loadId: string
    data: any
    courseData: any
    editMode: boolean
    isEditable: boolean
    validationError: string
    currentScreen: string
    currentUser: string
    activeWeek: number
    activeLesson: number

    activeMessageBoard: string
    activeCourseActivity: string
}
type CourseContextType = {
    actions: any
    state: CourseState | undefined
}
export const CourseContext = React.createContext<CourseContextType>({
    actions: {
        createCourse: null,
        changeCourse: null,
        updateCourse: null,
        deleteCourse: null,
        setActiveScreen: null,
        setActiveWeek: null,
        setActiveLesson: null,
        createWeek: null,
        updateWeek: null,
        deleteWeek: null,
        updateWeekOrder: null,
        createLesson: null,
        updateLesson: null,
        deleteLesson: null,
        updateTriad: null,
        createTriad: null,
        deleteTriad: null,
        setEditMode: null,
        updateTriadUsers: null,
        updateTriadCoaches: null,
        updateInstructors: null,
        updateBackOfficeStaff: null,
        setActiveMessageBoard: null,
        setActiveCourseActivity: null,
        myCourseGroups: null,
        getAssignmentList: null,
        getLessonById: null,
        myCourseDates: null,
        myCourseTodo: null
    }, state: undefined
})
