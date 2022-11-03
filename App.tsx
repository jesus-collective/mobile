import MomentUtils from "@date-io/moment"
import { Ionicons } from "@expo/vector-icons"
import { MuiPickersUtilsProvider } from "@material-ui/pickers"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Amplify, Auth, I18n } from "aws-amplify"
import { Authenticator } from "aws-amplify-react-native"
import { useFonts } from "expo-font"
import React, { lazy, Suspense, useEffect, useState } from "react"
import { ActivityIndicator, Dimensions, Linking, Platform, View } from "react-native"
import EStyleSheet from "react-native-extended-stylesheet"
import NeedHelpButton from "./components/FloatingButton/NeedHelpButton"
import Main from "./screens/HomeScreen/Main"
import * as RootNavigation from "./screens/HomeScreen/NavigationRoot"
import awsConfig from "./src/aws-exports"
import { AuthStateData, JCCognitoUser } from "./src/types"

const federated = {
  google_client_id: "",
  facebook_app_id: "579712102531269",
  amazon_client_id: "",
}
EStyleSheet.build({
  // always call EStyleSheet.build() even if you don't use global variables!
  $textColor: "#0275d8",
})

const SignUpSidebar = lazy(() => import("./components/SignUpSidebar/SignUpSidebar"))

Amplify.configure(awsConfig)

const authScreenLabels = {
  en: {
    "Sign in to your account": "Sign in to Jesus Collective",
    "Sign Up": "Create an Account",
    "Sign Up Account": "Create an Account",
    "Sign in with Facebook": "Use Facebook Account",
    "Sign in with Google": "Use Google Account",
    "Forgot Password": "Forgot password?",
  },
}

I18n.setLanguage("en")
I18n.putVocabularies(authScreenLabels)
const getAuthInitialState = async (): Promise<string> => {
  const initialUrl = await Linking.getInitialURL()
  console.log({ "INITIAL URL": initialUrl })
  if (initialUrl?.toLowerCase().includes("/auth/signup")) return "signUp"
  return "signIn"
}

export default function App() {
  const [state, setState] = useState({
    authState: "",
    userName: "",
    isLoggedIn: false,
  })
  useEffect(() => {
    const loadInitialAuthState = async () => {
      const authState = await getAuthInitialState()
      setState({ ...state, authState })
    }
    loadInitialAuthState()
  }, [])

  const updateState = async (authState: string, data: AuthStateData) => {
    setState({ ...state, authState: authState })
    if (state.authState == "signUp")
      RootNavigation.navigate("signup", { joinedAs: null, brand: data?.brand })
    else if (state.authState == "signIn") {
      RootNavigation.navigate("auth", {
        screen: "signin",
        brand: data?.brand,
        email: data?.email,
        fromVerified: data?.fromVerified,
      })
    } else if (state.authState == "forgotPassword")
      RootNavigation.navigate("forgotpassword", {
        brand: data?.brand,
      })
    else if (state.authState == "requireNewPassword")
      RootNavigation.navigate("requirenewpassword", { brand: data?.brand })
    else if (state.authState == "verifyContact")
      RootNavigation.navigate("verifycontact", { brand: data?.brand })
    else if (state.authState == "confirmSignIn")
      RootNavigation.navigate("confirmsignin", { brand: data?.brand })
    else if (state.authState == "confirmSignUp")
      RootNavigation.navigate("confirmsignup", { email: data?.email, brand: data?.brand })
    else if (state.authState == "signedIn") {
      const user = (await Auth.currentAuthenticatedUser()) as JCCognitoUser
      const userGroups = user.getSignInUserSession()?.getAccessToken().payload["cognito:groups"]
      const isAdmin = userGroups.includes("admin")
      const isSubscriptionValid = userGroups.includes("subscriptionValid")
      const isLegacyUserGroup1 = userGroups.includes("legacyUserGroup1")
      if (isAdmin || isSubscriptionValid || isLegacyUserGroup1) {
        RootNavigation.navigate("auth", {
          screen: "Payment3",
          params: {
            joinedProduct: data?.joinedProduct,
            brand: data?.brand,
          },
        })
      } else {
        RootNavigation.navigate("auth", {
          screen: "Payment1",
          // params: {
          joinedProduct: data?.joinedProduct,
          brand: data?.brand,
          //},
        })
      }
    }
  }
  const [fontLoaded] = useFonts({
    "Graphik-Bold-App": require("./assets/font/commercial-type-1906-WOIKTV-app/graphik/Graphik-Bold-App.ttf"),
    "Graphik-Medium-App": require("./assets/font/commercial-type-1906-WOIKTV-app/graphik/Graphik-Medium-App.ttf"),
    "Graphik-Regular-App": require("./assets/font/commercial-type-1906-WOIKTV-app/graphik/Graphik-Regular-App.ttf"),
    "Graphik-Semibold-App": require("./assets/font/commercial-type-1906-WOIKTV-app/graphik/Graphik-Semibold-App.ttf"),
    "GraphikXXCondensed-Black-App": require("./assets/font/commercial-type-1906-WOIKTV-app/graphik_xx_condensed/GraphikXXCondensed-Black-App.ttf"),
    ...Ionicons.font,
  })
  useEffect(() => {
    const getstate = async () => {
      console.log("loading state")
      const navState = await AsyncStorage.getItem("NAVIGATION_STATE")
      if (navState) {
        const str = JSON.parse(navState ?? "")
        console.log({ str })
      }
    }
    getstate()
  }, [])
  if (!fontLoaded && state.authState !== "") return null
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
      }}
    >
      <NeedHelpButton></NeedHelpButton>
      {Platform.OS !== "web" || Dimensions.get("window").width <= 720 ? (
        state.authState != "signedIn" && state.authState != "loading" && state.authState != "" ? (
          <Suspense
            fallback={
              <ActivityIndicator
                style={{
                  marginTop: 32,
                  position: "absolute",
                  alignSelf: "center",
                }}
                size="large"
                color="#FF4438"
              />
            }
          >
            <SignUpSidebar text={true} />
          </Suspense>
        ) : null
      ) : null}
      <Authenticator
        onStateChange={async (item1: string, data: AuthStateData) => await updateState(item1, data)}
        hideDefault={true}
        authState={state.authState}
        federated={federated}
        userNameAttributes="email"
      >
        <Suspense
          fallback={
            <ActivityIndicator
              style={{
                marginTop: 32,
                position: "absolute",
                alignSelf: "center",
              }}
              size="large"
              color="#FF4438"
            />
          }
        >
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              flex: 1,
            }}
          >
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <Main
                onStateChange={async (e: string, e2: AuthStateData) => {
                  console.log(e)
                  await updateState(e, e2)
                }}
                authState={state.authState}
              />
            </MuiPickersUtilsProvider>
          </View>
        </Suspense>
      </Authenticator>
    </View>
  )
}
