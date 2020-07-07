import React, { Suspense, lazy } from "react";
import Amplify, { Analytics } from 'aws-amplify'
import { API, graphqlOperation } from 'aws-amplify';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { View, Platform, AsyncStorage } from 'react-native'
import { Auth } from 'aws-amplify';
import { Text } from 'react-native'
import GRAPHQL_AUTH_MODE from 'aws-amplify-react-native'
import * as queries from '../../src/graphql/queries';
import * as mutations from '../../src/graphql/mutations';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import awsconfig from '../../src/aws-exports';
import Validate from '../../components/Validate/Validate'
import JCComponent, { JCState } from '../../components/JCComponent/JCComponent';
import { UserContext } from './UserContext'
import SignUpScreen3 from '../../components/Auth/SignUpScreen3'

import moment from "moment";
import { NavigationContainer } from "@react-navigation/native"
import { Linking } from "expo";
import { navigationRef } from './NavigationRoot';
import * as RootNavigation from './NavigationRoot';

const HomeScreen = lazy(() => import("./HomeScreen"));
const SideBar = lazy(() => import("../../components/Sidebar/Sidebar"));
const ConversationScreen = lazy(() => import('../ConversationScreen/ConversationScreen'));
const OrganizationsScreen = lazy(() => import('../OrganizationsScreen/OrganizationsScreen'));
const OrganizationScreen = lazy(() => import('../OrganizationScreen/OrganizationScreen'));
const GroupScreen = lazy(() => import('../GroupScreen/GroupScreen'));
const SignUpScreen1 = lazy(() => import('../../components/Auth/SignUpScreen1'));
const SignUpScreen2 = lazy(() => import('../../components/Auth/SignUpScreen2'));
const CoursesScreen = lazy(() => import('../CoursesScreen/CoursesScreen'));
const CourseOverviewScreen = lazy(() => import('../CourseOverviewScreen/CourseOverviewScreen'));
const CourseHomeScreen = lazy(() => import('../CourseHomeScreen/CourseHomeScreen'));
const EventScreen = lazy(() => import('../EventScreen/EventScreen'));
const GroupsScreen = lazy(() => import('../GroupsScreen/GroupsScreen'));
const EventsScreen = lazy(() => import('../EventsScreen/EventsScreen'));
const ResourceScreen = lazy(() => import('../ResourceScreen/ResourceScreen'));
const ResourcesScreen = lazy(() => import('../ResourcesScreen/ResourcesScreen'));
const ProfileScreen = lazy(() => import('../ProfileScreen/ProfileScreen'));
const ProfilesScreen = lazy(() => import('../ProfilesScreen/ProfilesScreen'));
const SearchScreen = lazy(() => import('../SearchScreen/SearchScreen'));
const AdminScreen = lazy(() => import('../AdminScreen/AdminScreen'));

Amplify.configure(awsconfig);

const prefix = Linking.makeUrl('/');

const linking = {
  prefixes: [prefix, 'https://localhost', 'exps://beta.jesuscollective.com', 'exps://localhost:19006', 'http://localhost:19006', 'https://beta.jesuscollective.com'],
  config: {
    screens: {
      HomeScreen: '/home',
      GroupScreen: '/group/:id/:create',
      GroupsScreen: '/groups',
      EventScreen: '/event',
      EventsScreen: '/events',
      ResourceScreen: '/resource',
      ResourcesScreen: '/resources',
      OrganizationScreen: '/organization',
      OrganizationsScreen: '/organizations',
      CourseOverviewScreen: '/courseoverview',
      CoursesScreen: '/courses',
      CourseHomeScreen: '/course',
      CourseDetailScreen: '/coursedetail',
      CourseCoachingScreen: '/coursecoaching',
      ConversationScreen: '/conversation',
      SearchScreen: '/search',
      ProfileScreen: '/profile',
      ProfilesScreen: '/profiles',
      AdminScreen: '/admin',
    }
  }
};
const Stack = createStackNavigator();

class MainAppRouter extends JCComponent {
  static Consumer = UserContext.Consumer
  render() {

    return (
      <MainAppRouter.Consumer>
        {({ state, actions }) => {
          if (state.hasCompletedPersonalProfile == "Completed")
            return (
              <Stack.Navigator

                initialRouteName='HomeScreen'
                headerMode='none'
                mode='card'
                screenOptions={{
                  animationEnabled: false,
                  gestureEnabled: false,
                  cardOverlayEnabled: false
                }}
              >
                <Stack.Screen
                  name="HomeScreen"
                  component={HomeScreen}
                  options={{ title: 'Jesus Collective' }}
                />
                <Stack.Screen
                  name="GroupScreen"
                  component={GroupScreen}
                  options={{ title: 'Jesus Collective' }}
                />
                <Stack.Screen
                  name="GroupsScreen"
                  component={GroupsScreen}
                  options={{ title: 'Jesus Collective' }}
                />
                <Stack.Screen
                  name="EventScreen"
                  component={EventScreen}
                  options={{ title: 'Jesus Collective' }}
                />
                <Stack.Screen
                  name="EventsScreen"
                  component={EventsScreen}
                  options={{ title: 'Jesus Collective' }}
                />
                <Stack.Screen
                  name="ResourcesScreen"
                  component={ResourcesScreen}
                  options={{ title: 'Jesus Collective' }}
                />
                <Stack.Screen
                  name="ResourceScreen"
                  component={ResourceScreen}
                  options={{ title: 'Jesus Collective' }}
                />
                <Stack.Screen
                  name="OrganizationsScreen"
                  component={OrganizationsScreen}
                  options={{ title: 'Jesus Collective' }}
                />
                <Stack.Screen
                  name="OrganizationScreen"
                  component={OrganizationScreen}
                  options={{ title: 'Jesus Collective' }}
                />
                <Stack.Screen
                  name="CourseOverviewScreen"
                  component={CourseOverviewScreen}
                  options={{ title: 'Jesus Collective' }}
                />
                <Stack.Screen
                  name="CoursesScreen"
                  component={CoursesScreen}
                  options={{ title: 'Jesus Collective' }}
                />

                <Stack.Screen
                  name="CourseHomeScreen"
                  component={CourseHomeScreen}
                  options={{ title: 'Jesus Collective' }}
                />


                <Stack.Screen
                  name="ConversationScreen"
                  component={ConversationScreen}
                  options={{ title: 'Jesus Collective' }}
                />


                <Stack.Screen
                  name="SearchScreen"
                  component={SearchScreen}
                  options={{ title: 'Jesus Collective' }}
                />


                <Stack.Screen
                  name="ProfileScreen"
                  component={ProfileScreen}
                  options={{ title: 'Jesus Collective' }}
                />


                <Stack.Screen
                  name="ProfilesScreen"
                  component={ProfilesScreen}
                  options={{ title: 'Jesus Collective' }}
                />
                <Stack.Screen
                  name="AdminScreen"
                  component={AdminScreen}
                  options={{ title: 'Jesus Collective' }}
                />
              </Stack.Navigator>
            );
          else return null
        }}
      </MainAppRouter.Consumer>
    )
  }

}

function Nothing() {
  return <Text></Text>
}
const Drawer = createDrawerNavigator();

function HomeScreenRouter(props: Props): JSX.Element {

  return <HomeScreenRouterImpl {...props} />;
}
class HomeScreenRouterImpl extends JCComponent<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      ...super.getInitialState(),
      hasCompletedPersonalProfile: "Unknown",
      hasPaidState: "Complete",
      userExists: false,
      user: null,
      authState: props.authState
    }
  }
  componentDidMount(): void {
    this.performStartup()

  }
  async performStartup(): Promise<void> {
    if (this.state.authState == 'signedIn') {
      await this.ensureUserExists()
      await this.checkIfPaid()
      await this.checkIfCompletedProfile()
    }
  }
  private user: any

  async ensureUserExists(): Promise<void> {
    let userExists = false
    this.user = await Auth.currentAuthenticatedUser().
      catch(() => { console.log('No currrent authenticated user') });
    if (this.user != null) {
      const { attributes } = this.user;
      const handleUser = async (getUser) => {
        if (getUser.data.getUser === null) {
          console.log("Trying to create")
          const inputData = {
            id: this.user['username'],
            given_name: attributes['given_name'],
            family_name: attributes['family_name'],
            email: attributes['email'],
            phone: attributes['phone_number'],
            profileState: "Incomplete",
            joined: moment().format()
          }

          try {

            const createUser: any = await API.graphql({
              query: mutations.createUser,
              variables: {
                input: inputData
              },
              authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
            });

            userExists = true

            console.log({ createUser: createUser })
          } catch (e) {
            console.log({ error: e })
          }

        }
        else {
          userExists = true
          console.log("User exists")
        }
      }
      const z: any = API.graphql(
        graphqlOperation(queries.getUser, { id: this.user['username'] })
      )
      await z.then(handleUser).catch(handleUser)

      console.log({ userExists: userExists })
      this.setState({ userExists: userExists }, () => { this.checkIfCompletedProfile() })
    }
  }
  async checkIfPaid(): Promise<void> {
    console.log("checkIfPaid")
    if (this.state.userExists) {
      const handleGetUser = (getUser) => {
        console.log(getUser)
        if (getUser.data.getUser.hasPaidState == null)
          this.setState({ hasPaidState: "Complete" })
        else {
          console.log(getUser.data.getUser.hasPaidState)
          this.setState({ hasPaidState: getUser.data.getUser.hasPaidState })
        }
      }
      const getUser: any = API.graphql(graphqlOperation(queries.getUser, { id: this.user['username'] }));
      await getUser.then(handleGetUser).catch(handleGetUser)
    }
    //  console.log(attributes['username'])
  }
  UNSAFE_componentWillReceiveProps(nextProps: Props): void {
    // Any time props.email changes, update state.
    if (nextProps.authState !== this.props.authState) {
      this.setState({
        authState: nextProps.authState
      }, () => { this.performStartup() });

    }
  }
  onPaidStateChanged(): void {
    console.log("onPaidStateChanged")
    this.ensureUserExists()
    this.checkIfPaid()
  }
  onProfileComplete(): void {
    console.log("onProfileComplete")
    this.checkIfCompletedProfile()
  }

  async checkIfCompletedProfile(): Promise<void> {
    console.log("checkIfCompletedProfile")
    console.log({ user: this.state.userExists, hasPaidState: this.state.hasPaidState })
    if (this.state.userExists && this.state.hasPaidState == "Complete") {
      const handleUser = (getUser) => {
        const response = Validate.Profile(getUser.data.getUser)
        console.log({ checkIfCompletedProfileResult: response.result })
        if (response.result && this.state.hasCompletedPersonalProfile != "Completed")
          this.setState({ hasCompletedPersonalProfile: "Completed" }, () => {
            RootNavigation.navigate('mainApp', { screen: 'HomeScreen' });
          })
        else if (!response.result && this.state.hasCompletedPersonalProfile != "Incomplete")
          this.setState({ hasCompletedPersonalProfile: "Incomplete" })


      }
      const getUser: any = API.graphql(graphqlOperation(queries.getUser, { id: this.user['username'] }));
      await getUser.then(handleUser).catch(handleUser)
    }

  }
  updateHasCompletedPersonalProfile = (): void => {
    this.checkIfCompletedProfile()
  }
  renderFallback(): React.ReactNode {
    return <Text>loading...</Text>
  }
  static Provider = UserContext.Provider;
  render() {
    console.log("User has signed in")
    console.log({ "Paid state": this.state.hasPaidState })
    console.log({ "Profile state": this.state.hasCompletedPersonalProfile })
    if (this.state.hasPaidState === "Loading") {
      return <Suspense fallback={this.renderFallback()}></Suspense>
    }
    else if (this.state.hasPaidState === "Not Started") {
      return (<Suspense fallback={this.renderFallback()}><SignUpScreen1 payStateChanged={() => { this.onPaidStateChanged() }} /></Suspense>)
      //  return <SignUpScreen2 />
    }
    else if (this.state.hasPaidState === "In Progress") {
      return (<Suspense fallback={this.renderFallback()}><SignUpScreen2 payStateChanged={() => { this.onPaidStateChanged() }} /></Suspense>)
      //  return <SignUpScreen2 />
    }
    else if (this.state.hasPaidState === "Complete") {
      trackUserId();
      console.log(this.state.hasCompletedPersonalProfile)
      return (
        <HomeScreenRouterImpl.Provider value={{
          state: {
            ...this.state
          }, actions: {
            setHasCompletedPersonalProfile: this.updateHasCompletedPersonalProfile
          }
        }}>
          <Drawer.Navigator openByDefault={false} drawerContent={(props) => { return <SideBar {...props}></SideBar > }}
          >
            {this.state.hasCompletedPersonalProfile == "Unknown" ? <Drawer.Screen name="unknown" component={Nothing}></Drawer.Screen> : null}
            < Drawer.Screen name="app" component={SignUpScreen3} ></Drawer.Screen >
            <Drawer.Screen name="mainApp" component={MainAppRouter} />

          </Drawer.Navigator >
        </HomeScreenRouterImpl.Provider>
      )

    }
    else
      return (<Text>Payment Issue - Unknown State</Text>)
  }
}


const mapObj = f => obj =>
  Object.keys(obj).reduce((acc, key) => ({ ...acc, [key]: f(obj[key]) }), {});
const toArrayOfStrings = value => [`${value}`];
const mapToArrayOfStrings = mapObj(toArrayOfStrings);
async function trackUserId() {
  try {
    const { attributes } = await Auth.currentAuthenticatedUser();
    const userAttributes = mapToArrayOfStrings(attributes);
    Analytics.updateEndpoint({
      address: attributes.email,
      channelType: 'EMAIL',
      optOut: 'NONE',
      userId: attributes.sub,
      userAttributes,
    });
  } catch (error) {
    console.log(error);
  }
}






interface Props {
  authState?: any;
  navigation?: any
  route?: any

}
interface State extends JCState {
  hasCompletedPersonalProfile: string;
  hasPaidState: string;
  userExists: boolean;
  user: any;
  authState: any
}
interface AppState extends JCState {

  authState: any
}


export default class App extends JCComponent<Props, AppState>{
  constructor(props: Props) {
    super(props);
    this.state = {
      ...super.getInitialState(),
      authState: props.authState
    }

  }
  renderFallback(): React.ReactNode {
    return <Text>loading...</Text>
  }
  render(): React.ReactNode {
    // console.log(this.state.authState)
    if (this.props.authState == 'signedIn') {
      return (
        <Suspense fallback={this.renderFallback()}>
          <View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, flex: 1 }}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <Main authState={this.props.authState} />
            </MuiPickersUtilsProvider>

          </View>
        </Suspense>
      )
    }
    else
      return null
  }
}

function Main(props: any) {
  // console.log(props)
  console.log("Main")
  const PERSISTENCE_KEY = 'NAVIGATION_STATE';
  const [isReady, setIsReady] = React.useState(false);
  const [initialState, setInitialState] = React.useState();

  React.useEffect(() => {
    const restoreState = async () => {
      try {
        const initialUrl = await Linking.getInitialURL();

        if (Platform.OS !== 'web' && initialUrl == null) {
          // Only restore state if there's no deep link and we're not on web
          const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
          const state = savedStateString ? JSON.parse(savedStateString) : undefined;

          if (state !== undefined) {
            setInitialState(state);
          }
        }
      } finally {
        setIsReady(true);
      }
    };

    if (!isReady) {
      restoreState();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }
  return (
    <NavigationContainer
      ref={navigationRef}
      initialState={initialState}
      linking={linking}
      onStateChange={(state) =>
        AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))
      }
    >
      <HomeScreenRouter authState={props.authState}></HomeScreenRouter>

    </NavigationContainer>
  );
}
