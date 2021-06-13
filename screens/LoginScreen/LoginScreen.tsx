import { StackNavigationProp } from "@react-navigation/stack"
import Amplify, { Auth } from "aws-amplify"
import React from "react"
import { Button, View } from "react-native"
import Header from "../../components/Header/Header"
import JCComponent from "../../components/JCComponent/JCComponent"
import MyProfile from "../../components/MyProfile/MyProfile"
import awsConfig from "../../src/aws-exports"

Amplify.configure(awsConfig)

interface Props {
  navigation: StackNavigationProp<any, any>
}
export default class LoginScreen extends JCComponent<Props> {
  logout(): void {
    Auth.signOut()
      .then((data) => {
        console.log(data)
        console.log("Logged Out")
      })
      .catch((err) => {
        console.log(err)
      })
  }
  render(): React.ReactNode {
    // const { navigate } = this.props.navigation;
    return (
      <View>
        <Header title="Profile" navigation={this.props.navigation} />
        <MyProfile />
        <Button onPress={() => this.logout()} title="Logout"></Button>
      </View>
    )
  }
}
