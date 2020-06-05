import { Container, Body, Button } from 'native-base';

import { DrawerActions } from '@react-navigation/native';

import React from 'react';
import { Image, Text, Linking } from 'react-native';
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
        { name: "Who We Are", linkto: "https://jesuscollective.com"},
        { name: "Our Mission", linkto: "https://jesuscollective.com/discover" },
        { name: "Team", linkto: "https://jesuscollective.com/team" }
      ]
    },
    constants["SETTING_ISVISIBLE_event"] ? {
      name: "Events",
      submenu: [
        { name: "My Events", linkto: "EventsScreen"},
        { name: "Recommended", linkto: null }

      ]
    } : null
    ,
    constants["SETTING_ISVISIBLE_group"] ? {
      name: "Groups",
      submenu: [
        { name: "My Groups", linkto: "GroupsScreen" },
        { name: "Recommended", linkto: null }

      ]
    } : null,
    constants["SETTING_ISVISIBLE_resource"] ? {
      name: "Resources",
      submenu: [
        { name: "Kids & Youth", linkto: "ResourcesScreen" },
        { name: "Training", linkto: null },
        { name: "Adult Teaching", linkto: null }

      ]
    } : null,
    {
      name: "Contact Us",
      submenu: [
        { name: "Get Involved", linkto: null },
        { name: "Connect With Us", linkto: "mailto:connect@jesuscollective.com"}

      ]
    },
  ]
  openDrawer = (): void => {
    this.props.navigation.dispatch(DrawerActions.openDrawer());
  }
  openScreen = (screen: string): void => {
    this.props.navigation.push(screen);
  }
  open = (link: string): void => {
    if (link.includes("Screen")) {
      this.openScreen(link)
    } else {
      Linking.openURL(link)
    }
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
            <Text style={styles.copywriteText}>&copy; {new Date().getFullYear()} Jesus Collective. All Rights Reserved.</Text>
          </Body>
          {this.menu.map((item) => {
            if (item != null)
              return (
                <Body key={item.name} style={{ display: "flex", flexDirection: 'column', alignSelf: "flex-start", alignItems: "flex-start", justifyContent: 'flex-start' }}>
                  <Button
                    transparent
                    style={styles.footerCenterMenuButtonsWhite}>
                    <Text style={styles.footerCenterMenuButtonsTextWhite}>{item.name}</Text>
                  </Button>
                  {item.submenu.map((item2) => {
                    if (item2.linkto != null)
                      return (<Button key={item2.name}
                        transparent
                        onPress={() => this.open(item2.linkto)}
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