import { View } from "native-base"
import * as React from "react"
import { Image, Text } from "react-native"
import * as RootNavigation from "../../screens/HomeScreen//NavigationRoot"
import JCComponent from "../JCComponent/JCComponent"

interface Props {
  position?: string
  text?: string
}
export default class SignUpSidebar extends JCComponent<Props> {
  constructor(props: Props) {
    super(props)
  }
  render(): React.ReactNode {
    const brand =
      (RootNavigation.getRoot()?.params as {
        brand: "jc" | "oneStory" | null
      })?.brand ?? "jc"
    return (
      <View style={this.styles.style.signUpSidebarView}>
        {this.props.text != null ? (
          <Text style={this.styles.style.signUpSidebarText}>{this.props.text}</Text>
        ) : (
          <View style={this.styles.style.signUpSidebarProgressTextView}>
            <Text style={this.styles.style.signUpSidebarProgressText1}>Account Creation</Text>
            <Text style={this.styles.style.signUpSidebarProgressText2}>Authentication</Text>
            <Text style={this.styles.style.signUpSidebarProgressText3}>Payment</Text>
            <Text style={this.styles.style.signUpSidebarProgressText4}>Individual Profile</Text>
            <Text style={this.styles.style.signUpSidebarProgressText5}>Get In</Text>
            {this.props.position == "1" && (
              <Image
                source={require("../../assets/SignUp/progress-1.png")}
                style={this.styles.style.signUpSidebarProgress}
              />
            )}
            {this.props.position == "2" && (
              <Image
                source={require("../../assets/SignUp/progress-2.png")}
                style={this.styles.style.signUpSidebarProgress}
              />
            )}
            {this.props.position == "3" && (
              <Image
                source={require("../../assets/SignUp/progress-3.png")}
                style={this.styles.style.signUpSidebarProgress}
              />
            )}
            {this.props.position == "4" && (
              <Image
                source={require("../../assets/SignUp/progress-4.png")}
                style={this.styles.style.signUpSidebarProgress}
              />
            )}
          </View>
        )}
        <Image
          source={require("../../assets/JC-Logo-RGB-KO2.png")}
          style={this.styles.style.signUpSidebarLogo}
        />
        {brand == "oneStory" ? (
          <>
            <Text style={this.styles.style.signUpSidebarPlus}>+</Text>
            <Image
              source={require("../../assets/SignUp/logo-one-story.png")}
              style={this.styles.style.signUpSidebarLogoOneStory}
            />
          </>
        ) : null}
        <Image
          source={require("../../assets/leftPanel.png")}
          style={this.styles.style.signUpSidebarPanel}
        />
      </View>
    )
  }
}
