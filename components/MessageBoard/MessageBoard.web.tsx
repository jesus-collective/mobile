import { GraphQLResult } from "@aws-amplify/api/src/types"
import { AntDesign, FontAwesome5 } from "@expo/vector-icons"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { API, Auth, graphqlOperation, Storage } from "aws-amplify"
import GRAPHQL_AUTH_MODE from "aws-amplify-react-native"
import { convertFromRaw, convertToRaw, EditorState } from "draft-js"
import { stateToHTML } from "draft-js-export-html"
import {
  Badge,
  Body,
  Card,
  CardItem,
  Container,
  Label,
  Left,
  Right,
  StyleProvider,
} from "native-base"
import * as React from "react"
import { isFirefox } from "react-device-detect"
import { Editor } from "react-draft-wysiwyg"
import {
  ActivityIndicator,
  Dimensions,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import { FlatList } from "react-native-gesture-handler"
import { v4 as uuidv4 } from "uuid"
import JCButton, { ButtonTypes } from "../../components/Forms/JCButton"
import ProfileImage from "../../components/ProfileImage/ProfileImage"
import getTheme from "../../native-base-theme/components"
import {
  CreateDirectMessageInput,
  CreateDirectMessageMutation,
  CreateMessageInput,
  CreateMessageMutation,
  CreateReplyInput,
  CreateReplyMutation,
  DirectMessagesByRoomQuery,
  GetUserQuery,
} from "../../src/API"
import { MessagesByRoomQuery } from "../../src/API-custom"
import * as customQueries from "../../src/graphql-custom/queries"
import * as mutations from "../../src/graphql/mutations"
import * as queries from "../../src/graphql/queries"
import JCComponent, { JCState } from "../JCComponent/JCComponent"
import CameraRecorder from "./CameraRecorder"
import FileUpload from "./FileUpload"
//TODO FIGURE OUT WHY THIS DOESN'T WORK
import "./MessageBoard.css"
import "./react-draft-wysiwyg.css"

const configShowVideo = false

type Messages = NonNullable<MessagesByRoomQuery["messagesByRoom"]>["items"]
type Message = NonNullable<Messages>[0]
type Reply = NonNullable<NonNullable<NonNullable<Message>["replies"]>["items"]>[0]

type DMs = NonNullable<DirectMessagesByRoomQuery["directMessagesByRoom"]>["items"]
type DM = NonNullable<DMs>[0]

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
  messages: Messages
  dms: DMs
  dataAssignment: any
  created: boolean
  UserDetails: GetUserQuery["getUser"]
  editorState: EditorState
  attachment: string
  attachmentName: string
  fileNameWidth: number
  wordCount: number
  nextToken: string | null
  replyToWho: string[]
  replyToId: string
  isReplying: boolean
  fetchingData: boolean
}
class MessageBoardImpl extends JCComponent<Props, State> {
  flatListRef: React.RefObject<FlatList<any>>
  constructor(props: Props) {
    super(props)
    this.flatListRef = React.createRef<FlatList<any>>()
    this.state = {
      ...super.getInitialState(),
      messages: [],
      dms: [],
      dataAssignment: [],
      created: false,
      UserDetails: null,
      editorState: EditorState.createEmpty(),
      attachment: "",
      attachmentName: "",
      wordCount: 0,
      showVideo: false,
      nextToken: null,
      replyToWho: [],
      replyToId: "",
      isReplying: false,
      fetchingData: false,
    }
    this.setInitialData(props)
    // const subscription: any = API.graphql({
    //   query: subscriptions.onCreateMessage,
    //   variables: { roomId: this.props.groupId },
    //   authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    // })
    // subscription.subscribe({
    //   next: async (todoData) => {
    //     this.getMessages()
    //     console.log({ onCreateMessage: todoData })
    //     let temp: any = this.state.data
    //     if (temp === null) temp = { items: [] }
    //     if (temp.items == null) temp.items = [todoData.value.data.onCreateMessage]
    //     else temp.items = [todoData.value.data.onCreateMessage, ...temp.items]
    //     this.setState({ data: temp })
    //   },
    // })
    // const subscription2: any = API.graphql({
    //   query: subscriptions.onCreateDirectMessage,
    //   variables: { messageRoomID: this.props.roomId },
    //   authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    // })
    // subscription2.subscribe({
    //   next: async (todoData) => {
    //     this.getDirectMessages()
    //     this.getCourseAssignment()
    //     console.log({ onCreateDirectMessage2: todoData })

    //     let temp: any = this.state.data
    //     if (temp === null) temp = { items: [] }
    //     if (temp.items == null) temp.items = [todoData.value.data.onCreateDirectMessage]
    //     else temp.items = [todoData.value.data.onCreateDirectMessage, ...temp.items]
    //     this.setState({ data: temp })
    //   },
    // })
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

  async getMessages() {
    try {
      const messagesByRoom = (await API.graphql({
        query: customQueries.messagesByRoom,
        variables: {
          roomId: this.props.groupId,
          sortDirection: "DESC",
          limit: 10,
        },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })) as GraphQLResult<MessagesByRoomQuery>

      console.log(messagesByRoom)

      if (messagesByRoom.data?.messagesByRoom?.items) {
        this.setState({
          created: true,
          messages: messagesByRoom.data.messagesByRoom.items,
          nextToken: messagesByRoom.data.messagesByRoom.nextToken,
        })
      }
    } catch (e) {
      console.log(e)
      if (e.data?.messagesByRoom) {
        this.setState({
          created: true,
          messages: e.data.messagesByRoom.items,
          nextToken: e.data.messagesByRoom.nextToken,
        })
      }
    }
  }

  async getDirectMessages() {
    try {
      const directMessagesByRoom = (await API.graphql({
        query: queries.directMessagesByRoom,
        variables: {
          messageRoomID: this.props.roomId,
          sortDirection: "DESC",
          limit: 30,
        },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })) as GraphQLResult<DirectMessagesByRoomQuery>

      console.log(directMessagesByRoom)

      if (directMessagesByRoom.data?.directMessagesByRoom?.items) {
        this.setState({
          created: true,
          dms: directMessagesByRoom.data.directMessagesByRoom.items,
          nextToken: directMessagesByRoom.data.directMessagesByRoom.nextToken,
        })
      }
    } catch (e) {
      console.log(e)
      if (e.data?.directMessagesByRoom?.items) {
        this.setState({
          created: true,
          dms: e.data.directMessagesByRoom.items,
          nextToken: e.data.directMessagesByRoom.nextToken,
        })
      }
    }
  }

  getCourseAssignment() {
    if (this.props.style == "courseResponse") {
      const directMessagesByRoom = API.graphql({
        query: queries.directMessagesByRoom,
        variables: { messageRoomID: this.props.roomId, sortDirection: "ASC", limit: 1 },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      }) as Promise<GraphQLResult<DirectMessagesByRoomQuery>>
      const processAssignment = (json: GraphQLResult<DirectMessagesByRoomQuery>) => {
        if (json.data?.directMessagesByRoom)
          this.setState({
            dataAssignment: json.data.directMessagesByRoom.items,
          })
      }
      directMessagesByRoom.then(processAssignment).catch(processAssignment)
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props !== prevProps) {
      this.setInitialData(this.props)
    }
  }

  /* hack to get natural scrolling in an inverted flatlist
   https://github.com/necolas/react-native-web/issues/995#issuecomment-511242048 

   on desktop: 
   natural scroll occurs by default on firefox
   chromium-based browsers require the hack
   safari behaviour unknown
   */
  componentDidMount() {
    if (this.props.inputAt !== "bottom" && !isFirefox) {
      const scrollNode = this.flatListRef.current && this.flatListRef.current.getScrollableNode()
      if (!scrollNode)
        scrollNode.addEventListener("wheel", (e) => {
          scrollNode.scrollTop -= e.deltaY
          e.preventDefault()
        })
      this.flatListRef.current?.setNativeProps({
        style: { transform: "translate3d(0,0,0) scaleY(-1)" },
      })
    }
  }

  componentWillUnmount() {
    if (this.props.inputAt !== "bottom" && !isFirefox) {
      const scrollNode = this.flatListRef.current && this.flatListRef.current.getScrollableNode()
      if (!scrollNode)
        scrollNode.removeEventListener("wheel", (e) => {
          scrollNode.scrollTop -= e.deltaY
          e.preventDefault()
        })
    }
  }

  async setInitialData(props: Props) {
    const user = await Auth.currentAuthenticatedUser()
    try {
      const getUser = (await API.graphql(
        graphqlOperation(queries.getUser, { id: user["username"] })
      )) as GraphQLResult<GetUserQuery>
      this.setState({
        UserDetails: getUser.data?.getUser ?? null,
      })
    } catch (e) {
      console.log({ Error: e })
    }
    if (props.route?.params?.create === "true" || props.route?.params?.create === true) {
      this.setState({ created: false })
    } else if (this.props.groupId) {
      this.getMessages()
    } else if (this.props.roomId) {
      this.getDirectMessages()
      this.getCourseAssignment()
    }
  }

  renderFileDownloadBadge(item: Message | DM | Reply): React.ReactNode {
    return (
      <TouchableOpacity onPress={() => this.getAttachment(item?.attachment)}>
        <Badge style={{ backgroundColor: "#EFF1F5", marginRight: 10, marginTop: 5, height: 30 }}>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            {this.renderFileIcon(item?.attachment)}
            <Text style={{ fontSize: 18, paddingHorizontal: 10 }}>
              {item?.attachmentName ?? this.processFileName(item?.attachment)}
            </Text>
          </View>
        </Badge>
      </TouchableOpacity>
    )
  }

  renderFileUploadBadge(): React.ReactNode {
    const { attachment, attachmentName } = this.state

    return (
      <View>
        <Badge style={{ backgroundColor: "#EFF1F5", marginRight: 10, marginTop: 5, height: 30 }}>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            {this.renderFileIcon(attachment)}
            <TextInput
              placeholder="custom filename (optional)"
              style={{ fontSize: 14, paddingHorizontal: 10, width: 200 }}
              value={attachmentName ?? ""}
              onChange={(e) => this.setState({ attachmentName: e.nativeEvent.text })}
            ></TextInput>
            <TouchableOpacity onPress={() => this.setState({ attachment: "", attachmentName: "" })}>
              <AntDesign name="close" size={20} color="black" />
            </TouchableOpacity>
          </View>
        </Badge>
        <Label style={{ fontSize: 12, marginLeft: 10 }}>{this.processFileName(attachment)}</Label>
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

  async getAttachment(filePath?: string | null): Promise<void> {
    if (!filePath) return

    try {
      const user = await Auth.currentCredentials()
      const userId = user.identityId

      const res = await Storage.get(filePath, {
        level: "protected",
        identityId: userId,
      })

      window.open(res as string, "_blank", "noopener noreferrer")
    } catch (e) {
      console.error(e)
    }
  }

  updateEditorInput(value: EditorState) {
    const str = value.getCurrentContent().getPlainText(" ")
    const wordArray = str.match(/\S+/g) // matches words according to whitespace
    this.setState({
      editorState: value,
      wordCount: wordArray ? wordArray.length : 0,
    })
  }

  convertCommentFromJSONToHTML = (text: string | null) => {
    const errorMarkdown =
      "<div>" + this.props.style == "course" || this.props.style == "courseResponse"
        ? "Assignment/Response"
        : "Message" + " Can't Be Displayed</div>"

    if (!text) return errorMarkdown

    try {
      return stateToHTML(convertFromRaw(JSON.parse(text)))
    } catch (e) {
      console.log({ Error: e })
      return errorMarkdown
    }
  }

  saveMessage() {
    const { editorState, attachment, attachmentName } = this.state

    if (!editorState.getCurrentContent().hasText()) {
      return
    }

    const message = JSON.stringify(convertToRaw(editorState.getCurrentContent()))
    Auth.currentAuthenticatedUser().then((user) => {
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
        const createMessage = API.graphql({
          query: mutations.createMessage,
          variables: { input },
          authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
        }) as Promise<GraphQLResult<CreateMessageMutation>>

        createMessage
          .then((json) => {
            console.log({ "Success mutations.createMessage": json })
            this.setState({
              editorState: EditorState.createEmpty(),
              attachmentName: "",
              attachment: "",
            })
          })
          .catch((err) => {
            console.log({ "Error mutations.createMessage": err })
            if (err.data.createMessage) {
              this.setState({
                editorState: EditorState.createEmpty(),
                attachmentName: "",
                attachment: "",
              })
            }
          })
      } else if (this.props.roomId) {
        const dm: CreateDirectMessageInput = {
          id: uuidv4(),
          userId: user.username,
          content: message,
          attachment: attachment,
          attachmentName: attachmentName,
          when: Date.now().toString(),
          messageRoomID: this.props.roomId,
          recipients: this.props.recipients ?? [],
        }
        const createDirectMessage = API.graphql({
          query: mutations.createDirectMessage,
          variables: { input: dm },
          authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
        }) as Promise<GraphQLResult<CreateDirectMessageMutation>>

        createDirectMessage
          .then((json) => {
            console.log({ "Success mutations.createDirectMessage ": json })
            this.setState({
              editorState: EditorState.createEmpty(),
              attachmentName: "",
              attachment: "",
            })
          })
          .catch((err) => {
            console.log({ "Error mutations.createDirectMessage ": err })
            if (err.data.createDirectMessage) {
              this.setState({
                editorState: EditorState.createEmpty(),
                attachmentName: "",
                attachment: "",
              })
            }
          })
      }
    })
  }
  showVideo() {
    this.setState({ showVideo: !this.state.showVideo })
  }

  showProfile(id: string | undefined) {
    if (id) this.props.navigation?.push("ProfileScreen", { id: id, create: false })
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
      replyToText = `Replying to ${this.state.replyToWho[0]}`
    }
    if (this.state.replyToWho.length > 1) {
      replyToText = `Replying to ${this.state.replyToWho[0]} and ${this.state.replyToWho[1]}`
    }
    if (this.state.replyToWho.length > 2) {
      replyToText = `Replying to ${this.state.replyToWho[0]} and others`
    }

    return (
      <View style={{ marginBottom: 40 }}>
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
                ></ProfileImage>
              ) : null}
              <View style={{ flex: 1 }}>
                <Editor
                  placeholder={this.state.isReplying ? replyToText : "Type your comments here..."}
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
                  toolbarCustomButtons={[<FileUpload handleUploadCallback={this.handleUpload} />]}
                />
                {this.renderWordCount()}
              </View>
            </View>
          )
        ) : (
          <>
            {this.state.UserDetails != null &&
            (style == "regular" || style == "course" || style == "courseResponse") ? (
              <ProfileImage size="small" user={this.state.UserDetails}></ProfileImage>
            ) : null}
            {this.state.showVideo ? (
              <CameraRecorder></CameraRecorder>
            ) : (
              <>
                <Editor
                  placeholder={
                    this.state.isReplying
                      ? replyToText
                      : style == "course"
                      ? "Write Assignment..."
                      : style == "courseResponse"
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
          {this.state.attachment ? this.renderFileUploadBadge() : null}
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
          {this.state.isReplying && (
            <JCButton
              buttonType={
                style == "regular" || style == "course" || style == "courseResponse"
                  ? ButtonTypes.SolidRightJustified
                  : ButtonTypes.SolidRightJustifiedMini
              }
              onPress={() => {
                this.setState({ isReplying: false, replyToId: "", replyToWho: [] })
              }}
            >
              Cancel Reply
            </JCButton>
          )}
          <JCButton
            buttonType={
              style == "regular" || style == "course" || style == "courseResponse"
                ? ButtonTypes.SolidRightJustified
                : ButtonTypes.SolidRightJustifiedMini
            }
            onPress={() => {
              this.state.isReplying ? this.sendReply() : this.saveMessage()
            }}
          >
            {style == "course" || style == "courseResponse" ? "Save" : "Post"}
          </JCButton>
        </View>
      </View>
    )
  }
  renderDirectMessage(item: DM, index: number) {
    if (!item?.author) {
      return null
    }
    return (
      <Card
        key={index}
        style={{ borderRadius: 10, minHeight: 50, marginBottom: 35, borderColor: "#ffffff" }}
      >
        <CardItem style={this.styles.style.eventPageMessageBoard}>
          <Left style={this.styles.style.eventPageMessageBoardLeft}>
            <TouchableOpacity
              key={item.id}
              onPress={() => {
                this.showProfile(item?.author?.id)
              }}
            >
              <ProfileImage size="small2" user={item.author?.id ?? null}></ProfileImage>
            </TouchableOpacity>
            <Body>
              <Text style={this.styles.style.groupFormName}>
                {item.author != null ? item.author.given_name : null}{" "}
                {item.author != null ? item.author.family_name : null}
              </Text>
              <Text style={this.styles.style.groupFormRole}>
                {item.author != null ? item.author.currentRole : null}
              </Text>
            </Body>
          </Left>
          <Right>
            <Text style={this.styles.style.groupFormDate}>
              {new Date(parseInt(item.when, 10)).toLocaleString()}
            </Text>
          </Right>
        </CardItem>
        <CardItem style={this.styles.style.eventPageMessageBoardInnerCard}>
          <div id="comment-div">
            <div
              dangerouslySetInnerHTML={{ __html: this.convertCommentFromJSONToHTML(item.content) }}
            />
          </div>
        </CardItem>
        {item.attachment ? <CardItem>{this.renderFileDownloadBadge(item)}</CardItem> : null}
      </Card>
    )
  }

  renderAssignment() {
    if (this.state.dataAssignment?.length > 0) {
      return this.renderDirectMessage(this.state.dataAssignment[0], -1)
    }
  }

  messagesLoader() {
    if (this.state.nextToken) return <ActivityIndicator animating color="#F0493E" />
    return null
  }

  renderMessages() {
    const { height } = Dimensions.get("window")

    return (
      <>
        {this.props.style === "courseResponse" && this.renderAssignment()}
        {this.props.groupId ? (
          <FlatList
            ref={this.flatListRef}
            scrollEnabled
            renderItem={({ item, index }) => this.renderMessageWithReplies(item, index)}
            data={this.state.messages}
            inverted={this.props.inputAt === "bottom"}
            onEndReached={() => this.getMoreMessages()}
            style={{ height: 0.5 * height }}
            ListFooterComponent={() => this.messagesLoader()}
            refreshing={this.state.fetchingData}
          />
        ) : this.props.roomId ? (
          <FlatList
            scrollEnabled
            renderItem={({ item, index }) => this.renderDirectMessage(item, index)}
            data={this.state.dms}
            inverted={this.props.inputAt === "bottom"}
            onEndReached={() => this.getMoreDirectMessages()}
            style={{ height: 0.5 * height }}
            ListFooterComponent={() => this.messagesLoader()}
            refreshing={this.state.fetchingData}
          />
        ) : null}
      </>
    )
  }

  async getMoreMessages() {
    this.setState({ fetchingData: true })
    if (this.state.nextToken) {
      try {
        const messagesByRoom = (await API.graphql({
          query: customQueries.messagesByRoom,
          variables: {
            roomId: this.props.groupId,
            sortDirection: "DESC",
            limit: 10,
            nextToken: this.state.nextToken,
          },
          authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
        })) as GraphQLResult<MessagesByRoomQuery>

        if (messagesByRoom.data?.messagesByRoom?.items) {
          this.setState({
            messages: [...(this.state.messages ?? []), ...messagesByRoom.data.messagesByRoom.items],
            nextToken: messagesByRoom.data.messagesByRoom.nextToken,
          })
        }
      } catch (e) {
        if (e.data?.messagesByRoom) {
          this.setState({
            messages: [...(this.state.messages ?? []), ...e.data.messagesByRoom.items],
            nextToken: e.data.messagesByRoom.nextToken,
          })
        }
      }
    }
    this.setState({ fetchingData: false })
  }

  async getMoreDirectMessages() {
    this.setState({ fetchingData: true })
    if (this.state.nextToken) {
      try {
        const directMessagesByRoom = (await API.graphql({
          query: queries.directMessagesByRoom,
          variables: {
            messageRoomID: this.props.roomId,
            sortDirection: "DESC",
            limit: 30,
            nextToken: this.state.nextToken,
          },
          authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
        })) as GraphQLResult<DirectMessagesByRoomQuery>

        if (directMessagesByRoom.data?.directMessagesByRoom?.items) {
          this.setState({
            dms: [
              ...(this.state.dms ?? []),
              ...directMessagesByRoom.data.directMessagesByRoom.items,
            ],
            nextToken: directMessagesByRoom.data.directMessagesByRoom.nextToken,
          })
        }
      } catch (e) {
        if (e.data?.directMessagesByRoom?.items) {
          this.setState({
            dms: [...(this.state.dms ?? []), ...e.data.directMessagesByRoom.items],
            nextToken: e.data.directMessagesByRoom.nextToken,
          })
        }
      }
    }
    this.setState({ fetchingData: false })
  }

  async sendReply() {
    const { editorState, attachment, attachmentName, replyToId } = this.state

    if (!editorState.getCurrentContent().hasText() || !replyToId) {
      return
    }

    try {
      const message = JSON.stringify(convertToRaw(editorState.getCurrentContent()))
      const user = await Auth.currentAuthenticatedUser()

      const input: CreateReplyInput = {
        id: uuidv4(),
        content: message,
        when: Date.now().toString(),
        attachment: attachment,
        attachmentName: attachmentName,
        userId: user.username,
        messageId: replyToId,
        // void value
        parentReplyId: "0000-0000-0000-0000",
      }
      const createReply = API.graphql({
        query: mutations.createReply,
        variables: { input },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      }) as Promise<GraphQLResult<CreateReplyMutation>>
      console.log({ "Success mutations.createReply": createReply })
      this.setState({
        editorState: EditorState.createEmpty(),
        attachmentName: "",
        attachment: "",
        isReplying: false,
      })
    } catch (err) {
      console.log({ "Error mutations.createReply": err })
      if (err.data.createReply) {
        this.setState({
          editorState: EditorState.createEmpty(),
          attachmentName: "",
          attachment: "",
          isReplying: false,
        })
      }
    }
  }

  handlePressReply(item: Message) {
    const ppl: string[] = []

    if (item?.author?.given_name) {
      ppl.push(item?.author?.given_name)
    }

    item?.replies?.items?.forEach((reply) => {
      if (reply?.author?.given_name && !ppl.includes(reply?.author?.given_name)) {
        ppl.push(reply?.author?.given_name)
      }
    })

    this.setState({ replyToId: item?.id ?? "", replyToWho: ppl, isReplying: true })
  }

  renderMessageWithReplies(item: Message, index: number) {
    return (
      <View style={{ marginBottom: 35 }} key={index}>
        {this.renderMessage(item, index)}
        {item?.replies?.items?.map((reply, index) => {
          return this.renderMessage(reply, index, true)
        })}
        {this.props.replies && (
          <TouchableOpacity
            style={{ alignSelf: "flex-end", marginRight: 24 }}
            onPress={() => this.handlePressReply(item)}
          >
            <Text
              style={{
                fontFamily: "Graphik-Regular-App",
                fontWeight: "bold",
                fontSize: 12,
                color: "#333333",
              }}
            >
              reply
            </Text>
          </TouchableOpacity>
        )}
      </View>
    )
  }

  renderMessage(item: Message | Reply, index: number, isReply?: boolean) {
    const { style } = this.props

    return (
      <Card
        key={index}
        style={{
          borderRadius: 10,
          minHeight: 50,
          borderColor: "#ffffff",
          marginLeft: isReply ? 50 : 0,
        }}
      >
        {style === "regular" || style === "course" || style === "courseResponse" ? (
          <CardItem style={this.styles.style.eventPageMessageBoard}>
            <Left style={this.styles.style.eventPageMessageBoardLeft}>
              <TouchableOpacity
                key={item?.id}
                onPress={() => {
                  this.showProfile(item?.author?.id)
                }}
              >
                {item && "owner" in item && (
                  <ProfileImage size="small2" user={item?.owner ?? null}></ProfileImage>
                )}
                {isReply && (
                  <ProfileImage size="small2" user={item?.author?.id ?? null}></ProfileImage>
                )}
              </TouchableOpacity>
              <Body>
                <Text style={this.styles.style.groupFormName}>
                  {item?.author?.given_name ?? ""} {item?.author?.family_name ?? ""}
                </Text>
                <Text style={this.styles.style.groupFormRole}>
                  {item?.author?.currentRole ?? ""}
                </Text>
              </Body>
            </Left>
            <Right>
              {item?.when && (
                <Text style={this.styles.style.groupFormDate}>
                  {new Date(parseInt(item?.when, 10)).toLocaleString()}
                </Text>
              )}
            </Right>
          </CardItem>
        ) : (
          <CardItem style={this.styles.style.coursePageMessageBoard}>
            <Left style={this.styles.style.coursePageMessageBoardLeftMini}>
              <TouchableOpacity
                key={item?.id}
                onPress={() => {
                  this.showProfile(item?.author?.id)
                }}
              >
                {item && "owner" in item && (
                  <ProfileImage size="small2" user={item?.owner ?? null}></ProfileImage>
                )}
                {isReply && (
                  <ProfileImage size="small2" user={item?.author?.id ?? null}></ProfileImage>
                )}
              </TouchableOpacity>
            </Left>
            <Right style={{ flexDirection: "column", flex: 7, alignItems: "flex-start" }}>
              <Text style={this.styles.style.courseFormName}>
                {item?.author?.given_name ?? ""} {item?.author?.family_name ?? ""}
              </Text>
              {item?.when && (
                <Text style={this.styles.style.groupFormDate}>
                  {new Date(parseInt(item?.when, 10)).toLocaleString()}
                </Text>
              )}
            </Right>
          </CardItem>
        )}
        <CardItem style={this.styles.style.eventPageMessageBoardInnerCard}>
          <div id="comment-div">
            <div
              dangerouslySetInnerHTML={{
                __html: this.convertCommentFromJSONToHTML(item?.content ?? null),
              }}
            ></div>
          </div>
        </CardItem>
        {item?.attachment ? <CardItem>{this.renderFileDownloadBadge(item)}</CardItem> : null}
      </Card>
    )
  }

  render() {
    const { groupId, roomId, style, inputAt } = this.props

    console.log("/// props ///", this.props)

    if (groupId && roomId) {
      console.error("groupId and roomId cannot be used together")
      return null
    }

    if (this.state.created) {
      return (
        <StyleProvider style={getTheme()}>
          <Container
            style={
              style === "regular" || style === "course" || style === "courseResponse"
                ? this.styles.style.messageBoardContainerFullSize
                : this.styles.style.messageBoardContainer
            }
          >
            {inputAt === "top" && this.renderMessageInput()}
            {this.renderMessages()}
            {inputAt === "bottom" && this.renderMessageInput()}
          </Container>
        </StyleProvider>
      )
    }

    return null
  }
}

export default function MessageBoard(props: Props): JSX.Element {
  const route = useRoute()
  const navigation = useNavigation()
  return <MessageBoardImpl {...props} navigation={navigation} route={route} />
}
