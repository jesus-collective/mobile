import { AntDesign } from "@expo/vector-icons"
import { useNavigation, useRoute } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import moment from "moment"
import React from "react"
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import { Calendar } from "react-native-calendars"
import ActivityBox from "../../components/Activity/ActivityBox"
import EditableFileUpload from "../../components/Forms/EditableFileUpload"
import EditableRichText from "../../components/Forms/EditableRichText"
import EditableUsers from "../../components/Forms/EditableUsers"
import { UserContext } from "../../screens/HomeScreen/UserContext"
import { constants } from "../../src/constants"
import { UserData } from "../../src/types"
import CourseHeader from "../CourseHeader/CourseHeader"
import JCButton, { ButtonTypes } from "../Forms/JCButton"
import JCComponent from "../JCComponent/JCComponent"
import ProfileImageNew, {
  ProfileImageQuality,
  ProfileImageStyle,
} from "../ProfileImage/ProfileImageNew"
import { AgendaItems, CourseActions, CourseContext, CourseToDo } from "./CourseContext"

interface Props {
  navigation?: StackNavigationProp<any, any>
  route?: any
}

class CourseHomeImpl extends JCComponent<Props> {
  static Consumer = CourseContext.Consumer
  static UserConsumer = UserContext.Consumer
  constructor(props: Props) {
    super(props)
  }

  openConversation(initialUser: string, name: string): void {
    console.log("Navigate to conversationScreen")
    this.props.navigation?.push("ConversationScreen", {
      initialUserID: initialUser,
      initialUserName: name,
    })
  }
  showProfile(id: string): void {
    console.log("Navigate to profileScreen")
    this.props.navigation?.push("ProfileScreen", { id: id, create: false })
  }
  renderProfileCard(user: UserData): React.ReactNode {
    if (user)
      return (
        <TouchableOpacity
          key={user.id}
          onPress={() => {
            this.showProfile(user.id)
          }}
        >
          <View style={this.styles.style.courseConversationCard}>
            <View style={this.styles.style.courseHomeConversationCard}>
              <ProfileImageNew
                linkToProfile
                style={ProfileImageStyle.UserLarge}
                quality={ProfileImageQuality.medium}
                type="user"
                user={user}
              />
              <View style={this.styles.style.dashboardConversationBody}>
                <Text style={this.styles.style.courseFontConnectWithName}>
                  {user.given_name} {user.family_name}
                </Text>
                <Text style={this.styles.style.fontConnectConversation}>{user.currentRole}</Text>
                <Pressable
                  style={this.styles.style.courseHomeConversationButton}
                  onPress={() => {
                    this.openConversation(user.id, user.given_name + " " + user.family_name)
                  }}
                >
                  <Text style={this.styles.style.courseFontStartConversation}>Send a Message</Text>
                </Pressable>
                {/*<Button bordered style={this.styles.style.courseHomeConversationButton} onPress={() => { this.openConversation(user.id, user.given_name + " " + user.family_name) }}><Text style={this.styles.style.courseFontStartConversation}>Book Call</Text></Button>*/}
              </View>
            </View>
          </View>
        </TouchableOpacity>
      )
    return null
  }

  handlePressCalendar(actions: CourseActions, items: AgendaItems["foo"], date: string): void {
    // if no key error, navigate to lesson
    // else no-op
    if (items?.length) {
      if (items.length === 1) {
        // if day has one lesson, navigate directly to that lesson
        this.goToLesson(actions, items[0].week, items[0].lesson)
      } else {
        // if day has multiple lesson, navigate to week, filter by day
        actions.setActiveWeek(items[0].week)
        actions.setDateFilter(date)
        actions.setActiveScreen("Details")
      }
    }
  }

  goToLesson(actions: CourseActions, week: string, lesson: string): void {
    console.debug("navigating to lesson:", { week, lesson })
    actions.setActiveWeek(week)
    actions.setActiveLesson(lesson)
    actions.setActiveScreen("Details")
  }

  renderToDo(
    item: CourseToDo | NonNullable<AgendaItems["foo"]>[0],
    actions: CourseActions
  ): JSX.Element {
    switch (item.lessonType) {
      case "assignment":
        return (
          <TouchableOpacity
            style={{
              flexDirection: "row",
              height: "unset",
              marginTop: 10,
              marginBottom: 10,
            }}
            onPress={() => this.goToLesson(actions, item.week, item.lesson)}
          >
            <View style={{ flex: 1 }}>
              <Image
                style={{
                  width: "40px",
                  height: "40px",
                  alignSelf: "center",
                }}
                source={require("../../assets/svg/document.svg")}
              />
            </View>
            <View
              style={{
                flex: 9,
                alignItems: "flex-start",
                marginLeft: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  lineHeight: 25,
                  fontFamily: "Graphik-Bold-App",
                }}
              >
                {item.date}
              </Text>
              <Text
                style={{
                  fontSize: 11,
                  lineHeight: 17,
                  fontFamily: "Graphik-Regular-App",
                  textTransform: "uppercase",
                }}
              >
                Assignment due @ {item.time}
              </Text>
            </View>
          </TouchableOpacity>
        )

      case "respond":
        return (
          <TouchableOpacity
            style={{
              flexDirection: "row",
              height: "unset",
              marginTop: 10,
              marginBottom: 10,
            }}
            onPress={() => this.goToLesson(actions, item.week, item.lesson)}
          >
            <View style={{ flex: 1 }}>
              <Image
                style={{
                  width: "40px",
                  height: "40px",
                  alignSelf: "center",
                }}
                source={require("../../assets/svg/document.svg")}
              />
            </View>
            <View
              style={{
                flex: 9,
                alignItems: "flex-start",
                marginLeft: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  lineHeight: 25,
                  fontFamily: "Graphik-Bold-App",
                }}
              >
                {item.date}
              </Text>
              <Text
                style={{
                  fontSize: 11,
                  lineHeight: 17,
                  fontFamily: "Graphik-Regular-App",
                  textTransform: "uppercase",
                }}
              >
                Responses due @ {item.time}
              </Text>
            </View>
          </TouchableOpacity>
        )

      default:
        // zoom
        return (
          <TouchableOpacity
            style={{
              flexDirection: "row",
              height: "unset",
              marginTop: 10,
              marginBottom: 10,
            }}
            onPress={() => this.goToLesson(actions, item.week, item.lesson)}
          >
            <View style={{ flex: 1 }}>
              <Image
                style={{
                  width: "40px",
                  height: "40px",
                  alignSelf: "center",
                }}
                source={require("../../assets/svg/document.svg")}
              />
            </View>
            <View
              style={{
                flex: 9,
                alignItems: "flex-start",
                marginLeft: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  lineHeight: 25,
                  fontFamily: "Graphik-Bold-App",
                }}
              >
                {item.date}
              </Text>
              <Text
                style={{
                  fontSize: 11,
                  lineHeight: 17,
                  fontFamily: "Graphik-Regular-App",
                  textTransform: "uppercase",
                }}
              >
                Zoom call @ {item.time}
              </Text>
            </View>
          </TouchableOpacity>
        )
    }
  }

  render(): React.ReactNode {
    console.log("CourseHome")
    return (
      <CourseHomeImpl.Consumer>
        {({ state, actions }) => {
          if (!state) return null

          const instructors = state.courseData?.instructors?.items?.map((item) => {
            return item?.user
          })
          const backOfficeStaff = state.courseData?.backOfficeStaff?.items?.map((item) => {
            return item?.user
          })

          const courseDates = actions.myCourseDates()
          const toDo = actions.myCourseTodo()

          return state.data && state.currentScreen == "Home" ? (
            <View style={this.styles.style.courseHomeMainContainer}>
              <CourseHeader groupData={state.data}></CourseHeader>
              <View style={{ flex: 80 }}>
                <ScrollView contentContainerStyle={{ flex: 80 }} style={{ flex: 80 }}>
                  <View style={this.styles.style.courseHomeScreenSubMainContainer}>
                    <View style={this.styles.style.courseHomeLeftContainer}>
                      <View style={this.styles.style.courseHomeSyllabusContainer}>
                        <View style={this.styles.style.courseProfileImageButtonsContainer}>
                          <ProfileImageNew
                            style={ProfileImageStyle.UserLarge}
                            quality={ProfileImageQuality.medium}
                            type="user"
                            containerStyle={{ alignSelf: "center" }}
                            user={state.courseData?.instructors?.items?.[0]?.user}
                          />
                          <Text style={this.styles.style.courseFontConnectWithName}>
                            {state.courseData?.instructors?.items?.[0]?.user?.given_name}{" "}
                            {state.courseData?.instructors?.items?.[0]?.user?.family_name}
                          </Text>
                          {/* <Text style={this.styles.style.courseFontConnectConversation}>
                              {state.courseData?.instructors?.items[0]?.user?.currentRole}
                            </Text> */}
                          {/*  <JCButton onPress={() => { null }} buttonType={ButtonTypes.CourseHome}>Book a Call</JCButton>*/}
                          {state.courseData?.instructors?.items?.[0]?.user?.id ? (
                            <JCButton
                              onPress={() => {
                                this.openConversation(
                                  state.courseData?.instructors?.items?.[0]?.user?.id as string,
                                  state.courseData?.instructors?.items?.[0]?.user?.given_name +
                                    " " +
                                    state.courseData?.instructors?.items?.[0]?.user?.family_name
                                )
                              }}
                              buttonType={ButtonTypes.CourseTransparentBoldOrange}
                            >
                              Start Conversation
                            </JCButton>
                          ) : null}
                        </View>
                        <View style={this.styles.style.courseHomeMainTextContainer}>
                          <Text style={this.styles.style.courseHomeDescriptionText}>
                            {state.courseData ? (
                              <EditableRichText
                                testID="course-introduction"
                                onChange={(val: string) => {
                                  actions.updateCourse("introduction", val)
                                }}
                                value={state.courseData.introduction ?? null}
                                isEditable={state.isEditable && state.editMode}
                              ></EditableRichText>
                            ) : null}
                          </Text>
                        </View>
                      </View>

                      <View style={this.styles.style.courseProfileImageContainer}>
                        <Text
                          style={{
                            fontSize: 20,
                            lineHeight: 25,
                            fontFamily: "Graphik-Bold-App",
                            marginTop: 0,
                            width: "90%",
                          }}
                        >
                          Learning Guide
                        </Text>
                        <View style={this.styles.style.courseHomeFileCard}>
                          {state.courseData ? (
                            <EditableFileUpload
                              textStyle={null}
                              inputStyle={null}
                              attachment={state.courseData.sylabusAttachment as string}
                              isEditable={state.isEditable && state.editMode}
                              attachmentName={state.courseData.sylabusAttachmentName as string}
                              owner={state.courseData.sylabusAttachmentOwner as string}
                              onChange={(obj) => {
                                console.log({
                                  attachmentOwner: obj.owner,
                                  attachmentName: obj.attachmentName,
                                  attachment: obj.attachment,
                                })
                                if (obj.attachmentName != undefined)
                                  actions.updateCourse("sylabusAttachmentName", obj.attachmentName)
                                if (obj.owner != undefined)
                                  actions.updateCourse("sylabusAttachmentOwner", obj.owner)
                                if (obj.attachment != undefined)
                                  actions.updateCourse("sylabusAttachment", obj.attachment)
                              }}
                            ></EditableFileUpload>
                          ) : null}
                        </View>
                        {state.editMode ? (
                          <>
                            <Text
                              style={{
                                fontSize: 20,
                                lineHeight: 25,
                                fontFamily: "Graphik-Bold-App",
                                marginTop: 70,
                                width: "90%",
                              }}
                            >
                              User Setup
                            </Text>
                            <View style={this.styles.style.courseHomeUserEditCard}>
                              <Text
                                style={{
                                  fontSize: 16,
                                  lineHeight: 25,
                                  fontFamily: "Graphik-Bold-App",
                                  marginTop: 0,
                                }}
                              >
                                Instructor:
                              </Text>

                              <EditableUsers
                                limit={1}
                                onRemove={async (value) => {
                                  return actions.deleteInstructor(value)
                                }}
                                onAdd={async (value) => {
                                  return actions.addInstructor(value)
                                }}
                                multiline={false}
                                testID="profile-currentRole"
                                showProfileImages={true}
                                textStyle={this.styles.style.fontFormSmallDarkGrey}
                                inputStyle={this.styles.style.fontFormLargeInput}
                                value={instructors ? instructors : []}
                                isEditable={true}
                              ></EditableUsers>

                              <Text
                                style={{
                                  fontSize: 16,
                                  lineHeight: 25,
                                  fontFamily: "Graphik-Bold-App",
                                  marginTop: 0,
                                }}
                              >
                                Back Office Staff:
                              </Text>
                              <EditableUsers
                                limit={1}
                                onAdd={async (value) => {
                                  return actions.addBackOfficeStaff(value)
                                }}
                                onRemove={async (value) => {
                                  return actions.deleteBackOfficeStaff(value)
                                }}
                                multiline={false}
                                testID="profile-backOfficeStaff"
                                showProfileImages={true}
                                textStyle={this.styles.style.fontFormSmallDarkGrey}
                                inputStyle={this.styles.style.fontFormLargeInput}
                                value={backOfficeStaff ? backOfficeStaff : []}
                                isEditable={true}
                              ></EditableUsers>

                              {state.isEditable ? (
                                <>
                                  <Text
                                    style={{
                                      fontSize: 20,
                                      lineHeight: 25,
                                      fontFamily: "Graphik-Bold-App",
                                      marginTop: 30,
                                    }}
                                  >
                                    Cohorts:
                                  </Text>

                                  {state.courseData?.triads?.items?.map((item, index: number) => {
                                    const coaches = item?.coaches?.items?.map((item) => {
                                      return item?.user
                                    })
                                    const users = item?.users?.items?.map((item) => {
                                      return item?.user
                                    })
                                    console.log(item)
                                    console.log({ users })
                                    console.log({ coaches })
                                    return (
                                      <View key={index} style={{ zIndex: 5000 - index }}>
                                        <Text
                                          style={{
                                            fontSize: 16,
                                            lineHeight: 25,
                                            fontFamily: "Graphik-Bold-App",
                                            marginTop: 20,
                                          }}
                                        >
                                          Facilitator
                                        </Text>

                                        <TouchableOpacity
                                          style={this.styles.style.courseHomeDeleteTriad}
                                          onPress={() => {
                                            actions.deleteTriad(index)
                                          }}
                                        >
                                          <AntDesign name="close" size={23} color="white" />
                                        </TouchableOpacity>

                                        <EditableUsers
                                          limit={1}
                                          onAdd={async (value) => {
                                            return actions.addTriadCoach(index, value)
                                          }}
                                          onRemove={async (value) => {
                                            return actions.deleteTriadCoach(index, value)
                                          }}
                                          multiline={false}
                                          testID="profile-currentRole"
                                          showProfileImages={true}
                                          textStyle={this.styles.style.fontFormSmallDarkGrey}
                                          inputStyle={this.styles.style.fontFormLargeInput}
                                          value={coaches ? coaches : []}
                                          isEditable={true}
                                        ></EditableUsers>

                                        <Text
                                          style={{
                                            zIndex: -1,
                                            fontSize: 16,
                                            lineHeight: 25,
                                            fontFamily: "Graphik-Bold-App",
                                            marginTop: 30,
                                          }}
                                        >
                                          Cohort
                                        </Text>

                                        <EditableUsers
                                          limit={3}
                                          onAdd={async (value) => {
                                            return actions.addTriadUser(index, value)
                                          }}
                                          onRemove={async (value) => {
                                            return actions.deleteTriadUser(index, value)
                                          }}
                                          multiline={false}
                                          testID="profile-currentRole"
                                          showProfileImages={true}
                                          textStyle={this.styles.style.fontFormSmallDarkGrey}
                                          inputStyle={this.styles.style.fontFormLargeInput}
                                          value={users ? users : []}
                                          isEditable={true}
                                        ></EditableUsers>
                                      </View>
                                    )
                                  })}
                                  <TouchableOpacity
                                    style={{ marginTop: 30, zIndex: -1 }}
                                    onPress={() => {
                                      actions.createTriad()
                                    }}
                                  >
                                    <View style={{ zIndex: -1 }}>
                                      <Text
                                        style={{
                                          fontSize: 16,
                                          lineHeight: 25,
                                          fontFamily: "Graphik-Regular-App",
                                          paddingLeft: 5,
                                          paddingTop: 6,
                                          paddingBottom: 6,
                                        }}
                                      >
                                        Add Cohort
                                      </Text>
                                    </View>
                                  </TouchableOpacity>
                                </>
                              ) : null}
                            </View>
                          </>
                        ) : (
                          <>
                            {actions
                              .myCourseGroups()
                              ?.completeTriad?.map((completeTriad, index: number) => {
                                return (
                                  <React.Fragment key={index}>
                                    <CourseHomeImpl.UserConsumer>
                                      {({ userActions }) => {
                                        if (userActions.isMemberOf("courseCoach")) return null
                                        return (
                                          <>
                                            <Text
                                              style={{
                                                fontSize: 20,
                                                lineHeight: 25,
                                                fontFamily: "Graphik-Bold-App",
                                                marginTop: 70,
                                                width: "90%",
                                              }}
                                            >
                                              My Facilitator
                                            </Text>
                                            <View
                                              style={this.styles.style.courseMyFacilitatorContainer}
                                            >
                                              {completeTriad.coach ? (
                                                completeTriad.coach.map((user: UserData) => {
                                                  return this.renderProfileCard(user)
                                                })
                                              ) : (
                                                <Text
                                                  style={{
                                                    fontSize: 16,
                                                    lineHeight: 25,
                                                    fontFamily: "Graphik-Regular-App",
                                                    marginTop: 70,
                                                    width: "90%",
                                                  }}
                                                >
                                                  You have not been assigned a facilitator yet
                                                </Text>
                                              )}
                                            </View>
                                          </>
                                        )
                                      }}
                                    </CourseHomeImpl.UserConsumer>

                                    <Text
                                      style={{
                                        fontSize: 20,
                                        lineHeight: 25,
                                        fontFamily: "Graphik-Bold-App",
                                        marginTop: 70,
                                        width: "90%",
                                      }}
                                    >
                                      My Cohort
                                    </Text>
                                    <View style={this.styles.style.courseMyLearningGroupContainer}>
                                      {completeTriad.triad ? (
                                        completeTriad.triad.map((user: UserData) => {
                                          return this.renderProfileCard(user)
                                        })
                                      ) : (
                                        <Text
                                          style={{
                                            fontSize: 16,
                                            lineHeight: 25,
                                            fontFamily: "Graphik-Regular-App",
                                            marginTop: 70,
                                            width: "90%",
                                          }}
                                        >
                                          You have not been assigned a cohort yet
                                        </Text>
                                      )}
                                    </View>
                                  </React.Fragment>
                                )
                              })}
                            <Text
                              style={{
                                fontSize: 20,
                                lineHeight: 25,
                                fontFamily: "Graphik-Bold-App",
                                marginTop: 70,
                                width: "90%",
                              }}
                            >
                              Learning Collective
                            </Text>
                            <View style={this.styles.style.courseMyCohortContainer}>
                              {actions.myCourseGroups()?.cohort ? (
                                actions.myCourseGroups()?.cohort.map((user) => {
                                  return this.renderProfileCard(user)
                                })
                              ) : (
                                <Text>You have not been assigned a learning collective yet</Text>
                              )}
                            </View>
                          </>
                        )}
                      </View>
                    </View>

                    <View style={this.styles.style.courseHomeRightContainer}>
                      {constants["SETTING_ISVISIBLE_COURSE_TODO"] ? (
                        <>
                          <Text
                            style={{
                              fontSize: 20,
                              lineHeight: 25,
                              fontFamily: "Graphik-Bold-App",
                              marginTop: 30,
                              width: "90%",
                            }}
                          >
                            To-Do
                          </Text>
                          <View style={this.styles.style.courseHomeCoachingCard}>
                            {Dimensions.get("window").width > 720 ? (
                              <FlatList
                                renderItem={({ item }) => this.renderToDo(item, actions)}
                                data={toDo}
                                style={{ height: 200 }}
                              />
                            ) : (
                              toDo?.slice(0, 7).map((item) => {
                                return this.renderToDo(item, actions)
                              })
                            )}
                          </View>
                        </>
                      ) : null}
                      {constants["SETTING_ISVISIBLE_COURSE_CALENDAR"] ? (
                        <View style={{ flex: 0 }}>
                          <Text
                            style={{
                              fontSize: 20,
                              lineHeight: 25,
                              fontFamily: "Graphik-Bold-App",
                              marginTop: 50,
                              width: "90%",
                            }}
                          >
                            My Calendar
                          </Text>
                          <Calendar
                            style={this.styles.style.courseHomeCalendar}
                            current={moment().format("YYYY-MM-DD")}
                            markedDates={courseDates.markedDates as any} // @types/react-native-calendars has the incorrect type
                            onDayPress={(day) =>
                              this.handlePressCalendar(
                                actions,
                                courseDates.items[day.dateString],
                                day.dateString
                              )
                            }
                            theme={{ todayTextColor: "#F0493E" }}
                            markingType="multi-dot"
                          />
                          <View style={this.styles.style.courseHomeCalendarLabels}>
                            <Text
                              style={{
                                fontSize: 25,
                                color: "#ff0000",
                                fontFamily: "Graphik-Bold-App",
                                marginTop: 10,
                                marginRight: 25,
                              }}
                            >
                              •{" "}
                              <span
                                style={{
                                  fontFamily: "Graphik-Regular-App",
                                  color: "#000000",
                                  fontSize: 13,
                                }}
                              >
                                Zoom
                              </span>
                            </Text>
                            <Text
                              style={{
                                fontSize: 25,
                                color: "#71C209",
                                fontFamily: "Graphik-Bold-App",
                                marginTop: 10,
                                marginRight: 25,
                              }}
                            >
                              •{" "}
                              <span
                                style={{
                                  fontFamily: "Graphik-Regular-App",
                                  color: "#000000",
                                  fontSize: 13,
                                }}
                              >
                                Assignment
                              </span>
                            </Text>
                            <Text
                              style={{
                                fontSize: 25,
                                color: "#0000ff",
                                fontFamily: "Graphik-Bold-App",
                                marginTop: 10,
                                marginRight: 25,
                              }}
                            >
                              •{" "}
                              <span
                                style={{
                                  fontFamily: "Graphik-Regular-App",
                                  color: "#000000",
                                  fontSize: 13,
                                }}
                              >
                                Response
                              </span>
                            </Text>
                          </View>
                        </View>
                      ) : null}
                      {constants["SETTING_ISVISIBLE_COURSE_ACTIVITY"] ? (
                        <View style={this.styles.style.CourseHomeActivityContainer}>
                          <ActivityBox
                            activityGroupType={"courses"}
                            activityGroupId={state.courseData?.id as string}
                            title="Course Activity"
                          />
                        </View>
                      ) : null}
                    </View>
                  </View>
                </ScrollView>
              </View>
            </View>
          ) : null
        }}
      </CourseHomeImpl.Consumer>
    )
  }
}

export default function CourseHome(props: Props): JSX.Element {
  const route = useRoute()
  const navigation = useNavigation<StackNavigationProp<any, any>>()
  return <CourseHomeImpl {...props} navigation={navigation} route={route} />
}
