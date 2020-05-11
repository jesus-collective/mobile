import React from 'react';
import Amplify from 'aws-amplify';
import awsConfig from '../../src/aws-exports';
Amplify.configure(awsConfig);

import { Container } from 'native-base';
import Header from '../../components/Header/Header'
import { NavigationEvents } from 'react-navigation';
import { NavigationScreenProp } from 'react-navigation';

interface Props {
  navigation: NavigationScreenProp<any, any>
}
interface State {

}
export default class ExploreScreen extends React.Component<Props, State> {
  state = {
    url: "http://jesuscollective.com/explore",
  };

  render() {
    //const { navigate } = this.props.navigation;
    //  <NavigationEvents onWillFocus={payload => { this.setState({ url: "http://jesuscollective.com/explore" }); console.log('will focus', payload) }} />

    return (
      <Container>
        <Header title="Explore" navigation={this.props.navigation} />


      </Container>

    );
  }
}