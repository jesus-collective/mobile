import { createDrawerNavigator } from "@react-navigation/drawer"
import React, { lazy } from "react"
import JCComponent from "../../components/JCComponent/JCComponent"
import MainAppRouter from "./MainAppRouter"
const SideBar = lazy(() => import("../../components/Sidebar/Sidebar"))
const Drawer = createDrawerNavigator()

export default class MainDrawerRouter extends JCComponent {
  render(): React.ReactNode {
    return (
      <Drawer.Navigator
        openByDefault={false}
        headerMode="none"
        drawerContent={(props) => {
          return <SideBar {...props}></SideBar>
        }}
      >
        <Drawer.Screen
          name="mainDrawer"
          component={MainAppRouter}
          options={{ headerShown: false, title: "Jesus Collective" }}
        ></Drawer.Screen>
      </Drawer.Navigator>
    )
  }
}
