import { GraphQLResult } from "@aws-amplify/api/lib/types"
import { StackNavigationProp } from "@react-navigation/stack"
import { API, Auth } from "aws-amplify"
import GRAPHQL_AUTH_MODE from "aws-amplify-react-native"
import { Container, Content } from "native-base"
import React from "react"
import { Text, TouchableOpacity, View } from "react-native"
import {
  CreateDirectMessageRoomMutation,
  CreateDirectMessageUserMutation,
  ListDirectMessageUsersQuery,
} from "src/API"
import { GetDirectMessageUserQuery } from "src/API-customqueries"
import { JCCognitoUser } from "src/types"
import JCComponent, { JCState } from "../../components/JCComponent/JCComponent"
import MessageBoard from "../../components/MessageBoard/MessageBoard"
import MyMap from "../../components/MyMap/MyMap"
import ProfileImage from "../../components/ProfileImage/ProfileImage"
import * as customQueries from "../../src/graphql-custom/queries"
import * as mutations from "../../src/graphql/mutations"

interface Props {
  navigation?: StackNavigationProp<any, any>
  route?: any
}
interface State extends JCState {
  newToList: any[]
  showMap: boolean
  data: NonNullable<GraphQLResult<GetDirectMessageUserQuery>["data"]>["getDirectMessageUser"][]

  currentUser: string | null
  currentRoomId: string | null
}

export default class ConversationScreen extends JCComponent<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      ...super.getInitialState(),

      showMap: false,
      data: [],
      currentUser: null,
      currentRoomId: null,
      newToList: [],
    }
    // console.log(this.props.route.params.initialUser)

    Auth.currentAuthenticatedUser().then((user: JCCognitoUser) => {
      this.setState({ currentUser: user.username })
    })

    this.getInitialData(null)
  }
  createRoom = (toUserID: string, toUserName: string): void => {
    console.log("CreateRoom")
    Auth.currentAuthenticatedUser()
      .then((user: JCCognitoUser) => {
        const createDirectMessageRoom = API.graphql({
          query: mutations.createDirectMessageRoom,
          variables: { input: { name: "", roomType: "directMessage" } },
          authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
        }) as Promise<GraphQLResult<CreateDirectMessageRoomMutation>>
        createDirectMessageRoom
          .then((json) => {
            console.log({ createDirectMessageRoom: json })
            console.log("createDMUser")
            const addDM2 = (json2: GraphQLResult<CreateDirectMessageUserMutation>) => {
              console.log({ Dm2: json2 })
              const createDirectMessageUser2 = API.graphql({
                query: mutations.createDirectMessageUser,
                variables: {
                  input: {
                    roomID: json.data?.createDirectMessageRoom?.id,
                    userID: toUserID,
                    userName: toUserName,
                  },
                },
                authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
              }) as Promise<GraphQLResult<CreateDirectMessageUserMutation>>
              createDirectMessageUser2
                .then(() => {
                  console.log(json2)
                  if (json2.data?.createDirectMessageUser)
                    this.getNewUser(json2.data.createDirectMessageUser.id)
                })
                .catch(() => {
                  console.log(json2)
                  if (json2.data?.createDirectMessageUser)
                    this.getNewUser(json2.data.createDirectMessageUser.id)
                })
            }
            const myUserName = user.attributes?.given_name + " " + user.attributes?.family_name
            const createDirectMessageUser1 = API.graphql({
              query: mutations.createDirectMessageUser,
              variables: {
                input: {
                  roomID: json.data?.createDirectMessageRoom?.id,
                  userID: user["username"],
                  userName: myUserName,
                },
              },
              authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
            }) as Promise<GraphQLResult<CreateDirectMessageUserMutation>>

            createDirectMessageUser1.then(addDM2).catch(addDM2)
          })
          .catch((e: any) => {
            console.log(e)
          })
      })
      .catch((e) => {
        console.log(e)
      })
  }
  shouldCreateRoom = (): void => {
    if (this.props.route?.params?.initialUserID)
      if (
        !this.state.data
          .map((item) => {
            if (item && item.room)
              if (item.room.roomType == null || item.room.roomType == "directMessage")
                if (
                  item.room.messageUsers?.items?.length == 2 &&
                  (item.room.messageUsers?.items![0]?.userID ==
                    this.props.route.params.initialUserID ||
                    item.room.messageUsers?.items![1]?.userID ==
                      this.props.route.params.initialUserID)
                ) {
                  console.log("Found")
                  this.setState({
                    currentRoomId: item.roomID,
                  })
                  return true
                }
          })
          .some((z) => {
            return z
          })
      ) {
        console.log("Creating Room")
        if (
          this.props.route.params.initialUserID != null &&
          this.props.route.params.initialUserName != null &&
          this.props.route.params.initialUserID != "null" &&
          this.props.route.params.initialUserName != "null"
        )
          this.createRoom(
            this.props.route.params.initialUserID,
            this.props.route.params.initialUserName
          )
      }
  }

  async getNewUser(id: string): Promise<void> {
    try {
      const json = (await API.graphql({
        query: customQueries.getDirectMessageUser,
        variables: { id: id },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })) as GraphQLResult<GetDirectMessageUserQuery>
      if (json?.data?.getDirectMessageUser) {
        console.log({ "customQueries.getDirectMessageUser": json.data.getDirectMessageUser })
        this.setState({ data: this.state.data.concat([json.data.getDirectMessageUser]) }, () => {
          this.setState({
            currentRoomId: json.data?.getDirectMessageUser?.roomID ?? null,
          })
        })
      }
    } catch (err) {
      console.error(err)
    }
  }

  async getInitialData(next: string | null): Promise<void> {
    try {
      const user = (await Auth.currentAuthenticatedUser()) as JCCognitoUser
      try {
        const query = { limit: 200, filter: { userID: { eq: user["username"] } }, nextToken: next }
        const json = (await API.graphql({
          query: customQueries.listDirectMessageUsers,
          variables: query,
          authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
        })) as GraphQLResult<ListDirectMessageUsersQuery>
        if (json?.data?.listDirectMessageUsers?.nextToken !== null) {
          console.log({ "customQueries.listDirectMessageUsers": json.data.listDirectMessageUsers })
          this.setState({ data: this.state.data.concat(json.data.listDirectMessageUsers.items) })
          this.getInitialData(json.data.listDirectMessageUsers.nextToken)
        } else if (json?.data?.listDirectMessageUsers) {
          console.log({ "customQueries.listDirectMessageUsers": json.data.listDirectMessageUsers })
          this.setState(
            { data: this.state.data.concat(json.data.listDirectMessageUsers.items) },
            () => {
              this.shouldCreateRoom()
            }
          )
        }
      } catch (json: any) {
        if (json?.data?.listDirectMessageUsers?.nextToken !== null) {
          console.log({ "customQueries.listDirectMessageUsers": json.data.listDirectMessageUsers })
          this.setState({ data: this.state.data.concat(json.data.listDirectMessageUsers.items) })
          this.getInitialData(json.data.listDirectMessageUsers.nextToken)
        } else if (json?.data?.listDirectMessageUsers) {
          console.log({ "customQueries.listDirectMessageUsers": json.data.listDirectMessageUsers })
          this.setState(
            { data: this.state.data.concat(json.data.listDirectMessageUsers.items) },
            () => {
              this.shouldCreateRoom()
            }
          )
        }
        console.error(json)
      }
    } catch (err) {
      console.error(err)
    }
  }

  mapChanged = (): void => {
    this.setState({ showMap: !this.state.showMap })
  }

  getOtherUsers(data: any): { ids: string[]; names: string[] } {
    const ids: string[] = []
    const names: string[] = []
    data.room.messageUsers.items.forEach((user) => {
      if (user.userID !== this.state.currentUser) {
        ids.push(user.userID)
        names.push(user.userName)
      }
    })

    return { ids, names }
  }

  switchRoom(roomId: string): void {
    this.setState({
      currentRoomId: roomId,
    })
  }
  getCurrentRoomRecipients(): string[] {
    const ids: string[] = []
    console.log(this.state.data.filter((x) => x?.roomID == this.state.currentRoomId)[0])
    if (this.state.currentRoomId == null) return []
    this.state.data
      .filter((x) => x?.roomID == this.state.currentRoomId)[0]
      .room?.messageUsers?.items?.forEach((user) => {
        if (user) ids.push(user.userID)
      })
    return ids
  }
  render(): React.ReactNode {
    console.log("ConversationScreen")
    console.log({ StateData: this.state.data })
    return (
      <Container>
        <Content>
          <MyMap type={"no-filters"} visible={this.state.showMap} mapData={[]}></MyMap>
          <Container style={this.styles.style.conversationScreenMainContainer}>
            <Container style={this.styles.style.conversationScreenLeftCard}>
              <Text style={[this.styles.style.eventNameInput, { fontSize: 20, paddingLeft: 30 }]}>
                Direct Messages
              </Text>

              {/*false ? (
                <div>
                  <EditableUsers
                    onChange={(value: any[]) => {
                      this.setState({ newToList: value })
                    }}
                    multiline={false}
                    testID="profile-currentRole"
                    showProfileImages={true}
                    textStyle={this.styles.style.fontFormSmallDarkGrey}
                    inputStyle={this.styles.style.fontFormLargeInput}
                    value={this.state.newToList}
                    isEditable={true}
                  ></EditableUsers>
                </div>
                  ) : null*/}

              {this.state.data != null
                ? this.state.data
                    .filter(
                      (item) =>
                        item?.room?.roomType == "directMessage" || item?.room?.roomType == null
                    )
                    .map((item) => {
                      if (item == null) return
                      const otherUsers = this.getOtherUsers(item)
                      let stringOfNames = ""
                      otherUsers.names.forEach((name, index: number) => {
                        if (otherUsers.names.length === index + 1) {
                          stringOfNames += name
                        } else {
                          stringOfNames += name + ", "
                        }
                      })

                      return (
                        <TouchableOpacity
                          style={{
                            backgroundColor:
                              this.state.currentRoomId == item.roomID ? "#eeeeee" : "unset",
                            width: "100%",
                          }}
                          key={item.id}
                          onPress={() => this.switchRoom(item.roomID)}
                        >
                          <View
                            style={{
                              alignSelf: "stretch",
                              marginLeft: 30,
                              marginRight: 60,
                              paddingTop: 8,
                              borderBottomWidth: 1,
                              borderColor: "rgba(51, 51, 51, .1)",
                              paddingBottom: 8,
                            }}
                          >
                            <Text
                              style={[
                                this.state.currentRoomId == item.roomID
                                  ? { fontWeight: "700" }
                                  : {},
                                {
                                  fontSize: 20,
                                  lineHeight: 25,
                                  fontWeight: "normal",
                                  fontFamily: "Graphik-Regular-App",
                                  display: "flex",
                                  alignItems: "center",
                                },
                              ]}
                            >
                              <ProfileImage
                                user={otherUsers.ids.length === 1 ? otherUsers.ids[0] : null}
                                size="small2"
                              ></ProfileImage>
                              {item?.room?.name ? item.room.name : stringOfNames}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      )
                    })
                : null}
            </Container>
            <Container style={this.styles.style.conversationsScreenRightCard}>
              <MessageBoard
                style="regular"
                roomId={this.state.currentRoomId}
                recipients={this.getCurrentRoomRecipients()}
              ></MessageBoard>
            </Container>
          </Container>
        </Content>
      </Container>
    )
  }
}
