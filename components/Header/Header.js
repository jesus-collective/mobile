import { Drawer, Container, Header,Left,Icon,Body,Title,Right,Button } from 'native-base';
import { DrawerActions } from 'react-navigation';
import { Component } from 'react';
import React from 'react';

export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
    }
    openDrawer = () => {
        this.props.navigation.dispatch(DrawerActions.openDrawer());
    }
    openLogin = () => {
        this.props.navigation.navigate("LoginScreen");
    }

    render() {
    const { navigate } = this.props.navigation;
   // const {navigate} = this.props.navigation;
   
//    const {push} = this.props.navigation.push;
    return (
       
        <Header>
        <Left>
          <Button
            transparent
            onPress={this.openDrawer}>
            <Icon name="menu" />
          </Button>
        </Left>
        <Body style={{flex: 3}}>
          <Title>{this.props.title}</Title>
        </Body>
        <Right>
        <Button
            transparent
            onPress={this.openLogin}>
            <Icon name="person" />
          </Button>
        </Right> 
        </Header>
        
    )
  }
 }