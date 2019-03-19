import React, { Component } from "react";

import HomeScreen from "../HomeScreen/HomeScreen.js";
import NewsScreen from "../NewsScreen/NewsScreen.js";
import ProfileScreen from "../ProfileScreen/ProfileScreen.js";
import LoginScreen from "../LoginScreen/LoginScreen.js";
import SideBar from "../../components/Sidebar/Sidebar.js";
import { createDrawerNavigator,createAppContainer } from "react-navigation";
const HomeScreenRouter = createDrawerNavigator(
  {
    HomeScreen: { screen: HomeScreen },
    NewsScreen: { screen: NewsScreen},
    ProfileScreen: { screen: ProfileScreen},
    LoginScreen: { screen: LoginScreen},
  },
  {
    contentComponent: props => <SideBar {...props} />
  }
);
export default createAppContainer(HomeScreenRouter);