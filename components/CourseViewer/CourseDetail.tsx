import React, { lazy } from 'react';
import { StyleProvider, Card, Container, Content } from 'native-base';
import { Text } from 'react-native'
import JCButton, { ButtonTypes } from '../Forms/JCButton'

import getTheme from '../../native-base-theme/components';

import { Image } from 'react-native'
import CourseHeader from '../CourseHeader/CourseHeader';
import { TouchableOpacity } from 'react-native';
import JCComponent from '../JCComponent/JCComponent';
const MessageBoard = lazy(() => import('../MessageBoard/MessageBoard'));

import { useRoute, useNavigation } from '@react-navigation/native';
import { CourseContext } from './CourseContext';
import CourseDetailMenu from './CourseDetailMenu';

interface Props {
  navigation?: any
  route?: any
}




class CourseDetailImpl extends JCComponent<Props>{
  constructor(props: Props) {
    super(props);
  }
  static Consumer = CourseContext.Consumer;

  renderWeekDetails(state, actions, week): React.ReactNode {
    //console.log(this.state.activeLesson)
    return (
      state.activeLesson == null ?
        week ?
          <Container style={{ flex: 70, flexDirection: "column", alignContent: 'flex-start', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
            <Text>{week.name}</Text>
            <Text>{week.date}</Text>
            <Text>{week.leader}</Text>
            {week.lessons.items.map((item: any, lesson: any) => {
              return (
                <TouchableOpacity key={lesson} onPress={() => { actions.setActiveLesson(lesson) }}>
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
              )
            })}
            <TouchableOpacity onPress={() => { actions.createLesson() }}>
              <Card style={{ minHeight: "40px", maxHeight: "100px", width: "80% " }}>
                <Container style={{ flexDirection: "row" }}>
                  <Text></Text>
                  <Container style={{ flexDirection: "column", minHeight: "40px", maxHeight: "80px" }}>
                    <Text>Create New Lesson</Text>
                    <Container style={{ flexDirection: "row", minHeight: "40px", maxHeight: "80px" }}>
                      <Text></Text>
                      <Text></Text>
                    </Container>
                  </Container>
                  <Text></Text>
                  <Text></Text>
                </Container>
              </Card>
            </TouchableOpacity>
          </Container>
          : <Container style={{ flex: 70, flexDirection: "column", alignContent: 'flex-start', alignItems: 'flex-start', justifyContent: 'flex-start' }}><Text>Please create your first week</Text></Container>
        : null
    )
  }
  renderLessonDetails(state, actions, week: any): React.ReactNode {
    // console.log(this.state.activeLesson)
    if (week) {
      const lesson = week.lessons[state.activeLesson]
      return (
        state.activeLesson != null ?
          <Container style={{ flex: 70, flexDirection: "column", alignContent: 'flex-start', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
            <JCButton buttonType={ButtonTypes.Outline} onPress={() => { actions.setActiveWeek(state.activeWeek) }}>Return</JCButton>
            <Text>{week.week}</Text>
            <Text>{week.date}</Text>
            <Text>{week.leader}</Text>
            <Text>Lesson {state.activeLesson + 1} - {lesson.name}</Text>
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
    } else {
      return null
    }
  }
  render(): React.ReactNode {
    console.log("CourseDetail")
    return (

      <CourseDetailImpl.Consumer>
        {({ state, actions }) => {
          const week = state.courseData?.courseWeeks.items[state.activeWeek]

          return (
            state.data && state.currentScreen == "Details" ?
              <StyleProvider style={getTheme()}>

                <Container style={{ flex: 85 }}>
                  <CourseHeader groupData={state.data}></CourseHeader>
                  <CourseDetailMenu></CourseDetailMenu>
                  <Container style={{ flex: 80 }}>
                    <Content style={{ flex: 85 }}>
                      <Container style={{ display: "flex", flexDirection: "row", justifyContent: 'flex-start' }}>

                        {this.renderWeekDetails(state, actions, week)}
                        {this.renderLessonDetails(state, actions, week)}
                        <Container style={{ flex: 30, flexDirection: "column", alignContent: 'flex-start', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                          <Container style={{ flex: 5, flexDirection: "row" }}>
                            <JCButton buttonType={ButtonTypes.Outline} onPress={() => { null }}>Cohort</JCButton>
                            <JCButton buttonType={ButtonTypes.Outline} onPress={() => { null }}>Triad</JCButton>
                            <JCButton buttonType={ButtonTypes.Outline} onPress={() => { null }}>Instructor</JCButton>
                          </Container>
                          <Container style={{ flex: 95, flexDirection: "row" }}>
                            <MessageBoard groupId={state.data.id}></MessageBoard>
                          </Container>
                        </Container>
                      </Container>
                    </Content>
                  </Container>
                </Container>

              </StyleProvider>
              :
              null
          )
        }}
      </CourseDetailImpl.Consumer>

    );
  }
}

export default function CourseDetail(props: Props): JSX.Element {
  const route = useRoute();
  const navigation = useNavigation()
  return <CourseDetailImpl {...props} navigation={navigation} route={route} />;
}
