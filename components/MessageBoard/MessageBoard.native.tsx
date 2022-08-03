import { useNavigation, useRoute } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { API, Auth, graphqlOperation } from "aws-amplify"
import * as React from "react"
import { Editor } from "react-draft-wysiwyg"
import { ScrollView, Text, TouchableOpacity, View } from "react-native"
import { Data } from "../../components/Data/Data"
import JCButton, { ButtonTypes } from "../../components/Forms/JCButton"
import ProfileImage from "../../components/ProfileImage/ProfileImage"
import { CreateMessageInput, ModelSortDirection } from "../../src/API"
import * as subscriptions from "../../src/graphql/subscriptions"
import { JCCognitoUser } from "../../src/types"
//import './react-draft-wysiwyg.css';
//TODO FIGURE OUT WHY THIS DOESN'T WORK
//import './MessageBoard.css';
import ErrorBoundary from "../ErrorBoundry"
import JCComponent, { JCState } from "../JCComponent/JCComponent"

interface Props {
  groupId: string
  navigation?: StackNavigationProp<any, any>
  route?: any
}
interface State extends JCState {
  data: any
  created: boolean
  message: string
  UserDetails: any
  textHeight: any
  editorState: any
}
class MessageBoardImpl extends JCComponent<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      ...super.getInitialState(),
      data: null,
      created: false,
      message: "",
      UserDetails: null,
      textHeight: 10,
      editorState: null,
    }
    this.setInitialData(props)
    const subscription = API.graphql(
      graphqlOperation(subscriptions.onCreateMessage, { roomId: this.props.groupId })
    )
    subscription.subscribe({
      next: (todoData) => {
        let temp: any = this.state.data
        if (temp === null) temp = { items: [] }
        if (temp.items == null) temp.items = [todoData.value.data.onCreateMessage]
        else temp.items = [todoData.value.data.onCreateMessage, ...temp.items]
        this.setState({ data: temp })
      },
    })
  }

  async setInitialData(props) {
    const user = (await Auth.currentAuthenticatedUser()) as JCCognitoUser
    try {
      const getUser = await Data.getUser(user["username"])
      this.setState({
        UserDetails: getUser.data.getUser,
      })
    } catch (e) {
      console.log(e)
    }

    if (props.route.params.create === "true" || props.route.params.create === true)
      this.setState({ created: false })
    else {
      const messagesByRoom = Data.messagesByRoom({
        roomId: this.props.groupId,
        sortDirection: ModelSortDirection.DESC,
      })
      const processMessages = (json) => {
        this.setState({
          created: true,
          data: json.data.messagesByRoom,
          message: "",
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
    Auth.currentAuthenticatedUser().then((user: JCCognitoUser) => {
      const z: CreateMessageInput = {
        id: Date.now().toString(),
        content: this.state.message,
        when: Date.now().toString(),
        roomId: this.props.groupId,
        userId: user.username,
        owner: user.username,
        authorOrgId: "0",
      }
      const createMessage = Data.createMessage(z)
      createMessage
        .then((json) => {
          console.log({ "Success Data.createMessage": json })
          this.setState({ message: "" })
        })
        .catch((err) => {
          console.log({ "Error Data.createMessage": err })
        })
    })
  }
  showProfile(id) {
    console.log("Navigate to profileScreen")
    this.props.navigation.push("ProfileScreen", { id: id, create: false })
  }
  render() {
    return this.state.message != null && this.state.created ? (
      <ErrorBoundary>
        <View style={this.styles.style.nativeMessageBoardContainer}>
          <ScrollView style={{ marginBottom: 40 }}>
            {this.state.UserDetails != null ? (
              <ProfileImage size="small" user={this.state.UserDetails}></ProfileImage>
            ) : null}
            <Editor
              placeholder="Write a message..."
              editorState={this.state.editorState}
              toolbarClassName="customToolbar"
              wrapperClassName="customWrapperSendmessage"
              editorClassName="customEditorSendmessage"
              onEditorStateChange={(z) => {
                this.updateEditorInput(z)
              }}
              onContentStateChange={(z) => {
                this.updateInput(z)
              }}
              toolbar={{
                options: ["inline", "list"],
                inline: {
                  options: ["bold", "italic", "underline"],
                },
                list: {
                  options: ["unordered", "ordered"],
                },
              }}
            />
            <JCButton
              buttonType={ButtonTypes.SolidRightJustified}
              onPress={() => {
                this.saveMessage()
              }}
            >
              Post
            </JCButton>
          </ScrollView>

          {this.state.data.items.map((item: any) => {
            return (
              <TouchableOpacity
                key={item.id}
                onPress={() => {
                  this.showProfile(item.author.id)
                }}
              >
                <View
                  key={item.id}
                  style={{
                    borderRadius: 10,
                    minHeight: 50,
                    marginBottom: 35,
                    borderColor: "#ffffff",
                  }}
                >
                  <View
                    style={{
                      borderBottomLeftRadius: 0,
                      borderBottomRightRadius: 0,
                      borderTopLeftRadius: 10,
                      borderTopRightRadius: 10,
                      backgroundColor: "#F9FAFC",
                    }}
                  >
                    <View>
                      <ProfileImage
                        size="small"
                        user={item.owner ? item.owner : null}
                      ></ProfileImage>
                      <View>
                        <Text style={this.styles.style.groupFormName}>
                          {item.author != null ? item.author.given_name : null}{" "}
                          {item.author != null ? item.author.family_name : null}
                        </Text>
                        <Text style={this.styles.style.groupFormRole}>
                          {item.author != null ? item.author.currentRole : null}
                        </Text>
                      </View>
                    </View>
                    <View>
                      <Text style={this.styles.style.groupFormDate}>
                        {new Date(parseInt(item.when, 10)).toLocaleString()}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      marginTop: 0,
                      paddingTop: 0,
                      paddingBottom: 0,
                      borderTopLeftRadius: 0,
                      borderTopRightRadius: 0,
                      borderBottomLeftRadius: 10,
                      borderBottomRightRadius: 10,
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <Editor
                      readOnly
                      toolbarHidden
                      initialContentState={JSON.parse(item.content)}
                      toolbarClassName="customToolbar"
                      wrapperClassName="customWrapper"
                      editorClassName="customEditor"
                    />
                  </View>
                </View>
              </TouchableOpacity>
            )
          })}
        </View>
      </ErrorBoundary>
    ) : null
  }
}
export default function MessageBoard(props: Props): JSX.Element {
  const route = useRoute()
  const navigation = useNavigation<StackNavigationProp<any, any>>()
  return <MessageBoardImpl {...props} navigation={navigation} route={route} />
}
