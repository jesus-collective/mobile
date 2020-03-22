import { Header, Left, Body, Right, Button } from 'native-base';
import { DrawerActions } from 'react-navigation-drawer';

import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Text } from 'react-native';
import styles from '../Header/style.js'
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
            onPress={this.openHome}>
            <Image style={styles.logo}
              source={require('./icon.png')}
            /></Button>
          {
            constants["SETTING_ISVISIBLE_event"] ?
              <Button
                transparent
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
                onPress={this.openGroups}
                style={styles.centerMenuButtons}>
                <Text style={styles.centerMenuButtonsText}>Groups</Text>
              </Button> : null
          }
          {
            constants["SETTING_ISVISIBLE_resource"] ?
              <Button
                transparent
                onPress={this.openResources}
                style={styles.centerMenuButtons}>
                <Text style={styles.centerMenuButtonsText}>Resources</Text>
              </Button> : null
          }
          {
            constants["SETTING_ISVISIBLE_course"] ?
              <Button
                transparent
                onPress={this.openCourses}
                style={styles.centerMenuButtons}>
                <Text style={styles.centerMenuButtonsText}>Courses</Text>
              </Button> : null
          }

        </Body>
        <Right>
          {
            constants["SETTING_ISVISIBLE_MAP"] ?
              <Button
                transparent
                onPress={this.showMap}>
                <Ionicons name="md-map" style={styles.icon} />
              </Button> : null
          }
          {
            constants["SETTING_ISVISIBLE_SEARCH"] ?
              <Button
                transparent
                onPress={this.openSearch}>
                <Ionicons name="md-search" style={styles.icon} />
              </Button> : null
          }

          <Button
            transparent
            onPress={this.openProfile}>
            <Ionicons name="md-person" style={styles.icon} />
          </Button>

        </Right>
      </Header>
    )
  }
}