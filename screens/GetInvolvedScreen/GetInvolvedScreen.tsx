import { StackNavigationProp } from "@react-navigation/stack"
import Amplify from "aws-amplify"
import { Container } from "native-base"
import React from "react"
import Header from "../../components/Header/Header"
import JCComponent from "../../components/JCComponent/JCComponent"
import awsConfig from "../../src/aws-exports"

Amplify.configure(awsConfig)

interface Props {
  navigation: StackNavigationProp<any, any>
}

export default class GetInvolvedScreen extends JCComponent<Props> {
  render(): React.ReactNode {
    //    const { navigate } = this.props.navigation;
    return (
      <Container>
        <Header title="Get Involved" navigation={this.props.navigation} />
      </Container>
    )
  }
}
