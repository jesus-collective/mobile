import React, { Component } from "react";
import HomeScreen from "./HomeScreen";

import NewsScreen from "../NewsScreen/NewsScreen";
import SocialScreen from "../SocialScreen/SocialScreen";
import PeopleScreen from "../PeopleScreen/PeopleScreen";
import ProfileScreen from "../ProfileScreen/ProfileScreen";
import LoginScreen from "../LoginScreen/LoginScreen";
import TeachingScreen from "../TeachingScreen/TeachingScreen";
import TmhuScreen from "../TmhuScreen/TmhuScreen";
import SideBar from "../../components/Sidebar/Sidebar";
import HomeChurchScreen from "../HomeChurchScreen/HomeChurchScreen"
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