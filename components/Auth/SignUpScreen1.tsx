import { NavigationProp, useNavigation, useRoute } from "@react-navigation/native"
import { Amplify } from "aws-amplify"
import React from "react"
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native"
import Billing from "../../components/Billing/Billing"
import JCButton, { ButtonTypes } from "../../components/Forms/JCButton"
import JCComponent, { JCState } from "../../components/JCComponent/JCComponent"
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

interface Props {
  navigation?: NavigationProp<any, any>
  route?: any
  authState?: string
}
//interface State extends JCState {}

class SignUpScreen1Impl extends JCComponent<Props, JCState> {
  constructor(props: Props) {
    super(props)
  }
  static UserConsumer = UserContext.Consumer
  async completePaymentProcess(actions: UserActions, state: UserState) {
    await actions.updateGroups()
    console.log({ Groups: state.groups })
    await actions.recheckUserState()
  }
  render(): React.ReactNode {
    const brand = Brand()
    return (
      <SignUpScreen1Impl.UserConsumer>
        {({ userState, userActions }) => {
          if (!userState) return null
          if (userState.hasPaidState == PaidStatus.Unknown)
            return (
              <View style={this.styles.style.signUpScreen1PaymentBody}>
                <SignUpSidebar position="3"></SignUpSidebar>

                <ScrollView>
                  <View style={this.styles.style.signUpScreen1PaymentColumn1}>
                    <Text style={this.styles.style.SignUpScreenSetupText}>
                      We&apos;re getting you setup. This may take several seconds.
                    </Text>
                    <ActivityIndicator />
                  </View>
                </ScrollView>
              </View>
            )
          if (userState.hasPaidState == PaidStatus.InProgress) {
            return (
              <View style={this.styles.style.signUpScreen1PaymentBody}>
                <SignUpSidebar position="3"></SignUpSidebar>
                <Billing></Billing>
              </View>
            )
          } else if (userState.hasPaidState == PaidStatus.Success) {
            return (
              <View style={this.styles.style.signUpScreen1PaymentBody}>
                <SignUpSidebar position="3"></SignUpSidebar>
                <ScrollView>
                  <View style={this.styles.style.signUpScreen1PaymentColumn1}>
                    <Image
                      style={{
                        width: "22px",
                        height: "22px",
                        top: 6,
                      }}
                      source={require("../../assets/svg/checkmark.svg")}
                    ></Image>
                    <Text style={this.styles.style.SignUpScreenSetupText}>
                      We&apos;ve received your payment.
                      <br />
                      <JCButton
                        onPress={() => {
                          this.completePaymentProcess(userActions, userState)
                        }}
                        buttonType={
                          brand == "oneStory" ? ButtonTypes.SolidOneStory : ButtonTypes.Solid
                        }
                      >
                        Continue to Your Profile
                      </JCButton>
                    </Text>
                  </View>
                </ScrollView>
              </View>
            )
          } else if (userState.hasPaidState == PaidStatus.PermissionNotGranted) {
            return (
              <View style={this.styles.style.signUpScreen1PaymentBody}>
                <SignUpSidebar position="3"></SignUpSidebar>
                <ScrollView>
                  <View style={this.styles.style.signUpScreen1PaymentColumn1}>
                    <Text style={this.styles.style.SignUpScreenSetupText}>
                      Please wait a moment while we set up your account.
                      <br />
                    </Text>
                  </View>
                </ScrollView>
              </View>
            )
          } else if (userState.hasPaidState == PaidStatus.MissingCustomer) {
            return (
              <View style={this.styles.style.signUpScreen1PaymentBody}>
                <SignUpSidebar position="3"></SignUpSidebar>
                <ScrollView>
                  <View style={this.styles.style.signUpScreen1PaymentColumn1}>
                    <Text style={this.styles.style.SignUpScreenSetupText}>
                      There may have been a problem, please contact support!
                      <br />
                    </Text>
                  </View>
                </ScrollView>
              </View>
            )
          } else
            return (
              <View style={this.styles.style.signUpScreen1PaymentBody}>
                <SignUpSidebar position="3"></SignUpSidebar>
                <ScrollView>
                  <View style={this.styles.style.signUpScreen1PaymentColumn1}>
                    <Text style={this.styles.style.SignUpScreenSetupText}>
                      There has been a problem, please contact support!
                      <br />
                    </Text>
                  </View>
                </ScrollView>
              </View>
            )
        }}
      </SignUpScreen1Impl.UserConsumer>
    )
  }
}

export default function SignUpScreen1(props: Props): JSX.Element {
  const route = useRoute()
  const navigation = useNavigation()
  return <SignUpScreen1Impl {...props} navigation={navigation} route={route} />
}
