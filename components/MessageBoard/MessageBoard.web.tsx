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
import { Editor } from "react-draft-wysiwyg"
import { Text, TextInput, TouchableOpacity, View } from "react-native"
import JCButton, { ButtonTypes } from "../../components/Forms/JCButton"
import ProfileImage from "../../components/ProfileImage/ProfileImage"
import getTheme from "../../native-base-theme/components"
import { Observable } from "../../node_modules/zen-observable-ts"
import {
  CreateDirectMessageInput,
  CreateDirectMessageMutation,
  CreateMessageInput,
  CreateMessageMutation,
  DirectMessagesByRoomQuery,
  GetUserQuery,
  MessagesByRoomQuery,
  OnCreateDirectMessageSubscription,
  OnCreateMessageSubscription,
} from "../../src/API"
import * as mutations from "../../src/graphql/mutations"
import * as queries from "../../src/graphql/queries"
import * as subscriptions from "../../src/graphql/subscriptions"
import JCComponent, { JCState } from "../JCComponent/JCComponent"
import CameraRecorder from "./CameraRecorder"
import FileUpload from "./FileUpload"
//TODO FIGURE OUT WHY THIS DOESN'T WORK
import "./MessageBoard.css"
import "./react-draft-wysiwyg.css"
const configShowVideo = false

interface Props {
  groupId?: string
  roomId?: string
  route?: RouteProp<any, any>
  navigation?: any
  style: "mini" | "regular" | "course" | "courseResponse"
  recipients?: string[]
  showWordCount?: boolean
  totalWordCount?: number
  inputAt: "top" | "bottom"
  toolbar?: boolean
  replies?: boolean
}

interface State extends JCState {
  showVideo: boolean
  directMessages: NonNullable<
    NonNullable<DirectMessagesByRoomQuery["directMessagesByRoom"]>["items"]
  >
  messages: NonNullable<NonNullable<MessagesByRoomQuery["messagesByRoom"]>["items"]>
  dataAssignment: NonNullable<
    NonNullable<DirectMessagesByRoomQuery["directMessagesByRoom"]>["items"]
  >
  created: boolean
  UserDetails: GetUserQuery["getUser"]
  textHeight: number
  editorState: EditorState
  attachment: string | null
  attachmentName: string | null
  fileNameWidth: number
  wordCount: number
  nextToken: string | null
}

class MessageBoardImpl extends JCComponent<Props, State> {
  static defaultProps = {
    inputAt: "top",
  }
  constructor(props: Props) {
    super(props)
    this.state = {
      ...super.getInitialState(),
      directMessages: [],
      messages: [],
      dataAssignment: [],
      created: false,
      UserDetails: null,
      textHeight: 10,
      editorState: EditorState.createEmpty(),
      attachment: null,
      attachmentName: null,
      wordCount: 0,
      showVideo: false,
    }
    // this.bottom = React.createRef();
    this.setInitialData(props)
    const subscription = API.graphql({
      query: subscriptions.onCreateMessage,
      variables: { roomId: props.groupId },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Observable<OnCreateMessageSubscription>

    subscription.subscribe({
      next: async () => {
        this.getMessages(null)
        // console.log({ onCreateMessage: todoData })
        // let temp: any = this.state.data
        // if (temp === null) temp = { items: [] }
        // if (temp.items == null) temp.items = [todoData.value.data.onCreateMessage]
        // else temp.items = [todoData.value.data.onCreateMessage, ...temp.items]
        // this.setState({ data: temp })
      },
    })

    const subscription2 = API.graphql({
      query: subscriptions.onCreateDirectMessage,
      variables: { messageRoomID: props.roomId },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Observable<OnCreateDirectMessageSubscription>

    subscription2.subscribe({
      next: async () => {
        this.getDirectMessages(null)
        this.getCourseAssignment()
        // console.log({ onCreateDirectMessage2: todoData })

        // let temp: any = this.state.data
        // if (temp === null) temp = { items: [] }
        // if (temp.items == null) temp.items = [todoData.value.data.onCreateDirectMessage]
        // else temp.items = [todoData.value.data.onCreateDirectMessage, ...temp.items]
        // this.setState({ data: temp })
      },
    })
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props !== prevProps) {
      this.setInitialData(this.props)
    }
  }

  async handleUpload(e: React.ChangeEvent<HTMLInputElement>): Promise<void> {
    const file = e.target?.files?.item(0)
    if (file) {
      try {
        const user = await Auth.currentCredentials()
        const userId = user.identityId
        const fn = "messages/uploads/" + "jc-upload-" + new Date().getTime() + "-" + file?.name
        const upload = await Storage.put(fn, file, {
          level: "protected",
          contentType: file?.type,
          identityId: userId,
        })
        if (upload) this.setState({ attachment: fn })
      } catch (e) {
        console.error(e)
      }
    }
  }

  getMessages(nextToken: string | null) {
    const messagesByRoom = API.graphql({
      query: queries.messagesByRoom,
      variables: {
        roomId: this.props.groupId,
        sortDirection: "DESC",
        limit: 10,
        nextToken: nextToken,
      },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<MessagesByRoomQuery>>

    const processMessages = (json: GraphQLResult<MessagesByRoomQuery>) => {
      if (json.data?.messagesByRoom)
        if (nextToken)
          this.setState({
            created: true,
            messages: [...this.state.messages, ...(json.data?.messagesByRoom?.items ?? [])],
            nextToken: json.data.messagesByRoom.nextToken,
          })
        else
          this.setState({
            created: true,
            messages: json.data.messagesByRoom.items ?? [],
            nextToken: json.data.messagesByRoom.nextToken,
          })
    }
    messagesByRoom.then(processMessages).catch(processMessages)
  }

  getDirectMessages(nextToken: string | null) {
    const directMessagesByRoom = API.graphql({
      query: queries.directMessagesByRoom,
      variables: {
        messageRoomID: this.props.roomId,
        sortDirection: "DESC",
        limit: 100,
        nextToken: nextToken,
      },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as Promise<GraphQLResult<DirectMessagesByRoomQuery>>

    const processMessages = (json: GraphQLResult<DirectMessagesByRoomQuery>) => {
      if (json.data?.directMessagesByRoom)
        if (nextToken)
          this.setState({
            created: true,
            directMessages: [
              ...this.state.directMessages,
              ...(json.data?.directMessagesByRoom.items ?? []),
            ],
            nextToken: json.data.directMessagesByRoom.nextToken,
          })
        else
          this.setState({
            created: true,
            directMessages: json.data.directMessagesByRoom.items ?? [],
            nextToken: json.data.directMessagesByRoom.nextToken,
          })
    }

    directMessagesByRoom.then(processMessages).catch(processMessages)
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
            dataAssignment: json.data.directMessagesByRoom.items ?? [],
          })
      }
      directMessagesByRoom.then(processAssignment).catch(processAssignment)
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
      // console.log(this.state.UserDetails)
    } catch (e) {
      console.log({ Error: e })
    }
    if (props.route?.params?.create === "true" || props.route?.params?.create === true) {
      this.setState({ created: false })
    } else if (this.props.groupId) {
      this.getMessages(null)
    } else if (this.props.roomId) {
      this.getDirectMessages(null)
      this.getCourseAssignment()
    }
  }

  renderFileDownloadBadge(
    item: State["messages"][0] | State["directMessages"][0]
  ): React.ReactNode {
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
        const z: CreateMessageInput = {
          id: Date.now().toString(),
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
          variables: { input: z },
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
          id: Date.now().toString(),
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
                  placeholder="Type your comments here..."
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
                    style == "course"
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
          <JCButton
            buttonType={
              style == "regular" || style == "course" || style == "courseResponse"
                ? ButtonTypes.SolidRightJustified
                : ButtonTypes.SolidRightJustifiedMini
            }
            onPress={() => {
              this.saveMessage()
            }}
          >
            {style == "course" || style == "courseResponse" ? "Save" : "Post"}
          </JCButton>
        </View>
      </View>
    )
  }
  renderDirectMessage(item: State["directMessages"][0], index: number) {
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
  renderMoreMessageButton() {
    return this.state.nextToken ? (
      <TouchableOpacity
        onPress={() => {
          if (this.props.groupId) this.loadMoreMessages()
          if (this.props.roomId) this.loadMoreDirectMessages()
        }}
      >
        <Card style={{ borderRadius: 10, minHeight: 50, marginBottom: 35, borderColor: "#ffffff" }}>
          <CardItem>
            <Text>Load More</Text>
          </CardItem>
        </Card>
      </TouchableOpacity>
    ) : null
  }
  renderAssignment() {
    if (this.state.dataAssignment?.length > 0) {
      return this.renderDirectMessage(this.state.dataAssignment[0], -1)
    }
  }
  renderMessagesInOrder() {
    const { style, groupId, roomId, inputAt } = this.props

    if (groupId) {
      const z = this.state.messages?.map((item, index: number) => {
        if (style === "courseResponse" && this.state.dataAssignment.length > 0) {
          if (item?.id === this.state.dataAssignment[0]?.id) {
            return null
          }
        }
        this.renderMessage(item, index)
      })

      if (inputAt === "bottom") return z.reverse()
      return z
    }

    if (roomId) {
      const z = this.state.directMessages?.map((item, index: number) => {
        if (style === "courseResponse" && this.state.dataAssignment.length > 0) {
          if (item?.id === this.state.dataAssignment[0]?.id) {
            return null
          }
        }
        this.renderDirectMessage(item, index)
      })

      if (inputAt === "bottom") return z.reverse()
      else return z
    }
  }

  renderMessages() {
    return (
      <>
        {this.props.style === "courseResponse" && this.renderAssignment()}
        {this.props.inputAt === "bottom" && this.renderMoreMessageButton()}
        {this.renderMessagesInOrder()}
        {this.props.inputAt === "top" && this.renderMoreMessageButton()}
      </>
    )
  }

  loadMoreDirectMessages() {
    console.log({ "LOADING MORE": this.state.nextToken })
    this.getDirectMessages(this.state.nextToken)
  }

  loadMoreMessages() {
    console.log({ "LOADING MORE": this.state.nextToken })
    this.getMessages(this.state.nextToken)
  }

  renderMessage(item: State["messages"][0], index: number) {
    const { style } = this.props

    return (
      <Card
        key={index}
        style={{ borderRadius: 10, minHeight: 50, marginBottom: 35, borderColor: "#ffffff" }}
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
                <ProfileImage size="small2" user={item?.owner ? item.owner : null}></ProfileImage>
              </TouchableOpacity>
              <Body>
                <Text style={this.styles.style.groupFormName}>
                  {item?.author ? item.author.given_name : null}{" "}
                  {item?.author ? item.author.family_name : null}
                </Text>
                <Text style={this.styles.style.groupFormRole}>
                  {item?.author ? item.author.currentRole : null}
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
                <ProfileImage size="small2" user={item?.owner ?? null}></ProfileImage>
              </TouchableOpacity>
            </Left>
            <Right style={{ flexDirection: "column", flex: 7, alignItems: "flex-start" }}>
              <Text style={this.styles.style.courseFormName}>
                {item?.author ? item.author.given_name : null}{" "}
                {item?.author ? item.author.family_name : null}
              </Text>
              {/* <Text style={this.styles.style.groupFormRole}>
                {item.author != null ? item.author.currentRole : null}
              </Text> */}
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

    if (groupId && roomId) {
      console.error("groupId and roomId cannot be used together")
      return null
    }

    return this.state.created ? (
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
    ) : null
  }
}

export default function MessageBoard(props: Props): JSX.Element {
  const route = useRoute()
  const navigation = useNavigation()
  return <MessageBoardImpl {...props} navigation={navigation} route={route} />
}
