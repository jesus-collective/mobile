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
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem'

interface Props {
  navigation: any
  title: string,
  onMapChange?(): any
}

interface State {
  resourcesDropdown: HTMLElement
  resourcesStyle: any
}

const resourcesStyle1 = {
  backgroundColor: 'transparent', 
  borderWidth: 0,                 
  height: 45,
  paddingBottom: 12,
  paddingTop: 6,
  marginRight: 30
}

const resourcesStyle2 = {
  backgroundColor: 'transparent', 
  borderWidth: 0,                 
  height: 45,
  paddingBottom: 12,
  paddingTop: 6,
  marginRight: 30,
  cursor: 'pointer'
}

export default class HeaderJC extends JCComponent<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      resourcesDropdown: null,
      resourcesStyle: resourcesStyle1
    }
  }
  headerStyles = HeaderStyles.getInstance();
  
  updateStyles = (): void => {
    this.headerStyles.update()
    this.updateResourceStyles()
    this.forceUpdate();
  };
  componentDidMount(): void {
    Dimensions.addEventListener('change', this.updateStyles)
  }
  componentWillUnmount(): void {
    // Important to stop updating state after unmount
    Dimensions.removeEventListener("change", this.updateStyles);
  }

  updateResourceStyles = (): void => {
    const bigScreen = Dimensions.get('window').width > 720
    if (bigScreen)
      this.setState({ resourcesStyle: resourcesStyle1 })
    else 
      this.setState({ resourcesStyle: { display: 'none' } })
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
  openKids = (): void => {
    this.handleResourcesDropdownClose()
    this.props.navigation.push("ResourceScreen", {create: false, id: 'resource-1580889856205' });
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
  handleResourcesDropdownClick = (event: React.MouseEvent<HTMLElement>): void => {
    this.setState({ resourcesDropdown: event.currentTarget })
  }
  handleResourcesDropdownClose = (): void => {
    this.setState({ resourcesDropdown: null })
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
              <button 
                onClick={this.handleResourcesDropdownClick} 
                onMouseEnter={()=>this.setState({ resourcesStyle: resourcesStyle2 })}
                onMouseLeave={()=>this.setState({ resourcesStyle: resourcesStyle1 })}
                style={this.state.resourcesStyle}
              >
                <Text style={this.headerStyles.style.centerMenuButtonsTextResources}>Resources</Text>
                <img src={require('../../assets/svg/dropdown.svg')} style={{paddingLeft: 8, paddingBottom: 1}}></img>
              </button> : null
          }
          {
            constants["SETTING_ISVISIBLE_resource"] ?
              <Menu
              keepMounted
              anchorEl={this.state.resourcesDropdown}
              open={Boolean(this.state.resourcesDropdown)}
              onClose={this.handleResourcesDropdownClose}
              style={{ marginTop: 40 }}
              >
                <MenuItem onClick={this.openResources}><Text style={this.headerStyles.style.dropdownText}>Overview</Text></MenuItem>
                <MenuItem onClick={this.openKids}><Text style={this.headerStyles.style.dropdownText}>Kids Curriculum</Text></MenuItem>
              </Menu> : null
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
        <Right style={this.headerStyles.style.headerRightContainer}>
          {
            constants["SETTING_ISVISIBLE_ADMIN"] && this.isMemberOf("admin") ?

              <Button
                transparent
                data-testid="header-map"
                onPress={this.openAdmin}>
                <Ionicons name="ios-rocket" style={this.headerStyles.style.icon} />
              </Button> : null

          }
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