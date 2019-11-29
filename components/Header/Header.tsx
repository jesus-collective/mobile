import { Drawer, Container, Header, Left, Icon, Body, Title, Right, Button } from 'native-base';
import { DrawerActions } from 'react-navigation';
import { Component } from 'react';
import PropTypes from 'prop-types';
import React from 'react';
import { View, Image, Text } from 'react-native';
import * as Font from 'expo-font'
import { MaterialIcons } from '@expo/vector-icons';
interface IProps {
  navigation: any;
  title: string;
  onAdd: any;
}


interface IState {
  fontLoaded:boolean;

}
export default class HomeScreen extends React.PureComponent<IProps, IState>  {
  static propTypes: { onAdd: PropTypes.Requireable<(...args: any[]) => any>; };
  constructor(props: IProps) {
    super(props);
    this.state={
      fontLoaded:false
    }
  }
  async componentDidMount() {
    
    
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
      <Header style={{ backgroundColor: "#000000" }}>
        <Left>
         
        </Left>
        <Body style={{ flex: 3 }}>

          <View style={{ flexDirection: "row", justifyContent: 'center' }}>
           
            <View>
                <Title style={{ fontFamily:'Graphik-Bold-App',color: '#ffffff', paddingTop: 15, }}>
                  {this.props.title}
                </Title>
            </View>
          </View>

        </Body>
        <Right>
          {this.props.onAdd == null ? null :
            <Button
              transparent
              onPress={this.props.onAdd}>
              <MaterialIcons name="plus" style={{ color: "#ffffff" }} />
            </Button>
          }
          <Button
            transparent
            onPress={this.openLogin}>
            <MaterialIcons name="person" style={{ color: "#ffffff" }} />
          </Button>
        </Right>
      </Header>
    )
  }
}