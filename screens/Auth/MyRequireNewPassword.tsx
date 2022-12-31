import { Entypo } from "@expo/vector-icons"
import { Picker } from "@react-native-picker/picker"
import { NavigationProp } from "@react-navigation/native"
import { Auth } from "aws-amplify"
import countryDialCodes from "aws-amplify-react-native/src/CountryDialCodes"
import React, { useContext, useState } from "react"
import {
  ActivityIndicator,
  Dimensions,
  NativeSyntheticEvent,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TextInputKeyPressEventData,
  TouchableOpacity,
  View,
} from "react-native"
import { Copyright } from "../../components/Auth/Copyright"
import JCButton, { ButtonTypes } from "../../components/Forms/JCButton"
import SignUpSidebar from "../../components/SignUpSidebar/SignUpSidebar"
import { UserActions, UserContext, UserState } from "../../screens/HomeScreen/UserContext"
import { Brand } from "../../src/Brand"

interface Props {
  username: any
  navigation?: NavigationProp<any, any>
  route?: any
}

function MyForgotPassword(props: Props) {
  const [brand, setBrand] = useState(Brand())
  const [phone, setPhone] = useState<string>("")
  const [code, setCode] = useState<string>("+1")
  const [first, setFirst] = useState<string>("")
  const [last, setLast] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [authError, setAuthError] = useState<string>("")
  const [newPass, setNewPass] = useState<string>("")
  const [newPass2, setNewPass2] = useState<string>("")
  const [resetting, setResetting] = useState<boolean>(false)
  const [username, setUsername] = useState<string>(props.username)
  const [authState, setAuthState] = useState<string | null>(null)

  const UserConsumer = useContext(UserContext)

  const changeAuthState = async (actions: UserActions, state: string): Promise<void> => {
    setPhone("")
    setFirst("")
    setLast("")
    setEmail("")
    setAuthError("")
    setCode("+1")
    setNewPass("")
    setNewPass2("")
    setResetting(false)

    if (actions.onStateChange) await actions.onStateChange(state, null)
  }

  const save = async (actions: UserActions, userState: UserState | undefined): Promise<void> => {
    if (userState == undefined) return
    console.log("Saving")
    try {
      if (newPass !== newPass2) {
        setAuthError("Passwords do not match")
        return
      }
      await Auth.completeNewPassword(userState.user, newPass, {
        family_name: last,
        given_name: first,
        phone_number: code + phone,
      })
        .then(async () => {
          await changeAuthState(actions, "signedIn")
        })
        .catch((e) => {
          console.log({ Error: e })
        })
    } catch (e: any) {
      setAuthError(e.message)
      setResetting(false)
    }
  }

  const handleEnter = (
    actions: UserActions,
    userState: UserState | undefined,
    keyEvent: NativeSyntheticEvent<TextInputKeyPressEventData>
  ): void => {
    if (keyEvent.nativeEvent.key === "Enter") {
      save(actions, userState)
    }
  }

  const styles = StyleSheet.create({
    authView2:
      Platform.OS === "web" && Dimensions.get("window").width >= 720
        ? { left: "37.5%", width: 500, top: "20%", height: "auto" }
        : { left: "2%", width: "96%", top: "12%", height: "100%" },
    signUpBackButtonWrapper:
      Dimensions.get("window").width >= 720
        ? { position: "absolute", top: "10%", left: "30%", zIndex: 9999 }
        : {
            position: "absolute",
            top: "0",
            left: "2%",
            marginTop: Platform.OS === "android" ? 50 : 10,
            zIndex: 9999,
          },
  })

  if (!UserConsumer.userState) return null
  return (
    <>
      {UserConsumer.userState.authState === "requireNewPassword" ? (
        <View style={{ width: "100%", left: 0, top: 0, height: "100%" }}>
          <View style={styles.signUpBackButtonWrapper}>
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel="Go back"
              accessibilityHint="Navigate to previous page"
              onPress={async () => {
                await changeAuthState(UserConsumer.userActions, "signIn")
              }}
            >
              <Text
                style={{
                  alignSelf: "flex-end",
                  marginRight: 30,
                  fontSize: 20,
                  fontFamily: "Graphik-Regular-App",
                  lineHeight: 24,
                  color: "#333333",
                }}
              >
                <Entypo name="chevron-left" size={20} color="#333333" />
                Back
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.authView2}>
            <Text
              style={{
                width: "100%",
                marginBottom: "5.5%",
                fontFamily: "Graphik-Regular-App",
                fontWeight: "bold",
                fontSize: 22,
                lineHeight: 30,
              }}
            >
              Tell us more about yourself
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                marginBottom: "5.5%",
              }}
            >
              <TextInput
                placeholder="First Name"
                accessibilityLabel="First Name"
                value={first}
                onChange={(e) => setFirst(e.nativeEvent.text)}
                secureTextEntry={false}
                style={{
                  borderBottomWidth: 1,
                  borderColor: "#00000020",
                  width: "100%",
                  marginBottom: "1.4%",
                  marginRight: 30,
                  paddingTop: 10,
                  paddingRight: 10,
                  paddingBottom: 10,
                  paddingLeft: 5,
                  fontFamily: "Graphik-Regular-App",
                  fontSize: 18,
                  lineHeight: 24,
                }}
              ></TextInput>
              <TextInput
                placeholder="Last Name"
                accessibilityLabel="Last Name"
                value={last}
                onChange={(e) => setLast(e.nativeEvent.text)}
                secureTextEntry={false}
                style={{
                  borderBottomWidth: 1,
                  borderColor: "#00000020",
                  width: "100%",
                  marginBottom: "1.4%",
                  paddingTop: 10,
                  paddingRight: 10,
                  paddingBottom: 10,
                  paddingLeft: 5,
                  fontFamily: "Graphik-Regular-App",
                  fontSize: 18,
                  lineHeight: 24,
                }}
              ></TextInput>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                marginBottom: "8.33%",
              }}
            >
              <Picker
                accessibilityLabel="Country code"
                selectedValue={code}
                onValueChange={(val) => setCode(val)}
                style={{ marginRight: 5, borderColor: "#00000070" }}
              >
                {countryDialCodes.map((dialCode) => (
                  <Picker.Item key={dialCode} value={dialCode} label={dialCode} />
                ))}
              </Picker>
              <Text
                style={{
                  fontSize: 22,
                  color: "#F0493E",
                  fontFamily: "Graphik-Regular-App",
                }}
              >
                *
              </Text>
              <TextInput
                accessibilityLabel="Telephone number"
                textContentType="telephoneNumber"
                onKeyPress={(e) => {
                  handleEnter(UserConsumer.userActions, UserConsumer.userState, e)
                }}
                keyboardType="phone-pad"
                placeholder="Phone number"
                value={phone}
                onChange={(e) => setPhone(e.nativeEvent.text)}
                style={{
                  borderBottomWidth: 1,
                  borderColor: "#00000020",
                  width: "100%",
                  paddingTop: 10,
                  paddingRight: 10,
                  paddingBottom: 10,
                  paddingLeft: 5,
                  fontFamily: "Graphik-Regular-App",
                  fontSize: 18,
                  lineHeight: 24,
                }}
              ></TextInput>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                marginBottom: "5.5%",
              }}
            >
              <TextInput
                textContentType="newPassword"
                onKeyPress={(e) => {
                  handleEnter(UserConsumer.userActions, UserConsumer.userState, e)
                }}
                accessibilityLabel="New password"
                placeholder="New password"
                value={newPass}
                onChange={(e) => setNewPass(e.nativeEvent.text)}
                secureTextEntry={true}
                style={{
                  borderBottomWidth: 1,
                  borderColor: "#00000020",
                  width: "100%",
                  marginRight: 30,
                  paddingTop: 10,
                  paddingRight: 10,
                  paddingBottom: 10,
                  paddingLeft: 5,
                  fontFamily: "Graphik-Regular-App",
                  fontSize: 18,
                  lineHeight: 24,
                }}
              ></TextInput>
              <TextInput
                accessibilityLabel="Confirm new password"
                textContentType="newPassword"
                onKeyPress={(e) => {
                  handleEnter(UserConsumer.userActions, UserConsumer.userState, e)
                }}
                placeholder="Confirm new password"
                value={newPass2}
                onChange={(e) => setNewPass2(e.nativeEvent.text)}
                secureTextEntry={true}
                style={{
                  borderBottomWidth: 1,
                  borderColor: "#00000020",
                  width: "100%",
                  paddingTop: 10,
                  paddingRight: 10,
                  paddingBottom: 10,
                  paddingLeft: 5,
                  fontFamily: "Graphik-Regular-App",
                  fontSize: 18,
                  lineHeight: 24,
                }}
              ></TextInput>
            </View>
            <JCButton
              accessibilityLabel="Submit changes"
              buttonType={
                brand == "oneStory" ? ButtonTypes.SolidSignInOneStory : ButtonTypes.SolidSignIn
              }
              onPress={() => {
                save(UserConsumer.userActions, UserConsumer.userState)
              }}
            >
              {resetting ? (
                <ActivityIndicator accessibilityLabel="Loading" animating color="#333333" />
              ) : (
                "Submit"
              )}
            </JCButton>
            <Text
              accessibilityLiveRegion={"assertive"}
              accessibilityRole="alert"
              style={{
                alignSelf: "center",
                alignItems: "center",
                fontSize: 14,
                fontFamily: "Graphik-Regular-App",
                lineHeight: 22,
                marginTop: 20,
              }}
            >
              {authError ? <Entypo name="warning" size={18} color="#F0493E" /> : null} {authError}
            </Text>
            <Copyright />
          </View>
          {Platform.OS === "web" && Dimensions.get("window").width > 720 ? (
            <SignUpSidebar text={true} />
          ) : null}
        </View>
      ) : null}
    </>
  )
}
export default MyForgotPassword
