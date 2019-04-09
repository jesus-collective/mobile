import { Drawer, Container, Header,Left,Icon,Body,Title,Right,Button } from 'native-base';
import { DrawerActions } from 'react-navigation';
import { Component } from 'react';
import React from 'react';
import { View, Image, Text} from 'react-native';
export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
    }
    openDrawer = () => {
        this.props.navigation.dispatch(DrawerActions.openDrawer());
    }
    openLogin = () => {
        this.props.navigation.navigate("LoginScreen");
    }

    render() {
    const { navigate } = this.props.navigation;
    return (
       
        <Header style={{backgroundColor: "#f0493e"}}>
        <Left>
          <Button
            transparent
            onPress={this.openDrawer}>
            <Icon name="menu"  style={{color: "#ffffff"}}  />
          </Button>
        </Left>
        <Body style={{flex: 3}}>
       
              <View style={{flexDirection:"row",justifyContent: 'center'}}>
                    <View >
                      <Image style={{width:45,height:45,justifyContent: 'flex-start'}}
                            source={require('./icon.png')}
                             />
                    </View>
                    <View  >
                        <Title  style={{ color:'#ffffff', paddingTop: 12, }}>{this.props.title}</Title> 
                    </View>
                </View>
        
        </Body>
        <Right>
        <Button
            transparent
            onPress={this.openLogin}>
            <Icon name="person" style={{color: "#ffffff"}}/>
          </Button>
        </Right> 
        </Header>        
    )
  }
 }