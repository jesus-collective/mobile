import React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
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
  return (
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
