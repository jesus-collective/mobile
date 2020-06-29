import React from 'react';
import Amplify from 'aws-amplify';
import awsConfig from '../../src/aws-exports';
import JCComponent from '../../components/JCComponent/JCComponent';

Amplify.configure(awsConfig);

import { Container } from 'native-base';

import Header from '../../components/Header/Header'
interface Props {
  navigation: any
}
export default class NewsScreen extends JCComponent<Props>{

  render(): React.ReactNode {
    // const { navigate } = this.props.navigation;
    return (
      <Container>
        <Header title="News" navigation={this.props.navigation} />


      </Container>

    );
  }
}