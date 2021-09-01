import { GraphQLResult } from "@aws-amplify/api/lib/types"
import { API, Auth } from "aws-amplify"
import GRAPHQL_AUTH_MODE from "aws-amplify-react-native"
import { MessageComment } from "components/MessageBoard/AssignmentMessageBoard/MessageThread"
import { Container } from "native-base"
import React from "react"
import { ActivityIndicator, Text, TouchableHighlight, View } from "react-native"
import ActivityBoxStyles from "../../components/Activity/ActivityBoxStyles"
import { CourseActions } from "../../components/CourseViewer/CourseContext"
import MessageEditor from "../../components/MessageBoard/AssignmentMessageBoard/MessageEditor"
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
import Messages from "../MessageBoard/AssignmentMessageBoard/Messages"

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
  posted: boolean
  data: any
  currentUser: any
  currentRoomId: string | null
  isLoading: boolean
  newToList: any
  userList: any
  assignmentOption: string
  showEdit: MessageComment | null
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
      showEdit: null,
      posted: false,
      currentRoomId: null,
      isLoading: true,
      newToList: [],
      assignmentComplete: false,
      userList: [...z.all],
      assignmentOption: "Assignments to Review",
    }
    console.log({ userList: this.state.userList })
  }
  componentDidUpdate(prevProps: Props): void {
    if (prevProps.assignmentId !== this.props.assignmentId) {
      this.getInitialData(null)
    }
    console.log(prevProps)
  }
  async componentDidMount() {
    const user: JCCognitoUser = await Auth.currentAuthenticatedUser()

    this.setState({ currentRoomId: null, currentUser: user.username }, async () => {
      await this.getInitialData(null)
      this.setState({ isLoading: false })
    })
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
            limit: 50,
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
    console.log("this.state.data", this.state.data)
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
  ButtonHeader({ optionState, changeOption, adminCoach }): JSX.Element {
    const options = adminCoach
      ? ["Assignments to Review"]
      : ["Assignments to Review", "My Assignment"]
    return (
      <View style={[ActivityBoxStyles.ActivityButtonContainer, { borderBottomWidth: 0 }]}>
        {options.map((option: string) => {
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
  renderCourseReview(userActions?: UserActions): React.ReactNode {
    return (
      <Container style={{ width: "100%", paddingBottom: 250 }}>
        <this.ButtonHeader
          adminCoach={
            userActions?.isMemberOf("courseAdmin") || userActions?.isMemberOf("courseCoach")
          }
          optionState={this.state.assignmentOption}
          changeOption={(a) => this.setState({ assignmentOption: a })}
        />
        {this.state.data != null && this.state.data.length != 0 && this.shouldShowMB() ? (
          this.state.data != null && this.state.data.length != 0 ? (
            this.state.assignmentOption === "My Assignment" ? (
              <Messages
                showEdit={(assignment: MessageComment) => this.setState({ showEdit: assignment })}
                wordCount={this.props.wordCount}
                recipients={this.getCurrentRoomRecipients()}
                open
                room={this.state.data.find((a) => a?.id.includes(this.state.currentUser))}
              />
            ) : this.state.data.filter(
                (room) =>
                  room?.directMessage?.items?.length && !room?.id.includes(this.state.currentUser)
              ).length === 0 ? (
              <Text
                style={{
                  paddingLeft: 16,
                  fontSize: 18,
                  lineHeight: 25,
                  fontFamily: "Graphik-Semibold-App",
                }}
              >
                No assignments to review
              </Text>
            ) : (
              this.state.data
                ?.filter(
                  (item) =>
                    item?.directMessage?.items.length > 0 &&
                    !item?.id.includes(this.state.currentUser)
                )
                .map((item, index: number) => {
                  console.log(item?.id)
                  return (
                    <>
                      <Messages
                        wordCount={this.props.wordCount}
                        recipients={this.getCurrentRoomRecipients()}
                        room={item}
                        key={index}
                      />
                    </>
                  )
                })
            )
          ) : null
        ) : this.state.isLoading ? (
          this.renderSpinner()
        ) : (
          <Text
            style={{
              paddingLeft: 16,
              fontSize: 18,
              lineHeight: 25,
              fontFamily: "Graphik-Semibold-App",
            }}
          >
            No assignments to review
          </Text>
        )}
      </Container>
    )
  }
  static UserConsumer = UserContext.Consumer
  renderIndicatorBar(label: string): JSX.Element {
    let bgColor
    switch (label) {
      case "Assignment":
        bgColor = "#F0493E"
        break
      case "Update Assignment":
        bgColor = "#F0493E"
        break
      default:
        bgColor = "#71C209"
        break
    }
    return (
      <div
        style={{
          padding: 5,
          height: 25,
          marginTop: 20,
          backgroundColor: bgColor,
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
          {label}
        </span>
      </div>
    )
  }
  renderSpinner(): React.ReactNode {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          flexDirection: "column",
          marginTop: 40,
          minHeight: 400,
        }}
      >
        <ActivityIndicator color="#F0493E" size="large"></ActivityIndicator>
        <p style={{ marginTop: 12, fontFamily: "Graphik-Bold-App", fontSize: 16 }}>
          Loading assignments...
        </p>
      </div>
    )
  }
  render(): React.ReactNode {
    const hasPost = this.hasInitialPost()
    return (
      <EditableCourseAssignment.UserConsumer>
        {({ userState, userActions }) => {
          if (!userState) return null
          if (this.state.showEdit)
            return (
              <View style={{ paddingBottom: 150 }}>
                {this.renderIndicatorBar("Update Assignment")}
                <MessageEditor
                  assignment={this.state.showEdit}
                  wordCount={this.props.wordCount}
                  post={async () => {
                    this.setState({ posted: true, data: [], showEdit: null })
                    this.getInitialData(null)
                  }}
                  recipients={this.getCurrentRoomRecipients()}
                  roomId={this.state.currentRoomId ?? ""}
                />
              </View>
            )
          return userActions.isMemberOf("courseAdmin") || userActions.isMemberOf("courseCoach") ? (
            <>
              {this.renderIndicatorBar("Admin/Coach View")}
              {this.renderCourseReview(userActions)}
            </>
          ) : (
            <>
              {hasPost == initialPostState.Yes || this.state.posted ? (
                this.renderCourseReview(userActions)
              ) : hasPost == initialPostState.No && !this.state.isLoading ? (
                <>
                  <View style={{ paddingBottom: 150 }}>
                    {this.renderIndicatorBar("Assignment")}
                    <MessageEditor
                      wordCount={this.props.wordCount}
                      newAssignment={true}
                      post={async () => {
                        await this.getInitialData(null)
                        this.setState({ posted: true, data: [], assignmentOption: "My Assignment" })
                      }}
                      recipients={this.getCurrentRoomRecipients()}
                      roomId={this.state.currentRoomId ?? ""}
                    />
                  </View>
                </>
              ) : (
                this.renderSpinner()
              )}
            </>
          )
        }}
      </EditableCourseAssignment.UserConsumer>
    )
  }
}
