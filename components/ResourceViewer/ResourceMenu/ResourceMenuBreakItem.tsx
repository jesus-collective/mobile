import { Ionicons } from "@expo/vector-icons"
import React from "react"
import { Pressable, View } from "react-native"
type ResourceMenuBreakItemProps = {
  deleteItem: () => any
  isEditable?: boolean
  style: View["props"]["style"]
}

export default function ResourceMenuBreakItem({
  deleteItem,
  isEditable,
  style,
}: ResourceMenuBreakItemProps) {
  return (
    <View style={{ flexDirection: "row" }}>
      <View style={style}></View>
      {isEditable && (
        <Pressable onPress={deleteItem}>
          <Ionicons name="ios-close" style={{ width: 20, height: 20 }} />
        </Pressable>
      )}
    </View>
  )
}
