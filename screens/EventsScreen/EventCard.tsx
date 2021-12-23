import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import moment from "moment"
import React, { useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import GenericButton from "../../components/FaceLift/GenericButton"
import { GenericButtonStyles } from "../../components/FaceLift/GenericButtonStyles"
import ProfileImage from "../../components/ProfileImage/ProfileImage"
import { JCEvent } from "./EventsList"
import { joinGroup, leaveGroup } from "./GroupUtils"
export default function EventCard({
  joined,
  isOwner,
  updateEvents,
  item,
}: {
  joined?: boolean
  isOwner?: boolean
  updateEvents: (action: any, id: string) => Promise<void>
  item: JCEvent
}) {
  const [isLoading, setIsLoading] = useState(false)
  const { name, location, time } = item
  const members = item?.members?.items ?? []
  const navigation = useNavigation<StackNavigationProp<any, any>>()
  const navigateToEventScreen = () => {
    navigation.navigate("EventScreen", { id: item.id })
  }
  const handleAction = async () => {
    // TODO: optimistically call updateJoined, undo if mutation fails
    setIsLoading(true)
    if (joined) {
      const success = await leaveGroup(item, "event")
      if (success) {
        if (item?.id) updateEvents("leave", item?.id)
      }
    } else {
      const success = await joinGroup(item, "event")
      if (success && item?.id) {
        if (item?.id) updateEvents("join", item?.id)
      }
    }
    setIsLoading(false)
  }
  return (
    <TouchableOpacity
      delayPressIn={150}
      onPress={navigateToEventScreen}
      style={EventCardStyle.Container}
    >
      <Text style={{ paddingTop: 8 }}>
        <Text style={EventCardStyle.DateText}>{moment(time).format("MMMM DD, YYYY")}</Text>
      </Text>
      <View style={EventCardStyle.ContentContainer}>
        <Text numberOfLines={3} style={EventCardStyle.NameText}>
          {name}
        </Text>
        <Text style={EventCardStyle.TimeLocationText}>{moment(time).format("hh:mm")}</Text>
        <Text numberOfLines={1} style={EventCardStyle.TimeLocationText}>
          {location}
        </Text>
        <View style={EventCardStyle.ButtonContainer}>
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              alignItems: "flex-end",
            }}
          >
            <View style={{ flexDirection: "row", marginLeft: 8, alignItems: "center", flex: 1 }}>
              {item?.members?.items?.slice(0, 3).map((attendee, index) => (
                <View
                  key={attendee?.userID}
                  style={{
                    marginLeft: -8,
                    zIndex: index * -1,
                  }}
                >
                  <ProfileImage size="tiny" user={attendee?.userID ?? ""} />
                </View>
              ))}
              {item?.members?.items && item?.members?.items.length > 4 ? (
                <Text
                  style={{
                    fontFamily: "Graphik-Regular-App",
                    fontSize: 16,
                    color: "#A39C9B",
                    paddingBottom: 4,
                    paddingLeft: 4,
                  }}
                >
                  + {members.length - 3}
                </Text>
              ) : null}
            </View>
          </View>

          <GenericButton
            style={{
              ButtonStyle: GenericButtonStyles.TertiaryButtonStyle,
              LabelStyle: GenericButtonStyles.TertiaryLabelStyle,
              custom: EventCardStyle.ButtonCustom,
            }}
            disabled={isOwner}
            label={isOwner ? "Owner" : joined ? "Leave" : "Sign up"}
            spinner={isLoading}
            action={handleAction}
          />
        </View>
      </View>
    </TouchableOpacity>
  )
}

const EventCardStyle = StyleSheet.create({
  Container: {
    border: "1px solid #E4E1E1",
    borderRadius: 8,
    minHeight: 260,
    backgroundColor: "#FFFFFF",
    flex: 1,
  },
  ContentContainer: {
    padding: 16,
    paddingTop: 0,
    marginTop: 32,
    flex: 1,
  },
  DateText: {
    backgroundColor: "#FFECEB",
    color: "#483938",
    fontFamily: "Graphik-Medium-App",
    fontSize: 15,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomRightRadius: 8,
    borderTopLeftRadius: 8,
    marginTop: 32,
  },
  NameText: {
    fontSize: 15,
    fontFamily: "Graphik-Semibold-App",
    lineHeight: 24,
    color: "#1A0706",
    paddingBottom: 2,
  },
  TimeLocationText: {
    fontSize: 15,
    fontFamily: "Graphik-Regular-App",
    fontWeight: "400",
    lineHeight: 24,
    paddingBottom: 2,
    color: "#6A5E5D",
  },
  ButtonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  ButtonCustom: {
    width: 96,
    height: 32,
    alignSelf: "flex-end",
  },
})
