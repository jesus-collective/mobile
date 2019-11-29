import React from 'react';
import { Component } from 'react';
import { View } from 'react-native';
import { Drawer, Container, Text, Content, Left, Icon, Body, Title, Right, Button } from 'native-base';
import { DrawerActions } from 'react-navigation';

import VideoCard from '../../components/VideoCard/VideoCard'

import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
export default class HomeScreen extends Component {


  render() {
    return (

      <Container style={{ backgroundColor: "#000000" }}>
        <Header title="Home" navigation={this.props.navigation} />
        <Content padder>
          <Text style={{ fontFamily: "Graphik-Regular-App", color: "#ffffff", fontSize: 20, fontWeight: "bold" }}>Oakville This Week</Text>
          <Text style={{ fontFamily: "Graphik-Regular-App", color: "#ffffff", fontSize: 20, fontWeight: "bold" }}>News & Events</Text>
          <Text style={{ fontFamily: "Graphik-Regular-App", color: "#ffffff", fontSize: 20, fontWeight: "bold" }}>Find a Home Church</Text>
      
        </Content>
        <Footer title="Home" navigation={this.props.navigation}></Footer>
      </Container>

    );
  }
}
