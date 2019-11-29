import React from 'react';
import { Component } from 'react';
import Amplify from 'aws-amplify';
import awsConfig from '../../src/aws-exports';
import FederatedSignin from '../../components/FederatedSignin/FederatedSignin'
Amplify.configure(awsConfig);

import { Drawer, Container, Left,Icon,Body,Title,Right,Button } from 'native-base';
import { DrawerActions } from 'react-navigation';

import Header from '../../components/Header/Header'

 export default class FeedbackScreen extends Component {
 
  render() {
    const {navigate} = this.props.navigation;
    return (
      <Container>
       <Header title="Social" navigation={this.props.navigation} />    
      
     
      </Container>

    );
  }
}