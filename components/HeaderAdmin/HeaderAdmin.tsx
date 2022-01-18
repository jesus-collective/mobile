import { DrawerActions } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
//import styles from '../Header/style'
import { Auth } from "aws-amplify"
import { Body, Button, Header } from "native-base"
import React from "react"
import { Dimensions, Text } from "react-native"
import { JCCognitoUser } from "../../src/types"
import HeaderStyles from "../Header/style"
import JCComponent from "../JCComponent/JCComponent"

interface Props {
  navigation: StackNavigationProp<any, any>
  title: string
  onMapChange?(): any
}

export default class HeaderJC extends JCComponent<Props> {
  constructor(props: Props) {
    super(props)
  }
  headerStyles = HeaderStyles.getInstance()

  updateStyles = (): void => {
    this.headerStyles.update()
    this.forceUpdate()
  }
  componentDidMount(): void {
    Dimensions.addEventListener("change", this.updateStyles)
  }
  componentWillUnmount(): void {
    // Important to stop updating state after unmount
    Dimensions.removeEventListener("change", this.updateStyles)
  }

  openDrawer = (): void => {
    this.props.navigation.dispatch(DrawerActions.openDrawer())
  }
  openProfile = async (): Promise<void> => {
    const user = (await Auth.currentAuthenticatedUser()) as JCCognitoUser
    this.props.navigation.push("ProfileScreen", { id: user["username"], create: false })
  }
  openAdmin = async (): Promise<void> => {
    const user = (await Auth.currentAuthenticatedUser()) as JCCognitoUser
    this.props.navigation.push("AdminScreen", { id: user["username"], create: false })
  }
  openAdminCRM = async (): Promise<void> => {
    const user = (await Auth.currentAuthenticatedUser()) as JCCognitoUser
    this.props.navigation.push("AdminCRMScreen", { id: user["username"], create: false })
  }
  openProducts = async (): Promise<void> => {
    const user = (await Auth.currentAuthenticatedUser()) as JCCognitoUser
    this.props.navigation.push("AdminCreateProductScreen", { id: user["username"], create: false })
  }
  openSearch = (): void => {
    this.props.navigation.push("SearchScreen")
  }
  openEvents = (): void => {
    this.props.navigation.push("EventsScreen")
  }
  openMenu = (): void => {
    this.props.navigation.push("AdminMenuScreen")
  }
  openResources = (): void => {
    this.props.navigation.push("ResourcesScreen")
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
  render(): React.ReactNode {
    //const { navigate } = this.props.navigation;
    return (
      <Header style={this.headerStyles.style.adminContainer}>
        {/* <Left>
          <Button style={this.headerStyles.style.leftButtonsSubNav}
            transparent
            onPress={this.openDrawer}>
            <Ionicons name="md-menu" style={this.headerStyles.style.icon} />
          </Button>
        </Left> */}
        <Body style={this.styles.style.adminSubNav}>
          <Button
            transparent
            testID="header-events"
            onPress={this.openAdmin}
            style={this.headerStyles.style.centerMenuButtonsSubNav}
          >
            <Text style={this.headerStyles.style.centerMenuButtonsText}>Admin</Text>
          </Button>
          <Button
            transparent
            testID="header-events"
            onPress={this.openAdminCRM}
            style={this.headerStyles.style.centerMenuButtonsSubNav}
          >
            <Text style={this.headerStyles.style.centerMenuButtonsText}>CRM</Text>
          </Button>

          <Button
            transparent
            testID="header-events"
            onPress={this.openProducts}
            style={this.headerStyles.style.centerMenuButtonsSubNav}
          >
            <Text style={this.headerStyles.style.centerMenuButtonsText}>Products</Text>
          </Button>
          <Button
            transparent
            testID="header-events"
            onPress={this.openEvents}
            style={this.headerStyles.style.centerMenuButtonsSubNav}
          >
            <Text style={this.headerStyles.style.centerMenuButtonsText}>Stats</Text>
          </Button>
          <Button
            transparent
            testID="header-events"
            onPress={this.openEvents}
            style={this.headerStyles.style.centerMenuButtonsSubNav}
          >
            <Text style={this.headerStyles.style.centerMenuButtonsText}>Config</Text>
          </Button>
          <Button
            transparent
            testID="header-events"
            onPress={this.openMenu}
            style={this.headerStyles.style.centerMenuButtonsSubNav}
          >
            <Text style={this.headerStyles.style.centerMenuButtonsText}>Menu</Text>
          </Button>
        </Body>
        {/* <Right>


        </Right> */}
      </Header>
    )
  }
}
