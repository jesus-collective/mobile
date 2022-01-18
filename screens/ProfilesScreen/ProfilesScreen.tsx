import { useNavigation, useRoute } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import React, { useLayoutEffect, useState } from "react"
import { View } from "react-native"
import GenericButton from "../../components/FaceLift/GenericButton"
import { GenericButtonStyles } from "../../components/FaceLift/GenericButtonStyles"
import GenericDirectoryScreen from "../../components/FaceLift/GenericDirectoryScreen"
import Header from "../../components/Header/Header"
import ProfilesList from "./ProfilesList"
import ProfileWidgets from "./ProfileWidgets"
export default function ProfilesScreen() {
  const navigation = useNavigation<StackNavigationProp<any, any>>()
  const route = useRoute()
  const [reverse, setReverse] = useState(false)
  const [filter, setFilter] = useState("")
  useLayoutEffect(() => {
    navigation.setOptions({
      header: (props) => {
        return (
          <Header
            subnav={[
              {
                title: "Everybody",
                action: () => null,
              },
              // {
              //   title: "In Your Org",
              //   action: () => null,
              // },

              // {
              //   title: "In Your Groups",
              //   action: () => null,
              // },
            ]}
            title={"People"}
            controls={[
              {
                icon: "Sort",
                action: () => {
                  setReverse((prev) => !prev)
                },
              },
            ]}
            navigation={props.navigation}
          />
        )
      },
    })
  }, [])
  const PeopleControlButtons = () => {
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
          label={`FILTER${filter ? ": My People" : ""}`}
          action={() => {
            if (filter) setFilter("")
            else setFilter(": My People")
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
      </View>
    )
  }
  return (
    <GenericDirectoryScreen
      navigation={navigation}
      ControlButtons={PeopleControlButtons}
      MainContent={() => <ProfilesList filter={filter} reverse={reverse} />}
      Widgets={ProfileWidgets}
      route={route}
      pageTitle="People"
    />
  )
}
