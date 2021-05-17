import { ConfirmSignIn } from "aws-amplify-react-native"
import { View } from "native-base"
import React from "react"
import { Dimensions, Platform } from "react-native"
import SignUpSidebar from "../../components/SignUpSidebar/SignUpSidebar"
import MainStyles from "../../components/style"
import { UserContext } from "../../screens/HomeScreen/UserContext"
import { EmptyProps } from "../../src/types"

class MyConfirmSignIn extends ConfirmSignIn<EmptyProps> {
  constructor(props: EmptyProps) {
    super(props)
  }
  static UserConsumer = UserContext.Consumer

  styles = MainStyles.getInstance()
  componentDidMount(): void {
    Dimensions.addEventListener("change", () => {
      this.styles.updateStyles(this)
    })
  }
  componentWillUnmount(): void {
    Dimensions.removeEventListener("change", () => {
      this.styles.updateStyles(this)
    })
  }
  render(): React.ReactNode {
    return (
      <MyConfirmSignIn.UserConsumer>
        {({ userState }) => {
          if (!userState) return null
          return (
            <>
              {userState.authState === "confirmSignIn" ? (
                <View style={{ width: "100%", left: 0, top: 0, height: "100%" }}>
                  <View style={this.styles.style.authView}>{super.render()}</View>
                  {Platform.OS === "web" && Dimensions.get("window").width > 720 ? (
                    <SignUpSidebar text="It’s time to unite, equip, and amplify a Jesus-centred movement." />
                  ) : null}
                </View>
              ) : null}
            </>
          )
        }}
      </MyConfirmSignIn.UserConsumer>
    )
  }
}
export default MyConfirmSignIn
