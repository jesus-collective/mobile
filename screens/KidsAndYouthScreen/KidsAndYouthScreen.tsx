import React from 'react';
import Amplify from 'aws-amplify';
import awsConfig from '../../src/aws-exports';
Amplify.configure(awsConfig);

import { Container } from 'native-base';
import Header from '../../components/Header/Header'
import JCComponent from '../../components/JCComponent/JCComponent';

interface Props {
  navigation: any
}

export default class KidsAndYouthScreen extends JCComponent<Props>{

  render(): React.ReactNode {
    // const { navigate } = this.props.navigation;
    return (
      <Container>
        <Header title="Kids and Youth" navigation={this.props.navigation} />
      </Container>

    );
  }
}