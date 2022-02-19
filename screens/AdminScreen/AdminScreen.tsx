import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import React, { useContext, useLayoutEffect } from "react"
import { Text, View } from "react-native"
import Header from "../../components/Header/Header"
import { UserContext } from "../HomeScreen/UserContext"

const AdminScreen = () => {
  const { userState, userActions } = useContext(UserContext)
  const navigation = useNavigation<StackNavigationProp<any, any>>()
  if (!userState) return null
  useLayoutEffect(() => {
    navigation.setOptions({
      header: (props: { navigation: StackNavigationProp<any, any> | undefined }) => {
        return <Header showAdmin={true} navigation={props.navigation} title={"Admin Page"} />
      },
    })
  }, [])
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

export default AdminScreen
