import Tooltip from "@material-ui/core/Tooltip"
import React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import ProfileImage from "../../components/ProfileImage/ProfileImage"

const GroupCardStyle = StyleSheet.create({
  CardContainer: {
    border: "1px solid #E4E1E1",
    borderRadius: 8,
    height: 308,
    flex: 1,
    marginBottom: 32,
    marginRight: 32,
    maxWidth: "calc(50% - 32px)",
  },
})
type Props = {
  item: any
}
export default function GroupCard(props: Props) {
  const { item } = props
  const { name, description, owner, ownerUser } = item
  return (
    <Tooltip title={name}>
      <TouchableOpacity style={GroupCardStyle.CardContainer}>
        <View style={{ padding: 16, flex: 1 }}>
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
          {item.location ? (
            <Text
              numberOfLines={1}
              style={{
                fontSize: 15,
                fontFamily: "Graphik-Regular-App",
                fontWeight: "400",
                lineHeight: 24,
                paddingBottom: 16,
                color: "#6A5E5D",
              }}
            >
              {item.location}
            </Text>
          ) : null}
          <Text
            numberOfLines={4}
            style={{
              fontSize: 15,
              fontFamily: "Graphik-Regular-App",
              fontWeight: "400",
              lineHeight: 24,

              color: "#1A0706",
            }}
          >
            {description} {description} {description} {description} {description} {description}{" "}
            {description} {description} {description} {description}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "flex-end",
              flex: 1,
              paddingTop: 32,
            }}
          >
            <View
              style={{
                alignItems: "center",
                flex: 1,
                flexDirection: "row",
              }}
            >
              <View style={{ flexDirection: "column", marginLeft: -10 }}>
                <ProfileImage size="small2" user={owner} />
              </View>
              <View style={{ flexDirection: "column", flex: 1 }}>
                <Text
                  numberOfLines={1}
                  style={{
                    color: "#6A5E5D",
                    fontWeight: "600",
                    fontSize: 12,
                    letterSpacing: 1,
                    lineHeight: 16,
                    flex: 1,
                    fontFamily: "Graphik-Regular-App",
                    textTransform: "uppercase",
                  }}
                >
                  Organizer
                </Text>
                <Text
                  numberOfLines={3}
                  style={{
                    fontFamily: "Graphik-Regular-App",
                    color: "#1a0706",
                    lineHeight: 24,
                    flex: 1,
                    fontSize: 15,
                  }}
                >
                  {ownerUser?.given_name ?? ""} {ownerUser?.family_name ?? ""}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Tooltip>
  )
}
