import { createDrawerNavigator } from "@react-navigation/drawer"
import React from "react"
import JCComponent from "../../components/JCComponent/JCComponent"
import MainAppRouter from "./MainAppRouter"
const Drawer = createDrawerNavigator()

export default class MainDrawerRouter extends JCComponent {
  render(): React.ReactNode {
    return (
      <Drawer.Navigator defaultStatus={"closed"}>
        <Drawer.Screen
          name="mainDrawer"
          component={MainAppRouter}
          options={{ headerShown: false, title: "Jesus Collective" }}
        ></Drawer.Screen>
      </Drawer.Navigator>
    )
  }
}
