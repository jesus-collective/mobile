import { useNavigation, useRoute } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import React, { useState } from "react"
import { View } from "react-native"
import GenericButton from "../../components/FaceLift/GenericButton"
import { GenericButtonStyles } from "../../components/FaceLift/GenericButtonStyles"
import GenericDirectoryScreen from "../../screens/GenericDirectoryScreen/GenericDirectoryScreen"
import EventsList from "./EventsList"
import EventWidgets from "./EventWidgets"
export default function EventsScreen() {
  const navigation = useNavigation<StackNavigationProp<any, any>>()
  const route = useRoute()
  const [reverse, setReverse] = useState(false)
  const [filter, setFilter] = useState("")

  const EventsControlButtons = () => {
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
    <GenericDirectoryScreen
      navigation={navigation}
      ControlButtons={EventsControlButtons}
      MainContent={() => <EventsList filter={filter} reverse={reverse}></EventsList>}
      Widgets={EventWidgets}
      route={route}
      pageTitle="Events"
    />
  )
}
