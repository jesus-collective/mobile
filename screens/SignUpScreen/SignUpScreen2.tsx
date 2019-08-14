import React from 'react';
import Amplify from 'aws-amplify';
import awsConfig from '../../src/aws-exports';
import FederatedSignin from '../../components/FederatedSignin/FederatedSignin'
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
        <View style={{position:"absolute", left: "35%", width: "25%", top: 100, height: "100%" }}>
          <Text>Payment Succesful</Text>
        
          <Button color="#F0493E" title="Setup Profile" onPress={() => this.props.navigation.navigate("SignUpScreen3")}/>
        </View>
        <SignUpSidebar position="3"></SignUpSidebar>
      </View>

    );
  }
}