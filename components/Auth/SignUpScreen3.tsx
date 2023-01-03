import { Amplify } from "aws-amplify"
import React, { useContext, useState } from "react"
import { Dimensions, Platform, StyleSheet, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import JCButton, { ButtonTypes } from "../../components/Forms/JCButton"
import MyProfile from "../../components/MyProfile/MyProfile"
import OrganizationViewer from "../../components/OrganizationViewer/OrganizationViewer"
import SignUpSidebar from "../../components/SignUpSidebar/SignUpSidebar"
import { PaidStatus, ProfileStatus, UserContext } from "../../screens/HomeScreen/UserContext"
import awsConfig from "../../src/aws-exports"
import { Brand } from "../../src/Brand"

Amplify.configure(awsConfig)

export default function SignUpScreen3() {
  const [selected, setSelected] = useState<"profile" | "organization">("profile")
  const insets = useSafeAreaInsets()

  const UserConsumer = useContext(UserContext)
  const onFinalizeProfile = (actions: any): void => {
    actions.updateHasCompletedPersonalProfile()
  }

  const brand = Brand()
  const styles = StyleSheet.create({
    signUpScreen1PaymentBody:
      Platform.OS === "web" && Dimensions.get("window").width > 720
        ? { width: "100%", left: 0, top: 0, height: "100%" }
        : { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, flex: 1 },
    signUpProfile:
      Platform.OS === "web" && Dimensions.get("window").width > 1024
        ? { position: "absolute", left: "20%", width: "78%", top: 10 }
        : Platform.OS === "web" && Dimensions.get("window").width > 768
        ? { position: "absolute", left: "24%", width: "74%", top: 10 }
        : Platform.OS === "web" && Dimensions.get("window").width > 720
        ? { position: "absolute", left: "28%", width: "78%", top: 10 }
        : {
            position: "absolute",
            left: "0%",
            width: "100%",
            top: 100 + insets.top,
            height: Dimensions.get("window").height - 100 + insets.top,
          },

    signUpProfileOrg:
      Platform.OS === "web" && Dimensions.get("window").width > 1024
        ? {
            position: "absolute",
            left: "20%",
            width: "78%",
            top: 100,
            height: Dimensions.get("window").height - 100,
          }
        : Platform.OS === "web" && Dimensions.get("window").width > 768
        ? {
            position: "absolute",
            left: "24%",
            width: "74%",
            top: 100,
            height: Dimensions.get("window").height - 100,
          }
        : Platform.OS === "web" && Dimensions.get("window").width > 720
        ? {
            position: "absolute",
            left: "28%",
            width: "78%",
            top: 100,
            height: Dimensions.get("window").height - 100,
          }
        : {
            position: "absolute",
            left: "0%",
            width: "100%",
            top: 200 + insets.top,
            height: Dimensions.get("window").height - 200 + insets.top,
          },
  })
  if (!UserConsumer.userState) return null

  if (
    UserConsumer.userState.hasPaidState == PaidStatus.Success &&
    UserConsumer.userState.hasCompletedPersonalProfile == ProfileStatus.Incomplete
  ) {
    return (
      <View style={styles.signUpScreen1PaymentBody}>
        <SignUpSidebar position="4"></SignUpSidebar>

        {UserConsumer.userState.isOrg ? (
          <>
            <View style={styles.signUpProfile}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  paddingLeft: 30,
                  borderBottomColor: "#33333320",
                  borderBottomWidth: 1,
                }}
              >
                <View
                  style={{
                    marginRight: 15,
                    paddingVertical: 5,
                    borderBottomWidth: selected === "profile" ? 7 : 0,
                    borderBottomColor: brand == "oneStory" ? "rgb(255, 198, 41)" : "#F0493E",
                  }}
                >
                  <JCButton
                    buttonType={
                      selected === "profile"
                        ? ButtonTypes.TransparentBoldBlackNoMargin
                        : ButtonTypes.TransparentBoldGreyNoMargin
                    }
                    onPress={() => setSelected("profile")}
                  >
                    Individual Profile
                  </JCButton>
                </View>
                <View
                  style={{
                    paddingVertical: 5,
                    borderBottomWidth: selected === "organization" ? 7 : 0,
                    borderBottomColor: brand == "oneStory" ? "rgb(255, 198, 41)" : "#F0493E",
                  }}
                >
                  <JCButton
                    buttonType={
                      selected === "organization"
                        ? ButtonTypes.TransparentBoldBlackNoMargin
                        : ButtonTypes.TransparentBoldGreyNoMargin
                    }
                    onPress={() => setSelected("organization")}
                  >
                    Organization Profile
                  </JCButton>
                </View>
              </View>
            </View>

            {selected === "profile" ? (
              <View style={styles.signUpProfileOrg}>
                <MyProfile
                  hideOrg
                  finalizeProfile={() => {
                    setSelected("organization")
                  }}
                />
              </View>
            ) : (
              <View style={styles.signUpProfileOrg}>
                <OrganizationViewer
                  finalizeProfile={() => {
                    onFinalizeProfile(UserConsumer.userActions)
                  }}
                  create={false}
                  loadId={UserConsumer.userState.orgId}
                />
              </View>
            )}
          </>
        ) : (
          <View style={styles.signUpProfile}>
            <MyProfile
              finalizeProfile={() => {
                onFinalizeProfile(UserConsumer.userActions)
              }}
            />
          </View>
        )}
      </View>
    )
  } else return null
}
