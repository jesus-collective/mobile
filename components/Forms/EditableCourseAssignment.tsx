import { GraphQLResult } from "@aws-amplify/api/lib/types"
import { API, Auth } from "aws-amplify"
import GRAPHQL_AUTH_MODE from "aws-amplify-react-native"
import { Container } from "native-base"
import React from "react"
import { Text, TouchableHighlight, TouchableOpacity, View } from "react-native"
import ActivityBoxStyles from "../../components/Activity/ActivityBoxStyles"
import { CourseActions } from "../../components/CourseViewer/CourseContext"
import ProfileImage from "../../components/ProfileImage/ProfileImage"
import { UserActions, UserContext } from "../../screens/HomeScreen/UserContext"
import {
  CreateDirectMessageRoomMutation,
  CreateDirectMessageUserMutation,
  ListDirectMessageRoomsQuery,
} from "../../src/API"
import * as customQueries from "../../src/graphql-custom/queries"
import * as mutations from "../../src/graphql/mutations"
import { JCCognitoUser } from "../../src/types"
import JCComponent, { JCState } from "../JCComponent/JCComponent"
import MessageBoard from "../MessageBoard/MessageBoard"
import Messages from "../MessageBoard/Messages"

enum initialPostState {
  Yes,
  No,
  Unknown,
}
interface Props {
  wordCount: number
  assignmentId: string
  actions: CourseActions
  userActions: UserActions
}
interface State extends JCState {
  assignmentComplete: boolean
  selectedRoom: any
  data: any
  currentUser: any
  currentRoomId: string | null
  newToList: any
  userList: any
  assignmentOption: string
}
export default class EditableCourseAssignment extends JCComponent<Props, State> {
  constructor(props: Props) {
    super(props)
    const z = this.props.actions?.myCourseGroups()
    this.state = {
      ...super.getInitialState(),
      selectedRoom: null,
      data: [],
      currentUser: null,
      currentRoomId: null,
      newToList: [],
      assignmentComplete: false,
      userList: [...z.all],
      assignmentOption: "Assignments to Review",
    }
    console.log({ userList: this.state.userList })

    Auth.currentAuthenticatedUser().then((user: JCCognitoUser) => {
      this.setState({ currentRoomId: null, currentUser: user.username })
    })
    this.getInitialData(null)
  }
  componentDidUpdate(prevProps: Props): void {
    if (prevProps.assignmentId !== this.props.assignmentId) {
      this.getInitialData(null)
    }
  }
  async getInitialData(next: string | null): Promise<void> {
    if (this.props.assignmentId)
      try {
        this.setState({
          currentRoomId: "course-" + this.props.assignmentId + "-" + this.state.currentUser,
        })
        console.log({ Assignment: this.props.assignmentId })

        console.log({ AssignmentID: "course-" + this.props.assignmentId + "-" })
        try {
          const query = {
            limit: 20,
            filter: {
              id: { beginsWith: "course-" + this.props.assignmentId + "-" },
            },
            nextToken: next,
          }

          const json = (await API.graphql({
            query: customQueries.listDirectMessageRooms,
            variables: query,
            authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
          })) as GraphQLResult<ListDirectMessageRoomsQuery>
          console.log({ MessageInfo: json })
          if (json.data.listDirectMessageRooms.nextToken !== null) {
            this.setState({
              data: [...this.state.data, ...json.data.listDirectMessageRooms.items],
            })
            this.getInitialData(json.data.listDirectMessageRooms.nextToken)
          } else if (json.data.listDirectMessageRooms) {
            this.setState(
              {
                data: [...this.state.data, ...json.data.listDirectMessageRooms.items],
              },
              () => {
                // TODO FIX
                this.shouldCreateRoom(this.props.userActions)
              }
            )
          }
        } catch (json2: any) {
          console.error({ Error: json2 })
          if (json2.data.listDirectMessageRooms.nextToken !== null) {
            this.setState({
              data: [...this.state.data, ...json2.data.listDirectMessageRooms.items],
            })
            this.getInitialData(json2.data.listDirectMessageRooms.nextToken)
          } else if (json2.data.listDirectMessageRooms) {
            this.setState(
              {
                data: [...this.state.data, ...json2.data.listDirectMessageRooms.items],
              },
              () => {
                // TODO FIX
                this.shouldCreateRoom(this.props.userActions)
              }
            )
          }
        }
      } catch (err) {
        console.error(err)
      }
  }
  createRoom = (): void => {
    console.log("CreateRoom")
    Auth.currentAuthenticatedUser()
      .then((user: JCCognitoUser) => {
        if (user == null) return
        const createDirectMessageRoom = API.graphql({
          query: mutations.createDirectMessageRoom,
          variables: {
            input: {
              id: "course-" + this.props.assignmentId + "-" + user["username"],
              roomType: "assignment",
              name:
                user.attributes?.given_name + " " + user.attributes?.family_name + "'s assignment",
            },
          },
          authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
        }) as Promise<GraphQLResult<CreateDirectMessageRoomMutation>>
        createDirectMessageRoom.then((json) => {
          console.log({ createDirectMessageRoom: json })
          console.log("createDMUser")
          const userList = this.state.userList
          userList.map((item) => {
            const createDirectMessageUser2 = API.graphql({
              query: mutations.createDirectMessageUser,
              variables: {
                input: {
                  roomID: "course-" + this.props.assignmentId + "-" + user["username"],
                  userID: item.id,
                  userName: item.name,
                },
              },
              authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
            }) as Promise<GraphQLResult<CreateDirectMessageUserMutation>>
            createDirectMessageUser2
              .then((json2) => {
                console.log({ createDirectMessageUser: json2 })
              })
              .catch((json2) => {
                console.log({ Error: json2 })
              })
          })
        })
      })
      .catch((e) => {
        console.log({ Error: e })
      })
  }
  shouldCreateRoom = async (userActions: UserActions): Promise<void> => {
    console.log({ "Number of rooms": this.state.data.length })
    const user = (await Auth.currentAuthenticatedUser()) as JCCognitoUser
    if (
      this.state.data.filter(
        (item) => item.id == "course-" + this.props.assignmentId + "-" + user["username"]
      ).length <= 0
    )
      if (!userActions.isMemberOf("courseAdmin") && !userActions.isMemberOf("courseCoach"))
        this.createRoom()
  }

  hasInitialPost = (): initialPostState => {
    if (this.props.assignmentId)
      if (
        this.state.data.filter(
          (item) => item.id == "course-" + this.props.assignmentId + "-" + this.state.currentUser
        )[0]?.directMessage.items.length > 0
      ) {
        console.log({ "Assignment has initial post": this.props.assignmentId })
        return initialPostState.Yes
      } else {
        console.log({
          "Assignment does not have initial post": this.props.assignmentId,
        })
        return initialPostState.No
      }
    else return initialPostState.Unknown
  }
  shouldShowMB = (): boolean => {
    if (this.state.currentUser == null) return false
    if (
      this.state.currentRoomId ==
      "course-" + this.props.assignmentId + "-" + this.state.currentUser
    )
      return true
    if (this.props.assignmentId)
      if (
        this.state.data.filter((item) => item.id == this.state.currentRoomId)[0]?.directMessage
          ?.items?.length > 0
      )
        return true
      else return false
    else return false
  }
  getOtherUsers(data: any): { ids: string[]; names: string[] } {
    const ids: string[] = []
    const names: string[] = []
    data.messageUsers.items.forEach((user) => {
      if (user.userID !== this.state.currentUser) {
        ids.push(user.userID)
        names.push(user.userName)
      }
    })

    return { ids, names }
  }
  switchRoom(index: number): void {
    this.setState({ selectedRoom: index })

    this.setState({ currentRoomId: this.state.data[index].id })
    console.log(this.state.data[index])
  }
  getCurrentRoomRecipients(): string[] {
    const ids: string[] = []
    this.state.userList.forEach((user) => {
      ids.push(user.id)
    })
    console.log(ids)
    return ids
  }
  ButtonHeader({ optionState, changeOption }): JSX.Element {
    return (
      <View style={[ActivityBoxStyles.ActivityButtonContainer, { borderBottomWidth: 0 }]}>
        {["Assignments to Review", "My Assignment"].map((option: string) => {
          return (
            <TouchableHighlight
              underlayColor="rgba(255,255,255,0.2)"
              key={option}
              disabled={optionState === option}
              onPress={() => changeOption(option)}
              style={{
                padding: 16,
                borderBottomWidth: optionState === option ? 2 : 0,
                borderBottomColor: optionState === option ? "#F0493E" : "none",
              }}
            >
              <Text
                style={[
                  ActivityBoxStyles.ActivityButtonText,
                  { fontSize: 20, lineHeight: 25, fontFamily: "Graphik-Semibold-App" },
                  optionState === option ? { color: "#F0493E" } : {},
                ]}
              >
                {option}
              </Text>
            </TouchableHighlight>
          )
        })}
      </View>
    )
  }
  renderCourseReview(): React.ReactNode {
    return (
      <Container style={{ width: "100%" }}>
        <this.ButtonHeader
          optionState={this.state.assignmentOption}
          changeOption={(a) => this.setState({ assignmentOption: a })}
        />
        {/* Use a FlatList here */}
        {console.log("data", this.state.data)}
        {this.state.data != null && this.state.data.length != 0 && this.shouldShowMB() ? (
          this.state.data != null && this.state.data.length != 0 ? (
            this.state.assignmentOption === "My Assignment" ? (
              <Messages
                recipients={this.getCurrentRoomRecipients()}
                open
                room={this.state.data.find((a) => a?.id.includes(this.state.currentUser))}
              />
            ) : (
              this.state.data
                ?.filter(
                  (item) =>
                    item?.directMessage?.items.length > 0 &&
                    !item?.id.includes(this.state.currentUser)
                )
                .map((item, index: number) => (
                  <Messages recipients={this.getCurrentRoomRecipients()} room={item} key={index} />
                ))
            )
          ) : null
        ) : null}

        <Container style={this.styles.style.courseAssignmentMainContainer}>
          <Container style={this.styles.style.courseAssignmentScreenLeftCard}>
            <Text style={this.styles.style.eventNameInput}>Review Assignments</Text>

            {this.state.data != null && this.state.data.length != 0 ? (
              this.state.data.map((item, index: number) => {
                const otherUsers = this.getOtherUsers(item)
                let stringOfNames = ""
                otherUsers.names.forEach((name, index) => {
                  if (otherUsers.names.length === index + 1) stringOfNames += name
                  else stringOfNames += name + ", "
                })
                if (item.directMessage.items.length > 0)
                  return (
                    <TouchableOpacity
                      style={{
                        backgroundColor: this.state.selectedRoom == index ? "#eeeeee" : "unset",
                        borderRadius: 10,
                        width: "100%",
                        paddingTop: 8,
                        paddingBottom: 8,
                        display: "flex",
                        alignItems: "center",
                      }}
                      key={item.id}
                      onPress={() => {
                        this.switchRoom(index)
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 20,
                          lineHeight: 25,
                          fontWeight: "normal",
                          fontFamily: "Graphik-Regular-App",
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <ProfileImage
                          user={otherUsers.ids.length === 1 ? otherUsers.ids[0] : null}
                          size="small2"
                        ></ProfileImage>
                        {item.name ? item.name : stringOfNames}
                      </Text>
                    </TouchableOpacity>
                  )
              })
            ) : (
              <Text>Nothing to review</Text>
            )}
          </Container>

          {this.state.data != null && this.state.data.length != 0 && this.shouldShowMB() ? (
            <Container style={this.styles.style.courseAssignmentScreenRightCard}>
              <MessageBoard
                replies
                inputAt="bottom"
                showWordCount={true}
                totalWordCount={this.props.wordCount}
                style="courseResponse"
                toolbar={true}
                roomId={this.state.currentRoomId}
                recipients={this.getCurrentRoomRecipients()}
              ></MessageBoard>
            </Container>
          ) : null}
        </Container>
      </Container>
    )
  }
  static UserConsumer = UserContext.Consumer

  render(): React.ReactNode {
    return (
      <EditableCourseAssignment.UserConsumer>
        {({ userState, userActions }) => {
          if (!userState) return null

          return userActions.isMemberOf("courseAdmin") || userActions.isMemberOf("courseCoach") ? (
            <>
              <div
                style={{
                  padding: 5,
                  height: 25,
                  width: "95%",
                  marginTop: 20,
                  backgroundColor: "#71C209",
                  borderRadius: 4,
                }}
              >
                <span
                  style={{
                    color: "#ffffff",
                    fontSize: 18,
                    fontFamily: "Graphik-Bold-App",
                    alignSelf: "center",
                    paddingLeft: 10,
                    paddingTop: 15,
                  }}
                >
                  Admin/Coach View
                </span>
              </div>
              {this.renderCourseReview()}
            </>
          ) : (
            <>
              {this.hasInitialPost() == initialPostState.Yes ? (
                this.renderCourseReview()
              ) : this.hasInitialPost() == initialPostState.No ? (
                <MessageBoard
                  replies
                  toolbar={true}
                  showWordCount={true}
                  totalWordCount={this.props.wordCount}
                  style="course"
                  roomId={this.state.currentRoomId}
                  recipients={this.getCurrentRoomRecipients()}
                ></MessageBoard>
              ) : null}
            </>
          )
        }}
      </EditableCourseAssignment.UserConsumer>
    )
  }
}
