import React from 'react';
import { Component } from 'react';
import Amplify from 'aws-amplify';
import awsConfig from '../../src/aws-exports';
import FederatedSignin from '../../components/FederatedSignin/FederatedSignin.js'
Amplify.configure(awsConfig);
import { Modal, TouchableHighlight, Text, View, StyleSheet } from 'react-native'
import { Authenticator } from 'aws-amplify-react-native';
import { Drawer, Content, Item, Input, Container, Left, Icon, Body, Title, Right, Button } from 'native-base';
import { DrawerActions } from 'react-navigation';

import Header from '../../components/Header/Header.js'
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#ede3f2',
    padding: 10,
  
  },
  modal: {
    flex: 1,
    
    padding: 10,
    paddingTop:40
  },
  text: {
    color: '#3f2949',
    marginTop: 10
  }
})
export default class NewsScreen extends Component {
  onAdd() {
    this.setModalVisible(true)
  }
  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }


  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <Header title="News" navigation={this.props.navigation} onAdd={() => { this.onAdd() }} />
        <View>
          <Modal animationType={"slide"} transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => { console.log("Modal has been closed.") }}>
            <View style={styles.modal}>
             
                <Item style={{ margin: 10 }} rounded>
                  <Input placeholder='Event Name' />
                </Item>
                <Item style={{ margin: 10 }} rounded>
                  <Input placeholder='Event Description' />
                </Item>
                <Item style={{ margin: 10 }} rounded>
                  <Input placeholder='Event Date' />
                </Item>
                <Item style={{ margin: 10 }} rounded>
                  <Input placeholder='Event Date' />
                </Item>
                <TouchableHighlight
            onPress={() => {
              this.setModalVisible(false);
            }}><Text>Cancel</Text></TouchableHighlight>
                <TouchableHighlight
            onPress={() => {
              this.setModalVisible(false);
            }}><Text>Create</Text></TouchableHighlight>
            </View>
          </Modal>
         
        </View>
      </Container>

    );
  }
}