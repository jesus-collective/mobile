import React from 'react';
import { Component } from 'react';
import Amplify from 'aws-amplify';
import awsConfig from '../../src/aws-exports';
import FederatedSignin from '../../components/FederatedSignin/FederatedSignin'
Amplify.configure(awsConfig);

import { View, Drawer, Container, Left, Icon, Body, Title, Right, Button } from 'native-base';
import { DrawerActions } from 'react-navigation';
import { StyleSheet, Text } from 'react-native'
import Swiper from 'react-native-deck-swiper'
import Header from '../../components/Header/Header'

interface IProps {
  navigation: any
}
interface IState {

}
export default class PeopleScreen extends React.PureComponent<IProps, IState>{

  render() {
    const styles = StyleSheet.create({
      container: {

      },
      card: {
        height: 500,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: "#E8E8E8",
        justifyContent: "center",
        backgroundColor: "white",

      },
      text: {
        textAlign: "center",
        fontSize: 50,

        backgroundColor: "transparent"
      }
    });
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <Header title="People" navigation={this.props.navigation} />
        <View>
          <Swiper style={{ height: 50 }}
            cards={['Test', 'of', 'people', 'list', 'for', 'fun', '!!!']}
            renderCard={(card) => {
              return (
                <View style={styles.card}>
                  <Text style={styles.text}>{card}</Text>
                </View>
              )
            }}
            horizontalSwipe={false}
            verticalSwipe={true}
            onSwiped={(cardIndex) => { console.log(cardIndex) }}
            onSwipedAll={() => { console.log('onSwipedAll') }}
            cardIndex={0}
            showSecondCard={true}
            backgroundColor={'#4FD0E9'}
            stackSize={10}>
          </Swiper>
        </View>
      </Container>

    );
  }
}