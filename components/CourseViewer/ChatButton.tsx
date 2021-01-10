import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons"
import React from "react"
import { Dimensions, Text, TouchableOpacity } from "react-native"

interface Props {
  setShowChat: () => void
  floating?: boolean
}

export default function ChatButton({ setShowChat, floating }: Props) {
  const { height } = Dimensions.get("window")

  if (floating) {
    return (
      <TouchableOpacity
        style={{
          position: "absolute",
          zIndex: 9999,
          bottom: 25,
          right: 25,
          width: 50,
          height: 50,
          borderRadius: 50,
          backgroundColor: "#F0493E",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => setShowChat()}
      >
        <MaterialCommunityIcons name="chat" size={24} color="white" />
      </TouchableOpacity>
    )
  }

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
