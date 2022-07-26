import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { Auth } from "aws-amplify"
import React, { useEffect, useLayoutEffect, useState } from "react"
import { isMobileOnly } from "react-device-detect"
import { View } from "react-native"
import { JCCognitoUser } from "src/types"
import GenericButton from "../../components/GenericButton/GenericButton"
import { GenericButtonStyles } from "../../components/GenericButton/GenericButtonStyles"
import GenericDirectoryScreen from "../../components/GenericDirectoryScreen/GenericDirectoryScreen"
import Header from "../../components/Header/Header"
import ResourceList from "./ResourceList"
import ResourceWidgets from "./ResourceWidgets"

export default function ResourcesScreen() {
  const navigation = useNavigation<StackNavigationProp<any, any>>()
  const [reverse, setReverse] = useState(false)
  const [filter, setFilter] = useState("")
  useLayoutEffect(() => {
    isMobileOnly
      ? navigation.setOptions({
          header: (props) => {
            return (
              <Header
                subnav={[
                  {
                    title: "All Resources",
                    action: () => {
                      setFilter("")
                    },
                  },
                  {
                    title: "Your Resources",
                    action: () => {
                      if (filter) setFilter("")
                      else setFilter(": Your Resources")
                    },
                  },
                ]}
                title={"Resources"}
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
      : null
  }, [])
  const GroupsControlButtons = () => {
    const [showCreate, setShowCreate] = useState<boolean>(false)
    useEffect(() => {
      const load = async () => {
        const user: JCCognitoUser = await Auth.currentAuthenticatedUser()
        const groupList: string[] = user.getSignInUserSession()?.getAccessToken().payload[
          "cognito:groups"
        ]
        if (groupList?.includes("admin")) setShowCreate(true)
      }
      load()
    }, [])
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
        <GenericButton
          label={`FILTER${filter ? ": My Resources" : ""}`}
          action={() => {
            if (filter) setFilter("")
            else setFilter(": Your Resources")
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
        ></GenericButton>
        {showCreate ? (
          <GenericButton
            label="New Resource"
            action={() =>
              navigation.push("ResourceScreen", {
                create: true,
              })
            }
            style={{
              ButtonStyle: GenericButtonStyles.PrimaryButtonStyle,
              LabelStyle: GenericButtonStyles.PrimaryLabelStyle,
            }}
            icon="Plus-White"
          ></GenericButton>
        ) : null}
      </View>
    )
  }
  return (
    <GenericDirectoryScreen
      ControlButtons={<GroupsControlButtons />}
      MainContent={<ResourceList filter={filter} reverse={reverse} />}
      Widgets={<ResourceWidgets />}
      pageTitle="Resources"
    />
  )
}
