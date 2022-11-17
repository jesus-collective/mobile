import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import React, { useContext } from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"
import GenericButton from "../../../components/GenericButton/GenericButton"
import { GenericButtonStyles } from "../../../components/GenericButton/GenericButtonStyles"
import ProfileImageNew, {
  ProfileImageQuality,
  ProfileImageStyle,
} from "../../../components/ProfileImage/ProfileImageNew"
import { MyAccountContext } from "../MyAccountContext"
import { MyAccountActionType } from "../MyAccountTypes"
import MyAccountChangeName from "./MyAccountChangeName"
import MyAccountChangePass from "./MyAccountChangePass"
export default function MyInformation() {
  const { state, dispatch } = useContext(MyAccountContext)
  const navigation = useNavigation<StackNavigationProp<any, any>>()
  if (!state.user) return null
  const { given_name, family_name, id, location } = state.user
  return (
    <View>
      <Text style={style.Header}>Your Information</Text>
      <View style={style.HeaderHorizontalLine} />
      <View style={style.Container}>
        <View style={style.SubContainer}>
          <View style={style.ContentContainer}>
            <ProfileImageNew
              linkToProfile
              style={ProfileImageStyle.UserLarge2}
              quality={ProfileImageQuality.medium}
              type="user"
              user={id}
            />
            <View style={style.TextContainer}>
              <Text style={style.PrimaryText}>
                {given_name} {family_name}
              </Text>
              <Text style={style.SecondaryText}>{location?.geocodeFull}</Text>
            </View>

            <GenericButton
              style={{
                ButtonStyle: GenericButtonStyles.TertiaryButtonStyle,
                LabelStyle: GenericButtonStyles.TertiaryLabelStyle,
                custom: { width: 118, height: 48, alignSelf: "center" },
                customLabel: { fontFamily: "Graphik-Medium-App" },
              }}
              label={"Edit Profile"}
              action={() => {
                navigation.push("EditProfileScreen", { id: id })
              }}
            />
          </View>
        </View>

        {state.showChangePass || state.showChangeName ? null : (
          <View style={style.SubContainer}>
            <View style={[style.ContentContainer2]}>
              <Text style={[style.SecondaryText, { marginBottom: 4 }]}>{state.user.email}</Text>
              <Pressable
                onPress={() =>
                  dispatch({
                    type: MyAccountActionType.SHOW_CHANGE_NAME,
                    payload: { showChangeName: true },
                  })
                }
                style={style.ButtonContainer}
              >
                <Text style={style.ButtonText}>Change name</Text>
              </Pressable>
            </View>
          </View>
        )}
        {state.showChangePass || state.showChangeName ? null : (
          <View style={[style.ContentContainer2, style.NoBorder]}>
            <Pressable
              onPress={() =>
                dispatch({
                  type: MyAccountActionType.SHOW_CHANGE_PASS,
                  payload: { showChangePass: true },
                })
              }
              style={style.ButtonContainer}
            >
              <Text style={style.ButtonText}>Change password</Text>
            </Pressable>
          </View>
        )}
        {state.showChangePass ? (
          <MyAccountChangePass />
        ) : state.showChangeName ? (
          <MyAccountChangeName />
        ) : null}
      </View>
    </View>
  )
}
const style = StyleSheet.create({
  Container: {
    marginTop: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderColor: "#E4E1E1",
    borderWidth: 1,
    marginBottom: 48,
  },
  SubContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E4E1E1",
  },
  ContentContainer: {
    padding: 16,
    flex: 1,
    flexDirection: "row",
  },
  ContentContainer2: {
    padding: 16,
    flex: 1,
    flexDirection: "column",
  },
  NoBorder: {
    borderBottomWidth: 0,
  },
  ButtonContainer: {
    width: 160,
  },
  ButtonText: {
    flex: 1,
    color: "#FF4438",
    fontFamily: "Graphik-Regular-App",
  },
  TextContainer: {
    flex: 1,
    flexDirection: "column",
    paddingLeft: 16,
    justifyContent: "center",
  },
  PrimaryText: {
    fontFamily: "Graphik-Medium-App",
    fontSize: 15,
    color: "#1A0706",
    marginBottom: 4,
  },
  SecondaryText: {
    fontFamily: "Graphik-Regular-App",
    color: "#6A5E5D",
  },
  Header: {
    color: "#483938",
    fontSize: 12,
    fontFamily: "Graphik-Medium-App",
    flex: 1,
    lineHeight: 16,
    letterSpacing: 1,
    textTransform: "uppercase",
    paddingBottom: 6,
  },
  HeaderHorizontalLine: {
    borderTopWidth: 1,
    borderColor: "#E4E1E1",
  },
})
