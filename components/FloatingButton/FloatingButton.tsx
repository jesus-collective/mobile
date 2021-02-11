import React from "react"
import { Dimensions, StyleProp, Text, TextStyle, TouchableOpacity, ViewStyle } from "react-native"
interface Props {
  setShow: () => void
  smallIcon?: JSX.Element
  label: string
  largeIcon?: JSX.Element
  customStyle?: StyleProp<ViewStyle>
  customLabelStyle?: StyleProp<TextStyle>
}
export default function FloatingButton({
  largeIcon,
  smallIcon,
  setShow,
  label,
  customStyle,
  customLabelStyle,
}: Props): JSX.Element {
  const smallScreen = Dimensions.get("window").width < 563
  return (
    <TouchableOpacity style={customStyle} onPress={() => setShow()}>
      {smallScreen ? smallIcon : largeIcon}
      {smallScreen ? null : <Text style={customLabelStyle}>{label}</Text>}
    </TouchableOpacity>
  )
}
