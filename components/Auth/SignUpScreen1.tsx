import { useNavigation, useRoute } from "@react-navigation/native"
import Amplify from "aws-amplify"
import { Content } from "native-base"
import React from "react"
import { ActivityIndicator, Text, View } from "react-native"
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
Amplify.configure(awsConfig)

interface Props {
  navigation?: any
  route?: any
  authState?: string
}
interface State extends JCState {}

class SignUpScreen1Impl extends JCComponent<Props, State> {
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
    return (
      <SignUpScreen1Impl.UserConsumer>
        {({ userState, userActions }) => {
          if (!userState) return null
          if (userState.hasPaidState == PaidStatus.Unknown)
            return (
              <View style={this.styles.style.signUpScreen1PaymentBody}>
                <SignUpSidebar position="3"></SignUpSidebar>

                <Content>
                  <View style={this.styles.style.signUpScreen1PaymentColumn1}>
                    <Text
                      style={{
                        fontFamily: "Graphik-Bold-App",
                        textAlign: "center",
                        width: "100%",
                        fontSize: 12,
                        marginBottom: 8,
                      }}
                    >
                      We're getting you setup. This may takes several seconds.
                    </Text>
                    <ActivityIndicator />
                  </View>
                </Content>
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
                <Content>
                  <View style={this.styles.style.signUpScreen1PaymentColumn1}>
                    <Text
                      style={{
                        fontFamily: "Graphik-Bold-App",
                        alignSelf: "center",
                        fontSize: 42,
                        lineHeight: 51,
                        textAlign: "center",
                        marginBottom: 20,
                      }}
                    >
                      We've received your payment.
                      <br />
                      <JCButton
                        onPress={() => {
                          this.completePaymentProcess(userActions, userState)
                        }}
                        buttonType={ButtonTypes.Solid}
                      >
                        Continue to Your Profile
                      </JCButton>
                    </Text>
                  </View>
                </Content>
              </View>
            )
          } else if (userState.hasPaidState == PaidStatus.PermissionNotGranted) {
            return (
              <View style={this.styles.style.signUpScreen1PaymentBody}>
                <SignUpSidebar position="3"></SignUpSidebar>
                <Content>
                  <View style={this.styles.style.signUpScreen1PaymentColumn1}>
                    <Text
                      style={{
                        fontFamily: "Graphik-Bold-App",
                        alignSelf: "center",
                        fontSize: 22,
                        lineHeight: 51,
                        textAlign: "center",
                        marginBottom: 20,
                      }}
                    >
                      We're just waiting for your account to be fully setup. Please check back soon!
                      <br />
                    </Text>
                  </View>
                </Content>
              </View>
            )
          } else if (userState.hasPaidState == PaidStatus.MissingCustomer) {
            return (
              <View style={this.styles.style.signUpScreen1PaymentBody}>
                <SignUpSidebar position="3"></SignUpSidebar>
                <Content>
                  <View style={this.styles.style.signUpScreen1PaymentColumn1}>
                    <Text
                      style={{
                        fontFamily: "Graphik-Bold-App",
                        alignSelf: "center",
                        fontSize: 22,
                        lineHeight: 51,
                        textAlign: "center",
                        marginBottom: 20,
                      }}
                    >
                      There may have been a problem, please contact support!
                      <br />
                    </Text>
                  </View>
                </Content>
              </View>
            )
          } else
            return (
              <View style={this.styles.style.signUpScreen1PaymentBody}>
                <SignUpSidebar position="3"></SignUpSidebar>
                <Content>
                  <View style={this.styles.style.signUpScreen1PaymentColumn1}>
                    <Text
                      style={{
                        fontFamily: "Graphik-Bold-App",
                        alignSelf: "center",
                        fontSize: 22,
                        lineHeight: 51,
                        textAlign: "center",
                        marginBottom: 20,
                      }}
                    >
                      There has been a problem, please contact support!
                      <br />
                    </Text>
                  </View>
                </Content>
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
