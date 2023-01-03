import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import React, { useContext, useEffect } from "react"
import { Text, View } from "react-native"
import Header from "../../components/Header/Header"
import { UserContext } from "../HomeScreen/UserContext"

export default function AdminScreen() {
  const { userState, userActions } = useContext(UserContext)
  const navigation = useNavigation<StackNavigationProp<any, any>>()
  useEffect(() => {
    navigation.setOptions({
      header: (props: { navigation: StackNavigationProp<any, any> | undefined }) => {
        return <Header showAdmin={true} navigation={props.navigation} title={"Admin Page"} />
      },
    })
  })
  if (!userState) return null
  return (
    <View>
      {userActions.isMemberOf("admin") ? (
        <Text>Admin</Text>
      ) : (
        <Text>You must be an admin to see this screen</Text>
      )}
    </View>
  )
}
