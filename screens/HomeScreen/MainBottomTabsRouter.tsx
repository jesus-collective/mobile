import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import React from "react"
import { Image } from "react-native"
import Header from "../../components/Header/Header"
//import MyProfile from "../../components/ProfileImage/ProfileImage"
import MyAccountScreen from "../../screens/MyAccountScreen/MyAccountScreen"
import { constants } from "../../src/constants"
import ConversationScreen from "../ConversationScreen/ConversationScreen"
import SearchScreen from "../SearchScreen/SearchScreen"
import MainAppRouter from "./MainAppRouter"
const Tab = createBottomTabNavigator()

export default function MainBottomTabsRouter() {
  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        headerShown: false,
        cardStyle: { flex: 1, backgroundColor: "#fffdfc" },
        header: (props) => {
          let screenTitle
          switch (props.route.name) {
            case "mainDrawer":
              screenTitle = "Jesus Collective"
              break
            case "search":
              screenTitle = "Search"
              break
            case "dms":
              screenTitle = "Messages"
              break
            case "profile":
              screenTitle = "Settings"
              break
          }
          return <Header title={screenTitle ?? props.route.name} navigation={navigation} />
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName
          if (route.name === "mainDrawer") {
            iconName = focused ? "Home-Active" : "Home"
          } else if (route.name === "search") {
            iconName = focused ? "Search-Active" : "Search"
          } else if (route.name === "dms") {
            iconName = focused ? "Airplane-Active" : "Airplane"
          } else if (route.name === "notifs") {
            iconName = focused ? "Bell-Active" : "Bell"
          } else if (route.name === "profile") {
            iconName = focused ? "Person-Active" : "Person"
          }
          const img = Image.resolveAssetSource({ uri: `../../assets/Facelift/svg/${iconName}.svg` })
          return <Image style={{ width: 24, height: 24 }} source={{ uri: img.uri }} />
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        options={{ title: "Jesus Collective", headerShown: false }}
        name="mainDrawer"
        component={MainAppRouter}
      />
      {constants.SETTING_ISVISIBLE_SEARCH ? (
        <Tab.Screen
          options={{ title: "Jesus Collective", headerShown: true }}
          name="search"
          component={SearchScreen}
        />
      ) : null}
      <Tab.Screen
        options={{ title: "Jesus Collective", headerShown: true }}
        name="dms"
        component={ConversationScreen}
      />
      {constants.SETTING_ISVISIBLE_BELL ? (
        <Tab.Screen
          options={{ title: "Jesus Collective", headerShown: true }}
          name="notifs"
          component={MainAppRouter}
        />
      ) : null}
      {constants.SETTING_ISVISIBLE_SETTINGS ? (
        <Tab.Screen
          options={{ title: "Jesus Collective", headerShown: true }}
          name="profile"
          component={MyAccountScreen}
        />
      ) : null}
    </Tab.Navigator>
  )
}
