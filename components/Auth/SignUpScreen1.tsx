import React from "react";
import Amplify from "aws-amplify";
import awsConfig from "../../src/aws-exports";
import SignUpSidebar from "../../components/SignUpSidebar/SignUpSidebar";
Amplify.configure(awsConfig);
import { View } from "react-native";

import JCComponent, { JCState } from "../../components/JCComponent/JCComponent";

import { useNavigation, useRoute } from "@react-navigation/native";
import Billing from "../../components/Billing/Billing";
import { UserContext } from "../../screens/HomeScreen/UserContext";

interface Props {
  navigation?: any;
  route?: any;
  authState?: string;
}
interface State extends JCState {}

class SignUpScreen1Impl extends JCComponent<Props, State> {
  constructor(props: Props) {
    super(props);
  }
  static UserConsumer = UserContext.Consumer;

  render(): React.ReactNode {
    return (
      <SignUpScreen1Impl.UserConsumer>
        {({ userState, userActions }) => {
          if (!userState) return null;

          if (userState.hasPaidState == "InProgress") {
            return (
              <View style={this.styles.style.signUpScreen1PaymentBody}>
                <SignUpSidebar position="3"></SignUpSidebar>
                <Billing></Billing>
              </View>
            );
          } else return null;
        }}
      </SignUpScreen1Impl.UserConsumer>
    );
  }
}

export default function SignUpScreen1(props: Props): JSX.Element {
  const route = useRoute();
  const navigation = useNavigation();
  return <SignUpScreen1Impl {...props} navigation={navigation} route={route} />;
}
