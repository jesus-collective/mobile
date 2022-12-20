import React, { useContext } from "react"
import { isMobileOnly } from "react-device-detect"
import { StyleSheet, Text, View } from "react-native"
import { MyAccountContext } from "../MyAccountContext"
export default function MyAccountSummary() {
  const { state } = useContext(MyAccountContext)
  if (!state.user) return null
  return (
    <View style={isMobileOnly ? { padding: 12, paddingBottom: 85 } : {}}>
      <Text style={style.Header}>Account Summary</Text>
      <View style={style.HeaderHorizontalLine} />
      <View style={style.Container}>
        <View style={{ flex: 1, padding: 16 }}>
          <Text style={style.PrimaryText}>{state.user.mainUserGroup} Account</Text>
        </View>
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
  PrimaryText: {
    color: "#1A0706",
    fontFamily: "Graphik-Medium-App",
    fontSize: 24,
  },
  HeaderHorizontalLine: {
    borderTopWidth: 1,
    borderColor: "#E4E1E1",
  },
})
