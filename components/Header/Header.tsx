import {  Header, Left, Body,  Right, Button } from 'native-base';
import { DrawerActions, NavigationScreenProp } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {  Image, Text } from 'react-native';
import styles from '../Header/style.js'
interface Props {
  navigation: NavigationScreenProp<any, any>,
  title:string,
  onMapChange?():any
}
interface State { }
export default class HeaderJC extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
  }

  openDrawer = () => {
    this.props.navigation.dispatch(DrawerActions.openDrawer());
  }
  openLogin = () => {
    this.props.navigation.navigate("LoginScreen");
  }
  openSearch = () => {
    this.props.navigation.navigate("LoginScreen");
  }
  openEvents = () => {
    this.props.navigation.navigate("LoginScreen");
  }
  openResources = () => {
    this.props.navigation.navigate("LoginScreen");
  }
  openGroups = () => {
    this.props.navigation.navigate("LoginScreen");
  }
  openHome = () => {
    this.props.navigation.navigate("HomeScreen");
  }
  openCourses = () => {
    this.props.navigation.navigate("CoursesScreen");
  }
  showMap = () => {
    if (this.props.onMapChange!=null)
    this.props.onMapChange()
  }
  render() {
    //const { navigate } = this.props.navigation;
    return (

      <Header style={styles.container}>
        <Left>
          <Button style={styles.leftButtons}
            transparent
            onPress={this.openDrawer}>
            <Ionicons name="md-menu" style={styles.icon} />
          </Button>
        </Left>
        <Body style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'flex-start'
        }}>
          <Button
            transparent
            onPress={this.openHome}>
            <Image style={styles.logo}
              source={require('./icon.png')}
            /></Button>
          <Button
            transparent
            onPress={this.openEvents}
            style={styles.centerMenuButtons}>
            <Text style={styles.centerMenuButtonsText}>Events</Text>
          </Button>
          <Button
            transparent
            onPress={this.openGroups}
            style={styles.centerMenuButtons}>
            <Text style={styles.centerMenuButtonsText}>Groups</Text>
          </Button>
          <Button
            transparent
            onPress={this.openResources}
            style={styles.centerMenuButtons}>
            <Text style={styles.centerMenuButtonsText}>Resources</Text>
          </Button>
          <Button
            transparent
            onPress={this.openCourses}
            style={styles.centerMenuButtons}>
            <Text style={styles.centerMenuButtonsText}>Courses</Text>
          </Button>

        </Body>
        <Right>
          <Button
            transparent
            onPress={this.showMap}>
            <Ionicons name="md-map" style={styles.icon} />
          </Button>
          <Button
            transparent
            onPress={this.openSearch}>
            <Ionicons name="md-search" style={styles.icon} />
          </Button>
          <Button
            transparent
            onPress={this.openLogin}>
            <Ionicons name="md-person" style={styles.icon} />
          </Button>
        </Right>
      </Header>
    )
  }
}