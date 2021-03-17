import { GraphQLResult } from "@aws-amplify/api"
import { AntDesign, FontAwesome5 } from "@expo/vector-icons"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { API, Auth, graphqlOperation, Storage } from "aws-amplify"
import GRAPHQL_AUTH_MODE from "aws-amplify-react-native"
import { convertToRaw, EditorState } from "draft-js"
import { Badge, Container, StyleProvider } from "native-base"
import React from "react"
import { Editor } from "react-draft-wysiwyg"
import { Text, TouchableOpacity, View } from "react-native"
import { JCCognitoUser } from "src/types"
import { v4 as uuidv4 } from "uuid"
import JCButton, { ButtonTypes } from "../../components/Forms/JCButton"
import ProfileImage from "../../components/ProfileImage/ProfileImage"
import getTheme from "../../native-base-theme/components"
import {
  CreateDirectMessageInput,
  CreateDirectMessageMutation,
  CreateDirectMessageReplyInput,
  CreateDirectMessageReplyMutation,
  CreateMessageInput,
  CreateMessageMutation,
  CreateReplyInput,
  CreateReplyMutation,
  GetUserQuery,
} from "../../src/API"
import { DirectMessagesByRoomQuery, MessagesByRoomQuery } from "../../src/API-messages"
import * as mutations from "../../src/graphql/mutations"
import * as queries from "../../src/graphql/queries"
import JCComponent, { JCState } from "../JCComponent/JCComponent"
import CameraRecorder from "./CameraRecorder"
import FileUpload from "./FileUpload"
//TODO FIGURE OUT WHY THIS DOESN'T WORK
import "./MessageBoard.css"
import MessageList from "./MessageList"
import MessageListDirect from "./MessageListDirect"
import "./react-draft-wysiwyg.css"

const configShowVideo = false

type Messages = NonNullable<MessagesByRoomQuery["messagesByRoom"]>["items"]
type Message = NonNullable<Messages>[0]
type Reply = NonNullable<NonNullable<NonNullable<Message>["replies"]>["items"]>[0]

type DMs = NonNullable<DirectMessagesByRoomQuery["directMessagesByRoom"]>["items"]
type DM = NonNullable<DMs>[0]
type DMReply = NonNullable<NonNullable<NonNullable<DM>["replies"]>["items"]>[0]

interface Props {
  groupId?: string
  roomId?: string
  route?: RouteProp<any, any>
  navigation?: any
  style: "mini" | "regular" | "course" | "courseResponse"
  recipients?: string[]
  showWordCount?: boolean
  totalWordCount?: number
  inputAt?: "top" | "bottom"
  toolbar?: boolean
  replies?: boolean
}

interface State extends JCState {
  showVideo: boolean
  created: boolean
  UserDetails: GetUserQuery["getUser"]
  editorState: EditorState
  attachment: string
  attachmentName: string
  fileNameWidth: number
  wordCount: number
  replyToWho: string[]
  replyToId: string
  replyToRoomId: string
  fetchingData: boolean
}
class MessageBoardImpl extends JCComponent<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      ...super.getInitialState(),
      created: false,
      UserDetails: null,
      editorState: EditorState.createEmpty(),
      attachment: "",
      attachmentName: "",
      wordCount: 0,
      showVideo: false,
      replyToWho: [],
      replyToId: "",
      replyToRoomId: "",
      fetchingData: false,
    }
  }
  static defaultProps = {
    inputAt: "top",
  }

  async handleUpload(e: React.ChangeEvent<HTMLInputElement>): Promise<void> {
    const file = e.target.files && e.target.files?.length > 0 ? e.target.files[0] : null

    if (file) {
      try {
        const user = await Auth.currentCredentials()
        const userId = user.identityId
        const fn = "messages/uploads/" + "jc-upload-" + new Date().getTime() + "-" + file.name
        const upload = await Storage.put(fn, file, {
          level: "protected",
          contentType: file.type,
          identityId: userId,
        })
        if (upload) this.setState({ attachment: fn })
      } catch (e) {
        console.error(e)
      }
    }
  }

  async setInitialData(props: Props) {
    const user = (await Auth.currentAuthenticatedUser()) as JCCognitoUser
    try {
      const getUser = (await API.graphql(
        graphqlOperation(queries.getUser, { id: user["username"] })
      )) as GraphQLResult<GetUserQuery>
      this.setState({
        UserDetails: getUser.data?.getUser ?? null,
      })
    } catch (e) {
      console.log(e)
    }
    if (props.route?.params?.create === "true" || props.route?.params?.create === true) {
      this.setState({ created: false })
    }
  }

  renderFileUploadBadge(): React.ReactNode {
    const { attachment } = this.state

    return (
      <View>
        <Badge style={{ backgroundColor: "#EFF1F5", marginRight: 10, marginTop: 5, height: 30 }}>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            {this.renderFileIcon(attachment)}
            <Text style={{ fontSize: 16, marginHorizontal: 5 }}>
              {this.processFileName(attachment)}
            </Text>
            <TouchableOpacity onPress={() => this.setState({ attachment: "", attachmentName: "" })}>
              <AntDesign name="close" size={20} color="black" />
            </TouchableOpacity>
          </View>
        </Badge>
      </View>
    )
  }

  renderFileIcon(filePath?: string | null): React.ReactNode {
    if (!filePath) return null

    const lastDot = filePath?.lastIndexOf(".")
    const ext = filePath?.substring(lastDot + 1).toLowerCase()

    switch (ext) {
      case "pdf":
        return <FontAwesome5 name="file-pdf" size={22} color="black" />
      case "doc":
      case "docx":
        return <FontAwesome5 name="file-word" size={22} color="black" />
      case "ppt":
      case "pptx":
        return <FontAwesome5 name="file-powerpoint" size={22} color="black" />
      case "xls":
      case "xlsx":
        return <FontAwesome5 name="file-excel" size={22} color="black" />
      default:
        return null
    }
  }

  processFileName(filePath?: string | null): string {
    if (!filePath) return ""

    const urlStripped = filePath.split("messages/uploads/")[1]
    const lastDash = urlStripped.lastIndexOf("-")
    const fileName = urlStripped.substring(lastDash + 1)
    return fileName
  }

  updateEditorInput(value: EditorState) {
    const str = value.getCurrentContent().getPlainText(" ")
    const wordArray = str.match(/\S+/g) // matches words according to whitespace
    this.setState({
      editorState: value,
      wordCount: wordArray ? wordArray.length : 0,
    })
  }

  async saveMessage(): Promise<void> {
    const { editorState, attachment, attachmentName } = this.state

    if (!editorState.getCurrentContent().hasText()) {
      return
    }

    const message = JSON.stringify(convertToRaw(editorState.getCurrentContent()))
    try {
      const user = await Auth.currentAuthenticatedUser()
      if (this.props.groupId) {
        const input: CreateMessageInput = {
          id: uuidv4(),
          content: message,
          when: Date.now().toString(),
          attachment: attachment,
          attachmentName: attachmentName,
          roomId: this.props.groupId,
          userId: user.username,
          owner: user.username,
          //authorOrgId: "0"
        }
        try {
          const createMessage = (await API.graphql({
            query: mutations.createMessage,
            variables: { input },
            authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
          })) as Promise<GraphQLResult<CreateMessageMutation>>
          console.log({ "Success mutations.createMessage": createMessage })
          this.setState({
            editorState: EditorState.createEmpty(),
            attachmentName: "",
            attachment: "",
          })
        } catch (err) {
          console.error({ "Error mutations.createMessage": err })
          if (err.data.createMessage) {
            this.setState({
              editorState: EditorState.createEmpty(),
              attachmentName: "",
              attachment: "",
            })
          }
        }
      } else if (this.props.roomId) {
        const input: CreateDirectMessageInput = {
          id: uuidv4(),
          userId: user.username,
          content: message,
          attachment: attachment,
          attachmentName: attachmentName,
          when: Date.now().toString(),
          messageRoomID: this.props.roomId,
          recipients: this.props.recipients ?? [],
        }
        try {
          const createDirectMessage = (await API.graphql({
            query: mutations.createDirectMessage,
            variables: { input },
            authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
          })) as Promise<GraphQLResult<CreateDirectMessageMutation>>
          console.log({ "Success mutations.createDirectMessage ": createDirectMessage })
          this.setState({
            editorState: EditorState.createEmpty(),
            attachmentName: "",
            attachment: "",
          })
        } catch (err) {
          console.error({ "Error mutations.createDirectMessage ": err })
          if (err.data.createDirectMessage) {
            this.setState({
              editorState: EditorState.createEmpty(),
              attachmentName: "",
              attachment: "",
            })
          }
        }
      }
    } catch (err) {
      console.log(err)
    }
  }
  showVideo() {
    this.setState({ showVideo: !this.state.showVideo })
  }

  renderWordCount() {
    return this.props.showWordCount ? (
      <Text
        style={
          this.props.style == "course"
            ? this.styles.style.courseWordCount
            : this.styles.style.courseWordCountSmall
        }
      >
        Word count: {this.state.wordCount}/{this.props.totalWordCount}
      </Text>
    ) : null
  }
  renderMessageInput() {
    const { style, toolbar } = this.props

    let replyToText = ""

    if (this.state.replyToWho.length > 0) {
      replyToText = this.state.replyToWho[0]
    }
    if (this.state.replyToWho.length > 1) {
      replyToText = `${this.state.replyToWho[0]} and ${this.state.replyToWho[1]}`
    }
    if (this.state.replyToWho.length > 2) {
      replyToText = `${this.state.replyToWho[0]} and others`
    }

    return (
      <View style={{ marginBottom: 40, bottom: 25 }}>
        {style === "mini" ? (
          this.state.showVideo ? (
            <CameraRecorder></CameraRecorder>
          ) : (
            <View
              style={{ display: "flex", flex: 1, flexDirection: "row", alignItems: "flex-start" }}
            >
              {this.state.UserDetails ? (
                <ProfileImage
                  size="small"
                  user={this.state.UserDetails}
                  inlineStyle={{ width: 49, height: 58, borderRadius: 55, marginRight: 10 }}
                />
              ) : null}
              <View style={{ flex: 1 }}>
                <Editor
                  placeholder="Write a message..."
                  editorState={this.state.editorState}
                  toolbarClassName="customToolbar"
                  wrapperClassName="customWrapperSendmessageMini"
                  editorClassName={`customEditorSendmessage ${
                    toolbar ? "has-toolbar" : "no-toolbar"
                  }`}
                  onEditorStateChange={(z) => {
                    this.updateEditorInput(z)
                  }}
                  toolbarHidden={!toolbar}
                  toolbar={{
                    options: ["inline", "list", "emoji"],
                    inline: {
                      options: ["bold", "italic", "underline"],
                    },
                    list: {
                      options: ["unordered", "ordered"],
                    },
                    emoji: {
                      popupClassName: "customEmojiModal",
                    },
                  }}
                />
                {this.renderWordCount()}
              </View>
            </View>
          )
        ) : (
          <>
            {this.state.UserDetails != null &&
            (style == "regular" || style == "course" || style == "courseResponse") ? (
              <ProfileImage size="small" user={this.state.UserDetails} />
            ) : null}
            {this.state.showVideo ? (
              <CameraRecorder></CameraRecorder>
            ) : (
              <>
                <Editor
                  placeholder={
                    style === "course"
                      ? "Write Assignment..."
                      : style === "courseResponse"
                      ? "Write a response...."
                      : "Write a message..."
                  }
                  editorState={this.state.editorState}
                  toolbarClassName="customToolbar"
                  wrapperClassName={
                    style == "regular" || style == "course"
                      ? "customWrapperSendmessage"
                      : style == "courseResponse"
                      ? "customWrapperSendmessageCourse"
                      : "customWrapperSendmessageMini"
                  }
                  editorClassName={`customEditorSendmessage ${
                    toolbar ? "has-toolbar" : "no-toolbar"
                  }`}
                  onEditorStateChange={(z) => {
                    this.updateEditorInput(z)
                  }}
                  toolbarHidden={!toolbar}
                  toolbar={{
                    options: ["inline", "list", "emoji"],
                    inline: {
                      options: ["bold", "italic", "underline"],
                    },
                    list: {
                      options: ["unordered", "ordered"],
                    },
                    emoji: {
                      popupClassName: "customEmojiModal",
                    },
                  }}
                  toolbarCustomButtons={[
                    <FileUpload
                      key="fileupload"
                      handleUploadCallback={(e) => this.handleUpload(e)}
                    />,
                  ]}
                />
                {this.renderWordCount()}
              </>
            )}
          </>
        )}
        <View
          style={
            style == "regular" || style == "courseResponse"
              ? this.styles.style.courseDetailJCButtonRegular
              : style == "course"
              ? this.styles.style.courseDetailJCButtonAssignments
              : this.styles.style.courseDetailJCButtonMini
          }
        >
          {configShowVideo ? (
            <JCButton
              buttonType={
                style == "regular" || style == "course" || style == "courseResponse"
                  ? ButtonTypes.SolidRightJustified
                  : ButtonTypes.SolidRightJustifiedMini
              }
              onPress={() => {
                this.showVideo()
              }}
            >
              {style === "course" || this.state.showVideo ? "Text" : "Video"}
            </JCButton>
          ) : null}
          {this.state.replyToId && (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                marginLeft: this.props.style === "mini" ? 60 : 120,
                marginRight: "auto",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#333333",
                  fontFamily: "Graphik-Regular-App",
                  fontSize: 16,
                  fontWeight: "bold",
                  marginRight: 12,
                  marginBottom: 4,
                }}
              >
                Replying to {replyToText}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ replyToRoomId: "", replyToId: "", replyToWho: [] })
                }}
              >
                <AntDesign name="closecircleo" size={20} color="#333333" />
              </TouchableOpacity>
            </View>
          )}
          {this.state.attachment ? this.renderFileUploadBadge() : null}
          <JCButton
            buttonType={
              style == "regular" || style == "course" || style == "courseResponse"
                ? ButtonTypes.SolidRightJustified
                : ButtonTypes.SolidRightJustifiedMini
            }
            onPress={async () => {
              this.state.replyToId ? await this.sendReply() : await this.saveMessage()
            }}
          >
            {style == "course" || style == "courseResponse" ? "Save" : "Post"}
          </JCButton>
        </View>
      </View>
    )
  }

  renderMessages() {
    return (
      <>
        {this.props.groupId ? (
          <MessageList
            groupId={this.props.groupId}
            replies={this.props.replies}
            style={this.props.style}
            inputAt={this.props.inputAt}
            onHandlePressReply={(item) => {
              this.handlePressReply(item)
            }}
            onHandleCreated={() => {
              this.setState({ created: true })
            }}
          />
        ) : this.props.roomId ? (
          <MessageListDirect
            roomId={this.props.roomId}
            replies={this.props.replies}
            style={this.props.style}
            inputAt={this.props.inputAt}
            onHandlePressReply={(item) => {
              this.handlePressReplyDM(item)
            }}
            onHandleCreated={() => {
              this.setState({ created: true })
            }}
          />
        ) : null}
      </>
    )
  }

  async sendReply() {
    const { editorState, attachment, attachmentName, replyToId, replyToRoomId } = this.state
    console.log(replyToRoomId)
    if (!editorState.getCurrentContent().hasText() || !replyToId || !replyToRoomId) {
      return
    }
    if (this.props.groupId) {
      try {
        const message = JSON.stringify(convertToRaw(editorState.getCurrentContent()))
        const user = (await Auth.currentAuthenticatedUser()) as JCCognitoUser

        const input: CreateReplyInput = {
          id: uuidv4(),
          content: message,
          when: Date.now().toString(),
          attachment: attachment,
          attachmentName: attachmentName,
          roomId: replyToRoomId,
          userId: user.username,
          messageId: replyToId,
          parentReplyId: "0000-0000-0000-0000", // void value
        }

        const createReply = (await API.graphql({
          query: mutations.createReply,
          variables: { input },
          authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
        })) as GraphQLResult<CreateReplyMutation>
        console.log({ "Success mutations.createReply": createReply })
        this.setState({
          editorState: EditorState.createEmpty(),
          attachmentName: "",
          attachment: "",
          replyToId: "",
          replyToRoomId: "",
          replyToWho: [],
        })
      } catch (e) {
        if (e.data?.createReply) {
          console.log({ "Success mutations.createReply": e.data })
          this.setState({
            editorState: EditorState.createEmpty(),
            attachmentName: "",
            attachment: "",
            replyToId: "",
            replyToRoomId: "",
            replyToWho: [],
          })
        } else {
          console.error({ "Error mutations.createReply": e })
        }
      }
    } else if (this.props.roomId) {
      try {
        const message = JSON.stringify(convertToRaw(editorState.getCurrentContent()))
        const user = (await Auth.currentAuthenticatedUser()) as JCCognitoUser

        const input: CreateDirectMessageReplyInput = {
          id: uuidv4(),
          content: message,
          when: Date.now().toString(),
          attachment: attachment,
          attachmentName: attachmentName,
          messageRoomID: replyToRoomId,
          userId: user.username,
          messageId: replyToId,
          parentReplyId: "0000-0000-0000-0000", // void value
        }

        const createReply = (await API.graphql({
          query: mutations.createDirectMessageReply,
          variables: { input },
          authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
        })) as GraphQLResult<CreateDirectMessageReplyMutation>
        console.log({ "Success mutations.createReply": createReply })
        this.setState({
          editorState: EditorState.createEmpty(),
          attachmentName: "",
          attachment: "",
          replyToId: "",
          replyToRoomId: "",
          replyToWho: [],
        })
      } catch (e) {
        if (e.data?.createDirectMessageReply) {
          console.log({ "Success mutations.createReply": e.data })
          this.setState({
            editorState: EditorState.createEmpty(),
            attachmentName: "",
            attachment: "",
            replyToId: "",
            replyToRoomId: "",
            replyToWho: [],
          })
        } else {
          console.error({ "Error mutations.createReply": e })
        }
      }
    }
  }

  handlePressReply(item: Message | Reply) {
    if (item) {
      const peopleInThread: string[] = []

      if (item.author?.given_name) {
        peopleInThread.push(item.author.given_name)
      }

      if ("replies" in item) {
        item.replies?.items?.slice(10).forEach((reply) => {
          if (reply?.author?.given_name && !peopleInThread.includes(reply.author.given_name)) {
            peopleInThread.push(reply?.author?.given_name)
          }
        })
        this.setState({ replyToId: item.id })
      } else {
        this.setState({ replyToId: item.messageId })
      }
      this.setState({ replyToWho: peopleInThread, replyToRoomId: item.roomId ?? "" })
    }
  }
  handlePressReplyDM(item: DM | DMReply) {
    if (item) {
      const peopleInThread: string[] = []

      if (item.author?.given_name) {
        peopleInThread.push(item.author.given_name)
      }

      if ("replies" in item) {
        item.replies?.items?.slice(10).forEach((reply) => {
          if (reply?.author?.given_name && !peopleInThread.includes(reply.author.given_name)) {
            peopleInThread.push(reply?.author?.given_name)
          }
        })
        this.setState({ replyToId: item.id })
      } else {
        this.setState({ replyToId: item.messageId })
      }
      this.setState({ replyToWho: peopleInThread, replyToRoomId: item.messageRoomID ?? "" })
    }
  }
  render() {
    const { groupId, roomId, style, inputAt } = this.props

    if (groupId && roomId) {
      console.error("groupId and roomId cannot be used together")
      return null
    }

    return (
      <StyleProvider style={getTheme()}>
        <Container
          style={
            style === "regular" || style === "course" || style === "courseResponse"
              ? this.styles.style.messageBoardContainerFullSize
              : this.styles.style.messageBoardContainer
          }
        >
          {inputAt === "top" && this.state.created ? this.renderMessageInput() : null}
          {this.renderMessages()}
          {inputAt === "bottom" && this.state.created ? this.renderMessageInput() : null}
        </Container>
      </StyleProvider>
    )
  }
}

export default function MessageBoard(props: Props): JSX.Element {
  const route = useRoute()
  const navigation = useNavigation()
  return <MessageBoardImpl {...props} navigation={navigation} route={route} />
}
