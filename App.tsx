import React from 'react';
import Amplify from 'aws-amplify';
import awsConfig from './src/aws-exports';
import HomeScreen from "./screens/HomeScreen/index";
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import EStyleSheet from 'react-native-extended-stylesheet';
import FederatedSignin from './components/FederatedSignin/FederatedSignin'
import SignUpSidebar from './components/SignUpSidebar/SignUpSidebar'
import { AmplifyTheme, Authenticator, } from 'aws-amplify-react-native';
import { Auth } from 'aws-amplify';
import { View } from 'native-base';
import { NavigationScreenProp } from 'react-navigation';
import { I18n } from 'aws-amplify';
import styles from './components/style.js'
import { Text } from 'react-native'

Amplify.configure(awsConfig);


const MyDisabledButton = Object.assign({}, AmplifyTheme.button, { backgroundColor: '#979797', alignItems: 'center', padding: 16 });
const MyButton = Object.assign({}, AmplifyTheme.button, { backgroundColor: '#F0493E', alignItems: 'center', padding: 16 });
const MyTheme = Object.assign({}, AmplifyTheme, { button: MyButton, buttonDisabled: MyDisabledButton });


const authScreenLabels = {
  en: {
    'Sign in to your account': 'Login to Jesus Collective',

    'Sign Up': 'Get Started',
    'Sign Up Account': 'Get Started',
    'Sign in with Facebook': 'Use Facebook Account',
    'Sign in with Google': 'Use Google Account',
    'Forgot Password': 'Forgot your password?',
  }
};

I18n.setLanguage('en');
I18n.putVocabularies(authScreenLabels);

interface Props {
  navigation: NavigationScreenProp<any, any>
}
interface State {
  isLoggedIn: boolean
  fontLoaded: boolean
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
      isLoggedIn: false
    };
  //  this.ionViewCanEnter();
  }

  async componentWillMount() {
    await Font.loadAsync({
      'Graphik-Bold-App': require('./assets/font/commercial-type-1906-WOIKTV-app/graphik/Graphik-Bold-App.ttf'),
      'Graphik-Medium-App': require('./assets/font/commercial-type-1906-WOIKTV-app/graphik/Graphik-Medium-App.ttf'),
      'Graphik-Regular-App': require('./assets/font/commercial-type-1906-WOIKTV-app/graphik/Graphik-Regular-App.ttf'),
      'Graphik-Semibold-App': require('./assets/font/commercial-type-1906-WOIKTV-app/graphik/Graphik-Semibold-App.ttf'),
      'GraphikXXCondensed-Black-App': require('./assets/font/commercial-type-1906-WOIKTV-app/graphik_xx_condensed/GraphikXXCondensed-Black-App.ttf')

      // 'Helvetica Neue': require('native-base/Fonts/Roboto_medium.ttf')
      //...Ionicons.font,
    });
    await Asset.fromModule(require("./components/Header/icon.png")).downloadAsync()

    this.setState({ fontLoaded: true });
    Asset.fromModule(require("./assets/JC-Logo-RGB-KO2.png")).downloadAsync()
    Asset.fromModule(require("./assets/leftPanel.png")).downloadAsync()
    Asset.fromModule(require("./assets/profile-placeholder.png")).downloadAsync()
    Asset.fromModule(require("./assets/SignUp/progress-1.png")).downloadAsync()
    Asset.fromModule(require("./assets/SignUp/progress-2.png")).downloadAsync()
    Asset.fromModule(require("./assets/SignUp/progress-3.png")).downloadAsync()
    Asset.fromModule(require("./assets/SignUp/progress-4.png")).downloadAsync()
  }
  ionViewCanEnter() {
    Auth.currentAuthenticatedUser()
      .then(() => { this.setState({ isLoggedIn: true }) })
      .catch(() => { this.setState({ isLoggedIn: false }) });
  }
  render() {
    if (this.state.fontLoaded) {
      // console.log(this.ionViewCanEnter())
    /*  if (this.state.isLoggedIn) {
        console.log("logged in")
        return <Text>tesT</Text>
      }
      else*/
        return (
          <View>
            <View style={styles.authView}>
              <Authenticator onStateChange={this.ionViewCanEnter()} theme={MyTheme} usernameAttributes='email' federated={federated}
                signUpConfig={{
                  signUpFields: [{ displayOrder: 6, key: "family_name", label: "Last Name", required: true },
                  { displayOrder: 5, key: "given_name", label: "First Name", required: true }]
                }}></Authenticator>
            </View>
            <SignUpSidebar text="It's the time to unite, equip and amplify." />
          </View>)
    } else {
      return <Text>Loading...</Text>
    }
  }
}
