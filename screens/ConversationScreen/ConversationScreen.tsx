import React, { lazy } from 'react';
import { Container, Content } from 'native-base';
import { Text, TouchableOpacity } from 'react-native'
import * as customQueries from '../../src/graphql-custom/queries';
import * as mutations from '../../src/graphql/mutations';
import GRAPHQL_AUTH_MODE from 'aws-amplify-react-native'
import { API, Auth } from 'aws-amplify';

import Header from '../../components/Header/Header'
import MyMap from '../../components/MyMap/MyMap';

import { Image } from 'react-native'
import JCComponent, { JCState } from '../../components/JCComponent/JCComponent';

const MessageBoard = lazy(() => import('../../components/MessageBoard/MessageBoard'));

interface Props {
  navigation?: any
  route?: any

}
interface State extends JCState {
  showMap: boolean
  data: any
  selectedRoom: any
}


export default class ConversationScreen extends JCComponent<Props, State>{
  constructor(props: Props) {
    super(props);
    this.state = {
      ...super.getInitialState(),
      selectedRoom: null,
      showMap: false,
      data: { items: [] }
    }
    console.log(this.props.route.params.initialUser)

    this.getInitialData()
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
          createDirectMessageUser2.then((json3) => { console.log(json3); this.getInitialData(); }).catch((e) => { console.log(e); this.getInitialData(); })
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
    if (!(this.state.data.items.map((item, index) => {
      if ((item.room.messageUsers.items.length == 2) &&
        (item.room.messageUsers.items[0].userID == this.props.route.params.initialUserID || item.room.messageUsers.items[1].userID == this.props.route.params.initialUserID)) {
        console.log("Found")
        this.setState({ selectedRoom: index })
        return true

      }
    }).some((z) => { return z }))) {
      console.log("Creating Room")
      if (this.props.route.params.initialUserID != null && this.props.route.params.initialUserName != null)
        this.createRoom(this.props.route.params.initialUserID, this.props.route.params.initialUserName)
    }

  }
  getInitialData(): void {
    Auth.currentAuthenticatedUser().then((user: any) => {
      const listDirectMessageUsers: any = API.graphql({
        query: customQueries.listDirectMessageUsers,
        variables: { limit: 20, filter: { userID: { eq: user['username'] } }, nextToken: null },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
      });

      listDirectMessageUsers.then((json) => {
        console.log(json)
        this.setState({ data: json.data.listDirectMessageUsers }, this.shouldCreateRoom)
      }).catch((e) => {
        console.log(e)
        this.setState({ data: e.data.listDirectMessageUsers }, this.shouldCreateRoom);
      })

    })
  }

  mapChanged = (): void => {
    this.setState({ showMap: !this.state.showMap })
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

              {this.state.data != null ?
                this.state.data.items.map((item, index) => {
                  console.log({ item })
                  return (
                    <TouchableOpacity style={{ backgroundColor: this.state.selectedRoom == index ? "#eeeeee" : "unset", borderRadius: 10, width: "100%", paddingTop: 8, paddingBottom: 8, display: "flex", alignItems: "center" }} key={item.id} onPress={() => this.setState({ selectedRoom: index })}>
                      <Text style={{ fontSize: 20, lineHeight: 25, fontWeight: "normal", fontFamily: "Graphik-Regular-App", width: "100%", display: "flex", alignItems: "center" }} >
                        <Image style={{ width: "55px", height: "55px", borderRadius: 50, marginRight: 20, marginLeft: 10 }}
                          source={require("../../assets/profile-placeholder.png")} />
                        {item.room.name != null ? item.room.name : "unknown"}
                      </Text>
                    </TouchableOpacity>)
                }) : null}

            </Container>
            <Container style={this.styles.style.detailScreenRightCard}>
              {/*<MessageBoard groupId={this.state.data.id}></MessageBoard>*/}
            </Container>
          </Container>
        </Content>
      </Container >


    );
  }
}
