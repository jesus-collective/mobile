import { useNavigation, useRoute } from "@react-navigation/native"
import Amplify from "aws-amplify"
import React from "react"
import { ActivityIndicator, View } from "react-native"
import Billing from "../../components/Billing/Billing"
import JCComponent, { JCState } from "../../components/JCComponent/JCComponent"
import SignUpSidebar from "../../components/SignUpSidebar/SignUpSidebar"
import { UserContext } from "../../screens/HomeScreen/UserContext"
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

  render(): React.ReactNode {
    return (
      <SignUpScreen1Impl.UserConsumer>
        {({ userState, userActions }) => {
          if (!userState) return null
          if (userState.hasPaidState == "Unknown") return <ActivityIndicator />
          if (userState.hasPaidState == "InProgress") {
            return (
              <View style={this.styles.style.signUpScreen1PaymentBody}>
                <SignUpSidebar position="3"></SignUpSidebar>
                <Billing></Billing>
              </View>
            )
          } else return null
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
