import { Entypo } from "@expo/vector-icons"
import { Picker } from "@react-native-picker/picker"
import { NavigationProp, useNavigation, useRoute } from "@react-navigation/native"
import { Auth } from "aws-amplify"
import countryDialCodes from "aws-amplify-react-native/src/CountryDialCodes"
import React, { useContext, useState } from "react"
import { isMobile } from "react-device-detect"

import {
  ActivityIndicator,
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
import * as RootNavigation from "../../screens/HomeScreen/NavigationRoot"
import { UserActions, UserContext } from "../../screens/HomeScreen/UserContext"
import { Brand } from "../../src/Brand"

interface Props {
  navigation?: NavigationProp<any, any>
  route?: any
}
type User = {
  first: string
  last: string
  pass: string
  pass2: string
  email: string
  phone: string
  code: string
  orgName: string
}
type JoinedAs = "individual" | "organization" | null

function MySignUpImpl(props: Props) {
  const [user, setUser] = useState<User>({
    first: "",
    last: "",
    pass: "",
    pass2: "",
    email: "",
    phone: "",
    code: "+1",
    orgName: "",
  })
  const [authError, setAuthError] = useState<string>("")
  const [joinedAs, setJoinedAs] = useState<JoinedAs>(props.route?.params.joinedAs)
  const [joinedProduct, setJoinedProduct] = useState<string>(props.route?.params.joinedProduct)
  const [brand, setBrand] = useState(Brand())
  const [sendingData, setSendingData] = useState<boolean>(false)

  const UserConsumer = useContext(UserContext)

  const changeAuthState = async (
    actions: UserActions,
    state: string,
    data: AuthStateData
  ): Promise<void> => {
    setUser({
      first: "",
      last: "",
      pass: "",
      pass2: "",
      email: "",
      phone: "",
      code: "+1",
      orgName: "",
    })
    setAuthError("")
    setJoinedAs(null)
    setJoinedProduct(props.route?.params.joinedProduct)
    setBrand(brand)
    setSendingData(false)

    if (actions.onStateChange) await actions.onStateChange(state, data)
  }

  const validate = (): boolean => {
    let val = true
    let errorMsg = ""
    if (!user.first) {
      val = false
      errorMsg = "Please enter your first name"
    } else if (!user.last) {
      val = false
      errorMsg = "Please enter your last name"
    } else if (!user.email || !user.email.includes("@")) {
      val = false
      errorMsg = "Please enter a valid email"
    } else if (!user.pass) {
      val = false
      errorMsg = "Please enter a password"
    } else if (user.pass.length < 8) {
      errorMsg = "Password must be at least 8 characters"
      val = false
    } else if (!user.pass2) {
      val = false
      errorMsg = "Please confirm your password"
    } else if (user.pass !== user.pass2) {
      errorMsg = "Passwords do not match"
      val = false
    } else if (!user.phone) {
      val = false
      errorMsg = "Please enter a phone number"
    }
    if (!user.orgName && joinedAs === "organization") {
      val = false
      errorMsg = "Please enter your organization name"
    }
    setAuthError(errorMsg)
    return val
  }
  /*
  const componentDidUpdate = (_prevProps: Props, prevState: State): void => {
    if (prevState.user !== user) {
      setAuthError("")
    }
  }*/
  const signUp = async (actions: any): Promise<void> => {
    if (validate()) {
      setAuthError("")
      try {
        if (user.pass !== user.pass2) {
          setAuthError("Passwords do not match")
          return
        }
        if (!validate()) return
        Sentry.setUser({ email: user.email.toLowerCase() })

        setSendingData(true)
        await Auth.signUp({
          username: user.email.toLowerCase(),
          password: user.pass,
          attributes: {
            family_name: user.last,
            given_name: user.first,
            phone_number: user.code + user.phone,
            email: user.email.toLowerCase(),
            "custom:orgName": user.orgName,
            "custom:isOrg": Boolean(joinedAs === "organization").toString(),
          },
        }).then(
          async () =>
            await changeAuthState(actions, "confirmSignUp", {
              joinedProduct: joinedProduct,
              brand: brand,
              email: user.email.toLowerCase(),
            })
        )
      } catch (e: any) {
        setAuthError(e.message)
        setSendingData(false)
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
    if (keyEvent.nativeEvent.key === "Enter") signUp(actions)
  }

  const handleChange = (field: keyof User, input: string): void => {
    setUser((z) => {
      return { ...z, [field]: input }
    })
  }
  const styles = StyleSheet.create({
    signUpBackButtonWrapper:
      Dimensions.get("window").width >= 720
        ? { position: "absolute", top: "10%", left: "30%", zIndex: 9999 }
        : {
            position: "absolute",
            top: "0",
            left: "2%",
            marginTop: Platform.OS === "android" ? 50 : 10,
            zIndex: 9999,
          },
    authView3:
      Platform.OS === "web" && Dimensions.get("window").width > 720
        ? { left: "32.5%", width: 600, top: "15%", height: "auto" }
        : { left: "2%", width: "96%", top: "0%", height: "100%" },
    /*
    authView3:
      Dimensions.get("window").width < 720
        ? {
            left: "30%",
            width: "70vw",
            top: "15%",
            height: "auto",
            alignSelf: "flex-start",
          }
        : {
            marginLeft: 0,
            marginRight: 0,
            paddingLeft: 5,
            paddingRight: 5,
            left: "0%",
            width: "100%",
            top: "5%",
            height: "auto",
            alignSelf: "flex-start",
          },
*/
    mySignUpText:
      Dimensions.get("window").width >= 720
        ? {
            width: "100%",
            marginBottom: "8.33%",
            fontFamily: "Graphik-Regular-App",
            fontWeight: "bold",
            fontSize: 22,
            lineHeight: 30,
            alignSelf: "center",
          }
        : /*{
            width: "100%",
            alignSelf: "flex-start",
          },*/
          {
            marginTop: Platform.OS === "android" || Platform.OS === "web" ? 50 : 50,
            width: "100%",
            textAlign: "center",
          },

    mySignUpInputFieldscontainer:
      Dimensions.get("window").width >= 720
        ? {
            display: "flex",
            flexDirection: "row",
            marginBottom: "5.5%",
          }
        : {
            display: "flex",
            flexDirection: "row",
            marginRight: 0,
            marginLeft: 10,
          },

    mySignUpPlaceholderText: {
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
      fontSize: Dimensions.get("window").width >= 720 ? 18 : 15,
      lineHeight: 24,
    },
    mySignUpEmailContainer:
      Dimensions.get("window").width >= 720
        ? {
            display: "flex",
            flexDirection: "row",
            marginBottom: "1.4%",
          }
        : {
            display: "flex",
            flexDirection: "row",
            marginBottom: "1.4%",
            marginRight: 0,
            marginLeft: 10,
          },

    mySignUpPasswordContainer:
      Dimensions.get("window").width >= 720
        ? {
            display: "flex",
            flexDirection: "row",
            marginBottom: "5.5%",
          }
        : {
            display: "flex",
            flexDirection: "row",
            marginBottom: "5.5%",
            marginRight: 0,
            marginLeft: 10,
          },

    mySignUpLeftPasswordContainer:
      Dimensions.get("window").width >= 720
        ? {
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
          }
        : {
            borderBottomWidth: 1,
            borderColor: "#00000020",
            marginBottom: "1.4%",
            marginRight: 0,
            width: "100%",
            paddingTop: 10,
            paddingRight: 10,
            paddingBottom: 10,
            paddingLeft: 5,
            fontFamily: "Graphik-Regular-App",
            fontSize: 15,
            marginLeft: 0,
          },

    mySignUpPhoneContainer:
      Dimensions.get("window").width >= 720
        ? {
            display: "flex",
            flexDirection: "row",
            marginBottom: "8.33%",
          }
        : {
            display: "flex",
            flexDirection: "row",
            marginRight: 0,
            marginLeft: 10,
          },

    mySignUpConfirmCode:
      Dimensions.get("window").width >= 720
        ? {
            alignSelf: "flex-end",
            paddingHorizontal: 30,
            paddingBottom: 15,
            paddingTop: 15,
          }
        : {
            alignSelf: "flex-start",
            marginLeft: 10,
            paddingHorizontal: 30,
            paddingBottom: 15,
            paddingTop: 15,
          },

    authView3Welcome:
      Dimensions.get("window").width < 720
        ? {
            width: "100%",
            marginTop: "2%",
            marginBottom: "5.5%",
            fontFamily: "Graphik-Regular-App",
            fontWeight: "bold",
            fontSize: 18,
            lineHeight: 30,
            textAlign: "center",
          }
        : {
            width: "100%",
            marginTop: "2%",
            marginBottom: "5.5%",
            fontFamily: "Graphik-Regular-App",
            fontWeight: "bold",
            fontSize: 28,
            lineHeight: 30,
          },

    mySignUpButton:
      Dimensions.get("window").width >= 720
        ? {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginRight: 15,
          }
        : {
            flexDirection: "column",
            height: "auto",
          },

    mySignUpOr:
      Dimensions.get("window").width < 720
        ? {
            marginTop: 15,
            marginBottom: 15,
            width: "40%",
          }
        : {
            fontFamily: "Graphik-Regular-App",
            fontWeight: "bold",
            fontSize: 22,
            marginHorizontal: 15,
          },
    /*  mySignUpOr: {
      marginTop: 15,
      marginBottom: 15,
      width: "40%",
    },*/
  })
  /*

 

 "@media (min-width: 320px) and (max-width: 720px)": {
      
          signUpBackButtonWrapper: { position: "absolute", top: "0%", left: "2%", zIndex: 9999 },
  */
  // styles = MainStyles.getInstance()
  const UNSAFE_componentWillMount = (): void => {
    const params = RootNavigation.getRoot()?.params as {
      joinedAs: "individual" | "organization" | null
    }
    setJoinedAs(params?.joinedAs ? params.joinedAs : null)
  }

  if (!UserConsumer.userState) return null
  return (
    <>
      {UserConsumer.userState.authState === "signUp" ? (
        <View style={{ width: "100%", left: 0, top: 0, height: "100%" }}>
          <View style={styles.signUpBackButtonWrapper}>
            <TouchableOpacity
              accessibilityLabel="Go back"
              accessibilityHint="Navigate to previous page"
              accessibilityRole="button"
              onPress={async () => {
                await changeAuthState(UserConsumer.userActions, "signIn", {
                  joinedProduct: joinedProduct,
                  brand: brand,
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
          {joinedAs ? (
            joinedAs === "individual" ? (
              <View style={styles.authView3}>
                <Text accessibilityRole="header" style={styles.mySignUpText}>
                  Create your account
                </Text>
                <View style={styles.mySignUpInputFieldscontainer}>
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
                    accessibilityLabel="First Name"
                    textContentType="name"
                    placeholder="First Name"
                    value={user.first}
                    onChange={(e) => handleChange("first", e.nativeEvent.text)}
                    style={styles.mySignUpPlaceholderText}
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
                    value={user.last}
                    onChange={(e) => handleChange("last", e.nativeEvent.text)}
                    style={styles.mySignUpPlaceholderText}
                  ></TextInput>
                </View>
                <View style={styles.mySignUpEmailContainer}>
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
                    textContentType="emailAddress"
                    keyboardType="email-address"
                    placeholder="Email Address"
                    value={user.email}
                    onChange={(e) => handleChange("email", e.nativeEvent.text)}
                    style={styles.mySignUpPlaceholderText}
                  ></TextInput>
                </View>
                <View style={styles.mySignUpPasswordContainer}>
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
                    value={user.pass}
                    onChange={(e) => handleChange("pass", e.nativeEvent.text)}
                    secureTextEntry={true}
                    style={styles.mySignUpLeftPasswordContainer}
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
                    value={user.pass2}
                    onChange={(e) => handleChange("pass2", e.nativeEvent.text)}
                    secureTextEntry={true}
                    style={styles.mySignUpPlaceholderText}
                  ></TextInput>
                </View>
                <View style={styles.mySignUpPhoneContainer}>
                  <Picker
                    accessibilityLabel="Select country code"
                    selectedValue={user.code}
                    onValueChange={(val) => handleChange("code", val)}
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
                    accessibilityLabel="Telephone number"
                    textContentType="telephoneNumber"
                    onKeyPress={(e) => handleEnter(UserConsumer.userActions, e)}
                    keyboardType="phone-pad"
                    placeholder="Phone number"
                    value={user.phone}
                    onChange={(e) => {
                      if (e.nativeEvent.text.length < 11 && !e.nativeEvent.text.match(/\D/g)) {
                        handleChange("phone", e.nativeEvent.text)
                      }
                    }}
                    style={styles.mySignUpPlaceholderText}
                  ></TextInput>
                </View>
                <View style={{ flexDirection: "row", marginLeft: isMobile ? 10 : undefined }}>
                  <View style={{ flex: 1 }}>
                    <JCButton
                      enabled={true}
                      buttonType={
                        brand == "oneStory"
                          ? ButtonTypes.SolidSignInOneStory
                          : ButtonTypes.SolidSignIn
                      }
                      onPress={() => signUp(UserConsumer.userActions)}
                    >
                      {sendingData ? (
                        <ActivityIndicator
                          accessibilityRole="alert"
                          accessibilityLabel="Loading"
                          animating
                          color="#333333"
                        />
                      ) : (
                        "Continue"
                      )}
                    </JCButton>
                  </View>
                  <TouchableOpacity
                    accessibilityRole="button"
                    accessibilityLabel="Confirm your account"
                    accessibilityHint="For users already registered"
                    style={styles.mySignUpConfirmCode}
                    onPress={async () =>
                      await changeAuthState(UserConsumer.userActions, "confirmSignUp", {
                        joinedProduct: joinedProduct,
                        brand: brand,
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
                  accessibilityLiveRegion={"assertive"}
                  accessibilityRole="alert"
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
                  {authError ? (
                    <Entypo style={{ marginRight: 4 }} name="warning" size={18} color="#F0493E" />
                  ) : null}
                  {authError}
                </Text>

                <Copyright />
              </View>
            ) : (
              <View style={styles.authView3}>
                <Text accessibilityRole="header" style={styles.mySignUpText}>
                  Create Your Account
                </Text>
                <View style={styles.mySignUpInputFieldscontainer}>
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
                    value={user.first}
                    onChange={(e) => handleChange("first", e.nativeEvent.text)}
                    style={styles.mySignUpPlaceholderText}
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
                    value={user.last}
                    onChange={(e) => handleChange("last", e.nativeEvent.text)}
                    style={styles.mySignUpPlaceholderText}
                  ></TextInput>
                </View>
                <View style={styles.mySignUpEmailContainer}>
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
                    textContentType="emailAddress"
                    keyboardType="email-address"
                    placeholder="Email Address"
                    value={user.email}
                    onChange={(e) => handleChange("email", e.nativeEvent.text)}
                    style={styles.mySignUpPlaceholderText}
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
                    value={user.orgName}
                    onChange={(e) => handleChange("orgName", e.nativeEvent.text)}
                    style={styles.mySignUpPlaceholderText}
                  ></TextInput>
                </View>
                <View style={styles.mySignUpPasswordContainer}>
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
                    value={user.pass}
                    onChange={(e) => handleChange("pass", e.nativeEvent.text)}
                    secureTextEntry={true}
                    style={styles.mySignUpPlaceholderText}
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
                    value={user.pass2}
                    onChange={(e) => handleChange("pass2", e.nativeEvent.text)}
                    secureTextEntry={true}
                    style={styles.mySignUpPlaceholderText}
                  ></TextInput>
                </View>
                <View style={styles.mySignUpPhoneContainer}>
                  <Picker
                    selectedValue={user.code}
                    accessibilityLabel="Select country code"
                    accessibilityRole="combobox"
                    onValueChange={(val) => handleChange("code", val)}
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
                    textContentType="telephoneNumber"
                    onKeyPress={(e) => handleEnter(UserConsumer.userActions, e)}
                    keyboardType="phone-pad"
                    placeholder="Phone number"
                    value={user.phone}
                    onChange={(e) => handleChange("phone", e.nativeEvent.text)}
                    style={styles.mySignUpPlaceholderText}
                  ></TextInput>
                </View>
                <View style={{ flexDirection: "row", marginLeft: isMobile ? 10 : undefined }}>
                  <View style={{ flex: 1 }}>
                    <JCButton
                      enabled={true}
                      buttonType={
                        brand == "oneStory"
                          ? ButtonTypes.SolidSignInOneStory
                          : ButtonTypes.SolidSignIn
                      }
                      onPress={() => signUp(UserConsumer.userActions)}
                    >
                      {sendingData ? (
                        <ActivityIndicator
                          accessibilityRole="alert"
                          accessibilityLabel="Loading"
                          animating
                          color="#333333"
                        />
                      ) : (
                        "Continue"
                      )}
                    </JCButton>
                  </View>
                  <TouchableOpacity
                    accessibilityRole="button"
                    accessibilityLabel="Verify your account"
                    accessibilityHint="For already registered users"
                    onPress={async () =>
                      await changeAuthState(UserConsumer.userActions, "confirmSignUp", {
                        joinedProduct: joinedProduct,
                        brand: brand,
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
                </View>
                <Text
                  accessibilityLiveRegion={"assertive"}
                  accessibilityRole="alert"
                  accessible
                  style={{
                    alignSelf: "center",
                    alignItems: "center",
                    fontSize: 14,
                    fontFamily: "Graphik-Regular-App",
                    lineHeight: 22,
                    marginTop: 20,
                  }}
                >
                  {authError ? (
                    <Entypo style={{ marginRight: 4 }} name="warning" size={18} color="#F0493E" />
                  ) : null}
                  {authError}
                </Text>
                <Copyright />
              </View>
            )
          ) : (
            <View style={styles.authView3}>
              <Text accessibilityRole="header" style={styles.authView3Welcome}>
                {brand == "oneStory" ? "Welcome to One Story" : "Sign in to Jesus Collective"}
              </Text>
              {/*this.state.brand == "oneStory" && (
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
                        Collective allows us to not only make all of our resources available
                        online in a convenient easy to assess way, but also provides you the
                        benefit of connecting with other One Story users to give feedback, share
                        ideas and ask questions.
                      </Text>
                      )*/}
              <Text accessibilityRole="header" style={styles.mySignUpText}>
                What type of account would you like to create?
              </Text>
              <View style={styles.mySignUpButton}>
                <JCButton
                  accessibilityLabel="Register as an individual"
                  buttonType={
                    brand == "oneStory"
                      ? ButtonTypes.SolidSignIn2OneStory
                      : ButtonTypes.SolidSignIn2
                  }
                  onPress={() => setJoinedAs("individual")}
                >
                  Individual
                </JCButton>
                <Text style={styles.mySignUpOr}>{/* or */}</Text>
                <JCButton
                  accessibilityLabel="Register as an organization"
                  buttonType={
                    brand == "oneStory"
                      ? ButtonTypes.SolidSignIn2OneStory
                      : ButtonTypes.SolidSignIn2
                  }
                  onPress={() => setJoinedAs("organization")}
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
}
//export default MySignUp

export default function MySignUp(props: Props): JSX.Element {
  const route = useRoute()
  const navigation = useNavigation()
  return <MySignUpImpl {...props} navigation={navigation} route={route} />
}
