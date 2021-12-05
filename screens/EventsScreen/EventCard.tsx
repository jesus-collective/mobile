import Tooltip from "@material-ui/core/Tooltip"
import React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import GenericButton from "../../components/FaceLift/GenericButton"
import { GenericButtonStyles } from "../../components/FaceLift/GenericButtonStyles"

const EventCardStyle = StyleSheet.create({
  CardContainer: {
    border: "1px solid #E4E1E1",
    borderRadius: 8,
    height: 260,
    flex: 1,
    marginBottom: 32,
    marginRight: 32,
    maxWidth: "calc(50% - 32px)",
  },
})

export default function EventCard({
  time,
  location,
  date,
  joined,
  isOwner,
  handleEventAction,
  item,
}: {
  time: string
  location: string
  date: string
  joined?: boolean
  isOwner?: boolean
  handleEventAction: any
  item: any
}) {
  const { name } = item
  return (
    <Tooltip title={name}>
      <TouchableOpacity style={EventCardStyle.CardContainer}>
        <Text style={{ paddingTop: 8 }}>
          <Text
            style={{
              backgroundColor: "#FFECEB",
              fontFamily: "Graphik-Regular-App",
              fontSize: 15,
              paddingVertical: 8,
              paddingHorizontal: 16,
              borderRadius: 8,
              marginTop: 16,
            }}
          >
            {date}
          </Text>
        </Text>
        <View style={{ padding: 16, paddingTop: 0, marginTop: 32, flex: 1 }}>
          <Text
            numberOfLines={3}
            style={{
              fontSize: 15,
              fontFamily: "Graphik-Regular-App",
              fontWeight: "600",
              lineHeight: 24,
              color: "#1A0706",
              paddingBottom: 2,
            }}
          >
            {name}
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontFamily: "Graphik-Regular-App",
              fontWeight: "400",
              lineHeight: 24,
              paddingBottom: 2,
              color: "#6A5E5D",
            }}
          >
            {time}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 15,
              fontFamily: "Graphik-Regular-App",
              fontWeight: "400",
              lineHeight: 24,
              paddingBottom: 2,
              color: "#6A5E5D",
            }}
          >
            {location}
          </Text>
          <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <GenericButton
              style={{
                ButtonStyle: GenericButtonStyles.TertiaryButtonStyle,
                LabelStyle: GenericButtonStyles.TertiaryLabelStyle,
                custom: {
                  width: 96,
                  height: 32,
                  alignSelf: "flex-end",
                },
              }}
              disabled={isOwner}
              label={isOwner ? "Owner" : joined ? "Leave" : "Sign up"}
              action={() => handleEventAction(item, "event")}
            />
          </View>
        </View>
      </TouchableOpacity>
    </Tooltip>
  )
}
