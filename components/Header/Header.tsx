import { Ionicons } from "@expo/vector-icons"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import { DrawerActions, useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { Auth } from "aws-amplify"
import React, { HTMLAttributes, useEffect, useState } from "react"
import { BrowserView, MobileOnlyView } from "react-device-detect"
import { Dimensions, Image, Text, TouchableOpacity, useWindowDimensions, View } from "react-native"
import { ListMenusQuery } from "src/API-customqueries"
import { Data } from "../../components/Data/Data"
import { constants } from "../../src/constants"
import { JCCognitoUser } from "../../src/types"
import HeaderStyles from "../Header/style"
import { JCState } from "../JCComponent/JCComponent"
import ProfileImageNew, {
  ProfileImageQuality,
  ProfileImageStyle,
} from "../ProfileImage/ProfileImageNew"
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
  overrideMenu?: NonNullable<ListMenusQuery["listMenus"]>["items"]
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
      Todo:
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

  /* const updateResourceStyles = (): void => {
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
  }*/
  /* const updateStyles = (): void => {
    headerStyles.update()
    updateResourceStyles()
  }*/
  const openDrawer = (): void => {
    navigation?.dispatch(DrawerActions.toggleDrawer())
  }

  const openScreen = (screen: string, params: any): void => {
    navigation?.push(screen, params == "" ? null : JSON.parse(params))
  }

  const openSearch = (): void => {
    navigation?.push("SearchScreen")
  }

  const openMessages = (): void => {
    navigation?.push("ConversationScreen")
  }

  const openHome = (): void => {
    navigation?.push("HomeScreen")
  }

  useEffect(() => {
    if (props.overrideMenu != null) setState({ ...state, menus: props.overrideMenu })
    else
      Data.listMenu(null)
        .then((listMenus) => {
          console.log({ listMenus: listMenus })
          setState((prev) => ({
            ...prev,
            menus:
              listMenus.data?.listMenus?.items.sort((x, y) => (x?.order ?? 0) - (y?.order ?? 0)) ??
              [],
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
  useEffect(() => {
    if (props.overrideMenu != null) setState({ ...state, menus: props.overrideMenu })
  }, [props.overrideMenu])
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
                source={require(`../../assets/Facelift/svg/${
                  width < 1300 ? "JC-Logo-No-Text.svg" : "JC-Logo.svg"
                }`)}
              />
            </TouchableOpacity>
            <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
              {state.menus.map((mapItem) => {
                if (mapItem == null) return null
                return (mapItem?.subItems?.items?.length ?? 0) > 0 ? (
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
                        if (subItem == null) return null
                        return (
                          <MenuItem
                            onClick={() => {
                              handleMenuDropdownClose(mapItem.id)
                              openScreen(subItem.action ?? "", subItem.params)
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
                      openScreen(mapItem.action ?? "", mapItem.params)
                    }}
                    style={headerStyles.style.centerMenuButtons}
                  >
                    <Text style={headerStyles.style.centerMenuButtonsText}> {mapItem.name}</Text>
                  </TouchableOpacity>
                )
              })}
            </View>

            <View
              style={{ justifyContent: "flex-end", flexDirection: "row", alignItems: "center" }}
            >
              <ProfileImageNew
                linkToProfile
                user={state?.user?.username}
                quality={ProfileImageQuality.medium}
                type="user"
                style={width < 1300 ? ProfileImageStyle.UserXXSmall : ProfileImageStyle.UserSmall}
              />
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
                      source={require("../../assets/Facelift/svg/Airplane-LightGrey.svg")}
                    />
                  </TouchableOpacity>
                </View>
              ) : null}
              {constants["SETTING_ISVISIBLE_BELL"] ? (
                <View style={{ marginHorizontal: 12 }}>
                  <TouchableOpacity onPress={openMessages}>
                    <Image
                      style={headerStyles.style.icon}
                      source={require("../../assets/Facelift/svg/Bell-LightGrey.svg")}
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
