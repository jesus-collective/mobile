import React from 'react';
import { Component } from 'react';
import { Container, Content, Text, List, ListItem } from "native-base";
const routes = ["HomeScreen", "NewsScreen", "ProfileScreen"];
export default class SideBar extends React.Component {
  render() {
    return (
      <Container><Content>
      <Text>testsdakjkd</Text>
      <List
            dataArray={routes}
            renderRow={data => {
              return (
                <ListItem
                  button
                  onPress={() => this.props.navigation.navigate(data)}>
                  <Text>{data}</Text>
                </ListItem>
              );
            }}
          />
      </Content>
      </Container>
     )
    }
}