import { Input, Content, Left, Right, Body, StyleProvider, Container, Card, CardItem } from 'native-base';
import * as React from 'react';
import { Text } from 'react-native'
import JCButton, { ButtonTypes } from '../../components/Forms/JCButton'
import styles from '../style'
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import { Image, TextComponent, TouchableOpacity } from 'react-native'
import { CreateMessageInput } from '../../src/API'
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
import { v1 as uuidv1 } from 'uuid';
import ErrorBoundary from '../ErrorBoundry';
import { useNavigation } from '@react-navigation/native'
import { useRoute } from '@react-navigation/native'
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

interface Props {
  groupId: string
  route: any
  navigation: any
}
interface State {
  data: any,
  created: boolean,

  UserDetails: any,
  textHeight: any,
  editorState: any
}
class MessageBoard extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      data: null,
      created: false,
      UserDetails: null,
      textHeight: 10,
      editorState: EditorState.createEmpty()
    }

    this.setInitialData(props)
    const subscription: any = API.graphql(
      graphqlOperation(subscriptions.onCreateMessage, { roomId: this.props.groupId })
    )
    subscription.subscribe(
      {
        next: (todoData) => {
          var temp: any = this.state.data
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
    var user = await Auth.currentAuthenticatedUser();
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
    if (props.route.params.create === "true") {
      this.setState({ created: false })
    }
    else {

      var messagesByRoom: any = API.graphql({
        query: queries.messagesByRoom,
        variables: { roomId: this.props.groupId, sortDirection: "DESC" },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
      });
      var processMessages = (json) => {
        console.log({ process: json })
        this.setState({
          created: true,
          data: json.data.messagesByRoom,

        })
      }
      messagesByRoom.then(processMessages).catch(processMessages)

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
    var message = JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()))
    Auth.currentAuthenticatedUser().then((user: any) => {
      var z: CreateMessageInput = {
        id: Date.now().toString(),
        content: message,
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
        this.setState({

          editorState: EditorState.createEmpty()
        })
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
      (this.state.created) ?

        <StyleProvider style={getTheme(material)}>
          <Container style={{ display: "inline", overflow: "visible", width: "100%", paddingTop: 30, paddingLeft: 30, paddingRight: 30, marginBottom: 60 }} >

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
                  image: {
                    uploadCallback: async (z1) => {
                      var id = uuidv1()

                      var upload = await Storage.put("messages/" + id + ".png", z1, {
                        level: 'protected',
                        contentType: z1.type,
                      })
                      var download = await Storage.get("messages/" + id + ".png", {
                        level: 'protected',
                        contentType: z1.type,
                        identityId: this.state.UserDetails.profileImage ? this.state.UserDetails.profileImage : ""
                      })
                      return { data: { link: download } }
                    },
                    previewImage: true,
                    alt: { present: true, mandatory: true },
                    defaultSize: {
                      height: 'auto',
                      width: 'auto',
                    }
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
                        <ProfileImage size="small" user={item.author}></ProfileImage>
                        <Body>
                          <Text style={styles.groupFormName}>
                            {item.author != null ? item.author.given_name : null} {item.author != null ? item.author.family_name : null}
                          </Text>
                          <Text style={styles.groupFormRole}>
                            {item.author != null ? item.author.currentRole : null}
                          </Text>
                        </Body>
                      </Left>
                      <Right>
                        <Text style={styles.groupFormDate}>{(new Date(parseInt(item.when, 10))).toLocaleString()}</Text>
                      </Right>
                    </CardItem>
                    <CardItem style={{ marginTop: 0, paddingTop: 0, paddingBottom: 0, borderTopLeftRadius: 0, borderTopRightRadius: 0, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, backgroundColor: "#ffffff" }}>

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
export default function (props) {
  const route = useRoute();
  const navigation = useNavigation()
  return <MessageBoard {...props} navigation={navigation} route={route} />;
}
