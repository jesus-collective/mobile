import React from 'react';
import { Button } from 'react-native';
import Amplify from 'aws-amplify';
import awsConfig from '../../src/aws-exports';
import JCComponent from '../../components/JCComponent/JCComponent';

Amplify.configure(awsConfig);

import { Authenticator } from 'aws-amplify-react-native';

interface Props {
  navigation: any
}
export default class TeachingScreen extends JCComponent<Props>{
  static navigationOptions = {
    title: 'Teaching',
  };
  render(): React.ReactNode {
    const { navigate } = this.props.navigation;
    return (
      <Authenticator><Button
        title="Go to Jane's profile"
        onPress={() => navigate('Profile', { name: 'Jane' })}
      /></Authenticator>
    );
  }
}