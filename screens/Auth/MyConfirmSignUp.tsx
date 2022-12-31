import { Entypo } from "@expo/vector-icons"
import { NavigationProp, useNavigation, useRoute } from "@react-navigation/native"
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
import { AuthStateData } from "src/types"
import { Copyright } from "../../components/Auth/Copyright"
import JCButton, { ButtonTypes } from "../../components/Forms/JCButton"
import Sentry from "../../components/Sentry"
import SignUpSidebar from "../../components/SignUpSidebar/SignUpSidebar"
import { UserActions, UserContext } from "../../screens/HomeScreen/UserContext"
import { Brand } from "../../src/Brand"

interface Props {
  navigation?: NavigationProp<any, any>
  route?: any
}

function MyConfirmSignUpImpl(props: Props) {
  const [brand, setBrand] = useState(Brand())
  const [email, setEmail] = useState<string>(props.route?.params.email ?? "")
  const [code, setCode] = useState<string>("")
  const [authError, setAuthError] = useState<string>("")
  const [sendingData, setSendingData] = useState<boolean>(false)
  const UserConsumer = useContext(UserContext)

  const changeAuthState = async (
    actions: UserActions,
    state: string,
    data: AuthStateData
  ): Promise<void> => {
    setEmail("")
    setCode("")
    setAuthError("")
    setSendingData(false)

    if (actions.onStateChange) await actions.onStateChange(state, data)
  }

  const handleConfirmSignUp = async (actions: UserActions): Promise<void> => {
    try {
      setSendingData(true)
      Sentry.setUser({ email: email.toLowerCase() })
      await Auth.confirmSignUp(email.toLowerCase(), code).then(async () => {
        await changeAuthState(actions, "signIn", {
          email: email.toLowerCase(),
          fromVerified: true,
          brand: null,
        })
      })
    } catch (e: any) {
      setAuthError(e.message)
      setSendingData(false)
      Sentry.configureScope((scope) => {
        scope.setUser(null)
      })
    }
  }

  const handleEnter = (
    actions: any,
    keyEvent: NativeSyntheticEvent<TextInputKeyPressEventData>
  ): void => {
    if (keyEvent.nativeEvent.key === "Enter") handleConfirmSignUp(actions)
  }

  const styles = StyleSheet.create({
    confirmationCodeWrapper:
      Dimensions.get("window").width < 720
        ? { display: "flex", flexDirection: "column" }
        : { display: "flex", flexDirection: "row" },

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
      {UserConsumer.userState.authState === "confirmSignUp" ? (
        <View style={{ width: "100%", left: 0, top: 0, height: "100%" }}>
          <View style={styles.signUpBackButtonWrapper}>
            <TouchableOpacity
              accessibilityLabel="Go back"
              accessibilityHint="Navigate to previous page"
              accessibilityRole="button"
              testID="myConfirmSignup-back"
              onPress={async () => {
                await changeAuthState(UserConsumer.userActions, "signIn", null)
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
              Enter your security code
            </Text>
            <TextInput
              accessibilityLabel="Email"
              textContentType="emailAddress"
              keyboardType="email-address"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.nativeEvent.text)}
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
            <View style={styles.confirmationCodeWrapper}>
              <TextInput
                textContentType="oneTimeCode"
                accessibilityLabel="One time security code"
                keyboardType="number-pad"
                onKeyPress={(e) => handleEnter(UserConsumer.userActions, e)}
                placeholder="One-time security code"
                value={code}
                onChange={(e) => setCode(e.nativeEvent.text)}
                style={{
                  borderBottomWidth: 1,
                  borderColor: "#00000020",
                  marginBottom: "1.4%",
                  marginRight: 30,
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
              <JCButton
                accessibilityLabel="Submit verification code"
                buttonType={
                  brand == "oneStory" ? ButtonTypes.SolidSignIn2OneStory : ButtonTypes.SolidSignIn2
                }
                onPress={() => handleConfirmSignUp(UserConsumer.userActions)}
              >
                {sendingData ? (
                  <ActivityIndicator
                    accessibilityRole="alert"
                    accessibilityLabel="Loading"
                    animating
                    color="#333333"
                  />
                ) : (
                  "Submit"
                )}
              </JCButton>
            </View>
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
              {authError ? (
                <Entypo style={{ marginRight: 4 }} name="warning" size={18} color="#F0493E" />
              ) : null}
              {authError}
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

export default function MyConfirmSignUp(props: Props): JSX.Element {
  const route = useRoute()
  const navigation = useNavigation()
  return <MyConfirmSignUpImpl {...props} navigation={navigation} route={route} />
}
