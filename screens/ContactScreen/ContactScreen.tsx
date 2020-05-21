import React from 'react';
import Amplify from 'aws-amplify';
import awsConfig from '../../src/aws-exports';
import { Text } from 'react-native'

Amplify.configure(awsConfig);

import { Container } from 'native-base';

import Header from '../../components/Header/Header'

interface Props {
  navigation: any
}
interface State {

}
export default class ContactScreen extends React.Component<Props, State> {
  render() {
    //    const { navigate } = this.props.navigation;
    return (
      <Container>
        <Header title="Contact" navigation={this.props.navigation} />
        <Text>Contact</Text>
      </Container>

    );
  }
}