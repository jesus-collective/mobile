import Amplify, { Auth } from "aws-amplify"
import React from "react"
import { Button, Text, View } from "react-native"
import { JCCognitoUser } from "src/types"
import { Data } from "../../components/Data/Data"
import JCComponent from "../../components/JCComponent/JCComponent"
import SignUpSidebar from "../../components/SignUpSidebar/SignUpSidebar"
import { UserActions, UserContext } from "../../screens/HomeScreen/UserContext"
import { PaidState } from "../../src/API"
import awsConfig from "../../src/aws-exports"
Amplify.configure(awsConfig)

interface Props {
  authState?: string
}
export default class SignUpScreen2 extends JCComponent<Props> {
  static UserConsumer = UserContext.Consumer

  async makePayment(actions: UserActions): Promise<void> {
    console.log("Finish Payment")
    try {
      const user = (await Auth.currentAuthenticatedUser()) as JCCognitoUser
      await Data.updateUser({
        id: user["username"],
        hasPaidState: PaidState.Success,
      })

      actions.recheckUserState()
    } catch (e) {
      console.log({ Error: e })
    }
  }

  render(): React.ReactNode {
    return (
      <SignUpScreen2.UserConsumer>
        {({ userState, userActions }) => {
          if (!userState) return null
          return (
            <View style={this.styles.style.signUpScreen1PaymentBody}>
              <SignUpSidebar position="3"></SignUpSidebar>
              <View
                style={{
                  position: "absolute",
                  left: "35%",
                  width: "25%",
                  top: 100,
                  height: "100%",
                }}
              >
                <Text>Payment Successful</Text>

                <Button
                  color="#F0493E"
                  title="Setup Profile"
                  onPress={() => {
                    this.makePayment(userActions)
                  }}
                />
              </View>
            </View>
          )
        }}
      </SignUpScreen2.UserConsumer>
    )
  }
}
