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
import EditableUrl from '../Forms/EditableUrl'
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
  renderAssignmentConfig(state, actions, lesson, item): React.ReactNode {
    return (<Container style={state.isEditable && state.editMode ? { flexDirection: "column", marginTop: 10, height: "unset" } : { flexDirection: "column", height: "unset" }}>
      {state.isEditable && state.editMode ?
        <EditableDate type="datetime"
          onChange={(time: any, timeZone: any) => { actions.updateLesson(state.activeWeek, lesson, "time", time); actions.updateLesson(state.activeWeek, lesson, "tz", timeZone) }}
          placeholder="Enter Zoom Date/Time"
          textStyle={this.styles.style.fontRegular}
          inputStyle={this.styles.style.groupNameInput}
          value={item.time}
          tz={item.tz ? item.tz : moment.tz.guess()}
          isEditable={state.isEditable && state.editMode}>
        </EditableDate> : null}
      {state.isEditable && state.editMode ?
        <EditableText onChange={(e) => { actions.updateLesson(state.activeWeek, lesson, "wordCount", e) }}
          placeholder="Word Count" multiline={false}
          data-testid="course-wordCount"
          textStyle={this.styles.style.fontFormSmallDarkGreyCourseTopEditable}
          inputStyle={{ borderWidth: 1, borderColor: "#dddddd", marginTop: 30, marginBottom: 30, width: "90%", paddingTop: 10, paddingRight: 10, paddingBottom: 10, paddingLeft: 10, fontFamily: 'Graphik-Regular-App', fontSize: 16, lineHeight: 28 }}
          value={item.wordCount} isEditable={state.isEditable && state.editMode}></EditableText>
        : null}
    </Container>
    )
  }
  renderResponseConfig(state, actions, lesson, item): React.ReactNode {
    return (<Container style={state.isEditable && state.editMode ? { flexDirection: "column", marginTop: 10, height: "unset" } : { flexDirection: "column", height: "unset" }}>
      {state.isEditable && state.editMode ?
        <EditableDate type="datetime"
          onChange={(time: any, timeZone: any) => { actions.updateLesson(state.activeWeek, lesson, "time", time); actions.updateLesson(state.activeWeek, lesson, "tz", timeZone) }}
          placeholder="Enter Zoom Date/Time"
          textStyle={this.styles.style.fontRegular}
          inputStyle={this.styles.style.groupNameInput}
          value={item.time}
          tz={item.tz ? item.tz : moment.tz.guess()}
          isEditable={state.isEditable && state.editMode}>
        </EditableDate> : null}
      {state.isEditable && state.editMode ?
        <>
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
            onValueChange={(value: any) => { actions.updateLesson(state.activeWeek, lesson, "courseLessonResponseId", value) }}
          >
            <Picker.Item label="Pick an assigment to Review" />
            {actions.getAssignmentList()?.map((item) => {
              console.log(item)
              if (item)
                return <Picker.Item key={item.id} label={item.name} value={item.id} />
            })}

          </Picker>
          <EditableText onChange={(e) => { actions.updateLesson(state.activeWeek, lesson, "wordCount", e) }}
            placeholder="Word Count" multiline={false}
            data-testid="course-wordCount"
            textStyle={this.styles.style.fontFormSmallDarkGreyCourseTopEditable}
            inputStyle={{ borderWidth: 1, borderColor: "#dddddd", marginTop: 30, marginBottom: 30, width: "90%", paddingTop: 10, paddingRight: 10, paddingBottom: 10, paddingLeft: 10, fontFamily: 'Graphik-Regular-App', fontSize: 16, lineHeight: 28 }}
            value={item.wordCount} isEditable={state.isEditable && state.editMode}></EditableText>
        </>
        : null}
    </Container>
    )
  }
  renderZoomConfig(state, actions, lesson, item): React.ReactNode {
    return (
      <Container style={state.isEditable && state.editMode ? this.styles.style.courseActivityButtonEditable : this.styles.style.courseActivityButtonNonEditable}>
        <EditableUrl title="Open in Zoom"
          onChange={(e) => { actions.updateLesson(state.activeWeek, lesson, "zoomUrl", e) }}
          placeholder="Enter Event URL" multiline={false} textStyle={ButtonTypes.courseCardSolid}
          inputStyle={this.styles.style.courseEditableURL} value={item.zoomUrl}
          isEditable={state.isEditable && state.editMode}></EditableUrl>
        <EditableUrl title="Zoom Recording"
          onChange={(e) => { actions.updateLesson(state.activeWeek, lesson, "zoomRecording", e) }}
          placeholder="Enter Recording URL" multiline={false} textStyle={ButtonTypes.courseCardSolid}
          inputStyle={this.styles.style.courseEditableURL} value={item.zoomRecording}
          isEditable={state.isEditable && state.editMode}></EditableUrl>
        {state.isEditable && state.editMode ?
          <EditableDate type="datetime"
            onChange={(time: any, timeZone: any) => { actions.updateLesson(state.activeWeek, lesson, "time", time); actions.updateLesson(state.activeWeek, lesson, "tz", timeZone) }}
            placeholder="Enter Zoom Date/Time"
            textStyle={this.styles.style.fontRegular}
            inputStyle={this.styles.style.groupNameInput}
            value={item.time}
            tz={item.tz ? item.tz : moment.tz.guess()}
            isEditable={state.isEditable && state.editMode}>
          </EditableDate> : null}
      </Container>

    )
  }
  getMonth(week, item, lesson) {
    if (item.time && item.tz)
      if (moment.tz(item.time, item.tz).format('MMM DD') == "Invalid date")
        return "??"
      else
        return moment.tz(item.time, item.tz).format('MMM DD')
    else
      if (moment.tz(week.date, week.tz).add(lesson, 'days').format('MMM DD') == "Invalid date")
        return "??"
      else
        return moment.tz(week.date, week.tz).add(lesson, 'days').format('MMM DD')
  }
  getDay(week, item, lesson) {
    if (item.time && item.tz)
      if (moment.tz(item.time, item.tz).format('H:mm') == "Invalid date")
        return "??"
      else
        return moment.tz(item.time, item.tz).format('H:mm') + " " +
          moment.tz.zone(item.tz).abbr(+moment(item.time).format('x'))
    else
      if (moment.tz(week.date, week.tz).add(lesson, 'days').format('H:mm') == "Invalid date")
        return "??"
      else
        return moment.tz(week.date, week.tz).add(lesson, 'days').format('H:mm') + " " +
          moment.tz.zone(week.tz).abbr(+moment(week.date).format('x'))

  }
  renderWeekDetails(state, actions, week): React.ReactNode {
    //console.log(this.state.activeLesson)
    return (
      state.activeLesson == null ?
        week ?
          <Container style={this.styles.style.courseDetailLeftContainer}>
            <Container style={this.styles.style.courseDetailCoureInfoContainer}>
              <EditableText onChange={(e) => { actions.updateWeek(state.activeWeek, "title", e) }}
                placeholder="Week Title" multiline={false}
                data-testid="course-weekTitle"
                textStyle={this.styles.style.fontFormSmallDarkGreyCourseTopEditable}
                inputStyle={{ borderWidth: 1, borderColor: "#dddddd", marginTop: 30, marginBottom: 30, width: "90%", paddingTop: 10, paddingRight: 10, paddingBottom: 10, paddingLeft: 10, fontFamily: 'Graphik-Regular-App', fontSize: 16, lineHeight: 28 }}
                value={week.title} isEditable={state.isEditable && state.editMode}></EditableText>

              <EditableDate type="date"
                onChange={(time: any, timeZone: any) => { actions.updateWeek(state.activeWeek, "date", time); actions.updateWeek(state.activeWeek, "tz", timeZone) }}
                placeholder="Enter Week Start Date"
                textStyle={this.styles.style.fontRegular}
                inputStyle={this.styles.style.groupNameInput}
                value={week.date}
                tz={week.tz ? week.tz : moment.tz.guess()}
                isEditable={state.isEditable && state.editMode}></EditableDate>


              <EditableText onChange={(e) => { actions.updateWeek(state.activeWeek, "leader", e) }}
                placeholder="Lesson Leader" multiline={false}
                data-testid="course-lessonTitle"
                textStyle={this.styles.style.fontFormSmallDarkGrey}
                inputStyle={{ borderWidth: 1, borderColor: "#dddddd", marginTop: 30, marginBottom: 30, width: "90%", paddingTop: 10, paddingRight: 10, paddingBottom: 10, paddingLeft: 10, fontFamily: 'Graphik-Regular-App', fontSize: 16, lineHeight: 28 }}
                value={week.leader} isEditable={state.isEditable && state.editMode}></EditableText>
            </Container>
            <Container>
              {week.lessons?.items?.map((item: any, lesson: number) => {
                return (
                  <TouchableOpacity key={lesson} onPress={() => { !state.editMode ? actions.setActiveLesson(lesson) : null }}>
                    <Card style={state.isEditable && state.editMode ?
                      this.styles.style.courseDetailLessonCardEdit : this.styles.style.courseDetailLessonCardNoEdit}>
                      <Container style={this.styles.style.courseDetailActivityCard}>
                        <Container style={this.styles.style.courseDetailActivityInnerCard}>
                          <Text style={{ fontSize: 20, lineHeight: 25, fontFamily: 'Graphik-Regular-App', marginRight: 0, alignSelf: 'flex-start' }}>{this.getMonth(week, item, lesson)}</Text>
                          <Text style={{ fontSize: 20, lineHeight: 25, fontFamily: 'Graphik-Regular-App', marginRight: 0, alignSelf: 'flex-start' }}>{this.getDay(week, item, lesson)}</Text>
                        </Container>
                        <Container style={this.styles.style.courseDetailActivityInnerCardCenter}>

                          <EditableText onChange={(e) => { actions.updateLesson(state.activeWeek, lesson, "name", e) }}
                            placeholder="Title" multiline={true}
                            data-testid="course-lessonTitle"
                            textStyle={this.styles.style.courseDetailHeading}
                            inputStyle={{ borderWidth: 1, borderColor: "#dddddd", marginTop: 0, marginBottom: 10, width: "100%", paddingTop: 5, paddingRight: 5, paddingBottom: 5, paddingLeft: 5, fontFamily: 'Graphik-Regular-App', fontSize: 16, lineHeight: 21, height: 30 }}
                            value={item.name} isEditable={state.isEditable && state.editMode}></EditableText>

                          <Container style={this.styles.style.courseActivityDetails}>
                            <Text style={{ marginRight: 30, paddingTop: 4 }}>
                              {state.isEditable ?
                                null
                                : <Image style={{ width: "22px", height: "22px", alignSelf: 'center', top: 5 }} source={require('../../assets/svg/time.svg')} />
                              }
                              <EditableText onChange={(e) => { actions.updateLesson(state.activeWeek, lesson, "duration", e) }}
                                placeholder="Duration" multiline={false}
                                data-testid="course-lessonDuration"
                                textStyle={this.styles.style.fontFormSmallDarkGrey}
                                inputStyle={{ borderWidth: 1, borderColor: "#dddddd", marginTop: 5, marginBottom: 5, width: "100%", paddingTop: 5, paddingRight: 5, paddingBottom: 5, paddingLeft: 5, fontFamily: 'Graphik-Regular-App', fontSize: 16, lineHeight: 21, height: 30 }}
                                value={item.duration} isEditable={state.isEditable && state.editMode}></EditableText>
                            </Text>

                            {state.isEditable && state.editMode ?
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
                                'assignment': (<Text style={{ alignSelf: 'flex-start' }}>
                                  <Image style={{ width: "22px", height: "22px", alignSelf: 'center', top: 5 }}
                                    source={require('../../assets/svg/document.svg')} />Assignment</Text>),
                                'respond': (<Text style={{ alignSelf: 'center' }}>
                                  <Image style={{ width: "22px", height: "22px", alignSelf: 'center', top: 5 }}
                                    source={require('../../assets/svg/document.svg')} />Respond</Text>),
                                'zoom': (<Text style={{ alignSelf: 'flex-start' }}>
                                  <Image style={{ width: "22px", height: "22px", alignSelf: 'center', top: 5 }}
                                    source={require('../../assets/svg/document.svg')} />Zoom</Text>)
                              }[item.lessonType] || (<Text style={{ alignSelf: 'center' }}>
                                <Image style={{ width: "22px", height: "22px", alignSelf: 'center', top: 5 }}
                                  source={require('../../assets/svg/document.svg')} />Zoom</Text>)
                            }
                          </Container>
                          {{
                            'assignment': (this.renderAssignmentConfig(state, actions, lesson, item)),
                            'respond': (this.renderResponseConfig(state, actions, lesson, item)),
                            'zoom': (this.renderZoomConfig(state, actions, lesson, item))
                          }[item.lessonType] || (this.renderZoomConfig(state, actions, lesson, item))
                          }


                        </Container>
                        {item.lessonType == "zoom" && moment.tz(item.time, item.tz) < moment() ?
                          < Text style={{ alignSelf: 'center' }}>
                            <Image style={this.styles.style.courseCheckmark} source={require('../../assets/svg/checkmark.svg')} />
                          </Text> : null
                        }
                        {state.isEditable && state.editMode ?
                          <TouchableOpacity style={{ alignSelf: 'center', marginLeft: 15 }} onPress={() => { actions.deleteLesson(state.activeWeek, lesson) }}>
                            <AntDesign name="close" size={20} color="black" />
                          </TouchableOpacity>
                          : null
                        }
                      </Container>
                    </Card>
                  </TouchableOpacity>
                )
              })}

              {state.isEditable && state.editMode ?
                <TouchableOpacity onPress={() => { actions.createLesson() }}>
                  <Card style={this.styles.style.courseDetailLessonCardCreate}>
                    <Container style={{ flexDirection: "row" }}>
                      <Text style={{ fontSize: 16, lineHeight: 21, fontFamily: 'Graphik-Regular-App', alignSelf: 'center' }}></Text>
                      <Container style={{ flexDirection: "column", minHeight: "30px", maxHeight: "30px" }}>
                        <Text style={{ fontSize: 16, lineHeight: 21, fontFamily: 'Graphik-Bold-App', alignSelf: 'center', color: '#333333' }}>Create New Lesson</Text>

                      </Container>

                    </Container>
                  </Card>
                </TouchableOpacity> :
                null
              }
            </Container>
          </Container >
          : <Container style={{ flex: 70, flexDirection: "column", alignContent: 'flex-start', alignItems: 'flex-start', justifyContent: 'flex-start' }}><Text>Please create your first week</Text></Container>
        : null
    )
  }
  navigate(id) {
    window.location.href = id
  }
  renderZoom(state, actions, week, lesson) {
    return (
      <Container style={{ flex: 70, flexDirection: "column", alignContent: 'flex-start', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
        <JCButton buttonType={ButtonTypes.CourseHomeSidebarTop} onPress={() => { actions.setActiveWeek(state.activeWeek) }}>Return</JCButton>
        <Text style={{ fontSize: 16, lineHeight: 21, fontFamily: 'Graphik-Bold-App', color: '#333333' }}>{week.name}</Text>
        <Text style={{ fontSize: 16, lineHeight: 21, fontFamily: 'Graphik-Bold-App', color: '#333333' }}>{lesson.date}</Text>
        <Text style={this.styles.style.courseDetailLessonText}>Lesson {state.activeLesson + 1} - {lesson.name}</Text>
        <Text style={{ fontSize: 16, lineHeight: 21, fontFamily: 'Graphik-Bold-App', color: '#333333' }}>{lesson.time}</Text>
        {lesson.zoomURL && lesson.zoomURL != "" ? <JCButton buttonType={ButtonTypes.Outline} onPress={() => { this.navigate(lesson.zoomURL) }}>Join Zoom Meeting</JCButton> : null}
        {lesson.zoomRecording && lesson.zoomRecording != "" ? <JCButton buttonType={ButtonTypes.Outline} onPress={() => { this.navigate(lesson.zoomRecording) }}>Watch Zoom Recording</JCButton> : null}
        <EditableRichText onChange={(val) => { actions.updateLesson(state.activeWeek, state.activeLesson, "description", val) }}
          value={lesson.description}
          isEditable={true}
          textStyle={{ marginLeft: 10 }} inputStyle={{ margintop: 20, marginLeft: 20 }}></EditableRichText>
      </Container>)
  }
  renderRespond(state, actions, week, lesson) {
    console.log({ courseLessonResponseId: lesson.courseLessonResponseId })
    return (
      <Container style={{ flex: 70, flexDirection: "column", alignContent: 'flex-start', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
        <JCButton buttonType={ButtonTypes.Outline} onPress={() => { actions.setActiveWeek(state.activeWeek) }}>Return</JCButton>
        <Text style={{ fontSize: 16, lineHeight: 21, fontFamily: 'Graphik-Bold-App', color: '#333333' }}>{week.name}</Text>
        <Text style={{ fontSize: 16, lineHeight: 21, fontFamily: 'Graphik-Bold-App', color: '#333333' }}>{lesson.date}</Text>
        <Text style={{ fontSize: 16, lineHeight: 21, fontFamily: 'Graphik-Bold-App', color: '#333333', marginBottom: 20 }}>Lesson {state.activeLesson + 1} - {lesson.name}</Text>
        <Text style={{ fontSize: 16, lineHeight: 21, fontFamily: 'Graphik-Bold-App', color: '#333333' }}>{lesson.time}</Text>
        <EditableRichText onChange={(val) => { actions.updateLesson(state.activeWeek, state.activeLesson, "description", val) }}
          value={lesson.description}
          isEditable={true}
          textStyle=""></EditableRichText>
        <EditableCourseAssignment actions={actions} assignmentId={actions.getLessonById(lesson.courseLessonResponseId)} wordCount={lesson.wordCount}

        ></EditableCourseAssignment>
      </Container>)
  }
  renderAssignment(state, actions, week, lesson) {
    return (
      <Container style={{ flex: 70, flexDirection: "column", alignContent: 'flex-start', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
        <JCButton buttonType={ButtonTypes.Outline} onPress={() => { actions.setActiveWeek(state.activeWeek) }}>Return</JCButton>
        <Text style={{ fontSize: 16, lineHeight: 21, fontFamily: 'Graphik-Bold-App', color: '#333333' }}>{week.name}</Text>
        <Text style={{ fontSize: 16, lineHeight: 21, fontFamily: 'Graphik-Bold-App', color: '#333333' }}>{lesson.date}</Text>
        <Text style={{ fontSize: 16, lineHeight: 21, fontFamily: 'Graphik-Bold-App', color: '#333333', marginBottom: 20 }}>Lesson {state.activeLesson + 1} - {lesson.name}</Text>
        <Text style={{ fontSize: 16, lineHeight: 21, fontFamily: 'Graphik-Bold-App', color: '#333333' }}>{lesson.time}</Text>
        <EditableRichText onChange={(val) => { actions.updateLesson(state.activeWeek, state.activeLesson, "description", val) }}
          value={lesson.description}
          isEditable={true}
          textStyle=""></EditableRichText>
        <EditableCourseAssignment actions={actions} assignmentId={lesson.id} wordCount={lesson.wordCount}></EditableCourseAssignment>
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
          const lesson = week?.lessons.items[state.activeLesson]
          console.log({ lesson: lesson })
          return (
            state.data && state.currentScreen == "Details" ?
              <StyleProvider style={getTheme()}>

                <Container style={{ flex: 85 }}>
                  <CourseHeader groupData={state.data}></CourseHeader>
                  <CourseDetailMenu></CourseDetailMenu>
                  <Container style={{ flex: 80 }}>
                    <Content style={{ flex: 85 }}>
                      <Container style={this.styles.style.courseDetailMainContainer}>

                        {this.renderWeekDetails(state, actions, week)}
                        {this.renderLessonDetails(state, actions, week)}
                        {!(lesson?.lessonType == "respond" || lesson?.lessonType == "assignment") ?
                          <Container style={this.styles.style.courseDetailRightContainer}>
                            <Container style={this.styles.style.courseDetailButtonTrio}>
                              <JCButton buttonType={state.activeMessageBoard == "cohort" ? ButtonTypes.TransparentActivityCourse : ButtonTypes.courseActivityTransparentRegularBlack} onPress={() => { actions.setActiveMessageBoard("cohort") }}>Cohort</JCButton>
                              <JCButton buttonType={state.activeMessageBoard == "triad" ? ButtonTypes.TransparentActivityCourse : ButtonTypes.courseActivityTransparentRegularBlack} onPress={() => { actions.setActiveMessageBoard("triad") }}>Learning Group</JCButton>
                              <JCButton buttonType={state.activeMessageBoard == "instructor" ? ButtonTypes.TransparentActivityCourse : ButtonTypes.courseActivityTransparentRegularBlack} onPress={() => { actions.setActiveMessageBoard("instructor") }}>Facilitator</JCButton>
                            </Container>
                            <Container style={this.styles.style.courseDetailMessageBoardContainer}>
                              <MessageBoard style="mini" groupId={state.data.id}></MessageBoard>
                            </Container>
                          </Container> : null
                        }
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
