import { Button } from "native-base"
import React from "react"
import { Text } from "react-native"
import JCComponent from "../JCComponent/JCComponent"
import styles from "./JCButtonStyle"

export enum ButtonTypes {
  AdminModal,
  AdminModalOrange,
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
  SolidSignIn,
  SolidSignIn2,
  DisabledSignIn,
  SolidCreateAccount,
  SolidProfileDelete,
  SolidProfile,
  SolidProfileName,
  SolidAboutMe,
  SolidMap,
  SolidResources,
  SolidRightMargin,
  SolidRightJustified,
  SolidRightJustifiedMini,
  SolidRightJustifiedTopMini,
  Outline,
  OutlineBold,
  OutlineBoldNoMargin,
  OutlineSmall,
  PostOutline,
  Transparent,
  TransparentNoPadding,
  TransparentCourse,
  TransparentActivityCourse,
  TransparentBoldBlack,
  TransparentBoldBlackNoMargin,
  TransparentBoldBlackNoMarginv2,
  TransparentBoldGreyNoMargin,
  TransparentBoldOrange,
  TransparentBoldOrangeMap,
  TransparentRegularOrange,
  MoreSeriesOutlineBold,
  EditButton,
  EditButtonv2,
  ResourceModal,
  ResourceModalSolid,
  ResourceModalTransparent,
}
export interface Props {
  enabled?: boolean
  onPress(): any
  children: any
  buttonType: ButtonTypes
  testID?: any
}
class JCButton extends JCComponent<Props> {
  static defaultProps = {
    enabled: true,
  }
  constructor(props: Props) {
    super(props)
  }
  onPress(): void {
    this.props.onPress()
  }
  render(): React.ReactNode {
    return (
      <Button
        disabled={!this.props.enabled}
        testID={this.props.testID + "-" + this.props.enabled}
        style={[
          styles[ButtonTypes[this.props.buttonType] + "Button"],
          !this.props.enabled ? styles[ButtonTypes[this.props.buttonType] + "ButtonDisabled"] : "",
        ]}
        onPress={() => {
          this.onPress()
        }}
      >
        <Text style={styles[ButtonTypes[this.props.buttonType] + "Text"]}>
          {this.props.children}
        </Text>
      </Button>
    )
  }
}

export default JCButton
