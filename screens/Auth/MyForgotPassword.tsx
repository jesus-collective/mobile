import { Entypo } from "@expo/vector-icons"
import { NavigationProp } from "@react-navigation/native"
import { Auth } from "aws-amplify"
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
  View,
} from "react-native"
import { Copyright } from "../../components/Auth/Copyright"
import JCButton, { ButtonTypes } from "../../components/Forms/JCButton"
import Sentry from "../../components/Sentry"
import SignUpSidebar from "../../components/SignUpSidebar/SignUpSidebar"
import MainStyles from "../../components/style"
import { UserActions, UserContext } from "../../screens/HomeScreen/UserContext"
import { Brand } from "../../src/Brand"

interface State {
  brand: "jc" | "oneStory" | null
  email: string
  authError: string
  codeSent: boolean
  code: string
  newPass: string
  newPass2: string
  sendingCode: boolean
  resetting: boolean
}
interface Props {
  navigation?: NavigationProp<any, any>
  route?: any
}
class MyForgotPassword extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      brand: Brand(),
      email: "",
      authError: "",
      codeSent: false,
      code: "",
      newPass: "",
      newPass2: "",
      sendingCode: false,
      resetting: false,
    }
  }
  static UserConsumer = UserContext.Consumer

  async changeAuthState(actions: UserActions, state: string): Promise<void> {
    this.setState({
      email: "",
      authError: "",
      codeSent: false,
      code: "",
      newPass: "",
      newPass2: "",
      sendingCode: false,
      resetting: false,
    })
    if (actions.onStateChange) await actions.onStateChange(state, null)
  }

  async sendCode(): Promise<void> {
    try {
      this.setState({ sendingCode: true })
      Sentry.setUser({ email: this.state.email.toLowerCase() })
      await Auth.forgotPassword(this.state.email.toLowerCase()).then(() =>
        this.setState({ codeSent: true })
      )
    } catch (e: any) {
      this.setState({ authError: e.message, sendingCode: false })
      Sentry.configureScope((scope) => {
        scope.setUser(null)
      })
    }
  }

  async resetPass(actions: UserActions): Promise<void> {
    try {
      if (this.state.newPass !== this.state.newPass2) {
        this.setState({ authError: "Passwords do not match" })
        return
      }
      this.setState({ resetting: true })
      Sentry.setUser({ email: this.state.email.toLowerCase() })

      await Auth.forgotPasswordSubmit(
        this.state.email.toLowerCase(),
        this.state.code,
        this.state.newPass
      ).then(async () => {
        await this.changeAuthState(actions, "signIn")
      })
    } catch (e: any) {
      this.setState({ authError: e.message, resetting: false })
      Sentry.configureScope((scope) => {
        scope.setUser(null)
      })
    }
  }

  handleEnter(
    actions: UserActions,
    keyEvent: NativeSyntheticEvent<TextInputKeyPressEventData>
  ): void {
    if (keyEvent.nativeEvent.key === "Enter") {
      if (this.state.codeSent) {
        this.resetPass(actions)
      } else {
        this.sendCode()
      }
    }
  }

  styles: MainStyles = MainStyles.getInstance()
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
      <MyForgotPassword.UserConsumer>
        {({ userState, userActions }) => {
          if (!userState) return null
          return (
            <>
              {userState.authState === "forgotPassword" ? (
                <View style={{ width: "100%", left: 0, top: 0, height: "100%" }}>
                  <View style={this.styles.style.signUpBackButtonWrapper}>
                    <TouchableOpacity
                      accessibilityLabel="Go back"
                      accessibilityHint="Navigate to previous page"
                      accessibilityRole="button"
                      onPress={async () => {
                        await this.changeAuthState(userActions, "signIn")
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
                  {!this.state.codeSent ? (
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
                        Reset your password
                      </Text>
                      <TextInput
                        autoCompleteType="email"
                        textContentType="emailAddress"
                        keyboardType="email-address"
                        onKeyPress={(e) => this.handleEnter(userActions, e)}
                        placeholder="Enter your email"
                        value={this.state.email}
                        onChange={(e) => this.setState({ email: e.nativeEvent.text })}
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
                          this.state.brand == "oneStory"
                            ? ButtonTypes.SolidSignInOneStory
                            : ButtonTypes.SolidSignIn
                        }
                        accessibilityLabel="Send security code"
                        onPress={() => this.sendCode()}
                      >
                        {this.state.sendingCode ? (
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
                        onPress={() => this.setState({ codeSent: true, authError: "" })}
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
                        {this.state.authError ? (
                          <Entypo name="warning" size={18} color="#F0493E" />
                        ) : null}{" "}
                        {this.state.authError}
                      </Text>
                      <Copyright />
                    </View>
                  ) : (
                    <View style={this.styles.style.authView2}>
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
                        autoCompleteType="email"
                        textContentType="emailAddress"
                        keyboardType="email-address"
                        placeholder="Enter your email"
                        value={this.state.email}
                        onChange={(e) => this.setState({ email: e.nativeEvent.text })}
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
                        value={this.state.code}
                        onChange={(e) => this.setState({ code: e.nativeEvent.text })}
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
                          onKeyPress={(e) => this.handleEnter(userActions, e)}
                          placeholder="New password"
                          value={this.state.newPass}
                          onChange={(e) => this.setState({ newPass: e.nativeEvent.text })}
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
                          onKeyPress={(e) => this.handleEnter(userActions, e)}
                          placeholder="Confirm new password"
                          value={this.state.newPass2}
                          onChange={(e) => this.setState({ newPass2: e.nativeEvent.text })}
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
                          this.state.brand == "oneStory"
                            ? ButtonTypes.SolidSignInOneStory
                            : ButtonTypes.SolidSignIn
                        }
                        onPress={() => this.resetPass(userActions)}
                      >
                        {this.state.resetting ? (
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
                        {this.state.authError ? (
                          <Entypo name="warning" size={18} color="#F0493E" />
                        ) : null}{" "}
                        {this.state.authError}
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
        }}
      </MyForgotPassword.UserConsumer>
    )
  }
}
export default MyForgotPassword
