import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import { NavigationProp } from "@react-navigation/native"
import Amplify, { Auth, I18n } from "aws-amplify"
import { Authenticator } from "aws-amplify-react-native"
import { Linking } from "expo"
import { Asset } from "expo-asset"
import * as Font from "expo-font"
import { View } from "native-base"
import React, { lazy, Suspense } from "react"
import { Dimensions, Image, Platform } from "react-native"
import EStyleSheet from "react-native-extended-stylesheet"
import { AuthStateData } from "src/types"
import FloatingButton from "./components/FloatingButton/FloatingButton"
import FloatingButtonStyles from "./components/FloatingButton/FloatingButtonStyles"
import HelpModal from "./components/HelpModal/HelpModal"
import JCComponent, { JCState } from "./components/JCComponent/JCComponent"
import Sentry from "./components/Sentry"
import * as RootNavigation from "./screens/HomeScreen//NavigationRoot"
import HomeScreen from "./screens/HomeScreen/index"
import awsConfig from "./src/aws-exports"
import { version } from "./src/version"

let env = "unknown"

if (window.location === undefined) env = "mobile"
else if (window.location.hostname === "localhost") env = "localhost"
else if (window.location.hostname.includes("beta")) env = "beta"
else if (window.location.hostname.includes("dev")) env = "dev"
else env = "prod"
Sentry.init({
  dsn: "https://8c8703a620444c97ba6e8bb4a60c17d0@o390245.ingest.sentry.io/5231908",
  environment: env,
  release: version.git,
})

const SignUpSidebar = lazy(() => import("./components/SignUpSidebar/SignUpSidebar"))

Amplify.configure(awsConfig)

/*const MyDisabledButton = Object.assign({}, AmplifyTheme.button, { backgroundColor: '#979797', alignItems: 'center', padding: 16 });
const MyButton = Object.assign({}, AmplifyTheme.button, { backgroundColor: '#F0493E', alignItems: 'center', padding: 16 });
const mySection = Object.assign({}, AmplifyTheme.section, { marginTop: 0, padding: 0 });
const myNavBar = Object.assign({}, AmplifyTheme.navBar, { width: 0, height: 0 });
const myContainer = Object.assign({}, AmplifyTheme.container, { marginTop: 0, width: "100%", height: "100%" });
//const MyTheme = Object.assign({}, AmplifyTheme, { navBar: myNavBar, s });
const MyTheme = Object.assign({}, AmplifyTheme, { container: myContainer, navBar: myNavBar, section: mySection, button: MyButton, buttonDisabled: MyDisabledButton });*/

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

interface Props {
  navigation: NavigationProp<any, any>
  onStateChange(state: string, data: AuthStateData): any
}
interface State extends JCState {
  isLoggedIn: boolean
  fontLoaded: boolean
  authState: any
  joinedAs: "individual" | "organization"
  username: any
  helpModal: boolean
}
const federated = {
  google_client_id: "",
  facebook_app_id: "579712102531269",
  amazon_client_id: "",
}

EStyleSheet.build({
  // always call EStyleSheet.build() even if you don't use global variables!
  $textColor: "#0275d8",
})

//export default App;
class AwesomeApp extends JCComponent<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      ...super.getInitialState(),
      fontLoaded: false,
      isLoggedIn: false,
      authState: "",
      username: "",
      helpModal: false,
    }
    //  this.ionViewCanEnter();
  }

  async UNSAFE_componentWillMount(): Promise<void> {
    this.setState({ authState: await this.getAuthInitialState() })
    // console.log("test")
    try {
      await Font.loadAsync({
        "Graphik-Bold-App": require("./assets/font/commercial-type-1906-WOIKTV-app/graphik/Graphik-Bold-App.ttf"),
        "Graphik-Medium-App": require("./assets/font/commercial-type-1906-WOIKTV-app/graphik/Graphik-Medium-App.ttf"),
        "Graphik-Regular-App": require("./assets/font/commercial-type-1906-WOIKTV-app/graphik/Graphik-Regular-App.ttf"),
        "Graphik-Semibold-App": require("./assets/font/commercial-type-1906-WOIKTV-app/graphik/Graphik-Semibold-App.ttf"),
        "GraphikXXCondensed-Black-App": require("./assets/font/commercial-type-1906-WOIKTV-app/graphik_xx_condensed/GraphikXXCondensed-Black-App.ttf"),

        // 'Helvetica Neue': require('native-base/Fonts/Roboto_medium.ttf')
        ...Ionicons.font,
      })
    } catch (e) {
      console.error(e)
    }

    this.setState({ fontLoaded: true })
    Asset.fromModule(require("./assets/header/icon.png")).downloadAsync()
    Asset.fromModule(require("./assets/JC-Logo-RGB-KO2.png")).downloadAsync()
    Asset.fromModule(require("./assets/leftPanel.png")).downloadAsync()
    Asset.fromModule(require("./assets/profile-placeholder.png")).downloadAsync()
    Asset.fromModule(require("./assets/SignUp/progress-1.png")).downloadAsync()
    Asset.fromModule(require("./assets/SignUp/progress-2.png")).downloadAsync()
    Asset.fromModule(require("./assets/SignUp/progress-3.png")).downloadAsync()
    Asset.fromModule(require("./assets/SignUp/progress-4.png")).downloadAsync()
  }
  renderFallback(): string {
    return ""
  }

  async updateState(state: string, data: AuthStateData) {
    console.log("updateState")
    this.setState({ authState: state })
    const params = RootNavigation.getRoot()?.params as {
      joinedAs: "individual" | "organization" | null
      brand: "jc" | "oneStory" | null
    }
    if (state == "signUp") RootNavigation.navigate("signup", { joinedAs: null })
    else if (state == "signIn") {
      RootNavigation.navigate("auth", {
        screen: "signin",
        params: {
          email: data?.email,
          fromVerified: data?.fromVerified,
        },
      })
    } else if (state == "forgotPassword") RootNavigation.navigate("forgotpassword", {})
    else if (state == "requireNewPassword") RootNavigation.navigate("requirenewpassword", {})
    else if (state == "verifyContact") RootNavigation.navigate("verifycontact", {})
    else if (state == "confirmSignIn") RootNavigation.navigate("confirmsignin", {})
    else if (state == "confirmSignUp")
      RootNavigation.navigate("confirmsignup", { email: data?.email })
    else if (state == "signedIn") {
      const user = await Auth.currentAuthenticatedUser()
      if (
        user.getSignInUserSession().accessToken.payload["cognito:groups"].includes("admin") ||
        user
          .getSignInUserSession()
          .accessToken.payload["cognito:groups"].includes("subscriptionValid") ||
        user
          .getSignInUserSession()
          .accessToken.payload["cognito:groups"].includes("legacyUserGroup1")
      ) {
        RootNavigation.navigate("auth", {
          screen: "Payment3",
          params: {
            joinedProduct: data?.joinedProduct,
            productType: data?.productType,
          },
        })
      } else {
        RootNavigation.navigate("auth", {
          screen: "Payment1",
          params: {
            joinedProduct: data?.joinedProduct,
            productType: data?.productType,
          },
        })
      }
    }
  }
  async getAuthInitialState() {
    const initialUrl: string = await Linking.getInitialURL()
    console.log({ "INITIAL URL": initialUrl })
    if (initialUrl.toLowerCase().includes("/auth/signup")) return "signUp"
    return "signIn"
  }
  renderHelpModal(): JSX.Element | null {
    return <HelpModal></HelpModal>
  }
  renderHelpFab(): JSX.Element | null {
    return (
      <FloatingButton
        setShow={() => this.setState({ helpModal: !this.state.helpModal })}
        smallIcon={
          this.state.helpModal ? (
            <MaterialCommunityIcons name="close-thick" size={24} color="white" />
          ) : (
            <MaterialCommunityIcons name="help-circle" size={24} color="white" />
          )
        }
        customStyle={FloatingButtonStyles.HelpFloatingButtonStyle}
        customLabelStyle={FloatingButtonStyles.HelpFloatingButtonTextStyle}
        largeIcon={
          this.state.helpModal ? (
            <MaterialCommunityIcons name="close-thick" size={24} color="white" />
          ) : (
            <View
              style={{
                marginLeft: -24,
                height: 41,
                width: 41,
                borderRadius: 50,
                backgroundColor: "#F0493E",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <Image
                style={{
                  flex: 1,
                }}
                source={require("./assets/svg/JC-Logo.svg")}
              ></Image>
            </View>
          )
        }
        label={this.state.helpModal ? "" : "Need Help?"}
      />
    )
  }
  render(): React.ReactNode {
    //    console.log({ AwesomeApp: this.state.authState })
    if (this.state.fontLoaded && this.state.authState != "") {
      return (
        <View
          style={{
            width: "100%",
            top: 0,
            left: 0,
            height: "100%",
          }}
        >
          {Platform.OS !== "web" || Dimensions.get("window").width <= 720 ? (
            this.state.authState != "signedIn" &&
            this.state.authState != "loading" &&
            this.state.authState != "" ? (
              <Suspense fallback={this.renderFallback()}>
                <SignUpSidebar text="It’s time to unite, equip, and amplify a Jesus-centred movement." />
              </Suspense>
            ) : null
          ) : null}

          <Authenticator
            onStateChange={async (item1: string, data: any) => {
              console.log("AUTHENTICATOR STATE CHANGE")
              await this.updateState(item1, data)
            }}
            hideDefault={true}
            authState={this.state.authState}
            federated={federated}
            usernameAttributes="email"
          >
            <HomeScreen
              onStateChange={async (item1, data) => {
                console.log("AUTHENTICATOR STATE CHANGE")
                await this.updateState(item1, data)
              }}
              authState={this.state.authState}
            />
          </Authenticator>
          {this.renderHelpFab()}
          {this.state.helpModal ? this.renderHelpModal() : null}
        </View>
      )
    } else {
      return null
    }
  }
}
export default AwesomeApp
