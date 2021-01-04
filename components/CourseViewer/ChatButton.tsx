import { AntDesign } from "@expo/vector-icons"
import React from "react"
import { Dimensions, Text, TouchableOpacity } from "react-native"

interface Props {
  setShowChat: () => void
}

export default function ChatButton({ setShowChat }: Props) {
  const { height } = Dimensions.get("window")

  return (
    <TouchableOpacity
      onPress={() => setShowChat()}
      style={{
        position: "absolute",
        zIndex: 9999,
        right: 0,
        top: height * 0.32 + 56,
        backgroundColor: "white",
        width: 96,
        height: 60,
        shadowColor: "#333333",
        shadowRadius: 15,
        shadowOffset: { width: 1, height: 3 },
        shadowOpacity: 0.7,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <AntDesign name="left" size={24} color="#333333" />
      <Text
        style={{
          fontFamily: "Graphik-Regular-App",
          color: "#333333",
          fontSize: 20,
          marginLeft: 5,
          paddingBottom: 2,
        }}
      >
        Chat
      </Text>
    </TouchableOpacity>
  )
}
