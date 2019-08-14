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
          <Text>Credit Card Information</Text>
          <Input placeholder="First Name" />
          <Input placeholder="Last Name" />
          <Input placeholder="Credit Card Number" />
          <Input placeholder="MM/YYYY" />
          <Input placeholder="CVV" />
          <Input placeholder="Billing Address" />
          <Input placeholder="State/Province" />
          <Input placeholder="Country" />
          <Input placeholder="Zip/Postal Code" />
        </View>
        <View style={{ position:"absolute",left: "70%", width: "25%", top: 100, height: "100%" }}>
          <Text>Once we get through the pilot, this will be where the payment process occurs. But during the pilot, we're still building the platform, adding content and looking for feedback from our wonderful friends. </Text>
          <Text>Thank you for helping us develop and improve the best user experience.</Text>
          <Text style={{fontWeight:"bold"}}>Access to Jesus Collective is free during the pilot.</Text>
          <View style={{borderWidth:1}}>
            <Text >Up to 25 Kids</Text>
            <Text >$299.00</Text>
            <Text style={{color:"#F0493E"}} >$0.00</Text>
            <Text >Remove</Text>
            <Text >Preschool to grade 8 curriculum access for up to 25 kids</Text>
            <Text >Training Guide</Text>
            <Text >Volunteer and Classroom Management Tips</Text>
            <Text >Classroom Schedule Tips</Text>
            <Text >Includes 3 accounts</Text>
          </View>
          <View>
            <Text >Total</Text>
            <Text >$0.00</Text>
          </View>
          <Button color="#F0493E" title="Process Payment" onPress={() => this.props.navigation.navigate("SignUpScreen2")} />
          <Button color="#F0493E" title="Use Paypal" />
        </View>
        <SignUpSidebar position="3"></SignUpSidebar>
      </View>

    );
  }
}