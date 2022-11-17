import React, { useContext } from "react"
import { isMobileOnly } from "react-device-detect"
import { StyleSheet, Text, View } from "react-native"
import { Data } from "../../../components/Data/Data"
import JCSwitch from "../../../components/JCSwitch/JCSwitch"
import Sentry from "../../../components/Sentry"
import { MyAccountContext } from "../MyAccountContext"
export default function MyAccountNotificationSettings() {
  const { state } = useContext(MyAccountContext)
  if (!state.user) return null
  const handleAlertInputChange = (event, name) => {
    if (!state.user) return
    const value =
      event.target === undefined
        ? event
        : event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value
    const updateData = state.user
    if (updateData.alertConfig == null) {
      const z: {
        __typename: "AlertConfig"
        emailDirectMessage: string
        emailGroupMessage: string
        emailEventMessage: string
        emailOrgMessage: string
        emailResourceMessage: string
        emailCourseMessage: string
        emailPromotions: string
      } = {
        __typename: "AlertConfig",
        emailDirectMessage: "true",
        emailGroupMessage: "true",
        emailEventMessage: "true",
        emailOrgMessage: "true",
        emailResourceMessage: "true",
        emailCourseMessage: "true",
        emailPromotions: "true",
      }
      updateData.alertConfig = z
      delete updateData.alertConfig.__typename
    }
    updateData.alertConfig[name] = value.toString()
    if (!state?.user?.id) return null
    try {
      const updateUser = Data.updateUser({
        id: state.user.id,
        alertConfig: state.user.alertConfig,
      })
      console.log({ updateUser })
    } catch (error: any) {
      Sentry.captureException(error.errors || error)
      console.log({ error })
    }
  }
  return (
    <View style={isMobileOnly ? { padding: 12, paddingBottom: 85 } : {}}>
      <Text style={style.Header}>Your Notifications</Text>
      <View style={style.HeaderHorizontalLine} />
      <View style={style.NotificationAlertContainer}>
        <View style={{ flex: 1, flexDirection: "column" }}>
          <Text style={style.PrimaryText}>Direct Messages</Text>
          <Text style={style.SecondaryText}>
            Controls whether or not you would like to receive direct message alerts.
          </Text>
        </View>
        <JCSwitch
          onColor="#FF4438"
          containerWidth={50}
          flexDirection={"row"}
          switchLabel=""
          initState={state.user.alertConfig?.emailDirectMessage == "true"}
          onPress={(e) => {
            handleAlertInputChange(e, "emailDirectMessage")
          }}
        ></JCSwitch>
      </View>
      <View style={style.HeaderHorizontalLine} />
      <View style={style.NotificationAlertContainer}>
        <View style={{ flex: 1, flexDirection: "column" }}>
          <Text style={style.PrimaryText}>Group Messages</Text>
          <Text style={style.SecondaryText}>
            Controls whether or not you would like to receive group message alerts.
          </Text>
        </View>
        <JCSwitch
          onColor="#FF4438"
          containerWidth={50}
          flexDirection={"row"}
          switchLabel=""
          initState={state.user.alertConfig?.emailGroupMessage == "true"}
          onPress={(e) => {
            handleAlertInputChange(e, "emailGroupMessage")
          }}
        ></JCSwitch>
      </View>
      <View style={style.HeaderHorizontalLine} />
      <View style={style.NotificationAlertContainer}>
        <View style={{ flex: 1, flexDirection: "column" }}>
          <Text style={style.PrimaryText}>Event Messages</Text>
          <Text style={style.SecondaryText}>
            Controls whether or not you would like to receive event message alerts.
          </Text>
        </View>
        <JCSwitch
          onColor="#FF4438"
          containerWidth={50}
          flexDirection={"row"}
          switchLabel=""
          initState={state.user.alertConfig?.emailEventMessage == "true"}
          onPress={(e) => {
            handleAlertInputChange(e, "emailEventMessage")
          }}
        ></JCSwitch>
      </View>
      <View style={style.HeaderHorizontalLine} />
      <View style={style.NotificationAlertContainer}>
        <View style={{ flex: 1, flexDirection: "column" }}>
          <Text style={style.PrimaryText}>Resource Messages</Text>
          <Text style={style.SecondaryText}>
            Controls whether or not you would like to receive resource message alerts.
          </Text>
        </View>
        <JCSwitch
          onColor="#FF4438"
          containerWidth={50}
          flexDirection={"row"}
          switchLabel=""
          initState={state.user.alertConfig?.emailResourceMessage == "true"}
          onPress={(e) => {
            handleAlertInputChange(e, "emailResourceMessage")
          }}
        ></JCSwitch>
      </View>
      <View style={style.HeaderHorizontalLine} />
      <View style={style.NotificationAlertContainer}>
        <View style={{ flex: 1, flexDirection: "column" }}>
          <Text style={style.PrimaryText}>Course Messages</Text>
          <Text style={style.SecondaryText}>
            Controls whether or not you would like to receive course messages alerts.
          </Text>
        </View>
        <JCSwitch
          onColor="#FF4438"
          containerWidth={50}
          flexDirection={"row"}
          switchLabel=""
          initState={state.user.alertConfig?.emailCourseMessage == "true"}
          onPress={(e) => {
            handleAlertInputChange(e, "emailCourseMessage")
          }}
        ></JCSwitch>
      </View>
      <View style={style.HeaderHorizontalLine} />
      <View style={style.NotificationAlertContainer}>
        <View style={{ flex: 1, flexDirection: "column" }}>
          <Text style={style.PrimaryText}>Organization Message</Text>
          <Text style={style.SecondaryText}>
            Controls whether or not you would like to receive organization messages alerts.
          </Text>
        </View>
        <JCSwitch
          onColor="#FF4438"
          containerWidth={50}
          flexDirection={"row"}
          switchLabel=""
          initState={state.user.alertConfig?.emailOrgMessage == "true"}
          onPress={(e) => {
            handleAlertInputChange(e, "emailOrgMessage")
          }}
        ></JCSwitch>
      </View>
      <View style={style.HeaderHorizontalLine} />
      <View style={style.NotificationAlertContainer}>
        <View style={{ flex: 1, flexDirection: "column" }}>
          <Text style={style.PrimaryText}>Org Messages</Text>
          <Text style={style.SecondaryText}>
            Controls whether or not you would like to receive org messages/email promotions.
          </Text>
        </View>

        <JCSwitch
          onColor="#FF4438"
          containerWidth={50}
          flexDirection={"row"}
          switchLabel=""
          initState={state.user.alertConfig?.emailPromotions == "true"}
          onPress={(e) => {
            handleAlertInputChange(e, "emailPromotions")
          }}
        ></JCSwitch>
      </View>
      <View style={style.HeaderHorizontalLine} />
    </View>
  )
}
const style = StyleSheet.create({
  NotificationAlertContainer: {
    paddingVertical: 16,
    flexDirection: "row",
  },
  PrimaryText: {
    color: "#1A0706",
    paddingBottom: 2,
    fontSize: 15,
    lineHeight: 24,
    fontFamily: "Graphik-Medium-App",
  },
  SecondaryText: {
    color: "#6A5E5D",
    fontFamily: "Graphik-Regular-App",
    lineHeight: 24,
  },
  Header: {
    color: "#483938",
    fontSize: 12,
    fontFamily: "Graphik-Medium-App",
    flex: 1,
    lineHeight: 16,
    letterSpacing: 1,
    textTransform: "uppercase",
    paddingBottom: 6,
  },
  HeaderHorizontalLine: {
    borderTopWidth: 1,
    borderColor: "#E4E1E1",
  },
})
