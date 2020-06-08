import React, { lazy } from 'react';
import { StyleProvider, Card, Container, Content } from 'native-base';
import { Text } from 'react-native'
import JCButton, { ButtonTypes } from '../../components/Forms/JCButton'

import CourseSidebar from '../../components/CourseSidebar/CourseSidebar'
import getTheme from '../../native-base-theme/components';

import Validate from '../../components/Validate/Validate'
import { Image } from 'react-native'
import { API } from 'aws-amplify';
import * as queries from '../../src/graphql/queries';
import GRAPHQL_AUTH_MODE from 'aws-amplify-react-native'
import CourseHeader from '../../components/CourseHeader/CourseHeader';
import { TouchableOpacity } from 'react-native';
import JCComponent from '../../components/JCComponent/JCComponent';
const MessageBoard = lazy(() => import('../../components/MessageBoard/MessageBoard'));

import data from '../CourseOverviewScreen/course.json';

interface Props {
  navigation: any
  route: any
}
interface State {
  showMap: boolean
  loadId: string
  data: any
  isEditable: boolean
  validationError: string
  activeWeek: any
  activeLesson: any
}



export default class CourseScreen extends JCComponent<Props, State>{
  constructor(props: Props) {
    super(props);

    this.state = {
      showMap: false,
      loadId: props.route.params.id,
      data: null,
      isEditable: true,
      validationError: "",
      activeWeek: 0,
      activeLesson: null
    }
    this.setInitialData(props)
  }

  setInitialData(props: Props): void {

    const getGroup: any = API.graphql({
      query: queries.getGroup,
      variables: { id: props.route.params.id },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
    });

    const processResults = (json) => {
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


  updateValue(field: any, value: any): void {
    const temp = this.state.data
    temp[field] = value
    this.setState({ data: temp })
  }
  setActiveWeek(index: any): void {
    this.setState({
      activeWeek: index,
      activeLesson: null
    })
  }
  setActiveLesson(index: any): void {
    this.setState({
      activeLesson: index
    })
  }
  renderWeekDetails(week): React.ReactNode {
    //console.log(this.state.activeLesson)
    return (
      this.state.activeLesson == null ?
        <Container style={{ flex: 70, flexDirection: "column", alignContent: 'flex-start', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
          <Text>{week.week}</Text>
          <Text>{week.date}</Text>
          <Text>{week.leader}</Text>
          {week.lessons.map((item: any, lesson: any) => {
            return <TouchableOpacity key={lesson} onPress={() => { this.setActiveLesson(lesson) }}>
              <Card style={{ minHeight: "40px", maxHeight: "100px", width: "80% " }}>
                <Container style={{ flexDirection: "row" }}>
                  <Text>MON</Text>
                  <Container style={{ flexDirection: "column", minHeight: "40px", maxHeight: "80px" }}>
                    <Text>{item.name}</Text>
                    <Container style={{ flexDirection: "row", minHeight: "40px", maxHeight: "80px" }}>
                      <Text><Image style={{ width: "22px", height: "22px" }} source={require('../../assets/svg/time.svg')} />3 hours</Text>
                      <Text><Image style={{ width: "22px", height: "22px" }} source={require('../../assets/svg/document.svg')} />Assignment</Text>
                    </Container>
                  </Container>
                  <Text>Completed</Text>
                  <Text><Image style={{ width: "22px", height: "22px" }} source={require('../../assets/svg/checkmark.svg')} /></Text>
                </Container>
              </Card>
            </TouchableOpacity>
          })}
        </Container>
        : null
    )
  }
  renderLessonDetails(week: any): React.ReactNode {
    // console.log(this.state.activeLesson)
    const lesson = week.lessons[this.state.activeLesson]
    return (
      this.state.activeLesson != null ?
        <Container style={{ flex: 70, flexDirection: "column", alignContent: 'flex-start', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
          <JCButton buttonType={ButtonTypes.Outline} onPress={() => { this.setActiveWeek(this.state.activeWeek) }}>Return</JCButton>
          <Text>{week.week}</Text>
          <Text>{week.date}</Text>
          <Text>{week.leader}</Text>
          <Text>Lesson {this.state.activeLesson + 1} - {lesson.name}</Text>
          <Text>{lesson.time}</Text>
          {lesson.description.map((item, index) => {
            return <Text key={index}>{item}</Text>
          })}
          {lesson.assignment ? (
            <Container>
              <Text>{lesson.assignment.due}</Text>
              {
                lesson.assignment.description.map((item: any, index) => {
                  return <Text key={index}>{item}</Text>
                })

              }
            </Container>
          )
            : null
          }

        </Container>
        : null
    )
  }
  render(): React.ReactNode {
    const week = data.courseDetails[this.state.activeWeek]
    console.log("CourseScreen")
    return (
      this.state.data ?
        <StyleProvider style={getTheme()}>
          <Container style={{ flexDirection: "row" }}>
            <CourseSidebar courseId={this.state.data.id}></CourseSidebar>
            <Container style={{ flex: 85 }}>
              <CourseHeader onChangeWeek={(week) => { this.setActiveWeek(week) }} courseData={data} groupData={this.state.data}></CourseHeader>
              <Content style={{ flex: 85 }}>
                <Container style={{ display: "flex", flexDirection: "row", justifyContent: 'flex-start' }}>
                  {this.renderWeekDetails(week)}
                  {this.renderLessonDetails(week)}
                  <Container style={{ flex: 30, flexDirection: "column", alignContent: 'flex-start', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                    <Container style={{ flex: 5, flexDirection: "row" }}>
                      <JCButton buttonType={ButtonTypes.Outline} onPress={() => { null }}>Cohort</JCButton>
                      <JCButton buttonType={ButtonTypes.Outline} onPress={() => { null }}>Triad</JCButton>
                      <JCButton buttonType={ButtonTypes.Outline} onPress={() => { null }}>Instructor</JCButton>
                    </Container>
                    <Container style={{ flex: 95, flexDirection: "row" }}>
                      <MessageBoard groupId={this.state.data.id}></MessageBoard>
                    </Container>
                  </Container>
                </Container>
              </Content>
            </Container>
          </Container>
        </StyleProvider>
        :
        null
    );
  }
}
