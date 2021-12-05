import React from "react"
import { Image, TouchableOpacity, View } from "react-native"

type ControlItem = {
  action: () => null
  icon: string
}

type Props = {
  controls: ControlItem[]
}

export const HeaderControls = (props: Props) => {
  const { controls } = props
  return (
    <View
      style={{
        position: "absolute",
        right: 0,
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      {controls.map((controlItem, index) => {
        const isLastItem = index === controls.length - 1
        return (
          <TouchableOpacity
            onPress={controlItem.action}
            style={isLastItem ? { paddingLeft: 8 } : { paddingHorizontal: 8 }}
          >
            <Image
              source={require(`../../assets/header/${controlItem.icon}.png`)}
              style={{ width: 24, height: 24 }}
            />
          </TouchableOpacity>
        )
      })}
    </View>
  )
}
