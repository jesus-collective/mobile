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
import { createSwitchNavigator } from "react-navigation";
import { createAppContainer } from "react-navigation";
import awsconfig from '../../src/aws-exports';
import { NavigationScreenProp } from 'react-navigation';
import { Dimensions } from 'react-native'
import Validate from '../../components/Validate/Validate'

import { Linking } from 'expo';
import { createBrowserApp } from '@react-navigation/web';
import { Platform } from "react-native";
import moment from "moment";
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
  GroupScreen: { screen: GroupScreen, path: "group" },
  GroupsScreen: { screen: GroupsScreen, path: "groups" },
  EventScreen: { screen: EventScreen, path: "event" },
  EventsScreen: { screen: EventsScreen, path: "events" },
  ResourcesScreen: { screen: ResourcesScreen, path: "resources" },
  ResourceScreen: { screen: ResourceScreen, path: "resource" },
  OrganizationsScreen: { screen: OrganizationsScreen, path: "orgs" },
  OrganizationScreen: { screen: OrganizationScreen, path: "org" },
  CourseOverviewScreen: { screen: CourseOverviewScreen, path: "courseOverview" },
  CoursesScreen: { screen: CoursesScreen, path: "courses" },
  CourseHomeScreen: { screen: CourseHomeScreen, path: "courseHome" },
  CourseDetailScreen: { screen: CourseDetailScreen, path: "courseDetail" },
  CourseCoachingScreen: { screen: CourseCoachingScreen, path: "courseCoaching" },
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

const AppContainer = isWeb && Dimensions.get('window').width > 720 ? createBrowserApp(HomeScreenRouter) : createAppContainer(HomeScreenRouter);


interface Props {
  authState?: any;
  navigation: NavigationScreenProp<any, any>

}
interface State {
  hasCompletedPersonalProfile: string;
  hasPaidState: string;
  userExists: boolean;
  user: any;
  authState: any
}


export default class App extends React.Component<Props, State>{
  constructor(props: Props) {
    super(props);
    this.state = {
      hasCompletedPersonalProfile: "Unknown",
      hasPaidState: "Complete",
      userExists: false,
      user: null,
      authState: props.authState
    }
    this.performStartup()
  }
  async performStartup() {
    if (this.state.authState == 'signedIn') {
      await this.ensureUserExists()
      await this.checkIfPaid()
      await this.checkIfCompletedProfile()
    }
  }
  private user: any
  async ensureUserExists() {
    var userExists: boolean = false
    this.user = await Auth.currentAuthenticatedUser().
      catch((e) => { console.log('No currrent authenticated user') });
    if (this.user != null) {
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
            phone: attributes['phone_number'],
            joined: moment().format()
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
  }
  async checkIfPaid() {
    console.log("checkIfPaid")
    if (this.state.userExists) {
      const getUser: any = await API.graphql(graphqlOperation(queries.getUser, { id: this.user['username'] }));
      console.log(getUser)
      if (getUser.data.getUser.hasPaidState == null)
        this.setState({ hasPaidState: "Complete" })
      else {
        console.log(getUser.data.getUser.hasPaidState)
        this.setState({ hasPaidState: getUser.data.getUser.hasPaidState })
      }
    }
    //  console.log(attributes['username'])
  }
  componentWillReceiveProps(nextProps) {
    // Any time props.email changes, update state.
    if (nextProps.authState !== this.props.authState) {
      this.setState({
        authState: nextProps.authState
      }, ()=>{this.performStartup()});
     
    }
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
    if (this.state.userExists && this.state.hasPaidState == "Complete") {
      const getUser: any = await API.graphql(graphqlOperation(queries.getUser, { id: this.user['username'] }));
      var response = Validate.Profile(getUser.data.getUser)
      if (response.result)
        this.setState({ hasCompletedPersonalProfile: "Completed" })
      else
        this.setState({ hasCompletedPersonalProfile: "Incomplete" })


    }

  }
  render() {
    if (this.state.authState == 'signedIn') {
      console.log("User has signed in")
      console.log({ "Paid state": this.state.hasPaidState })
      console.log({ "Profile state": this.state.hasCompletedPersonalProfile })
      if (this.state.hasPaidState === "Loading") {
        return <Suspense fallback={null}></Suspense>
      }
      else if (this.state.hasPaidState === "Not Started") {
        return (<Suspense fallback={null}><SignUpScreen1 payStateChanged={() => this.onPaidStateChanged()} /></Suspense>)
        //  return <SignUpScreen2 />
      }
      else if (this.state.hasPaidState === "In Progress") {
        return (<Suspense fallback={null}><SignUpScreen2 payStateChanged={() => this.onPaidStateChanged()} /></Suspense>)
        //  return <SignUpScreen2 />
      }
      else if (this.state.hasPaidState === "Complete") {
        if (this.state.hasCompletedPersonalProfile == "Unknown") {
          return null
        }
        else if (this.state.hasCompletedPersonalProfile == "Incomplete") {
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
    }
    else
      return null
  }
}