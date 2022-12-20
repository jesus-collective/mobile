import React from "react"
import MyAccount from "./MyAccount"
import { MyAccountProvider } from "./MyAccountContext"
export default function MyAccountScreen() {
  return (
    <MyAccountProvider>
      <MyAccount />
    </MyAccountProvider>
  )
}
