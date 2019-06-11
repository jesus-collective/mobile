import React from 'react';
import { Component } from 'react';
import { View } from 'react-native';
import { Drawer, Container, Text,Content,Left,Icon,Body,Title,Right,Button } from 'native-base';
import { DrawerActions } from 'react-navigation';

import VideoCard from '../../components/VideoCard/VideoCard.js'

import Header from '../../components/Header/Header.js'
 export default class HomeScreen extends Component {

  
  render() {
    return (
      
      <Container>
        <Header title="The Meeting House" navigation={this.props.navigation} />    
        <Content padder>
        <Text style={{fontSize:20,fontWeight:"bold"}}>Oakville This Week</Text>
        <VideoCard speakers={["test"]} episodeTitle="Test" videoId="HWg4ZCxABNQ" description="ABC adh asd adhjs da dhjs dhjas djhas dd 123"></VideoCard>
        <Text style={{fontSize:20,fontWeight:"bold"}}>News & Events</Text>
        <Text style={{fontSize:20,fontWeight:"bold"}}>Find a Home Church</Text>
       
        </Content>
      </Container>
      
    );
  }
}
