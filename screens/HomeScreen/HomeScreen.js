import React from 'react';
import { Component } from 'react';
import { View } from 'react-native';
import { Drawer, Container, Left,Icon,Body,Title,Right,Button } from 'native-base';
import { DrawerActions } from 'react-navigation';
import Header from '../../components/Header/Header.js'
import { WebView } from 'react-native';
import { NavigationEvents } from 'react-navigation';

export default class HomeScreen extends Component {
  

  
  render() {
    return (
      
      <Container>
        <NavigationEvents onWillFocus={payload => {this.setState({url: "http://jesuscollective.com"});console.log('will focus',payload)}} />

        <Header title="Jesus Collective" navigation={this.props.navigation} />    
        <WebView
        source={{
          uri: 'http://jesuscollective.com',
          headers: {"jesuscollective-origin": "react-native-app"}
        }}
        style={{marginTop: 20}}
      />
      </Container>
      
    );
  }
}
