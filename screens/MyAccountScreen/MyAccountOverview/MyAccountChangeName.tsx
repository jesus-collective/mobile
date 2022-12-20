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
import { Data } from "../../../components/Data/Data"
import { JCCognitoUser } from "../../../src/types"
import { MyAccountContext } from "../MyAccountContext"
import { MyAccountActionType } from "../MyAccountTypes"
export default function MyAccountChangeName() {
  const { dispatch, state } = useContext(MyAccountContext)
  const [firstName, setFirstName] = useState(state.user?.given_name ?? "")
  const [lastName, setLastName] = useState(state.user?.family_name ?? "")
  const [errorMsg, setErrorMsg] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const clean = (item: any) => {
    delete item.organizations
    delete item.groups
    delete item.messages
    delete item.owns
    delete item._deleted
    delete item._lastChangedAt
    delete item.createdAt
    delete item.updatedAt
    delete item.coachingTriad
    delete item.userTriad
    delete item.courseInstructing
    delete item.payments
    delete item.courseBackOfficeStaff
    delete item.messageReplies
    if (item.profileImage) delete item.profileImage["__typename"]
    delete item.directMessages
    return item
  }
  const closeModal = useCallback(() => {
    dispatch({ type: MyAccountActionType.SHOW_CHANGE_NAME, payload: { showChangeName: false } })
  }, [dispatch])
  useEffect(() => {
    return () => {
      closeModal()
    }
  }, [closeModal])
  const handleChangeName = async (): Promise<void> => {
    if (!state.user) return
    if (!firstName || !lastName) {
      setErrorMsg("Required: First name, Last name")
      return
    }
    if (firstName === state.user.given_name && lastName === state.user.family_name) return
    console.log("Saving new name....")
    setIsLoading(true)
    const userDetails = state.user
    userDetails["given_name"] = firstName
    userDetails["family_name"] = lastName
    try {
      const user = (await Auth.currentAuthenticatedUser()) as JCCognitoUser
      const oldAttributes = user.attributes
      const newAttributes = { ...oldAttributes, given_name: firstName, family_name: lastName }
      const updateCognitoUser = await Auth.updateUserAttributes(user, newAttributes)

      console.debug({ updateCognito: updateCognitoUser })

      const updateUser = await Data.updateUser(clean(userDetails))

      console.log({ updateUser: updateUser })
      dispatch({ type: MyAccountActionType.SET_USER, payload: { user: userDetails } })
      setErrorMsg("Successfully updated name.")
      setTimeout(() => {
        closeModal()
      }, 2500)
    } catch (e: any) {
      console.error(e)
      setErrorMsg("An error occurred. " + e?.message)
    } finally {
      console.log("Finished saving new name")
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
          Change your name
        </Text>
        {isLoading ? (
          <ActivityIndicator color="#FF4438" />
        ) : (
          <TouchableOpacity disabled={isLoading} onPress={handleChangeName}>
            <Text style={{ color: "#FFA19B" }}>Save</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={style.HeaderHorizontalLine}></View>
      <View style={{ padding: 16 }}>
        <Text style={style.Label}>Enter your first name</Text>
        <TextInput
          placeholder="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.nativeEvent.text)}
          style={[style.Input, { marginTop: 4, marginBottom: 8 }]}
        />
        <Text style={style.Label}>Enter your last name</Text>
        <TextInput
          placeholder="Last name"
          value={lastName}
          onChange={(e) => setLastName(e.nativeEvent.text)}
          style={[style.Input, { marginTop: 4 }]}
        />
      </View>
      <Text style={{ color: "red", paddingLeft: 16, paddingBottom: 16 }}>{errorMsg}</Text>
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
