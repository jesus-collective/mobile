import { Container, Body, Button } from 'native-base';

import { DrawerActions } from '@react-navigation/native';

import React from 'react';
import { Image, Text, Linking, Platform } from 'react-native';
import footerStyles from '../Footer/style';
import { constants } from '../../src/constants'
import JCComponent from '../JCComponent/JCComponent';

interface Props {
  navigation: any
  title: string,
  onMapChange?(): any
}

type SubMenuItem = {
  name: string
  linkTo?: string
  webLink?: string
  navProps?: { mine?: boolean, create?: boolean, id?: string }
}

type MenuItem = {
  name: string
  subMenu?: SubMenuItem[]
}
export default class FooterJC extends JCComponent<Props> {

  constructor(props: Props) {
    super(props);
  }
  menu: MenuItem[] = [
    {
      name: "About Us",
      subMenu: [
        { name: "Who We Are", webLink: "https://jesuscollective.com" },
        { name: "Our Mission", webLink: "https://jesuscollective.com/discover" },
        { name: "Team", webLink: "https://jesuscollective.com/team" }
      ]
    },
    constants["SETTING_ISVISIBLE_event"] ? {
      name: "Events",
      subMenu: [
        { name: "My Events", linkTo: "EventsScreen", navProps: { mine: true }, webLink: `${window.location.origin}/app/events?mine=true` },
        { name: "Recommended", linkTo: null }
      ]
    } : null
    ,
    constants["SETTING_ISVISIBLE_group"] ? {
      name: "Groups",
      subMenu: [
        { name: "My Groups", linkTo: "GroupsScreen", navProps: { mine: true }, webLink: `${window.location.origin}/app/groups?mine=true` },
        { name: "Recommended", linkTo: null }

      ]
    } : null,
    constants["SETTING_ISVISIBLE_resource"] ? {
      name: "Resources",
      subMenu: [
        { name: "Kids & Youth", linkTo: "ResourceScreen", navProps: { create: false, id: 'resource-1580889856205' }, webLink: `${window.location.origin}/app/resource?create=false&id=resource-1580889856205` },
        { name: "Training", linkTo: null },
        { name: "Adult Teaching", linkTo: null }

      ]
    } : null,
    {
      name: "Contact Us",
      subMenu: [
        { name: "Get Involved", linkTo: null },
        { name: "Connect With Us", webLink: "mailto:connect@jesuscollective.com" },
        { name: "Report bugs", webLink: "mailto:bug.report@jesuscollective.com" }
      ]
    },
  ]
  openDrawer = (): void => {
    this.props.navigation.dispatch(DrawerActions.openDrawer());
  }
  openScreen = (screen: string, props: SubMenuItem['navProps']): void => {
    this.props.navigation.navigate(screen, props);
  }
  open = async (obj: SubMenuItem): Promise<void> => {
    if (Platform.OS === 'web' && obj.webLink) {
      window.open(obj.webLink, '_blank', 'noopener noreferrer')
    } else if (obj.linkTo && obj.navProps) {
      this.openScreen(obj.linkTo, obj.navProps)
    } else if (obj.webLink) {
      try {
        const supported = await Linking.canOpenURL(obj.webLink)
        if (supported)
          await Linking.openURL(obj.webLink)
      } catch (e) {
        console.error(e)
      }
    } else {
      console.error('Unable to navigate')
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
              onPress={() => { this.open({ name: "Home", linkTo: "HomeScreen", navProps: {} }) }}>
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
                  {item.subMenu.map((item2) => {
                    if (item2.linkTo || item2.webLink)
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