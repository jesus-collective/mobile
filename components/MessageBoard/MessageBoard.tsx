import { Content, Left, Right, Body, StyleProvider, Container, Card, CardItem, Badge, Label } from 'native-base';
import * as React from 'react';
import { Text, View, TextInput } from 'react-native'
import JCButton, { ButtonTypes } from '../../components/Forms/JCButton'

import getTheme from '../../native-base-theme/components';
import { TouchableOpacity } from 'react-native'
import { CreateMessageInput, CreateDirectMessageInput } from '../../src/API'
import * as mutations from '../../src/graphql/mutations';
import * as queries from '../../src/graphql/queries';
import * as subscriptions from '../../src/graphql/subscriptions';
import GRAPHQL_AUTH_MODE from 'aws-amplify-react-native'
import { API, graphqlOperation, Auth, Storage } from 'aws-amplify';
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
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

interface Props {
  groupId?: string
  roomId?: string
  route?: any
  navigation?: any
}
interface State extends JCState {
  data: any,
  dmAuthors: any,
  created: boolean,
  UserDetails: any,
  textHeight: any,
  editorState: any,
  attachment: string,
  attachmentName: string,
  fileNameWidth: number
}
class MessageBoardImpl extends JCComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      ...super.getInitialState(),
      data: null,
      dmAuthors: null,
      created: false,
      UserDetails: null,
      textHeight: 10,
      editorState: EditorState.createEmpty(),
      attachment: null,
      attachmentName: null,
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

    const subscription2: any = API.graphql(
      graphqlOperation(subscriptions.onCreateDirectMessage, { messageRoomID: this.props.roomId })
    )
    subscription2.subscribe(
      {
        next: (todoData) => {
          let temp: any = this.state.data
          if (temp === null)
            temp = { items: [] }
          if (temp.items == null)
            temp.items = [todoData.value.data.onCreateDirectMessage]
          else
            temp.items = [todoData.value.data.onCreateDirectMessage, ...temp.items]
          this.setState({ data: temp })
        }
      });
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props !== prevProps) {
      this.setInitialData(this.props)
    }
  }

  async handleUpload(e: React.ChangeEvent<HTMLInputElement>): Promise<void> {
    const file = e.target.files[0];
    try {
      const user = await Auth.currentCredentials();
      const userId = user.identityId
      const fn = 'messages/uploads/' + 'jc-upload-' + new Date().getTime() + '-' + file.name

      const upload = await Storage.put(fn, file, {
        level: 'protected',
        contentType: file.type,
        identityId: userId
      })
      if (upload) {
        console.log('jon')
        this.setState({ attachment: fn })
      }
    } catch (e) {
      console.error(e)
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
      const directMessagesByRoom: any = API.graphql({
        query: queries.directMessagesByRoom,
        variables: { messageRoomID: this.props.roomId, sortDirection: "DESC" },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
      });
      const processMessages = (json) => {
        console.log(json)
        this.setState({
          created: true,
          data: json.data.directMessagesByRoom,
        })
      }
      directMessagesByRoom.then(processMessages).catch(processMessages)
    }
  }

  renderFileDownloadBadge(item): React.ReactNode {
    return <TouchableOpacity onPress={() => this.getAttachment(item.attachment)}>
      <Badge style={{ backgroundColor: '#EFF1F5', marginRight: 10, marginTop: 5, height: 30 }} >
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          {this.renderFileIcon(item.attachment)}
          <Text style={{ fontSize: 18, paddingHorizontal: 10 }}>{item.attachmentName ? item.attachmentName : this.processFileName(item.attachment)}</Text>
        </View>
      </Badge>
    </TouchableOpacity>
  }

  renderFileUploadBadge(item): React.ReactNode {
    return <View>
      <Badge style={{ backgroundColor: '#EFF1F5', marginRight: 10, marginTop: 5, height: 30 }} >
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          {this.renderFileIcon(item.attachment)}
          <TextInput placeholder='custom filename (optional)' style={{ fontSize: 14, paddingHorizontal: 10, width: 200 }} value={this.state.attachmentName} onChange={e => this.setState({ attachmentName: e.nativeEvent.text })}></TextInput>
          <TouchableOpacity onPress={() => this.setState({ attachment: null, attachmentName: null })}>
            <AntDesign name="close" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </Badge>
      <Label style={{ fontSize: 12, marginLeft: 10 }}>{this.processFileName(item.attachment)}</Label>
    </View>
  }

  renderFileIcon(filePath: string): React.ReactNode {
    const lastDot = filePath.lastIndexOf('.');
    const ext = filePath.substring(lastDot + 1);

    if (ext === 'pdf' || ext === 'PDF') {
      return <FontAwesome5 name="file-pdf" size={22} color="black" />
    }

    if (ext === 'doc' || ext === 'docx') {
      return <FontAwesome5 name="file-word" size={22} color="black" />
    }

    if (ext === 'ppt' || ext === 'pptx') {
      return <FontAwesome5 name="file-powerpoint" size={22} color="black" />
    }

    if (ext === 'xls' || ext === 'xlsx') {
      return <FontAwesome5 name="file-excel" size={22} color="black" />
    }

    return null
  }

  processFileName(filePath: string): string {
    const urlStripped = filePath.split('messages/uploads/')[1]
    const lastDash = urlStripped.lastIndexOf('-');
    const fileName = urlStripped.substring(lastDash + 1);
    return fileName
  }

  async getAttachment(filePath: string): Promise<void> {
    try {

      const user = await Auth.currentCredentials();
      const userId = user.identityId

      const res = await Storage.get(filePath, {
        level: 'protected',
        identityId: userId
      })

      window.open(res as string, '_blank', 'noopener noreferrer')

    } catch (e) {
      console.error(e)
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

    if (!this.state.editorState.getCurrentContent().hasText()) {
      return
    }

    const message = JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()))
    Auth.currentAuthenticatedUser().then((user: any) => {
      if (this.props.groupId) {
        const z: CreateMessageInput = {
          id: Date.now().toString(),
          content: message,
          when: Date.now().toString(),
          attachment: this.state.attachment,
          attachmentName: this.state.attachmentName,
          roomId: this.props.groupId,
          userId: user.username,
          owner: user.username,
          //authorOrgId: "0"
        }
        const createMessage: any = API.graphql({
          query: mutations.createMessage,
          variables: { input: z },
          authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
        });

        createMessage.then((json: any) => {
          console.log({ "Success mutations.createMessage": json });
          this.setState({

            editorState: EditorState.createEmpty(),
            attachmentName: null,
            attachment: null
          })
        }).catch((err: any) => {
          console.log({ "Error mutations.createMessage": err });
          if (err.data.createMessage) {
            this.setState({
              editorState: EditorState.createEmpty(),
              attachmentName: null,
              attachment: null
            })
          }
        })
      }

      else if (this.props.roomId) {
        const dm: CreateDirectMessageInput = {
          id: Date.now().toString(),
          userId: user.username,
          content: message,
          attachment: this.state.attachment,
          attachmentName: this.state.attachmentName,
          when: Date.now().toString(),
          messageRoomID: this.props.roomId
        }
        const createDirectMessage: any = API.graphql({
          query: mutations.createDirectMessage,
          variables: { input: dm },
          authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
        });

        createDirectMessage.then((json: any) => {
          console.log({ "Success mutations.createDirectMessage ": json });
          this.setState({
            editorState: EditorState.createEmpty(),
            attachmentName: null,
            attachment: null
          })
        }).catch((err: any) => {
          console.log({ "Error mutations.createDirectMessage ": err });
          if (err.data.createDirectMessage) {
            this.setState({
              editorState: EditorState.createEmpty(),
              attachmentName: null,
              attachment: null
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
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                {this.state.attachment ? this.renderFileUploadBadge(this.state) : null}
                <View style={{ marginRight: 10 }}>
                  <JCButton buttonType={ButtonTypes.SolidRightJustified} onPress={() => { null }}><AntDesign name="clouduploado" size={16} color="white" style={{ marginRight: 5 }} />Share a file</JCButton>
                  <input multiple={false} style={{ cursor: 'pointer', width: '100%', height: '100%', position: "absolute", top: "0px", right: "0px", opacity: "0" }} type="file" accept='.pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx' onChange={(e) => this.handleUpload(e)} />
                </View>
                <JCButton buttonType={ButtonTypes.SolidRightJustified} onPress={() => { this.saveMessage() }} >Post</JCButton>
              </View>

            </Content>
            {this.props.groupId && this.state.data.items.map((item: any) => {
              return (
                <Card key={item.id} style={{ borderRadius: 10, minHeight: 50, marginBottom: 35, borderColor: "#ffffff" }}>
                  <CardItem style={this.styles.style.eventPageMessageBoard}>
                    <Left style={this.styles.style.eventPageMessageBoardLeft}>
                      <TouchableOpacity key={item.id} onPress={() => { this.showProfile(item.author.id) }}>
                        <ProfileImage size="small" user={item.owner ? item.owner : null}></ProfileImage>
                      </TouchableOpacity>
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
                  {item.attachment ? <CardItem>
                    {this.renderFileDownloadBadge(item)}
                  </CardItem> : null}
                </Card>

              )
            })}

            {this.props.roomId && this.state.data.items.map((item: any) => {
              if (!item?.author) {
                return null
              }
              return (
                <Card key={item.id} style={{ borderRadius: 10, minHeight: 50, marginBottom: 35, borderColor: "#ffffff" }}>
                  <CardItem style={this.styles.style.eventPageMessageBoard}>
                    <Left style={this.styles.style.eventPageMessageBoardLeft}>
                      <TouchableOpacity key={item.id} onPress={() => { this.showProfile(item.author.id) }}>
                        <ProfileImage size="small" user={item.author?.id ?? null}></ProfileImage>
                      </TouchableOpacity>
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
                  {item.attachment ?
                    <CardItem>
                      {this.renderFileDownloadBadge(item)}
                    </CardItem> : null}

                </Card>
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
