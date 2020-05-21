import React from 'react';
import Amplify from 'aws-amplify';
import awsConfig from '../../src/aws-exports';
import { Container } from 'native-base';
import Header from '../../components/Header/Header'
Amplify.configure(awsConfig);


interface Props {
  navigation: any
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