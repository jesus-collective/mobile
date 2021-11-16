import React from "react"
import { Image, Text, TouchableOpacity } from "react-native"
interface Props {
  label: string
  action: () => void
  style: {
    ButtonStyle: any
    LabelStyle: any
    custom?: any
  }
  icon?: any
  disabled?: boolean
}

export default function GenericButton(props: Props) {
  const { label, action, style, icon, disabled } = props

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={action}
      style={[{ flexDirection: "row", justifyContent: "center" }, style.ButtonStyle, style.custom]}
    >
      {icon ? (
        <Image
          style={{ width: 24, height: 24, marginRight: 8 }}
          source={require(`../../assets/Facelift/${icon}.png`)}
        />
      ) : null}
      <Text style={style.LabelStyle}>{label}</Text>
    </TouchableOpacity>
  )
}
