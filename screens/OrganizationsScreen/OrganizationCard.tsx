import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import GenericButton from "../../components/FaceLift/GenericButton"
import { GenericButtonStyles } from "../../components/FaceLift/GenericButtonStyles"
import ProfileImage from "../../components/ProfileImage/ProfileImage"
import { Org } from "./useOrgs"

type Props = {
  item: Org
}
export default function OrganizationCard(props: Props) {
  const { item } = props
  const { orgName, location, aboutMeLong, aboutMeShort } = item
  const navigation = useNavigation<StackNavigationProp<any, any>>()
  const navigateToOrgScreen = () => {
    navigation.push("OrganizationScreen", { id: item.id })
  }
  return (
    <TouchableOpacity style={{ marginTop: 32 }} delayPressIn={150} onPress={navigateToOrgScreen}>
      <View style={OrgCardStyle.Container}>
        <View style={{ marginLeft: 20 }}>
          <ProfileImage isOrg={true} user={item} style="org" />
        </View>
        <View style={OrgCardStyle.ContentContainer}>
          <Text numberOfLines={3} style={OrgCardStyle.NameText}>
            {orgName}
          </Text>
          <Text numberOfLines={1} style={OrgCardStyle.LocationText}>
            {location?.geocodeFull}
          </Text>
          <Text numberOfLines={3} style={OrgCardStyle.DescriptionText}>
            {aboutMeShort ?? aboutMeLong}
          </Text>
          <View style={OrgCardStyle.ButtonContainer}>
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                alignItems: "flex-end",
              }}
            ></View>
            <GenericButton
              style={{
                ButtonStyle: GenericButtonStyles.TertiaryButtonStyle,
                LabelStyle: GenericButtonStyles.TertiaryLabelStyle,
                custom: OrgCardStyle.ButtonCustom,
                customLabel: { fontFamily: "Graphik-Medium-App" },
              }}
              label="View"
              action={navigateToOrgScreen}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const OrgCardStyle = StyleSheet.create({
  Container: {
    border: "1px solid #E4E1E1",
    borderRadius: 8,
    minHeight: 270,
    maxHeight: 270,
    backgroundColor: "#FFFFFF",
    flex: 1,
  },
  DescriptionText: {
    paddingTop: 16,
    fontSize: 15,
    fontFamily: "Graphik-Regular-App",
    fontWeight: "400",
    lineHeight: 24,
    color: "#1A0706",
  },
  ContentContainer: {
    padding: 16,
    marginTop: -4,
    paddingTop: 0,
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
    paddingBottom: 2,
    color: "#6A5E5D",
  },
  ButtonContainer: {
    paddingTop: 24,
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
