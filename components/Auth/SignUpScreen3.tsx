import React from 'react';
import Amplify from 'aws-amplify';
import awsConfig from '../../src/aws-exports';
import MyProfile from '../../components/MyProfile/MyProfile'
import SignUpSidebar from '../../components/SignUpSidebar/SignUpSidebar'
Amplify.configure(awsConfig);
import { View } from 'native-base';
import JCComponent from '../../components/JCComponent/JCComponent';
import { useNavigation, useRoute } from '@react-navigation/native';
import { UserContext } from '../../screens/HomeScreen/UserContext';

interface Props {
  navigation?: any
  route?: any
  authState?: string
  profileComplete(): void

}

class SignUpScreen3Impl extends JCComponent<Props>{
  static Consumer = UserContext.Consumer
  onFinalizeProfile(actions): void {
    actions.setHasCompletedPersonalProfile()
    this.props.navigation.navigate("mainApp")
  }
  render(): React.ReactNode {
    // const { navigate } = this.props.navigation;

    return (
      <SignUpScreen3Impl.Consumer>
        {({ state, actions }) => {
          if (state.hasCompletedPersonalProfile == "Incomplete")
            return (<View style={this.styles.style.signUpScreen1PaymentBody}>
              <SignUpSidebar position="4"></SignUpSidebar>
              <View style={this.styles.style.signUpProfile}>
                <MyProfile finalizeProfile={() => { this.onFinalizeProfile(actions) }} />
              </View>

            </View>)
          else return null
        }}
      </SignUpScreen3Impl.Consumer>
    );

  }
}

export default function SignUpScreen3(props: Props): JSX.Element {
  const route = useRoute();
  const navigation = useNavigation()
  return <SignUpScreen3Impl {...props} navigation={navigation} route={route} />;
}