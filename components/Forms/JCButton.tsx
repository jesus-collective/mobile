import React from "react"
import { ActivityIndicator, Pressable, Text, View } from "react-native"
import JCComponent from "../JCComponent/JCComponent"
import styles from "./JCButtonStyle"

export enum ButtonTypes {
  AdminModal,
  AdminModalOrange,
  OutlineSmallRounded,
  AdminOutline,
  AdminSmallOutline,
  AdminAdd,
  AdminInvite,
  CourseSideBar,
  CourseSideBarFirst,
  CourseHome,
  CourseHomeSidebarTop,
  CourseTransparentBoldOrange,
  courseTransparentRegularBlack,
  courseActivityTransparentRegularBlack,
  courseCardSolid,
  courseAssignment,
  courseMktOutlineBoldNoMargin,
  CourseZoom,
  Solid,
  SolidOneStory,
  SolidSignIn,
  SolidSignInOneStory,
  SolidSignIn2,
  SolidSignIn2OneStory,
  DisabledSignIn,
  SolidCreateAccount,
  SolidCreateAccountOneStory,
  SolidProfileDelete,
  SolidProfileDeleteOneStory,
  SolidProfile,
  SolidProfileOneStory,
  SolidProfileName,
  SolidAboutMe,
  SolidAboutMeOneStory,
  SolidMap,
  SolidResources,
  SolidRightMargin,
  SolidRightMarginOneStory,
  SolidRightJustified,
  SolidRightJustifiedMini,
  SolidRightJustifiedTopMini,
  Outline,
  OutlineBold,
  OutlineBoldNoMargin,
  OutlineSmall,
  PostOutline,
  ProfileSmall,
  Transparent,
  TransparentNoPadding,
  TransparentCourse,
  TransparentActivityCourse,
  TransparentBoldBlack,
  TransparentBoldBlackNoMargin,
  TransparentBoldGreyNoMargin,
  TransparentBoldOrange,
  TransparentBoldOrangeMap,
  TransparentRegularOrange,
  MoreSeriesOutlineBold,
  EditButton,
  ResourceModal,
  ResourceModalSolid,
  ResourceModalTransparent,
  UpgradeToDownload,
}
export interface Props {
  enabled?: boolean
  onPress(): any //Promise<void> | void | null
  children: any
  buttonType: ButtonTypes
  testID?: any
  accessibilityLabel?: string
  accessibilityHint?: string
}
class JCButton extends JCComponent<Props> {
  static defaultProps = {
    enabled: true,
  }
  constructor(props: Props) {
    super(props)
    this.state = {
      busy: false,
    }
  }
  setBusy(): void {
    this.setState({ busy: true })
  }
  setNotBusy(): void {
    this.setState({ busy: false })
  }
  async onPress(): Promise<void> {
    this.setBusy()
    await this.props.onPress()
    this.setNotBusy()
  }
  determineSpinnerColor(): string {
    // This can be used for changing color depending on button background color
    if (this.props.buttonType === 34) {
      return "#F0493E"
    } else {
      return "white"
    }
  }
  render(): React.ReactNode {
    return (
      <Pressable
        accessible
        accessibilityState={{ disabled: !this.props.enabled || this.state.busy }}
        accessibilityLabel={this.props.accessibilityLabel}
        accessibilityHint={this.props.accessibilityHint}
        accessibilityRole="button"
        disabled={!this.props.enabled || this.state.busy}
        testID={this.props.testID + "-" + this.props.enabled}
        style={[
          { alignSelf: "flex-start" },
          styles[ButtonTypes[this.props.buttonType] + "Button"],
          !this.props.enabled ? styles[ButtonTypes[this.props.buttonType] + "ButtonDisabled"] : "",
        ]}
        onPress={() => {
          this.onPress()
        }}
      >
        <Text style={styles[ButtonTypes[this.props.buttonType] + "Text"]}>
          <Text style={this.state.busy ? { color: "transparent" } : {}}>{this.props.children}</Text>
          {this.state.busy ? (
            <View style={{ position: "absolute", left: 0, right: 0, alignItems: "center" }}>
              <ActivityIndicator color={this.determineSpinnerColor()}></ActivityIndicator>
            </View>
          ) : null}
        </Text>
      </Pressable>
    )
  }
}

export default JCButton
