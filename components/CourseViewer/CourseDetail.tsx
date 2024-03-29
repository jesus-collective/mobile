﻿import { AntDesign } from "@expo/vector-icons"
import { Tooltip } from "@mui/material"
import { Picker } from "@react-native-picker/picker"
import { NavigationProp, useNavigation, useRoute } from "@react-navigation/native"
import moment from "moment-timezone"
import React from "react"
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { UserContext } from "../../screens/HomeScreen/UserContext"
import EditableCourseAssignment2 from "../Forms/EditableCourseAssignment2"
import EditableDate from "../Forms/EditableDate"
import EditableRichText from "../Forms/EditableRichText"
import EditableText from "../Forms/EditableText"
import EditableUrl from "../Forms/EditableUrl"
import JCButton, { ButtonTypes } from "../Forms/JCButton"
import JCComponent, { JCState } from "../JCComponent/JCComponent"
import {
  CourseActions,
  CourseContext,
  CourseLesson,
  CourseState,
  CourseWeek,
  CourseWeekObj,
} from "./CourseContext"
import CourseDetailMenu from "./CourseDetailMenu"

interface Props {
  navigation?: NavigationProp<any, any>
  route?: any
}

class CourseDetailImpl extends JCComponent<Props, JCState> {
  constructor(props: Props) {
    super(props)
    this.state = {
      ...super.getInitialState(),
    }
  }
  static Consumer = CourseContext.Consumer
  static UserConsumer = UserContext.Consumer

  renderAssignmentConfig(
    state: CourseState,
    actions: CourseActions,
    lesson: number,
    item: CourseLesson
  ): React.ReactNode {
    return (
      <View
        style={
          state.isEditable && state.editMode
            ? { flexDirection: "column", marginTop: 10, height: "unset" }
            : { flexDirection: "column", height: "unset" }
        }
      >
        {state.isEditable && state.editMode ? (
          <EditableDate
            testID={"course-lessonConfig-zoomDate-" + lesson}
            type="datetime"
            onChange={(time, timeZone) => {
              actions.updateLesson(state.activeWeek, item?.id as string, "time", time)
              actions.updateLesson(state.activeWeek, item?.id as string, "tz", timeZone)
            }}
            placeholder="Enter Zoom Date/Time"
            textStyle={this.styles.style.fontRegular}
            inputStyle={this.styles.style.groupNameInput}
            value={item?.time as string}
            tz={item?.tz ? item.tz : moment.tz.guess()}
            isEditable={state.isEditable && state.editMode}
          ></EditableDate>
        ) : null}
        {state.isEditable && state.editMode ? (
          <EditableText
            onChange={(e) => {
              actions.updateLesson(state.activeWeek, item?.id as string, "wordCount", e)
            }}
            placeholder="Word Count"
            multiline={false}
            testID={"course-lessonConfig-wordCount-" + lesson}
            textStyle={this.styles.style.fontFormSmallDarkGreyCourseTopEditable}
            inputStyle={{
              borderWidth: 1,
              borderColor: "#dddddd",
              marginTop: 30,
              marginBottom: 0,
              width: "23%",
              paddingTop: 10,
              paddingRight: 10,
              paddingBottom: 10,
              paddingLeft: 10,
              fontFamily: "Graphik-Regular-App",
              fontSize: 16,
              lineHeight: 28,
              height: 30,
            }}
            value={item?.wordCount ?? ""}
            isEditable={state.isEditable && state.editMode}
          ></EditableText>
        ) : null}
      </View>
    )
  }
  renderResponseConfig(
    state: CourseState,
    actions: CourseActions,
    lesson: number,
    item: CourseLesson
  ): React.ReactNode {
    return (
      <View
        style={
          state.isEditable && state.editMode
            ? { flexDirection: "column", marginTop: 10, height: "unset" }
            : { flexDirection: "column", height: "unset" }
        }
      >
        {state.isEditable && state.editMode ? (
          <EditableDate
            type="datetime"
            testID={"course-lessonConfig-zoomDate-" + lesson}
            onChange={(time, timeZone) => {
              actions.updateLesson(state.activeWeek, item?.id as string, "time", time)
              actions.updateLesson(state.activeWeek, item?.id as string, "tz", timeZone)
            }}
            placeholder="Enter Response Date/Time"
            textStyle={this.styles.style.fontRegular}
            inputStyle={this.styles.style.groupNameInput}
            value={item?.time as string}
            tz={item?.tz ? item.tz : moment.tz.guess()}
            isEditable={state.isEditable && state.editMode}
          ></EditableDate>
        ) : null}
        {state.isEditable && state.editMode ? (
          <>
            <Picker
              testID={"course-lessonConfig-response-" + lesson}
              onStartShouldSetResponder={() => true}
              onMoveShouldSetResponderCapture={() => true}
              onStartShouldSetResponderCapture={() => true}
              onMoveShouldSetResponder={() => true}
              mode="dropdown"
              //    iosIcon={<Icon name="arrow-down" />}
              style={{
                width: "50%",
                marginBottom: 0,
                marginTop: 0,
                fontSize: 16,
                height: 30,
                flexGrow: 0,
                marginRight: 0,
                borderColor: "#dddddd",
              }}
              // placeholder="Event type"
              // placeholderStyle={{ color: "#bfc6ea" }}
              // placeholderIconColor="#007aff"
              selectedValue={item?.courseLessonResponseId ?? undefined}
              onValueChange={(value) => {
                actions.updateLesson(
                  state.activeWeek,
                  item?.id as string,
                  "courseLessonResponseId",
                  value
                )
              }}
            >
              <Picker.Item label="Pick an assignment to Review" />
              {actions.getAssignmentList()?.map((item) => {
                if (item)
                  return <Picker.Item key={item.id} label={item.name ?? ""} value={item.id} />
              })}
            </Picker>
            <EditableText
              onChange={(e) => {
                actions.updateLesson(state.activeWeek, item?.id as string, "wordCount", e)
              }}
              placeholder="Word Count"
              multiline={false}
              testID={"course-lessonConfig-wordCount-" + lesson}
              textStyle={this.styles.style.fontFormSmallDarkGreyCourseTopEditable}
              inputStyle={{
                borderWidth: 1,
                borderColor: "#dddddd",
                marginTop: 30,
                marginBottom: 0,
                width: "25%",
                paddingTop: 10,
                paddingRight: 10,
                paddingBottom: 10,
                paddingLeft: 10,
                fontFamily: "Graphik-Regular-App",
                fontSize: 16,
                lineHeight: 28,
                height: 30,
              }}
              value={item?.wordCount ?? ""}
              isEditable={state.isEditable && state.editMode}
            ></EditableText>
          </>
        ) : null}
      </View>
    )
  }
  renderZoomConfig(
    state: CourseState,
    actions: CourseActions,
    lesson: number,
    item: CourseLesson
  ): React.ReactNode {
    return (
      <View
        style={
          state.isEditable && state.editMode
            ? this.styles.style.courseActivityButtonEditable
            : this.styles.style.courseActivityButtonNonEditable
        }
      >
        <EditableUrl
          title="Open in Zoom"
          onChange={(e) => {
            actions.updateLesson(state.activeWeek, item?.id as string, "zoomUrl", e)
          }}
          testID={"course-lessonConfig-zoomUrl-" + lesson}
          placeholder="Enter Event URL"
          multiline={false}
          textStyle={ButtonTypes.courseCardSolid}
          inputStyle={this.styles.style.courseEditableURL}
          value={item?.zoomUrl ?? ""}
          isEditable={state.isEditable && state.editMode}
        />
        <EditableUrl
          title="Zoom Recording"
          onChange={(e) => {
            actions.updateLesson(state.activeWeek, item?.id as string, "zoomRecording", e)
          }}
          testID={"course-lessonConfig-zoomRecordingUrl-" + lesson}
          placeholder="Enter Recording URL"
          multiline={false}
          textStyle={ButtonTypes.courseCardSolid}
          inputStyle={this.styles.style.courseEditableURL}
          value={item?.zoomRecording ?? ""}
          isEditable={state.isEditable && state.editMode}
        />
        {state.isEditable && state.editMode ? (
          <EditableDate
            type="datetime"
            testID={"course-lessonConfig-zoomDate-" + lesson}
            onChange={(time, timeZone) => {
              actions.updateLesson(state.activeWeek, item?.id as string, "time", time)
              actions.updateLesson(state.activeWeek, item?.id as string, "tz", timeZone)
            }}
            placeholder="Enter Zoom Date/Time"
            textStyle={this.styles.style.fontRegular}
            inputStyle={this.styles.style.groupNameInput}
            value={item?.time as string}
            tz={item?.tz || moment.tz.guess()}
            isEditable={state.isEditable && state.editMode}
          ></EditableDate>
        ) : null}
      </View>
    )
  }
  renderYoutubeConfig(
    state: CourseState,
    actions: CourseActions,
    lesson: number,
    item: CourseLesson
  ): React.ReactNode {
    return (
      <View
        style={
          state.isEditable && state.editMode
            ? this.styles.style.courseActivityButtonEditable
            : this.styles.style.courseActivityButtonNonEditable
        }
      >
        {state.isEditable && state.editMode ? (
          <EditableUrl
            title="Open in Youtube"
            onChange={(e) => {
              actions.updateLesson(state.activeWeek, item?.id as string, "zoomRecording", e)
            }}
            placeholder="Enter youtube ID"
            multiline={false}
            textStyle={ButtonTypes.courseCardSolid}
            inputStyle={this.styles.style.courseEditableURL}
            value={item?.zoomRecording ?? ""}
            isEditable={state.isEditable && state.editMode}
          />
        ) : null}

        {state.isEditable && state.editMode ? (
          <EditableDate
            type="datetime"
            testID={"course-lessonConfig-zoomDate-" + lesson}
            onChange={(time, timeZone) => {
              actions.updateLesson(state.activeWeek, item?.id as string, "time", time)
              actions.updateLesson(state.activeWeek, item?.id as string, "tz", timeZone)
            }}
            placeholder="Enter Zoom Date/Time"
            textStyle={this.styles.style.fontRegular}
            inputStyle={this.styles.style.groupNameInput}
            value={item?.time as string}
            tz={item?.tz || moment.tz.guess()}
            isEditable={state.isEditable && state.editMode}
          ></EditableDate>
        ) : null}
      </View>
    )
  }
  getMonth(week: CourseWeekObj, item: CourseLesson, lesson: number) {
    if (item?.time && item?.tz) {
      if (moment.tz(item.time, item.tz).format("MMM DD") == "Invalid date") {
        return ""
      }
      return moment.tz(item.time, item.tz).format("MMM DD")
    } else if (
      moment
        .tz(week?.date, week?.tz as string)
        .add(lesson, "days")
        .format("MMM DD") == "Invalid date"
    ) {
      return ""
    }

    return moment
      .tz(week?.date, week?.tz as string)
      .add(lesson, "days")
      .format("MMM DD")
  }
  getDay(week: CourseWeekObj, item: CourseLesson, lesson: number) {
    if (item?.time && item?.tz) {
      if (moment.tz(item.time, item.tz).format("H:mm") == "Invalid date") {
        return ""
      }

      return (
        moment.tz(item.time, item.tz).format("H:mm") +
        " " +
        moment.tz.zone(item.tz)?.abbr(+moment(item.time).format("x"))
      )
    } else if (
      moment
        .tz(week?.date, week?.tz as string)
        .add(lesson, "days")
        .format("H:mm") == "Invalid date"
    ) {
      return ""
    }

    return (
      moment
        .tz(week?.date, week?.tz as string)
        .add(lesson, "days")
        .format("H:mm") +
      " " +
      moment.tz.zone(week?.tz as string)?.abbr(+moment(week?.date).format("x"))
    )
  }

  renderLessonIcon(item: CourseLesson) {
    switch (item?.lessonType) {
      case "assignment":
        return (
          <Text style={{ alignSelf: "flex-start", marginTop: 3 }}>
            <Image
              style={{
                width: "22px",
                height: "22px",
                alignSelf: "center",
                top: 5,
              }}
              source={require("../../assets/svg/document.svg")}
            />
            Assignment
          </Text>
        )
      case "respond":
        return (
          <Text style={{ alignSelf: "center" }}>
            <Image
              style={{
                width: "22px",
                height: "22px",
                alignSelf: "center",
                top: 5,
              }}
              source={require("../../assets/svg/document.svg")}
            />
            Respond
          </Text>
        )
      case "youtube":
        return (
          <Text style={{ alignSelf: "flex-start", marginTop: 3 }}>
            <Image
              style={{
                width: "22px",
                height: "22px",
                alignSelf: "center",
                top: 5,
              }}
              source={require("../../assets/svg/document.svg")}
            />
            Youtube
          </Text>
        )
      default:
        // zoom
        return (
          <Text style={{ alignSelf: "flex-start", marginTop: 3 }}>
            <Image
              style={{
                width: "22px",
                height: "22px",
                alignSelf: "center",
                top: 5,
              }}
              source={require("../../assets/svg/document.svg")}
            />
            Zoom
          </Text>
        )
    }
  }

  renderConfig(state: CourseState, actions: CourseActions, lesson: number, item: CourseLesson) {
    switch (item?.lessonType) {
      case "assignment":
        return this.renderAssignmentConfig(state, actions, lesson, item)
      case "respond":
        return this.renderResponseConfig(state, actions, lesson, item)
      case "youtube":
        return this.renderYoutubeConfig(state, actions, lesson, item)
      default:
        // zoom
        return this.renderZoomConfig(state, actions, lesson, item)
    }
  }

  renderWeekDetails(
    state: CourseState,
    actions: CourseActions,
    week: CourseWeekObj
  ): React.ReactNode {
    return state.activeLesson === "" ? (
      week ? (
        <View style={this.styles.style.courseDetailLeftContainer}>
          <View style={this.styles.style.courseDetailCourseInfoContainer}>
            {state.isEditable && state.editMode ? (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  maxHeight: 85,
                }}
              >
                <JCButton
                  buttonType={ButtonTypes.CourseHomeSidebarTop}
                  onPress={() => {
                    actions.syncLessonNumbers()
                  }}
                >
                  Sync Lesson Numbers
                </JCButton>
                <Tooltip
                  title={`Synchronize order of lesson numbers with date/time of lessons. 
                  It is recommended to use this function after adding/removing lesson(s).`}
                  placement="right"
                >
                  <AntDesign
                    name="questioncircle"
                    size={20}
                    color="black"
                    style={{ marginLeft: 10 }}
                  />
                </Tooltip>
              </View>
            ) : null}
            <EditableText
              onChange={(e) => {
                actions.updateWeek(state.activeWeek, "title", e)
              }}
              placeholder="Week Title"
              multiline={false}
              testID="course-weekTitle"
              textStyle={this.styles.style.fontFormSmallDarkGreyCourseTopEditable}
              inputStyle={{
                borderWidth: 1,
                borderColor: "#dddddd",
                marginTop: 30,
                marginBottom: 15,
                width: "90%",
                paddingTop: 10,
                paddingRight: 10,
                paddingBottom: 10,
                paddingLeft: 10,
                fontFamily: "Graphik-Regular-App",
                fontSize: 40,
                lineHeight: 55,
              }}
              value={week.title ?? ""}
              isEditable={state.isEditable && state.editMode}
            />
            <EditableRichText
              testID="course-leader"
              onChange={(val: string) => {
                actions.updateWeek(state.activeWeek, "leader", val)
              }}
              value={week.leader ?? null}
              isEditable={state.isEditable && state.editMode}
            ></EditableRichText>
          </View>
          <View style={this.styles.style.courseLessonContainer}>
            {Object.values(week.lessons)
              .filter(
                (item) =>
                  !state.dateFilter ||
                  moment.tz(item?.time, item?.tz ?? moment.tz.guess()).format("YYYY-MM-DD") ===
                    state.dateFilter
              )
              .map((item, lesson: number) => {
                if (item) {
                  return (
                    <TouchableOpacity
                      key={lesson}
                      testID={"course-lessonButton-" + lesson}
                      onPress={() => {
                        !state.editMode ? actions.setActiveLesson(item?.id) : null
                      }}
                    >
                      <View
                        style={
                          state.isEditable && state.editMode
                            ? this.styles.style.courseDetailLessonCardEdit
                            : this.styles.style.courseDetailLessonCardNoEdit
                        }
                      >
                        <View style={this.styles.style.courseDetailActivityCard}>
                          <View style={this.styles.style.courseDetailActivityInnerCard}>
                            <Text
                              style={{
                                fontSize: 20,
                                lineHeight: 25,
                                fontFamily: "Graphik-Regular-App",
                                marginRight: 0,
                                alignSelf: "flex-start",
                              }}
                            >
                              {this.getMonth(week, item, lesson)}
                            </Text>
                            <Text
                              style={{
                                fontSize: 20,
                                lineHeight: 25,
                                fontFamily: "Graphik-Regular-App",
                                marginRight: 0,
                                alignSelf: "flex-start",
                              }}
                            >
                              {this.getDay(week, item, lesson)}
                            </Text>
                          </View>
                          <View style={this.styles.style.courseDetailActivityInnerCardCenter}>
                            <EditableText
                              onChange={(e) => {
                                actions.updateLesson(state.activeWeek, item.id, "name", e)
                              }}
                              placeholder="Title"
                              multiline={true}
                              testID={"course-lessonTitle-" + lesson}
                              textStyle={this.styles.style.courseDetailHeading}
                              inputStyle={{
                                borderWidth: 1,
                                borderColor: "#dddddd",
                                marginTop: 0,
                                marginBottom: 10,
                                width: "100%",
                                paddingTop: 5,
                                paddingRight: 5,
                                paddingBottom: 5,
                                paddingLeft: 5,
                                fontFamily: "Graphik-Regular-App",
                                fontSize: 16,
                                lineHeight: 21,
                                height: 30,
                              }}
                              value={item?.name ?? ""}
                              isEditable={state.isEditable && state.editMode}
                            ></EditableText>

                            <View style={this.styles.style.courseActivityDetails}>
                              <Text
                                style={
                                  state.isEditable && state.editMode
                                    ? { marginRight: 10, paddingTop: 0 }
                                    : { marginRight: 0, paddingTop: 4 }
                                }
                              >
                                {state.isEditable && state.editMode ? null : (
                                  <Image
                                    style={{
                                      width: "22px",
                                      height: "22px",
                                      alignSelf: "center",
                                      top: 4,
                                      marginRight: 3,
                                    }}
                                    source={require("../../assets/svg/time.svg")}
                                  />
                                )}
                                <EditableText
                                  onChange={(e) => {
                                    actions.updateLesson(state.activeWeek, item.id, "duration", e)
                                  }}
                                  placeholder="Duration"
                                  multiline={false}
                                  testID={"course-lessonDuration-" + lesson}
                                  textStyle={this.styles.style.courseTimeNonEditable}
                                  inputStyle={
                                    state.isEditable && state.editMode
                                      ? {
                                          borderWidth: 1,
                                          borderColor: "#dddddd",
                                          marginTop: 0,
                                          marginBottom: 0,
                                          width: "100%",
                                          paddingTop: 5,
                                          paddingRight: 5,
                                          paddingBottom: 5,
                                          paddingLeft: 5,
                                          fontFamily: "Graphik-Regular-App",
                                          fontSize: 16,
                                          lineHeight: 21,
                                          height: 30,
                                        }
                                      : {
                                          borderWidth: 1,
                                          borderColor: "#dddddd",
                                          marginTop: 5,
                                          marginBottom: 5,
                                          width: "100%",
                                          paddingTop: 5,
                                          paddingRight: 5,
                                          paddingBottom: 5,
                                          paddingLeft: 5,
                                          fontFamily: "Graphik-Regular-App",
                                          fontSize: 16,
                                          lineHeight: 21,
                                          height: 30,
                                        }
                                  }
                                  value={item?.duration ?? ""}
                                  isEditable={state.isEditable && state.editMode}
                                ></EditableText>
                              </Text>

                              {state.isEditable && state.editMode ? (
                                <Picker
                                  testID={"course-eventType-" + lesson}
                                  onStartShouldSetResponder={() => true}
                                  onMoveShouldSetResponderCapture={() => true}
                                  onStartShouldSetResponderCapture={() => true}
                                  onMoveShouldSetResponder={() => true}
                                  mode="dropdown"
                                  //  iosIcon={<Icon name="arrow-down" />}
                                  style={{
                                    width: "30%",
                                    marginBottom: 0,
                                    marginTop: 0,
                                    fontSize: 16,
                                    height: 30,
                                    flexGrow: 0,
                                    marginRight: 0,
                                    borderColor: "#dddddd",
                                  }}
                                  // placeholder="Event type"
                                  // placeholderStyle={{ color: "#bfc6ea" }}
                                  // placeholderIconColor="#007aff"
                                  selectedValue={item?.lessonType}
                                  onValueChange={(value) => {
                                    actions.updateLesson(
                                      state.activeWeek,
                                      item.id,
                                      "lessonType",
                                      value
                                    )
                                  }}
                                >
                                  <Picker.Item label="Zoom Call" value="zoom" />
                                  <Picker.Item label="Assignment" value="assignment" />
                                  <Picker.Item label="Respond" value="respond" />
                                  <Picker.Item label="Youtube" value="youtube" />
                                </Picker>
                              ) : (
                                this.renderLessonIcon(item)
                              )}
                            </View>
                            {this.renderConfig(state, actions, lesson, item)}
                          </View>
                          {item?.lessonType == "zoom" &&
                          moment.tz(item.time, item.tz as string) < moment() ? (
                            <Text style={this.styles.style.assignmentCheckmark}>
                              <Image
                                style={this.styles.style.courseCheckmark}
                                source={require("../../assets/svg/checkmark.svg")}
                              />
                            </Text>
                          ) : null}
                          {state.isEditable && state.editMode ? (
                            <TouchableOpacity
                              testID={"course-deleteLesson-" + lesson}
                              style={{ alignSelf: "center", marginLeft: 15 }}
                              onPress={() => {
                                actions.deleteLesson(state.activeWeek, item.id)
                              }}
                            >
                              <AntDesign name="close" size={20} color="black" />
                            </TouchableOpacity>
                          ) : null}
                        </View>
                      </View>
                    </TouchableOpacity>
                  )
                }
                return null
              })}

            {state.isEditable && state.editMode ? (
              <TouchableOpacity
                testID="course-createLesson"
                onPress={() => {
                  actions.createLesson()
                }}
              >
                <View style={this.styles.style.courseDetailLessonCardCreate}>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        fontSize: 16,
                        lineHeight: 21,
                        fontFamily: "Graphik-Regular-App",
                        alignSelf: "center",
                      }}
                    ></Text>
                    <View style={{ flexDirection: "column", minHeight: "30px", maxHeight: "30px" }}>
                      <Text
                        style={{
                          fontSize: 16,
                          lineHeight: 21,
                          fontFamily: "Graphik-Bold-App",
                          alignSelf: "center",
                          color: "#333333",
                        }}
                      >
                        Create New Lesson
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      ) : (
        <View
          style={{
            flex: 70,
            flexDirection: "column",
            alignContent: "flex-start",
            alignItems: "flex-start",
            justifyContent: "flex-start",
          }}
        >
          <Text>Please create your first week</Text>
        </View>
      )
    ) : null
  }
  navigate(id: string) {
    window.location.href = id
  }
  renderYoutube(
    state: CourseState,
    actions: CourseActions,
    week: CourseWeek,
    lesson: CourseLesson
  ) {
    return (
      <View style={this.styles.style.courseDetailLeftSide}>
        <JCButton
          testID={"course-returnToWeekButton"}
          buttonType={ButtonTypes.CourseHomeSidebarTop}
          onPress={() => {
            actions.setActiveWeek(state.activeWeek)
          }}
        >
          Return
        </JCButton>
        <View style={this.styles.style.courseDetailYoutube}>
          <View style={{ flex: 0.9, height: "auto" }}>
            <Text
              style={{
                fontSize: 20,
                lineHeight: 30,
                fontFamily: "Graphik-Regular-App",
                color: "#333333",
                textTransform: "uppercase",
              }}
            >
              {week?.name}
            </Text>
            <Text style={this.styles.style.courseDetailLessonText}>
              Lesson {lesson?.lesson} - {lesson?.name}
            </Text>
          </View>
          <Image
            style={this.styles.style.courseDetailCalendarImage}
            source={require("../../assets/svg/calendar.svg")}
          ></Image>
          <Text style={this.styles.style.detailsYoutubeDateText}>{lesson?.time}</Text>
        </View>
        <View style={{ width: "100%" }}>
          <View style={this.styles.style.courseDetailHr}></View>
          {lesson?.zoomRecording ? (
            <iframe
              title="Youtube"
              src={"https://www.youtube.com/embed/" + lesson.zoomRecording}
              style={{ width: "95%", height: "95%", marginBottom: 20 }}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : null}
          <EditableRichText
            testID={"course-lesson-description"}
            onChange={(val: string) => {
              actions.updateLesson(state.activeWeek, lesson?.id as string, "description", val)
            }}
            value={lesson?.description ?? null}
            isEditable={state.isEditable && state.editMode}
          ></EditableRichText>
        </View>
      </View>
    )
  }
  renderZoom(state: CourseState, actions: CourseActions, week: CourseWeek, lesson: CourseLesson) {
    return (
      <View
        style={{
          flex: 70,
          flexDirection: "column",
          alignContent: "flex-start",
          alignItems: "flex-start",
          justifyContent: "flex-start",
        }}
      >
        <JCButton
          testID={"course-returnToWeekButton"}
          buttonType={ButtonTypes.CourseHomeSidebarTop}
          onPress={() => {
            actions.setActiveWeek(state.activeWeek)
          }}
        >
          Return
        </JCButton>
        <View style={this.styles.style.courseZoomMainContainer}>
          <View style={this.styles.style.courseDetailSidebarTop}>
            <Text
              style={{
                fontSize: 20,
                lineHeight: 30,
                fontFamily: "Graphik-Regular-App",
                color: "#333333",
                textTransform: "uppercase",
              }}
            >
              {week?.name}
            </Text>
            <Text style={this.styles.style.courseDetailLessonText}>
              Lesson {lesson?.lesson} - {lesson?.name}
            </Text>
            {lesson?.zoomUrl ? (
              <JCButton
                buttonType={ButtonTypes.CourseZoom}
                onPress={() => {
                  this.navigate(lesson?.zoomUrl as string)
                }}
              >
                Join Zoom Meeting
              </JCButton>
            ) : null}
            {lesson?.zoomRecording ? (
              <JCButton
                buttonType={ButtonTypes.CourseZoom}
                onPress={() => {
                  this.navigate(lesson?.zoomRecording as string)
                }}
              >
                Watch Zoom Recording
              </JCButton>
            ) : null}
          </View>
          <View style={this.styles.style.courseDetailTime}>
            <Image
              style={this.styles.style.courseDetailCalendarImage2}
              source={require("../../assets/svg/calendar.svg")}
            ></Image>
            <Text style={this.styles.style.courseDetailCalendarText2}>
              {moment(lesson?.time).format("LLL")}
            </Text>
          </View>
        </View>
        <View>
          <View style={this.styles.style.courseDetailHR}></View>
          <EditableRichText
            testID={"course-lesson-description"}
            onChange={(val: string) => {
              actions.updateLesson(state.activeWeek, lesson?.id as string, "description", val)
            }}
            value={lesson?.description ?? null}
            isEditable={state.isEditable && state.editMode}
          ></EditableRichText>
        </View>
      </View>
    )
  }
  renderRespond(
    state: CourseState,
    actions: CourseActions,
    week: CourseWeek,
    lesson: CourseLesson
  ) {
    return (
      <View
        style={{
          flex: 70,
          flexDirection: "column",
          alignContent: "flex-start",
          alignItems: "flex-start",
          justifyContent: "flex-start",
        }}
      >
        <JCButton
          testID={"course-returnToWeekButton"}
          buttonType={ButtonTypes.CourseHomeSidebarTop}
          onPress={() => {
            actions.setActiveWeek(state.activeWeek)
          }}
        >
          Return
        </JCButton>
        <View style={this.styles.style.courseZoomMainContainer}>
          <View style={{ flex: 0.6, height: "auto" }}>
            <Text
              style={{
                fontSize: 20,
                lineHeight: 30,
                fontFamily: "Graphik-Regular-App",
                color: "#333333",
                textTransform: "uppercase",
              }}
            >
              {week?.name}
            </Text>
            <Text style={this.styles.style.courseDetailLessonText}>
              Lesson {lesson?.lesson} - {lesson?.name}
            </Text>
          </View>
          <View style={this.styles.style.courseDetailAssignmentTime2}>
            <Image
              style={this.styles.style.courseDetailCalendarImage}
              source={require("../../assets/svg/calendar.svg")}
            ></Image>
            <Text style={this.styles.style.courseDetailCalendarText}>
              {moment(lesson?.time).format("LLL")}
            </Text>
          </View>
        </View>
        <View style={{ width: "100%" }}>
          <View
            style={{
              borderBottomColor: "#333333",
              opacity: 0.2,
              borderBottomWidth: 1,
              width: "95%",
              marginBottom: 30,
              marginTop: 30,
            }}
          ></View>
          <EditableRichText
            testID={"course-lesson-description"}
            onChange={(val: string) => {
              actions.updateLesson(state.activeWeek, lesson?.id as string, "description", val)
            }}
            value={lesson?.description ?? null}
            isEditable={state.isEditable && state.editMode}
          ></EditableRichText>
          <CourseDetailImpl.UserConsumer>
            {({ userActions }) => {
              return (
                <EditableCourseAssignment2
                  actions={actions}
                  userActions={userActions}
                  assignmentId={
                    actions.getLessonById(lesson?.courseLessonResponseId ?? "")?.id ?? ""
                  }
                  wordCount={parseInt(lesson?.wordCount as string, 10)}
                />
              )
            }}
          </CourseDetailImpl.UserConsumer>
        </View>
      </View>
    )
  }
  renderAssignment(
    state: CourseState,
    actions: CourseActions,
    week: CourseWeek,
    lesson: CourseLesson
  ) {
    return (
      <View
        style={{
          flex: 70,
          flexDirection: "column",
          alignContent: "flex-start",
          alignItems: "flex-start",
          justifyContent: "flex-start",
        }}
      >
        <JCButton
          testID={"course-returnToWeekButton"}
          buttonType={ButtonTypes.courseAssignment}
          onPress={() => {
            actions.setActiveWeek(state.activeWeek)
          }}
        >
          Return
        </JCButton>
        <View style={this.styles.style.courseZoomMainContainer}>
          <View style={this.styles.style.courseDetailMainHeading}>
            <Text
              style={{
                fontSize: 20,
                lineHeight: 30,
                fontFamily: "Graphik-Regular-App",
                color: "#333333",
                textTransform: "uppercase",
              }}
            >
              {week?.name}
            </Text>
            <Text style={this.styles.style.courseDetailLessonText}>
              Lesson {lesson?.lesson} - {lesson?.name}
            </Text>
          </View>
          <View style={[this.styles.style.courseDetailAssignmentTime, { top: -20 }]}>
            <Image
              style={this.styles.style.courseDetailCalendarImage}
              source={require("../../assets/svg/calendar.svg")}
            ></Image>
            <Text style={this.styles.style.courseDetailCalendarText}>
              {moment(lesson?.time).format("LLL")}
            </Text>
          </View>
        </View>
        <View style={{ width: "100%" }}>
          <View
            style={{
              borderBottomColor: "#333333",
              opacity: 0.2,
              borderBottomWidth: 1,
              width: "95%",
              marginBottom: 30,
              marginTop: 30,
            }}
          ></View>
          <EditableRichText
            testID={"course-lesson-description"}
            onChange={(val: string) => {
              actions.updateLesson(state.activeWeek, lesson?.id as string, "description", val)
            }}
            value={lesson?.description ?? null}
            isEditable={state.isEditable && state.editMode}
          ></EditableRichText>
          <CourseDetailImpl.UserConsumer>
            {({ userActions }) => {
              return (
                <EditableCourseAssignment2
                  actions={actions}
                  userActions={userActions}
                  assignmentId={lesson?.id as string}
                  wordCount={parseInt(lesson?.wordCount as string, 10)}
                ></EditableCourseAssignment2>
              )
            }}
          </CourseDetailImpl.UserConsumer>
        </View>
      </View>
    )
  }
  renderLessonType(
    state: CourseState,
    actions: CourseActions,
    week: CourseWeek,
    lesson: CourseLesson
  ) {
    switch (lesson?.lessonType) {
      case "respond":
        return this.renderRespond(state, actions, week, lesson)
      case "assignment":
        return this.renderAssignment(state, actions, week, lesson)
      case "youtube":
        return this.renderYoutube(state, actions, week, lesson)
      default:
        return this.renderZoom(state, actions, week, lesson)
    }
  }
  renderLessonDetails(
    state: CourseState,
    actions: CourseActions,
    week: CourseWeekObj
  ): React.ReactNode {
    if (week?.lessons && state.activeLesson !== "") {
      const lesson = week.lessons[state.activeLesson]
      return this.renderLessonType(state, actions, week, lesson)
    } else {
      return null
    }
  }

  render(): React.ReactNode {
    console.log("CourseDetail")
    return (
      <CourseDetailImpl.Consumer>
        {({ state, actions }) => {
          if (!state) return null
          const week = state.courseWeeks[state.activeWeek]
          return state.data && state.currentScreen == "Details" ? (
            <View style={{ flex: 85 }}>
              {/* <CourseHeader groupData={state.data}></CourseHeader> */}
              <CourseDetailMenu />
              <View style={{ flex: 80 }}>
                <ScrollView style={{ flex: 85 }}>
                  <View style={this.styles.style.courseDetailMainContainer}>
                    {this.renderWeekDetails(state, actions, week)}
                    {this.renderLessonDetails(state, actions, week)}
                  </View>
                </ScrollView>
              </View>
            </View>
          ) : null
        }}
      </CourseDetailImpl.Consumer>
    )
  }
}

export default function CourseDetail(props: Props): JSX.Element {
  const route = useRoute()
  const navigation = useNavigation()
  return <CourseDetailImpl {...props} navigation={navigation} route={route} />
}
