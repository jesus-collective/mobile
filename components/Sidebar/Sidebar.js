import React from 'react';
import { Component } from 'react';
import { Container, Content, Text, List, ListItem, Header } from "native-base";
import { Linking } from '@aws-amplify/core';
import awsConfig from '../../src/aws-exports';
import Amplify, { Analytics } from 'aws-amplify';

Amplify.configure(awsConfig);

const routes = [
  {
    name:"This Week",
    route:"HomeScreen"
  },
  {
    name:"News & Events",
    route:"NewsScreen"
  },
  {
    name:"Teaching",
    route:"TeachingScreen"
  },
  {
    name:"Home Church",
    route:"HomeChurchScreen"
  },
  {
    name: "People",
    route: "PeopleScreen"
  },

  {
    name: "TMH-U",
    route: "TmhuScreen"
  },
  {
    name: "Giving",
    url: "http://themeetinghouse.com/giving"
  },
  {
    name: "Jesus Collective",
    url: "https://www.jesuscollective.com"
  },
  {
    name: "Profile",
    route: "ProfileScreen"
  },
  {
    name: "Feedback",
    url: "mailto:george.bell@themeetinghouse.com?subject=App%20Feedback"
  },
  {
    name: "Social",
    route: "SocialScreen"
  },

];
export default class SideBar extends React.Component {
  handleClick(data){
    Analytics.record({ name: 'navigateTo',
    attributes: { screen: data.name } });

    if (data.route!=null)
      return this.props.navigation.navigate(data.route);
    else
      return  Linking.openURL(data.url);
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
                  onPress={() => this.handleClick(data) }>
                  <Text>{data.name}</Text>
                </ListItem>
              );
            }}
          />
      </Content>
      </Container>
     )
    }
}