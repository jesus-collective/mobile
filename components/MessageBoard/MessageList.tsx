import { GraphQLResult } from "@aws-amplify/api"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { API } from "aws-amplify"
import GRAPHQL_AUTH_MODE from "aws-amplify-react-native"
import { convertFromRaw } from "draft-js"
import { stateToHTML } from "draft-js-export-html"
import { Body, Card, CardItem, Left, Right } from "native-base"
import React from "react"
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from "react-native"
import Observable, { ZenObservable } from "zen-observable-ts"
import JCComponent, { JCState } from "../../components/JCComponent/JCComponent"
import ProfileImage from "../../components/ProfileImage/ProfileImage"
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
import MessageUtils from "./MessageUtils"

type Messages = NonNullable<MessagesByRoomQuery["messagesByRoom"]>["items"]
type Message = NonNullable<Messages>[0]
type Reply = NonNullable<NonNullable<NonNullable<Message>["replies"]>["items"]>[0]

interface Props {
  groupId?: string
  inputAt?: "top" | "bottom"
  style: "mini" | "regular" | "course" | "courseResponse"
  onHandlePressReply(item: Message | Reply): void
  onHandleCreated(): void
  route?: RouteProp<any, any>
  navigation?: any
  replies?: boolean
}
interface State extends JCState {
  nextToken: string | null

  messages: Messages
  fetchingData: boolean
}
class MessageListImpl extends JCComponent<Props, State> {
  flatListRef: React.RefObject<FlatList<any>>
  messageUnsubscribe?: ZenObservable.Subscription
  replyUnsubscribe?: ZenObservable.Subscription

  constructor(props: Props) {
    super(props)
    this.messageUnsubscribe = undefined
    this.replyUnsubscribe = undefined
    this.flatListRef = React.createRef<FlatList<any>>()

    this.state = {
      ...super.getInitialState(),
      messages: [],
      nextToken: null,
      fetchingData: false,
    }
    this.setInitialData(props)
  }
  async setInitialData(props: Props) {
    if (this.props.groupId) {
      this.getMessages()
    }
  }
  componentDidUpdate(prevProps: Props) {
    if (this.props !== prevProps) {
      this.setInitialData(this.props)
    }
  }

  componentDidMount() {
    this.connectSubscriptions()
    /* if (this.props.inputAt !== "bottom" && !isFirefox) {
      const scrollNode = this.flatListRef.current && this.flatListRef.current?.getScrollableNode()
      if (!!scrollNode)
        scrollNode.addEventListener("wheel", (e: any) => {
          scrollNode.scrollTop -= e.deltaY
          e.preventDefault()
        })
      //this.flatListRef.current?.setNativeProps({
      //  style: { transform: "translate3d(0,0,0) scaleY(-1)" },
      //})
    }*/
  }
  componentWillUnmount() {
    /*  if (this.props.inputAt !== "bottom" && !isFirefox) {
      const scrollNode = this.flatListRef.current && this.flatListRef.current?.getScrollableNode()
      if (!!scrollNode)
        scrollNode.removeEventListener("wheel", (e: any) => {
          scrollNode.scrollTop -= e.deltaY
          e.preventDefault()
        })
    }*/
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
  }
  removeSubscriptions() {
    if (this.props.groupId) {
      this.messageUnsubscribe?.unsubscribe()
      this.replyUnsubscribe?.unsubscribe()
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
          messages: messages.data.messagesByRoom.items,
          nextToken: messages.data.messagesByRoom.nextToken,
        })
        this.props.onHandleCreated()
      }
    } catch (e) {
      console.debug(e)
      if (e.data?.messagesByRoom) {
        this.setState({
          messages: e.data.messagesByRoom.items,
          nextToken: e.data.messagesByRoom.nextToken,
        })
        this.props.onHandleCreated()
      }
    }
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
  showProfile(id: string | undefined) {
    if (id) this.props.navigation?.push("ProfileScreen", { id: id, create: false })
  }
  renderMessageWithReplies(item: Message, index: number) {
    return (
      <View style={{ marginBottom: 20 }} key={index}>
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
          shadowColor: "#ffffff",
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
                {isReply && <ProfileImage size="smallReply" user={item?.author?.id ?? null} />}
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
                    {new Date(parseInt(item?.when, 10)).toLocaleDateString()}
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
                  onPress={() => this.props.onHandlePressReply(item)}
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
                {isReply && <ProfileImage size="smallReply" user={item?.author?.id ?? null} />}
              </TouchableOpacity>
            </Left>
            <Right style={this.styles.style.miniMessageBoardRight}>
              <View>
                <Text style={this.styles.style.courseFormName}>
                  {item?.author?.given_name ?? ""} {item?.author?.family_name ?? ""}
                </Text>
                {item?.when && (
                  <Text style={this.styles.style.groupFormDate}>
                    {new Date(parseInt(item?.when, 10)).toLocaleDateString()}
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
                      paddingTop: 4,
                      paddingBottom: 4,
                      paddingLeft: 10,
                      paddingRight: 10,
                    }}
                    onPress={() => this.props.onHandlePressReply(item)}
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
        {item?.attachment ? (
          <CardItem>{MessageUtils.renderFileDownloadBadge(item)}</CardItem>
        ) : null}
      </Card>
    )
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

  messagesLoader() {
    if (this.state.nextToken) return <ActivityIndicator animating color="#F0493E" />
    return null
  }

  render() {
    return (
      <FlatList
        ref={this.flatListRef}
        scrollEnabled
        renderItem={({ item, index }) => this.renderMessageWithReplies(item, index)}
        data={this.state.messages}
        inverted={this.props.inputAt === "bottom"}
        onEndReached={!this.state.fetchingData ? () => this.getMoreMessages() : undefined}
        style={{ height: "45vw" }}
        ListFooterComponent={() => this.messagesLoader()}
        refreshing={this.state.fetchingData}
        onEndReachedThreshold={0.1}
      />
    )
  }
}

export default function MessageList(props: Props): JSX.Element {
  const route = useRoute()
  const navigation = useNavigation()
  return <MessageListImpl {...props} navigation={navigation} route={route} />
}
