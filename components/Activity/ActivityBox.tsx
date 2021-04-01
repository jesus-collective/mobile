import { GraphQLResult, GRAPHQL_AUTH_MODE } from "@aws-amplify/api/lib/types"
import { API, Auth } from "aws-amplify"
import moment from "moment"
import React, { useEffect, useState } from "react"
import { ActivityIndicator, Text, TouchableHighlight, View } from "react-native"
import { ActivityByGroupQuery } from "src/API"
import { activityByGroup } from "../../src/graphql-custom/queries"
import ActivityBoxStyles from "./ActivityBoxStyles"
type Selected = "Today" | "Yesterday" | "Last 7 Days"

type Props = {
  title: string
  activityGroupType: string
  activityGroupId: string
}
type ActivityData = NonNullable<
  NonNullable<NonNullable<ActivityByGroupQuery>["activityByGroup"]>["items"]
>
type Activity = ActivityData[0]
const ActivityBox = ({ title, activityGroupId }: Props): JSX.Element => {
  const [activities, setactivities] = useState<ActivityData>([])
  const [selected, setSelected] = useState<Selected>("Today")
  const [isLoading, setIsLoading] = useState(false)
  const options: Array<Selected> = ["Today", "Yesterday", "Last 7 Days"]
  const DetermineMessage = (activity: Activity) => {
    console.log(activity)
    switch (activity?.activityGroupType) {
      case "courses":
        switch (activity?.activityActionType) {
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
  const handleFilter = (option: Selected) => {
    setSelected(option)
    let date
    if (option === "Today") date = moment().format("YYYY-MM-DD")
    else if (option === "Yesterday") date = moment().subtract(1, "day").format("YYYY-MM-DD")
    else {
      date = moment().subtract(7, "days").format("YYYY-MM-DD")
    }
    loadActivities(date)
  }
  const loadActivities = async (date: string) => {
    try {
      setIsLoading(true)
      const user = await Auth.currentAuthenticatedUser()
      const activities = (await API.graphql({
        query: activityByGroup,
        variables: {
          readUser: user.username,
          sortDirection: "DESC",
          filter: {
            activityGroupId: { eq: activityGroupId },
            date: { ge: date },
          },
        },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })) as GraphQLResult<ActivityByGroupQuery>
      console.log(activities)
      setactivities(activities?.data?.activityByGroup?.items ?? [])
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    const today = moment().format("YYYY-MM-DD")
    loadActivities(today)
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
              disabled={selected === option}
              onPress={() => {
                handleFilter(option)
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
        {isLoading ? (
          <ActivityIndicator
            style={{ marginTop: 60 }}
            color="#000"
            size="large"
          ></ActivityIndicator>
        ) : activities?.length ? (
          activities
            .sort((a, b) => b?.time?.localeCompare(a?.time ?? "") ?? 0)
            .map((activity) => {
              return (
                <View style={ActivityBoxStyles.ActivityEntryContainer} key={activity?.id}>
                  <Text style={ActivityBoxStyles.ActivityEntryText}>
                    <Text style={ActivityBoxStyles.ActivityEntryownerText}>
                      {activity?.ownerName}
                    </Text>
                    {DetermineMessage(activity)}
                    <Text style={ActivityBoxStyles.ActivityEntryTimeText}>
                      {`  ${
                        selected === "Last 7 Days" ? moment(activity?.createdAt).format("ddd") : ""
                      } ${moment(activity?.createdAt).format("hh:mm A").replace(/^0+/, "")} `}
                    </Text>
                  </Text>
                </View>
              )
            })
        ) : (
          <Text style={[ActivityBoxStyles.ActivityEntryText, { padding: 16, margin: 4 }]}>
            No activities found
          </Text>
        )}
      </View>
    </View>
  )
}

export default ActivityBox
