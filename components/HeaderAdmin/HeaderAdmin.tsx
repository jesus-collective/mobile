import { Header, Left, Body, Right, Button } from 'native-base';
import { DrawerActions } from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, Dimensions } from 'react-native';
//import styles from '../Header/style'
import { Auth } from 'aws-amplify';
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
  openAdmin = async (): Promise<void> => {
    const user = await Auth.currentAuthenticatedUser();
    this.props.navigation.push("AdminScreen", { id: user['username'], create: false });
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

      <Header style={this.headerStyles.style.adminContainer}>
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
            data-testId="header-events"
            onPress={this.openEvents}
            style={this.headerStyles.style.centerMenuButtons}>
            <Text style={this.headerStyles.style.centerMenuButtonsText}>Admin</Text>
          </Button>
          <Button
            transparent
            data-testid="header-events"
            onPress={this.openEvents}
            style={this.headerStyles.style.centerMenuButtons}>
            <Text style={this.headerStyles.style.centerMenuButtonsText}>CRM</Text>
          </Button>
          <Button
            transparent
            data-testId="header-events"
            onPress={this.openEvents}
            style={this.headerStyles.style.centerMenuButtons}>
            <Text style={this.headerStyles.style.centerMenuButtonsText}>Stats</Text>
          </Button>
          <Button
            transparent
            data-testId="header-events"
            onPress={this.openEvents}
            style={this.headerStyles.style.centerMenuButtons}>
            <Text style={this.headerStyles.style.centerMenuButtonsText}>Config</Text>
          </Button>

        </Body>
        <Right>


        </Right>
      </Header>
    )
  }
}