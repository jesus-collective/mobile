import React from 'react';
import Amplify from 'aws-amplify';
import awsConfig from '../../src/aws-exports';
import SignUpSidebar from '../../components/SignUpSidebar/SignUpSidebar'
Amplify.configure(awsConfig);
import { View } from 'native-base';
import { Text, Button } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import * as mutations from '../../src/graphql/mutations';
import { API, graphqlOperation } from 'aws-amplify';
import { Auth } from 'aws-amplify';
import styles from '../../components/style.js'

interface Props {
  navigation?: NavigationScreenProp<any, any>,
  authState?: any,
  payStateChanged(): void
}
interface State {

}
export default class SignUpScreen2 extends React.Component<Props, State>{
  async makePayment() {
    console.log("Finish Payment")
    var user = await Auth.currentAuthenticatedUser();
    try {
      await API.graphql(graphqlOperation(mutations.updateUser, { input: { id: user['username'], hasPaidState: "Complete" } }));
      this.props.payStateChanged()
    } catch (e) {
      console.log(e)
    }

  }
  render() {
    // const { navigate } = this.props.navigation;

    return (
      <View style={styles.signUpScreen1PaymentBody}>
        <SignUpSidebar position="3"></SignUpSidebar>
        <View style={{ position: "absolute", left: "35%", width: "25%", top: 100, height: "100%" }}>
          <Text>Payment Succesful</Text>

          <Button color="#F0493E" title="Setup Profile" onPress={() => this.makePayment()} />
        </View>

      </View>

    );

  }
}