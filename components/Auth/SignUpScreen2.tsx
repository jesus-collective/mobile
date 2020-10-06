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
import { UserContext } from '../../screens/HomeScreen/UserContext';

interface Props {
  authState?: string,
}
export default class SignUpScreen2 extends JCComponent<Props>{
  static Consumer = UserContext.Consumer

  async makePayment(actions: any): Promise<void> {
    console.log("Finish Payment")
    try {
      const user = await Auth.currentAuthenticatedUser();
      await API.graphql(graphqlOperation(mutations.updateUser, {
        input: {
          id: user['username'],
          hasPaidState: "Complete"
        }
      }));
      actions.onPaidStateChanged()
    } catch (e) {
      console.log({ Error: e })
    }
  }

  render(): React.ReactNode {

    return (
      <SignUpScreen2.Consumer>
        {({ state, actions }) => {
          return (
            <View style={this.styles.style.signUpScreen1PaymentBody}>
              <SignUpSidebar position="3"></SignUpSidebar>
              <View style={{ position: "absolute", left: "35%", width: "25%", top: 100, height: "100%" }}>
                <Text>Payment Successful</Text>

                <Button color="#F0493E" title="Setup Profile"
                  onPress={() => { this.makePayment(actions) }} />
              </View>

            </View>
          )
        }}

      </SignUpScreen2.Consumer>

    );

  }
}