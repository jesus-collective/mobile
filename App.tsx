import React, { lazy, Suspense } from 'react';
import Amplify from 'aws-amplify';
import awsConfig from './src/aws-exports';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import EStyleSheet from 'react-native-extended-stylesheet';
import { AmplifyTheme, Authenticator } from 'aws-amplify-react-native';
import { View } from 'native-base';
import { Dimensions } from 'react-native'
import { Platform } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { I18n } from 'aws-amplify';
import { Ionicons } from '@expo/vector-icons';
import MyLoading from './components/Auth/MyLoading';
import HomeScreen from './screens/HomeScreen/index';
import MySignIn from './components/Auth/MySignIn';
import MySignUp from './components/Auth/MySignUp';
import MyConfirmSignIn from './components/Auth/MyConfirmSignIn';
import MyRequireNewPassword from './components/Auth/MyRequireNewPassword';
import MyConfirmSignUp from './components/Auth/MyConfirmSignUp';
import MyVerifyContact from './components/Auth/MyVerifyContact';
import MyForgotPassword from './components/Auth/MyForgotPassword';
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://8c8703a620444c97ba6e8bb4a60c17d0@o390245.ingest.sentry.io/5231908',
});

const SignUpSidebar = lazy(() => import('./components/SignUpSidebar/SignUpSidebar'));

Amplify.configure(awsConfig);


const MyDisabledButton = Object.assign({}, AmplifyTheme.button, { backgroundColor: '#979797', alignItems: 'center', padding: 16 });
const MyButton = Object.assign({}, AmplifyTheme.button, { backgroundColor: '#F0493E', alignItems: 'center', padding: 16 });
const mySection = Object.assign({}, AmplifyTheme.section, { marginTop: 0, padding: 0 });
const myNavBar = Object.assign({}, AmplifyTheme.navBar, { width: 0, height: 0 });
const myContainer = Object.assign({}, AmplifyTheme.container, { marginTop: 0, width: "100%", height: "100%" });
//const MyTheme = Object.assign({}, AmplifyTheme, { navBar: myNavBar, s });
const MyTheme = Object.assign({}, AmplifyTheme, { container: myContainer, navBar: myNavBar, section: mySection, button: MyButton, buttonDisabled: MyDisabledButton });


const authScreenLabels = {
  en: {
    'Sign in to your account': 'Sign in to Jesus Collective',

    'Sign Up': 'Create an Account',
    'Sign Up Account': 'Create an Account',
    'Sign in with Facebook': 'Use Facebook Account',
    'Sign in with Google': 'Use Google Account',
    'Forgot Password': 'Forgot password?',
  }
};

I18n.setLanguage('en');
I18n.putVocabularies(authScreenLabels);

interface Props {
  navigation: NavigationScreenProp<any, any>,
  onStateChange(state: string, data: any): any
}
interface State {
  isLoggedIn: boolean
  fontLoaded: boolean
  authState: any
}
const federated = {
  google_client_id: '',
  facebook_app_id: '579712102531269',
  amazon_client_id: ''
};

EStyleSheet.build({ // always call EStyleSheet.build() even if you don't use global variables!
  $textColor: '#0275d8'
});

//export default App;

export default class AwesomeApp extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      fontLoaded: false,
      isLoggedIn: false,
      authState: ""

    };
    //  this.ionViewCanEnter();
  }

  async UNSAFE_componentWillMount() {
    // console.log("test")
    try {
      await Font.loadAsync({
        'Graphik-Bold-App': require('./assets/font/commercial-type-1906-WOIKTV-app/graphik/Graphik-Bold-App.ttf'),
        'Graphik-Medium-App': require('./assets/font/commercial-type-1906-WOIKTV-app/graphik/Graphik-Medium-App.ttf'),
        'Graphik-Regular-App': require('./assets/font/commercial-type-1906-WOIKTV-app/graphik/Graphik-Regular-App.ttf'),
        'Graphik-Semibold-App': require('./assets/font/commercial-type-1906-WOIKTV-app/graphik/Graphik-Semibold-App.ttf'),
        'GraphikXXCondensed-Black-App': require('./assets/font/commercial-type-1906-WOIKTV-app/graphik_xx_condensed/GraphikXXCondensed-Black-App.ttf'),

        // 'Helvetica Neue': require('native-base/Fonts/Roboto_medium.ttf')
        ...Ionicons.font
      });
    }
    catch (e) {
      console.error(e);
    }

    this.setState({ fontLoaded: true });
    Asset.fromModule(require("./components/Header/icon.png")).downloadAsync()
    Asset.fromModule(require("./assets/JC-Logo-RGB-KO2.png")).downloadAsync()
    Asset.fromModule(require("./assets/leftPanel.png")).downloadAsync()
    Asset.fromModule(require("./assets/profile-placeholder.png")).downloadAsync()
    Asset.fromModule(require("./assets/SignUp/progress-1.png")).downloadAsync()
    Asset.fromModule(require("./assets/SignUp/progress-2.png")).downloadAsync()
    Asset.fromModule(require("./assets/SignUp/progress-3.png")).downloadAsync()
    Asset.fromModule(require("./assets/SignUp/progress-4.png")).downloadAsync()
  }
  renderFallback() {
    return null
  }
  render() {
    if (this.state.fontLoaded) {

      return (
        <View style={{
          width: "100%", top: 0, left: 0, height: "100%"
        }}>

          {
            Platform.OS !== 'web' || Dimensions.get('window').width <= 720 ?

              this.state.authState != "signedIn" && this.state.authState != "loading" && this.state.authState != "" ?
                <Suspense fallback={this.renderFallback()}>
                  <SignUpSidebar text="It’s time to unite, equip, and amplify a Jesus-centred movement." />
                </Suspense>
                : null

              : null
          }

          < Authenticator hideDefault={true} theme={MyTheme}
            usernameAttributes='email' onStateChange={(authState) => this.setState({ authState: authState })} federated={federated}
            signUpConfig={{
              signUpFields: [{ displayOrder: 6, key: "family_name", label: "Last Name", required: true },
              { displayOrder: 5, key: "given_name", label: "First Name", required: true }]
            }} style={{
              width: "100%", top: "0", left: "0", height: "100%"
            }}>
            <HomeScreen />
            <MySignIn />
            <MyConfirmSignIn />
            <MyRequireNewPassword />
            <MySignUp signUpConfig={{
              signUpFields: [{ displayOrder: 6, key: "family_name", label: "Last Name", required: true },
              { displayOrder: 5, key: "given_name", label: "First Name", required: true }]
            }}
            />
            <MyConfirmSignUp />
            <MyVerifyContact />
            <MyForgotPassword />
            <MyLoading />


          </Authenticator>
        </View >
      )
    } else {
      return <AppLoading />
    }
  }
}
