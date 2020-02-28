import React, { Suspense, lazy } from "react";
import Amplify from 'aws-amplify'
import { API, graphqlOperation } from 'aws-amplify';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import HomeScreen from "./HomeScreen";
import { View } from 'react-native'
import { Auth } from 'aws-amplify';
import { Text } from 'react-native'
import * as queries from '../../src/graphql/queries';
import * as mutations from '../../src/graphql/mutations';
import SideBar from "../../components/Sidebar/Sidebar";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import awsconfig from '../../src/aws-exports';
import { NavigationScreenProp } from 'react-navigation';
import { Linking } from 'expo';
import {createBrowserApp} from '@react-navigation/web';
import {Platform} from "react-native";
const ConversationScreen = lazy(() => import('../ConversationScreen/ConversationScreen'));
const OrganizationsScreen = lazy(() => import('../OrganizationsScreen/OrganizationsScreen'));
const OrganizationScreen = lazy(() => import('../OrganizationScreen/OrganizationScreen'));
const LoginScreen = lazy(() => import('../LoginScreen/LoginScreen'));
const GroupScreen = lazy(() => import('../GroupScreen/GroupScreen'));
const SignUpScreen1 = lazy(() => import('../../components/Auth/SignUpScreen1'));
const SignUpScreen2 = lazy(() => import('../../components/Auth/SignUpScreen2'));
const SignUpScreen3 = lazy(() => import('../../components/Auth/SignUpScreen3'));
const CoursesScreen = lazy(() => import('../CoursesScreen/CoursesScreen'));
const CourseOverviewScreen = lazy(() => import('../CourseOverviewScreen/CourseOverviewScreen'));
const CourseHomeScreen = lazy(() => import('../CourseHomeScreen/CourseHomeScreen'));
const CourseDetailScreen = lazy(() => import('../CourseDetailScreen/CourseDetailScreen'));
const CourseCoachingScreen = lazy(() => import('../CourseCoachingScreen/CourseCoachingScreen'));
const ExploreScreen = lazy(() => import('../ExploreScreen/ExploreScreen'));
const SupportScreen = lazy(() => import('../SupportScreen/SupportScreen'));
const KidsAndYouthScreen = lazy(() => import('../KidsAndYouthScreen/KidsAndYouthScreen'));
const GetInvolvedScreen = lazy(() => import('../GetInvolvedScreen/GetInvolvedScreen'));
const ContactScreen = lazy(() => import('../ContactScreen/ContactScreen'));
const EventScreen = lazy(() => import('../EventScreen/EventScreen'));
const GroupsScreen = lazy(() => import('../GroupsScreen/GroupsScreen'));
const EventsScreen = lazy(() => import('../EventsScreen/EventsScreen'));
const ResourceScreen = lazy(() => import('../ResourceScreen/ResourceScreen'));
const ResourcesScreen = lazy(() => import('../ResourcesScreen/ResourcesScreen'));
const ProfileScreen = lazy(() => import('../ProfileScreen/ProfileScreen'));
const ProfilesScreen = lazy(() => import('../ProfilesScreen/ProfilesScreen'));

const NewsScreen = lazy(() => import('../NewsScreen/NewsScreen'));
const SearchScreen = lazy(() => import('../SearchScreen/SearchScreen'));

Amplify.configure(awsconfig);
const MainAppRouter = createStackNavigator({
  HomeScreen: { screen: HomeScreen, path: "home" },
  GroupScreen: { screen: GroupScreen, path:"group" },
  GroupsScreen: { screen: GroupsScreen, path: "groups" },
  EventScreen: { screen: EventScreen, path:"event" },
  EventsScreen: { screen: EventsScreen, path: "events" },
  ResourcesScreen: { screen: ResourcesScreen, path: "resources" },
  ResourceScreen: { screen: ResourceScreen, path:"resource" },
  OrganizationsScreen: { screen: OrganizationsScreen, path: "orgs" },
  OrganizationScreen: { screen: OrganizationScreen,path:"org" },
  CourseOverviewScreen: { screen: CourseOverviewScreen,path:"courseOverview" },
  CoursesScreen: { screen: CoursesScreen, path: "courses" },
  CourseHomeScreen: { screen: CourseHomeScreen,path:"courseHome" },
  CourseDetailScreen: { screen: CourseDetailScreen,path:"courseDetail" },
  CourseCoachingScreen: { screen: CourseCoachingScreen,path:"courseCoaching" },
  ConversationScreen: { screen: ConversationScreen, path: "conversations" },
  SearchScreen: { screen: SearchScreen, path: "search" },
  ProfileScreen: { screen: ProfileScreen, path: "profile" },
  ProfilesScreen: { screen: ProfilesScreen, path: "profiles" },
},
  {
    initialRouteName: 'HomeScreen',
    headerMode: 'none',
    mode: 'card',
    defaultNavigationOptions: {
      animationEnabled: false,
      gestureEnabled: false,
      cardOverlayEnabled: false
    }
  })

const HomeScreenRouter = createDrawerNavigator(
  {
    HomeScreen: {
      screen: MainAppRouter,
      path: 'app'
    },
    ExploreScreen: {
      screen: ExploreScreen,
      path: 'explore'
    },
    SupportScreen: {
      screen: SupportScreen,
      path: 'support'
    },
    GetInvolvedScreen: {
      screen: GetInvolvedScreen,
      path: 'getinvolved'
    },
    ContactScreen: {
      screen: ContactScreen,
      path: 'contact'
    },
    KidsAndYouthScreen: { screen: KidsAndYouthScreen },
    NewsScreen: { screen: NewsScreen },
    ProfileScreen: { screen: ProfileScreen },
    LoginScreen: { screen: LoginScreen }
  },
  {
    contentComponent: props => <SideBar {...props} />,
    defaultNavigationOptions: { drawerLockMode: "locked-closed" }
  }
);
//const prefix = Linking.makeUrl('https://192.168.0.12:19006');


const isWeb = Platform.OS === 'web';
 
const AppContainer = isWeb ? createBrowserApp(HomeScreenRouter): createAppContainer(HomeScreenRouter);


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
      const getUser: any = await API.graphql(graphqlOperation(queries.getUser, { id: this.user['username'] }));
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
      const getUser: any = await API.graphql(graphqlOperation(queries.getUser, { id: this.user['username'] }));
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
    this.setState({ hasCompletedPersonalProfile: true })
    if (this.state.userExists) {
      const getUser: any = await API.graphql(graphqlOperation(queries.getUser, { id: this.user['username'] }));
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
        return (<Suspense fallback={null}><SignUpScreen1 payStateChanged={() => this.onPaidStateChanged()} /></Suspense>)
        //  return <SignUpScreen2 />
      }
      else if (this.state.hasPaidState === "In Progress") {
        return (<Suspense fallback={null}><SignUpScreen2 payStateChanged={() => this.onPaidStateChanged()} /></Suspense>)
        //  return <SignUpScreen2 />
      }
      else if (this.state.hasPaidState === "Complete") {
        if (!this.state.hasCompletedPersonalProfile) {
          return (<Suspense fallback={null}><SignUpScreen3 profileComplete={() => this.onProfileComplete()} /></Suspense>)
        }
        else {
          return (
            <Suspense fallback={null}>
              <View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, flex: 1 }}>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <AppContainer></AppContainer>
                </MuiPickersUtilsProvider>
              </View>
            </Suspense>)
        }
      }
      else
        return (<Text>Payment Issue - Unknown State</Text>)

    else
      return null
  }
}