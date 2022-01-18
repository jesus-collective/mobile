import { Ionicons } from "@expo/vector-icons"
import Divider from "@material-ui/core/Divider"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import { DrawerActions, useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { Auth } from "aws-amplify"
import React, { HTMLAttributes, useContext, useEffect, useState } from "react"
import { BrowserView, MobileOnlyView } from "react-device-detect"
import { Dimensions, Image, Text, TouchableOpacity, useWindowDimensions, View } from "react-native"
import { ListMenusQuery } from "src/API-customqueries"
import { Data } from "../../components/Data/Data"
import { UserContext } from "../../screens/HomeScreen/UserContext"
import { constants } from "../../src/constants"
import { JCCognitoUser } from "../../src/types"
import HeaderStyles from "../Header/style"
import { JCState } from "../JCComponent/JCComponent"
import { HeaderControls } from "./HeaderControls"
import { SubHeader } from "./SubHeader"
interface Props {
  navigation?: StackNavigationProp<any, any>
  title: string
  onMapChange?(): any
  backAction?: () => void
  subnav?: any
  controls?: any
  drawerState?: boolean
  showAdmin?: boolean
}

interface State extends JCState {
  menuDropdown: { [menuId: string]: HTMLElement | null }
  resourcesDropdown: HTMLElement | null
  resourcesStyle: HTMLAttributes<HTMLButtonElement>["style"]
  chevronStyle: HTMLAttributes<HTMLImageElement>["style"]
  user: JCCognitoUser | null
  menus: NonNullable<ListMenusQuery["listMenus"]>["items"]
  menuStyle: { [menuId: string]: any }
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
  const { width } = useWindowDimensions()
  const isOpen = props?.drawerState // useDrawerStatus() is needed when in a drawer navigator to determine hamburger icon state
  /* 
      TODOS:
        - Refactor styles, remove media queries (?)
  */
  const determineTitleMarginLeft = (controlCount = 0) => {
    // this is based on current header button sizes
    // if sizes change this will also need to be changed in order for the header title to be centered
    if (controlCount === 1) return 8
    if (controlCount === 2) return 56
    if (controlCount === 3) return 88
    // We might want to cap control at 2 especially if page titles get long
    return -24
  }
  const [state, setState] = useState<State>({
    menus: [],
    menuStyle: {},
    menuDropdown: {},
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
    navigation?.dispatch(DrawerActions.toggleDrawer())
  }

  const openAdmin = async (): Promise<void> => {
    const user = (await Auth.currentAuthenticatedUser()) as JCCognitoUser
    navigation?.push("AdminScreen", {
      id: user["username"],
      create: false,
    })
  }
  const openScreen = (screen: string): void => {
    navigation?.push(screen)
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
    Data.listMenu(null)
      .then((listMenus) => {
        console.log({ listMenus: listMenus })
        setState((prev) => ({
          ...prev,
          menus:
            listMenus.data?.listMenus?.items.sort((x, y) => (x.order ?? 0) - (y.order ?? 0)) ?? [],
        }))
      })
      .catch((e) => {
        setState((prev) => ({ ...prev, menus: e.data?.listMenus?.items ?? [] }))
      })

    const loadUser = async () => {
      const userData = await Auth.currentAuthenticatedUser()
      setState((prev) => ({ ...prev, user: userData }))
    }
    loadUser()
    //Dimensions.addEventListener("change", updateStyles)
    return () => {
      //Dimensions.removeEventListener("change", updateStyles)
    }
  }, [])
  const handleMenuDropdownClick = (event: React.MouseEvent<HTMLElement>, id: string): void => {
    const z = state.menuDropdown
    z[id] = event.currentTarget
    setState((prev) => ({
      ...prev,
      menuDropdown: z,
    }))
  }
  const handleMenuDropdownClose = (id: string): void => {
    const z = state.menuDropdown
    z[id] = null
    setState((prev) => ({
      ...prev,
      menuDropdown: z,
    }))
  }

  return (
    <>
      <BrowserView>
        <View style={headerStyles.style.container}>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity style={{ paddingTop: 6 }} onPress={openHome} testID="header-logo">
              <Image
                style={
                  width < 1300
                    ? { marginRight: 16, width: 24.82, height: 30 }
                    : {
                        resizeMode: "stretch",
                        width: 126,
                        height: 33,
                        marginRight: 48,
                        marginTop: 5,
                        marginBottom: 10,
                      }
                }
                source={require(`../../assets/header/${
                  width < 1300 ? "JCLogo.png" : "newicon.png"
                }`)}
              />
            </TouchableOpacity>
            <View
              style={{ justifyContent: "flex-end", flexDirection: "row", alignItems: "center" }}
            >
              {constants["SETTING_MENU_custom"] ? (
                <>
                  {state.menus.map((mapItem) => {
                    return (mapItem.subItems?.items?.length ?? 0) > 0 ? (
                      <>
                        <button
                          data-testid="header-resources"
                          onClick={(e) => {
                            handleMenuDropdownClick(e, mapItem.id)
                          }}
                          onMouseEnter={() => {
                            const z = state.menuStyle
                            z[mapItem.id] = resourcesStyle2
                            setState((prev) => ({
                              ...prev,
                              menuStyle: z,
                            }))
                          }}
                          onMouseLeave={() => {
                            const z = state.menuStyle
                            z[mapItem.id] = resourcesStyle1
                            setState((prev) => ({
                              ...prev,
                              menuStyle: z,
                            }))
                          }}
                          style={state.menuStyle[mapItem.id] ?? resourcesStyle1}
                        >
                          <div style={{ display: "flex", flexDirection: "row" }}>
                            <Text style={headerStyles.style.centerMenuButtonsTextResources}>
                              {mapItem.name}
                            </Text>
                            <img
                              src={require("../../assets/svg/dropdown.svg")}
                              style={state.chevronStyle}
                            ></img>
                          </div>
                        </button>
                        <Menu
                          keepMounted
                          anchorEl={state.menuDropdown[mapItem.id]}
                          open={Boolean(state.menuDropdown[mapItem.id])}
                          onClose={() => {
                            handleMenuDropdownClose(mapItem.id)
                          }}
                          style={{ marginTop: 40 }}
                        >
                          {mapItem.subItems?.items.map((subItem) => {
                            return (
                              <MenuItem
                                onClick={() => {
                                  openScreen(subItem.action ?? "")
                                }}
                              >
                                <Text
                                  testID="header-resources-all"
                                  style={headerStyles.style.dropdownText}
                                >
                                  {subItem.name}
                                </Text>
                              </MenuItem>
                            )
                          })}
                        </Menu>
                      </>
                    ) : (
                      <TouchableOpacity
                        onPress={() => {
                          openScreen(mapItem.action ?? "")
                        }}
                        style={headerStyles.style.centerMenuButtons}
                      >
                        <Text style={headerStyles.style.centerMenuButtonsText}>
                          {" "}
                          {mapItem.name}
                        </Text>
                      </TouchableOpacity>
                    )
                  })}
                </>
              ) : (
                <>
                  {constants["SETTING_ISVISIBLE_people"] ? (
                    <TouchableOpacity
                      onPress={() => navigation.navigate("ProfilesScreen")}
                      style={headerStyles.style.centerMenuButtons}
                    >
                      <Text style={headerStyles.style.centerMenuButtonsText}>People</Text>
                    </TouchableOpacity>
                  ) : null}
                  {constants["SETTING_ISVISIBLE_orgs"] ? (
                    <TouchableOpacity
                      onPress={() => null}
                      style={headerStyles.style.centerMenuButtons}
                    >
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
                      style={{ ...state.resourcesStyle, display: width > 750 ? "flex" : "none" }}
                    >
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <Text style={headerStyles.style.centerMenuButtonsTextResources}>
                          Resources
                        </Text>
                        <img
                          src={require("../../assets/svg/dropdown.svg")}
                          style={state.chevronStyle}
                        ></img>
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
                  {props?.showAdmin ? (
                    <>
                      <TouchableOpacity
                        testID="header-groups"
                        onPress={() =>
                          navigation.navigate("AdminScreen", {
                            id: state.user?.username,
                            create: false,
                          })
                        }
                        style={headerStyles.style.centerMenuButtons}
                      >
                        <Text style={headerStyles.style.centerMenuButtonsText}>Admin</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        testID="header-groups"
                        onPress={() =>
                          navigation.navigate("AdminCRMScreen", {
                            id: state.user?.username,
                            create: false,
                          })
                        }
                        style={headerStyles.style.centerMenuButtons}
                      >
                        <Text style={headerStyles.style.centerMenuButtonsText}>CRM</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        testID="header-groups"
                        onPress={() =>
                          navigation.navigate("AdminCreateProductScreen", {
                            id: state.user?.username,
                            create: false,
                          })
                        }
                        style={headerStyles.style.centerMenuButtons}
                      >
                        <Text style={headerStyles.style.centerMenuButtonsText}>Products</Text>
                      </TouchableOpacity>
                    </>
                  ) : null}
                </>
              )}
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
            </View>
            <View style={{ marginHorizontal: 12, justifyContent: "center" }}>
              <TouchableOpacity
                testID="header-hamburger"
                style={headerStyles.style.leftButtons}
                onPress={openDrawer}
              >
                {isOpen ? (
                  <Image
                    style={headerStyles.style.icon}
                    source={require("../../assets/header/X.png")}
                  />
                ) : (
                  <Image
                    style={headerStyles.style.icon}
                    source={require("../../assets/header/Boxes.png")}
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </BrowserView>
      <MobileOnlyView>
        <View
          style={{
            flexDirection: "column",
            flex: 1,
            borderBottomWidth: 1,
            borderBottomColor: "#E4E1E1",
            paddingTop: 16,
            paddingHorizontal: 16,
            backgroundColor: "#fff",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              paddingBottom: 12,
            }}
          >
            {props.title !== "Home" ? (
              <TouchableOpacity
                onPress={() => {
                  if (props.backAction) props.backAction()
                  else navigation.goBack()
                }}
              >
                <Image
                  source={require("../../assets/header/Left-Arrow.png")}
                  style={{ width: 24, height: 24 }}
                />
              </TouchableOpacity>
            ) : null}
            <Text
              numberOfLines={1}
              style={{
                marginLeft: determineTitleMarginLeft(props?.controls?.length),
                fontFamily: "Graphik-Semibold-App",
                fontSize: 15,
                lineHeight: 24,
                color: "#1A0706",
                textAlign: "center",
                flex: 1,
              }}
            >
              {props.title}
            </Text>
            {props.controls ? <HeaderControls controls={props.controls} /> : null}
          </View>
          {props.subnav ? <SubHeader navItems={props.subnav} /> : null}
        </View>
      </MobileOnlyView>
    </>
  )
}
