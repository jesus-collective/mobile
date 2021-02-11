import Amplify, { API, Auth, graphqlOperation } from "aws-amplify"
import { View } from "native-base"
import React from "react"
import { Button, Text } from "react-native"
import { JCCognitoUser } from "src/types"
import JCComponent from "../../components/JCComponent/JCComponent"
import SignUpSidebar from "../../components/SignUpSidebar/SignUpSidebar"
import { UserContext } from "../../screens/HomeScreen/UserContext"
import awsConfig from "../../src/aws-exports"
import * as mutations from "../../src/graphql/mutations"
Amplify.configure(awsConfig)

interface Props {
  authState?: string
}
export default class SignUpScreen2 extends JCComponent<Props> {
  static UserConsumer = UserContext.Consumer

  async makePayment(actions: any): Promise<void> {
    console.log("Finish Payment")
    try {
      const user = (await Auth.currentAuthenticatedUser()) as JCCognitoUser
      await API.graphql(
        graphqlOperation(mutations.updateUser, {
          input: {
            id: user["username"],
            hasPaidState: "Success",
          },
        })
      )
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
