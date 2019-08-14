import React from 'react';
import Amplify from 'aws-amplify';
import awsConfig from '../../src/aws-exports';
import Header from '../../components/Header/Header'
Amplify.configure(awsConfig);

import { Container} from 'native-base';

import { NavigationScreenProp } from 'react-navigation';
interface Props{
  navigation: NavigationScreenProp<any, any>
}
interface State{

}
export default class ProfileScreen extends React.Component <Props,State>{

  render() {
//    const { navigate } = this.props.navigation;
    return (
      <Container>
        <Header title="Profile" navigation={this.props.navigation} />

      </Container>
    );
  }
}