import React from "react"
import { Image, StyleSheet, TouchableOpacity, View } from "react-native"

type ControlItem = {
  action: () => null
  icon: string
}

type Props = {
  controls: ControlItem[]
}

const style = StyleSheet.create({
  Icon: {
    width: 24,
    height: 24,
  },
  Container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  LastItem: {
    paddingLeft: 8,
  },
  Item: {
    paddingHorizontal: 8,
  },
})

export const HeaderControls = (props: Props) => {
  const { controls } = props
  return (
    <View style={style.Container}>
      {controls.map((controlItem, index) => {
        const isLastItem = index === controls.length - 1
        return (
          <TouchableOpacity
            key={controlItem.icon}
            onPress={controlItem.action}
            style={isLastItem ? style.LastItem : style.Item}
          >
            <Image
              source={require(`../../assets/header/${controlItem.icon}.png`)}
              style={style.Icon}
            />
          </TouchableOpacity>
        )
      })}
    </View>
  )
}
