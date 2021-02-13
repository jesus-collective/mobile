import * as React from "react"
import { Dimensions, Image, Platform, Text, View } from "react-native"
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
            {Platform.OS === "web" && Dimensions.get("window").width > 720 ? (
              <>
                <Text style={this.styles.style.signUpSidebarProgressText1}>Account Creation</Text>
                <Text style={this.styles.style.signUpSidebarProgressText2}>Authentication</Text>
                <Text style={this.styles.style.signUpSidebarProgressText3}>Payment</Text>
                <Text style={this.styles.style.signUpSidebarProgressText4}>Individual Profile</Text>
                <Text style={this.styles.style.signUpSidebarProgressText5}>Get In</Text>
              </>
            ) : (
              <>
                {this.props.position === "1" ? (
                  <Text style={this.styles.style.signUpSidebarProgressText1}>Account Creation</Text>
                ) : this.props.position === "2" ? (
                  <Text style={this.styles.style.signUpSidebarProgressText2}>Authentication</Text>
                ) : this.props.position === "3" ? (
                  <Text style={this.styles.style.signUpSidebarProgressText3}>Payment</Text>
                ) : this.props.position === "4" ? (
                  <Text style={this.styles.style.signUpSidebarProgressText4}>
                    Individual Profile
                  </Text>
                ) : this.props.position === "5" ? (
                  <Text style={this.styles.style.signUpSidebarProgressText5}>Get In</Text>
                ) : (
                  <Text style={this.styles.style.signUpSidebarProgressText5}>Welcome</Text>
                )}
              </>
            )}
            {this.props.position == "1" ? (
              <Image
                source={require("../../assets/SignUp/progress-1.png")}
                style={this.styles.style.signUpSidebarProgress}
              />
            ) : null}
            {this.props.position == "2" ? (
              <Image
                source={require("../../assets/SignUp/progress-2.png")}
                style={this.styles.style.signUpSidebarProgress}
              />
            ) : null}
            {this.props.position == "3" ? (
              <Image
                source={require("../../assets/SignUp/progress-3.png")}
                style={this.styles.style.signUpSidebarProgress}
              />
            ) : null}
            {this.props.position == "4" ? (
              <Image
                source={require("../../assets/SignUp/progress-4.png")}
                style={this.styles.style.signUpSidebarProgress}
              />
            ) : null}
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
