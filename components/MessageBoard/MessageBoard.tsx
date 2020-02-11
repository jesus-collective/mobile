import { Input, Content, Left, Right, Body, StyleProvider, Container, Card, CardItem, Button, Text } from 'native-base';
import * as React from 'react';
import styles from '../style.js'
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import { Image, TextComponent } from 'react-native'
import Dante from 'Dante2'
import { CreateMessageInput } from '../../src/API'
import * as mutations from '../../src/graphql/mutations';
import * as queries from '../../src/graphql/queries';
import * as subscriptions from '../../src/graphql/subscriptions';
import { GRAPHQL_AUTH_MODE } from '@aws-amplify/api/lib/types';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { Observable as rxObservable, of } from "rxjs";

interface Props {
  groupId: string
  navigation: any
}
interface State {
  data: any,
  created: boolean,
  message: string,
  selfId: String
}
export default class MessageBoard extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      data: null,
      created: false,
      message: "",
      selfId: null
    }
    this.setInitialData(props)
    const subscription: any = API.graphql(
      graphqlOperation(subscriptions.onCreateMessage, { roomId: this.props.groupId })
    )
    subscription.subscribe(
      {
        next: (todoData) => {
          var temp: any = this.state.data
          if (temp===null)
            temp={items:[]}
          if (temp.items == null)
            temp.items = [todoData.value.data.onCreateMessage]
          else
            temp.items = [todoData.value.data.onCreateMessage, ...temp.items]
          this.setState({ data: temp })
        }
      });
  }

  setInitialData(props) {

    if (props.navigation.state.params.create)
      this.setState({ created: false })
    else {

      var messagesByRoom: any = API.graphql({
        query: queries.messagesByRoom,
        variables: { roomId: this.props.groupId, sortDirection: "DESC" },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
      });

      messagesByRoom.then((json) => {
        this.setState({
          created: true,
          data: json.data.messagesByRoom,
          message: ""
        })
      })
    }
  }
  updateInput(value: any) {
    this.setState({ message: value.target.value })
  }
  saveMessage() {
    Auth.currentAuthenticatedUser().then((user: any) => {
      this.setState({ selfId: user.username })
      var z: CreateMessageInput = {
        id: Date.now().toString(),
        content: this.state.message,
        when: Date.now().toString(),
        roomId: this.props.groupId,
        userId: user.username,
        owner: user.username
      }
      var createMessage: any = API.graphql({
        query: mutations.createMessage,
        variables: { input: z },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
      });

      createMessage.then((json: any) => {
        console.log({ "Success mutations.createMessage": json });
        this.setState({ message: "" })
      }).catch((err: any) => {
        console.log({ "Error mutations.createMessage": err });
      })
    })
  }
  render() {

    return (
      (this.state.message != null && this.state.created) ?
        <StyleProvider style={getTheme(material)}>

          <Container style={{ overflow: "visible", width: "100%", flexDirection: 'column', alignItems: 'flex-start', minHeight: 500 }} >

            <Content style={{ overflow: "visible" }}>
              <Input style={{ borderWidth: 1 }} value={this.state.message} onChange={(value: any) => { this.updateInput(value) }}></Input>
              <Card style={{ marginTop: 40, padding: 0, minHeight: 50, overflow: "visible" }}>
                <Button onPress={() => { this.saveMessage() }} bordered style={styles.sliderButton}><Text>Post</Text></Button>
              </Card>
              {this.state.data.items.map((item: any) => {
                return (
                  <Card key={item.id} style={{ backgroundColor: this.state.selfId === item.userId ? "#ff0000" : "0000ff", minHeight: 50 }}>
                    <CardItem>
                      <Left>
                        <Image style={{ margin: 0, padding: 0, width: 40, height: 45 }} source={require("../../assets/profile-placeholder.png")} />
                        <Body>
                          <Text style={styles.fontConnectWithName}>
                            {item.author != null ? item.author.given_name : null} {item.author != null ? item.author.family_name : null}
                          </Text>
                          <Text style={styles.fontConnectWithRole}>
                            {item.author != null ? item.author.currentRole : null}
                          </Text>
                        </Body>
                      </Left>
                      <Right>
                        <Text>{(new Date(parseInt(item.when, 10))).toLocaleString()}</Text>
                      </Right>
                    </CardItem>
                    <CardItem>
                      <Text style={styles.fontConnectWithRole}>{item.content}</Text>
                    </CardItem>
                  </Card>)
              })}
            </Content>

          </Container>
        </StyleProvider>
        : null

    )
  }
}