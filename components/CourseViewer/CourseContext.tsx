
import * as React from 'react';
export const CourseContext = React.createContext({
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
        updateTriad: null,
        createTriad: null
    }, state: null
})
