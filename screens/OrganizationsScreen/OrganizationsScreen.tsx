import { useNavigation, useRoute } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { Auth } from "aws-amplify"
import React, { useEffect, useLayoutEffect, useState } from "react"
import { isMobileOnly } from "react-device-detect"
import { View } from "react-native"
import { JCCognitoUser } from "src/types"
import GenericButton from "../../components/FaceLift/GenericButton"
import { GenericButtonStyles } from "../../components/FaceLift/GenericButtonStyles"
import GenericDirectoryScreen from "../../components/FaceLift/GenericDirectoryScreen"
import Header from "../../components/Header/Header"
import OrganizationsList from "./OrganizationsList"

export default function ResourcesScreen() {
  const navigation = useNavigation<StackNavigationProp<any, any>>()
  const route = useRoute()
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
                    title: "All Orgs",
                    action: () => {
                      setFilter("")
                    },
                  },
                  {
                    title: "Your Orgs",
                    action: () => {
                      if (filter) setFilter("")
                      else setFilter(": Your Resources")
                    },
                  },
                ]}
                title={"Organizations"}
                controls={[
                  {
                    icon: "Sort",
                    action: () => {
                      setReverse((prev) => !prev)
                    },
                  },
                  {
                    icon: "Plus",
                    action: () => null,
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
        if (groupList?.includes("admin") || groupList?.includes("verifiedUsers"))
          setShowCreate(true)
      }
      load()
    }, [])
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
          label={`FILTER${filter ? ": My Orgs" : ""}`}
          action={() => {
            if (filter) setFilter("")
            else setFilter(": Your Orgs")
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
        {showCreate ? (
          <GenericButton
            label="New Org"
            action={() =>
              navigation.push("OrganizationScreen", {
                create: true,
              })
            }
            style={{
              ButtonStyle: GenericButtonStyles.PrimaryButtonStyle,
              LabelStyle: GenericButtonStyles.PrimaryLabelStyle,
            }}
            icon="Plus"
          ></GenericButton>
        ) : null}
      </View>
    )
  }
  return (
    <GenericDirectoryScreen
      navigation={navigation}
      ControlButtons={GroupsControlButtons}
      MainContent={() => <OrganizationsList filter={filter} reverse={reverse} />}
      route={route}
      pageTitle="Organizations"
    />
  )
}
