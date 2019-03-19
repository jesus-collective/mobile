import React from 'react';
import { Component } from 'react';
import { View } from 'react-native';
import { Drawer, Container, Header,Left,Icon,Body,Title,Right,Button } from 'native-base';
import { DrawerActions } from 'react-navigation';
 export default class HomeScreen extends Component {
  static navigationOptions = {
    drawerLabel: 'The Meeting House',
    headerTitle:'test',
    title: 'The Meeting House',
  };
  openDrawer = () => {
    this.props.navigation.dispatch(DrawerActions.openDrawer());
  }
  render() {
    const { navigate } = this.props.navigation;
   // const {navigate} = this.props.navigation;
   
//    const {push} = this.props.navigation.push;
    return (
      
      <Container>
      <Header>
        <Left>
          <Button
            transparent
            onPress={this.openDrawer}>
            <Icon name="menu" />
          </Button>
        </Left>
        <Body>
          <Title>The Meeting House</Title>
        </Body>
        <Right />
      </Header>
      </Container>
      
    );
  }
}
