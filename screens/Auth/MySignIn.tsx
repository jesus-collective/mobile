import { Entypo } from "@expo/vector-icons"
import { NavigationProp, useNavigation, useRoute } from "@react-navigation/native"
import { Auth } from "aws-amplify"
import React, { useContext, useState } from "react"
import {
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
//import MainStyles from "../../components/style"
import { UserActions, UserContext } from "../../screens/HomeScreen/UserContext"
import { Brand } from "../../src/Brand"

interface Props {
  navigation?: NavigationProp<any, any>
  route?: any
}

interface State {
  pass: string
  user: string
  authError: string
  fromVerified: boolean
  joinedProduct: string
  brand: "jc" | "oneStory" | null
}

function MySignInImpl(props: Props) {
  const [pass, setPass] = useState<string>()
  const [user, setUser] = useState<string>(props.route?.params?.email ?? "")
  const [authError, setAuthError] = useState<string>("")
  const [fromVerified, setFromVerified] = useState<boolean>(
    props.route?.params?.fromVerified ?? false
  )
  const [brand, setBrand] = useState(Brand())
  const [joinedProduct, setJoinedProduct] = useState<string>(props.route?.params.joinedProduct)
  const UserConsumer = useContext(UserContext)

  const UNSAFE_componentWillMount = (): void => {
    console.log(props.route)
    setUser(props.route?.params?.email ?? "")
    setFromVerified(props.route?.params?.fromVerified ?? false)
  }
  const componentDidUpdate = (prevProps: Props, prevState: State): void => {
    if (props.route?.params?.email !== prevProps.route?.params?.email) {
      setUser(props.route?.params?.email)
    }
    if (props.route?.params?.fromVerified !== prevProps.route?.params?.fromVerified) {
      setFromVerified(props.route?.params?.fromVerified)
    }
  }

  const changeAuthState = async (
    action: UserActions,
    state: string,
    user?: any,
    data?: AuthStateData
  ): Promise<void> => {
    setPass("")
    setUser("")
    setAuthError("")
    setJoinedProduct(props.route?.params.joinedProduct)
    setBrand(brand)

    if (action.onStateChange) await action.onStateChange(state, data ?? null)
    if (user) action.onSetUser(user)
  }

  const validateLogin = (): boolean => {
    if (!/^\S*$/.test(user)) {
      setAuthError("Email cannot contain spaces")
      return false
    }
    if (!user) {
      setAuthError("Email cannot be empty")
      return false
    }
    if (!pass) {
      setAuthError("Password cannot be empty")
      return false
    }
    return true
  }
  const handleSignIn = async (actions: any): Promise<void> => {
    if (validateLogin()) {
      try {
        Sentry.setUser({ email: user?.toLowerCase() })
        Sentry.setTag("User Email", user?.toLowerCase())
        await Auth.signIn(user.toLowerCase(), pass).then(async (user) => {
          if (user.challengeName == "NEW_PASSWORD_REQUIRED") {
            await changeAuthState(actions, "requireNewPassword", user)
          } else {
            await changeAuthState(actions, "signedIn")
          }
        })
      } catch (err: any) {
        setAuthError(err.message)
        Sentry.configureScope((scope) => {
          scope.setUser(null)
        })
      }
    }
  }

  const handleEnter = (
    actions: any,
    keyEvent: NativeSyntheticEvent<TextInputKeyPressEventData>
  ): void => {
    if (keyEvent.nativeEvent.key === "Enter") handleSignIn(actions)
  }

  const styles = StyleSheet.create({
    createAccountButtonWrapper:
      Dimensions.get("window").width < 720
        ? {
            position: "absolute",
            top: "0%",
            left: "2%",
            marginTop: 5,
          }
        : {
            position: "absolute",
            top: "6%",
            right: "3.5%",
          },

    authView2:
      Platform.OS === "web" && Dimensions.get("window").width > 720
        ? { left: "37.5%", width: 500, top: "20%", height: "auto" }
        : { left: "2%", width: "96%", top: "12%", height: "100%" },
    mySignInForgotPassword: {
      alignSelf: "flex-end",
      marginRight: 30,
      fontSize: 14,
      fontFamily: "Graphik-Regular-App",
      lineHeight: 22,
      color: "#333333",
      opacity: 0.7,
      marginTop: 20,
    },
  })
  /*
      "@media (min-width: 350) and (max-width: 768)": {
      
        authView2: { left: "37.5%", width: 300, top: "20%", height: "auto" },
        "@media (min-width: 320px) and (max-width: 720px)": {
          authView2: { left: "2%", width: "96%", top: "12%", height: "100%" },
          
*/

  /* ,
            "@media (min-width: 320px) and (max-width: 720px)": {

              mySignInForgotPassword: {
                alignSelf: "flex-end",
              },*/
  if (!UserConsumer.userState) return null
  return (
    <>
      {UserConsumer.userState.authState === "signIn" ||
      UserConsumer.userState.authState === "signedOut" ||
      UserConsumer.userState.authState === "signedUp" ? (
        <View style={{ width: "100%", left: 0, top: 0, height: "100%" }}>
          <View style={styles.createAccountButtonWrapper}>
            <JCButton
              accessibilityLabel="Create account"
              accessibilityHint="Navigate to account creation page"
              buttonType={
                brand == "oneStory"
                  ? ButtonTypes.SolidCreateAccountOneStory
                  : ButtonTypes.SolidCreateAccount
              }
              onPress={async () => {
                await changeAuthState(UserConsumer.userActions, "signUp", null, {
                  joinedProduct: joinedProduct,
                  brand: brand,
                })
              }}
            >
              Create an Account
            </JCButton>
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
              {brand == "oneStory" ? "Welcome to One Story" : "Sign in to Jesus Collective"}
            </Text>

            <TextInput
              textContentType="emailAddress"
              autoFocus
              keyboardType="email-address"
              placeholder="Email"
              value={user}
              onChange={(e) => setUser(e.nativeEvent.text)}
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
              textContentType="password"
              onKeyPress={(e) => {
                handleEnter(UserConsumer.userActions, e)
              }}
              placeholder="Password"
              value={pass}
              onChange={(e) => setPass(e.nativeEvent.text)}
              secureTextEntry={true}
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
              accessibilityLabel="Login"
              accessibilityHint="Navigate to platform"
              buttonType={
                brand == "oneStory" ? ButtonTypes.SolidSignInOneStory : ButtonTypes.SolidSignIn
              }
              onPress={async () => {
                await handleSignIn(UserConsumer.userActions)
              }}
            >
              Sign In
            </JCButton>
            <TouchableOpacity
              accessibilityLabel="Forgot password"
              accessibilityHint="Navigate to forgot password page"
              accessibilityRole="button"
              onPress={async () => {
                await changeAuthState(UserConsumer.userActions, "forgotPassword")
              }}
            >
              <Text style={styles.mySignInForgotPassword}>Forgot password?</Text>
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
            <Text
              accessible={fromVerified}
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
              {fromVerified ? "User Verified. Please Login." : null}
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

export default function MySignIn(props: Props): JSX.Element {
  const route = useRoute()
  const navigation = useNavigation()
  return <MySignInImpl {...props} navigation={navigation} route={route} />
}
