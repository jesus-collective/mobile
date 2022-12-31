import { Entypo } from "@expo/vector-icons"
import { Auth } from "aws-amplify"
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
import Sentry from "../../components/Sentry"
import SignUpSidebar from "../../components/SignUpSidebar/SignUpSidebar"
import { UserActions, UserContext } from "../../screens/HomeScreen/UserContext"
import { Brand } from "../../src/Brand"

function MyForgotPassword() {
  const [brand, setBrand] = useState(Brand())
  const [email, setEmail] = useState<string>("")
  const [authError, setAuthError] = useState<string>("")
  const [codeSent, setCodeSent] = useState<boolean>(false)
  const [code, setCode] = useState<string>("")
  const [newPass, setNewPass] = useState<string>("")
  const [newPass2, setNewPass2] = useState<string>("")
  const [sendingCode, setSendingCode] = useState<boolean>(false)
  const [resetting, setResetting] = useState<boolean>(false)

  const UserConsumer = useContext(UserContext)

  const changeAuthState = async (actions: UserActions, state: string): Promise<void> => {
    setEmail("")

    setAuthError("")
    setCodeSent(false)
    setCode("")
    setNewPass("")
    setNewPass2("")
    setSendingCode(false)
    setResetting(false)

    if (actions.onStateChange) await actions.onStateChange(state, null)
  }

  const sendCode = async (): Promise<void> => {
    try {
      setSendingCode(true)
      Sentry.setUser({ email: email.toLowerCase() })
      await Auth.forgotPassword(email.toLowerCase()).then(() => setCodeSent(true))
    } catch (e: any) {
      setAuthError(e.message)
      setSendingCode(false)
      Sentry.configureScope((scope) => {
        scope.setUser(null)
      })
    }
  }

  const resetPass = async (actions: UserActions): Promise<void> => {
    try {
      if (newPass !== newPass2) {
        setAuthError("Passwords do not match")
        return
      }
      setResetting(true)
      Sentry.setUser({ email: email.toLowerCase() })

      await Auth.forgotPasswordSubmit(email.toLowerCase(), code, newPass).then(async () => {
        await changeAuthState(actions, "signIn")
      })
    } catch (e: any) {
      setAuthError(e.message)
      setResetting(false)
      Sentry.configureScope((scope) => {
        scope.setUser(null)
      })
    }
  }

  const handleEnter = (
    actions: UserActions,
    keyEvent: NativeSyntheticEvent<TextInputKeyPressEventData>
  ): void => {
    if (keyEvent.nativeEvent.key === "Enter") {
      if (codeSent) {
        resetPass(actions)
      } else {
        sendCode()
      }
    }
  }

  const styles = StyleSheet.create({
    authView2:
      Platform.OS === "web" && Dimensions.get("window").width > 720
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
      {UserConsumer.userState.authState === "forgotPassword" ? (
        <View style={{ width: "100%", left: 0, top: 0, height: "100%" }}>
          <View style={styles.signUpBackButtonWrapper}>
            <TouchableOpacity
              accessibilityLabel="Go back"
              accessibilityHint="Navigate to previous page"
              accessibilityRole="button"
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
          {!codeSent ? (
            <View style={styles.authView2}>
              <Text
                accessibilityRole="header"
                style={{
                  width: "100%",
                  marginBottom: "5.5%",
                  fontFamily: "Graphik-Regular-App",
                  fontWeight: "bold",
                  fontSize: 22,
                  lineHeight: 30,
                }}
              >
                Reset your password
              </Text>
              <TextInput
                textContentType="emailAddress"
                keyboardType="email-address"
                onKeyPress={(e) => handleEnter(UserConsumer.userActions, e)}
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.nativeEvent.text)}
                secureTextEntry={false}
                style={{
                  borderBottomWidth: 1,
                  borderColor: "#00000020",
                  width: "100%",
                  marginBottom: "4.2%",
                  paddingTop: 10,
                  paddingRight: 10,
                  paddingBottom: 10,
                  paddingLeft: 5,
                  fontFamily: "Graphik-Regular-App",
                  fontSize: 18,
                  lineHeight: 24,
                }}
              ></TextInput>
              <JCButton
                buttonType={
                  brand == "oneStory" ? ButtonTypes.SolidSignInOneStory : ButtonTypes.SolidSignIn
                }
                accessibilityLabel="Send security code"
                onPress={() => sendCode()}
              >
                {sendingCode ? (
                  <ActivityIndicator
                    accessibilityLabel="Loading"
                    accessibilityRole="alert"
                    animating
                    color="#333333"
                  />
                ) : (
                  "Send"
                )}
              </JCButton>
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityLabel="Verify your account"
                accessibilityHint="Navigate to account verification page"
                onPress={() => {
                  setCodeSent(true), setAuthError("")
                }}
              >
                <Text
                  style={{
                    alignSelf: "flex-end",
                    marginRight: 30,
                    fontSize: 14,
                    fontFamily: "Graphik-Regular-App",
                    lineHeight: 22,
                    color: "#333333",
                    opacity: 0.7,
                    marginTop: 20,
                  }}
                >
                  Submit a code
                </Text>
              </TouchableOpacity>
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
          ) : (
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
                Reset your password
              </Text>
              <TextInput
                textContentType="emailAddress"
                keyboardType="email-address"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.nativeEvent.text)}
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
              <TextInput
                textContentType="oneTimeCode"
                keyboardType="number-pad"
                placeholder="One-time security code"
                value={code}
                onChange={(e) => setCode(e.nativeEvent.text)}
                secureTextEntry={false}
                style={{
                  borderBottomWidth: 1,
                  borderColor: "#00000020",
                  width: "100%",
                  marginBottom: "5.5%",
                  paddingTop: 10,
                  paddingRight: 10,
                  paddingBottom: 10,
                  paddingLeft: 5,
                  fontFamily: "Graphik-Regular-App",
                  fontSize: 18,
                  lineHeight: 24,
                }}
              ></TextInput>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: "5.5%",
                }}
              >
                <TextInput
                  textContentType="newPassword"
                  onKeyPress={(e) => handleEnter(UserConsumer.userActions, e)}
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
                  textContentType="newPassword"
                  onKeyPress={(e) => handleEnter(UserConsumer.userActions, e)}
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
                buttonType={
                  brand == "oneStory" ? ButtonTypes.SolidSignInOneStory : ButtonTypes.SolidSignIn
                }
                onPress={() => resetPass(UserConsumer.userActions)}
              >
                {resetting ? (
                  <ActivityIndicator
                    accessibilityLabel="Loading"
                    accessibilityRole="alert"
                    animating
                    color="#333333"
                  />
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
          )}
          {Platform.OS === "web" && Dimensions.get("window").width > 720 ? (
            <SignUpSidebar text={true} />
          ) : null}
        </View>
      ) : null}
    </>
  )
}
export default MyForgotPassword
