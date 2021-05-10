import Amplify from "aws-amplify"
import { Container } from "native-base"
import React from "react"
import Header from "../../components/Header/Header"
import JCComponent from "../../components/JCComponent/JCComponent"
import awsConfig from "../../src/aws-exports"
Amplify.configure(awsConfig)

interface Props {
  navigation: any
}
export default class SupportScreen extends JCComponent<Props> {
  render(): React.ReactNode {
    //const { navigate } = this.props.navigation;
    return (
      <Container>
        <Header title="Support" navigation={this.props.navigation} />
      </Container>
    )
  }
}
