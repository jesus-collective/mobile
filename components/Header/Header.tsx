import { Header, Left, Body, Right, Button } from 'native-base';
import { DrawerActions } from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Text, Dimensions } from 'react-native';
//import styles from '../Header/style'
import { Auth } from 'aws-amplify';
import { constants } from '../../src/constants'
import HeaderStyles from '../Header/style';
import JCComponent from '../JCComponent/JCComponent';

interface Props {
  navigation: any
  title: string,
  onMapChange?(): any
}

export default class HeaderJC extends JCComponent<Props> {

  constructor(props: Props) {
    super(props);
  }
  headerStyles = HeaderStyles.getInstance();

  updateStyles = (): void => {
    this.headerStyles.update()
    this.forceUpdate();
  };
  componentDidMount(): void {
    Dimensions.addEventListener('change', this.updateStyles)
  }
  componentWillUnmount(): void {
    // Important to stop updating state after unmount
    Dimensions.removeEventListener("change", this.updateStyles);
  }

  openDrawer = (): void => {
    this.props.navigation.dispatch(DrawerActions.openDrawer());
  }
  openProfile = async (): Promise<void> => {
    const user = await Auth.currentAuthenticatedUser();
    this.props.navigation.push("ProfileScreen", { id: user['username'], create: false });
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
  showMap = (): void => {
    if (this.props.onMapChange != null)
      this.props.onMapChange()
  }
  render(): React.ReactNode {
    //const { navigate } = this.props.navigation;
    return (

      <Header style={this.headerStyles.style.container}>
        <Left>
          <Button style={this.headerStyles.style.leftButtons}
            transparent
            onPress={this.openDrawer}>
            <Ionicons name="md-menu" style={this.headerStyles.style.icon} />
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
            data-testid="header-logo"
            onPress={this.openHome}>
            <Image style={this.headerStyles.style.logo}
              source={require('../../assets/header/icon.png')}
            /></Button>
          {
            constants["SETTING_ISVISIBLE_event"] ?
              <Button
                transparent
                data-testId="header-events"
                onPress={this.openEvents}
                style={this.headerStyles.style.centerMenuButtons}>
                <Text style={this.headerStyles.style.centerMenuButtonsText}>Events</Text>
              </Button>
              : null
          }
          {
            constants["SETTING_ISVISIBLE_group"] ?
              <Button
                transparent
                data-testid="header-groups"
                onPress={this.openGroups}
                style={this.headerStyles.style.centerMenuButtons}>
                <Text style={this.headerStyles.style.centerMenuButtonsText}>Groups</Text>
              </Button> : null
          }
          {
            constants["SETTING_ISVISIBLE_resource"] ?
              <Button
                transparent
                data-testid="header-resources"
                onPress={this.openResources}
                style={this.headerStyles.style.centerMenuButtons}>
                <Text style={this.headerStyles.style.centerMenuButtonsText}>Resources</Text>
              </Button> : null
          }
          {
            constants["SETTING_ISVISIBLE_course"] ?
              <Button
                transparent
                data-testid="header-courses"
                onPress={this.openCourses}
                style={this.headerStyles.style.centerMenuButtons}>
                <Text style={this.headerStyles.style.centerMenuButtonsText}>Courses</Text>
              </Button> : null
          }

        </Body>
        <Right>
          {
            constants["SETTING_ISVISIBLE_MAP"] ?
              this.props.onMapChange != null ?
                <Button
                  transparent
                  data-testid="header-map"
                  onPress={this.showMap}>
                  <Ionicons name="md-map" style={this.headerStyles.style.icon} />
                </Button> : null
              : null
          }
          {
            constants["SETTING_ISVISIBLE_SEARCH"] ?
              <Button
                transparent
                data-testid="header-search"
                onPress={this.openSearch}>
                <Ionicons name="md-search" style={this.headerStyles.style.icon} />
              </Button> : null
          }

          <Button
            transparent
            data-testid="header-profile"
            onPress={this.openProfile}>
            <Ionicons name="md-person" style={this.headerStyles.style.icon} />
          </Button>

        </Right>
      </Header>
    )
  }
}