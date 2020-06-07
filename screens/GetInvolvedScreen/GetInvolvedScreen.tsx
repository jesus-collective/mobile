import React from 'react';
import Amplify from 'aws-amplify';
import awsConfig from '../../src/aws-exports';
import { Container } from 'native-base';
import Header from '../../components/Header/Header'
import JCComponent from '../../components/JCComponent/JCComponent';

Amplify.configure(awsConfig);


interface Props {
  navigation: any
}

export default class GetInvolvedScreen extends JCComponent<Props> {


  render() {
    //    const { navigate } = this.props.navigation;
    return (
      <Container>
        <Header title="Get Involved" navigation={this.props.navigation} />

      </Container>

    );
  }
}