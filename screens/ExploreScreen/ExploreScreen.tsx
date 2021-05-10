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
export default class ExploreScreen extends JCComponent<Props> {
  state = {
    url: "http://jesuscollective.com/explore",
  }

  render(): React.ReactNode {
    //const { navigate } = this.props.navigation;
    //  <NavigationEvents onWillFocus={payload => { this.setState({ url: "http://jesuscollective.com/explore" }); console.log('will focus', payload) }} />

    return (
      <Container>
        <Header title="Explore" navigation={this.props.navigation} />
      </Container>
    )
  }
}
