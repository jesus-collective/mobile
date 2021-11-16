import Auth from "@aws-amplify/auth"
import { Route } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import moment from "moment"
import React, { useState } from "react"
import { Text, View } from "react-native"
import { JCCognitoUser } from "src/types"
import { Data } from "../../components/Data/Data"
import GenericButton from "../../components/FaceLift/GenericButton"
import { GenericButtonStyles } from "../../components/FaceLift/GenericButtonStyles"
import GenericContainer from "../../components/FaceLift/GenericContainer"
import Header from "../../components/Header/Header"
import { GroupByTypeByTimeQueryVariables, ModelSortDirection } from "../../src/API"
import EventsList from "./EventsList"
import JCWidget from "./JCWidget"

interface Props {
  navigation: StackNavigationProp<any, any>
  route: Route<any, { showAllEvents?: boolean; mine?: boolean }>
}

export default function EventsScreen(props: Props) {
  const { navigation } = props
  const [reverse, setReverse] = useState(false)
  const [filter, setFilter] = useState("")
  const loadUpcoming = async () => {
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
        sortDirection: ModelSortDirection.ASC,
      }
    }

    const json = await Data.groupByTypeByTime(makeQueryVariables(null, false, 60))
    const loadUser = async () => {
      const jcUser: JCCognitoUser = await Auth.currentAuthenticatedUser()
      return jcUser.username
    }

    const user = await loadUser()
    const ownedEvents: Array<string> = []
    const returnedEvents = json.data?.groupByTypeByTime?.items ?? []
    console.log({ returnedEvents })
    for (const item of returnedEvents) {
      if (item?.ownerUser?.id === user) {
        ownedEvents.push(item.id)
      }
      if (ownedEvents.length >= 2) break
    }
    return returnedEvents.filter((event) => ownedEvents.find((a) => a === event?.id))
  }

  const ControlButtons = () => {
    return (
      <View style={{ flexDirection: "row", justifyContent: "flex-end", marginBottom: 112 }}>
        <GenericButton
          label="SORT"
          action={() => setReverse((prev) => !prev)}
          style={{
            ButtonStyle: GenericButtonStyles.SecondaryButtonStyle,
            LabelStyle: GenericButtonStyles.SecondaryLabelStyle,
            custom: {
              marginRight: 32,
            },
          }}
          icon="Sort"
        ></GenericButton>
        <GenericButton
          label={`FILTER${filter ? ": My Events" : ""}`}
          action={() => {
            if (filter) setFilter("")
            else setFilter(": Your Events")
          }}
          style={{
            ButtonStyle: filter
              ? GenericButtonStyles.PrimaryButtonStyle
              : GenericButtonStyles.SecondaryButtonStyle,
            LabelStyle: filter
              ? GenericButtonStyles.PrimaryLabelStyle
              : GenericButtonStyles.SecondaryLabelStyle,
            custom: {
              marginRight: 32,
            },
          }}
          icon={filter ? "X" : "Filter"}
        ></GenericButton>
        <GenericButton
          label="NEW EVENT"
          action={() => null}
          style={{
            ButtonStyle: GenericButtonStyles.PrimaryButtonStyle,
            LabelStyle: GenericButtonStyles.PrimaryLabelStyle,
          }}
          icon="Plus"
        ></GenericButton>
      </View>
    )
  }
  return (
    <View>
      <Header title="Jesus Collective" navigation={navigation} />
      <View style={{ marginHorizontal: "7.778vw" }}>
        <Text
          style={{
            marginTop: 160,
            marginBottom: 80,
            fontFamily: "Graphik-Regular-App",
            fontWeight: "400",
            fontSize: 96,
            lineHeight: 96,
            letterSpacing: -0.5,
            color: "#483938",
          }}
        >
          Events
        </Text>

        <View
          style={{
            borderBottomColor: "#E4E1E1",
            borderBottomWidth: 1,
            marginBottom: 24,
          }}
        />
        <ControlButtons />
        <GenericContainer
          MainContentComponent={() => <EventsList filter={filter} reverse={reverse}></EventsList>}
          MinorContentComponent={() => (
            <>
              <JCWidget
                emptyMessage="No upcoming events"
                loadData={loadUpcoming}
                title="Your Upcoming Events"
              />
            </>
          )}
          reverseContent
          ToggleBarComponent={() => null}
        />
      </View>
    </View>
  )
}
