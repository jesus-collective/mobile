import React from 'react';
import { Component } from 'react';
import { Container, Content, Text, List, ListItem, Header } from "native-base";
const routes = [
  {
    name:"Home",
    route:"HomeScreen"
  },
  {
    name:"Explore",
    route:"ExploreScreen"
  },
  {
    name:"Support",
    route:"SupportScreen"
  },
  {
    name:"Get Involved",
    route:"GetInvolvedScreen"
  },
  {
    name:"Contact",
    route:"ContactScreen"
  },
  {
    name:"Kids and Youth",
    route:"KidsAndYouthScreen"
  },

  {
    name:"Events",
    route:"NewsScreen"
  },
  {
    name:"Groups",
    route:"NewsScreen"
  },
  {
    name:"Training",
    route:"NewsScreen"
  },
  {
    name:"Resources",
    route:"NewsScreen"
  },
  
  {
    name:"Profile",
    route:"ProfileScreen"
  }
];
export default class SideBar extends React.Component {
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
                  onPress={() => this.props.navigation.navigate(data.route)}>
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