import React, { Component } from "react";
import HomeScreen from "../HomeScreen/HomeScreen.js";
import NewsScreen from "../NewsScreen/NewsScreen.js";
import SocialScreen from "../SocialScreen/SocialScreen.js";
import PeopleScreen from "../PeopleScreen/PeopleScreen.js";
import ProfileScreen from "../ProfileScreen/ProfileScreen.js";
import LoginScreen from "../LoginScreen/LoginScreen.js";
import TeachingScreen from "../TeachingScreen/TeachingScreen.js";
import TmhuScreen from "../TmhuScreen/TmhuScreen.js";
import SideBar from "../../components/Sidebar/Sidebar.js";
import HomeChurchScreen from "../HomeChurchScreen/HomeChurchScreen.js"
import { createDrawerNavigator,createAppContainer } from "react-navigation";
const HomeScreenRouter = createDrawerNavigator(
  {
    HomeScreen: { screen: HomeScreen },
    NewsScreen: { screen: NewsScreen},
    ProfileScreen: { screen: ProfileScreen},
    LoginScreen: { screen: LoginScreen},
    TmhuScreen: {screen: TmhuScreen},
    PeopleScreen: {screen: PeopleScreen},
    TeachingScreen: { screen: TeachingScreen},
    HomeChurchScreen: {screen: HomeChurchScreen},
    SocialScreen: { screen: SocialScreen}
  },
  {
    contentComponent: props => <SideBar {...props} />
  }
);
export default createAppContainer(HomeScreenRouter);