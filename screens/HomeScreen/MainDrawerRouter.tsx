import { createDrawerNavigator } from "@react-navigation/drawer"
import React, { lazy } from "react"
import Header from "../../components/Header/Header"
import JCComponent from "../../components/JCComponent/JCComponent"
import MainAppRouter from "./MainAppRouter"
const SideBar = lazy(() => import("../../components/Sidebar/Sidebar"))
const Drawer = createDrawerNavigator()

export default class MainDrawerRouter extends JCComponent {
  render(): React.ReactNode {
    return (
      <Drawer.Navigator
        screenOptions={({ route, navigation }) => ({
          drawerType: "slide",
          gestureEnabled: true,
          swipeEnabled: true,
          headerShown: true,
          drawerStyle: {
            width: "100vw",
          },
          header: () => <Header title="Jesus Collective" navigation={navigation} />,
        })}
        drawerContent={(props) => {
          return <SideBar {...props}></SideBar>
        }}
      >
        <Drawer.Screen
          name="mainDrawer"
          component={MainAppRouter}
          options={{ headerShown: true, title: "Jesus Collective" }}
        ></Drawer.Screen>
      </Drawer.Navigator>
    )
  }
}
