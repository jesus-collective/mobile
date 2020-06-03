import { Container, Body, Button } from 'native-base';

import { DrawerActions } from '@react-navigation/native';

import React from 'react';
import { Image, Text } from 'react-native';
import styles from '../Footer/style';
import { constants } from '../../src/constants'

interface Props {
  navigation: any
  title: string,
  onMapChange?(): any
}



export default class FooterJC extends React.Component<Props> {

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
    constants["SETTING_ISVISIBLE_event"] ? {
      name: "Events",
      submenu: [
        constants["SETTING_ISVISIBLE_SHOWMY"] ? { name: "My Events" } : null,
        constants["SETTING_ISVISIBLE_SHOWRECOMMENDED"] ? { name: "Recommended" } : null

      ]
    } : null
    ,
    constants["SETTING_ISVISIBLE_group"] ? {
      name: "Groups",
      submenu: [
        constants["SETTING_ISVISIBLE_SHOWMY"] ? { name: "My Groups" } : null,
        constants["SETTING_ISVISIBLE_SHOWRECOMMENDED"] ? { name: "Recommended" } : null

      ]
    } : null,
    constants["SETTING_ISVISIBLE_resource"] ? {
      name: "Resources",
      submenu: false ? [
        { name: "Kids&Youth" },
        { name: "Training" },
        { name: "Adult Teaching" }

      ] : []
    } : null,
    {
      name: "Contact Us",
      submenu: [
        { name: "Get Involved" },
        { name: "Connect With Us" }

      ]
    },
  ]
  openDrawer = (): void => {
    this.props.navigation.dispatch(DrawerActions.openDrawer());
  }
  openProfile = (): void => {
    this.props.navigation.push("ProfileScreen");
  }
  openSearch = (): void => {
    this.props.navigation.push("SearchScreen");
  }
  openEvents = (): void => {
    this.props.navigation.push("EventsScreen");
  }
  openResources = (): void => {
    this.props.navigation.push("ResourcesScreen");
  }
  openGroups = (): void => {
    this.props.navigation.push("GroupsScreen");
  }
  openHome = (): void => {
    this.props.navigation.push("HomeScreen");
  }
  openCourses = (): void => {
    this.props.navigation.push("CoursesScreen");
  }
  render(): React.ReactNode {
    //const { navigate } = this.props.navigation;
    return (

      <Container style={styles.footerContainer}>
        <Body style={styles.footerBodyContainer}>
          <Body style={styles.footerInnerBodyContainer}>
            <Button
              transparent
              onPress={this.openHome}>
              <Image style={styles.logo}
                source={require('./icon.png')}
              /></Button>
            <Text style={styles.copywriteText}>© 2019 Jesus Collective. All Rights Reserved.</Text>
          </Body>
          {this.menu.map((item) => {
            if (item != null)
              return (
                <Body key={item.name} style={{ display: "flex", flexDirection: 'column', alignSelf: "flex-start", alignItems: "flex-start", justifyContent: 'flex-start' }}>
                  <Button
                    transparent
                    onPress={this.openEvents}
                    style={styles.footerCenterMenuButtonsWhite}>
                    <Text style={styles.footerCenterMenuButtonsTextWhite}>{item.name}</Text>
                  </Button>
                  {item.submenu.map((item2) => {
                    if (item2 != null)
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

      </Container >
    )
  }
}