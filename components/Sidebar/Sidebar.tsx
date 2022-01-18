import { Entypo } from "@expo/vector-icons"
import { useDrawerStatus } from "@react-navigation/drawer"
import { DrawerNavigationHelpers } from "@react-navigation/drawer/lib/typescript/src/types"
import * as React from "react"
import { FlatList, Text, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import Header from "../../components/Header/Header"
import { constants } from "../../src/constants"
const routes = [
  {
    name: "Home",
    route: "HomeScreen",
  },
  {
    name: "Events",
    route: "EventsScreen",
  },

  {
    name: "Groups",
    route: "GroupsScreen",
  },
  {
    name: "Resources",
    route: "ResourcesScreen",
  },

  {
    name: "Courses",
    route: "CoursesScreen",
  },
]

const resourceRoutes = [
  {
    name: "All Resources",
    route: "ResourcesScreen",
    props: {},
  },
  {
    name: "Kids & Youth Curriculum",
    route: "ResourceScreen",
    props: { create: false, id: constants["SETTING_KY_GROUP_ID"] },
  },
]

interface Props {
  route?: any
  navigation: DrawerNavigationHelpers
}

export default function SideBar(props: Props) {
  const [showResourcesSubMenu, setShowResourcesSubMenu] = React.useState(false)
  const renderResourcesSubMenu = () => {
    return (
      <FlatList
        data={resourceRoutes}
        keyExtractor={(data) => data.name}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={
                item.name === "All Resources"
                  ? { marginRight: 20, height: 40 }
                  : { marginRight: 20, borderBottomWidth: 0, height: 40 }
              }
              onPress={() => {
                props.navigation.navigate(item.route, item.props)
                setShowResourcesSubMenu(false)
              }}
            >
              <Text
                style={{
                  fontFamily: "Graphik-Semibold-App",
                  fontSize: 16,
                  lineHeight: 30,
                  color: "#483938",
                  marginLeft: 24,
                }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )
        }}
      />
    )
  }
  return (
    <View style={{ flex: 1 }}>
      <Header title="Jesus Collective" drawerState={useDrawerStatus()} />
      <FlatList
        style={{ padding: 24, paddingTop: 36 }}
        data={routes}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => {
          if (item.name === "Resources")
            return (
              <View>
                <TouchableOpacity
                  style={{ marginRight: 20, marginBottom: 24, flexDirection: "row" }}
                  onPress={() => {
                    setShowResourcesSubMenu((prev) => !prev)
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Graphik-Semibold-App",
                      fontSize: 32,
                      lineHeight: 38,
                      letterSpacing: 0.3,
                      color: "#483938",
                    }}
                  >
                    {item.name}
                  </Text>
                  <Entypo
                    name={showResourcesSubMenu ? "chevron-up" : "chevron-down"}
                    size={22}
                    color="#333333"
                    style={{ marginTop: 10, marginLeft: 5, alignSelf: "center" }}
                  />
                </TouchableOpacity>
                {showResourcesSubMenu ? renderResourcesSubMenu() : null}
              </View>
            )
          return (
            <TouchableOpacity
              style={{ marginRight: 20, marginBottom: 24 }}
              onPress={() => {
                props.navigation.navigate(item.route)
                setShowResourcesSubMenu(false)
              }}
            >
              <Text
                style={{
                  fontFamily: "Graphik-Semibold-App",
                  fontSize: 32,
                  lineHeight: 38,
                  letterSpacing: 0.3,
                  color: "#483938",
                  fontWeight: "600",
                }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )
        }}
      />
    </View>
  )
}
