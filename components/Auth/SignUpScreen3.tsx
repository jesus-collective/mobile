import { NavigationProp, useNavigation, useRoute } from "@react-navigation/native"
import { Amplify } from "aws-amplify"
import React from "react"
import { View } from "react-native"
import JCButton, { ButtonTypes } from "../../components/Forms/JCButton"
import JCComponent, { JCState } from "../../components/JCComponent/JCComponent"
import MyProfile from "../../components/MyProfile/MyProfile"
import OrganizationViewer from "../../components/OrganizationViewer/OrganizationViewer"
import SignUpSidebar from "../../components/SignUpSidebar/SignUpSidebar"
import { PaidStatus, ProfileStatus, UserContext } from "../../screens/HomeScreen/UserContext"
import awsConfig from "../../src/aws-exports"
import { Brand } from "../../src/Brand"
Amplify.configure(awsConfig)

interface Props {
  navigation?: NavigationProp<any, any>
  route?: any
  authState?: string
}

interface State extends JCState {
  groups: unknown
  selected: "profile" | "organization"
  profileComplete: boolean
  orgComplete: boolean
}

class SignUpScreen3Impl extends JCComponent<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      ...super.getInitialState(),
      groups: null,
      selected: "profile",
      profileComplete: false,
      orgComplete: false,
    }
  }

  static UserConsumer = UserContext.Consumer
  onFinalizeProfile(actions: any): void {
    actions.updateHasCompletedPersonalProfile()
  }
  render(): React.ReactNode {
    const brand = Brand()
    return (
      <SignUpScreen3Impl.UserConsumer>
        {({ userState, userActions }) => {
          if (!userState) return null

          if (
            userState.hasPaidState == PaidStatus.Success &&
            userState.hasCompletedPersonalProfile == ProfileStatus.Incomplete
          ) {
            return (
              <View style={this.styles.style.signUpScreen1PaymentBody}>
                <SignUpSidebar position="4"></SignUpSidebar>

                {userState.isOrg ? (
                  <>
                    <View style={this.styles.style.signUpProfile}>
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
                            borderBottomWidth: this.state.selected === "profile" ? 7 : 0,
                            borderBottomColor:
                              brand == "oneStory" ? "rgb(255, 198, 41)" : "#F0493E",
                          }}
                        >
                          <JCButton
                            buttonType={
                              this.state.selected === "profile"
                                ? ButtonTypes.TransparentBoldBlackNoMargin
                                : ButtonTypes.TransparentBoldGreyNoMargin
                            }
                            onPress={() => this.setState({ selected: "profile" })}
                          >
                            Individual Profile
                          </JCButton>
                        </View>
                        <View
                          style={{
                            paddingVertical: 5,
                            borderBottomWidth: this.state.selected === "organization" ? 7 : 0,
                            borderBottomColor:
                              brand == "oneStory" ? "rgb(255, 198, 41)" : "#F0493E",
                          }}
                        >
                          <JCButton
                            buttonType={
                              this.state.selected === "organization"
                                ? ButtonTypes.TransparentBoldBlackNoMargin
                                : ButtonTypes.TransparentBoldGreyNoMargin
                            }
                            onPress={() => this.setState({ selected: "organization" })}
                          >
                            Organization Profile
                          </JCButton>
                        </View>
                      </View>
                    </View>

                    {this.state.selected === "profile" ? (
                      <View style={this.styles.style.signUpProfileOrg}>
                        <MyProfile
                          hideOrg
                          finalizeProfile={() => {
                            this.setState({ selected: "organization" })
                          }}
                        />
                      </View>
                    ) : (
                      <View style={this.styles.style.signUpProfileOrg}>
                        <OrganizationViewer
                          finalizeProfile={() => {
                            this.onFinalizeProfile(userActions)
                          }}
                          create={false}
                          loadId={userState.orgId}
                        />
                      </View>
                    )}
                  </>
                ) : (
                  <View style={this.styles.style.signUpProfile}>
                    <MyProfile
                      finalizeProfile={() => {
                        this.onFinalizeProfile(userActions)
                      }}
                    />
                  </View>
                )}
              </View>
            )
          } else return null
        }}
      </SignUpScreen3Impl.UserConsumer>
    )
  }
}

export default function SignUpScreen3(props: Props): JSX.Element {
  const route = useRoute()
  const navigation = useNavigation()
  return <SignUpScreen3Impl {...props} navigation={navigation} route={route} />
}
