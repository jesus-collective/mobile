import React from 'react';
import Component from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Image} from 'react-native';
import Amplify from 'aws-amplify';
import awsConfig from './src/aws-exports';
import {createDrawerNavigator, createAppContainer} from 'react-navigation';
//import { Button } from 'react-native';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen'
import NewsScreen from './screens/NewsScreen/NewsScreen'
import TeachingScreen from './screens/TeachingScreen/TeachingScreen'
import HomeScreen from "./screens/HomeScreen/index.js";
Amplify.configure(awsConfig);
import { Authenticator } from 'aws-amplify-react-native';
import { DrawerNavigator } from 'react-navigation';

import { Drawer, Container, Header,Left,Icon,Body,Title,Right,Button } from 'native-base';
import SideBar from './components/Sidebar/Sidebar';



//export default App;

export default class AwesomeApp extends React.Component {
  render() {
    return <HomeScreen />;
  }
}
