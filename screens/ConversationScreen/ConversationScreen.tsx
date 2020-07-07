import React from 'react';
import { Container, Content } from 'native-base';
import { Text, TouchableOpacity } from 'react-native'
import * as customQueries from '../../src/graphql-custom/queries';
import * as mutations from '../../src/graphql/mutations';
import GRAPHQL_AUTH_MODE from 'aws-amplify-react-native'
import { API, Auth } from 'aws-amplify';

import Header from '../../components/Header/Header'
import MyMap from '../../components/MyMap/MyMap';

import JCComponent, { JCState } from '../../components/JCComponent/JCComponent';
import ProfileImage from '../../components/ProfileImage/ProfileImage';
import MessageBoard from '../../components/MessageBoard/MessageBoard';
import EditableUsers from '../../components/Forms/EditableUsers'

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

export default class ConversationScreen extends JCComponent<Props, State>{
  constructor(props: Props) {
    super(props);
    this.state = {
      ...super.getInitialState(),
      selectedRoom: null,
      showMap: false,
      data: [],
      currentUser: null,
      currentRoomId: null,
      newToList: []
    }
    console.log(this.props.route.params.initialUser)

    Auth.currentAuthenticatedUser().then((user: any) => { this.setState({ currentUser: user.username }) })

    this.getInitialData(null)
  }
  createRoom = (toUserID: any, toUserName: any): void => {
    console.log("CreateRoom")
    Auth.currentAuthenticatedUser().then((user: any) => {
      const createDirectMessageRoom: any = API.graphql({
        query: mutations.createDirectMessageRoom,
        variables: { input: { name: toUserName } },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
      });
      createDirectMessageRoom.then((json) => {
        console.log({ createDirectMessageRoom: json })
        console.log("createDMUser")
        const addDM2 = (json2) => {
          console.log({ Dm2: json2 })
          const createDirectMessageUser2: any = API.graphql({
            query: mutations.createDirectMessageUser,
            variables: { input: { roomID: json.data.createDirectMessageRoom.id, userID: toUserID } },
            authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
          });
          createDirectMessageUser2.then((json3) => { console.log(json3); this.getInitialData(null); }).catch((e) => { console.log(e); this.getInitialData(null); })
        }
        const createDirectMessageUser1: any = API.graphql({
          query: mutations.createDirectMessageUser,
          variables: { input: { roomID: json.data.createDirectMessageRoom.id, userID: user['username'] } },
          authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
        });

        createDirectMessageUser1.then(addDM2).catch(addDM2)

      }).catch((e) => { console.log(e) })
    }).catch((e) => { console.log(e) })
  }
  shouldCreateRoom = (): void => {
    if (!(this.state.data.map((item, index) => {
      if ((item.room.messageUsers.items.length == 2) &&
        (item.room.messageUsers.items[0].userID == this.props.route.params.initialUserID || item.room.messageUsers.items[1].userID == this.props.route.params.initialUserID)) {
        console.log("Found")
        this.setState({ selectedRoom: index, currentRoomId: this.state.data[index].roomID })
        return true
      }
    }).some((z) => { return z }))) {
      console.log("Creating Room")
      if (this.props.route.params.initialUserID != null && this.props.route.params.initialUserName != null)
        this.createRoom(this.props.route.params.initialUserID, this.props.route.params.initialUserName)
    }

  }
  async getInitialData(next: string): Promise<void> {
    try {
      const user = await Auth.currentAuthenticatedUser();
      try {
        const json: any = await API.graphql({
          query: customQueries.listDirectMessageUsers,
          variables: { limit: 20, filter: { userID: { eq: user['username'] } }, nextToken: next },
          authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
        });
        if (json?.data?.listDirectMessageUsers?.nextToken !== null) {
          console.log(json.data.listDirectMessageUsers)
          this.setState({ data: this.state.data.concat(json.data.listDirectMessageUsers.items) })
          this.getInitialData(json.data.listDirectMessageUsers.nextToken)
        } else if (json?.data?.listDirectMessageUsers) {
          this.setState({ data: this.state.data.concat(json.data.listDirectMessageUsers.items) }, this.shouldCreateRoom)
        }
      } catch (err) {
        console.error(err)
      }
    } catch (err) {
      console.error(err)
    }
  }

  mapChanged = (): void => {
    this.setState({ showMap: !this.state.showMap })
  }

  getOtherUserID(data: any): string | null {

    let out = null;

    data.room.messageUsers.items.forEach(user => {
      if (user.userID !== this.state.currentUser)
        out = user.userID
    });

    return out
  }

  switchRoom(index: number) {
    this.setState({ selectedRoom: index })
    this.setState({ currentRoomId: this.state.data[index].roomID })
  }

  render(): React.ReactNode {
    console.log("ConversationScreen")
    console.log({ StateData: this.state.data })
    return (

      <Container >
        <Header title="Jesus Collective" navigation={this.props.navigation} onMapChange={this.mapChanged} />
        <Content>
          <MyMap type={'no-filters'} visible={this.state.showMap} mapData={[]}></MyMap>
          <Container style={this.styles.style.conversationScreenMainContainer}>
            <Container style={this.styles.style.detailScreenLeftCard}>
              <Text style={this.styles.style.eventNameInput}>Direct Messages</Text>

              {true ?
                <div>
                  <EditableUsers
                    onChange={(value: any[]) => { this.setState({ newToList: value }) }}
                    multiline={false}
                    data-testid="profile-currentRole"
                    showProfileImages={true}
                    textStyle={this.styles.style.fontFormSmallDarkGrey}
                    inputStyle={this.styles.style.fontFormLargeInput}
                    value={this.state.newToList} isEditable={true}></EditableUsers>

                </div>
                : null
              }

              {this.state.data != null ?
                this.state.data.map((item, index) => {
                  return (
                    <TouchableOpacity style={{ backgroundColor: this.state.selectedRoom == index ? "#eeeeee" : "unset", borderRadius: 10, width: "100%", paddingTop: 8, paddingBottom: 8, display: "flex", alignItems: "center" }} key={item.id} onPress={() => this.switchRoom(index)}>
                      <Text style={{ fontSize: 20, lineHeight: 25, fontWeight: "normal", fontFamily: "Graphik-Regular-App", width: "100%", display: "flex", alignItems: "center" }} >
                        <ProfileImage user={this.getOtherUserID(item)} size="small"></ProfileImage>
                        {item.room.name != null ? item.room.name : "unknown"}
                      </Text>
                    </TouchableOpacity>)
                }) : null}
            </Container>
            <Container style={this.styles.style.detailScreenRightCard}>
              <MessageBoard roomId={this.state.currentRoomId}></MessageBoard>
            </Container>
          </Container>
        </Content>
      </Container >


    );
  }
}
