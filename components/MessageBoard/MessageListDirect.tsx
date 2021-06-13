import { GraphQLResult } from "@aws-amplify/api"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { API } from "aws-amplify"
import GRAPHQL_AUTH_MODE from "aws-amplify-react-native"
import { convertFromRaw } from "draft-js"
import { stateToHTML } from "draft-js-export-html"
import { Body, Card, CardItem, Left, Right } from "native-base"
import React from "react"
import { ActivityIndicator, Dimensions, FlatList, Text, TouchableOpacity, View } from "react-native"
import Observable, { ZenObservable } from "zen-observable-ts"
import JCComponent, { JCState } from "../../components/JCComponent/JCComponent"
import {
  DirectMessagesByRoomQuery,
  GetDirectMessageQuery,
  OnCreateDirectMessageReplySubscription,
  OnCreateDirectMessageSubscription,
} from "../../src/API-messages"
import {
  directMessagesByRoom,
  getDirectMessage,
  onCreateDirectMessageReply,
} from "../../src/graphql-custom/messages"
import * as queries from "../../src/graphql/queries"
import { onCreateDirectMessage } from "../../src/graphql/subscriptions"
import ProfileImage from "../ProfileImage/ProfileImage"
import MessageUtils from "./MessageUtils"

type DMs = NonNullable<DirectMessagesByRoomQuery["directMessagesByRoom"]>["items"]
type DM = NonNullable<DMs>[0]
type DMReply = NonNullable<NonNullable<NonNullable<DM>["replies"]>["items"]>[0]

interface Props {
  roomId?: string
  inputAt?: "top" | "bottom"
  style: "mini" | "regular" | "course" | "courseResponse"
  onHandlePressReply(item: DM | DMReply): void
  onHandleCreated(): void
  route?: RouteProp<any, any>
  navigation?: StackNavigationProp<any, any>
  replies?: boolean
}
interface State extends JCState {
  nextToken: string | null | undefined
  dataAssignment: any

  dms: DMs
  fetchingData: boolean
}

class MessageListDirectImpl extends JCComponent<Props, State> {
  dmUnsubscribe?: ZenObservable.Subscription
  dmReplyUnsubscribe?: ZenObservable.Subscription

  constructor(props: Props) {
    super(props)
    this.dmUnsubscribe = undefined
    this.dmReplyUnsubscribe = undefined

    this.state = {
      ...super.getInitialState(),
      dms: [],
      dataAssignment: [],

      nextToken: null,
      fetchingData: false,
    }
    this.setInitialData()
  }
  async setInitialData() {
    if (this.props.roomId) {
      this.getDirectMessages()
      this.getCourseAssignment()
      this.connectDirectSubscriptions()
    }
  }
  componentDidUpdate(prevProps: Props) {
    if (this.props.roomId !== prevProps.roomId) {
      this.removeDirectSubscriptions()
      this.setState(
        {
          ...super.getInitialState(),
          dms: [],
          dataAssignment: [],

          nextToken: null,
          fetchingData: false,
        },
        () => {
          this.setInitialData()
        }
      )
    }
  }
  connectDirectSubscriptions() {
    if (this.props.roomId) {
      console.log("Setup subscription")
      const dmSub = API.graphql({
        query: onCreateDirectMessage,
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      }) as Observable<{
        provider: any
        value: GraphQLResult<OnCreateDirectMessageSubscription>
      }>
      this.dmUnsubscribe = dmSub.subscribe({
        next: async (incoming) => {
          console.log(incoming)
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

      const dmReplySub = API.graphql({
        query: onCreateDirectMessageReply,
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      }) as Observable<{
        provider: any
        value: GraphQLResult<OnCreateDirectMessageReplySubscription>
      }>
      this.dmReplyUnsubscribe = dmReplySub.subscribe({
        next: async (incoming) => {
          console.debug(incoming)
          if (
            incoming.value?.data?.onCreateDirectMessageReply?.parentMessage &&
            incoming.value?.data.onCreateDirectMessageReply?.parentMessage?.messageRoomID ===
              this.props.roomId
          ) {
            const { dms } = this.state
            // find incoming reply's parent message in current state
            const index = dms?.findIndex(
              (m) => m?.id === incoming.value?.data?.onCreateDirectMessageReply?.messageId
            )

            try {
              const updatedMessage = (await API.graphql({
                query: getDirectMessage,
                variables: {
                  id: incoming.value.data.onCreateDirectMessageReply.messageId,
                },
                authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
              })) as GraphQLResult<GetDirectMessageQuery>

              if (
                updatedMessage.data?.getDirectMessage &&
                index !== undefined &&
                dms &&
                dms[index]
              ) {
                // replace old message/replies with incoming data
                dms[index] = updatedMessage.data.getDirectMessage
                this.setState({ dms })
              }
            } catch (e) {
              console.debug(e)
              if (e.data?.getDirectMessage && index !== undefined && dms && dms[index]) {
                // replace old message/replies with incoming data
                dms[index] = e.data.getDirectMessage
                this.setState({ dms })
              }
            }
          }
        },
      })
    }
  }
  removeDirectSubscriptions() {
    if (this.props.roomId) {
      this.dmUnsubscribe?.unsubscribe()
      this.dmReplyUnsubscribe?.unsubscribe()
    }
  }
  async getDirectMessages() {
    try {
      const directMessages = (await API.graphql({
        query: directMessagesByRoom,
        variables: {
          messageRoomID: this.props.roomId,
          sortDirection: "DESC",
          limit: 30,
        },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })) as GraphQLResult<DirectMessagesByRoomQuery>

      console.debug(directMessages)

      if (directMessages.data?.directMessagesByRoom?.items) {
        this.setState({
          dms: directMessages.data.directMessagesByRoom.items,
          nextToken: directMessages.data.directMessagesByRoom.nextToken,
        })
        this.props.onHandleCreated()
      }
    } catch (e) {
      console.debug(e)
      if (e.data?.directMessagesByRoom?.items) {
        this.setState({
          dms: e.data.directMessagesByRoom.items,
          nextToken: e.data.directMessagesByRoom.nextToken,
        })
        this.props.onHandleCreated()
      }
    }
  }

  async getMoreDirectMessages() {
    this.setState({ fetchingData: true })
    if (this.state.nextToken) {
      try {
        const directMessages = (await API.graphql({
          query: directMessagesByRoom,
          variables: {
            messageRoomID: this.props.roomId,
            sortDirection: "DESC",
            limit: 30,
            nextToken: this.state.nextToken,
          },
          authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
        })) as GraphQLResult<DirectMessagesByRoomQuery>

        if (directMessages.data?.directMessagesByRoom?.items) {
          this.setState({
            dms: [...(this.state.dms ?? []), ...directMessages.data.directMessagesByRoom.items],
            nextToken: directMessages.data.directMessagesByRoom.nextToken,
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
  showProfile(id: string | undefined) {
    if (id) this.props.navigation?.push("ProfileScreen", { id: id, create: false })
  }
  getCourseAssignment() {
    if (this.props.style == "courseResponse") {
      const directMessages = API.graphql({
        query: directMessagesByRoom,
        variables: { messageRoomID: this.props.roomId, sortDirection: "ASC", limit: 1 },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      }) as Promise<GraphQLResult<DirectMessagesByRoomQuery>>
      const processAssignment = (json: GraphQLResult<DirectMessagesByRoomQuery>) => {
        if (json.data?.directMessagesByRoom)
          this.setState({
            dataAssignment: json.data.directMessagesByRoom.items,
          })
      }
      directMessages.then(processAssignment).catch(processAssignment)
    }
  }
  renderDirectMessageWithReplies(item: DM, index: number) {
    return (
      <View style={{ marginBottom: 20 }} key={index}>
        {this.renderDirectMessage(item, index, false, false)}
        {item?.replies?.items?.map((reply, index) => {
          return this.renderDirectMessage(reply, index, true, false)
        })}
      </View>
    )
  }
  renderDirectMessage(
    item: DM | DMReply,
    index: number,
    isReply: boolean,
    hideReplyButton: boolean
  ) {
    const { style, replies } = this.props
    if (!item?.author) {
      return null
    }
    return (
      <Card
        key={index}
        style={
          style == "courseResponse"
            ? {
                borderRadius: 10,
                minHeight: 50,
                borderColor: "#ffffff",
                marginLeft: isReply ? 50 : 0,
                marginBottom: 20,
              }
            : {
                borderRadius: 10,
                minHeight: 50,
                borderColor: "#ffffff",
                marginLeft: isReply ? 50 : 0,
                marginBottom: 35,
              }
        }
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
                {item?.author?.given_name ?? ""} {item?.author?.family_name ?? ""}
              </Text>
              <Text style={this.styles.style.groupFormRole}>{item?.author?.currentRole ?? ""}</Text>
              {item?.when && (
                <Text style={this.styles.style.MessageBoardFormDate}>
                  {new Date(parseInt(item?.when, 10)).toLocaleDateString()}
                </Text>
              )}
            </Body>
          </Left>
          <Right style={{ justifyContent: "center" }}>
            {replies && !hideReplyButton && (
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
        <CardItem style={this.styles.style.coursePageMessageBoardInnerCard}>
          <div id="comment-div">
            <div
              dangerouslySetInnerHTML={{
                __html: this.convertCommentFromJSONToHTML(item?.content ?? null),
              }}
            />
          </div>
        </CardItem>
        {item.attachment ? <CardItem>{MessageUtils.renderFileDownloadBadge(item)}</CardItem> : null}
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
  renderAssignment() {
    if (this.state.dataAssignment?.length > 0) {
      return this.renderDirectMessage(this.state.dataAssignment[0], -1, false, true)
    }
  }

  render() {
    const { height } = Dimensions.get("window")
    return (
      <>
        {this.props.style === "courseResponse" && this.renderAssignment()}
        <FlatList
          scrollEnabled
          renderItem={({ item, index }) => this.renderDirectMessageWithReplies(item, index)}
          data={
            this.props.style == "course" || this.props.style == "courseResponse"
              ? this.state.dataAssignment?.length > 0
                ? this.state.dms?.filter((z) => z?.id != this.state.dataAssignment[0].id)
                : this.state.dms
              : this.state.dms
          }
          inverted={this.props.inputAt === "bottom"}
          onEndReached={!this.state.fetchingData ? () => this.getMoreDirectMessages() : undefined}
          style={{ height: this.props.style == "courseResponse" ? undefined : 0.5 * height }}
          ListFooterComponent={() => this.messagesLoader()}
          refreshing={this.state.fetchingData}
          onEndReachedThreshold={0.1}
        />
      </>
    )
  }
}

export default function MessageListDirect(props: Props): JSX.Element {
  const route = useRoute()
  const navigation = useNavigation<StackNavigationProp<any, any>>()
  return <MessageListDirectImpl {...props} navigation={navigation} route={route} />
}
