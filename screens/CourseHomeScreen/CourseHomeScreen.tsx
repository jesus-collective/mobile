﻿import React from 'react';
import { StyleProvider, Container } from 'native-base';

import CourseSidebar from '../../components/CourseSidebar/CourseSidebar'
import getTheme from '../../native-base-theme/components';

import Validate from '../../components/Validate/Validate'
import { API } from 'aws-amplify';
import * as queries from '../../src/graphql/queries';
import * as mutations from '../../src/graphql/mutations';
import GRAPHQL_AUTH_MODE from 'aws-amplify-react-native'
import JCComponent, { JCState } from '../../components/JCComponent/JCComponent';
import CourseHome from '../../components/CourseViewer/CourseHome'
import CourseDetail from '../../components/CourseViewer/CourseDetail'
import CourseCoaching from '../../components/CourseViewer/CourseCoaching'
import { CourseContext } from '../../components/CourseViewer/CourseContext';
import { CreateCourseWeekInput, CreateCourseLessonInput } from 'src/API';

interface Props {
  navigation: any
  route: any
}
interface State extends JCState {
  showMap: boolean
  loadId: string
  data: any
  courseData: any
  isEditable: boolean
  validationError: string
  currentScreen: string
  activeWeek: number
  activeLesson: number
}



export default class CourseHomeScreenImpl extends JCComponent<Props, State>{
  constructor(props: Props) {
    super(props);

    this.state = {
      ...super.getInitialState(),
      currentScreen: props.route.params.screen ? props.route.params.screen : "Home",
      showMap: false,
      loadId: props.route.params.id,
      data: null,
      courseData: null,
      isEditable: true,
      validationError: "",
      activeWeek: 0,
      activeLesson: null
    }
    this.setInitialData(props)
  }
  static Provider = CourseContext.Provider;

  setInitialData(props: Props): void {

    const getGroup: any = API.graphql({
      query: queries.getGroup,
      variables: { id: props.route.params.id },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
    });
    const getCourse: any = API.graphql({
      query: queries.getCourseInfo,
      variables: { id: props.route.params.id },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
    });
    const processResults2 = (json) => {
      console.log({ courseData: json })
      this.setState({ courseData: json.data.getCourseInfo })
    }
    getCourse.then(processResults2).catch(processResults2)
    const processResults = (json) => {
      console.log({ groupData: json })
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
  createWeek = async (): Promise<void> => {
    const resource: CreateCourseWeekInput =
    {
      week: this.state.courseData.courseWeeks.items.length + 1,
      name: "New Menu Item",
      leader: "Leader TBD"
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
      name: "New Menu Item",//this.state.courseData.courseWeeks.items.length + 1,
      //time: "",
      description: "...",

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
  updateWeekOrder = (): void => {
    try {
      this.state.courseData.courseWeeks.items.forEach((item, index) => {
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
  updateWeek = async (index: number, item: string, value: any): Promise<void> => {
    try {
      console.log({ "Updating Resource": index })

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
            updateCourse: null,
            deleteCourse: null,
            setActiveScreen: this.setActiveScreen,
            setActiveWeek: this.setActiveWeek,
            setActiveLesson: this.setActiveLesson,
            createWeek: this.createWeek,
            deleteWeek: this.deleteWeek,
            updateWeek: this.updateWeek,
            updateWeekOrder: this.updateWeekOrder,
            createLesson: this.createLesson
          }
        }}>
          <StyleProvider style={getTheme()}>
            <Container style={{ flexDirection: "row" }}>
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
