import { Entypo } from "@expo/vector-icons"
import { NavigationProp, useNavigation, useRoute } from "@react-navigation/native"
import { Auth } from "aws-amplify"
import { View } from "native-base"
import React from "react"
import {
  ActivityIndicator,
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
  email: string
  code: string
  authError: string
  sendingData: boolean
}
class MyConfirmSignUpImpl extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    console.log({ MYConfirmSignupImpl: props.route })
    this.state = {
      email: props.route?.params.email ?? "",
      code: "",
      authError: "",
      sendingData: false,
    }
  }
  static UserConsumer = UserContext.Consumer

  async changeAuthState(actions: UserActions, state: string, data: AuthStateData): Promise<void> {
    this.setState({
      email: "",
      code: "",
      authError: "",
      sendingData: false,
    })
    if (actions.onStateChange) await actions.onStateChange(state, data)
  }

  async handleConfirmSignUp(actions: UserActions): Promise<void> {
    try {
      this.setState({ sendingData: true })
      Sentry.setUser({ email: this.state.email.toLowerCase() })
      await Auth.confirmSignUp(this.state.email.toLowerCase(), this.state.code).then(async () => {
        await this.changeAuthState(actions, "signIn", {
          email: this.state.email.toLowerCase(),
          fromVerified: true,
          brand: null,
        })
      })
    } catch (e: any) {
      this.setState({ authError: e.message, sendingData: false })
      Sentry.configureScope((scope) => {
        scope.setUser(null)
      })
    }
  }

  handleEnter(actions: any, keyEvent: NativeSyntheticEvent<TextInputKeyPressEventData>): void {
    if (keyEvent.nativeEvent.key === "Enter") this.handleConfirmSignUp(actions)
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
      <MyConfirmSignUpImpl.UserConsumer>
        {({ userState, userActions }) => {
          if (!userState) return null
          return (
            <>
              {userState.authState === "confirmSignUp" ? (
                <View style={{ width: "100%", left: 0, top: 0, height: "100%" }}>
                  <View style={this.styles.style.signUpBackButtonWrapper}>
                    <TouchableOpacity
                      accessibilityLabel="Go back"
                      accessibilityHint="Navigate to previous page"
                      accessibilityRole="button"
                      testID="myConfirmSignup-back"
                      onPress={async () => {
                        await this.changeAuthState(userActions, "signIn", null)
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
                      Enter your security code
                    </Text>
                    <TextInput
                      autoCompleteType="email"
                      accessibilityLabel="Email"
                      textContentType="emailAddress"
                      keyboardType="email-address"
                      placeholder="Email Address"
                      value={this.state.email}
                      onChange={(e) => this.setState({ email: e.nativeEvent.text })}
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
                    <View style={this.styles.style.confirmationCodeWrapper}>
                      <TextInput
                        textContentType="oneTimeCode"
                        accessibilityLabel="One time security code"
                        keyboardType="number-pad"
                        onKeyPress={(e) => this.handleEnter(userActions, e)}
                        placeholder="One-time security code"
                        value={this.state.code}
                        onChange={(e) => this.setState({ code: e.nativeEvent.text })}
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
                        buttonType={ButtonTypes.SolidSignIn2}
                        onPress={() => this.handleConfirmSignUp(userActions)}
                      >
                        {this.state.sendingData ? (
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
                      {this.state.authError ? (
                        <Entypo
                          style={{ marginRight: 4 }}
                          name="warning"
                          size={18}
                          color="#F0493E"
                        />
                      ) : null}
                      {this.state.authError}
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
      </MyConfirmSignUpImpl.UserConsumer>
    )
  }
}

export default function MyConfirmSignUp(props: Props): JSX.Element {
  const route = useRoute()
  const navigation = useNavigation()
  return <MyConfirmSignUpImpl {...props} navigation={navigation} route={route} />
}
