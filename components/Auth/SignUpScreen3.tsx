import React from 'react';
import Amplify from 'aws-amplify';
import awsConfig from '../../src/aws-exports';
import MyProfile from '../../components/MyProfile/MyProfile'
import SignUpSidebar from '../../components/SignUpSidebar/SignUpSidebar'
Amplify.configure(awsConfig);
import { View ,Content} from 'native-base';
import { NavigationScreenProp } from 'react-navigation';
import styles from '../../components/style.js'
import Constants from 'expo-constants';
import {Dimensions} from 'react-native'

interface Props {
  navigation?: NavigationScreenProp<any, any>,
  authState?: any
  profileComplete(): void
}
interface State {

}
export default class SignUpScreen3 extends React.Component<Props, State>{

  onFinalizeProfile() {
    this.props.profileComplete()
  }
  render() {
    // const { navigate } = this.props.navigation;

    return (
      <View style={{ width: "100%", left: 0, top: 0, height: "100%" }}>
        <SignUpSidebar position="4"></SignUpSidebar>
        <View style={styles.signUpProfile}>
          <MyProfile navigation={this.props.navigation} finalizeProfile={() => { this.onFinalizeProfile() }} />
        </View>
        
      </View>

    );

  }
}