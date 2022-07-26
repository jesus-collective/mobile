import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import React, { useLayoutEffect, useState } from "react"
import { View } from "react-native"
import GenericButton from "../../components/GenericButton/GenericButton"
import { GenericButtonStyles } from "../../components/GenericButton/GenericButtonStyles"
import GenericDirectoryScreen from "../../components/GenericDirectoryScreen/GenericDirectoryScreen"
import Header from "../../components/Header/Header"
import ProfilesList from "./ProfilesList"
export default function ProfilesScreen() {
  const navigation = useNavigation<StackNavigationProp<any, any>>()
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
  }, [filter])
  const PeopleControlButtons = () => {
    return (
      <View style={{ flexDirection: "row", justifyContent: "flex-end", marginBottom: 112 }}>
        <GenericButton
          label={reverse ? "SORT: Z - A" : "SORT: A - Z"}
          action={() => setReverse((prev) => !prev)}
          style={{
            ButtonStyle: GenericButtonStyles.SecondaryButtonStyle,
            LabelStyle: GenericButtonStyles.SecondaryLabelStyle,
            custom: {
              marginRight: 32,
            },
          }}
          icon="Sort-Red"
        ></GenericButton>
        {/* <GenericButton
          label={`FILTER${filter ? ": Friends" : ""}`}
          action={() => {
            if (filter) setFilter("")
            else setFilter(": Friends")
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
          icon={filter ? "X-White" : "Filter-Red"}
        ></GenericButton> */}
      </View>
    )
  }
  return (
    <GenericDirectoryScreen
      ControlButtons={<PeopleControlButtons />}
      MainContent={<ProfilesList filter={filter} reverse={reverse} />}
      pageTitle="People"
    />
  )
}
