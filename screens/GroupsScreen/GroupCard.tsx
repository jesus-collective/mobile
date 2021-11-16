import Tooltip from "@material-ui/core/Tooltip"
import React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import ProfileImage from "../../components/ProfileImage/ProfileImage"

const GroupCardStyle = StyleSheet.create({
  CardContainer: {
    border: "1px solid #E4E1E1",
    borderRadius: 8,
    height: 384,
    flex: 1,
    marginBottom: 32,
    marginRight: 32,
    maxWidth: "calc(50% - 32px)",
  },
})

export default function GroupCard() {
  return (
    <Tooltip title={"group nmae"}>
      <TouchableOpacity style={GroupCardStyle.CardContainer}>
        <View style={{ padding: 16, flex: 1 }}>
          <Text
            style={{
              fontSize: 15,
              fontFamily: "Graphik-Regular-App",
              fontWeight: "600",
              lineHeight: 24,
              color: "#1A0706",
              paddingBottom: 2,
            }}
          >
            Name of Group
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontFamily: "Graphik-Regular-App",
              fontWeight: "400",
              lineHeight: 24,
              paddingBottom: 16,
              color: "#6A5E5D",
            }}
          >
            Location or some other metadata
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontFamily: "Graphik-Regular-App",
              fontWeight: "400",
              lineHeight: 24,
              paddingBottom: 32,
              color: "#1A0706",
            }}
          >
            Began hair I that caches roasted clock eventually. He step the both of he about she
            question. Hand, and even and at avoid to her is have taking her salesman remember
            multitude her you amped intended to before explorations do.
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <View style={{ flexDirection: "column", marginLeft: -10 }}>
              <ProfileImage size="small2" user={""} />
            </View>
            <View style={{ flexDirection: "column" }}>
              <Text
                style={{
                  color: "#6A5E5D",
                  fontWeight: "600",
                  fontSize: 12,
                  letterSpacing: 1,
                  lineHeight: 16,
                  fontFamily: "Graphik-Regular-App",
                  textTransform: "uppercase",
                }}
              >
                Organizer
              </Text>
              <Text
                style={{
                  fontFamily: "Graphik-Regular-App",
                  color: "#1a0706",
                  lineHeight: 24,
                  fontSize: 15,
                }}
              >
                First Name Last Name
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Tooltip>
  )
}
