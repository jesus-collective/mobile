import React from 'react';
import Amplify from 'aws-amplify';
import awsConfig from '../../src/aws-exports';
import SignUpSidebar from '../../components/SignUpSidebar/SignUpSidebar'
Amplify.configure(awsConfig);
import { View, Input, Item, Label, Form, Content } from 'native-base';
import { Text, Button, Dimensions } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import styles from '../../components/style.js'
import Constants from 'expo-constants';
import * as mutations from '../../src/graphql/mutations';
import { API, graphqlOperation } from 'aws-amplify';
import { Auth } from 'aws-amplify';

interface Props {
  navigation?: NavigationScreenProp<any, any>,
  authState?: any
  payStateChanged(): void
}
interface State {

}
export default class SignUpScreen1 extends React.Component<Props, State>{
  async makePayment() {
    console.log("Make Payment")
    var user = await Auth.currentAuthenticatedUser();
    try {
      await API.graphql(graphqlOperation(mutations.updateUser, { input: { id: user['username'], hasPaidState: "In Progress" } }));
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
        <Content style={{ position: "absolute", width: "100%", height: Dimensions.get('window').height - (100 + Constants.statusBarHeight), left: 0, top: 100 + Constants.statusBarHeight }}>
          <View style={styles.signUpScreen1PaymentColumn1}>
            <Text>Credit Card Information</Text>
            <Form>
              <Item floatingLabel>
                <Label>First Name</Label>
                <Input />
              </Item>
              <Item floatingLabel>
                <Label>Last Name</Label>
                <Input />
              </Item>
              <Item floatingLabel>
                <Label>Credit Card Number</Label>
                <Input />
              </Item>
              <Item floatingLabel>
                <Label>MM/YYYY</Label>
                <Input />
              </Item>
              <Item floatingLabel>
                <Label>CVV</Label>
                <Input />
              </Item>
              <Item floatingLabel>
                <Label>Billing Address</Label>
                <Input />
              </Item>
              <Item floatingLabel>
                <Label>State/Province</Label>
                <Input />
              </Item>
              <Item floatingLabel>
                <Label>Country</Label>
                <Input />
              </Item>
              <Item floatingLabel>
                <Label>Zip/Postal Code</Label>
                <Input />
              </Item>

            </Form>
          </View>
          <View style={styles.signUpScreen1PaymentColumn2}>
            <Text style={{ fontFamily: "Graphik-Regular-App" }}>Once we get through the pilot, this will be where the payment process occurs. But during the pilot, we're still building the platform, adding content and looking for feedback from our wonderful friends. {'\n'}{'\n'}Thank you for helping us develop and improve the best user experience.</Text>
            <Text style={{ fontFamily: "Graphik-Regular-App", color: "#F0493E", fontWeight: "bold" }}>{'\n'}Access to Jesus Collective is free during the pilot.{'\n'}{'\n'}</Text>
            <View style={{ borderWidth: 1, borderStyle: "solid", borderRadius: 4, borderColor: "rgba(51, 51, 51, 0.1)", shadowColor: "rgba(0, 0, 0, 0.05)", padding: 25, shadowOffset: {width:5, height:5}, shadowRadius: 30 }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontFamily: "Graphik-Bold-App", paddingRight: 65, fontSize: 20 }}>Up to 25 Kids</Text>
                <Text style={{ color: "#F0493E" }} >$0.00</Text>
              </View>
              <Text style={{ paddingBottom: 25, paddingLeft: 155, fontFamily: "Graphik-Regular-App" }}>Remove</Text>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontFamily: "Graphik-Regular-App" }}>{'\u2022'}</Text>
                <Text style={{ fontFamily: "Graphik-Regular-App", flex: 1, paddingLeft: 5 }}>Preschool to grade 8 curriculum access for up to 25 kids</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontFamily: "Graphik-Regular-App" }}>{'\u2022'}</Text>
                <Text style={{ fontFamily: "Graphik-Regular-App", flex: 1, paddingLeft: 5 }}>Training Guide</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontFamily: "Graphik-Regular-App" }}>{'\u2022'}</Text>
                <Text style={{ fontFamily: "Graphik-Regular-App", flex: 1, paddingLeft: 5 }}>Volunteer and Classroom Management Tips</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontFamily: "Graphik-Regular-App" }}>{'\u2022'}</Text>
                <Text style={{ fontFamily: "Graphik-Regular-App", flex: 1, paddingLeft: 5 }}>Classroom Schedule Tips</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontFamily: "Graphik-Regular-App" }}>{'\u2022'}</Text>
                <Text style={{ fontFamily: "Graphik-Regular-App", flex: 1, paddingLeft: 5 }}>Includes 3 accounts</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontFamily: "Graphik-Bold-App", paddingTop: 10, paddingBottom: 10, paddingLeft: 45, paddingRight: 145 }}>Total</Text>
              <Text style={{ fontFamily: "Graphik-Bold-App", paddingTop: 10, paddingBottom: 10, }}>$0.00</Text>
            </View>
            <Button color="#F0493E" title="Process Payment" onPress={() => this.makePayment()} />
            <Button color="#F0493E" title="Use Paypal" />
          </View>

        </Content>

      </View>

    )


  }
}