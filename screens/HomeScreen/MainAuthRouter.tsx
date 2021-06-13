import { NavigationProp, useNavigation, useRoute } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import React, { lazy } from "react"
import SignUpScreen3 from "../../components/Auth/SignUpScreen3"
import JCComponent, { JCState } from "../../components/JCComponent/JCComponent"
import { UserContext } from "./UserContext"

const SignUpScreen1 = lazy(() => import("../../components/Auth/SignUpScreen1"))
const SignUpScreen2 = lazy(() => import("../../components/Auth/SignUpScreen2"))

const MySignIn = lazy(() => import("../Auth/MySignIn"))
const MySignUp = lazy(() => import("../Auth/MySignUp"))
const MyConfirmSignUp = lazy(() => import("../Auth/MyConfirmSignUp"))
const MyForgotPassword = lazy(() => import("../Auth/MyForgotPassword"))
const MyRequireNewPassword = lazy(() => import("../Auth/MyRequireNewPassword"))
const MyLoading = lazy(() => import("../Auth/MyLoading"))
const MyConfirmSignIn = lazy(() => import("../Auth/MyConfirmSignIn"))
const MyVerifyContact = lazy(() => import("../Auth/MyVerifyContact"))

type MARState = JCState
interface MARProp {
  navigation?: NavigationProp<any, any>
  route?: any
}
const AuthStack = createStackNavigator()

class MainAuthRouterImpl extends JCComponent<MARProp, MARState> {
  constructor(props: MARProp) {
    super(props)
    this.state = {
      ...super.getInitialState(),
    }
  }
  static UserConsumer = UserContext.Consumer

  render() {
    console.log("MainAuthRouter")
    return (
      <MainAuthRouterImpl.UserConsumer>
        {({ userState }) => {
          if (!userState) return null
          return (
            <AuthStack.Navigator
              headerMode="none"
              mode="card"
              screenOptions={{
                animationEnabled: false,
                gestureEnabled: false,
                cardOverlayEnabled: false,
              }}
            >
              <AuthStack.Screen
                name="signin"
                component={MySignIn}
                options={{ title: "Jesus Collective" }}
              />
              <AuthStack.Screen
                name="signup"
                component={MySignUp}
                options={{ title: "Jesus Collective" }}
              />

              <AuthStack.Screen
                name="confirmsignup"
                component={MyConfirmSignUp}
                options={{ title: "Jesus Collective" }}
              />

              <AuthStack.Screen
                name="forgotpassword"
                component={MyForgotPassword}
                options={{ title: "Jesus Collective" }}
              />

              <AuthStack.Screen
                name="requirenewpassword"
                component={MyRequireNewPassword}
                options={{ title: "Jesus Collective" }}
              />
              <AuthStack.Screen
                name="loading"
                component={MyLoading}
                options={{ title: "Jesus Collective" }}
              />
              <AuthStack.Screen
                name="confirmsignin"
                component={MyConfirmSignIn}
                options={{ title: "Jesus Collective" }}
              />
              <AuthStack.Screen
                name="verifycontact"
                component={MyVerifyContact}
                options={{ title: "Jesus Collective" }}
              />
              <AuthStack.Screen
                name="Payment1"
                component={SignUpScreen1}
                options={{ title: "Jesus Collective" }}
              />
              <AuthStack.Screen
                name="Payment2"
                component={SignUpScreen2}
                options={{ title: "Jesus Collective" }}
              />
              <AuthStack.Screen
                name="Payment3"
                component={SignUpScreen3}
                options={{ title: "Jesus Collective" }}
              />
            </AuthStack.Navigator>
          )
        }}
      </MainAuthRouterImpl.UserConsumer>
    )
  }
}
export default function MainAuthRouter(props: MARProp): JSX.Element {
  const route = useRoute()
  const navigation = useNavigation()
  return <MainAuthRouterImpl {...props} navigation={navigation} route={route} />
}
