import { Drawer, Container, Header,Left,Icon,Body,Title,Right,Button } from 'native-base';
import { DrawerActions } from 'react-navigation';
import { Component } from 'react';
import PropTypes from 'prop-types';
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
      HomeScreen.propTypes = {
        onAdd: PropTypes.func
    };
    const { navigate } = this.props.navigation;
    return (
       
        <Header style={{backgroundColor: "#ffffff"}}>
        <Left>
          <Button
            transparent
            onPress={this.openDrawer}>
            <Icon name="menu"  style={{color: "#000000"}}  />
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
                        <Title  style={{ color:'#000000', paddingTop: 12, }}>{this.props.title}</Title> 
                    </View>
                </View>
        
        </Body>
        <Right>
        {this.props.onAdd==null?null:
        <Button
            transparent
            onPress={this.props.onAdd}>
            <Icon type="AntDesign" name="plus"  style={{color: "#000000"}} />
          </Button>
        }
        <Button
            transparent
            onPress={this.openLogin}>
            <Icon name="person" style={{color: "#000000"}}/>
          </Button>
        </Right> 
        </Header>        
    )
  }
 }