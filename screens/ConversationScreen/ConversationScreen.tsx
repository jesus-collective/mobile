import { API, Auth } from "aws-amplify"
import GRAPHQL_AUTH_MODE from "aws-amplify-react-native"
import { Container, Content } from "native-base"
import React from "react"
import { Text, TouchableOpacity } from "react-native"
import EditableUsers from "../../components/Forms/EditableUsers"
import Header from "../../components/Header/Header"
import JCComponent, { JCState } from "../../components/JCComponent/JCComponent"
import MessageBoard from "../../components/MessageBoard/MessageBoard"
import MyMap from "../../components/MyMap/MyMap"
import ProfileImage from "../../components/ProfileImage/ProfileImage"
import * as customQueries from "../../src/graphql-custom/queries"
import * as mutations from "../../src/graphql/mutations"

interface Props {
  navigation?: any
  route?: any
}
interface State extends JCState {
  newToList: any[]
  showMap: boolean
  data: any
  selectedRoom: any
  currentUser: string
  currentRoomId: string
}

export default class ConversationScreen extends JCComponent<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      ...super.getInitialState(),
      selectedRoom: null,
      showMap: false,
      data: [],
      currentUser: null,
      currentRoomId: null,
      newToList: [],
    }
    console.log(this.props.route.params.initialUser)

    Auth.currentAuthenticatedUser().then((user: any) => {
      this.setState({ currentUser: user.username })
    })

    this.getInitialData(null)
  }
  createRoom = (toUserID: string, toUserName: string): void => {
    console.log("CreateRoom")
    Auth.currentAuthenticatedUser()
      .then((user: any) => {
        const createDirectMessageRoom: any = API.graphql({
          query: mutations.createDirectMessageRoom,
          variables: { input: { name: "", roomType: "directMessage" } },
          authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
        })
        createDirectMessageRoom
          .then((json) => {
            console.log({ createDirectMessageRoom: json })
            console.log("createDMUser")
            const addDM2 = (json2) => {
              console.log({ Dm2: json2 })
              const createDirectMessageUser2: any = API.graphql({
                query: mutations.createDirectMessageUser,
                variables: {
                  input: {
                    roomID: json.data.createDirectMessageRoom.id,
                    userID: toUserID,
                    userName: toUserName,
                  },
                },
                authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
              })
              createDirectMessageUser2
                .then(() => {
                  console.log(json2)
                  this.getNewUser(json2.data.createDirectMessageUser.id)
                })
                .catch(() => {
                  console.log(json2)
                  this.getNewUser(json2.data.createDirectMessageUser.id)
                })
            }
            const myUserName = user.attributes["given_name"] + " " + user.attributes["family_name"]
            const createDirectMessageUser1: any = API.graphql({
              query: mutations.createDirectMessageUser,
              variables: {
                input: {
                  roomID: json.data.createDirectMessageRoom.id,
                  userID: user["username"],
                  userName: myUserName,
                },
              },
              authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
            })

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
    if (
      !this.state.data
        .map((item, index: number) => {
          if (item.room.roomType == null || item.room.roomType == "directMessage")
            if (
              item.room.messageUsers.items.length == 2 &&
              (item.room.messageUsers.items[0].userID == this.props.route.params.initialUserID ||
                item.room.messageUsers.items[1].userID == this.props.route.params.initialUserID)
            ) {
              console.log("Found")
              this.setState({ selectedRoom: index, currentRoomId: this.state.data[index].roomID })
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
      const json: any = await API.graphql({
        query: customQueries.getDirectMessageUser,
        variables: { id: id },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })
      if (json?.data?.getDirectMessageUser) {
        console.log({ "customQueries.getDirectMessageUser": json.data.getDirectMessageUser })
        this.setState({ data: this.state.data.concat([json.data.getDirectMessageUser]) }, () => {
          const index = this.state.data.indexOf(json.data.getDirectMessageUser)
          this.setState({ selectedRoom: index, currentRoomId: this.state.data[index].roomID })
        })
      }
    } catch (err) {
      console.error(err)
    }
  }

  async getInitialData(next: string): Promise<void> {
    try {
      const user = await Auth.currentAuthenticatedUser()
      try {
        const query = { limit: 20, filter: { userID: { eq: user["username"] } }, nextToken: next }
        const json: any = await API.graphql({
          query: customQueries.listDirectMessageUsers,
          variables: query,
          authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
        })
        if (json?.data?.listDirectMessageUsers?.nextToken !== null) {
          console.log({ "customQueries.listDirectMessageUsers": json.data.listDirectMessageUsers })
          this.setState({ data: this.state.data.concat(json.data.listDirectMessageUsers.items) })
          this.getInitialData(json.data.listDirectMessageUsers.nextToken)
        } else if (json?.data?.listDirectMessageUsers) {
          console.log({ "customQueries.listDirectMessageUsers": json.data.listDirectMessageUsers })
          this.setState(
            { data: this.state.data.concat(json.data.listDirectMessageUsers.items) },
            this.shouldCreateRoom
          )
        }
      } catch (json) {
        if (json?.data?.listDirectMessageUsers?.nextToken !== null) {
          console.log({ "customQueries.listDirectMessageUsers": json.data.listDirectMessageUsers })
          this.setState({ data: this.state.data.concat(json.data.listDirectMessageUsers.items) })
          this.getInitialData(json.data.listDirectMessageUsers.nextToken)
        } else if (json?.data?.listDirectMessageUsers) {
          console.log({ "customQueries.listDirectMessageUsers": json.data.listDirectMessageUsers })
          this.setState(
            { data: this.state.data.concat(json.data.listDirectMessageUsers.items) },
            this.shouldCreateRoom
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
    const ids = []
    const names = []
    data.room.messageUsers.items.forEach((user) => {
      if (user.userID !== this.state.currentUser) {
        ids.push(user.userID)
        names.push(user.userName)
      }
    })

    return { ids, names }
  }

  switchRoom(index: number): void {
    this.setState({ selectedRoom: index })
    this.setState({ currentRoomId: this.state.data[index].roomID })
  }
  getCurrentRoomRecipients(): string[] {
    const ids = []
    console.log(this.state.data[this.state.selectedRoom])
    this.state.data[this.state.selectedRoom]?.room?.messageUsers?.items.forEach((user) => {
      ids.push(user.userID)
    })
    return ids
  }
  render(): React.ReactNode {
    console.log("ConversationScreen")
    console.log({ StateData: this.state.data })
    return (
      <Container>
        <Header
          title="Jesus Collective"
          navigation={this.props.navigation}
          onMapChange={this.mapChanged}
        />
        <Content>
          <MyMap type={"no-filters"} visible={this.state.showMap} mapData={[]}></MyMap>
          <Container style={this.styles.style.conversationScreenMainContainer}>
            <Container style={this.styles.style.conversationScreenLeftCard}>
              <Text style={this.styles.style.eventNameInput}>Direct Messages</Text>

              {false ? (
                <div>
                  <EditableUsers
                    onChange={(value: any[]) => {
                      this.setState({ newToList: value })
                    }}
                    multiline={false}
                    data-testid="profile-currentRole"
                    showProfileImages={true}
                    textStyle={this.styles.style.fontFormSmallDarkGrey}
                    inputStyle={this.styles.style.fontFormLargeInput}
                    value={this.state.newToList}
                    isEditable={true}
                  ></EditableUsers>
                </div>
              ) : null}

              {this.state.data != null
                ? this.state.data
                    .filter(
                      (item) => item.room.roomType == "directMessage" || item.room.roomType == null
                    )
                    .map((item, index: number) => {
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
                            backgroundColor: this.state.selectedRoom == index ? "#eeeeee" : "unset",
                            borderRadius: 10,
                            width: "100%",
                            paddingTop: 8,
                            paddingBottom: 8,
                            display: "flex",
                            alignItems: "center",
                          }}
                          key={item.id}
                          onPress={() => this.switchRoom(index)}
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
                            {item.room.name ? item.room.name : stringOfNames}
                          </Text>
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
