import { NavigationProp } from "@react-navigation/native"
import { Auth } from "aws-amplify"
import { Authenticator } from "aws-amplify-react-native"
import * as Linking from "expo-linking"
import * as React from "react"
import { View } from "react-native"
import { SafeAreaProvider } from "react-native-safe-area-context"
import UserAgent from "react-native-user-agent"
import { AuthStateData, JCCognitoUser } from "src/types"
import NeedHelpButton from "./components/FloatingButton/NeedHelpButton"
import JCComponent, { JCState } from "./components/JCComponent/JCComponent"
import { SidebarMobile } from "./components/Sidebar/SidebarMobile"
import * as RootNavigation from "./screens/HomeScreen//NavigationRoot"
import HomeScreen from "./screens/HomeScreen/index"

UserAgent.getUserAgent() //synchronous

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
}
const federated = {
  google_client_id: "",
  facebook_app_id: "579712102531269",
  amazon_client_id: "",
}
export class AppMain extends JCComponent<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      ...super.getInitialState(),
      fontLoaded: false,
      isLoggedIn: false,

      authState: "",
      username: "",
    }
    //  this.ionViewCanEnter();
  }

  async UNSAFE_componentWillMount(): Promise<void> {
    this.setState({ authState: await this.getAuthInitialState() })
    // console.log("test")
  }

  async updateState(state: string, data: AuthStateData): Promise<void> {
    console.log("updateState")
    this.setState({ authState: state })
    RootNavigation.getRoot()?.params as {
      joinedAs: "individual" | "organization" | null
      brand: "jc" | "oneStory" | null
    }
    if (state == "signUp") RootNavigation.navigate("signup", { joinedAs: null, brand: data?.brand })
    else if (state == "signIn") {
      RootNavigation.navigate("auth", {
        screen: "signin",
        brand: data?.brand,
        email: data?.email,
        fromVerified: data?.fromVerified,
      })
    } else if (state == "forgotPassword")
      RootNavigation.navigate("forgotpassword", {
        brand: RootNavigation.getRoot()?.params?.brand,
      })
    else if (state == "requireNewPassword")
      RootNavigation.navigate("requirenewpassword", { brand: data?.brand })
    else if (state == "verifyContact")
      RootNavigation.navigate("verifycontact", { brand: data?.brand })
    else if (state == "confirmSignIn")
      RootNavigation.navigate("confirmsignin", { brand: data?.brand })
    else if (state == "confirmSignUp")
      RootNavigation.navigate("confirmsignup", { email: data?.email, brand: data?.brand })
    else if (state == "signedIn") {
      const user = (await Auth.currentAuthenticatedUser()) as JCCognitoUser
      if (
        user.getSignInUserSession()?.getAccessToken().payload["cognito:groups"].includes("admin") ||
        user
          .getSignInUserSession()
          ?.getAccessToken()
          .payload["cognito:groups"].includes("subscriptionValid") ||
        user
          .getSignInUserSession()
          ?.getAccessToken()
          .payload["cognito:groups"].includes("legacyUserGroup1")
      ) {
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
  async getAuthInitialState(): Promise<string> {
    const initialUrl = await Linking.getInitialURL()
    console.log({ "INITIAL URL": initialUrl })
    if (initialUrl?.toLowerCase().includes("/auth/signup")) return "signUp"
    return "signIn"
  }

  render(): React.ReactNode {
    if (this.state.authState != "") {
      return (
        <SafeAreaProvider>
          <View
            style={{
              width: "100%",
              top: 0,
              left: 0,
              height: "100%",
            }}
          >
            <NeedHelpButton></NeedHelpButton>
            <SidebarMobile authState={this.state.authState} />

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
          </View>
        </SafeAreaProvider>
      )
    } else {
      return null
    }
  }
}
