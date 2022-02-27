import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import React, { useMemo } from "react"
import { isMobileOnly } from "react-device-detect"
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Group } from "src/API"
import GenericButton from "../../components/GenericButton/GenericButton"
import { GenericButtonStyles } from "../../components/GenericButton/GenericButtonStyles"
import ProfileImage from "../../components/ProfileImage/ProfileImage"

export default function GroupCard({ item }: { item: Group }) {
  const navigation = useNavigation<StackNavigationProp<any, any>>()
  const profileImageSize = useMemo(() => (isMobileOnly ? "small6" : "small7"), [isMobileOnly])
  const { name, owner, description, ownerUser } = item
  const navigateToGroupScreen = () => {
    navigation.push("GroupScreen", { id: item.id })
  }
  return (
    <TouchableOpacity delayPressIn={150} onPress={navigateToGroupScreen} style={Card.Container}>
      <View style={Card.ContentContainer}>
        <Text numberOfLines={3} style={Card.NameText}>
          {name}
        </Text>
        {item.location ? (
          <Text numberOfLines={1} style={Card.LocationText}>
            {item.location}
          </Text>
        ) : null}
        <Text numberOfLines={isMobileOnly ? 6 : 5} style={Card.DescriptionText}>
          {description && description?.length >= 240
            ? `${description?.substring(0, 240)}...`
            : description}
        </Text>
        <View style={Card.OrganizerContainer}>
          <View style={Card.OrganizerSubContainer}>
            <View style={Card.ProfileImageContainer}>
              <ProfileImage size={profileImageSize} user={owner} />
            </View>
            {Dimensions.get("window").width < 960 && !isMobileOnly ? (
              <GenericButton
                style={{
                  ButtonStyle: GenericButtonStyles.TertiaryButtonStyle,
                  LabelStyle: GenericButtonStyles.TertiaryLabelStyle,
                  custom: { height: 32, width: 96 },
                  customLabel: { fontFamily: "Graphik-Medium-App" },
                }}
                label="View"
                action={() => navigation.push("GroupScreen", { id: item.id })}
              />
            ) : (
              <View style={Card.OrganizerTextColumn}>
                <Text numberOfLines={1} style={Card.OrganizerText}>
                  Organizer
                </Text>
                <Text numberOfLines={3} style={Card.OrganizerNameText}>
                  {ownerUser?.given_name + " " + ownerUser?.family_name}
                </Text>
              </View>
            )}

            {Dimensions.get("window").width > 960 || isMobileOnly ? (
              <GenericButton
                style={{
                  ButtonStyle: GenericButtonStyles.TertiaryButtonStyle,
                  LabelStyle: GenericButtonStyles.TertiaryLabelStyle,
                  custom: { height: 32, width: 76 },
                  customLabel: { fontFamily: "Graphik-Medium-App" },
                }}
                label="View"
                action={() => navigation.push("GroupScreen", { id: item.id })}
              />
            ) : null}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const Card = StyleSheet.create({
  Container: {
    border: "1px solid #E4E1E1",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    minHeight: 348,
    flex: 1,
  },
  ContentContainer: {
    padding: 24,
    flex: 1,
  },
  NameText: {
    fontSize: 15,
    fontFamily: "Graphik-Semibold-App",
    lineHeight: 24,
    color: "#1A0706",
    paddingBottom: 2,
  },
  LocationText: {
    fontSize: 15,
    fontFamily: "Graphik-Regular-App",
    fontWeight: "400",
    lineHeight: 24,
    color: "#6A5E5D",
  },
  DescriptionText: {
    paddingTop: 16,
    fontSize: 15,
    fontFamily: "Graphik-Regular-App",
    fontWeight: "400",
    lineHeight: 24,
    color: "#1A0706",
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
    justifyContent: "space-between",
    flex: 1,
    flexDirection: "row",
  },
  OrganizerTextColumn: {
    flexDirection: "column",
    flex: 1,
  },
  ProfileImageContainer: {
    flexDirection: "column",
    marginRight: isMobileOnly ? 8 : 0,
  },
})
