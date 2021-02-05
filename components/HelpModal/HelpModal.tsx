import React, { useState } from "react"
import { Text, TextInput, View } from "react-native"
import JCButton, { ButtonTypes } from "../../components/Forms/JCButton"
import HelpModalStyles from "../HelpModal/HelpModalStyles"

export default function HelpModal(): JSX.Element {
  const [formData, setformData] = useState({
    content: "",
    sender: "",
  })
  return (
    <View style={HelpModalStyles.HelpModalContainer}>
      <Text style={HelpModalStyles.HelpModalHeader}>How can we assist?</Text>
      <TextInput
        multiline
        numberOfLines={8}
        placeholder="Describe what problems you are experiencing..."
        style={HelpModalStyles.HelpModalTextArea}
        autoCapitalize="sentences"
        autoFocus
        keyboardType="default"
        maxLength={1500}
        onChangeText={(text) => setformData({ ...formData, content: text })}
      ></TextInput>
      <JCButton
        buttonType={ButtonTypes.SolidRightJustified}
        onPress={() => {
          console.log("")
        }}
      >
        Send
      </JCButton>
    </View>
  )
}
