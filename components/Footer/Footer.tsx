import { Drawer, Container, Footer, FooterTab, Left, Icon, Body, Title, Right, Button } from 'native-base';
import { DrawerActions } from 'react-navigation';
import { Component } from 'react';
import PropTypes from 'prop-types';
import React from 'react';
import { View, Image, Text } from 'react-native';
import * as Font from 'expo-font'
import { MaterialIcons } from '@expo/vector-icons';
import Amplify, { Analytics } from 'aws-amplify';
import { Linking } from '@aws-amplify/core';
import routes from '../routes'
interface IProps {
  navigation: any;
  title: string;
  onAdd: any;
}


interface IState {
  fontLoaded: boolean;

}
export default class HomeScreen extends React.PureComponent<IProps, IState>  {
  static propTypes: { onAdd: PropTypes.Requireable<(...args: any[]) => any>; };
  constructor(props: IProps) {
    super(props);
    this.state = {
      fontLoaded: false
    }
  }
  async componentDidMount() {


  }
  openScreen(data:any) {
    Analytics.record({
      name: 'navigateTo',
      attributes: { screen: data.name }
    });

    if (data.route != null)
       this.props.navigation.navigate(data.route);
    else
       Linking.openURL(data.url);
  }
  openDrawer = () => {
    this.props.navigation.dispatch(DrawerActions.openDrawer());
  }
  openLogin = () => {
    this.props.navigation.navigate("LoginScreen");
  }

  render() {
    HomeScreen.propTypes = {
      onAdd: PropTypes.func
    };
    const { navigate } = this.props.navigation;
    return (
      <Footer>
        <FooterTab>
          <Button active onPress={()=>this.openScreen({name:"This Week",route:"HomeScreen"})}>
            <MaterialIcons name="menu"  />
          </Button>
          <Button onPress={()=>this.openScreen({name:"Teaching",route:"TeachingScreen"})}>
            <MaterialIcons name="menu" />
          </Button>
          <Button  onPress={()=>this.openScreen({name:"Search",route:"SearchScreen"})}>
            <MaterialIcons name="menu"/>
          </Button>
          <Button onPress={this.openDrawer}>
            <MaterialIcons name="menu" />
          </Button>
        </FooterTab>

      </Footer>
    )
  }
}