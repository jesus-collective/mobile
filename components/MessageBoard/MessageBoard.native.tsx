import { Content, Left, Right, Body, StyleProvider, Container, Card, CardItem } from 'native-base';
import * as React from 'react';
import { Text } from 'react-native'
import JCButton, { ButtonTypes } from '../../components/Forms/JCButton'

import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import { TouchableOpacity } from 'react-native'
import { CreateMessageInput } from '../../src/API'
import * as mutations from '../../src/graphql/mutations';
import * as queries from '../../src/graphql/queries';
import * as subscriptions from '../../src/graphql/subscriptions';
import GRAPHQL_AUTH_MODE from 'aws-amplify-react-native'
import { API, graphqlOperation, Auth, Storage } from 'aws-amplify';
import ProfileImage from '../../components/ProfileImage/ProfileImage'
import { Editor } from 'react-draft-wysiwyg';
//import './react-draft-wysiwyg.css';
//TODO FIGURE OUT WHY THIS DOESN"T WORK
//import './MessageBoard.css';
import { v1 as uuidv1 } from 'uuid';
import ErrorBoundary from '../ErrorBoundry';
import { useRoute, useNavigation } from '@react-navigation/native';
import JCComponent from '../JCComponent/JCComponent';


interface Props {
  groupId: string
  navigation?: any
  route?: any
}
interface State {
  data: any,
  created: boolean,
  message: string,
  UserDetails: any,
  textHeight: any,
  editorState: any
}
class MessageBoardImpl extends JCComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      data: null,
      created: false,
      message: "",
      UserDetails: null,
      textHeight: 10,
      editorState: null
    }
    this.setInitialData(props)
    const subscription: any = API.graphql(
      graphqlOperation(subscriptions.onCreateMessage, { roomId: this.props.groupId })
    )
    subscription.subscribe(
      {
        next: (todoData) => {
          let temp: any = this.state.data
          if (temp === null)
            temp = { items: [] }
          if (temp.items == null)
            temp.items = [todoData.value.data.onCreateMessage]
          else
            temp.items = [todoData.value.data.onCreateMessage, ...temp.items]
          this.setState({ data: temp })
        }
      });
  }

  async setInitialData(props) {
    const user = await Auth.currentAuthenticatedUser();
    try {
      const getUser: any = await API.graphql(graphqlOperation(queries.getUser, { id: user['username'] }));
      this.setState({
        UserDetails: getUser.data.getUser
      })
      // console.log(this.state.UserDetails)
    }
    catch (e) {
      console.log(e)
    }

    if (props.route.params.create === "true" || props.route.params.create === true)
      this.setState({ created: false })
    else {

      const messagesByRoom: any = API.graphql({
        query: queries.messagesByRoom,
        variables: { roomId: this.props.groupId, sortDirection: "DESC" },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
      });
      const processMessages = (json) => {
        //  console.log(json)
        this.setState({
          created: true,
          data: json.data.messagesByRoom,
          message: ""
        })
      }
      messagesByRoom.then(processMessages).catch(processMessages)

    }
  }
  updateEditorInput(value: any) {
    this.setState({ editorState: value })
  }
  updateInput(value: any) {
    this.setState({ message: JSON.stringify(value) })
  }
  saveMessage() {
    Auth.currentAuthenticatedUser().then((user: any) => {
      const z: CreateMessageInput = {
        id: Date.now().toString(),
        content: this.state.message,
        when: Date.now().toString(),
        roomId: this.props.groupId,
        userId: user.username,
        owner: user.username,
        authorOrgId: "0"
      }
      const createMessage: any = API.graphql({
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
  showProfile(id) {
    console.log("Navigate to profileScreen")
    this.props.navigation.push("ProfileScreen", { id: id, create: false });
  }
  render() {

    return (
      (this.state.message != null && this.state.created) ?
        <ErrorBoundary>
          <StyleProvider style={getTheme(material)}>
            <Container style={this.styles.style.nativeMessageBoardContainer} >
              <Content style={{ marginBottom: 40 }}>

                {
                  this.state.UserDetails != null ?
                    <ProfileImage size="small" user={this.state.UserDetails}></ProfileImage>
                    : null
                }
                <Editor
                  placeholder="Write a message..."
                  editorState={this.state.editorState}
                  toolbarClassName="customToolbar"
                  wrapperClassName="customWrapperSendmessage"
                  editorClassName="customEditorSendmessage"
                  onEditorStateChange={(z) => { this.updateEditorInput(z) }}
                  onContentStateChange={(z) => { this.updateInput(z) }}
                  toolbar={{
                    options: ['inline', 'list'],
                    inline: {
                      options: ['bold', 'italic', 'underline']
                    },
                    list: {
                      options: ['unordered', 'ordered']
                    }
                  }}

                />
                <JCButton buttonType={ButtonTypes.SolidRightJustified} onPress={() => { this.saveMessage() }} >Post</JCButton>

              </Content>





              {this.state.data.items.map((item: any) => {
                return (
                  <TouchableOpacity key={item.id} onPress={() => { this.showProfile(item.author.id) }}>
                    <Card key={item.id} style={{ borderRadius: 10, minHeight: 50, marginBottom: 35, borderColor: "#ffffff" }}>
                      <CardItem style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0, borderTopLeftRadius: 10, borderTopRightRadius: 10, backgroundColor: "#F9FAFC" }}>
                        <Left>
                          <ProfileImage size="small" user={item.owner ? item.owner : null}></ProfileImage>
                          <Body>
                            <Text style={this.styles.style.groupFormName}>
                              {item.author != null ? item.author.given_name : null} {item.author != null ? item.author.family_name : null}
                            </Text>
                            <Text style={this.styles.style.groupFormRole}>
                              {item.author != null ? item.author.currentRole : null}
                            </Text>
                          </Body>
                        </Left>
                        <Right>
                          <Text style={this.styles.style.groupFormDate}>{(new Date(parseInt(item.when, 10))).toLocaleString()}</Text>
                        </Right>
                      </CardItem>
                      <CardItem style={{ marginTop: 0, paddingTop: 0, paddingBottom: 0, borderTopLeftRadius: 0, borderTopRightRadius: 0, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, backgroundColor: "#ffffff" }}>

                        <Editor
                          readOnly
                          toolbarHidden
                          initialContentState={JSON.parse(item.content)}
                          toolbarClassName="customToolbar"
                          wrapperClassName="customWrapper"
                          editorClassName="customEditor"
                        />
                      </CardItem>
                    </Card>
                  </TouchableOpacity>)
              })}


            </Container>
          </StyleProvider >
        </ErrorBoundary>
        : null

    )
  }
}
export default function MessageBoard(props) {
  const route = useRoute();
  const navigation = useNavigation()
  return <MessageBoardImpl {...props} navigation={navigation} route={route} />;
}
