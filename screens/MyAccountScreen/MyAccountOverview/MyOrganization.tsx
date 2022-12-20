import React from "react"
import { StyleSheet, Text, View } from "react-native"
export default function MyOrganization() {
  return (
    <View>
      <Text style={style.Header}>Organization Information</Text>
      <View style={style.HeaderHorizontalLine} />
      <View style={style.Container}>
        <View style={{ height: 100 }}></View>
      </View>
    </View>
  )
}
const style = StyleSheet.create({
  Container: {
    marginTop: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderColor: "#E4E1E1",
    borderWidth: 1,
    marginBottom: 48,
  },
  Header: {
    color: "#483938",
    fontSize: 12,
    fontFamily: "Graphik-Medium-App",
    flex: 1,
    lineHeight: 16,
    letterSpacing: 1,
    textTransform: "uppercase",
    paddingBottom: 6,
  },
  HeaderHorizontalLine: {
    borderTopWidth: 1,
    borderColor: "#E4E1E1",
  },
})
