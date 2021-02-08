import { MaterialCommunityIcons } from "@expo/vector-icons"
import React, { useState } from "react"
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native"
import JCButton, { ButtonTypes } from "../../components/Forms/JCButton"
import HelpModalStyles from "../HelpModal/HelpModalStyles"

interface Props {
  setShow: () => void
}

export default function HelpModal({ setShow }: Props): JSX.Element {
  const [formData, setformData] = useState({
    content: "",
    sender: "",
  })
  const [sent, setSent] = useState(false)
  const [errorMsg, setErrorMsg] = useState("We were unable to complete your request")
  if (sent) {
    return (
      <View style={HelpModalStyles.HelpModalContainer}>
        <TouchableOpacity
          onPress={() => setShow()}
          style={{ padding: 16, position: "absolute", right: 25, top: 18 }}
        >
          <MaterialCommunityIcons name="close-thick" size={24} color="black" />
        </TouchableOpacity>
        {errorMsg === "" ? (
          <View>
            <Text style={HelpModalStyles.HelpModalHeader}>Message sent</Text>
            <Text style={HelpModalStyles.HelpModalLabel}>
              We will get back to you as soon as we can
            </Text>
            <View
              style={{
                flex: 1,
              }}
            >
              <Image
                style={{
                  marginTop: 30,
                  height: 140,
                  width: 140,
                  alignSelf: "center",
                }}
                source={require("../../assets/svg/checkmark-stroke.svg")}
              ></Image>
            </View>
          </View>
        ) : (
          <View>
            <Text style={HelpModalStyles.HelpModalHeader}>Sorry, an error occurred</Text>
            <Text style={HelpModalStyles.HelpModalLabel}>{errorMsg}</Text>
            <Text style={HelpModalStyles.HelpModalLabel}>Please try again later</Text>
          </View>
        )}
      </View>
    )
  }
  return (
    <View style={HelpModalStyles.HelpModalContainer}>
      <TouchableOpacity
        onPress={() => setShow()}
        style={{ padding: 16, position: "absolute", right: 25, top: 18 }}
      >
        <MaterialCommunityIcons name="close-thick" size={24} color="black" />
      </TouchableOpacity>
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
          setSent(true)
        }}
      >
        Send
      </JCButton>
    </View>
  )
}
