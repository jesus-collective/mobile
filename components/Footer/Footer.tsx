import { Container, Body, Button } from 'native-base';

import { DrawerActions } from '@react-navigation/native';

import React from 'react';
import { Image, Text, Linking } from 'react-native';
import footerStyles from '../Footer/style';
import { constants } from '../../src/constants'
import JCComponent from '../JCComponent/JCComponent';

interface Props {
  navigation: any
  title: string,
  onMapChange?(): any
}



export default class FooterJC extends JCComponent<Props> {

  constructor(props: Props) {
    super(props);
  }
  menu = [
    {
      name: "About Us",
      submenu: [
        { name: "Who We Are", linkto: "https://jesuscollective.com" },
        { name: "Our Mission", linkto: "https://jesuscollective.com/discover" },
        { name: "Team", linkto: "https://jesuscollective.com/team" }
      ]
    },
    constants["SETTING_ISVISIBLE_event"] ? {
      name: "Events",
      submenu: [
        { name: "My Events", linkto: "EventsScreen" },
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
        { name: "Connect With Us", linkto: "mailto:connect@jesuscollective.com" }

      ]
    },
  ]
  openDrawer = (): void => {
    this.props.navigation.dispatch(DrawerActions.openDrawer());
  }
  openMyScreen = (screen: string): void => {
    this.props.navigation.push(screen, { mine: true });
  }
  openScreen = (screen: string): void => {
    this.props.navigation.push(screen);
  }
  open = (obj): void => {
    if (obj.linkto.includes("Screen") && obj.name.includes("My")) {
      this.openMyScreen(obj.linkto)
    } else if (obj.linkto.includes("Screen")) {
      this.openScreen(obj.linkto)
    } else {
      Linking.openURL(obj.linkto)
    }
  }
  render(): React.ReactNode {
    //const { navigate } = this.props.navigation;
    return (

      <Container style={footerStyles.footerContainer}>
        <Body style={footerStyles.footerBodyContainer}>
          <Body style={footerStyles.footerInnerBodyContainer}>
            <Button
              transparent
              onPress={() => { this.open({ name: "Home", linkto: "HomeScreen" }) }}>
              <Image style={footerStyles.logo}
                source={require('./icon.png')}
              /></Button>
            <Text style={footerStyles.copywriteText}>&copy; {new Date().getFullYear()} Jesus Collective. All Rights Reserved.</Text>
          </Body>
          {this.menu.map((item) => {
            if (item != null)
              return (
                <Body key={item.name} style={{ display: "flex", flexDirection: 'column', alignSelf: "flex-start", alignItems: "flex-start", justifyContent: 'flex-start' }}>
                  <Text style={footerStyles.footerCenterMenuButtonsTextWhite}>{item.name}</Text>
                  {item.submenu.map((item2) => {
                    if (item2.linkto != null)
                      return (<Button key={item2.name}
                        transparent
                        onPress={() => this.open(item2)}
                        style={footerStyles.footerCenterMenuButtons}>
                        <Text style={footerStyles.footerCenterMenuButtonsText}>{item2.name}</Text>
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