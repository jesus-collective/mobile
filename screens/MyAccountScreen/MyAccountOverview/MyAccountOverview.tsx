import React from "react"
import { StyleSheet, View } from "react-native"
import MyAccountSummary from "./MyAccountSummary"
import MyInformation from "./MyInformation"
export default function MyAccountOverview() {
  return (
    <View>
      <MyInformation />
      <MyAccountSummary />
    </View>
  )
}
const style = StyleSheet.create({})
