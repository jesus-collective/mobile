import { Entypo } from "@expo/vector-icons"
import { NavigationProp, useNavigation, useRoute } from "@react-navigation/native"
import { Auth } from "aws-amplify"
import { View } from "native-base"
import React from "react"
import {
  Dimensions,
  NativeSyntheticEvent,
  Platform,
  Text,
  TextInput,
  TextInputKeyPressEventData,
  TouchableOpacity,
} from "react-native"
import { AuthStateData } from "src/types"
import { Copyright } from "../../components/Auth/Copyright"
import JCButton, { ButtonTypes } from "../../components/Forms/JCButton"
import Sentry from "../../components/Sentry"
import SignUpSidebar from "../../components/SignUpSidebar/SignUpSidebar"
import MainStyles from "../../components/style"
import { UserActions, UserContext } from "../../screens/HomeScreen/UserContext"

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

class MySignInImpl extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    console.log(props.route)
    this.state = {
      pass: "",
      user: props.route?.params?.email ?? "",
      authError: "",
      fromVerified: props.route?.params?.fromVerified ?? false,
      brand: props.route?.params?.brand ?? "jc",
      joinedProduct: props.route?.params.joinedProduct,
    }
  }
  static UserConsumer = UserContext.Consumer
  UNSAFE_componentWillMount(): void {
    console.log(this.props.route)
    this.setState({
      user: this.props.route?.params?.email ?? "",
      fromVerified: this.props.route?.params?.fromVerified ?? false,
    })
  }
  componentDidUpdate(prevProps: Props, prevState: State): void {
    //        console.log({ CompUpdate: this.props.route })
    if (this.props.route?.params?.email !== prevProps.route?.params?.email) {
      //            console.log("UPDATE1")
      this.setState({ user: this.props.route?.params?.email })
    }
    if (this.props.route?.params?.fromVerified !== prevProps.route?.params?.fromVerified) {
      //            console.log("UPDATE2")
      this.setState({ fromVerified: this.props.route?.params?.fromVerified })
    }
  }

  async changeAuthState(
    action: UserActions,
    state: string,
    user?: any,
    data?: AuthStateData
  ): Promise<void> {
    this.setState({
      pass: "",
      user: "",
      authError: "",
      joinedProduct: this.props.route?.params.joinedProduct,
      brand: this.state.brand,
    })
    if (action.onStateChange) await action.onStateChange(state, data ?? null)
    if (user) action.onSetUser(user)
  }

  validateLogin(): boolean {
    if (!/^\S*$/.test(this.state.user)) {
      this.setState({ authError: "Email cannot contain spaces" })
      return false
    }
    if (!this.state.user) {
      this.setState({ authError: "Email cannot be empty" })
      return false
    }
    if (!this.state.pass) {
      this.setState({ authError: "Password cannot be empty" })
      return false
    }
    return true
  }
  async handleSignIn(actions: any): Promise<void> {
    if (this.validateLogin()) {
      try {
        Sentry.setUser({ email: this.state.user?.toLowerCase() })
        Sentry.setTag("User Email", this.state.user?.toLowerCase())
        await Auth.signIn(this.state.user.toLowerCase(), this.state.pass).then(async (user) => {
          if (user.challengeName == "NEW_PASSWORD_REQUIRED") {
            await this.changeAuthState(actions, "requireNewPassword", user)
          } else {
            await this.changeAuthState(actions, "signedIn")
          }
        })
      } catch (err) {
        this.setState({ authError: err.message })
        Sentry.configureScope((scope) => {
          scope.setUser(null)
        })
      }
    }
  }

  handleEnter(actions: any, keyEvent: NativeSyntheticEvent<TextInputKeyPressEventData>): void {
    if (keyEvent.nativeEvent.key === "Enter") this.handleSignIn(actions)
  }

  styles = MainStyles.getInstance()
  componentDidMount(): void {
    Dimensions.addEventListener("change", () => {
      this.styles.updateStyles(this)
    })
  }
  componentWillUnmount(): void {
    Dimensions.removeEventListener("change", () => {
      this.styles.updateStyles(this)
    })
  }
  render(): React.ReactNode {
    return (
      <MySignInImpl.UserConsumer>
        {({ userState, userActions }) => {
          if (!userState) return null
          return (
            <>
              {userState.authState === "signIn" ||
              userState.authState === "signedOut" ||
              userState.authState === "signedUp" ? (
                <View style={{ width: "100%", left: 0, top: 0, height: "100%" }}>
                  <View style={this.styles.style.createAccountButtonWrapper}>
                    <JCButton
                      accessibilityLabel="Create account"
                      accessibilityHint="Navigate to account creation page"
                      buttonType={ButtonTypes.SolidCreateAccount}
                      onPress={async () => {
                        await this.changeAuthState(userActions, "signUp", null, {
                          joinedProduct: this.state.joinedProduct,
                          brand: this.state.brand,
                        })
                      }}
                    >
                      Create an Account
                    </JCButton>
                  </View>
                  <View style={this.styles.style.authView2}>
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
                      {this.state.brand == "oneStory"
                        ? "Welcome to One Story"
                        : "Sign in to Jesus Collective"}
                    </Text>
                    {this.state.brand == "oneStory" && (
                      <Text
                        style={{
                          width: "100%",
                          marginBottom: "5.5%",
                          fontFamily: "Graphik-Regular-App",

                          fontSize: 14,
                          lineHeight: 20,
                        }}
                      >
                        We are looking forward to partnering with you as you introduce kids and
                        youth in your community to Jesus. To access our content you will need to
                        create a Jesus Collective account. One Story’s partnership with Jesus
                        Collective allows us to not only make all of our resources available online
                        in a convenient easy to assess way, but also provides you the benefit of
                        connecting with other One Story users to give feedback, share ideas and ask
                        questions.
                      </Text>
                    )}
                    <TextInput
                      autoCompleteType="email"
                      textContentType="emailAddress"
                      autoFocus
                      keyboardType="email-address"
                      placeholder="Email"
                      value={this.state.user}
                      onChange={(e) => this.setState({ user: e.nativeEvent.text })}
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
                      autoCompleteType="password"
                      textContentType="password"
                      onKeyPress={(e) => {
                        this.handleEnter(userActions, e)
                      }}
                      placeholder="Password"
                      value={this.state.pass}
                      onChange={(e) => this.setState({ pass: e.nativeEvent.text })}
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
                      buttonType={ButtonTypes.SolidSignIn}
                      onPress={async () => {
                        await this.handleSignIn(userActions)
                      }}
                    >
                      Sign In
                    </JCButton>
                    <TouchableOpacity
                      accessibilityLabel="Forgot password"
                      accessibilityHint="Navigate to forgot password page"
                      accessibilityRole="button"
                      onPress={async () => {
                        await this.changeAuthState(userActions, "forgotPassword")
                      }}
                    >
                      <Text style={this.styles.style.mySignInForgotPassword}>Forgot password?</Text>
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
                      {this.state.authError ? (
                        <Entypo name="warning" size={18} color="#F0493E" />
                      ) : null}{" "}
                      {this.state.authError}
                    </Text>
                    <Text
                      accessible={this.state.fromVerified}
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
                      {this.state.fromVerified ? "User Verified. Please Login." : null}
                    </Text>
                    <Copyright />
                  </View>
                  {Platform.OS === "web" && Dimensions.get("window").width > 720 ? (
                    <SignUpSidebar text="It’s time to unite, equip, and amplify a Jesus-centred movement." />
                  ) : null}
                </View>
              ) : null}
            </>
          )
        }}
      </MySignInImpl.UserConsumer>
    )
  }
}

export default function MySignIn(props: Props): JSX.Element {
  const route = useRoute()
  const navigation = useNavigation()
  return <MySignInImpl {...props} navigation={navigation} route={route} />
}
