import { useState } from "react"
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native"
import { ButtonStyles } from "./JCButtonStyle"

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
JCButton.defaultProps = {
  enabled: true,
}
function JCButton(props: Props) {
  const [busy, setBusy] = useState<boolean>(false)

  const onPress = async (): Promise<void> => {
    setBusy(true)
    await props.onPress()
    setBusy(false)
  }

  const determineSpinnerColor = (): string => {
    // This can be used for changing color depending on button background color
    if (props.buttonType === 34) {
      return "#F0493E"
    } else {
      return "white"
    }
  }
  const styles = StyleSheet.create(ButtonStyles)
  return (
    <Pressable
      accessible
      accessibilityState={{ disabled: !props.enabled || busy }}
      accessibilityLabel={props.accessibilityLabel}
      accessibilityHint={props.accessibilityHint}
      accessibilityRole="button"
      disabled={!props.enabled || busy}
      testID={props.testID + "-" + props.enabled}
      style={[
        { justifyContent: "center", alignItems: "center", alignSelf: "flex-start" },
        styles[ButtonTypes[props.buttonType] + "Button"],
        !props.enabled ? styles[ButtonTypes[props.buttonType] + "ButtonDisabled"] : "",
      ]}
      onPress={() => {
        onPress()
      }}
    >
      <Text style={styles[ButtonTypes[props.buttonType] + "Text"]}>
        <Text style={busy ? { color: "transparent" } : {}}>{props.children}</Text>
        {busy ? (
          <View style={{ position: "absolute", left: 0, right: 0, alignItems: "center" }}>
            <ActivityIndicator color={determineSpinnerColor()}></ActivityIndicator>
          </View>
        ) : null}
      </Text>
    </Pressable>
  )
}

export default JCButton
