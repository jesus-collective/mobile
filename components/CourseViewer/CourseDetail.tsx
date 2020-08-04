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
import EditableText from '../Forms/EditableText';
import EditableDate from '../Forms/EditableDate';
import moment from 'moment-timezone';
import EditableRichText from '../Forms/EditableRichText';
import { AntDesign } from '@expo/vector-icons';

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

            <EditableText onChange={(e) => { actions.updateWeek(state.activeWeek, "title", e) }}
              placeholder="Week Title" multiline={true}
              data-testid="course-weekTitle"
              textStyle={this.styles.style.fontFormSmallDarkGrey}
              inputStyle={{ borderWidth: 1, borderColor: "#dddddd", marginTop: 30, marginBottom: 60, width: "90%", paddingTop: 10, paddingRight: 10, paddingBottom: 10, paddingLeft: 10, fontFamily: 'Graphik-Regular-App', fontSize: 16, lineHeight: 28 }}
              value={week.title} isEditable={state.isEditable}></EditableText>

            <EditableDate type="date"
              onChange={(time: any, timeZone: any) => { actions.updateWeek(state.activeWeek, "date", time); actions.updateWeek(state.activeWeek, "tz", timeZone) }}
              placeholder="Enter Week Start Date"
              multiline={false}
              textStyle={this.styles.style.fontRegular} inputStyle={this.styles.style.groupNameInput}
              value={week.date}
              tz={week.tz ? week.tz : moment.tz.guess()}
              isEditable={this.state.isEditable}></EditableDate>
            <Text>{week.date}</Text>

            <EditableText onChange={(e) => { actions.updateWeek(state.activeWeek, "leader", e) }}
              placeholder="Lesson Leader" multiline={true}
              data-testid="course-lessonTitle"
              textStyle={this.styles.style.fontFormSmallDarkGrey}
              inputStyle={{ borderWidth: 1, borderColor: "#dddddd", marginTop: 15, marginBottom: 60, width: "90%", paddingTop: 10, paddingRight: 10, paddingBottom: 10, paddingLeft: 10, fontFamily: 'Graphik-Regular-App', fontSize: 16, lineHeight: 28 }}
              value={week.leader} isEditable={state.isEditable}></EditableText>

            {week.lessons?.items?.map((item: any, lesson: number) => {
              return (
                <TouchableOpacity key={lesson} onPress={() => { actions.setActiveLesson(lesson) }}>
                  <Card style={{ minHeight: "40px", maxHeight: "100px", width: "80% " }}>
                    <Container style={{ flexDirection: "row" }}>
                      <Text>MON</Text>
                      <Container style={{ flexDirection: "column", minHeight: "40px", maxHeight: "80px" }}>

                        <EditableText onChange={(e) => { actions.updateLesson(state.activeWeek, lesson, "name", e) }}
                          placeholder="Title" multiline={true}
                          data-testid="course-lessonTitle"
                          textStyle={this.styles.style.fontFormSmallDarkGrey}
                          inputStyle={{ borderWidth: 1, borderColor: "#dddddd", marginTop: 15, marginBottom: 60, width: "100%", paddingTop: 10, paddingRight: 10, paddingBottom: 10, paddingLeft: 10, fontFamily: 'Graphik-Regular-App', fontSize: 16, lineHeight: 28 }}
                          value={item.name} isEditable={state.isEditable}></EditableText>

                        <Container style={{ flexDirection: "row", minHeight: "40px", maxHeight: "80px" }}>
                          <Text><Image style={{ width: "22px", height: "22px" }} source={require('../../assets/svg/time.svg')} />3 hours</Text>
                          <Text><Image style={{ width: "22px", height: "22px" }} source={require('../../assets/svg/document.svg')} />Assignment</Text>
                        </Container>
                      </Container>
                      <Text>Completed</Text>
                      <Text><Image style={{ width: "22px", height: "22px" }} source={require('../../assets/svg/checkmark.svg')} /></Text>
                      <TouchableOpacity onPress={() => { actions.deleteLesson(state.activeWeek, lesson) }}>
                        <AntDesign name="close" size={20} color="black" />
                      </TouchableOpacity>
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
    if (week?.lessons) {
      const lesson = week.lessons.items[state.activeLesson]
      return (
        state.activeLesson != null ?
          <Container style={{ flex: 70, flexDirection: "column", alignContent: 'flex-start', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
            <JCButton buttonType={ButtonTypes.Outline} onPress={() => { actions.setActiveWeek(state.activeWeek) }}>Return</JCButton>
            <Text>{week.week}</Text>
            <Text>{week.date}</Text>
            <Text>{week.leader}</Text>
            <Text>Lesson {state.activeLesson + 1} - {lesson.name}</Text>
            <Text>{lesson.time}</Text>
            <EditableRichText onChange={(val) => { actions.updateLesson(state.activeWeek, state.activeLesson, "description", val) }}
              value={lesson.description}
              isEditable={true}
              textStyle=""></EditableRichText>

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
                      <Container style={{ display: "flex", flexDirection: "row", justifyContent: 'flex-start', paddingLeft: '5%' }}>

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
