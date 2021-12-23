import React from "react"
import { ActivityIndicator, Image, Text, TouchableOpacity } from "react-native"
interface Props {
  label: string
  action: () => void
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

export default function GenericButton(props: Props) {
  const { label, action, style, icon, disabled, spinner } = props

  return (
    <TouchableOpacity
      disabled={disabled || spinner}
      onPress={action}
      style={[{ flexDirection: "row", justifyContent: "center" }, style.ButtonStyle, style.custom]}
    >
      {icon ? (
        <Image
          style={{ width: 24, height: 24, marginRight: 8 }}
          source={require(`../../assets/Facelift/${icon}.png`)}
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
