import React from 'react';
import { Component } from 'react';
import Amplify from 'aws-amplify';
import awsConfig from '../../src/aws-exports';
import FederatedSignin from '../../components/FederatedSignin/FederatedSignin.js'
Amplify.configure(awsConfig);

import { Authenticator } from 'aws-amplify-react-native';
import { Drawer, Container, Left,Icon,Body,Title,Right,Button } from 'native-base';
import { DrawerActions } from 'react-navigation';
import { WebView } from 'react-native';
import Header from '../../components/Header/Header.js'
import { NavigationEvents } from 'react-navigation';

 export default class KidsAndYouthScreen extends Component {
  state = {
    url: "http://jesuscollective.com/series",
  };

  render() {
    const {navigate} = this.props.navigation;
    return (
      <Container>
        <NavigationEvents onWillFocus={payload => {this.setState({url: "http://jesuscollective.com/series"});console.log('will focus',payload)}} />
       <Header title="Kids and Youth" navigation={this.props.navigation} />    
       <WebView
       onLoadStart={(navState) => this.setState({url: navState.nativeEvent.url})}
        source={{
          uri: this.state.url,
          headers: {"jesuscollective-origin": "react-native-app"}
        }}
        style={{marginTop: 0}}
      />
     
      </Container>

    );
  }
}