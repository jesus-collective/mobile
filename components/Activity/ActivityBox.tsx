import { GraphQLResult, GRAPHQL_AUTH_MODE } from "@aws-amplify/api/lib/types"
import { API } from "aws-amplify"
import moment from "moment"
import React, { useEffect, useState } from "react"
import { Text, TouchableHighlight, View } from "react-native"
import { Activity } from "src/API"
import { activityByGroup } from "../../src/graphql-custom/queries"
import ActivityBoxStyles from "./ActivityBoxStyles"
type Selected = string

type Props = {
  title: string
  activityGroupType: string
  activityGroupId: string
}

const ActivityBox = ({ title, activityGroupType, activityGroupId }: Props): JSX.Element => {
  const [activities, setactivities] = useState<Array<Activity>>([])
  const [selected, setSelected] = useState<Selected>("Today")
  const options = ["Today", "Yesterday", "Last 7 Days"]
  const DetermineMessage = (activity: Activity) => {
    console.log(activity)
    switch (activity.activityGroupType) {
      case "courses":
        switch (activity.activityActionType) {
          case "courses_assignment_submit":
            return " submitted an assignment."
          case "courses_assignment_create":
            return " created an assignment."
          case "courses_lesson_create":
            return " created a new lesson."
          case "courses_youtube_create":
            return " created a new youtube lesson."
          case "courses_respond_create":
            return " created a discussion assignment."
          case "courses_zoom_create":
            return " created a new zoom lesson."
        }
    }
  }
  useEffect(() => {
    const loadActivities = async () => {
      console.log("fetching activities")
      const activities = (await API.graphql({
        query: activityByGroup,
        variables: {
          activityGroupId: { eq: activityGroupId },
          activityGroupType,
        },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })) as GraphQLResult<any>
      setactivities(activities.data.activityByGroup.items ?? [])
    }
    loadActivities()
  }, [activityGroupId])
  return (
    <View style={ActivityBoxStyles.ActivityBoxContainer}>
      <Text style={ActivityBoxStyles.ActivityBoxHeader}>{title}</Text>
      <View style={ActivityBoxStyles.ActivityButtonContainer}>
        {options.map((option) => {
          return (
            <TouchableHighlight
              underlayColor="rgba(255,255,255,0.2)"
              key={option}
              onPress={() => {
                setSelected(option)
              }}
              style={{
                padding: 16,
                borderBottomWidth: selected === option ? 1 : 0,
              }}
            >
              <Text style={ActivityBoxStyles.ActivityButtonText}>{option}</Text>
            </TouchableHighlight>
          )
        })}
      </View>
      <View style={ActivityBoxStyles.ActivityBoxAlertContainer}>
        {activities
          .filter((activity) => {
            const alertDate = moment(activity.createdAt)
            const today = moment().format("YYYY-MM-DD")
            const yesterday = moment().subtract(1, "days").format("YYYY-MM-DD")
            switch (selected) {
              case "Today":
                return alertDate.format("YYYY-MM-DD") === today
              case "Yesterday":
                return alertDate.format("YYYY-MM-DD") === yesterday
              case "Last 7 Days":
                return alertDate.diff(moment(), "days") > -7
            }
          })
          .sort((a, b) => b?.time?.localeCompare(a?.time ?? "") ?? 0)
          .map((activity) => {
            return (
              <View style={ActivityBoxStyles.ActivityEntryContainer} key={activity.id}>
                <Text style={ActivityBoxStyles.ActivityEntryText}>
                  <Text style={ActivityBoxStyles.ActivityEntryownerText}>{activity.ownerName}</Text>
                  {DetermineMessage(activity)}
                  <Text style={ActivityBoxStyles.ActivityEntryTimeText}>
                    {`  ${
                      selected === "Last 7 Days" ? moment(activity.createdAt).format("ddd") : ""
                    } ${moment(activity.createdAt).format("hh:mm A").replace(/^0+/, "")} `}
                  </Text>
                </Text>
              </View>
            )
          })}
      </View>
    </View>
  )
}

export default ActivityBox
