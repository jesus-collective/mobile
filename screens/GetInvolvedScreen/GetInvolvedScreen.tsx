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

export default class GetInvolvedScreen extends React.Component<Props, State> {


  render() {
    //    const { navigate } = this.props.navigation;
    return (
      <Container>
        <Header title="Get Involved" navigation={this.props.navigation} />

      </Container>

    );
  }
}