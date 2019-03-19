import React from 'react';
import { Component } from 'react';
import { Button } from 'react-native';
import Amplify from 'aws-amplify';
import awsConfig from '../../src/aws-exports';

Amplify.configure(awsConfig);

import { Authenticator } from 'aws-amplify-react-native';


 export default class TeachingScreen extends Component {
  static navigationOptions = {
    title: 'Teaching',
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <Authenticator><Button
        title="Go to Jane's profile"
        onPress={() => navigate('Profile', {name: 'Jane'})}
      /></Authenticator>
    );
  }
}