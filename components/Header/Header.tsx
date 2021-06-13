import { Ionicons } from "@expo/vector-icons"
import Divider from "@material-ui/core/Divider"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import { DrawerActions } from "@react-navigation/native"
//import styles from '../Header/style'
import { Auth } from "aws-amplify"
import { Body, Button, Header, Left, Right } from "native-base"
import React, { HTMLAttributes } from "react"
import { Dimensions, Image, Text } from "react-native"
import { UserContext } from "../../screens/HomeScreen/UserContext"
import { constants } from "../../src/constants"
import { JCCognitoUser } from "../../src/types"
import HeaderStyles from "../Header/style"
import JCComponent, { JCState } from "../JCComponent/JCComponent"
interface Props {
  navigation: any
  title: string
  onMapChange?(): any
}

interface State extends JCState {
  resourcesDropdown: HTMLElement | null
  resourcesStyle: HTMLAttributes<HTMLButtonElement>["style"]
  chevronStyle: HTMLAttributes<HTMLImageElement>["style"]
}

const chevronStyle1 = { paddingLeft: 8, paddingTop: 2 }

const chevronStyle2 = { paddingLeft: 8, paddingTop: 2, display: "none" }

const resourcesStyle1 = {
  backgroundColor: "transparent",
  borderWidth: 0,
  height: 45,
  paddingBottom: 12,
  paddingTop: 6,
  marginRight: 30,
}

const resourcesStyle2 = {
  backgroundColor: "transparent",
  borderWidth: 0,
  height: 45,
  paddingBottom: 12,
  paddingTop: 6,
  marginRight: 30,
  cursor: "pointer",
}

export default class HeaderJC extends JCComponent<Props, State> {
  headerStyles: HeaderStyles = HeaderStyles.getInstance()

  constructor(props: Props) {
    super(props)
    this.state = {
      ...super.getInitialState(),
      resourcesDropdown: null,
      resourcesStyle: resourcesStyle1,
      chevronStyle: Dimensions.get("window").width > 720 ? chevronStyle1 : chevronStyle2,
    }
  }

  updateStyles = (): void => {
    this.headerStyles.update()
    this.updateResourceStyles()
    this.forceUpdate()
  }
  componentDidMount(): void {
    Dimensions.addEventListener("change", this.updateStyles)
  }
  componentWillUnmount(): void {
    // Important to stop updating state after unmount
    Dimensions.removeEventListener("change", this.updateStyles)
  }

  updateResourceStyles = (): void => {
    const bigScreen = Dimensions.get("window").width > 720
    if (bigScreen)
      this.setState({
        resourcesStyle: resourcesStyle1,
        chevronStyle: chevronStyle1,
      })
    else
      this.setState({
        resourcesStyle: { display: "none" },
        chevronStyle: chevronStyle2,
      })
  }

  openDrawer = (): void => {
    this.props.navigation.dispatch(DrawerActions.openDrawer())
  }
  openProfile = async (): Promise<void> => {
    const user = (await Auth.currentAuthenticatedUser()) as JCCognitoUser
    this.props.navigation.push("ProfileScreen", {
      id: user["username"],
      create: false,
    })
  }
  openAdmin = async (): Promise<void> => {
    const user = (await Auth.currentAuthenticatedUser()) as JCCognitoUser
    this.props.navigation.push("AdminScreen", {
      id: user["username"],
      create: false,
    })
  }
  openSearch = (): void => {
    this.props.navigation.push("SearchScreen")
  }
  openEvents = (): void => {
    this.props.navigation.push("EventsScreen")
  }
  openResources = (): void => {
    this.handleResourcesDropdownClose()
    this.props.navigation.push("ResourcesScreen")
  }
  openMessages = (): void => {
    this.props.navigation.push("ConversationScreen")
  }
  openKids = (): void => {
    this.handleResourcesDropdownClose()
    this.props.navigation.push("ResourceScreen", {
      create: false,
      id: constants["SETTING_KY_GROUP_ID"],
    })
  }
  openGroups = (): void => {
    this.props.navigation.push("GroupsScreen")
  }
  openHome = (): void => {
    this.props.navigation.push("HomeScreen")
  }
  openCourses = (): void => {
    this.props.navigation.push("CoursesScreen")
  }
  showMap = (): void => {
    if (this.props.onMapChange != null) this.props.onMapChange()
  }
  handleResourcesDropdownClick = (event: React.MouseEvent<HTMLElement>): void => {
    this.setState({ resourcesDropdown: event.currentTarget })
  }
  handleResourcesDropdownClose = (): void => {
    this.setState({ resourcesDropdown: null })
  }
  static UserConsumer = UserContext.Consumer

  render(): React.ReactNode {
    return (
      <HeaderJC.UserConsumer>
        {({ userState, userActions }) => {
          if (!userState) return null
          return (
            <Header style={this.headerStyles.style.container}>
              <Left style={this.styles.style.headerLeft}>
                <Button
                  testID="header-hamburger"
                  style={this.headerStyles.style.leftButtons}
                  transparent
                  onPress={this.openDrawer}
                >
                  <Ionicons name="md-menu" style={this.headerStyles.style.icon} />
                </Button>
              </Left>
              <Body style={this.styles.style.headerMiddleBody}>
                <Button transparent onPress={this.openHome} testID="header-logo">
                  <Image
                    style={this.headerStyles.style.logo}
                    source={require("../../assets/header/icon.png")}
                  />
                </Button>
                {constants["SETTING_ISVISIBLE_event"] ? (
                  <Button
                    transparent
                    testID="header-events"
                    onPress={this.openEvents}
                    style={this.headerStyles.style.centerMenuButtons}
                  >
                    <Text style={this.headerStyles.style.centerMenuButtonsText}>Events</Text>
                  </Button>
                ) : null}
                {constants["SETTING_ISVISIBLE_group"] ? (
                  <Button
                    transparent
                    testID="header-groups"
                    onPress={this.openGroups}
                    style={this.headerStyles.style.centerMenuButtons}
                  >
                    <Text style={this.headerStyles.style.centerMenuButtonsText}>Groups</Text>
                  </Button>
                ) : null}
                {constants["SETTING_ISVISIBLE_resource"] ? (
                  <button
                    data-testid="header-resources"
                    onClick={this.handleResourcesDropdownClick}
                    onMouseEnter={() => this.setState({ resourcesStyle: resourcesStyle2 })}
                    onMouseLeave={() => this.setState({ resourcesStyle: resourcesStyle1 })}
                    style={this.state.resourcesStyle}
                  >
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <Text style={this.headerStyles.style.centerMenuButtonsTextResources}>
                        Resources
                      </Text>
                      <img
                        src={require("../../assets/svg/dropdown.svg")}
                        style={this.state.chevronStyle}
                      ></img>
                    </div>
                  </button>
                ) : null}
                {constants["SETTING_ISVISIBLE_resource"] ? (
                  <Menu
                    keepMounted
                    anchorEl={this.state.resourcesDropdown}
                    open={Boolean(this.state.resourcesDropdown)}
                    onClose={this.handleResourcesDropdownClose}
                    style={{ marginTop: 40 }}
                  >
                    <MenuItem onClick={this.openResources}>
                      <Text
                        testID="header-resources-all"
                        style={this.headerStyles.style.dropdownText}
                      >
                        All Resources
                      </Text>
                    </MenuItem>
                    <Divider style={{ backgroundColor: "black" }} />
                    <MenuItem onClick={this.openKids}>
                      <Text style={this.headerStyles.style.dropdownText}>One Story Curriculum</Text>
                    </MenuItem>
                  </Menu>
                ) : null}
                {constants["SETTING_ISVISIBLE_course"] &&
                (userActions.isMemberOf("courseUser") ||
                  userActions.isMemberOf("courseCoach") ||
                  userActions.isMemberOf("courseAdmin")) ? (
                  <Button
                    transparent
                    testID="header-courses"
                    onPress={this.openCourses}
                    style={this.headerStyles.style.centerMenuButtons}
                  >
                    <Text style={this.headerStyles.style.centerMenuButtonsText}>Courses</Text>
                  </Button>
                ) : null}
              </Body>
              <Right style={this.headerStyles.style.headerRightContainer}>
                {constants["SETTING_ISVISIBLE_ADMIN"] && userActions.isMemberOf("admin") ? (
                  <Button transparent testID="header-map" onPress={this.openAdmin}>
                    <Ionicons name="ios-rocket" style={this.headerStyles.style.icon} />
                  </Button>
                ) : null}
                {constants["SETTING_ISVISIBLE_MESSAGES"] ? (
                  <Button transparent testID="header-messages" onPress={this.openMessages}>
                    <Ionicons name="mail-outline" style={this.headerStyles.style.icon} />
                  </Button>
                ) : null}
                {constants["SETTING_ISVISIBLE_MAP"] ? (
                  this.props.onMapChange != null ? (
                    <Button transparent testID="header-map" onPress={this.showMap}>
                      <Ionicons name="md-map" style={this.headerStyles.style.icon} />
                    </Button>
                  ) : null
                ) : null}
                {constants["SETTING_ISVISIBLE_SEARCH"] ? (
                  <Button transparent testID="header-search" onPress={this.openSearch}>
                    <Ionicons name="md-search" style={this.headerStyles.style.icon} />
                  </Button>
                ) : null}

                <Button transparent testID="header-profile" onPress={this.openProfile}>
                  <Ionicons name="md-person" style={this.headerStyles.style.icon} />
                </Button>
              </Right>
            </Header>
          )
        }}
      </HeaderJC.UserConsumer>
    )
  }
}
