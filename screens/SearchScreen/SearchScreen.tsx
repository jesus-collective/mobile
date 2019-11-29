import React from 'react';
import { Component } from 'react';
import Amplify from 'aws-amplify';
import awsConfig from '../../src/aws-exports';
import FederatedSignin from '../../components/FederatedSignin/FederatedSignin'
Amplify.configure(awsConfig);

import { Drawer, Container, Content, Text,Left,Icon,Body,Title,Right,Button } from 'native-base';
import { DrawerActions } from 'react-navigation';

import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'

 export default class SearchScreen extends Component {
 
  render() {
    const {navigate} = this.props.navigation;
    return (
      <Container>
       <Header title="Search" navigation={this.props.navigation} />    
       <Content padder>
        <Text style={{fontSize:20,fontWeight:"bold"}}>Search - Coming Soon</Text>
      </Content>
      <Footer title="Search" navigation={this.props.navigation}></Footer>

      </Container>

    );
  }
}