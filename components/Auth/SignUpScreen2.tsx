import { Amplify, Auth } from "aws-amplify"
import React, { useContext } from "react"
import { Dimensions, Platform, Pressable, StyleSheet, Text, View } from "react-native"
import { JCCognitoUser } from "src/types"
import { Data } from "../../components/Data/Data"
import SignUpSidebar from "../../components/SignUpSidebar/SignUpSidebar"
import { UserActions, UserContext } from "../../screens/HomeScreen/UserContext"
import { PaidState } from "../../src/API"
import awsConfig from "../../src/aws-exports"
Amplify.configure(awsConfig)

export default function SignUpScreen2() {
  const UserConsumer = useContext(UserContext)

  const makePayment = async (actions: UserActions): Promise<void> => {
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
  const styles = StyleSheet.create({
    signUpScreen1PaymentBody:
      Platform.OS === "web" && Dimensions.get("window").width > 720
        ? { width: "100%", left: 0, top: 0, height: "100%" }
        : { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, flex: 1 },
  })
  if (!UserConsumer.userState) return null
  return (
    <View style={styles.signUpScreen1PaymentBody}>
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

        <Pressable
          style={{ backgroundColor: "#F0493E" }}
          onPress={() => {
            makePayment(UserConsumer.userActions)
          }}
        >
          <Text>Setup Profile</Text>
        </Pressable>
      </View>
    </View>
  )
}
