import { useNavigation, useRoute } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import React, { useState } from "react"
import { View } from "react-native"
import GenericButton from "../../components/FaceLift/GenericButton"
import { GenericButtonStyles } from "../../components/FaceLift/GenericButtonStyles"
import GenericDirectoryScreen from "../../components/FaceLift/GenericDirectoryScreen"
import GroupsList from "./GroupsList"
import GroupWidgets from "./GroupWidgets"
export default function GroupsScreen() {
  const navigation = useNavigation<StackNavigationProp<any, any>>()
  const route = useRoute()
  const [reverse, setReverse] = useState(false)
  const [filter, setFilter] = useState("")
  const GroupsControlButtons = () => {
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
          label={`FILTER${filter ? ": My Groups" : ""}`}
          action={() => {
            if (filter) setFilter("")
            else setFilter(": Your Groups")
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
          label="NEW GROUP"
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
      ControlButtons={GroupsControlButtons}
      MainContent={() => <GroupsList filter={filter} reverse={reverse} />}
      Widgets={GroupWidgets}
      route={route}
      pageTitle="Groups"
    />
  )
}
