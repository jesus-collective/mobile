import { Entypo } from "@expo/vector-icons"
import { Auth } from "aws-amplify"
import countryDialCodes from "aws-amplify-react-native/src/CountryDialCodes"
import { View } from "native-base"
import React from "react"
import {
  ActivityIndicator,
  Dimensions,
  NativeSyntheticEvent,
  Picker,
  Platform,
  Text,
  TextInput,
  TextInputKeyPressEventData,
  TouchableOpacity,
} from "react-native"
import { Copyright } from "../../components/Auth/Copyright"
import JCButton, { ButtonTypes } from "../../components/Forms/JCButton"
import SignUpSidebar from "../../components/SignUpSidebar/SignUpSidebar"
import MainStyles from "../../components/style"
import { UserActions, UserContext, UserState } from "../../screens/HomeScreen/UserContext"

interface Props {
  username: any
}

interface State {
  first: string
  last: string
  code: string
  phone: string
  email: string
  authError: string
  newPass: string
  newPass2: string
  resetting: boolean
  username: string
  authState: any
}

class MyForgotPassword extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      phone: "",
      code: "+1",
      first: "",
      last: "",
      email: "",
      authError: "",
      newPass: "",
      newPass2: "",
      resetting: false,
      username: props.username,
      authState: null,
    }
  }
  static UserConsumer = UserContext.Consumer

  async changeAuthState(actions: UserActions, state: string): Promise<void> {
    this.setState({
      phone: "",
      first: "",
      last: "",
      email: "",
      authError: "",
      code: "+1",
      newPass: "",
      newPass2: "",
      resetting: false,
    })
    if (actions.onStateChange) await actions.onStateChange(state, null)
  }

  async save(actions: UserActions, userState: UserState): Promise<void> {
    console.log("Saving")
    try {
      if (this.state.newPass !== this.state.newPass2) {
        this.setState({ authError: "Passwords do not match" })
        return
      }
      await Auth.completeNewPassword(userState.user, this.state.newPass, {
        family_name: this.state.last,
        given_name: this.state.first,
        phone_number: this.state.code + this.state.phone,
      })
        .then(async () => {
          await this.changeAuthState(actions, "signedIn")
        })
        .catch((e) => {
          console.log({ Error: e })
        })
    } catch (e: any) {
      this.setState({ authError: e.message, resetting: false })
    }
  }

  handleEnter(
    actions: UserActions,
    userState: UserState,
    keyEvent: NativeSyntheticEvent<TextInputKeyPressEventData>
  ): void {
    if (keyEvent.nativeEvent.key === "Enter") {
      this.save(actions, userState)
    }
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
      <MyForgotPassword.UserConsumer>
        {({ userState, userActions }) => {
          if (!userState) return null
          return (
            <>
              {userState.authState === "requireNewPassword" ? (
                <View style={{ width: "100%", left: 0, top: 0, height: "100%" }}>
                  <View style={this.styles.style.signUpBackButtonWrapper}>
                    <TouchableOpacity
                      accessibilityRole="button"
                      accessibilityLabel="Go back"
                      accessibilityHint="Navigate to previous page"
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
                      Tell us more about yourself
                    </Text>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        marginBottom: "5.5%",
                      }}
                    >
                      <TextInput
                        placeholder="First Name"
                        accessibilityLabel="First Name"
                        value={this.state.first}
                        onChange={(e) => this.setState({ first: e.nativeEvent.text })}
                        secureTextEntry={false}
                        style={{
                          borderBottomWidth: 1,
                          borderColor: "#00000020",
                          width: "100%",
                          marginBottom: "1.4%",
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
                        placeholder="Last Name"
                        accessibilityLabel="Last Name"
                        value={this.state.last}
                        onChange={(e) => this.setState({ last: e.nativeEvent.text })}
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
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        marginBottom: "8.33%",
                      }}
                    >
                      <Picker
                        accessibilityLabel="Country code"
                        selectedValue={this.state.code}
                        onValueChange={(val) => this.setState({ code: val })}
                        style={{ marginRight: 5, borderColor: "#00000070" }}
                      >
                        {countryDialCodes.map((dialCode) => (
                          <Picker.Item key={dialCode} value={dialCode} label={dialCode} />
                        ))}
                      </Picker>
                      <Text
                        style={{
                          fontSize: 22,
                          color: "#F0493E",
                          fontFamily: "Graphik-Regular-App",
                        }}
                      >
                        *
                      </Text>
                      <TextInput
                        autoCompleteType="tel"
                        accessibilityLabel="Telephone number"
                        textContentType="telephoneNumber"
                        onKeyPress={(e) => {
                          this.handleEnter(userActions, userState, e)
                        }}
                        keyboardType="phone-pad"
                        placeholder="Phone number"
                        value={this.state.phone}
                        onChange={(e) => this.setState({ phone: e.nativeEvent.text })}
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
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        marginBottom: "5.5%",
                      }}
                    >
                      <TextInput
                        textContentType="newPassword"
                        onKeyPress={(e) => {
                          this.handleEnter(userActions, userState, e)
                        }}
                        accessibilityLabel="New password"
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
                        accessibilityLabel="Confirm new password"
                        textContentType="newPassword"
                        onKeyPress={(e) => {
                          this.handleEnter(userActions, userState, e)
                        }}
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
                      accessibilityLabel="Submit changes"
                      buttonType={ButtonTypes.SolidSignIn}
                      onPress={() => {
                        this.save(userActions, userState)
                      }}
                    >
                      {this.state.resetting ? (
                        <ActivityIndicator accessibilityLabel="Loading" animating color="#333333" />
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
