import React from 'react';
import { Component } from 'react';
import { Container, Content, Text, List, ListItem, Header } from "native-base";
import { Linking } from '@aws-amplify/core';
import awsConfig from '../../src/aws-exports';
import Amplify, { Analytics } from 'aws-amplify';
import * as Font from 'expo-font'
import routes from '../routes'
Amplify.configure(awsConfig);

interface IProps{
  navigation:any
}
interface IState{

}
export default class SideBar extends React.PureComponent<IProps, IState>  {
  constructor(props:IProps) {
    super(props);
    this.state = {
      fontLoaded: false
    }
  }
  
  openScreen(data:any) {
    Analytics.record({
      name: 'navigateTo',
      attributes: { screen: data.name }
    });

    if (data.route != null)
      return this.props.navigation.navigate(data.route);
    else
      return Linking.openURL(data.url);
  }
  render() {
    return (
      <Container><Content>
        <Header></Header>
       
        <List
          dataArray={routes}
          renderRow={data => {
            return (
              <ListItem
                button
                onPress={() => this.openScreen(data)}>
                
                  <Text style={{fontFamily:'Graphik-Regular-App'}}>{data.name}</Text>
             


              </ListItem>
            );
          }}
        /> 
      
      </Content>
      </Container>
    )
  }
}