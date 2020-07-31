import React from 'react';
import Amplify from 'aws-amplify';
import awsConfig from '../../src/aws-exports';
import MyProfile from '../../components/MyProfile/MyProfile'
import SignUpSidebar from '../../components/SignUpSidebar/SignUpSidebar'
Amplify.configure(awsConfig);
import { View, Content } from 'native-base';
import JCComponent from '../../components/JCComponent/JCComponent';
import { useNavigation, useRoute } from '@react-navigation/native';
import { UserContext } from '../../screens/HomeScreen/UserContext';
import OrganizationViewer from '../../components/OrganizationViewer/OrganizationViewer';
import JCButton, { ButtonTypes } from '../../components/Forms/JCButton';

interface Props {
  navigation?: any
  route?: any
  authState?: string
  //profileComplete(): void
}

interface State {
  groups: unknown;
  selected: 'profile' | 'organization';
  profileComplete: boolean;
  orgComplete: boolean;
}

class SignUpScreen3Impl extends JCComponent<Props, State>{

  constructor(props: Props) {
    super(props);
    this.state = {
      groups: null,
      selected: 'profile',
      profileComplete: false,
      orgComplete: false,
    }
  }

  static Consumer = UserContext.Consumer
  onFinalizeProfile(actions): void {
    actions.updateHasCompletedPersonalProfile()
  }
  render(): React.ReactNode {
    // const { navigate } = this.props.navigation;

    return (
      <SignUpScreen3Impl.Consumer>
        {({ state, actions }) => {

          console.log(state)

          if (state.hasPaidState == "Complete" && state.hasCompletedPersonalProfile == "Incomplete")

            return (
              <View style={this.styles.style.signUpScreen1PaymentBody}>
                <SignUpSidebar position="4"></SignUpSidebar>
                <Content>
                  {state.isOrg ?
                    <View style={this.styles.style.signUpProfile}>
                      <View style={{ display: 'flex', flexDirection: 'row', paddingLeft: 30, borderBottomColor: '#33333320', borderBottomWidth: 1 }}>
                        <View style={{ marginRight: 15, paddingVertical: 5, borderBottomWidth: this.state.selected === 'profile' ? 7 : 0, borderBottomColor: '#F0493E' }}>
                          <JCButton buttonType={this.state.selected === 'profile' ? ButtonTypes.TransparentBoldBlackNoMargin : ButtonTypes.TransparentBoldGreyNoMargin} onPress={() => this.setState({ selected: 'profile' })}>Individual Profile</JCButton>
                        </View>
                        <View style={{ paddingVertical: 5, borderBottomWidth: this.state.selected === 'organization' ? 7 : 0, borderBottomColor: '#F0493E' }}>
                          <JCButton buttonType={this.state.selected === 'organization' ? ButtonTypes.TransparentBoldBlackNoMargin : ButtonTypes.TransparentBoldGreyNoMargin} onPress={() => this.setState({ selected: 'organization' })}>Organization Profile</JCButton>
                        </View>
                      </View>
                      {this.state.selected === 'profile' ?
                        <MyProfile hideOrg finalizeProfile={() => { this.setState({ selected: 'organization' }) }} />
                        : <OrganizationViewer finalizeProfile={() => { this.onFinalizeProfile(actions) }} create={false} loadId={state.orgId} />}
                    </View>
                    : <View style={this.styles.style.signUpProfile}>
                      <MyProfile finalizeProfile={() => { this.onFinalizeProfile(actions) }} />
                    </View>}
                </Content>
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