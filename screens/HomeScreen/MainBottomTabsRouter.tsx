import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import React from "react"
import { Image } from "react-native"
import Header from "../../components/Header/Header"
import MyProfile from "../../components/ProfileImage/ProfileImage"
import ConversationScreen from "../../screens/ConversationScreen/ConversationScreen"
import { constants } from "../../src/constants"
import MainAppRouter from "./MainAppRouter"
const Tab = createBottomTabNavigator()

export default function MainBottomTabsRouter() {
  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        headerShown: false,
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
            iconName = focused ? "Home-active" : "Home"
          } else if (route.name === "search") {
            iconName = focused ? "Search-active" : "Search"
          } else if (route.name === "dms") {
            iconName = focused ? "Airplane-active" : "Airplane"
          } else if (route.name === "notifs") {
            iconName = focused ? "Bell" : "Bell"
          } else if (route.name === "profile") {
            iconName = focused ? "Person-active" : "Person"
          }
          return (
            <Image
              style={{ width: 24, height: 24 }}
              source={require(`../../assets/Facelift/tabsicons/${iconName}.png`)}
            />
          )
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
          component={MainAppRouter}
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
      <Tab.Screen
        options={{ title: "Jesus Collective", headerShown: true }}
        name="profile"
        component={MyProfile}
      />
    </Tab.Navigator>
  )
}
