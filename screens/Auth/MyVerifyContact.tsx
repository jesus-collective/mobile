import { VerifyContact } from "aws-amplify-react-native"
import React, { useContext } from "react"
import { Dimensions, Platform, StyleSheet, View } from "react-native"
import SignUpSidebar from "../../components/SignUpSidebar/SignUpSidebar"
import { UserContext } from "../../screens/HomeScreen/UserContext"

function MyVerifyContact() {
  const UserConsumer = useContext(UserContext)
  const styles = StyleSheet.create({
    authView:
      Platform.OS === "web" && Dimensions.get("window").width > 720
        ? { left: "35%", width: "40%", top: 100, height: "auto" }
        : { left: "2%", width: "96%", top: "0%", height: "100%" },
  })

  if (!UserConsumer.userState) return null
  return (
    <>
      {UserConsumer.userState.authState === "verifyContact" ? (
        <View style={{ width: "100%", left: 0, top: 0, height: "100%" }}>
          <View style={styles.authView}>
            <VerifyContact />
          </View>
          {Platform.OS === "web" && Dimensions.get("window").width > 720 ? (
            <SignUpSidebar position="2" />
          ) : null}
        </View>
      ) : null}
    </>
  )
}
export default MyVerifyContact
