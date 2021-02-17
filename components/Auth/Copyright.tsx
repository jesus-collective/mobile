import React from "react"
import { View, Text } from "react-native"
import { isMobile } from "react-device-detect"

export function Copyright(props: { marginTop?: number }): JSX.Element {
  return (
    <View
      style={{
        justifyContent: "flex-end",
        alignSelf: "center",
        marginBottom: 30,
        marginTop: props.marginTop ?? 30,
        flexWrap: "wrap",
        marginRight: 20,
        marginLeft: isMobile ? 10 : null,
      }}
    >
      <Text
        style={{ fontFamily: "Graphik-Regular-App", fontSize: 14, color: "#333333", opacity: 0.7 }}
      >
        Copyright &copy; {new Date().getFullYear()} Jesus Collective. All rights reserved.
      </Text>
    </View>
  )
}
