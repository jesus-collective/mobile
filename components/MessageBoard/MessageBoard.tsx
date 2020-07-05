import { Content, Left, Right, Body, StyleProvider, Container, Card, CardItem } from 'native-base';
import * as React from 'react';
import { Text } from 'react-native'
import JCButton, { ButtonTypes } from '../../components/Forms/JCButton'

import getTheme from '../../native-base-theme/components';
import { TouchableOpacity } from 'react-native'
import { CreateMessageInput } from '../../src/API'
import * as mutations from '../../src/graphql/mutations';
import * as queries from '../../src/graphql/queries';
import * as subscriptions from '../../src/graphql/subscriptions';
import GRAPHQL_AUTH_MODE from 'aws-amplify-react-native'
import { API, graphqlOperation, Auth } from 'aws-amplify';
import ProfileImage from '../../components/ProfileImage/ProfileImage'
import { Editor } from 'react-draft-wysiwyg';
import './react-draft-wysiwyg.css';
//TODO FIGURE OUT WHY THIS DOESN"T WORK
import './MessageBoard.css';
import { useNavigation } from '@react-navigation/native'
import { useRoute } from '@react-navigation/native'
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import JCComponent, { JCState } from '../JCComponent/JCComponent';

interface Props {
  groupId?: string
  roomId?: string
  route?: any
  navigation?: any
}
interface State extends JCState {
  data: any,
  created: boolean,

  UserDetails: any,
  textHeight: any,
  editorState: any
}
class MessageBoardImpl extends JCComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      ...super.getInitialState(),
      data: null,
      created: false,
      UserDetails: null,
      textHeight: 10,
      editorState: EditorState.createEmpty()
    }

    this.setInitialData(props)

    if (this.props.groupId) {
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
      console.log({ errorLoadingUser: e })
    }
    if (props.route.params.create === "true" || props.route.params.create === true) {
      this.setState({ created: false })
    }
    else if (this.props.groupId) {

      const messagesByRoom: any = API.graphql({
        query: queries.messagesByRoom,
        variables: { roomId: this.props.groupId, sortDirection: "DESC" },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
      });
      const processMessages = (json) => {
        console.log({ process: json })
        this.setState({
          created: true,
          data: json.data.messagesByRoom,

        })
      }
      messagesByRoom.then(processMessages).catch(processMessages)

    } else if (this.props.roomId) {
      /*const messagesByRoom: any = API.graphql({
        query: queries.messagesByRoom,
        variables: { roomId: this.props.groupId, sortDirection: "DESC" },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
      });
      const processMessages = (json) => {
        console.log({ process: json })
        this.setState({
          created: true,
          data: json.data.messagesByRoom,

        })
      }
      messagesByRoom.then(processMessages).catch(processMessages)*/
    }
  }
  updateEditorInput(value: any) {
    this.setState({ editorState: value })
  }
  convertCommentFromJSONToHTML = (text) => {
    try {
      return stateToHTML(convertFromRaw(JSON.parse(text)))
    } catch (e) {
      console.log({ errorMessage: e })
      return "<div>Message Can't Be Displayed</div>"
    }
  }
  saveMessage() {
    const message = JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()))
    Auth.currentAuthenticatedUser().then((user: any) => {
      const z: CreateMessageInput = {
        id: Date.now().toString(),
        content: message,
        when: Date.now().toString(),
        roomId: this.props.groupId,
        userId: user.username,
        owner: user.username,
        authorOrgId: "0"
      }

      if (this.props.groupId) {
        const createMessage: any = API.graphql({
          query: mutations.createMessage,
          variables: { input: z },
          authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
        });

        createMessage.then((json: any) => {
          console.log({ "Success mutations.createMessage": json });
          this.setState({

            editorState: EditorState.createEmpty()
          })
        }).catch((err: any) => {
          console.log({ "Error mutations.createMessage": err });
          if (err.data.createMessage) {
            this.setState({
              editorState: EditorState.createEmpty()
            })
          }
        })
      }

    })
  }
  showProfile(id) {
    console.log("Navigate to profileScreen")
    this.props.navigation.push("ProfileScreen", { id: id, create: false });
  }
  render() {

    if (this.props.groupId && this.props.roomId) {
      console.error('groupId and roomId cannot be used together')
      return null
    }

    return (
      (this.state.created) ?

        <StyleProvider style={getTheme()}>
          <Container style={this.styles.style.messageBoardContainer} >

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

                toolbar={{
                  options: ['inline', 'list', 'emoji'],
                  inline: {
                    options: ['bold', 'italic', 'underline']
                  },
                  list: {
                    options: ['unordered', 'ordered']
                  },
                  emoji: {
                    popupClassName: "customEmojiModal"
                  }
                }}

              />
              <JCButton buttonType={ButtonTypes.SolidRightJustified} onPress={() => { this.saveMessage() }} >Post</JCButton>

            </Content>

            {this.state.data.items.map((item: any) => {
              return (
                <TouchableOpacity key={item.id} onPress={() => { this.showProfile(item.author.id) }}>
                  <Card key={item.id} style={{ borderRadius: 10, minHeight: 50, marginBottom: 35, borderColor: "#ffffff" }}>
                    <CardItem style={this.styles.style.eventPageMessageBoard}>
                      <Left style={this.styles.style.eventPageMessageBoardLeft}>
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
                    <CardItem style={this.styles.style.eventPageMessageBoardInnerCard}>

                      <div id="comment-div">
                        <div dangerouslySetInnerHTML={{ __html: this.convertCommentFromJSONToHTML(item.content) }}></div>
                      </div>

                    </CardItem>
                  </Card>
                </TouchableOpacity>

              )
            })}
          </Container>
        </StyleProvider >
        : null
    )
  }
}
export default function MessageBoard(props: Props): JSX.Element {
  const route = useRoute();
  const navigation = useNavigation()
  return <MessageBoardImpl {...props} navigation={navigation} route={route} />;
}
