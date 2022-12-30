import { StackNavigationProp } from "@react-navigation/stack"
import { Amplify } from "aws-amplify"
import { Authenticator } from "aws-amplify-react-native"
import React from "react"
import { Pressable, Text } from "react-native"
import JCComponent from "../../components/JCComponent/JCComponent"
import awsConfig from "../../src/aws-exports"

Amplify.configure(awsConfig)

interface Props {
  navigation: StackNavigationProp<any, any>
}
export default class TeachingScreen extends JCComponent<Props> {
  static navigationOptions = {
    title: "Teaching",
  }
  render(): React.ReactNode {
    const { navigate } = this.props.navigation
    return (
      <Authenticator>
        <Pressable onPress={() => navigate("Profile", { name: "Jane" })}>
          <Text>Go to Jane's profile</Text>
        </Pressable>
      </Authenticator>
    )
  }
}
