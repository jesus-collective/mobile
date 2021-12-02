import React from "react"
import { isMobile } from "react-device-detect"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import GenericButton from "../../components/FaceLift/GenericButton"
import { GenericButtonStyles } from "../../components/FaceLift/GenericButtonStyles"
import ProfileImage from "../../components/ProfileImage/ProfileImage"

const GroupCardStyle = StyleSheet.create({
  CardContainer: {
    height: 308,
    flex: 1,
    marginBottom: 64,
    marginTop: 32,
    marginRight: 32,
    maxWidth: "calc(50% - 32px)",
    borderWidth: 1,
    borderColor: "#E4E1E1",
    borderRadius: 8,
  },
})
type Props = {
  item: any
}
export default function GroupCard(props: Props) {
  const { item } = props
  const { given_name, family_name, id, currentRole, aboutMeLong, aboutMeShort, location } = item
  console.log(item)
  return isMobile ? (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        flex: 1,
        paddingLeft: 12,
        paddingTop: 16,
        paddingRight: 24,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          flex: 1,
          paddingBottom: 12,
          flexDirection: "row",
          borderBottomWidth: 1,
          borderBottomColor: "#E4E1E1",
        }}
      >
        <ProfileImage size="small6" user={id} />
        <View style={{ flexDirection: "column", flex: 1, marginLeft: 12 }}>
          <Text
            style={{
              fontSize: 14,
              fontFamily: "Graphik-Semibold-App",
              lineHeight: 21,
              color: "#1A0706",
            }}
          >
            {given_name} {family_name}
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: "Graphik-Regular-App",
              lineHeight: 21,
              color: "#6A5E5D",
            }}
          >
            {currentRole}
          </Text>
        </View>
        <TouchableOpacity style={{ alignSelf: "center" }}>
          <Image
            style={{ width: 24, height: 24 }}
            source={require("../../assets/Facelift/Airplane-dark.png")}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity style={GroupCardStyle.CardContainer}>
      <ProfileImage style="personCard" user={id} />
      <View style={{ padding: 16, paddingTop: 0, flex: 1 }}>
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
          {given_name} {family_name}
        </Text>
        <Text
          style={{
            fontSize: 15,
            fontFamily: "Graphik-Regular-App",
            fontWeight: "400",
            lineHeight: 24,
            color: "#6A5E5D",
            paddingBottom: 16,
          }}
        >
          {currentRole} {location?.geocodeFull ? `| ${location?.geocodeFull}` : null}
        </Text>
        <Text
          numberOfLines={4}
          style={{
            fontSize: 15,
            fontFamily: "Graphik-Regular-App",
            fontWeight: "400",
            lineHeight: 24,
            color: "#1A0706",
            paddingBottom: 32,
          }}
        >
          {aboutMeShort ?? aboutMeLong}
        </Text>
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <GenericButton
            style={{
              ButtonStyle: GenericButtonStyles.TertiaryButtonStyle,
              LabelStyle: GenericButtonStyles.TertiaryLabelStyle,
              custom: { width: 124, height: 40 },
            }}
            label={"Message"}
            action={() => null}
            icon={"Airplane"}
          />
        </View>
      </View>
    </TouchableOpacity>
  )
}
