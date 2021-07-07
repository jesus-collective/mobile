import { GraphQLResult } from "@aws-amplify/api/lib/types"
import { API, Auth } from "aws-amplify"
import GRAPHQL_AUTH_MODE from "aws-amplify-react-native"
import { Container } from "native-base"
import React from "react"
import { Text, TouchableHighlight, View } from "react-native"
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
      posted: false,
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
    console.log(prevProps)
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
                        recipients={this.getCurrentRoomRecipients()}
                        room={item}
                        key={index}
                      />
                    </>
                  )
                })
            )
          ) : null
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
    return (
      <div
        style={{
          padding: 5,
          height: 25,
          flex: 1,
          marginTop: 20,
          marginLeft: 30,
          backgroundColor: label === "Assignment" ? "#F0493E" : "#71C209",
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
  render(): React.ReactNode {
    return (
      <EditableCourseAssignment.UserConsumer>
        {({ userState, userActions }) => {
          if (!userState) return null
          return userActions.isMemberOf("courseAdmin") || userActions.isMemberOf("courseCoach") ? (
            <>
              {this.renderIndicatorBar("Admin/Coach View")}
              {this.renderCourseReview(userActions)}
            </>
          ) : (
            <>
              {this.hasInitialPost() == initialPostState.Yes || this.state.posted ? (
                this.renderCourseReview(userActions)
              ) : this.hasInitialPost() == initialPostState.No ? (
                <>
                  {this.renderIndicatorBar("Assignment")}
                  <View style={{ paddingBottom: 150 }}>
                    <MessageEditor
                      post={async () => {
                        await this.getInitialData(null)
                        this.setState({ posted: true })
                      }}
                      recipients={this.getCurrentRoomRecipients()}
                      roomId={this.state.currentRoomId ?? ""}
                    />
                  </View>
                </>
              ) : null}
            </>
          )
        }}
      </EditableCourseAssignment.UserConsumer>
    )
  }
}
