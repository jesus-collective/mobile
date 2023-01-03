import { Amplify } from "aws-amplify"
import React, { useContext } from "react"
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native"
import Billing from "../../components/Billing/Billing"
import JCButton, { ButtonTypes } from "../../components/Forms/JCButton"
import SignUpSidebar from "../../components/SignUpSidebar/SignUpSidebar"
import {
  PaidStatus,
  UserActions,
  UserContext,
  UserState,
} from "../../screens/HomeScreen/UserContext"
import awsConfig from "../../src/aws-exports"
import { Brand } from "../../src/Brand"
Amplify.configure(awsConfig)

export default function SignUpScreen1() {
  const UserConsumer = useContext(UserContext)
  const completePaymentProcess = async (actions: UserActions, state: UserState | undefined) => {
    await actions.updateGroups()
    console.log({ Groups: state?.groups })
    await actions.recheckUserState()
  }

  const brand = Brand()
  const styles = StyleSheet.create({
    signUpScreen1PaymentBody:
      Platform.OS === "web" && Dimensions.get("window").width > 720
        ? { width: "100%", left: 0, top: 0, height: "100%" }
        : { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, flex: 1 },
    /*  signUpScreen1PaymentColumn1: {
      left: "0%",
      width: "90%",
    },
*/
    signUpScreen1PaymentColumn1:
      Platform.OS === "web" && Dimensions.get("window").width > 720
        ? { position: "absolute", left: "7.5%", width: "100%", top: "40vh", height: "100%" }
        : { marginLeft: 20, marginRight: 20, left: "0%" },
    SignUpScreenSetupText: {
      fontFamily: "Graphik-Medium-App",
      textAlign: "center",
      width: "50%",
      fontSize: 28,
      lineHeight: 33,
      marginBottom: 8,
      left: "16rem",
      position: "relative",
    },
    /*  SignUpScreenSetupText: {
      width: "100%",
      left: 0,
    },*/
  })
  if (!UserConsumer.userState) return null
  if (UserConsumer.userState.hasPaidState == PaidStatus.Unknown)
    return (
      <View style={styles.signUpScreen1PaymentBody}>
        <SignUpSidebar position="3"></SignUpSidebar>

        <ScrollView>
          <View style={styles.signUpScreen1PaymentColumn1}>
            <Text style={styles.SignUpScreenSetupText}>
              We&apos;re getting you setup. This may take several seconds.
            </Text>
            <ActivityIndicator />
          </View>
        </ScrollView>
      </View>
    )
  if (UserConsumer.userState?.hasPaidState == PaidStatus.InProgress) {
    return (
      <View style={styles.signUpScreen1PaymentBody}>
        <SignUpSidebar position="3"></SignUpSidebar>
        <Billing></Billing>
      </View>
    )
  } else if (UserConsumer.userState.hasPaidState == PaidStatus.Success) {
    return (
      <View style={styles.signUpScreen1PaymentBody}>
        <SignUpSidebar position="3"></SignUpSidebar>
        <ScrollView>
          <View style={styles.signUpScreen1PaymentColumn1}>
            <Image
              style={{
                width: "22px",
                height: "22px",
                top: 6,
              }}
              source={require("../../assets/svg/checkmark.svg")}
            ></Image>
            <Text style={styles.SignUpScreenSetupText}>
              We&apos;ve received your payment.
              <br />
              <JCButton
                onPress={() => {
                  completePaymentProcess(UserConsumer.userActions, UserConsumer.userState)
                }}
                buttonType={brand == "oneStory" ? ButtonTypes.SolidOneStory : ButtonTypes.Solid}
              >
                Continue to Your Profile
              </JCButton>
            </Text>
          </View>
        </ScrollView>
      </View>
    )
  } else if (UserConsumer.userState.hasPaidState == PaidStatus.PermissionNotGranted) {
    return (
      <View style={styles.signUpScreen1PaymentBody}>
        <SignUpSidebar position="3"></SignUpSidebar>
        <ScrollView>
          <View style={styles.signUpScreen1PaymentColumn1}>
            <Text style={styles.SignUpScreenSetupText}>
              Please wait a moment while we set up your account.
              <br />
            </Text>
          </View>
        </ScrollView>
      </View>
    )
  } else if (UserConsumer.userState.hasPaidState == PaidStatus.MissingCustomer) {
    return (
      <View style={styles.signUpScreen1PaymentBody}>
        <SignUpSidebar position="3"></SignUpSidebar>
        <ScrollView>
          <View style={styles.signUpScreen1PaymentColumn1}>
            <Text style={styles.SignUpScreenSetupText}>
              There may have been a problem, please contact support!
              <br />
            </Text>
          </View>
        </ScrollView>
      </View>
    )
  } else
    return (
      <View style={styles.signUpScreen1PaymentBody}>
        <SignUpSidebar position="3"></SignUpSidebar>
        <ScrollView>
          <View style={styles.signUpScreen1PaymentColumn1}>
            <Text style={styles.SignUpScreenSetupText}>
              There has been a problem, please contact support!
              <br />
            </Text>
          </View>
        </ScrollView>
      </View>
    )
}
