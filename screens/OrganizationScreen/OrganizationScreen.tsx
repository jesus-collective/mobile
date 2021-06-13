import { StackNavigationProp } from "@react-navigation/stack"
import Amplify from "aws-amplify"
import { Container } from "native-base"
import React from "react"
import Header from "../../components/Header/Header"
import JCComponent, { JCState } from "../../components/JCComponent/JCComponent"
import OrganizationViewer from "../../components/OrganizationViewer/OrganizationViewer"
import awsConfig from "../../src/aws-exports"

Amplify.configure(awsConfig)

interface Props {
  navigation: StackNavigationProp<any, any>
  route: any
}
interface State extends JCState {
  loadId: string
  createNew: boolean
}
export default class OrganizationScreen extends JCComponent<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      ...super.getInitialState(),
      loadId: props.route.params.id,
      createNew:
        props.route.params.create === "true" || props.route.params.create === true ? true : false,
    }
  }
  render(): React.ReactNode {
    return (
      <Container testID="organization">
        <Header title="Jesus Collective" navigation={this.props.navigation} />
        <OrganizationViewer
          loadId={this.state.loadId}
          create={this.state.createNew}
          navigation={this.props.navigation}
        />
      </Container>
    )
  }
}
