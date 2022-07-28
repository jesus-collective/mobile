import { useNavigation, useRoute } from "@react-navigation/native"
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
import CoursesList from "./CoursesList"

export default function CoursesScreen() {
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
                    title: "All Courses",
                    action: () => {
                      setFilter("")
                    },
                  },
                ]}
                title={"Courses"}
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
  const CoursesControlButtons = () => {
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
        {showCreate ? (
          <GenericButton
            label="New Course"
            action={() =>
              navigation.push("CourseOverviewScreen", {
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
      ControlButtons={<CoursesControlButtons />}
      MainContent={<CoursesList filter={filter} reverse={reverse} />}
      pageTitle="Courses"
    />
  )
}
