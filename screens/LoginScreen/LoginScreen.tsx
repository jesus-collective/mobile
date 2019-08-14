import React from 'react';
import Amplify from 'aws-amplify';
import awsConfig from '../../src/aws-exports';
import FederatedSignin from '../../components/FederatedSignin/FederatedSignin'
import SignUpSidebar from '../../components/SignUpSidebar/SignUpSidebar'
Amplify.configure(awsConfig);
import { AmplifyTheme, Authenticator } from 'aws-amplify-react-native';
import { View } from 'native-base';
import { NavigationScreenProp } from 'react-navigation';
import { I18n } from 'aws-amplify';
import styles from '../../components/style.js'

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

}
const federated = {
  google_client_id: '',
  facebook_app_id: '579712102531269',
  amazon_client_id: ''
};
export default class LoginScreen extends React.Component<Props, State>{

  render() {
    // const { navigate } = this.props.navigation;
    return (
      <View>
        <View style={styles.authView}>
          <Authenticator theme={MyTheme} usernameAttributes='email' federated={federated}
            signUpConfig={{
              signUpFields: [{ displayOrder: 6, key: "family_name", label: "Last Name", required: true },
              { displayOrder: 5, key: "given_name", label: "First Name", required: true }]
            }}
          >
          </Authenticator>
        </View>
        <SignUpSidebar text="It's the time to unite, equip and amplify." />

      </View>

    );
  }
}