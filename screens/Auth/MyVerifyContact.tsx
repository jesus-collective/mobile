import { VerifyContact } from "aws-amplify-react-native"
import React from "react"
import { Dimensions, Platform, StyleSheet, View } from "react-native"
import SignUpSidebar from "../../components/SignUpSidebar/SignUpSidebar"
import { UserContext } from "../../screens/HomeScreen/UserContext"
import { EmptyProps } from "../../src/types"

class MyVerifyContact extends VerifyContact<EmptyProps> {
  constructor(props: EmptyProps) {
    super(props)
  }
  static UserConsumer = UserContext.Consumer
  styles = StyleSheet.create({
    authView:
      Platform.OS === "web" && Dimensions.get("window").width > 720
        ? { left: "35%", width: "40%", top: 100, height: "auto" }
        : { left: "2%", width: "96%", top: "0%", height: "100%" },
  })
  render(): React.ReactNode {
    return (
      <MyVerifyContact.UserConsumer>
        {({ userState }) => {
          if (!userState) return null
          return (
            <>
              {userState.authState === "verifyContact" ? (
                <View style={{ width: "100%", left: 0, top: 0, height: "100%" }}>
                  <View style={this.styles.authView}>{super.render()}</View>
                  {Platform.OS === "web" && Dimensions.get("window").width > 720 ? (
                    <SignUpSidebar position="2" />
                  ) : null}
                </View>
              ) : null}
            </>
          )
        }}
      </MyVerifyContact.UserConsumer>
    )
  }
}
export default MyVerifyContact
