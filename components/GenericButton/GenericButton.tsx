import React, { useEffect, useState } from "react"
import { ActivityIndicator, Image, Platform, Text, TouchableOpacity } from "react-native"
interface Props {
  label: string
  action: () => void | Promise<void>
  style: {
    ButtonStyle: any
    LabelStyle: any
    custom?: any
    customLabel?: any
  }
  icon?: any
  disabled?: boolean
  spinner?: boolean
}
interface TouchableOpacityWithListener extends TouchableOpacity {
  addEventListener: any
  removeEventListener: any
}
export default function GenericButton(props: Props) {
  const { label, action, style, icon, disabled, spinner } = props
  const [hovered, setHovered] = useState(false)
  const buttonRef = React.createRef<TouchableOpacityWithListener>()
  useEffect(() => {
    const button = buttonRef.current
    const handleHover = (action: string) => {
      if (!disabled) {
        if (action === "mouseIn") setHovered(true)
        else if (action === "mouseOut") setHovered(false)
      }
    }
    if (Platform.OS === "web")
      if (button) {
        button.addEventListener("mouseenter", () => handleHover("mouseIn"))
        button.addEventListener("mouseleave", () => handleHover("mouseOut"))
      }
    return () => {
      if (Platform.OS === "web")
        if (button) {
          button.removeEventListener("mouseenter", () => handleHover("mouseIn"))
          button.removeEventListener("mouseleave", () => handleHover("mouseOut"))
        }
    }
  }, [disabled, buttonRef])
  return (
    <TouchableOpacity
      ref={buttonRef}
      disabled={disabled || spinner}
      onPress={action}
      style={[
        { flexDirection: "row", justifyContent: "center" },
        style.ButtonStyle,
        style.custom,
        hovered ? { opacity: 0.8 } : {},
      ]}
    >
      {icon ? (
        <Image
          style={{ width: 24, height: 24, marginRight: 10 }}
          source={require(`../../assets/Facelift/svg/${icon}.svg`)}
        />
      ) : null}
      {spinner ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text style={[style.LabelStyle, style.customLabel]}>{label}</Text>
      )}
    </TouchableOpacity>
  )
}
