import React from 'react';
import Amplify from 'aws-amplify';
import awsConfig from '../../src/aws-exports';
import Header from '../../components/Header/Header'
import OrganizationViewer from '../../components/OrganizationViewer/OrganizationViewer'
import { Container } from 'native-base';
import JCComponent, { JCState } from '../../components/JCComponent/JCComponent';

Amplify.configure(awsConfig);

interface Props {
  navigation: any
  route: any
}
interface State extends JCState {
  loadId: string
  createNew: boolean
}
export default class OrganizationScreen extends JCComponent<Props, State>{
  constructor(props: Props) {
    super(props);
    this.state = {
      ...super.getInitialState(),
      loadId: props.route.params.id,
      createNew: props.route.params.create === "true" || props.route.params.create === true ? true : false,

    }
  }
  render(): React.ReactNode {
    return (
      <Container data-testid="organization">
        <Header title="Jesus Collective" navigation={this.props.navigation} />
        <OrganizationViewer loadId={this.state.loadId} create={this.state.createNew} navigation={this.props.navigation} />
      </Container>
    );
  }
}