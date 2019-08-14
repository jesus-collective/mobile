import React from 'react';
import Amplify from 'aws-amplify';
import awsConfig from '../../src/aws-exports';
import FederatedSignin from '../../components/FederatedSignin/FederatedSignin'
import MyProfile from '../../components/MyProfile/MyProfile'
import SignUpSidebar from '../../components/SignUpSidebar/SignUpSidebar'
Amplify.configure(awsConfig);
import { AmplifyTheme, Authenticator, SignIn, Greetings, SignUp } from 'aws-amplify-react-native';
import { Container, View, Input } from 'native-base';
import { Image, Text, Button } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { I18n } from 'aws-amplify';
import styles from '../../components/style.js'

interface Props {
  navigation: NavigationScreenProp<any, any>
}
interface State {

}
export default class SignUpScreen1 extends React.Component<Props, State>{

  render() {
    // const { navigate } = this.props.navigation;
    return (
      <View>
        <View style={styles.signUpProfile}>
          <Text style={{ fontWeight: "bold" }}>Create Your Individual Profile</Text>
          <Button color="#F0493E" title="Save and Publish Your Profile" onPress={() => this.props.navigation.navigate("HomeScreen")} />

          <MyProfile />
        </View>
        <SignUpSidebar position="4"></SignUpSidebar>
      </View>

    );
  }
}