import { GraphQLResult } from "@aws-amplify/api"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { API } from "aws-amplify"
import GRAPHQL_AUTH_MODE from "aws-amplify-react-native"
import { convertFromRaw } from "draft-js"
import { stateToHTML } from "draft-js-export-html"
import { Body, Card, CardItem, Left, Right } from "native-base"
import React from "react"
import { ActivityIndicator, Dimensions, FlatList, Text, TouchableOpacity } from "react-native"
import Observable, { ZenObservable } from "zen-observable-ts"
import JCComponent, { JCState } from "../../components/JCComponent/JCComponent"
import {
  DirectMessagesByRoomQuery,
  GetDirectMessageQuery,
  OnCreateDirectMessageSubscription,
} from "../../src/API"
import * as queries from "../../src/graphql/queries"
import { onCreateDirectMessage } from "../../src/graphql/subscriptions"
import ProfileImage from "../ProfileImage/ProfileImage"
import MessageUtils from "./MessageUtils"

type DMs = NonNullable<DirectMessagesByRoomQuery["directMessagesByRoom"]>["items"]
type DM = NonNullable<DMs>[0]

interface Props {
  roomId?: string
  inputAt?: "top" | "bottom"
  style: "mini" | "regular" | "course" | "courseResponse"
  onHandleCreated(): void
  route?: RouteProp<any, any>
  navigation?: any
  replies?: boolean
}
interface State extends JCState {
  nextToken: string | null
  dataAssignment: any

  dms: DMs
  fetchingData: boolean
}

class MessageListDirectImpl extends JCComponent<Props, State> {
  dmUnsubscribe?: ZenObservable.Subscription

  constructor(props: Props) {
    super(props)
    this.dmUnsubscribe = undefined

    this.state = {
      ...super.getInitialState(),
      dms: [],
      dataAssignment: [],

      nextToken: null,
      fetchingData: false,
    }
    this.setInitialData(props)
  }
  async setInitialData(props: Props) {
    if (this.props.roomId) {
      this.getDirectMessages()
      this.getCourseAssignment()
      this.connectDirectSubscriptions()
    }
  }
  componentDidUpdate(prevProps: Props) {
    if (this.props !== prevProps) {
      this.removeDirectSubscriptions()
      this.setInitialData(this.props)
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
    }
  }
  removeDirectSubscriptions() {
    if (this.props.roomId) {
      this.dmUnsubscribe?.unsubscribe()
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
          dms: directMessagesByRoom.data.directMessagesByRoom.items,
          nextToken: directMessagesByRoom.data.directMessagesByRoom.nextToken,
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
  showProfile(id: string | undefined) {
    if (id) this.props.navigation?.push("ProfileScreen", { id: id, create: false })
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
              {new Date(parseInt(item.when, 10)).toLocaleDateString()}
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
      return this.renderDirectMessage(this.state.dataAssignment[0], -1)
    }
  }

  render() {
    const { height } = Dimensions.get("window")
    return (
      <>
        {this.props.style === "courseResponse" && this.renderAssignment()}
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
      </>
    )
  }
}

export default function MessageListDirect(props: Props): JSX.Element {
  const route = useRoute()
  const navigation = useNavigation()
  return <MessageListDirectImpl {...props} navigation={navigation} route={route} />
}
