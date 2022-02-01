import Auth from "@aws-amplify/auth"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import React, { useEffect, useState } from "react"
import { isMobileOnly } from "react-device-detect"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import GenericButton from "../../components/GenericButton/GenericButton"
import { GenericButtonStyles } from "../../components/GenericButton/GenericButtonStyles"
import ProfileImage from "../../components/ProfileImage/ProfileImage"

const ProfileCardStyle = StyleSheet.create({
  Container: {
    minHeight: 308,
    flex: 1,
    marginTop: 32,
    borderWidth: 1,
    borderColor: "#E4E1E1",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
  },
})
type Props = {
  item: any
  forceDesktop?: boolean
  hideBottomBorder?: boolean
}
export default function ProfileCard(props: Props) {
  const navigation = useNavigation<StackNavigationProp<any, any>>()
  const [currentUser, setCurrentUser] = useState()
  const { item } = props
  useEffect(() => {
    const loadUser = async () => {
      const user = await Auth.currentAuthenticatedUser()
      setCurrentUser(user.username)
    }
    loadUser()
  }, [])
  return !props.forceDesktop && isMobileOnly ? (
    <TouchableOpacity
      onPress={() => navigation.push("ProfileScreen", { id: item?.id })}
      delayPressIn={150}
      style={{
        flexDirection: "row",
        flex: 1,
        paddingLeft: props.hideBottomBorder ? 0 : 12,
        paddingTop: 16,
        paddingRight: props.hideBottomBorder ? 12 : 24,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          flex: 1,
          paddingBottom: 12,
          flexDirection: "row",
          borderBottomWidth: props.hideBottomBorder ? 0 : 1,
          borderBottomColor: "#E4E1E1",
        }}
      >
        <ProfileImage size="small6" user={item?.id} />
        <View style={{ flexDirection: "column", flex: 1, marginLeft: 12 }}>
          <Text
            selectable
            style={{
              fontSize: 14,
              fontFamily: "Graphik-Semibold-App",
              lineHeight: 21,
              color: "#1A0706",
            }}
          >
            {item?.given_name} {item?.family_name}
          </Text>
          <Text
            selectable
            style={{
              fontSize: 14,
              fontFamily: "Graphik-Regular-App",
              lineHeight: 21,
              color: "#6A5E5D",
            }}
          >
            {item?.currentRole}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            if (item?.id !== currentUser)
              navigation.push("ConversationScreen", {
                initialUserID: item?.id,
                initialUserName: item?.given_name + " " + item?.family_name,
              })
          }}
          style={{ alignSelf: "center" }}
        >
          <Image
            style={{ width: 24, height: 24 }}
            source={require("../../assets/Facelift/svg/Airplane-Active.svg")}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      onPress={() => navigation.push("ProfileScreen", { id: item?.id })}
      style={ProfileCardStyle.Container}
    >
      <ProfileImage style="personCard" user={item?.id} />
      <View style={{ padding: 16, paddingTop: 0, flex: 1 }}>
        <Text
          selectable
          style={{
            marginTop: -16,
            fontSize: 15,
            fontFamily: "Graphik-Semibold-App",
            lineHeight: 24,
            color: "#1A0706",
            paddingBottom: 2,
          }}
        >
          {item?.given_name} {item?.family_name}
        </Text>
        <Text
          selectable
          style={{
            fontSize: 15,
            fontFamily: "Graphik-Regular-App",
            lineHeight: 24,
            color: "#6A5E5D",
            paddingBottom: 16,
          }}
        >
          {item?.currentRole}{" "}
          {item?.location?.geocodeFull ? `| ${item?.location?.geocodeFull}` : null}
        </Text>
        <Text
          selectable
          numberOfLines={4}
          style={{
            fontSize: 15,
            fontFamily: "Graphik-Regular-App",
            lineHeight: 24,
            color: "#1A0706",
          }}
        >
          {item?.aboutMeShort ?? item?.aboutMeLong}
        </Text>
        <View style={{ paddingTop: 32, flex: 1, justifyContent: "flex-end" }}>
          <GenericButton
            style={{
              ButtonStyle: GenericButtonStyles.TertiaryButtonStyle,
              LabelStyle: GenericButtonStyles.TertiaryLabelStyle,
              custom: { width: 124, height: 40 },
              customLabel: { fontFamily: "Graphik-Medium-App" },
            }}
            label={"Message"}
            action={() => {
              if (item?.id !== currentUser)
                navigation.push("ConversationScreen", {
                  initialUserID: item?.id,
                  initialUserName: item?.given_name + " " + item?.family_name,
                })
            }}
            icon={"Airplane-White"}
          />
        </View>
      </View>
    </TouchableOpacity>
  )
}
