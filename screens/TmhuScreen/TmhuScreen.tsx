import React from 'react';
import { Component } from 'react';
import Amplify from 'aws-amplify';
import awsConfig from '../../src/aws-exports';
import FederatedSignin from '../../components/FederatedSignin/FederatedSignin'
Amplify.configure(awsConfig);

import { Drawer, Container, Content, Text,Left,Icon,Body,Title,Right,Button } from 'native-base';
import { DrawerActions } from 'react-navigation';

import Header from '../../components/Header/Header'

 export default class TmhuScreen extends Component {
 
  render() {
    const {navigate} = this.props.navigation;
    return (
      <Container>
       <Header title="TMH-U" navigation={this.props.navigation} />    
       <Content padder>
        <Text style={{fontSize:20,fontWeight:"bold"}}>TMH-U - Coming Soon</Text>
      </Content>
     
      </Container>

    );
  }
}