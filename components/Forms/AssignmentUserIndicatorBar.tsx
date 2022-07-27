import React from "react"
import { Text, View } from "react-native"

const AssignmentUserIndicatorBar = ({ label }: { label: string }): JSX.Element => {
  let bgColor
  switch (label) {
    case "Assignment":
      bgColor = "#F0493E"
      break
    case "Update Assignment":
      bgColor = "#F0493E"
      break
    default:
      bgColor = "#71C209"
      break
  }
  return (
    <View
      style={{
        padding: 4,
        paddingLeft: 12,
        marginTop: 20,
        backgroundColor: bgColor,
        borderRadius: 4,
      }}
    >
      <Text
        style={{
          color: "#ffffff",
          fontSize: 18,
          fontFamily: "Graphik-Bold-App",
          alignSelf: "flex-start",
        }}
      >
        {label}
      </Text>
    </View>
  )
}

export default AssignmentUserIndicatorBar
