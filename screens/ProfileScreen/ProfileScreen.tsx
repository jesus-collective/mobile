import React from 'react';
import { Component } from 'react';
import Amplify from 'aws-amplify';
import awsConfig from '../../src/aws-exports';
import Header from '../../components/Header/Header'
Amplify.configure(awsConfig);

import { Picker, Switch, ListItem, View, Content, Separator, Form, Text, Label, Item, Input, CheckBox, Drawer, Container, Left, Icon, Body, Title, Right, Button } from 'native-base';
import { DrawerActions } from 'react-navigation';


export default class ProfileScreen extends Component {

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <Header title="Profile" navigation={this.props.navigation} />
        <Content style={{ padding: 5 }}>
          <Item style={{ margin: 10 }} rounded>
            <Input placeholder='Email' />
          </Item>
          <Item style={{ margin: 10 }} rounded>
            <Input placeholder='Name' />
          </Item>
          <Item style={{ margin: 10 }} rounded>
            <Input placeholder='Password' />
          </Item>
          <View
            style={{
              borderBottomColor: 'grey',
              borderBottomWidth: 1,
            }}
          />
            <Item style={{ margin: 10 }}>
            <Picker
              mode="dropdown"
              iosHeader="Select a site"
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: undefined }}
              placeholder="Select a site"
              placeholderStyle={{ color: "#bfc6ea" }}
              //selectedValue={this.state.selected}
              //onValueChange={this.onValueChange.bind(this)}
            >
              <Picker.Item label="Oakville" value="key0" />
              <Picker.Item label="Toronto - Downtown" value="key1" />
              <Picker.Item label="Toronto - Uptown" value="key2" />
              <Picker.Item label="Credit Card" value="key3" />
              <Picker.Item label="Net Banking" value="key4" />
            </Picker>
           </Item>
           <ListItem style={{ margin: 10 }} icon>
            <Left>
              <Button style={{ backgroundColor: "#FF9501" }}>
                <Icon active type="MaterialIcons" name="school" />
              </Button>
            </Left>
            <Body>
              <Text>Teaching Alerts</Text>
            </Body>
            <Right>
              <Switch value={false} />
            </Right>
          </ListItem>
          <ListItem style={{ margin: 10 }} icon>
            <Left>
              <Button style={{ backgroundColor: "#FF9501" }}>
                <Icon active type="MaterialIcons" name="home" />
              </Button>
            </Left>
            <Body>
              <Text>Home Church Alerts</Text>
            </Body>
            <Right>
              <Switch value={false} />
            </Right>
          </ListItem>
          <ListItem style={{ margin: 10 }} icon>
            <Left>
              <Button style={{ backgroundColor: "#FF9501" }}>
                <Icon active type="MaterialIcons" name="event-available" />
              </Button>
            </Left>
            <Body>
              <Text>Event Alerts</Text>
            </Body>
            <Right>
              <Switch value={false} />
            </Right>
          </ListItem>
          <ListItem style={{ margin: 10 }} icon>
            <Left>
              <Button style={{ backgroundColor: "#FF9501" }}>
                <Icon active type="Foundation" name="dollar" />
              </Button>
            </Left>
            <Body>
              <Text>Giving Alerts</Text>
            </Body>
            <Right>
              <Switch value={false} />
            </Right>
          </ListItem>
          <ListItem style={{ margin: 10 }} icon>
            <Left>
              <Button style={{ backgroundColor: "#FF9501" }}>
                <Icon active type="MaterialIcons" name="people" />
              </Button>
            </Left>
            <Body>
              <Text>Compassion Alerts</Text>
            </Body>
            <Right>
              <Switch value={false} />
            </Right>
          </ListItem>
        </Content>

      </Container>
    );
  }
}