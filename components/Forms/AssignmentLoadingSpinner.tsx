import React from "react"
import { ActivityIndicator } from "react-native"
const AssignmentLoadingSpinner = (): JSX.Element => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "column",
        marginTop: 40,
        minHeight: 400,
      }}
    >
      <ActivityIndicator color="#F0493E" size="large"></ActivityIndicator>
      <p style={{ marginTop: 12, fontFamily: "Graphik-Bold-App", fontSize: 16 }}>
        Loading assignments...
      </p>
    </div>
  )
}
export default AssignmentLoadingSpinner
