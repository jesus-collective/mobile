import React from 'react';
import Amplify from 'aws-amplify';
import awsConfig from '../../src/aws-exports';
import MyProfile from '../../components/MyProfile/MyProfile'
import SignUpSidebar from '../../components/SignUpSidebar/SignUpSidebar'
Amplify.configure(awsConfig);
import { View } from 'native-base';
import JCComponent from '../../components/JCComponent/JCComponent';

interface Props {
  navigation?: any
  authState?: string
  profileComplete(): void

}

export default class SignUpScreen3 extends JCComponent<Props>{

  onFinalizeProfile(): void {
    this.props.profileComplete()
  }
  render(): React.ReactNode {
    // const { navigate } = this.props.navigation;

    return (
      <View style={this.styles.style.signUpScreen1PaymentBody}>
        <SignUpSidebar position="4"></SignUpSidebar>
        <View style={this.styles.style.signUpProfile}>
          <MyProfile finalizeProfile={() => { this.onFinalizeProfile() }} />
        </View>

      </View>

    );

  }
}