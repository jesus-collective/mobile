import React, { Suspense, lazy, Component } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import JCComponent, { JCState } from "../../components/JCComponent/JCComponent";
import MainAppRouter from "./MainAppRouter";
const SideBar = lazy(() => import("../../components/Sidebar/Sidebar"));
const Drawer = createDrawerNavigator();

export default class MainDrawerRouter extends JCComponent {
  render() {
    return (
      <Drawer.Navigator
        openByDefault={false}
        drawerContent={(props) => {
          return <SideBar {...props}></SideBar>;
        }}
      >
        <Drawer.Screen
          name="mainDrawer"
          component={MainAppRouter}
          options={{ title: "Jesus Collective" }}
        ></Drawer.Screen>
      </Drawer.Navigator>
    );
  }
}
