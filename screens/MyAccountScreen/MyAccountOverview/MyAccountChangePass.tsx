import { Auth } from "aws-amplify"
import React, { useCallback, useContext, useEffect, useState } from "react"
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"
import { JCCognitoUser } from "src/types"
import { MyAccountContext } from "../MyAccountContext"
import { MyAccountActionType } from "../MyAccountTypes"
export default function MyAccountChangePass() {
  const { dispatch } = useContext(MyAccountContext)
  const [oldPass, setOldPass] = useState("")
  const [newPass, setNewPass] = useState("")
  const [confirmPass, setConfirmPass] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const closeModal = useCallback(() => {
    dispatch({ type: MyAccountActionType.SHOW_CHANGE_PASS, payload: { showChangePass: false } })
  }, [dispatch])
  useEffect(() => {
    return () => {
      closeModal()
    }
  }, [closeModal])
  const handlePasswordChange = async (): Promise<void> => {
    if (!oldPass || !newPass) {
      setErrorMsg("Required: Current password, New password")
      return
    }
    setIsLoading(true)
    try {
      const user = (await Auth.currentAuthenticatedUser()) as JCCognitoUser
      const result = await Auth.changePassword(user, oldPass, newPass)
      setOldPass("")
      setNewPass("")
      setConfirmPass("")
      setErrorMsg(result)
      setTimeout(() => {
        if (result === "SUCCESS") closeModal()
      }, 2500)
    } catch (e: any) {
      console.error(e)
      if (e.message.includes("validation")) setErrorMsg(e.message.split(":")[0])
      else setErrorMsg(e.message)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: "row", alignItems: "center", flex: 1, padding: 16 }}>
        <TouchableOpacity disabled={isLoading} onPress={closeModal}>
          <Image
            style={{ width: 24, height: 24 }}
            source={require("../../../assets/Facelift/svg/X-Red.svg")}
          />
        </TouchableOpacity>

        <Text
          style={{
            fontFamily: "Graphik-Semibold-App",
            textAlign: "center",
            fontSize: 15,
            color: "#1A0706",
            flex: 1,
          }}
        >
          Change your password
        </Text>
        {isLoading ? (
          <ActivityIndicator color="#FF4438" />
        ) : (
          <TouchableOpacity disabled={isLoading} onPress={handlePasswordChange}>
            <Text style={{ color: "#FFA19B" }}>Save</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={style.HeaderHorizontalLine}></View>
      <View style={{ padding: 16 }}>
        <Text style={style.Label}>Confirm your current password</Text>
        <TextInput
          placeholder="Your password"
          value={oldPass}
          onChange={(e) => setOldPass(e.nativeEvent.text)}
          secureTextEntry={true}
          style={style.Input}
        />
        <Text style={[style.Label, { marginTop: 24 }]}>Enter your new password</Text>
        <TextInput
          placeholder="New password"
          value={newPass}
          onChange={(e) => setNewPass(e.nativeEvent.text)}
          secureTextEntry={true}
          style={style.Input}
        />
        <TextInput
          placeholder="Re-type your new password"
          value={confirmPass}
          onChange={(e) => setConfirmPass(e.nativeEvent.text)}
          secureTextEntry={true}
          style={[style.Input, { marginTop: 8 }]}
        />
      </View>
      <Text
        style={[
          { color: "red", paddingLeft: 16, paddingBottom: 16 },
          errorMsg === "SUCCESS" ? { color: "green" } : {},
        ]}
      >
        {errorMsg}
      </Text>
    </View>
  )
}

const style = StyleSheet.create({
  HeaderHorizontalLine: {
    borderTopWidth: 1,
    borderColor: "#E4E1E1",
  },
  Input: {
    paddingVertical: 12,
    marginTop: 4,
    paddingHorizontal: 8,
    backgroundColor: "#F6F5F5",
    borderRadius: 4,
    borderColor: "#E4E1E1",
    fontFamily: "Graphik-Regular-App",
    fontSize: 12,
    color: "#6A5E5D",
  },
  Label: {
    fontFamily: "Graphik-Regular-App",
    color: "#6A5E5D",
    fontSize: 12,
  },
})
