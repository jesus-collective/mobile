import { StackNavigationProp } from "@react-navigation/stack"
import Amplify from "aws-amplify"
import JCComponent from "components/JCComponent/JCComponent"
import { Container } from "native-base"
import React from "react"
import { Text } from "react-native"
import Header from "../../components/Header/Header"
import awsConfig from "../../src/aws-exports"

Amplify.configure(awsConfig)

interface Props {
  navigation: StackNavigationProp<any, any>
}
export default class ContactScreen extends JCComponent<Props> {
  render(): React.ReactNode {
    //    const { navigate } = this.props.navigation;
    return (
      <Container>
        <Header title="Contact" navigation={this.props.navigation} />
        <Text>Contact</Text>
      </Container>
    )
  }
}
