import { AntDesign } from "@expo/vector-icons"
import { useNavigation, useRoute } from "@react-navigation/native"
import moment from "moment-timezone"
import {
  Body,
  Button,
  Card,
  CardItem,
  Container,
  Content,
  Left,
  Right,
  StyleProvider,
} from "native-base"
import React from "react"
import { Dimensions, FlatList, Image, Text, TouchableOpacity, View } from "react-native"
import { Calendar } from "react-native-calendars"
import { UserData } from "src/types"
import EditableFileUpload from "../../components/Forms/EditableFileUpload"
import EditableRichText from "../../components/Forms/EditableRichText"
import EditableUsers from "../../components/Forms/EditableUsers"
import ProfileImage from "../../components/ProfileImage/ProfileImage"
import getTheme from "../../native-base-theme/components"
import CourseHeader from "../CourseHeader/CourseHeader"
import JCButton, { ButtonTypes } from "../Forms/JCButton"
import JCComponent from "../JCComponent/JCComponent"
import { CourseContext } from "./CourseContext"

interface Props {
  navigation?: any
  route?: any
}

type ToDoItem = {
  lessonType: string
  time: string
  date: string
  moment: moment.Moment
}

class CourseHomeImpl extends JCComponent<Props> {
  constructor(props: Props) {
    super(props)
  }

  openConversation(initialUser: string, name: string): void {
    console.log("Navigate to conversationScreen")
    this.props.navigation.push("ConversationScreen", {
      initialUserID: initialUser,
      initialUserName: name,
    })
  }
  showProfile(id: string): void {
    console.log("Navigate to profileScreen")
    this.props.navigation.push("ProfileScreen", { id: id, create: false })
  }
  static Consumer = CourseContext.Consumer
  renderProfileCard(user: UserData): React.ReactNode {
    if (user)
      return (
        <TouchableOpacity
          key={user.id}
          onPress={() => {
            this.showProfile(user.id)
          }}
        >
          <Card style={this.styles.style.courseConversationCard}>
            <CardItem>
              <Left style={this.styles.style.courseHomeConversationCard}>
                <ProfileImage linkToProfile={true} user={user} size="large" style="my-people" />
                <Body style={this.styles.style.dashboardConversationBody}>
                  <Text style={this.styles.style.courseFontConnectWithName}>
                    {user.given_name} {user.family_name}
                  </Text>
                  <Text style={this.styles.style.fontConnectConversation}>{user.currentRole}</Text>
                  <Button
                    bordered
                    style={this.styles.style.courseHomeConversationButton}
                    onPress={() => {
                      this.openConversation(user.id, user.given_name + " " + user.family_name)
                    }}
                  >
                    <Text style={this.styles.style.courseFontStartConversation}>
                      Start Conversation
                    </Text>
                  </Button>
                  {/*<Button bordered style={this.styles.style.courseHomeConversationButton} onPress={() => { this.openConversation(user.id, user.given_name + " " + user.family_name) }}><Text style={this.styles.style.courseFontStartConversation}>Book Call</Text></Button>*/}
                </Body>
              </Left>
            </CardItem>
          </Card>
        </TouchableOpacity>
      )
    else null
  }

  renderToDo(item: ToDoItem): JSX.Element {
    switch (item.lessonType) {
      case "assignment":
        return (
          <Container
            style={{
              flexDirection: "row",
              height: "unset",
              marginTop: 10,
              marginBottom: 10,
            }}
          >
            <Left style={{ flex: 1 }}>
              <Image
                style={{
                  width: "40px",
                  height: "40px",
                  alignSelf: "center",
                }}
                source={require("../../assets/svg/document.svg")}
              />
            </Left>
            <Right
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
            </Right>
          </Container>
        )

      case "respond":
        return (
          <Container
            style={{
              flexDirection: "row",
              height: "unset",
              marginTop: 10,
              marginBottom: 10,
            }}
          >
            <Left style={{ flex: 1 }}>
              <Image
                style={{
                  width: "40px",
                  height: "40px",
                  alignSelf: "center",
                }}
                source={require("../../assets/svg/document.svg")}
              />
            </Left>
            <Right
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
            </Right>
          </Container>
        )

      default:
        // zoom
        return (
          <Container
            style={{
              flexDirection: "row",
              height: "unset",
              marginTop: 10,
              marginBottom: 10,
            }}
          >
            <Left style={{ flex: 1 }}>
              <Image
                style={{
                  width: "40px",
                  height: "40px",
                  alignSelf: "center",
                }}
                source={require("../../assets/svg/document.svg")}
              />
            </Left>
            <Right
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
            </Right>
          </Container>
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

          const { zoom, assignments, respond } = actions.myCourseDates() as {
            zoom: string[]
            assignments: string[]
            respond: string[]
          }

          const markedDates: { [key: string]: any } = {}

          for (let i = 0; i < zoom?.length; i++)
            markedDates[zoom[i]] = { marked: true, dotColor: "ff0000" }
          for (let i = 0; i < assignments?.length; i++)
            markedDates[assignments[i]] = {
              marked: true,
              dotColor: "#71C209",
            }
          for (let i = 0; i < respond?.length; i++)
            markedDates[respond[i]] = { marked: true, dotColor: "#0000ff" }

          const toDo = actions.myCourseTodo()

          return state.data && state.currentScreen == "Home" ? (
            <StyleProvider style={getTheme()}>
              <Container style={this.styles.style.courseHomeMainContainer}>
                <CourseHeader groupData={state.data}></CourseHeader>
                <Container style={{ flex: 80 }}>
                  <Content contentContainerStyle={{ flex: 80 }} style={{ flex: 80 }}>
                    <Container style={this.styles.style.courseHomeScreenSubMainContainer}>
                      <Container style={this.styles.style.courseHomeLeftContainer}>
                        <Container style={this.styles.style.courseHomeSyllabusContainer}>
                          <Container style={this.styles.style.courseProfileImageButtonsContainer}>
                            <ProfileImage
                              linkToProfile={true}
                              user={state.courseData?.instructors?.items?.[0]?.user}
                              size="medium"
                              style="courseProfile"
                            />

                            <Text style={this.styles.style.courseFontConnectWithName}>
                              {state.courseData?.instructors?.items?.[0]?.user?.given_name}{" "}
                              {state.courseData?.instructors?.items?.[0]?.user?.family_name}
                            </Text>
                            <Text style={this.styles.style.courseFontConnectConversation}>
                              {state.courseData?.instructors?.items?.[0]?.user?.currentRole}
                            </Text>
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
                          </Container>
                          <Container style={this.styles.style.courseHomeMainTextContainer}>
                            <Text style={this.styles.style.courseHomeDescriptionText}>
                              {state.courseData ? (
                                <EditableRichText
                                  onChange={(val: string) => {
                                    actions.updateCourse("introduction", val)
                                  }}
                                  value={state.courseData.introduction}
                                  isEditable={state.isEditable && state.editMode}
                                ></EditableRichText>
                              ) : null}
                            </Text>
                          </Container>
                        </Container>

                        <Container style={this.styles.style.courseProfileImageContainer}>
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
                          <Card style={this.styles.style.courseHomeFileCard}>
                            {state.courseData ? (
                              <EditableFileUpload
                                textStyle={null}
                                inputStyle={null}
                                attachment={state.courseData.sylabusAttachment as string}
                                isEditable={state.isEditable && state.editMode}
                                attachmentName={state.courseData.sylabusAttachmentName as string}
                                onChange={(obj) => {
                                  console.log({
                                    attachmentName: obj.attachmentName,
                                    attachment: obj.attachment,
                                  })
                                  if (obj.attachmentName != undefined)
                                    actions.updateCourse(
                                      "sylabusAttachmentName",
                                      obj.attachmentName
                                    )
                                  if (obj.attachment != undefined)
                                    actions.updateCourse("sylabusAttachment", obj.attachment)
                                }}
                              ></EditableFileUpload>
                            ) : null}
                          </Card>
                          {}
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
                              <Card style={this.styles.style.courseHomeUserEditCard}>
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
                                  onChange={(value: any[]) => {
                                    actions.updateInstructors(value)
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
                                  onChange={(value: any[]) => {
                                    actions.updateBackOfficeStaff(value)
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
                                      return (
                                        <Card key={index}>
                                          <CardItem style={{ zIndex: -1 }}>
                                            <Left style={{ zIndex: -1 }}>
                                              <Text
                                                style={{
                                                  zIndex: -1,
                                                  fontSize: 16,
                                                  lineHeight: 25,
                                                  fontFamily: "Graphik-Bold-App",
                                                  marginTop: 20,
                                                }}
                                              >
                                                Facilitator
                                              </Text>
                                            </Left>
                                            <Right style={{ zIndex: -1 }}>
                                              <TouchableOpacity
                                                style={this.styles.style.courseHomeDeleteTriad}
                                                onPress={() => {
                                                  actions.deleteTriad(index)
                                                }}
                                              >
                                                <AntDesign name="close" size={23} color="white" />
                                              </TouchableOpacity>
                                            </Right>
                                          </CardItem>
                                          <CardItem>
                                            <EditableUsers
                                              limit={1}
                                              onChange={(value: any[]) => {
                                                actions.updateTriadCoaches(index, value)
                                              }}
                                              multiline={false}
                                              testID="profile-currentRole"
                                              showProfileImages={true}
                                              textStyle={this.styles.style.fontFormSmallDarkGrey}
                                              inputStyle={this.styles.style.fontFormLargeInput}
                                              value={coaches ? coaches : []}
                                              isEditable={true}
                                            ></EditableUsers>
                                          </CardItem>
                                          <CardItem style={{ zIndex: -1 }}>
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
                                          </CardItem>
                                          <CardItem>
                                            <EditableUsers
                                              limit={3}
                                              onChange={(value: any[]) => {
                                                actions.updateTriadUsers(index, value)
                                              }}
                                              multiline={false}
                                              testID="profile-currentRole"
                                              showProfileImages={true}
                                              textStyle={this.styles.style.fontFormSmallDarkGrey}
                                              inputStyle={this.styles.style.fontFormLargeInput}
                                              value={users ? users : []}
                                              isEditable={true}
                                            ></EditableUsers>
                                          </CardItem>
                                        </Card>
                                      )
                                    })}
                                    <TouchableOpacity
                                      style={{ marginTop: 30, zIndex: -1 }}
                                      onPress={() => {
                                        actions.createTriad()
                                      }}
                                    >
                                      <Card style={{ zIndex: -1 }}>
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
                                      </Card>
                                    </TouchableOpacity>
                                  </>
                                ) : null}
                              </Card>
                            </>
                          ) : (
                            <>
                              {actions
                                .myCourseGroups()
                                ?.completeTriad?.map((completeTriad, index: number) => {
                                  return (
                                    <React.Fragment key={index}>
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
                                      <View style={this.styles.style.courseMyFacilitatorContainer}>
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
                                      <View
                                        style={this.styles.style.courseMyLearningGroupContainer}
                                      >
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
                        </Container>
                      </Container>
                      <Container style={this.styles.style.courseHomeRightContainer}>
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
                        <Card style={this.styles.style.courseHomeCoachingCard}>
                          {Dimensions.get("window").width > 720 ? (
                            <FlatList
                              renderItem={({ item }) => this.renderToDo(item)}
                              data={toDo}
                              style={{ height: 200 }}
                            />
                          ) : (
                            toDo?.slice(0, 7).map((item) => {
                              return this.renderToDo(item)
                            })
                          )}
                        </Card>

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
                          markedDates={markedDates}
                          onDayPress={(day) => console.log(markedDates[day.dateString])}
                        />
                        <Container style={this.styles.style.courseHomeCalendarLabels}>
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
                        </Container>
                        {/*
                          <Container style={{ width: '100%', marginTop: 30, marginBottom: 50 }}>
                            <Text style={{ fontSize: 20, lineHeight: 25, fontFamily: 'Graphik-Bold-App', marginTop: 50, width: '90%' }}>Course Activity</Text>
                          </Container>
                          <Container style={this.styles.style.CourseHomeActivityContainer}>
                            <JCButton buttonType={state.activeCourseActivity == "today" ? ButtonTypes.TransparentActivityCourse : ButtonTypes.courseActivityTransparentRegularBlack} onPress={() => { actions.setActiveCourseActivity("today") }}>Today</JCButton>
                            <JCButton buttonType={state.activeCourseActivity == "yesterday" ? ButtonTypes.TransparentActivityCourse : ButtonTypes.courseActivityTransparentRegularBlack} onPress={() => { actions.setActiveCourseActivity("yesterday") }}>Yesterday</JCButton>
                            <JCButton buttonType={state.activeCourseActivity == "thisweek" ? ButtonTypes.TransparentActivityCourse : ButtonTypes.courseActivityTransparentRegularBlack} onPress={() => { actions.setActiveCourseActivity("thisweek") }}>This Week</JCButton>
                          </Container>

                          <Text style={this.styles.style.courseHomeCourseActivityText}>Adam posted assignment to review</Text>
                          */}
                      </Container>
                    </Container>
                  </Content>
                </Container>
              </Container>
            </StyleProvider>
          ) : null
        }}
      </CourseHomeImpl.Consumer>
    )
  }
}

export default function CourseHome(props: Props): JSX.Element {
  const route = useRoute()
  const navigation = useNavigation()
  return <CourseHomeImpl {...props} navigation={navigation} route={route} />
}
