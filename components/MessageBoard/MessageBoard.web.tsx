import { GraphQLResult } from "@aws-amplify/api"
import { AntDesign, FontAwesome5 } from "@expo/vector-icons"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { API, Auth, graphqlOperation, Storage } from "aws-amplify"
import GRAPHQL_AUTH_MODE from "aws-amplify-react-native"
import { convertFromRaw, convertToRaw, EditorState } from "draft-js"
import { stateToHTML } from "draft-js-export-html"
import { Badge, Body, Card, CardItem, Container, Left, Right, StyleProvider } from "native-base"
import React from "react"
import { isFirefox } from "react-device-detect"
import { Editor } from "react-draft-wysiwyg"
import { ActivityIndicator, Dimensions, Text, TouchableOpacity, View } from "react-native"
import { FlatList } from "react-native-gesture-handler"
import { v4 as uuidv4 } from "uuid"
import Observable, { ZenObservable } from "zen-observable-ts"
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
  GetDirectMessageQuery,
  GetUserQuery,
  OnCreateDirectMessageSubscription,
} from "../../src/API"
import {
  GetMessageQuery,
  MessagesByRoomQuery,
  OnCreateMessageByRoomIdSubscription,
  OnCreateReplySubscription,
} from "../../src/API-messages"
import {
  getMessage,
  messagesByRoom,
  onCreateMessageByRoomId,
  onCreateReply,
} from "../../src/graphql-custom/messages"
import * as mutations from "../../src/graphql/mutations"
import * as queries from "../../src/graphql/queries"
import { onCreateDirectMessage } from "../../src/graphql/subscriptions"
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
  replyToRoomId: string
  fetchingData: boolean
}
class MessageBoardImpl extends JCComponent<Props, State> {
  flatListRef: React.RefObject<FlatList<any>>
  messageUnsubscribe?: ZenObservable.Subscription
  replyUnsubscribe?: ZenObservable.Subscription
  dmUnsubscribe?: ZenObservable.Subscription

  constructor(props: Props) {
    super(props)
    this.flatListRef = React.createRef<FlatList<any>>()
    this.messageUnsubscribe = undefined
    this.replyUnsubscribe = undefined
    this.dmUnsubscribe = undefined
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
      replyToRoomId: "",
      fetchingData: false,
    }
    this.setInitialData(props)
  }
  static defaultProps = {
    inputAt: "top",
  }

  async connectSubscriptions() {
    if (this.props.groupId) {
      const messageSub = API.graphql({
        query: onCreateMessageByRoomId,
        variables: { roomId: this.props.groupId },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      }) as Observable<{
        provider: any
        value: GraphQLResult<OnCreateMessageByRoomIdSubscription>
      }>
      this.messageUnsubscribe = messageSub.subscribe({
        next: (incoming) => {
          console.debug(incoming)
          if (incoming.value.data?.onCreateMessageByRoomId) {
            this.setState({
              messages: [
                ...[incoming.value.data.onCreateMessageByRoomId],
                ...(this.state.messages ?? []),
              ],
            })
          }
        },
      })
      const replySub = API.graphql({
        query: onCreateReply,
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      }) as Observable<{
        provider: any
        value: GraphQLResult<OnCreateReplySubscription>
      }>
      this.replyUnsubscribe = replySub.subscribe({
        next: async (incoming) => {
          console.debug(incoming)
          if (
            incoming.value?.data?.onCreateReply?.parentMessage &&
            incoming.value?.data.onCreateReply?.parentMessage?.roomId === this.props.groupId
          ) {
            const { messages } = this.state
            // find incoming reply's parent message in current state
            const index = messages?.findIndex(
              (m) => m?.id === incoming.value?.data?.onCreateReply?.messageId
            )

            try {
              const updatedMessage = (await API.graphql({
                query: getMessage,
                variables: {
                  id: incoming.value.data.onCreateReply.messageId,
                },
                authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
              })) as GraphQLResult<GetMessageQuery>

              if (
                updatedMessage.data?.getMessage &&
                index !== undefined &&
                messages &&
                messages[index]
              ) {
                // replace old message/replies with incoming data
                messages[index] = updatedMessage.data.getMessage
                this.setState({ messages })
              }
            } catch (e) {
              console.debug(e)
              if (e.data?.getMessage && index !== undefined && messages && messages[index]) {
                // replace old message/replies with incoming data
                messages[index] = e.data.getMessage
                this.setState({ messages })
              }
            }
          }
        },
      })
    }

    if (this.props.roomId) {
      const dmSub = (await API.graphql({
        query: onCreateDirectMessage,
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })) as Observable<{
        provider: any
        value: GraphQLResult<OnCreateDirectMessageSubscription>
      }>
      this.dmUnsubscribe = dmSub.subscribe({
        next: async (incoming) => {
          console.debug(incoming)
          if (
            incoming.value?.data?.onCreateDirectMessage &&
            incoming.value?.data?.onCreateDirectMessage?.messageRoomID === this.props.roomId
          ) {
            try {
              const directMessage = (await API.graphql({
                query: queries.getDirectMessage,
                variables: {
                  id: incoming.value.data.onCreateDirectMessage.id,
                },
                authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
              })) as GraphQLResult<GetDirectMessageQuery>

              console.debug(directMessage)
              if (directMessage.data?.getDirectMessage) {
                this.setState({
                  dms: [...[directMessage.data.getDirectMessage], ...(this.state.dms ?? [])],
                })
              }
            } catch (e) {
              console.debug(e)
              if (e.data?.getDirectMessage) {
                this.setState({
                  dms: [...[e.data.getDirectMessage], ...(this.state.dms ?? [])],
                })
              }
            }
          }
        },
      })
    }
  }

  removeSubscriptions() {
    if (this.props.groupId) {
      this.messageUnsubscribe?.unsubscribe()
      this.replyUnsubscribe?.unsubscribe()
    }

    if (this.props.roomId) {
      this.dmUnsubscribe?.unsubscribe
    }
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
      const messages = (await API.graphql({
        query: messagesByRoom,
        variables: {
          roomId: this.props.groupId,
          sortDirection: "DESC",
          limit: 10,
        },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })) as GraphQLResult<MessagesByRoomQuery>

      console.debug(messages)

      if (messages.data?.messagesByRoom?.items) {
        this.setState({
          created: true,
          messages: messages.data.messagesByRoom.items,
          nextToken: messages.data.messagesByRoom.nextToken,
        })
      }
    } catch (e) {
      console.debug(e)
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

      console.debug(directMessagesByRoom)

      if (directMessagesByRoom.data?.directMessagesByRoom?.items) {
        this.setState({
          created: true,
          dms: directMessagesByRoom.data.directMessagesByRoom.items,
          nextToken: directMessagesByRoom.data.directMessagesByRoom.nextToken,
        })
      }
    } catch (e) {
      console.debug(e)
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

  componentDidMount() {
    this.connectSubscriptions()

    /* hack to get natural scrolling in an inverted flatlist
    https://github.com/necolas/react-native-web/issues/995#issuecomment-511242048 

    natural scroll occurs by default on firefox
    chromium-based browsers require this hack
    */
    if (this.props.inputAt !== "bottom" && !isFirefox) {
      const scrollNode = this.flatListRef.current && this.flatListRef.current?.getScrollableNode()
      if (!!scrollNode)
        scrollNode.addEventListener("wheel", (e: any) => {
          scrollNode.scrollTop -= e.deltaY
          e.preventDefault()
        })
      this.flatListRef.current?.setNativeProps({
        style: { transform: "translate3d(0,0,0) scaleY(-1)" },
      })
    }
  }

  componentWillUnmount() {
    this.removeSubscriptions()

    /* remove event listener on unmount */
    if (this.props.inputAt !== "bottom" && !isFirefox) {
      const scrollNode = this.flatListRef.current && this.flatListRef.current?.getScrollableNode()
      if (!!scrollNode)
        scrollNode.removeEventListener("wheel", (e: any) => {
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
      console.log(e)
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
              {this.processFileName(item?.attachment)}
            </Text>
          </View>
        </Badge>
      </TouchableOpacity>
    )
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
      console.error(e)
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
            console.error({ "Error mutations.createMessage": err })
            if (err.data.createMessage) {
              this.setState({
                editorState: EditorState.createEmpty(),
                attachmentName: "",
                attachment: "",
              })
            }
          })
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
        const createDirectMessage = API.graphql({
          query: mutations.createDirectMessage,
          variables: { input },
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
            console.error({ "Error mutations.createDirectMessage ": err })
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
      replyToText = this.state.replyToWho[0]
    }
    if (this.state.replyToWho.length > 1) {
      replyToText = `${this.state.replyToWho[0]} and ${this.state.replyToWho[1]}`
    }
    if (this.state.replyToWho.length > 2) {
      replyToText = `${this.state.replyToWho[0]} and others`
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
            onPress={() => {
              this.state.replyToId ? this.sendReply() : this.saveMessage()
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
              <ProfileImage size="small2" user={item.author?.id ?? null} />
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
            onEndReached={!this.state.fetchingData ? () => this.getMoreMessages() : undefined}
            style={{ height: 0.5 * height }}
            ListFooterComponent={() => this.messagesLoader()}
            refreshing={this.state.fetchingData}
            onEndReachedThreshold={0.1}
          />
        ) : this.props.roomId ? (
          <FlatList
            scrollEnabled
            renderItem={({ item, index }) => this.renderDirectMessage(item, index)}
            data={this.state.dms}
            inverted={this.props.inputAt === "bottom"}
            onEndReached={!this.state.fetchingData ? () => this.getMoreDirectMessages() : undefined}
            style={{ height: 0.5 * height }}
            ListFooterComponent={() => this.messagesLoader()}
            refreshing={this.state.fetchingData}
            onEndReachedThreshold={0.1}
          />
        ) : null}
      </>
    )
  }

  async getMoreMessages() {
    this.setState({ fetchingData: true })
    if (this.state.nextToken) {
      try {
        const messages = (await API.graphql({
          query: messagesByRoom,
          variables: {
            roomId: this.props.groupId,
            sortDirection: "DESC",
            limit: 10,
            nextToken: this.state.nextToken,
          },
          authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
        })) as GraphQLResult<MessagesByRoomQuery>

        if (messages.data?.messagesByRoom?.items) {
          this.setState({
            messages: [...(this.state.messages ?? []), ...messages.data.messagesByRoom.items],
            nextToken: messages.data.messagesByRoom.nextToken,
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
    const { editorState, attachment, attachmentName, replyToId, replyToRoomId } = this.state
    console.log(replyToRoomId)
    if (!editorState.getCurrentContent().hasText() || !replyToId || !replyToRoomId) {
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

  renderMessageWithReplies(item: Message, index: number) {
    return (
      <View style={{ marginBottom: 35 }} key={index}>
        {this.renderMessage(item, index, false)}
        {item?.replies?.items?.map((reply, index) => {
          return this.renderMessage(reply, index, true)
        })}
      </View>
    )
  }

  renderMessage(item: Message | Reply, index: number, isReply: boolean) {
    const { style, replies } = this.props

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
                  <ProfileImage size="small2" user={item?.owner ?? null} />
                )}
                {isReply && <ProfileImage size="small2" user={item?.author?.id ?? null} />}
              </TouchableOpacity>
              <Body>
                <Text style={this.styles.style.groupFormName}>
                  {item?.author?.given_name ?? ""} {item?.author?.family_name ?? ""}
                </Text>
                <Text style={this.styles.style.groupFormRole}>
                  {item?.author?.currentRole ?? ""}
                </Text>
                {item?.when && (
                  <Text style={this.styles.style.MessageBoardFormDate}>
                    {new Date(parseInt(item?.when, 10)).toLocaleString()}
                  </Text>
                )}
              </Body>
            </Left>
            <Right style={{ justifyContent: "center" }}>
              {replies && (
                <TouchableOpacity
                  style={{
                    alignSelf: "flex-end",
                    margin: 24,
                    borderWidth: 1,
                    borderColor: "#F0493E",
                    borderRadius: 4,
                    paddingTop: 7,
                    paddingBottom: 7,
                    paddingLeft: 23,
                    paddingRight: 23,
                  }}
                  onPress={() => this.handlePressReply(item)}
                >
                  <Text
                    style={{
                      fontFamily: "Graphik-Regular-App",
                      fontWeight: "normal",
                      fontSize: 14,
                      lineHeight: 20,
                      color: "#F0493E",
                    }}
                  >
                    reply
                  </Text>
                </TouchableOpacity>
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
                  <ProfileImage size="small2" user={item?.owner ?? null} />
                )}
                {isReply && <ProfileImage size="small2" user={item?.author?.id ?? null} />}
              </TouchableOpacity>
            </Left>
            <Right style={this.styles.style.miniMessageBoardRight}>
              <View>
                <Text style={this.styles.style.courseFormName}>
                  {item?.author?.given_name ?? ""} {item?.author?.family_name ?? ""}
                </Text>
                {item?.when && (
                  <Text style={this.styles.style.groupFormDate}>
                    {new Date(parseInt(item?.when, 10)).toLocaleString()}
                  </Text>
                )}
              </View>
              <View>
                {replies && (
                  <TouchableOpacity
                    style={{
                      alignSelf: "flex-end",
                      margin: 0,
                      borderWidth: 1,
                      borderColor: "#F0493E",
                      borderRadius: 4,
                      paddingTop: 7,
                      paddingBottom: 7,
                      paddingLeft: 23,
                      paddingRight: 23,
                    }}
                    onPress={() => this.handlePressReply(item)}
                  >
                    <Text
                      style={{
                        fontFamily: "Graphik-Regular-App",
                        fontWeight: "normal",
                        fontSize: 14,
                        lineHeight: 20,
                        color: "#F0493E",
                      }}
                    >
                      reply
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
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
