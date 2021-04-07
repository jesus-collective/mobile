import { GraphQLResult } from "@aws-amplify/api"
import { AntDesign, FontAwesome5 } from "@expo/vector-icons"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { API, Auth, graphqlOperation, Storage } from "aws-amplify"
import GRAPHQL_AUTH_MODE from "aws-amplify-react-native"
import { convertFromRaw, convertToRaw, EditorState } from "draft-js"
import { stateToHTML } from "draft-js-export-html"
import { Badge, Card, CardItem, Container, Left, Right, StyleProvider } from "native-base"
import React from "react"
import { Editor } from "react-draft-wysiwyg"
import { Dimensions, FlatList, Text, TouchableOpacity, View } from "react-native"
import { v4 as uuidv4 } from "uuid"
import Observable, { ZenObservable } from "zen-observable-ts"
import JCButton, { ButtonTypes } from "../../components/Forms/JCButton"
import ProfileImage from "../../components/ProfileImage/ProfileImage"
import getTheme from "../../native-base-theme/components"
import {
  CreateCRMMessageInput,
  CreateCrmMessageMutation,
  CreateCRMReplyInput,
  CreateCrmReplyMutation,
  GetUserQuery,
  OnCreateCrmMessageByRootIdSubscription,
  OnCreateCrmReplyByRootIdSubscription,
} from "../../src/API"
import { GetCrmRootQuery } from "../../src/API-crm"
import { createCrmMessage, createCrmReply } from "../../src/graphql/mutations"
import { getUser } from "../../src/graphql/queries"
import {
  onCreateCrmMessageByRootId,
  onCreateCrmReplyByRootId,
} from "../../src/graphql/subscriptions"
import { JCCognitoUser } from "../../src/types"
import JCComponent, { JCState } from "../JCComponent/JCComponent"
import FileUpload from "./FileUpload"
import "./MessageBoard.css"
import "./react-draft-wysiwyg.css"

type Messages = NonNullable<NonNullable<GetCrmRootQuery["getCRMRoot"]>["messages"]>["items"]
type Message = NonNullable<Messages>[0]
type Replies = NonNullable<NonNullable<Message>["thread"]>["items"]
type Reply = NonNullable<Replies>[0]

interface Props {
  rootId?: string
  messages: Messages
  route?: RouteProp<any, any>
  navigation?: any
}

interface State extends JCState {
  messages: Messages
  editorState: EditorState
  attachment: string
  userDetails: GetUserQuery["getUser"]
  replyToParentId: string
  replyToWho: string
}
class CrmMessageBoardImpl extends JCComponent<Props, State> {
  messageUnsubscribe?: ZenObservable.Subscription
  replyUnsubscribe?: ZenObservable.Subscription

  constructor(props: Props) {
    super(props)
    this.messageUnsubscribe = undefined
    this.replyUnsubscribe = undefined
    this.state = {
      ...super.getInitialState(),
      messages: props.messages?.reverse(),
      editorState: EditorState.createEmpty(),
      attachment: "",
      userDetails: null,
      replyToParentId: "",
      replyToWho: "",
    }
  }

  async connectSubscriptions() {
    const { rootId } = this.props
    const variables = {
      rootId,
    }

    const crmMessageListener = (await API.graphql({
      query: onCreateCrmMessageByRootId,
      variables,
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    })) as Observable<{
      provider: any
      value: GraphQLResult<OnCreateCrmMessageByRootIdSubscription>
    }>

    this.messageUnsubscribe = crmMessageListener.subscribe({
      next: (incoming) => {
        console.debug("new message:", incoming)

        if (incoming.value.data?.onCreateCrmMessageByRootId) {
          this.setState({
            messages: [
              ...[incoming.value.data.onCreateCrmMessageByRootId],
              ...(this.state.messages ?? []),
            ],
          })
        }
      },
    })

    const crmReplyListener = (await API.graphql({
      query: onCreateCrmReplyByRootId,
      variables,
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    })) as Observable<{
      provider: any
      value: GraphQLResult<OnCreateCrmReplyByRootIdSubscription>
    }>
    this.replyUnsubscribe = crmReplyListener.subscribe({
      next: async (incoming) => {
        console.debug("new reply:", incoming)
        const newReply = incoming.value?.data?.onCreateCrmReplyByRootId

        if (newReply) {
          const { messages } = this.state
          const index = messages?.findIndex((m) => m?.id === newReply?.parentId)

          const {
            id,
            rootId,
            content,
            when,
            authorName,
            authorId,
            attachment,
            parentId,
            createdAt,
            updatedAt,
            __typename,
            parent,
          } = newReply

          if (index !== undefined && messages?.[index]?.thread?.items && parent) {
            const updatedItems: Replies = [
              ...(messages[index]?.thread?.items ?? []),
              ...[
                {
                  id,
                  rootId,
                  content,
                  when,
                  authorName,
                  authorId,
                  attachment,
                  parentId,
                  createdAt,
                  updatedAt,
                  __typename,
                },
              ],
            ]

            delete (parent as any)["crmRoot"]

            const updatedMessage: Message = {
              ...parent,
              thread: {
                __typename: "ModelCRMReplyConnection",
                items: updatedItems,
              },
            }

            messages[index] = updatedMessage

            this.setState({ messages })
          }
        }
      },
    })
  }

  removeSubscriptions() {
    this.messageUnsubscribe?.unsubscribe()
    this.replyUnsubscribe?.unsubscribe()
  }

  async componentDidMount() {
    await this.getUser()
    await this.connectSubscriptions()
  }

  componentWillUnmount() {
    this.removeSubscriptions()
  }

  async handleUpload(e: React.ChangeEvent<HTMLInputElement>): Promise<void> {
    const file = e.target.files?.length ? e.target.files[0] : null

    if (file) {
      try {
        const user = await Auth.currentCredentials()
        const userId = user.identityId
        const attachment =
          "messages/uploads/" + "jc-upload-" + new Date().getTime() + "-" + file.name
        const upload = await Storage.put(attachment, file, {
          level: "protected",
          contentType: file.type,
          identityId: userId,
        })
        if (upload) {
          this.setState({ attachment })
        }
      } catch (e) {
        console.error(e)
      }
    }
  }

  async getUser() {
    try {
      const user = (await Auth.currentAuthenticatedUser()) as JCCognitoUser

      const json = (await API.graphql(
        graphqlOperation(getUser, { id: user.username })
      )) as GraphQLResult<GetUserQuery>
      this.setState({
        userDetails: json.data?.getUser ?? null,
      })
    } catch (e) {
      console.log(e)
    }
  }

  renderFileDownloadBadge(item: Message | Reply): React.ReactNode {
    return (
      <TouchableOpacity onPress={() => this.getAttachment(item?.attachment, item?.attachmentOwner)}>
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

  async getAttachment(filePath?: string | null, owner: string): Promise<void> {
    if (!filePath) return

    try {
      const user = await Auth.currentCredentials()
      const userId = user.identityId

      const res = await Storage.get(filePath, {
        level: "protected",
        identityId: owner,
      })

      window.open(res as string, "_blank", "")
    } catch (e) {
      console.error(e)
    }
  }

  convertCommentFromJSONToHTML = (text?: string | null) => {
    const errorMarkdown = "<div> ERROR: Message Can't Be Displayed</div>"

    if (!text) return errorMarkdown

    try {
      return stateToHTML(convertFromRaw(JSON.parse(text)))
    } catch (e) {
      console.error(e)
      return errorMarkdown
    }
  }

  async saveMessage(): Promise<void> {
    const { editorState, attachment, userDetails } = this.state
    const { rootId } = this.props

    if (!editorState.getCurrentContent().hasText() || !rootId || !userDetails?.id) {
      return
    }
    const message = JSON.stringify(convertToRaw(editorState.getCurrentContent()))
    const input: CreateCRMMessageInput = {
      id: uuidv4(),
      rootId,
      content: message,
      when: Date.now().toString(),
      attachment: attachment,
      authorName: `${userDetails?.given_name} ${userDetails?.family_name}`,
      authorId: userDetails.id,
    }

    try {
      const createMessage = (await API.graphql({
        query: createCrmMessage,
        variables: { input },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })) as GraphQLResult<CreateCrmMessageMutation>
      console.log({ "Success mutations.createCrmMessage": createMessage })
      this.setState({
        editorState: EditorState.createEmpty(),
        attachment: "",
      })
    } catch (err) {
      console.error({ "Error mutations.createCrmMessage": err })
      if (err.data.createCrmMessage) {
        this.setState({
          editorState: EditorState.createEmpty(),
          attachment: "",
        })
      }
    }
  }

  renderFileUploadBadge(): React.ReactNode {
    const { attachment } = this.state

    return (
      <View style={{ marginRight: 12 }}>
        <Badge style={{ backgroundColor: "#EFF1F5", marginRight: 10, marginTop: 5, height: 30 }}>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            {this.renderFileIcon(attachment)}
            <Text style={{ fontSize: 16, marginHorizontal: 5 }}>
              {this.processFileName(attachment)}
            </Text>
            <TouchableOpacity onPress={() => this.setState({ attachment: "" })}>
              <AntDesign name="close" size={20} color="black" />
            </TouchableOpacity>
          </View>
        </Badge>
      </View>
    )
  }

  renderMessageInput() {
    const { replyToWho, replyToParentId, editorState, attachment } = this.state

    return (
      <View style={{ marginVertical: 20 }}>
        <Editor
          spellCheck
          placeholder="Add records..."
          editorState={editorState}
          toolbarStyle={{ fontFamily: "Graphik-Regular-App" }}
          editorClassName="customEditorSendmessage has-toolbar"
          onEditorStateChange={(editorState) => {
            this.setState({ editorState })
          }}
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
            <FileUpload key="fileupload" handleUploadCallback={(e) => this.handleUpload(e)} />,
          ]}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            marginTop: 5,
          }}
        >
          {replyToParentId && (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
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
                {replyToWho}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ replyToParentId: "", replyToWho: "" })
                }}
              >
                <AntDesign name="closecircleo" size={20} color="#333333" />
              </TouchableOpacity>
            </View>
          )}
          {attachment ? this.renderFileUploadBadge() : null}
          <JCButton
            buttonType={ButtonTypes.SolidRightJustified}
            onPress={async () => {
              replyToParentId ? await this.sendReply() : await this.saveMessage()
            }}
          >
            Post
          </JCButton>
        </View>
      </View>
    )
  }

  async sendReply() {
    const { editorState, attachment, userDetails, replyToParentId } = this.state
    const { rootId } = this.props
    if (
      !editorState.getCurrentContent().hasText() ||
      !replyToParentId ||
      !userDetails?.id ||
      !rootId
    ) {
      return
    }
    try {
      const message = JSON.stringify(convertToRaw(editorState.getCurrentContent()))
      const input: CreateCRMReplyInput = {
        id: uuidv4(),
        rootId,
        content: message,
        when: Date.now().toString(),
        authorName: `${userDetails?.given_name} ${userDetails?.family_name}`,
        authorId: userDetails.id,
        attachment,
        parentId: replyToParentId,
      }

      const createReply = (await API.graphql({
        query: createCrmReply,
        variables: { input },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })) as GraphQLResult<CreateCrmReplyMutation>

      console.log({ "Success mutations.createCrmReply": createReply })
      this.setState({
        editorState: EditorState.createEmpty(),
        attachment: "",
        replyToParentId: "",
        replyToWho: "",
      })
    } catch (e) {
      if (e.data?.createCrmReply) {
        console.log({ "Success mutations.createCrmReply": e.data })
        this.setState({
          editorState: EditorState.createEmpty(),
          attachment: "",
          replyToParentId: "",
          replyToWho: "",
        })
      } else {
        console.error({ "Error mutations.createCrmReply": e })
      }
    }
  }

  renderMessageWithReplies(item: Message, index: number) {
    const parentId = item?.id

    if (parentId) {
      return (
        <View style={{ marginBottom: 35 }} key={index}>
          {this.renderMessage(item, index, parentId, false)}
          {item?.thread?.items?.map((reply, index) => {
            return this.renderMessage(reply, index, parentId, true)
          })}
        </View>
      )
    }

    return null
  }

  handlePressReply(item: Message | Reply, parentId: string, isReply: boolean) {
    this.setState({
      replyToParentId: parentId,
      replyToWho: `${
        isReply || (item && "thread" in item && item.thread?.items?.length)
          ? "Continuing thread with"
          : "Starting thread with"
      } ${item?.authorName}`,
    })
  }

  renderMessage(item: Message | Reply, index: number, parentId: string, isReply: boolean) {
    if (item) {
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
          <CardItem style={this.styles.style.coursePageMessageBoard}>
            <Left style={this.styles.style.coursePageMessageBoardLeftMini}>
              <TouchableOpacity
                key={item?.id}
                onPress={() =>
                  this.props.navigation?.push("ProfileScreen", {
                    id: item?.authorId,
                    create: false,
                  })
                }
              >
                <ProfileImage size="small2" user={item?.authorId ?? null} />
              </TouchableOpacity>
            </Left>
            <Right style={this.styles.style.miniMessageBoardRight}>
              <View>
                <Text style={this.styles.style.courseFormName}>{item?.authorName}</Text>
                {item?.when && (
                  <Text style={this.styles.style.groupFormDate}>
                    {new Date(parseInt(item?.when, 10)).toLocaleString()}
                  </Text>
                )}
              </View>
              <View>
                <TouchableOpacity
                  style={{
                    alignSelf: "flex-end",
                    margin: 0,
                    borderWidth: 1,
                    borderColor: "#F0493E",
                    borderRadius: 4,
                    paddingVertical: 7,
                    paddingHorizontal: 23,
                  }}
                  onPress={() => this.handlePressReply(item, parentId, isReply)}
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
                    {`${
                      isReply || ("thread" in item && item.thread?.items?.length)
                        ? "continue"
                        : "start"
                    } thread`}
                  </Text>
                </TouchableOpacity>
              </View>
            </Right>
          </CardItem>
          <CardItem style={this.styles.style.eventPageMessageBoardInnerCard}>
            <div id="comment-div">
              <div
                dangerouslySetInnerHTML={{
                  __html: this.convertCommentFromJSONToHTML(item?.content),
                }}
              ></div>
            </div>
          </CardItem>
          {item?.attachment ? <CardItem>{this.renderFileDownloadBadge(item)}</CardItem> : null}
        </Card>
      )
    }
    return null
  }

  render() {
    const { messages } = this.state
    const { height } = Dimensions.get("window")

    if (this.props.messages && this.props.rootId) {
      return (
        <StyleProvider style={getTheme()}>
          <Container style={this.styles.style.messageBoardContainerFullSize}>
            {this.renderMessageInput()}
            <FlatList
              scrollEnabled
              renderItem={({ item, index }) => this.renderMessageWithReplies(item, index)}
              data={messages}
              style={{ height: height - 280 }}
            />
          </Container>
        </StyleProvider>
      )
    }

    return null
  }
}

export default function CrmMessageBoard({
  rootId,
  messages,
}: Pick<Props, "rootId" | "messages">): JSX.Element {
  const route = useRoute()
  const navigation = useNavigation()

  return (
    <CrmMessageBoardImpl
      rootId={rootId}
      messages={messages}
      navigation={navigation}
      route={route}
    />
  )
}
