import * as React from "react"
import { Dimensions, Image, Platform, StyleSheet, Text, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Brand } from "../../src/Brand"

interface Props {
  position?: string
  text?: boolean
}

export default function SignUpSidebar(props: Props) {
  const insets = useSafeAreaInsets()
  const brand = Brand()
  const styles = StyleSheet.create<any>({
    signUpSidebarView:
      Platform.OS === "web" && Dimensions.get("window").width > 720
        ? { position: "fixed", width: "15%", height: "100%", left: "0%", top: "0%" }
        : { position: "relative", width: "100%", height: 100, left: "0%", top: 0 },
    signUpSidebarPanel:
      Platform.OS === "web" && Dimensions.get("window").width > 720
        ? {
            zIndex: 1,
            position: "fixed",
            left: 0,
            minWidth: 196,
            width: "15%",
            height: "100%",
            top: 0,
          }
        : {
            zIndex: 1,
            position: "relative",
            left: 0,
            width: "100%",
            height: 100 + insets.top,
            top: 0,
          },

    signUpSidebarLogo: {
      zIndex: 2,
      position: "absolute",
      left: 20,
      width: 156,
      height: 43,
      top:
        Platform.OS === "web" || Dimensions.get("window").width > 720 ? 20 : 20 + insets.top - 43,
    },
    signUpSidebarTextOneStory:
      Platform.OS === "web" && Dimensions.get("window").width > 720
        ? {
            zIndex: 3,
            position: "absolute",
            width: "80%",
            height: "10%",
            left: "10%",
            top: "40%",
            fontFamily: "Graphik-Bold-App",
            fontSize: 20,
            lineHeight: 30,
            color: "#000000",
          }
        : {
            display: "none",
            zIndex: 3,
            position: "absolute",
            width: "80%",
            height: "10%",
            left: "10%",
            top: "40%",
            fontFamily: "Graphik-Bold-App",
            fontSize: 24,
            lineHeight: 48,
            color: "#000000",
          },
    signUpSidebarText:
      Platform.OS === "web" && Dimensions.get("window").width > 720
        ? {
            zIndex: 3,
            position: "absolute",
            width: "80%",
            height: "10%",
            left: "10%",
            top: "40%",
            fontFamily: "Graphik-Bold-App",
            fontSize: 20,
            lineHeight: 30,
            color: "#FFFFFF",
          }
        : {
            display: "none",
            zIndex: 3,
            position: "absolute",
            width: "80%",
            height: "10%",
            left: "10%",
            top: "40%",
            fontFamily: "Graphik-Bold-App",
            fontSize: 24,
            lineHeight: 48,
            color: "#FFFFFF",
          },
    signUpSidebarProgressTextView: {
      zIndex: 3,
      position: "absolute",
      width: "100%",
      height: "100%",
      left: "0%",
      top: "0%",
    },
    signUpSidebarProgressText1:
      Platform.OS === "web" && Dimensions.get("window").width > 720
        ? {
            zIndex: 3,
            position: "absolute",
            width: "95%",
            height: "10%",
            left: "50px",
            top: "calc(40vh - 18px)",
            fontFamily: "Graphik-Bold-App",
            fontSize: 12,
            lineHeight: 48,
            color: "#FFFFFF",
          }
        : {
            zIndex: 3,
            position: "absolute",
            width: "50%",
            height: "10%",
            left: "65%",
            top: 20 + insets.top,
            fontFamily: "Graphik-Bold-App",
            fontSize: 12,
            lineHeight: 48,
            color: "#FFFFFF",
          },
    signUpSidebarProgressText2:
      Platform.OS === "web" && Dimensions.get("window").width > 720
        ? {
            zIndex: 3,
            position: "absolute",
            width: "95%",
            height: "10%",
            left: "50px",
            top: "calc(40vh + 36px)",
            fontFamily: "Graphik-Bold-App",
            fontSize: 12,
            lineHeight: 48,
            color: "#FFFFFF",
          }
        : {
            zIndex: 3,
            position: "absolute",
            width: "50%",
            height: "10%",
            left: "65%",
            top: 20 + insets.top,
            fontFamily: "Graphik-Bold-App",
            fontSize: 12,
            lineHeight: 48,
            color: "#FFFFFF",
          },
    signUpSidebarProgressText3:
      Platform.OS === "web" && Dimensions.get("window").width > 720
        ? {
            zIndex: 3,
            position: "absolute",
            width: "95%",
            height: "10%",
            left: "50px",
            top: "calc(40vh + 90px)",
            fontFamily: "Graphik-Bold-App",
            fontSize: 12,
            lineHeight: 48,
            color: "#FFFFFF",
          }
        : {
            zIndex: 3,
            position: "absolute",
            width: "50%",
            height: "10%",
            left: "65%",
            top: 20 + insets.top,
            fontFamily: "Graphik-Bold-App",
            fontSize: 12,
            lineHeight: 48,
            color: "#FFFFFF",
          },
    signUpSidebarProgressText4:
      Platform.OS === "web" && Dimensions.get("window").width > 720
        ? {
            zIndex: 3,
            position: "absolute",
            width: "95%",
            height: "10%",
            left: "50px",
            top: "calc(40vh + 144px)",
            fontFamily: "Graphik-Bold-App",
            fontSize: 12,
            lineHeight: 48,
            color: "#FFFFFF",
          }
        : {
            zIndex: 3,
            position: "absolute",
            width: "50%",
            height: "10%",
            left: "65%",
            top: 20 + insets.top,
            fontFamily: "Graphik-Bold-App",
            fontSize: 12,
            lineHeight: 48,
            color: "#FFFFFF",
          },
    signUpSidebarProgressText5:
      Platform.OS === "web" && Dimensions.get("window").width > 720
        ? {
            zIndex: 3,
            position: "absolute",
            width: "95%",
            height: "10%",
            left: "50px",
            top: "calc(40vh + 198px)",
            fontFamily: "Graphik-Bold-App",
            fontSize: 12,
            lineHeight: 48,
            color: "#FFFFFF",
          }
        : {
            zIndex: 3,
            position: "absolute",
            width: "50%",
            height: "10%",
            left: "65%",
            top: 20 + insets.top,
            fontFamily: "Graphik-Bold-App",
            fontSize: 12,
            lineHeight: 48,
            color: "#FFFFFF",
          },
    signUpSidebarProgress:
      Platform.OS === "web" && Dimensions.get("window").width > 720
        ? { zIndex: 3, position: "fixed", left: 20, width: 20, height: 300, top: "40%" }
        : {
            zIndex: 3,
            display: "none",
            position: "relative",
            left: 20,
            width: 20,
            height: 300,
            top: "40%",
          },
  })
  return (
    <View style={styles.signUpSidebarView}>
      {props.text == true ? (
        brand == "oneStory" ? (
          <Text style={styles.signUpSidebarTextOneStory}>
            Made by a church. Made for your church.
          </Text>
        ) : (
          <Text style={styles.signUpSidebarText}>
            It’s time to unite, equip, and amplify a Jesus-centred movement.{" "}
          </Text>
        )
      ) : (
        <View style={styles.signUpSidebarProgressTextView}>
          {Platform.OS === "web" && Dimensions.get("window").width > 720 ? (
            <>
              <Text style={styles.signUpSidebarProgressText1}>Account Creation</Text>
              <Text style={styles.signUpSidebarProgressText2}>Authentication</Text>
              <Text style={styles.signUpSidebarProgressText3}>Payment</Text>
              <Text style={styles.signUpSidebarProgressText4}>About You</Text>
              <Text style={styles.signUpSidebarProgressText5}>Get In</Text>
            </>
          ) : (
            <>
              {props.position === "1" ? (
                <Text style={styles.signUpSidebarProgressText1}>Account Creation</Text>
              ) : props.position === "2" ? (
                <Text style={styles.signUpSidebarProgressText2}>Authentication</Text>
              ) : props.position === "3" ? (
                <Text style={styles.signUpSidebarProgressText3}>Payment</Text>
              ) : props.position === "4" ? (
                <Text style={styles.signUpSidebarProgressText4}>Individual Profile</Text>
              ) : props.position === "5" ? (
                <Text style={styles.signUpSidebarProgressText5}>Get In</Text>
              ) : (
                <Text style={styles.signUpSidebarProgressText5}>Welcome</Text>
              )}
            </>
          )}
          {props.position == "1" ? (
            <Image
              source={
                brand == "oneStory"
                  ? require("../../assets/SignUp/progress-1-oneStory.png")
                  : require("../../assets/SignUp/progress-1.png")
              }
              style={styles.signUpSidebarProgress}
            />
          ) : null}
          {props.position == "2" ? (
            <Image
              source={
                brand == "oneStory"
                  ? require("../../assets/SignUp/progress-2-oneStory.png")
                  : require("../../assets/SignUp/progress-2.png")
              }
              style={styles.signUpSidebarProgress}
            />
          ) : null}
          {props.position == "3" ? (
            <Image
              source={
                brand == "oneStory"
                  ? require("../../assets/SignUp/progress-3-oneStory.png")
                  : require("../../assets/SignUp/progress-3.png")
              }
              style={styles.signUpSidebarProgress}
            />
          ) : null}
          {props.position == "4" ? (
            <Image
              source={
                brand == "oneStory"
                  ? require("../../assets/SignUp/progress-4-oneStory.png")
                  : require("../../assets/SignUp/progress-4.png")
              }
              style={styles.signUpSidebarProgress}
            />
          ) : null}
        </View>
      )}
      {brand != "oneStory" ? (
        <Image
          source={require("../../assets/JC-Logo-RGB-KO2.png")}
          style={styles.signUpSidebarLogo}
        />
      ) : null}
      {brand == "oneStory" ? (
        <Image
          source={require("../../assets/SignUp/logo-one-story.png")}
          style={styles.signUpSidebarLogo}
        />
      ) : null}
      {brand == "oneStory" ? (
        <Image
          source={require("../../assets/leftPanel-oneStory.jpg")}
          style={styles.signUpSidebarPanel}
        />
      ) : (
        <Image source={require("../../assets/leftPanel.png")} style={styles.signUpSidebarPanel} />
      )}
    </View>
  )
}
