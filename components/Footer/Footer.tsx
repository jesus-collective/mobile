import { Container, Content, Left, Body, Right, Button } from 'native-base';
import { DrawerActions, NavigationScreenProp } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Text } from 'react-native';
import styles from '../Footer/style.js'
interface Props {
  navigation: NavigationScreenProp<any, any>,
  title: string,
  onMapChange?(): any
}
interface State { }



export default class HeaderJC extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
  }
  menu = [
    {
      name: "About Us",
      submenu: [
        { name: "Who We Are" },
        { name: "Our Mission" },
        { name: "Team" }
      ]
    },
    {
      name: "Events",
      submenu: [
        { name: "My Events" },
        { name: "Recommended" }

      ]
    },
    {
      name: "Groups",
      submenu: [
        { name: "My Events" },
        { name: "Recommended" }

      ]
    },
    {
      name: "Resources",
      submenu: [
        { name: "Kids&Youth" },
        { name: "Training" },
        { name: "Adult Teaching" }

      ]
    },
    {
      name: "Contact Us",
      submenu: [
         { name: "Get Involved" },
         { name: "Connect With Us" }
     
      ]
    },
  ]
  openDrawer = () => {
    this.props.navigation.dispatch(DrawerActions.openDrawer());
  }
  openProfile = () => {
    this.props.navigation.navigate("ProfileScreen");
  }
  openSearch = () => {
    this.props.navigation.navigate("SearchScreen");
  }
  openEvents = () => {
    this.props.navigation.navigate("EventsScreen");
  }
  openResources = () => {
    this.props.navigation.navigate("ResourcesScreen");
  }
  openGroups = () => {
    this.props.navigation.navigate("GroupsScreen");
  }
  openHome = () => {
    this.props.navigation.navigate("HomeScreen");
  }
  openCourses = () => {
    this.props.navigation.navigate("CoursesScreen");
  }
  showMap = () => {
    if (this.props.onMapChange != null)
      this.props.onMapChange()
  }
  render() {
    //const { navigate } = this.props.navigation;
    return (

      <Content style={styles.footerContainer}>
        <Body style={{
          display: "flex",
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'stretch'

        }}>
          <Body style={{ minWidth:400,display: "flex", flexDirection: 'column', alignSelf: "stretch", alignItems: "flex-start", justifyContent: "space-evenly" }}>
          <Button
            transparent
            onPress={this.openHome}>
            <Image style={styles.logo}
              source={require('./icon.png')}
            /></Button>
          <Text style={styles.copywriteText}>© 2019 Jesus Collective. All Rights Reserved.</Text>
        </Body>
        {this.menu.map((item) => {
          return (
            <Body key={item.name} style={{ display: "flex", flexDirection: 'column', alignSelf: "flex-start", alignItems: "flex-start", justifyContent: 'flex-start' }}>
              <Button
                transparent
                onPress={this.openEvents}
                style={styles.footerCenterMenuButtonsWhite}>
                <Text style={styles.footerCenterMenuButtonsTextWhite}>{item.name}</Text>
              </Button>
              {item.submenu.map((item2) => {
                return (<Button key={item2.name}
                  transparent
                  onPress={this.openEvents}
                  style={styles.footerCenterMenuButtons}>
                  <Text style={styles.footerCenterMenuButtonsText}>{item2.name}</Text>
                </Button>)
              })}
            </Body>
          )
        })}


        </Body>

      </Content >
    )
  }
}