import React from 'react';
import { StyleProvider, Container } from 'native-base';
import moment from 'moment-timezone';

import CourseSidebar from '../../components/CourseSidebar/CourseSidebar'
import getTheme from '../../native-base-theme/components';

import Validate from '../../components/Validate/Validate'
import { API, Auth } from 'aws-amplify';
import * as queries from '../../src/graphql/queries';
import * as customQueries from '../../src/graphql-custom/queries';
import * as mutations from '../../src/graphql/mutations';
import GRAPHQL_AUTH_MODE from 'aws-amplify-react-native'
import JCComponent, { JCState } from '../../components/JCComponent/JCComponent';
import CourseHome from '../../components/CourseViewer/CourseHome'
import CourseDetail from '../../components/CourseViewer/CourseDetail'
import CourseCoaching from '../../components/CourseViewer/CourseCoaching'
import { CourseContext, CourseState } from '../../components/CourseViewer/CourseContext';
import { CreateCourseWeekInput, CreateCourseLessonInput, CreateCourseTriadsInput } from 'src/API';
import { EditorState, convertToRaw } from 'draft-js';


interface Props {
  navigation: any
  route: any
}




export default class CourseHomeScreenImpl extends JCComponent<Props, CourseState>{
  constructor(props: Props) {
    super(props);

    this.state = {
      ...super.getInitialState(),
      currentScreen: props.route.params.screen ? props.route.params.screen : "Home",
      showMap: false,
      loadId: props.route.params.id,
      data: null,
      currentUser: null,
      courseData: null,
      isEditable: true,
      editMode: false,
      validationError: "",
      activeWeek: 0,
      activeLesson: null,
      activeMessageBoard: "cohort",
      activeCourseActivity: "today"
    }
    Auth.currentAuthenticatedUser().then((user: any) => {
      this.setState({ currentUser: user.username }, () => {
        this.setInitialData(props)
      })
    })
  }
  static Provider = CourseContext.Provider;

  setInitialData(props: Props): void {

    const getGroup: any = API.graphql({
      query: queries.getGroup,
      variables: { id: props.route.params.id },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
    });
    const getCourse: any = API.graphql({
      query: customQueries.getCourseInfo,
      variables: { id: props.route.params.id },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
    });
    const processResults2 = (json) => {
      console.log({ courseData: json })
      this.setState({ courseData: json.data.getCourseInfo })
    }
    getCourse.then(processResults2).catch(processResults2)
    const processResults = (json) => {
      const isEditable = json.data.getGroup.owner == this.state.currentUser
      console.log({
        isEditable: isEditable,
        groupData: json
      })
      this.setState({ data: json.data.getGroup })

    }
    getGroup.then(processResults).catch(processResults)
  }


  openHome = (): void => {
    this.props.navigation.push("HomeScreen");
  }
  mapChanged = (): void => {
    this.setState({ showMap: !this.state.showMap })
  }
  validate(): boolean {
    const validation: any = Validate.Course(this.state.data)
    this.setState({ validationError: validation.validationError })
    return validation.result
  }


  updateValue(field: string, value: any): void {
    const temp = this.state.data
    temp[field] = value
    this.setState({ data: temp })
  }
  setEditMode = (editMode: boolean): void => {
    this.setState({ editMode: editMode }, () => { this.forceUpdate() })
  }
  setActiveScreen = (screen: string): void => {
    this.setState({
      currentScreen: screen
    })
  }

  setActiveWeek = (index: number): void => {
    this.setState({
      activeWeek: index,
      activeLesson: null
    })
  }
  setActiveLesson = (index: number): void => {
    this.setState({
      activeLesson: index
    })
  }
  setActiveMessageBoard = (messageBoard: string): void => {
    this.setState({
      activeMessageBoard: messageBoard
    })
  }
  setActiveCourseActivity = (courseActivity: string): void => {
    this.setState({
      activeCourseActivity: courseActivity
    })
  }
  updateInstructors = async (value: any): Promise<void> => {
    console.log(this.state.courseData.instructors.items)
    const del = this.state.courseData.instructors.items.filter(x => !value.map(z => z.id).includes(x.userID));
    const add = value.filter(x => !this.state.courseData.instructors.items.map(z => z.userID).includes(x.id));
    // const delTriadID= this.state.courseData.triads.items[index].users.items.map((item)=>{del.contains(item.})
    console.log({ del: del })
    add.map(async (item) => {
      let createCourseInstructors: any
      try {
        console.log({ "Adding": item })

        createCourseInstructors = await API.graphql({
          query: mutations.createCourseInstructors,
          variables: {
            input: {
              courseInfoID: this.state.courseData.id,
              userID: item.id
            }
          },
          authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
        });
        console.log(createCourseInstructors)
        const temp = this.state.courseData
        temp.instructors.items.push(createCourseInstructors.data.createCourseInstructors)
        console.log(temp)
        this.setState({ courseData: temp })

      } catch (createCourseInstructors) {
        console.log(createCourseInstructors)
        const temp = this.state.courseData
        temp.instructors.items.push(createCourseInstructors.data.createCourseInstructors)
        console.log(temp)
        this.setState({ courseData: temp })

      }
    })

    del.map(async (item) => {

      try {
        console.log({ "Deleting": item })

        const deleteCourseInstructors: any = await API.graphql({
          query: mutations.deleteCourseInstructors,
          variables: {
            input: {
              id: item.id
            }
          },
          authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
        });
        console.log(deleteCourseInstructors)
        const temp = this.state.courseData
        temp.instructors.items = temp.instructors.items.filter(user => user.id !== item.id)
        console.log(temp)
        this.setState({ courseData: temp })

      } catch (createCourseTriadUsers) {
        console.log(createCourseTriadUsers)
        const temp = this.state.courseData
        temp.instructors.items = temp.instructors.users.items.filter(user => user.id !== item.id)
        console.log(temp)
        this.setState({ courseData: temp })

      }
    })
  }
  updateTriadUsers = async (index: number, value: any): Promise<void> => {

    const del = this.state.courseData.triads.items[index].users.items.filter(x => !value.map(z => z.id).includes(x.userID));
    const add = value.filter(x => !this.state.courseData.triads.items[index].users.items.map(z => z.userID).includes(x.id));
    // const delTriadID= this.state.courseData.triads.items[index].users.items.map((item)=>{del.contains(item.})
    console.log({ del: del })
    add.map(async (item) => {
      let createCourseTriadUsers: any
      try {
        console.log({ "Adding": item })

        createCourseTriadUsers = await API.graphql({
          query: mutations.createCourseTriadUsers,
          variables: {
            input: {
              triadID: this.state.courseData.triads.items[index].id,
              userID: item.id
            }
          },
          authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
        });
        console.log(createCourseTriadUsers)
        const temp = this.state.courseData
        temp.triads.items[index].users.items.push(createCourseTriadUsers.data.createCourseTriadUsers)
        console.log(temp)
        this.setState({ courseData: temp })

      } catch (createCourseTriadUsers) {
        console.log(createCourseTriadUsers)
        const temp = this.state.courseData
        temp.triads.items[index].users.items.push(createCourseTriadUsers.data.createCourseTriadUsers)
        console.log(temp)
        this.setState({ courseData: temp })

      }
    })

    del.map(async (item) => {

      try {
        console.log({ "Deleting": item })

        const createCourseTriadUsers: any = await API.graphql({
          query: mutations.deleteCourseTriadUsers,
          variables: {
            input: {
              id: item.id
            }
          },
          authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
        });
        console.log(createCourseTriadUsers)
        const temp = this.state.courseData
        temp.triads.items[index].users.items = temp.triads.items[index].users.items.filter(user => user.id !== item.id)
        console.log(temp)
        this.setState({ courseData: temp })

      } catch (createCourseTriadUsers) {
        console.log(createCourseTriadUsers)
        const temp = this.state.courseData
        temp.triads.items[index].users.items = temp.triads.items[index].users.items.filter(user => user.id !== item.id)
        console.log(temp)
        this.setState({ courseData: temp })

      }
    })
  }
  removeDuplicates(originalArray, prop) {
    var newArray = [];
    var lookupObject = {};

    for (var i in originalArray) {
      lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for (i in lookupObject) {
      newArray.push(lookupObject[i]);
    }
    return newArray;
  }
  myCourseGroups = (): { all: any[], cohort: any[], completeTriad: any[] } => {

    const z: [{ cohort, completeTriad }] = this.state.courseData?.triads?.items.map((item) => {
      let triadTemp = [], coachTemp = [], cohortTemp = []
      let completeTriad = null
      if (item.users.items.filter(user => user.userID == this.state.currentUser).length > 0) {
        triadTemp = item.users.items.filter(user => user.userID != this.state.currentUser).map(item => item.user)
        coachTemp = item.coaches.items.map(item => item.user)
        completeTriad = { triad: triadTemp, coach: coachTemp, id: item.id }
      }
      else if (item.users.items.filter(user => user.userID == this.state.currentUser).length == 0) {
        cohortTemp = item.users.items.map(item => item.user)
        cohortTemp = cohortTemp.concat(item.coaches.items.map(item => item.user))
        // cohort.push(item.coaches.items)
      }
      return { completeTriad: completeTriad, cohort: cohortTemp }
    })
    const all = this.removeDuplicates(this.state.courseData?.triads?.items.map((item) => {
      return [...item.users.items, ...item.coaches.items]
    }).flat().filter(item => item.user != null).map(item => item.user), "id")
    let cohort = [], completeTriad = []
    cohort = this.removeDuplicates(z?.map(item => item.cohort).flat().filter(z => z != null), "id")
    completeTriad = z?.map(item => item.completeTriad).filter(z => z != null)
    const final = { all: all, cohort: cohort, completeTriad: completeTriad }
    console.log(final)
    return final
  }
  updateTriadCoaches = async (index: number, value: any): Promise<void> => {
    const del = this.state.courseData.triads.items[index].coaches.items.filter(x => !value.map(z => z.id).includes(x.userID));
    const add = value.filter(x => !this.state.courseData.triads.items[index].coaches.items.map(z => z.userID).includes(x.id));
    // const delTriadID= this.state.courseData.triads.items[index].users.items.map((item)=>{del.contains(item.})
    add.map(async (item: any) => {

      try {
        console.log({ "Adding": item })

        const createCourseTriadCoaches: any = await API.graphql({
          query: mutations.createCourseTriadCoaches,
          variables: {
            input: {
              triadID: this.state.courseData.triads.items[index].id,
              userID: item.id
            }
          },
          authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
        });
        console.log(createCourseTriadCoaches)
        const temp = this.state.courseData
        temp.triads.items[index].coaches.items.push(createCourseTriadCoaches.data.createCourseTriadCoaches)
        console.log(temp)
        this.setState({ courseData: temp })

      } catch (createCourseTriadCoaches) {
        console.log(createCourseTriadCoaches)
        const temp = this.state.courseData
        temp.triads.items[index].coaches.items.push(createCourseTriadCoaches.data.createCourseTriadCoaches)
        console.log(temp)
        this.setState({ courseData: temp })

      }
    })

    del.map(async (item) => {

      try {
        console.log({ "Deleting": item })

        const deleteCourseTriadCoaches: any = await API.graphql({
          query: mutations.deleteCourseTriadCoaches,
          variables: {
            input: {
              id: item.id
            }
          },
          authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
        });
        console.log(deleteCourseTriadCoaches)
        const temp = this.state.courseData
        temp.triads.items[index].coaches.items = temp.triads.items[index].coaches.items.filter(user => user.id !== item.id)
        console.log(temp)
        this.setState({ courseData: temp })

      } catch (deleteCourseTriadCoaches) {
        console.log(deleteCourseTriadCoaches)
        const temp = this.state.courseData
        temp.triads.items[index].coaches.items = temp.triads.items[index].coaches.items.filter(user => user.id !== item.id)
        console.log(temp)
        this.setState({ courseData: temp })

      }
    })
  }
  updateTriad = async (index: number, item: string, value: any): Promise<void> => {
    try {
      console.log({ "Updating Triad": index })

      const updateCourseTriads: any = await API.graphql({
        query: mutations.updateCourseTriads,
        variables: {
          input: {
            id: this.state.courseData.triads.items[index].id,
            [item]: value
          }
        },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
      });
      console.log(updateCourseTriads)
      const temp = this.state.courseData
      temp.triads.items[index][item] = value
      this.setState({ courseData: temp })

    } catch (e) {
      console.log(e)
    }
  }
  deleteTriad = async (index: number): Promise<void> => {

    try {
      console.log("Deleting Triad")

      const createTriad: any = await API.graphql({
        query: mutations.deleteCourseTriads,
        variables: { input: { id: this.state.courseData.triads.items[index].id } },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
      });
      console.log(createTriad)
      const temp = this.state.courseData
      temp.triads.items.splice(index, 1)
      this.setState({ courseData: temp })

    } catch (e) {
      console.log(e)
    }
  }
  createTriad = async (): Promise<void> => {
    const triad: CreateCourseTriadsInput =
    {
      courseInfoID: this.state.courseData.id
    }
    try {
      console.log("Creating Triad")

      const createTriad: any = await API.graphql({
        query: mutations.createCourseTriads,
        variables: { input: triad },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
      });
      console.log(createTriad)
      const temp = this.state.courseData
      temp.triads.items.push(createTriad.data.createCourseTriads)
      console.log(temp)
      this.setState({ courseData: temp }, () => this.forceUpdate())

    } catch (e) {
      console.log(e)
    }
  }
  createWeek = async (): Promise<void> => {
    const resource: CreateCourseWeekInput =
    {
      week: this.state.courseData.courseWeeks.items.length + 1,
      name: "New Menu Item",
      leader: JSON.stringify(convertToRaw(EditorState.createEmpty().getCurrentContent())),
      courseInfoID: this.state.courseData.id
    }
    try {
      console.log("Creating Resource")

      const createCourse: any = await API.graphql({
        query: mutations.createCourseWeek,
        variables: { input: resource },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
      });
      console.log(createCourse)
      const temp = this.state.courseData
      temp.courseWeeks.items.push(createCourse.data.createCourseWeek)
      console.log(temp)
      this.setState({ courseData: temp }, () => this.forceUpdate())

    } catch (e) {
      console.log(e)
    }

  }
  createLesson = async (): Promise<void> => {
    const resource: CreateCourseLessonInput =
    {
      name: "New Lesson",//this.state.courseData.courseWeeks.items.length + 1,
      lesson: this.state.courseData.courseWeeks.items[this.state.activeWeek].lessons.items.length + 1,
      //time: "",
      description: JSON.stringify(convertToRaw(EditorState.createEmpty().getCurrentContent())),
      courseWeekID: this.state.courseData.courseWeeks.items[this.state.activeWeek].id
    }
    try {
      console.log("Creating Resource")

      const createCourse: any = await API.graphql({
        query: mutations.createCourseLesson,
        variables: { input: resource },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
      });
      console.log(createCourse)
      const temp = this.state.courseData
      temp.courseWeeks.items[this.state.activeWeek].lessons.items.push(createCourse.data.createCourseLesson)
      console.log(temp)
      this.setState({ courseData: temp }, () => this.forceUpdate())

    } catch (e) {
      console.log(e)
    }

  }
  getLessonById = (id): any => {
    return this.state.courseData.courseWeeks.items.map((week) => {
      return week.lessons.items.filter((lesson) => {
        if (lesson.id == id)
          return lesson
      })
    }).flat()[0]
  }
  getAssignmentList = (): void => {
    return this.state.courseData.courseWeeks.items.map((week) => {
      return week.lessons.items.map((lesson) => {
        if (lesson.lessonType == "assignment")
          return lesson
      })
    }).flat()
  }
  updateWeekOrder = (): void => {
    try {
      this.state.courseData.courseWeeks.items.forEach((item, index: number) => {
        this.updateWeek(index, "week", index)
      })

      /* var temp = this.state.data
       temp.resources.items.forEach((item, index) => {
           temp.resources.items[index].order = index
       }
       )
       this.setState({ data: temp })*/

    } catch (e) {
      console.log(e)
    }
  }
  updateLesson = async (week: number, lesson: number, item: string, value: any): Promise<void> => {
    try {
      console.log({ "Updating Lesson": lesson })

      const updateWeek: any = await API.graphql({
        query: mutations.updateCourseLesson,
        variables: {
          input: {
            id: this.state.courseData.courseWeeks.items[week].lessons.items[lesson].id,
            [item]: value
          }
        },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
      });
      console.log(updateWeek)
      const temp = this.state.courseData
      temp.courseWeeks.items[week].lessons.items[lesson][item] = value
      this.setState({ courseData: temp })

    } catch (e) {
      console.log(e)
    }
  }
  updateCourse = async (item: string, value: any): Promise<void> => {
    try {
      console.log({ "Updating Course": item })

      const updateCourseInfo: any = await API.graphql({
        query: mutations.updateCourseInfo,
        variables: {
          input: {
            id: this.state.courseData.id,
            [item]: value
          }
        },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
      });
      console.log(updateCourseInfo)
      const temp = this.state.courseData
      temp[item] = value
      this.setState({ courseData: temp })

    } catch (e) {
      console.log(e)
    }
  }
  updateWeek = async (index: number, item: string, value: any): Promise<void> => {
    try {
      console.log({ "Updating Week": index })

      const updateWeek: any = await API.graphql({
        query: mutations.updateCourseWeek,
        variables: {
          input: {
            id: this.state.courseData.courseWeeks.items[index].id,
            [item]: value
          }
        },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
      });
      console.log(updateWeek)
      const temp = this.state.courseData
      temp.courseWeeks.items[index][item] = value
      this.setState({ courseData: temp })

    } catch (e) {
      console.log(e)
    }
  }
  myCourseTodo = () => {
    if (this.state.courseData != null) {
      const assignments = this.state.courseData?.courseWeeks.items.map((week) => {
        return week.lessons.items.map((lesson) => {
          if (lesson.lessonType == "assignment")
            return lesson
        })
      }).flat().filter(item => item != null).map((item: any) => {

        const tz = item.tz ? item.tz : moment.tz.guess()
        const time = moment.tz(item.time, tz).format('hh:mm')
        const date = moment.tz(item.time, tz).format('YYYY-MM-DD')
        const m = moment.tz(item.time, tz)
        return { lessonType: item.lessonType, time: time, date: date, moment: m }
      }).filter(item => {
        console.log({ z: item })
        return item.time != "Invalid date"
      })

      const zoom = this.state.courseData?.courseWeeks.items.map((week) => {
        return week.lessons.items.map((lesson) => {
          if (lesson.lessonType == "zoom" || lesson.lessonType == null)
            return lesson
        })
      }).flat().filter(item => item != null).map((item: any) => {
        const tz = item.tz ? item.tz : moment.tz.guess()
        const time = moment.tz(item.time, tz).format('hh:mm')
        const date = moment.tz(item.time, tz).format('YYYY-MM-DD')
        const m = moment.tz(item.time, tz)
        return { lessonType: item.lessonType, time: time, date: date, moment: m }
      }).filter(item => item.time != "Invalid date")

      const respond = this.state.courseData?.courseWeeks.items.map((week) => {
        return week.lessons.items.map((lesson) => {
          if (lesson.lessonType == "respond")
            return lesson
        })
      }).flat().filter(item => item != null).map((item: any) => {
        const tz = item.tz ? item.tz : moment.tz.guess()
        const time = moment.tz(item.time, tz).format('hh:mm')
        const date = moment.tz(item.time, tz).format('YYYY-MM-DD')
        const m = moment.tz(item.time, tz)
        return { lessonType: item.lessonType, time: time, date: date, moment: m }
      }).filter(item => item.time != "Invalid date")

      return [...assignments, ...zoom, ...respond].filter(item => item.moment > moment()).sort((a, b) => { return a.moment.diff(b.moment) })
    }
    else
      return []
  }
  myCourseDates = () => {
    console.log({ courseData: this.state.courseData })
    const assignments = this.state.courseData?.courseWeeks.items.map((week) => {
      return week.lessons.items.map((lesson) => {
        if (lesson.lessonType == "assignment")
          return lesson
      })
    }).flat().filter(item => item != null).map((item: any) => {

      const tz = item.tz ? item.tz : moment.tz.guess()
      return moment.tz(item.time, tz).format('YYYY-MM-DD')
    }).filter(item => item != "Invalid date")

    const zoom = this.state.courseData?.courseWeeks.items.map((week) => {
      return week.lessons.items.map((lesson) => {
        if (lesson.lessonType == "zoom" || lesson.lessonType == null)
          return lesson
      })
    }).flat().filter(item => item != null).map((item: any) => {
      const tz = item?.tz ? item.tz : moment.tz.guess()
      return moment.tz(item.time, tz).format('YYYY-MM-DD')
    }).filter(item => item != "Invalid date")

    const respond = this.state.courseData?.courseWeeks.items.map((week) => {
      return week.lessons.items.map((lesson) => {
        if (lesson.lessonType == "respond")
          return lesson
      })
    }).flat().filter(item => item != null).map((item: any) => {
      const tz = item?.tz ? item.tz : moment.tz.guess()
      return moment.tz(item.time, tz).format('YYYY-MM-DD')
    }).filter(item => item != "Invalid date")
    console.log({ zoom: zoom, assignments: assignments, respond: respond })
    return { zoom: zoom, assignments: assignments, respond: respond }
  }
  deleteWeek = async (index: number): Promise<void> => {

    try {
      console.log({ "Deleting Course Week": index })
      const deleteResource: any = await API.graphql({
        query: mutations.deleteCourseWeek,
        variables: { input: { id: this.state.courseData.courseWeeks.items[index].id } },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
      });
      console.log(deleteResource)
      const temp = this.state.courseData
      temp.courseWeeks.items.splice(index, 1)
      this.setState({ courseData: temp }, this.updateWeekOrder)

    } catch (e) {
      console.log(e)
    }

  }
  deleteLesson = async (week: number, lesson: number): Promise<void> => {

    try {
      console.log({ "Deleting Course lesson": week + " " + lesson })
      const deleteResource: any = await API.graphql({
        query: mutations.deleteCourseLesson,
        variables: { input: { id: this.state.courseData.courseWeeks.items[week].lessons.items[lesson].id } },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
      });
      console.log(deleteResource)
      const temp = this.state.courseData
      temp.courseWeeks.items[week].lessons.items.splice(lesson, 1)
      this.setState({ courseData: temp }, this.updateWeekOrder)

    } catch (e) {
      console.log(e)
    }

  }
  render(): React.ReactNode {

    //console.log(acc)
    console.log("CourseScreen")
    return (
      this.state.data ?
        <CourseHomeScreenImpl.Provider value={{
          state: {
            ...this.state
          }, actions: {
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
            setActiveMessageBoard: this.setActiveMessageBoard,
            myCourseGroups: this.myCourseGroups,
            setActiveCourseActivity: this.setActiveCourseActivity,
            getAssignmentList: this.getAssignmentList,
            getLessonById: this.getLessonById,
            myCourseDates: this.myCourseDates,
            myCourseTodo: this.myCourseTodo

          }
        }}>
          <StyleProvider style={getTheme()}>
            <Container style={this.styles.style.courseHomeScreenMainContainer}>
              <CourseSidebar courseId={this.state.data.id}></CourseSidebar>
              <CourseHome></CourseHome>
              <CourseDetail></CourseDetail>
              <CourseCoaching></CourseCoaching>
            </Container>
          </StyleProvider >
        </CourseHomeScreenImpl.Provider>
        :
        null

    );
  }
}
