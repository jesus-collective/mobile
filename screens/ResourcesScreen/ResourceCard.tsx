import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import React, { useState } from "react"
import { isMobileOnly } from "react-device-detect"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Group } from "src/API"
import ProfileImageNew, {
  ProfileImageQuality,
  ProfileImageStyle,
} from "../../components/ProfileImage/ProfileImageNew"

export default function ResourceCard({ item }: { item: Group }) {
  const navigation = useNavigation<StackNavigationProp<any, any>>()
  const { name, description, ownerOrg, ownerOrgID } = item
  const resourceType = "Curriculum"
  const navigateToResourceScreen = () => {
    navigation.push("ResourceScreen", { id: item.id })
  }
  const [cardWidth, setCardWidth] = useState(200)
  return (
    <TouchableOpacity
      delayPressIn={150}
      onPress={navigateToResourceScreen}
      style={ResourceCardStyle.Container}
    >
      <Image
        style={{
          margin: 0,
          padding: 0,
          width: cardWidth,
          height: isMobileOnly ? 150 : 190,
        }}
        source={require("../../assets/svg/pattern.svg")}
      ></Image>
      <View
        onLayout={(e) => setCardWidth(e.nativeEvent.layout.width)}
        style={ResourceCardStyle.ContentContainer}
      >
        <Text numberOfLines={1} style={ResourceCardStyle.ResourceType}>
          {resourceType}
        </Text>
        <Text numberOfLines={2} style={ResourceCardStyle.NameText}>
          {name}
        </Text>
        <Text numberOfLines={isMobileOnly ? 5 : 4} style={ResourceCardStyle.DescriptionText}>
          {description && description?.length >= 240
            ? `${description?.substring(0, 240)}...`
            : description}
        </Text>
        {ownerOrg?.orgName || item.ownerUser ? (
          <View style={ResourceCardStyle.OrganizerContainer}>
            <View style={ResourceCardStyle.OrganizerSubContainer}>
              <View style={ResourceCardStyle.ProfileImageContainer}>
                {ownerOrg?.orgName ? (
                  <ProfileImageNew
                    quality={ProfileImageQuality.medium}
                    type="org"
                    style={ProfileImageStyle.OrgSmall}
                    user={ownerOrgID}
                  />
                ) : (
                  <Image
                    style={{
                      width: 53,
                      height: 64,
                      borderRadius: 100,
                      backgroundColor: "white",
                      marginRight: 8,
                    }}
                    source={require("../../assets/Facelift/svg/JC-Logo-No-Text.svg")}
                  ></Image>
                )}
              </View>
              <View style={ResourceCardStyle.OrganizerTextColumn}>
                <Text numberOfLines={1} style={ResourceCardStyle.OrganizerText}>
                  Curated by
                </Text>
                <Text numberOfLines={1} style={ResourceCardStyle.OrganizerNameText}>
                  {ownerOrg?.orgName ?? "Jesus Collective"}
                </Text>
              </View>
            </View>
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  )
}

const ResourceCardStyle = StyleSheet.create({
  Container: {
    border: "1px solid #E4E1E1",
    backgroundColor: "#fff",
    borderRadius: 8,
    flex: 1,
    minHeight: 513,
    maxHeight: 513,
  },
  ContentContainer: {
    paddingTop: 24,
    paddingBottom: 16,
    paddingHorizontal: 16,
    flex: 1,
  },
  ResourceType: {
    color: "#FF4438",
    fontFamily: "Graphik-Semibold-App",
    fontSize: 12,
    lineHeight: 18,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  NameText: {
    fontSize: 24,
    fontFamily: "Graphik-Semibold-App",
    lineHeight: 36,
    color: "#483938",
    paddingBottom: 2,
  },
  DescriptionText: {
    paddingTop: 16,
    fontSize: 15,
    fontFamily: "Graphik-Regular-App",
    fontWeight: "400",
    lineHeight: 24,
    color: "#6A5E5D",
  },
  OrganizerNameText: {
    fontFamily: "Graphik-Regular-App",
    color: "#1a0706",
    lineHeight: 24,
    flex: 1,
    fontSize: 15,
  },
  OrganizerText: {
    color: "#6A5E5D",
    fontWeight: "600",
    fontSize: 12,
    letterSpacing: 1,
    lineHeight: 16,
    flex: 1,
    fontFamily: "Graphik-Regular-App",
    textTransform: "uppercase",
  },
  OrganizerContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    flex: 1,
    paddingTop: 32,
  },
  OrganizerSubContainer: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
  },
  OrganizerTextColumn: {
    marginLeft: 8,
    flexDirection: "column",
    flex: 1,
  },
  ProfileImageContainer: {
    flexDirection: "column",
  },
})
