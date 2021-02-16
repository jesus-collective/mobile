import { Entypo } from "@expo/vector-icons"
import { useNavigation, useRoute } from "@react-navigation/native"
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
import { AuthStateData } from "src/types"
import { Copyright } from "../../components/Auth/Copyright"
import JCButton, { ButtonTypes } from "../../components/Forms/JCButton"
import Sentry from "../../components/Sentry"
import SignUpSidebar from "../../components/SignUpSidebar/SignUpSidebar"
import MainStyles from "../../components/style"
import * as RootNavigation from "../../screens/HomeScreen/NavigationRoot"
import { UserActions, UserContext } from "../../screens/HomeScreen/UserContext"

interface Props {
  navigation?: any
  route?: any
}

interface State {
  user: {
    first: string
    last: string
    pass: string
    pass2: string
    email: string
    phone: string
    code: string
    orgName: string
  }
  authError: string
  enabled: boolean
  joinedAs: "individual" | "organization" | null
  joinedProduct: string
  productType: "Partner" | "OneStory" | null
  sendingData: boolean
}

class MySignUpImpl extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      user: {
        first: "",
        last: "",
        pass: "",
        pass2: "",
        email: "",
        phone: "",
        code: "+1", // default to Canada
        orgName: "",
      },
      authError: "",
      enabled: false,
      joinedAs: props.route?.params.joinedAs,
      joinedProduct: props.route?.params.joinedProduct,
      productType: props.route?.params.productType,
      sendingData: false,
    }
    console.log({ PARAMS: props.route })
  }
  static UserConsumer = UserContext.Consumer

  async changeAuthState(actions: UserActions, state: string, data: AuthStateData): Promise<void> {
    this.setState({
      user: {
        first: "",
        last: "",
        pass: "",
        pass2: "",
        email: "",
        phone: "",
        code: "+1",
        orgName: "",
      },
      authError: "",
      enabled: false,
      joinedAs: null,
      joinedProduct: this.props.route?.params.joinedProduct,
      productType: this.props.route?.params.productType,
      sendingData: false,
    })
    if (actions.onStateChange) await actions.onStateChange(state, data)
  }

  validate(): boolean {
    let val = true
    if (!this.state.user.first) {
      val = false
    }

    if (!this.state.user.last) {
      val = false
    }

    if (!this.state.user.pass || !this.state.user.pass) {
      val = false
    }

    if (!this.state.user.email || !this.state.user.email.includes("@")) {
      val = false
    }

    if (!this.state.user.phone) {
      val = false
    }

    if (!this.state.user.orgName && this.state.joinedAs === "organization") {
      val = false
    }

    return val
  }

  componentDidUpdate(_prevProps: Props, prevState: State): void {
    if (prevState.user !== this.state.user) {
      this.setState({ enabled: this.validate() })
    }
  }

  async signUp(actions: any): Promise<void> {
    try {
      if (this.state.user.pass !== this.state.user.pass2) {
        this.setState({ authError: "Passwords do not match" })
        return
      }
      if (!this.validate()) return
      Sentry.setUser({ email: this.state.user.email.toLowerCase() })

      this.setState({ sendingData: true })
      await Auth.signUp({
        username: this.state.user.email.toLowerCase(),
        password: this.state.user.pass,
        attributes: {
          family_name: this.state.user.last,
          given_name: this.state.user.first,
          phone_number: this.state.user.code + this.state.user.phone,
          email: this.state.user.email.toLowerCase(),
          "custom:orgName": this.state.user.orgName,
          "custom:isOrg": Boolean(this.state.joinedAs === "organization").toString(),
        },
      }).then(
        async () =>
          await this.changeAuthState(actions, "confirmSignUp", {
            joinedProduct: this.state.joinedProduct,
            productType: this.state.productType,
            email: this.state.user.email.toLowerCase(),
          })
      )
    } catch (e) {
      this.setState({ authError: e.message, sendingData: false })
      Sentry.configureScope((scope) => scope.setUser(null))
    }
  }

  handleEnter(actions: any, keyEvent: NativeSyntheticEvent<TextInputKeyPressEventData>): void {
    if (keyEvent.nativeEvent.key === "Enter") this.signUp(actions)
  }

  handleChange(field: keyof State["user"], input: string): void {
    this.setState((prevState) => ({
      user: {
        ...prevState.user,
        [field]: input,
      },
    }))
  }

  styles = MainStyles.getInstance()
  UNSAFE_componentWillMount(): void {
    const params = RootNavigation.getRoot()?.params as {
      joinedAs: "individual" | "organization" | null
    }
    this.setState({ joinedAs: params?.joinedAs ? params.joinedAs : null })
  }
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
      <MySignUpImpl.UserConsumer>
        {({ userState, userActions }) => {
          if (!userState) return null
          return (
            <>
              {userState.authState === "signUp" ? (
                <View style={{ width: "100%", left: 0, top: 0, height: "100%" }}>
                  <View style={this.styles.style.signUpBackButtonWrapper}>
                    <TouchableOpacity
                      onPress={async () => {
                        await this.changeAuthState(userActions, "signIn", {
                          joinedProduct: this.state.joinedProduct,
                          productType: this.state.productType,
                        })
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
                  {this.state.joinedAs ? (
                    this.state.joinedAs === "individual" ? (
                      <View style={this.styles.style.authView3}>
                        <Text style={this.styles.style.mySignUpText}>Create your account</Text>
                        <View style={this.styles.style.mySignUpInputFieldscontainer}>
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
                            textContentType="name"
                            placeholder="First Name"
                            value={this.state.user.first}
                            onChange={(e) => this.handleChange("first", e.nativeEvent.text)}
                            style={this.styles.style.mySignUpPlaceholderText}
                          ></TextInput>
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
                            textContentType="familyName"
                            placeholder="Last Name"
                            value={this.state.user.last}
                            onChange={(e) => this.handleChange("last", e.nativeEvent.text)}
                            style={this.styles.style.mySignUpPlaceholderText}
                          ></TextInput>
                        </View>
                        <View style={this.styles.style.mySignUpEmailContainer}>
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
                            autoCompleteType="email"
                            textContentType="emailAddress"
                            keyboardType="email-address"
                            placeholder="Email address"
                            value={this.state.user.email}
                            onChange={(e) => this.handleChange("email", e.nativeEvent.text)}
                            style={this.styles.style.mySignUpPlaceholderText}
                          ></TextInput>
                        </View>
                        <View style={this.styles.style.mySignUpPasswordContainer}>
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
                            textContentType="newPassword"
                            placeholder="Create Password"
                            value={this.state.user.pass}
                            onChange={(e) => this.handleChange("pass", e.nativeEvent.text)}
                            secureTextEntry={true}
                            style={this.styles.style.mySignUpLeftPasswordContainer}
                          ></TextInput>
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
                            textContentType="newPassword"
                            placeholder="Confirm Password"
                            value={this.state.user.pass2}
                            onChange={(e) => this.handleChange("pass2", e.nativeEvent.text)}
                            secureTextEntry={true}
                            style={this.styles.style.mySignUpPlaceholderText}
                          ></TextInput>
                        </View>
                        <View style={this.styles.style.mySignUpPhoneContainer}>
                          <Picker
                            selectedValue={this.state.user.code}
                            onValueChange={(val) => this.handleChange("code", val)}
                            style={{
                              marginRight: 5,
                              borderColor: "#00000070",
                            }}
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
                            textContentType="telephoneNumber"
                            onKeyPress={(e) => this.handleEnter(userActions, e)}
                            keyboardType="phone-pad"
                            placeholder="Phone number"
                            value={this.state.user.phone}
                            onChange={(e) => {
                              if (
                                e.nativeEvent.text.length < 11 &&
                                !e.nativeEvent.text.match(/\D/g)
                              ) {
                                this.handleChange("phone", e.nativeEvent.text)
                              }
                            }}
                            style={this.styles.style.mySignUpPlaceholderText}
                          ></TextInput>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                          <View style={{ flex: 1 }}>
                            <JCButton
                              enabled={this.state.enabled}
                              buttonType={
                                this.state.enabled
                                  ? ButtonTypes.SolidSignIn
                                  : ButtonTypes.DisabledSignIn
                              }
                              onPress={() => this.signUp(userActions)}
                            >
                              {this.state.sendingData ? (
                                <ActivityIndicator animating color="#333333" />
                              ) : (
                                "Continue"
                              )}
                            </JCButton>
                          </View>
                          <TouchableOpacity
                            style={this.styles.style.mySignUpConfirmCode}
                            onPress={async () =>
                              await this.changeAuthState(userActions, "confirmSignUp", {
                                joinedProduct: this.state.joinedProduct,
                                productType: this.state.productType,
                              })
                            }
                          >
                            <Text
                              style={{
                                fontSize: 14,
                                fontFamily: "Graphik-Regular-App",
                                color: "#333333",
                                opacity: 0.7,
                              }}
                            >
                              Confirm a code
                            </Text>
                          </TouchableOpacity>
                        </View>

                        <Text
                          style={{
                            flex: 1,
                            alignSelf: "center",
                            alignItems: "center",
                            fontSize: 14,
                            fontFamily: "Graphik-Regular-App",
                            lineHeight: 22,
                            marginTop: 4,
                          }}
                        >
                          {this.state.authError ? (
                            <Entypo name="warning" size={18} color="#F0493E" />
                          ) : null}{" "}
                          {" " + this.state.authError}
                        </Text>

                        <Copyright />
                      </View>
                    ) : (
                      <View style={this.styles.style.authView3}>
                        <Text style={this.styles.style.mySignUpText}>
                          Set up the account for the administrator of your organization first
                        </Text>
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            marginBottom: "5.5%",
                          }}
                        >
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
                            textContentType="name"
                            placeholder="First Name"
                            value={this.state.user.first}
                            onChange={(e) => this.handleChange("first", e.nativeEvent.text)}
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
                            textContentType="familyName"
                            placeholder="Last Name"
                            value={this.state.user.last}
                            onChange={(e) => this.handleChange("last", e.nativeEvent.text)}
                            style={{
                              borderBottomWidth: 1,
                              borderColor: "#00000020",
                              marginBottom: "1.4%",
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
                            marginBottom: "1.4%",
                          }}
                        >
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
                            autoCompleteType="email"
                            textContentType="emailAddress"
                            keyboardType="email-address"
                            placeholder="Email Address"
                            value={this.state.user.email}
                            onChange={(e) => this.handleChange("email", e.nativeEvent.text)}
                            style={{
                              borderBottomWidth: 1,
                              marginRight: 30,
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
                            placeholder="Organization Name"
                            value={this.state.user.orgName}
                            onChange={(e) => this.handleChange("orgName", e.nativeEvent.text)}
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
                            textContentType="newPassword"
                            placeholder="Create Password"
                            value={this.state.user.pass}
                            onChange={(e) => this.handleChange("pass", e.nativeEvent.text)}
                            secureTextEntry={true}
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
                            textContentType="newPassword"
                            placeholder="Confirm Password"
                            value={this.state.user.pass2}
                            onChange={(e) => this.handleChange("pass2", e.nativeEvent.text)}
                            secureTextEntry={true}
                            style={{
                              borderBottomWidth: 1,
                              borderColor: "#00000020",
                              marginBottom: "1.4%",
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
                            marginBottom: "8.33%",
                          }}
                        >
                          <Picker
                            selectedValue={this.state.user.code}
                            onValueChange={(val) => this.handleChange("code", val)}
                            style={{
                              marginRight: 5,
                              borderColor: "#00000070",
                            }}
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
                            textContentType="telephoneNumber"
                            onKeyPress={(e) => this.handleEnter(userActions, e)}
                            keyboardType="phone-pad"
                            placeholder="Phone number"
                            value={this.state.user.phone}
                            onChange={(e) => this.handleChange("phone", e.nativeEvent.text)}
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
                          enabled={this.state.enabled}
                          buttonType={
                            this.state.enabled
                              ? ButtonTypes.SolidSignIn
                              : ButtonTypes.DisabledSignIn
                          }
                          onPress={() => this.signUp(userActions)}
                        >
                          {this.state.sendingData ? (
                            <ActivityIndicator animating color="#333333" />
                          ) : (
                            "Continue"
                          )}
                        </JCButton>
                        <TouchableOpacity
                          onPress={async () =>
                            await this.changeAuthState(userActions, "confirmSignUp", {
                              joinedProduct: this.state.joinedProduct,
                              productType: this.state.productType,
                            })
                          }
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
                            Confirm a code
                          </Text>
                        </TouchableOpacity>
                        <Text
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
                    )
                  ) : (
                    <View style={this.styles.style.authView3}>
                      <Text style={this.styles.style.mySignUpText}>
                        Welcome. What type of account would you like to create?
                      </Text>
                      <View style={this.styles.style.mySignUpButton}>
                        <JCButton
                          buttonType={ButtonTypes.SolidSignIn2}
                          onPress={() => this.setState({ joinedAs: "individual" })}
                        >
                          Individual
                        </JCButton>
                        <Text style={this.styles.style.mySignUpOr}>{/* or */}</Text>
                        <JCButton
                          buttonType={ButtonTypes.SolidSignIn2}
                          onPress={() => this.setState({ joinedAs: "organization" })}
                        >
                          Organization
                        </JCButton>
                      </View>
                      <Copyright marginTop={90} />
                    </View>
                  )}
                  {Platform.OS === "web" && Dimensions.get("window").width > 720 ? (
                    <SignUpSidebar position="1" />
                  ) : null}
                </View>
              ) : null}
            </>
          )
        }}
      </MySignUpImpl.UserConsumer>
    )
  }
}
//export default MySignUp

export default function MySignUp(props: Props): JSX.Element {
  const route = useRoute()
  const navigation = useNavigation()
  return <MySignUpImpl {...props} navigation={navigation} route={route} />
}
