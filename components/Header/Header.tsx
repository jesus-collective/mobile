import { Ionicons } from "@expo/vector-icons"
import Divider from "@material-ui/core/Divider"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import { DrawerActions, useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { Auth } from "aws-amplify"
import React, { HTMLAttributes, useContext, useEffect, useState } from "react"
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native"
import ProfileImage from "../../components/ProfileImage/ProfileImage"
import { UserContext } from "../../screens/HomeScreen/UserContext"
import { constants } from "../../src/constants"
import { JCCognitoUser } from "../../src/types"
import HeaderStyles from "../Header/style"
import { JCState } from "../JCComponent/JCComponent"
interface Props {
  navigation?: StackNavigationProp<any, any>
  title: string
  onMapChange?(): any
}

interface State extends JCState {
  resourcesDropdown: HTMLElement | null
  resourcesStyle: HTMLAttributes<HTMLButtonElement>["style"]
  chevronStyle: HTMLAttributes<HTMLImageElement>["style"]
  user: JCCognitoUser | null
}

const chevronStyle1 = { paddingLeft: 8, paddingTop: 2 }

const chevronStyle2 = { paddingLeft: 8, paddingTop: 2, display: "none" }

const resourcesStyle1 = {
  backgroundColor: "transparent",
  borderWidth: 0,
  display: "flex",
  marginRight: 30,
}

const resourcesStyle2 = {
  backgroundColor: "transparent",
  borderWidth: 0,
  display: "flex",
  marginRight: 30,
  cursor: "pointer",
}

export default function HeaderJCC(props: Props) {
  /* 
    On mobile devices the header should only show:
      - back button
      - page title
      - page actions
      TODOS:
        - Refactor styles, remove media queries (?)
        - Bottom Tav Navigation for mobile devices
        - Implement mobile header
  */
  const [state, setState] = useState<State>({
    resourcesDropdown: null,
    resourcesStyle: resourcesStyle1,
    chevronStyle: Dimensions.get("window").width > 720 ? chevronStyle1 : chevronStyle2,
    user: null,
  })
  const headerStyles = HeaderStyles.getInstance()
  const navigation = useNavigation<any>()
  const { userActions } = useContext(UserContext)
  const updateResourceStyles = (): void => {
    const bigScreen = Dimensions.get("window").width > 720
    if (bigScreen)
      setState({
        ...state,
        resourcesStyle: resourcesStyle1,
        chevronStyle: chevronStyle1,
      })
    else
      setState({
        ...state,
        resourcesStyle: { ...state.resourcesStyle, display: "none" },
        chevronStyle: chevronStyle2,
      })
  }
  const updateStyles = (): void => {
    headerStyles.update()
    updateResourceStyles()
  }
  const openDrawer = (): void => {
    navigation?.dispatch(DrawerActions.openDrawer())
  }

  const openAdmin = async (): Promise<void> => {
    const user = (await Auth.currentAuthenticatedUser()) as JCCognitoUser
    navigation?.push("AdminScreen", {
      id: user["username"],
      create: false,
    })
  }
  const openSearch = (): void => {
    navigation?.push("SearchScreen")
  }
  const openEvents = (): void => {
    navigation?.push("EventsScreen")
  }
  const openResources = (): void => {
    handleResourcesDropdownClose()
    navigation?.push("ResourcesScreen")
  }
  const openMessages = (): void => {
    navigation?.push("ConversationScreen")
  }
  const openKids = (): void => {
    handleResourcesDropdownClose()
    navigation?.push("ResourceScreen", {
      create: false,
      id: constants["SETTING_KY_GROUP_ID"],
    })
  }
  const openGroups = (): void => {
    navigation?.push("GroupsScreen")
  }
  const openHome = (): void => {
    navigation?.push("HomeScreen")
  }
  const openCourses = (): void => {
    navigation?.push("CoursesScreen")
  }
  const handleResourcesDropdownClick = (event: React.MouseEvent<HTMLElement>): void => {
    setState({ ...state, resourcesDropdown: event.currentTarget })
  }
  const handleResourcesDropdownClose = (): void => {
    setState({ ...state, resourcesDropdown: null })
  }
  useEffect(() => {
    const loadUser = async () => {
      const userData = await Auth.currentAuthenticatedUser()
      setState((prev) => ({ ...prev, user: userData }))
    }
    loadUser()

    Dimensions.addEventListener("change", updateStyles)
    return () => {
      Dimensions.removeEventListener("change", updateStyles)
    }
  }, [])
  return (
    <View style={headerStyles.style.container}>
      <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity style={{ paddingTop: 6 }} onPress={openHome} testID="header-logo">
          <Image
            style={headerStyles.style.logo}
            source={require(`../../assets/header/${
              Dimensions.get("window").width < 1300 ? "JCLogo.png" : "newicon.png"
            }`)}
          />
        </TouchableOpacity>
        {constants["SETTING_ISVISIBLE_people"] ? (
          <TouchableOpacity onPress={() => null} style={headerStyles.style.centerMenuButtons}>
            <Text style={headerStyles.style.centerMenuButtonsText}>People</Text>
          </TouchableOpacity>
        ) : null}
        {constants["SETTING_ISVISIBLE_orgs"] ? (
          <TouchableOpacity onPress={() => null} style={headerStyles.style.centerMenuButtons}>
            <Text style={headerStyles.style.centerMenuButtonsText}>Orgs</Text>
          </TouchableOpacity>
        ) : null}
        {constants["SETTING_ISVISIBLE_event"] ? (
          <TouchableOpacity
            testID="header-events"
            onPress={openEvents}
            style={headerStyles.style.centerMenuButtons}
          >
            <Text style={headerStyles.style.centerMenuButtonsText}>Events</Text>
          </TouchableOpacity>
        ) : null}
        {constants["SETTING_ISVISIBLE_group"] ? (
          <TouchableOpacity
            testID="header-groups"
            onPress={openGroups}
            style={headerStyles.style.centerMenuButtons}
          >
            <Text style={headerStyles.style.centerMenuButtonsText}>Groups</Text>
          </TouchableOpacity>
        ) : null}
        {constants["SETTING_ISVISIBLE_resource"] ? (
          <button
            data-testid="header-resources"
            onClick={handleResourcesDropdownClick}
            onMouseEnter={() => setState({ ...state, resourcesStyle: resourcesStyle2 })}
            onMouseLeave={() => setState({ ...state, resourcesStyle: resourcesStyle1 })}
            style={state.resourcesStyle}
          >
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Text style={headerStyles.style.centerMenuButtonsTextResources}>Resources</Text>
              <img src={require("../../assets/svg/dropdown.svg")} style={state.chevronStyle}></img>
            </div>
          </button>
        ) : null}
        {constants["SETTING_ISVISIBLE_resource"] ? (
          <Menu
            style={{ marginTop: 40, marginLeft: 6 }}
            keepMounted
            anchorEl={state.resourcesDropdown}
            open={Boolean(state.resourcesDropdown)}
            onClose={handleResourcesDropdownClose}
          >
            <MenuItem onClick={openResources}>
              <Text testID="header-resources-all" style={headerStyles.style.dropdownText}>
                All Resources
              </Text>
            </MenuItem>
            <Divider style={{ backgroundColor: "black" }} />
            <MenuItem onClick={openKids}>
              <Text style={headerStyles.style.dropdownText}>One Story Curriculum</Text>
            </MenuItem>
          </Menu>
        ) : null}
        {constants["SETTING_ISVISIBLE_course"] &&
        (userActions.isMemberOf("courseUser") ||
          userActions.isMemberOf("courseCoach") ||
          userActions.isMemberOf("courseAdmin")) ? (
          <TouchableOpacity
            testID="header-courses"
            onPress={openCourses}
            style={headerStyles.style.centerMenuButtons}
          >
            <Text style={headerStyles.style.centerMenuButtonsText}>Courses</Text>
          </TouchableOpacity>
        ) : null}
      </View>
      <View style={{ justifyContent: "flex-end", flexDirection: "row", alignItems: "center" }}>
        {constants["SETTING_ISVISIBLE_ADMIN"] && userActions.isMemberOf("admin") ? (
          <View style={{ marginHorizontal: 12 }}>
            <TouchableOpacity testID="header-map" onPress={openAdmin}>
              <Ionicons name="ios-rocket" style={headerStyles.style.icon} />
            </TouchableOpacity>
          </View>
        ) : null}
        {constants["SETTING_ISVISIBLE_SEARCH"] ? (
          <View style={{ marginHorizontal: 12 }}>
            <TouchableOpacity testID="header-search" onPress={openSearch}>
              <Ionicons name="md-search" style={headerStyles.style.icon} />
            </TouchableOpacity>
          </View>
        ) : null}

        {constants["SETTING_ISVISIBLE_MESSAGES"] ? (
          <View style={{ marginHorizontal: 12 }}>
            <TouchableOpacity testID="header-messages" onPress={openMessages}>
              <Image
                style={headerStyles.style.icon}
                source={require("../../assets/header/Airplane.png")}
              />
            </TouchableOpacity>
          </View>
        ) : null}
        {constants["SETTING_ISVISIBLE_BELL"] ? (
          <View style={{ marginHorizontal: 12 }}>
            <TouchableOpacity onPress={openMessages}>
              <Image
                style={headerStyles.style.icon}
                source={require("../../assets/header/Bell.png")}
              />
            </TouchableOpacity>
          </View>
        ) : null}
        <View
          style={{
            transform: [{ scale: Dimensions.get("window").width > 1300 ? 0.95 : 0.5 }],
          }}
        >
          <ProfileImage size="small2" linkToProfile user={state?.user?.username} />
        </View>
        <View style={{ marginHorizontal: 12 }}>
          <TouchableOpacity onPress={openMessages}>
            <Image
              style={headerStyles.style.icon}
              source={require("../../assets/header/Cog.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ marginHorizontal: 12, justifyContent: "center" }}>
        <TouchableOpacity
          testID="header-hamburger"
          style={headerStyles.style.leftButtons}
          onPress={openDrawer}
        >
          <Ionicons name="md-menu" style={headerStyles.style.icon} />
        </TouchableOpacity>
      </View>
    </View>
  )
}
