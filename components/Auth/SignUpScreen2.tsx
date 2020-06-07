import React from 'react';
import Amplify from 'aws-amplify';
import awsConfig from '../../src/aws-exports';
import SignUpSidebar from '../../components/SignUpSidebar/SignUpSidebar'
Amplify.configure(awsConfig);
import { View } from 'native-base';
import { Text, Button } from 'react-native';
import * as mutations from '../../src/graphql/mutations';
import { API, graphqlOperation } from 'aws-amplify';
import { Auth } from 'aws-amplify';
import JCComponent from '../../components/JCComponent/JCComponent';

interface Props {
  //navigation?: any,
  authState?: string,
  payStateChanged(): void
}
export default class SignUpScreen2 extends JCComponent<Props>{
  async makePayment(): Promise<void> {
    console.log("Finish Payment")
    const user = await Auth.currentAuthenticatedUser();
    try {
      await API.graphql(graphqlOperation(mutations.updateUser, { input: { id: user['username'], hasPaidState: "Complete" } }));
      this.props.payStateChanged()
    } catch (e) {
      console.log(e)
    }
  }

  render(): React.ReactNode {
    // const { navigate } = this.props.navigation;

    return (
      <View style={this.styles.style.signUpScreen1PaymentBody}>
        <SignUpSidebar position="3"></SignUpSidebar>
        <View style={{ position: "absolute", left: "35%", width: "25%", top: 100, height: "100%" }}>
          <Text>Payment Succesful</Text>

          <Button color="#F0493E" title="Setup Profile" onPress={() => this.makePayment()} />
        </View>

      </View>

    );

  }
}