import { MaterialCommunityIcons } from "@expo/vector-icons"
import { Auth } from "aws-amplify"
import React, { useEffect, useState } from "react"
import { ActivityIndicator, Image, Text, TextInput, TouchableOpacity, View } from "react-native"
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
  const [errorMsg, setErrorMsg] = useState("")
  const [isLoading, setisLoading] = useState(true)
  const [showEmailField, setShowEmailField] = useState(false)
  const sendMessage = async () => {
    const success = true
    if (success) {
      setSent(true)
    } else {
      setErrorMsg("Something went wrong.")
    }
  }
  useEffect(() => {
    const gettingUser = Auth.currentUserInfo() // optimally should get this from user context
    gettingUser
      .then((user) => {
        setformData({ ...formData, sender: user.attributes.email })
        setisLoading(false)
      })
      .catch(() => {
        setShowEmailField(true)
        setisLoading(false)
      })
  }, [showEmailField])
  if (isLoading) {
    return (
      <View style={HelpModalStyles.HelpModalContainer}>
        <ActivityIndicator style={{ flex: 1 }} size="large" color="black"></ActivityIndicator>
      </View>
    )
  }
  if (sent) {
    return (
      <View style={HelpModalStyles.HelpModalContainer}>
        <TouchableOpacity
          onPress={() => setShow()}
          style={{ padding: 16, position: "absolute", right: 25, top: 18, zIndex: 99999 }}
        >
          <MaterialCommunityIcons name="close-thick" size={24} color="black" />
        </TouchableOpacity>
        {!errorMsg ? (
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
      {showEmailField ? (
        <TextInput
          autoFocus
          autoCompleteType="email"
          maxLength={320}
          placeholder="Enter your email..."
          keyboardType="email-address"
          style={HelpModalStyles.HelpModalTextArea}
          onChangeText={(email) => setformData({ ...formData, sender: email })}
        ></TextInput>
      ) : null}
      <TextInput
        multiline
        numberOfLines={8}
        placeholder="Describe what problems you are experiencing..."
        style={HelpModalStyles.HelpModalTextArea}
        autoCapitalize="sentences"
        autoFocus={!showEmailField}
        keyboardType="default"
        maxLength={1500}
        onChangeText={(text) => setformData({ ...formData, content: text })}
      ></TextInput>
      <JCButton
        buttonType={ButtonTypes.SolidRightJustified}
        enabled={!!formData.content && !!formData.sender}
        onPress={() => {
          sendMessage()
        }}
      >
        Send
      </JCButton>
    </View>
  )
}
