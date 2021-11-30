import { GraphQLResult } from "@aws-amplify/api/lib/types"
import { Analytics, API, Auth } from "aws-amplify"
import GRAPHQL_AUTH_MODE from "aws-amplify-react-native"
import moment from "moment"
import React, { useEffect, useState } from "react"
import { isMobile } from "react-device-detect"
import { ActivityIndicator, FlatList, Text, View } from "react-native"
import { JCCognitoUser } from "src/types"
import { Data } from "../../components/Data/Data"
import GenericButton from "../../components/FaceLift/GenericButton"
import { GenericButtonStyles } from "../../components/FaceLift/GenericButtonStyles"
import { WidgetItem, WidgetType } from "../../components/FaceLift/JCWidget"
import {
  CreateGroupMemberMutation,
  DeleteGroupMemberMutation,
  GroupByTypeByTimeQueryVariables,
  ModelSortDirection,
} from "../../src/API"
import * as mutations from "../../src/graphql/mutations"
import EventCard from "./EventCard"

type Props = {
  filter: any
  reverse: any
}
export default function EventsList(props: Props) {
  const { reverse, filter } = props
  const [data, setData] = useState<Array<any>>([])
  const [refreshing, setRefreshing] = useState(false)
  const [nextToken, setNextToken] = useState<string | null>(null)
  const [joinedEvents, setJoinedEvents] = useState<Array<any>>([])
  const [isOwnerEvents, setIsOwnerEvents] = useState<Array<any>>([])
  const [user, setUser] = useState<JCCognitoUser["username"]>("")
  const loadEvents = async () => {
    setRefreshing(true)
    const newData = [...data, ...data, ...data, ...data, ...data]
    const makeQueryVariables = (
      nextToken: GroupByTypeByTimeQueryVariables["nextToken"],
      past: boolean,
      limit: number
    ): GroupByTypeByTimeQueryVariables => {
      return {
        nextToken,
        type: "event",
        limit,
        time: {
          ge: moment().format(),
        },
        sortDirection: reverse ? ModelSortDirection.DESC : ModelSortDirection.ASC,
      }
    }

    const json = await Data.groupByTypeByTime(makeQueryVariables(nextToken, filter, 4))
    console.log({ json })
    if (json.data?.groupByTypeByTime?.items?.length)
      setData([...newData, ...(json.data?.groupByTypeByTime?.items ?? [])])
    if (
      json?.data?.groupByTypeByTime?.nextToken &&
      nextToken !== json?.data?.groupByTypeByTime?.nextToken
    )
      setNextToken(json.data.groupByTypeByTime.nextToken)
    else {
      setNextToken(null)
    }
    setRefreshing(false)
  }
  useEffect(() => {
    setData([])
    setNextToken(null)
    loadEvents()
  }, [reverse])
  useEffect(() => {
    const loadUser = async () => {
      const jcUser: JCCognitoUser = await Auth.currentAuthenticatedUser()
      setUser(jcUser.username)
      return jcUser.username
    }
    if (data.length) {
      const loadJoinedData = async () => {
        const user = await loadUser()
        data.forEach((item: any) => {
          const groupMemberByUser = Data.groupMemberByUser(user, item.id)
          groupMemberByUser.then((json) => {
            if ((json.data?.groupMemberByUser?.items?.length ?? 0) > 0) {
              setJoinedEvents((prev) => [...prev, item.id])
            }
          })
        })
      }
      const loadOwnerData = async () => {
        const user = await loadUser()
        data.forEach((item: any) => {
          const getGroup = Data.getGroupForOwner(item.id)
          getGroup.then((json) => {
            if (json.data?.getGroup?.owner === user) {
              setIsOwnerEvents((prev) => [...prev, item.id])
            }
          })
        })
      }
      loadOwnerData()
      loadJoinedData()
    }
  }, [data])

  const joinEvent = async (group: any, groupType: string): Promise<void> => {
    Analytics.record({
      name: "joined" + groupType,
      // Attribute values must be strings
      attributes: { id: group.id, name: group.name },
    })
    try {
      const createGroupMember = (await API.graphql({
        query: mutations.createGroupMember,
        variables: {
          input: { groupID: group.id, userID: user },
        },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })) as GraphQLResult<CreateGroupMemberMutation>
      console.log({ "Success mutations.createGroupMember": createGroupMember })
      const canLeave = [...joinedEvents]
      canLeave.push(group.id)
      setJoinedEvents(canLeave)
    } catch (err) {
      console.log({ "Error mutations.createGroupMember": err })
      const canLeave = [...joinedEvents]
      canLeave.push(group.id)
      setJoinedEvents(canLeave)
    }
  }
  const leaveEvent = async (group: any, groupType: string): Promise<void> => {
    try {
      Analytics.record({
        name: "left" + groupType,
        // Attribute values must be strings
        attributes: { id: group.id, name: group.name },
      })
      const groupMemberByUser = await Data.groupMemberByUser(user, group.id)
      console.log({ "Success queries.groupMemberByUser": groupMemberByUser })
      const groupMember = groupMemberByUser?.data?.groupMemberByUser?.items
      for (let i = 0; i < (groupMember?.length ?? 0); i++) {
        try {
          const deleteGroupMember = (await API.graphql({
            query: mutations.deleteGroupMember,
            variables: { input: { id: groupMember![i]?.id } },
            authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
          })) as GraphQLResult<DeleteGroupMemberMutation>
          console.log({ "Success mutations.deleteGroupMember": deleteGroupMember })
          const canLeave = joinedEvents.filter((a) => a !== group.id)
          setJoinedEvents(canLeave)
        } catch (err) {
          console.log({ "Error mutations.deleteGroupMember": err })
          const canLeave = joinedEvents.filter((a) => a !== group.id)
          setJoinedEvents(canLeave)
        }
      }
    } catch (err) {
      console.log({ "Error queries.groupMemberByUser": err })
    }
  }
  const centerOffset = isMobile ? 0 : -32
  return (
    <FlatList
      style={{ minHeight: 662 }} // prevents UI shifting on desktop, 2 rows of 292 + footer height
      ListFooterComponent={() => (
        <View
          style={{
            marginLeft: centerOffset,
            marginTop: isMobile ? 32 : 0,
            marginBottom: 30,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <GenericButton
            style={{
              ButtonStyle: GenericButtonStyles.SecondaryButtonStyle,
              LabelStyle: GenericButtonStyles.SecondaryLabelStyle,
            }}
            label="Load More"
            action={() => loadEvents()}
          />
        </View>
      )}
      ListHeaderComponent={() =>
        refreshing ? (
          <ActivityIndicator
            style={{
              marginTop: isMobile ? 32 : 0,
              marginLeft: centerOffset,
              position: "absolute",
              alignSelf: "center",
            }}
            size="large"
            color="#FF4438"
          />
        ) : null
      }
      ListFooterComponentStyle={
        (data?.length % 4 !== 0 && !nextToken) || !data.length ? { display: "none" } : {}
      }
      ListEmptyComponent={() =>
        !refreshing && !data.length ? (
          <Text
            style={{
              fontSize: 15,
              fontFamily: "Graphik-Regular-App",
              fontWeight: "400",
              lineHeight: 24,
              paddingBottom: 2,
              color: "#6A5E5D",
            }}
          >
            No upcoming events
          </Text>
        ) : null
      }
      data={filter ? data.filter((a) => a.id === isOwnerEvents.find((b) => b === a.id)) : data}
      numColumns={isMobile ? 1 : 2}
      refreshing={refreshing}
      renderItem={({ item, index }) => {
        const eventTime = moment(item.time)
        return !isMobile ? (
          <EventCard
            item={item}
            time={eventTime.format("hh:mm")}
            date={eventTime.format("MMMM DD, YYYY")}
            handleEventAction={
              isOwnerEvents.find((a) => a === item.id)
                ? null
                : joinedEvents.find((a) => a === item.id)
                ? leaveEvent
                : joinEvent
            }
            isOwner={isOwnerEvents.find((a) => a === item.id)}
            location={item.location}
            joined={joinedEvents.find((a) => a === item.id)}
          />
        ) : (
          <View
            style={{
              marginTop: index === 0 && isMobile ? 16 : 0,
              padding: 12,
              paddingBottom: 0,
              flex: 1,
            }}
          >
            <View style={{ borderBottomColor: "#E4E1E1", borderBottomWidth: 1, paddingBottom: 12 }}>
              <WidgetItem
                len={data.length - 1}
                item={item}
                index={index}
                widgetType={"event" as WidgetType}
              />
            </View>
          </View>
        )
      }}
    />
  )
}
