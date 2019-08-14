import React from "react";

import HomeScreen from "./HomeScreen";
import CoursesScreen from "../CoursesScreen/CoursesScreen";
import ExploreScreen from "../ExploreScreen/ExploreScreen";
import SupportScreen from "../SupportScreen/SupportScreen";
import KidsAndYouthScreen from "../KidsAndYouthScreen/KidsAndYouthScreen";

import GetInvolvedScreen from "../GetInvolvedScreen/GetInvolvedScreen";
import ContactScreen from "../ContactScreen/ContactScreen";
import NewsScreen from "../NewsScreen/NewsScreen";
import ProfileScreen from "../ProfileScreen/ProfileScreen";

import LoginScreen from "../LoginScreen/LoginScreen";
import SignUpScreen1 from "../SignUpScreen/SignUpScreen1";
import SignUpScreen2 from "../SignUpScreen/SignUpScreen2";
import SignUpScreen3 from "../SignUpScreen/SignUpScreen3";
import SideBar from "../../components/Sidebar/Sidebar";
import { createDrawerNavigator, createAppContainer } from "react-navigation";
const HomeScreenRouter = createDrawerNavigator(
  {
    HomeScreen: { screen: HomeScreen },
    ExploreScreen: { screen: ExploreScreen },
    SupportScreen: { screen: SupportScreen },
    GetInvolvedScreen: { screen: GetInvolvedScreen },
    ContactScreen: { screen: ContactScreen },
    KidsAndYouthScreen: { screen: KidsAndYouthScreen },
    NewsScreen: { screen: NewsScreen },
    ProfileScreen: { screen: ProfileScreen },
    CoursesScreen: { screen: CoursesScreen },
    LoginScreen: { screen: LoginScreen },
    SignUpScreen1: { screen: SignUpScreen1 },
    SignUpScreen2: { screen: SignUpScreen2 },
    SignUpScreen3: { screen: SignUpScreen3 },
  },
  {
    contentComponent: props => <SideBar {...props} />
  }
);
export default createAppContainer(HomeScreenRouter);