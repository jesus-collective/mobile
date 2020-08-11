import React, { lazy } from 'react';
import { StyleProvider, Card, Container, Content, Picker, Icon } from 'native-base';
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
import EditableCourseAssignment from '../Forms/EditableCourseAssignment'
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
              placeholder="Week Title" multiline={false}
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
              placeholder="Lesson Leader" multiline={false}
              data-testid="course-lessonTitle"
              textStyle={this.styles.style.fontFormSmallDarkGrey}
              inputStyle={{ borderWidth: 1, borderColor: "#dddddd", marginTop: 15, marginBottom: 60, width: "90%", paddingTop: 10, paddingRight: 10, paddingBottom: 10, paddingLeft: 10, fontFamily: 'Graphik-Regular-App', fontSize: 16, lineHeight: 28 }}
              value={week.leader} isEditable={state.isEditable}></EditableText>

            {week.lessons?.items?.map((item: any, lesson: number) => {
              return (
                <TouchableOpacity key={lesson} onPress={() => { actions.setActiveLesson(lesson) }}>
                  <Card style={{ minHeight: "40px", maxHeight: "100px", width: "50.5vw", borderColor: '#FFFFFF', paddingTop: 50, paddingRight: 30, paddingBottom: 50, paddingLeft: 30, boxShadow: '0 6px 20px 0 rgba(0, 0, 0, 0.19)', marginBottom: 30 }}>
                    <Container style={{ flexDirection: "row" }}>
                      <Text style={{ fontSize: 20, lineHeight: 25, fontFamily: 'Graphik-Regular-App', marginRight: 35, alignSelf: 'center' }}>MON</Text>
                      <Container style={{ flexDirection: "column", height: "70px", alignSelf: 'center' }}>

                        <EditableText onChange={(e) => { actions.updateLesson(state.activeWeek, lesson, "name", e) }}
                          placeholder="Title" multiline={true}
                          data-testid="course-lessonTitle"
                          textStyle={this.styles.style.fontFormSmallDarkGrey}
                          inputStyle={{ borderWidth: 1, borderColor: "#dddddd", marginTop: 0, marginBottom: 10, width: "100%", paddingTop: 5, paddingRight: 5, paddingBottom: 5, paddingLeft: 5, fontFamily: 'Graphik-Regular-App', fontSize: 16, lineHeight: 21, height: 30 }}
                          value={item.name} isEditable={state.isEditable}></EditableText>

                        <Container style={{ flexDirection: "row", height: 'auto' }}>
                          <Text style={{ alignSelf: 'center', marginRight: 30 }}>
                            {state.isEditable ?
                              null
                              : <Image style={{ width: "22px", height: "22px", alignSelf: 'center', top: 5 }} source={require('../../assets/svg/time.svg')} />
                            }
                            <EditableText onChange={(e) => { actions.updateLesson(state.activeWeek, lesson, "duration", e) }}
                              placeholder="Duration" multiline={false}
                              data-testid="course-lessonDuration"
                              textStyle={this.styles.style.fontFormSmallDarkGrey}
                              inputStyle={{ borderWidth: 1, borderColor: "#dddddd", marginTop: 5, marginBottom: 5, width: "100%", paddingTop: 5, paddingRight: 5, paddingBottom: 5, paddingLeft: 5, fontFamily: 'Graphik-Regular-App', fontSize: 16, lineHeight: 21, height: 30 }}
                              value={item.duration} isEditable={state.isEditable}></EditableText>
                          </Text>

                          {state.isEditable ?
                            <Picker

                              onStartShouldSetResponder={() => true}
                              onMoveShouldSetResponderCapture={() => true}
                              onStartShouldSetResponderCapture={() => true}
                              onMoveShouldSetResponder={() => true}
                              mode="dropdown"
                              iosIcon={<Icon name="arrow-down" />}
                              style={{ width: "50%", marginBottom: 0, marginTop: 0, fontSize: 16, height: 30, flexGrow: 0, marginRight: 0, borderColor: '#dddddd' }}
                              placeholder="Event type"
                              placeholderStyle={{ color: "#bfc6ea" }}
                              placeholderIconColor="#007aff"
                              selectedValue={item.lessonType ? item.lessonType : "zoom"}
                              onValueChange={(value: any) => { actions.updateLesson(state.activeWeek, lesson, "lessonType", value) }}
                            >
                              <Picker.Item label="Zoom Call" value="zoom" />
                              <Picker.Item label="Assignment" value="assignment" />
                              <Picker.Item label="Respond" value="respond" />

                            </Picker>
                            :
                            {
                              'assignment': (<Text style={{ alignSelf: 'center' }}>
                                <Image style={{ width: "22px", height: "22px", alignSelf: 'center', top: 5 }}
                                  source={require('../../assets/svg/document.svg')} />Assignment</Text>),
                              'respond': (<Text style={{ alignSelf: 'center' }}>
                                <Image style={{ width: "22px", height: "22px", alignSelf: 'center', top: 5 }}
                                  source={require('../../assets/svg/document.svg')} />Respond</Text>),
                              'zoom': (<Text style={{ alignSelf: 'center' }}>
                                <Image style={{ width: "22px", height: "22px", alignSelf: 'center', top: 5 }}
                                  source={require('../../assets/svg/document.svg')} />Zoom</Text>)
                            }[item.lessonType] || (<Text style={{ alignSelf: 'center' }}>
                              <Image style={{ width: "22px", height: "22px", alignSelf: 'center', top: 5 }}
                                source={require('../../assets/svg/document.svg')} />Zoom</Text>)
                          }
                        </Container>
                      </Container>
                      <Text style={{ fontSize: 12, lineHeight: 21, fontFamily: 'Graphik-Bold-App', color: '#FFF', marginLeft: 30, marginRight: 15, paddingLeft: 10, paddingRight: 10, textTransform: 'uppercase', backgroundColor: '#71C209', borderRadius: 50, height: 20, alignSelf: 'center' }}>Completed</Text>
                      <Text style={{ alignSelf: 'center' }}><Image style={{ width: "30px", height: "30px" }} source={require('../../assets/svg/checkmark.svg')} /></Text>
                      <TouchableOpacity style={{ alignSelf: 'center', marginLeft: 15 }} onPress={() => { actions.deleteLesson(state.activeWeek, lesson) }}>
                        <AntDesign name="close" size={20} color="black" />
                      </TouchableOpacity>
                    </Container>
                  </Card>
                </TouchableOpacity>
              )
            })}
            <TouchableOpacity onPress={() => { actions.createLesson() }}>
              <Card style={{ minHeight: "40px", maxHeight: "80px", width: "50.5vw", borderColor: '#FFFFFF', paddingTop: 30, paddingRight: 30, paddingBottom: 50, paddingLeft: 30, boxShadow: '0 6px 20px 0 rgba(0, 0, 0, 0.19)', marginBottom: 30 }}>
                <Container style={{ flexDirection: "row" }}>
                  <Text style={{ fontSize: 16, lineHeight: 21, fontFamily: 'Graphik-Regular-App', alignSelf: 'center' }}></Text>
                  <Container style={{ flexDirection: "column", minHeight: "30px", maxHeight: "30px" }}>
                    <Text style={{ fontSize: 16, lineHeight: 21, fontFamily: 'Graphik-Bold-App', alignSelf: 'center', color: '#333333' }}>Create New Lesson</Text>

                  </Container>

                </Container>
              </Card>
            </TouchableOpacity>
          </Container>
          : <Container style={{ flex: 70, flexDirection: "column", alignContent: 'flex-start', alignItems: 'flex-start', justifyContent: 'flex-start' }}><Text>Please create your first week</Text></Container>
        : null
    )
  }
  renderZoom(state, actions, week, lesson) {
    return (
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
      </Container>)
  }
  renderRespond(state, actions, week, lesson) {
    return (
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
      </Container>)
  }
  renderAssignment(state, actions, week, lesson) {
    return (
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
        <EditableCourseAssignment onChange={(val) => { actions.updateLesson(state.activeWeek, state.activeLesson, "description", val) }}
          value={lesson.description}
          isEditable={true}
          textStyle=""></EditableCourseAssignment>
      </Container>)
  }
  renderLessonType(state, actions, week, lesson) {
    switch (lesson.lessonType) {
      case 'respond':
        return this.renderRespond(state, actions, week, lesson)
      case 'assignment':
        return this.renderAssignment(state, actions, week, lesson)
      default:
        return this.renderZoom(state, actions, week, lesson)
    }
  }
  renderLessonDetails(state, actions, week: any): React.ReactNode {
    // console.log(this.state.activeLesson)
    if (week?.lessons) {
      const lesson = week.lessons.items[state.activeLesson]
      return (
        state.activeLesson != null ?
          this.renderLessonType(state, actions, week, lesson)
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
                          <Container style={{ flex: 5, flexDirection: "row", marginTop: 30, borderBottom: '1px solid #333333', width: '95%', paddingBottom: 30 }}>
                            <JCButton buttonType={ButtonTypes.TransparentCourse} onPress={() => { null }}>Cohort</JCButton>
                            <JCButton buttonType={ButtonTypes.TransparentCourse} onPress={() => { null }}>Triad</JCButton>
                            <JCButton buttonType={ButtonTypes.TransparentCourse} onPress={() => { null }}>Instructor</JCButton>
                          </Container>
                          <Container style={{ flex: 95, flexDirection: "row", marginTop: 10, width: '100%' }}>
                            <MessageBoard style="mini" groupId={state.data.id}></MessageBoard>
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
