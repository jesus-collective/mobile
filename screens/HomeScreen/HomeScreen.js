import React from 'react';
import { Component } from 'react';
import { View } from 'react-native';
import { Drawer, Container, Left,Icon,Body,Title,Right,Button } from 'native-base';
import { DrawerActions } from 'react-navigation';
import Header from '../../components/Header/Header.js'
 export default class HomeScreen extends Component {
  

  
  render() {
    return (
      
      <Container>
        <Header title="The Meeting House" navigation={this.props.navigation} />    
       
      </Container>
      
    );
  }
}
