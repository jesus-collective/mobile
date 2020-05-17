import { Header, Left, Body, Right, Button } from 'native-base';
import { DrawerActions } from 'react-navigation-drawer';

import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Text } from 'react-native';
import styles from '../Header/style'
import { Auth } from 'aws-amplify';
import { constants } from '../../src/constants'

interface Props {
  navigation: any
  title: string,
  onMapChange?(): any
}
interface State { }
export default class HeaderJC extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
  }

  openDrawer = () => {
    this.props.navigation.dispatch(DrawerActions.openDrawer());
  }
  openProfile = async () => {
    var user = await Auth.currentAuthenticatedUser();
    this.props.navigation.push("ProfileScreen", { id: user['username'], create: false });
  }
  openSearch = () => {
    this.props.navigation.push("SearchScreen");
  }
  openEvents = () => {
    this.props.navigation.push("EventsScreen");
  }
  openResources = () => {
    this.props.navigation.push("ResourcesScreen");
  }
  openGroups = () => {
    this.props.navigation.push("GroupsScreen");
  }
  openHome = () => {
    this.props.navigation.push("HomeScreen");
  }
  openCourses = () => {
    this.props.navigation.push("CoursesScreen");
  }
  showMap = () => {
    if (this.props.onMapChange != null)
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
            data-testid="header-logo"
            onPress={this.openHome}>
            <Image style={styles.logo}
              source={require('../../assets/header/icon.png')}
            /></Button>
          {
            constants["SETTING_ISVISIBLE_event"] ?
              <Button
                transparent
                data-testId="header-events"
                onPress={this.openEvents}
                style={styles.centerMenuButtons}>
                <Text style={styles.centerMenuButtonsText}>Events</Text>
              </Button>
              : null
          }
          {
            constants["SETTING_ISVISIBLE_group"] ?
              <Button
                transparent
                data-testid="header-groups"
                onPress={this.openGroups}
                style={styles.centerMenuButtons}>
                <Text style={styles.centerMenuButtonsText}>Groups</Text>
              </Button> : null
          }
          {
            constants["SETTING_ISVISIBLE_resource"] ?
              <Button
                transparent
                data-testid="header-resources"
                onPress={this.openResources}
                style={styles.centerMenuButtons}>
                <Text style={styles.centerMenuButtonsText}>Resources</Text>
              </Button> : null
          }
          {
            constants["SETTING_ISVISIBLE_course"] ?
              <Button
                transparent
                data-testid="header-courses"
                onPress={this.openCourses}
                style={styles.centerMenuButtons}>
                <Text style={styles.centerMenuButtonsText}>Courses</Text>
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
                  <Ionicons name="md-map" style={styles.icon} />
                </Button> : null
              : null
          }
          {
            constants["SETTING_ISVISIBLE_SEARCH"] ?
              <Button
                transparent
                data-testid="header-search"
                onPress={this.openSearch}>
                <Ionicons name="md-search" style={styles.icon} />
              </Button> : null
          }

          <Button
            transparent
            data-testid="header-profile"
            onPress={this.openProfile}>
            <Ionicons name="md-person" style={styles.icon} />
          </Button>

        </Right>
      </Header>
    )
  }
}