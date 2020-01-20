import React from "react";
import Amplify from 'aws-amplify'
import { API, graphqlOperation } from 'aws-amplify';

import HomeScreen from "./HomeScreen";
import CoursesScreen from "../CoursesScreen/CoursesScreen";
import ExploreScreen from "../ExploreScreen/ExploreScreen";
import SupportScreen from "../SupportScreen/SupportScreen";
import KidsAndYouthScreen from "../KidsAndYouthScreen/KidsAndYouthScreen";
import { View } from 'react-native'
import GetInvolvedScreen from "../GetInvolvedScreen/GetInvolvedScreen";
import ContactScreen from "../ContactScreen/ContactScreen";
import NewsScreen from "../NewsScreen/NewsScreen";
import ProfileScreen from "../ProfileScreen/ProfileScreen";
import SignUpScreen1 from '../../components/Auth/SignUpScreen1'
import SignUpScreen2 from '../../components/Auth/SignUpScreen2'
import SignUpScreen3 from '../../components/Auth/SignUpScreen3'
import { Auth } from 'aws-amplify';
import { Text } from 'react-native'
import * as queries from '../../src/graphql/queries';
import * as mutations from '../../src/graphql/mutations';
import LoginScreen from "../LoginScreen/LoginScreen";
import SideBar from "../../components/Sidebar/Sidebar";
import { createDrawerNavigator } from "react-navigation-drawer";
import {createAppContainer} from "react-navigation";
import awsconfig from '../../src/aws-exports';
import { NavigationScreenProp } from 'react-navigation';

Amplify.configure(awsconfig);
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
    LoginScreen: { screen: LoginScreen }
  },
  {
    contentComponent: props => <SideBar {...props} />
  }
);
const AppContainer = createAppContainer(HomeScreenRouter);
interface Props {
  authState?: any;
  navigation: NavigationScreenProp<any, any>

}
interface State {
  hasCompletedPersonalProfile: boolean;
  hasPaidState: string;
  userExists: boolean;
}

export default class App extends React.Component<Props, State>{
  constructor(props: Props) {
    super(props);
    this.state = {
      hasCompletedPersonalProfile: false,
      hasPaidState: "Not Started",
      userExists: false
    }
    this.performStartup()
  }
  async performStartup() {
    await this.ensureUserExists()
    await this.checkIfPaid()
    await this.checkIfCompletedProfile()
  }
  private user: any
  async ensureUserExists() {
    var userExists: boolean = false
    this.user = await Auth.currentAuthenticatedUser();
    const { attributes } = this.user;
    console.log(this.user)
    try {
      const getUser = await API.graphql(graphqlOperation(queries.getUser, { id: this.user['username'] }));
      if (getUser.data.getUser === null) {
        console.log("Trying to create")
        var inputData = {
          id: this.user['username'],
          given_name: attributes['given_name'],
          family_name: attributes['family_name'],
          email: attributes['email'],
          phone: attributes['phone_number']
        }
        try {
          var createUser = await API.graphql(graphqlOperation(mutations.createUser, {
            input: inputData
          }));
          userExists = true
        } catch (e) {
          console.log(e)
        }
        console.log(createUser)
      }
      else {
        userExists = true
        console.log("User exists")
      }
    }
    catch (e) {
      console.log(e)
    }
    this.setState({ userExists: userExists })

  }
  async checkIfPaid() {
    console.log("checkIfPaid")
    if (this.state.userExists) {
      const getUser = await API.graphql(graphqlOperation(queries.getUser, { id: this.user['username'] }));
      console.log(getUser)
      if (getUser.data.getUser.hasPaidState == null)
        this.setState({ hasPaidState: "Not Started" })

      else {
        console.log(getUser.data.getUser.hasPaidState)
        this.setState({ hasPaidState: getUser.data.getUser.hasPaidState })
      }
    }
    //  console.log(attributes['username'])
  }
  onPaidStateChanged() {
    console.log("onPaidStateChanged")
    this.ensureUserExists()
    this.checkIfPaid()
  }
  onProfileComplete() {
    console.log("onProfileComplete")
    this.checkIfCompletedProfile()
  }
  async checkIfCompletedProfile() {
    console.log("checkIfCompletedProfile")
   // this.setState({ hasCompletedPersonalProfile: true })
    if (this.state.userExists) {
      const getUser = await API.graphql(graphqlOperation(queries.getUser, { id: this.user['username'] }));
      if ((getUser.data.getUser.aboutMeShort != null) 
      && (getUser.data.getUser.aboutMeLong != null)
      && (getUser.data.getUser.given_name != null)
      && (getUser.data.getUser.family_name != null)
      && (getUser.data.getUser.email != null)
      && (getUser.data.getUser.phone != null)
      && (getUser.data.getUser.address != null)
      && (getUser.data.getUser.city != null)
      && (getUser.data.getUser.province != null)
      && (getUser.data.getUser.postalCode != null)
      && (getUser.data.getUser.country != null)
      && (getUser.data.getUser.interests != null)
      && (getUser.data.getUser.currentRole != null)
      && (getUser.data.getUser.currentScope != null)
      && (getUser.data.getUser.personality != null)
      && (getUser.data.getUser.orgName != null)
      && (getUser.data.getUser.orgType != null)
      && (getUser.data.getUser.orgSize != null)
      && (getUser.data.getUser.orgDescription != null))
        this.setState({ hasCompletedPersonalProfile: true })
    }
  }
  render() {

    //  console.log(this.props.authState)
    if (this.props.authState == 'signedIn')
      if (this.state.hasPaidState === "Not Started") {
        return (<SignUpScreen1 payStateChanged={() => this.onPaidStateChanged()} />)
        //  return <SignUpScreen2 />
      }
      else if (this.state.hasPaidState === "In Progress") {
        return (<SignUpScreen2 payStateChanged={() => this.onPaidStateChanged()} />)
        //  return <SignUpScreen2 />
      }
      else if (this.state.hasPaidState === "Complete") {
        if (!this.state.hasCompletedPersonalProfile) {
          return (<SignUpScreen3 profileComplete={() => this.onProfileComplete()} />)
        }
        else
        {
          return (<View style={{ backgroundColor:"red",position: "absolute", top: 0, left: 0, right: 0, bottom: 0, flex: 1 }}><AppContainer ></AppContainer></View>)
        }
      }
      else
        return (<Text>Payment Issue - Unknown State</Text>)

    else
      return null
  }
}