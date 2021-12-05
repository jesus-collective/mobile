import { StackNavigationProp } from "@react-navigation/stack"
import Amplify from "aws-amplify"
import { Container } from "native-base"
import React from "react"
import JCComponent, { JCState } from "../../components/JCComponent/JCComponent"
import MyProfile from "../../components/MyProfile/MyProfile"
import awsConfig from "../../src/aws-exports"

Amplify.configure(awsConfig)

interface Props {
  navigation: StackNavigationProp<any, any>
  route: any
}
interface State extends JCState {
  loadId: string
  createNew: boolean
  canSave: boolean
  isEditable: boolean
}
export default class ProfileScreen extends JCComponent<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      ...super.getInitialState(),
      loadId: props.route.params.id,
      createNew: false,
      canSave: true,
      isEditable: true,
    }
  }
  render(): React.ReactNode {
    //    const { navigate } = this.props.navigation;
    return (
      <Container testID="profile">
        <MyProfile loadId={this.state.loadId} navigation={this.props.navigation} />
      </Container>
    )
  }
}
