import React from 'react';
import Amplify from 'aws-amplify';
import awsConfig from '../../src/aws-exports';
import Header from '../../components/Header/Header'
import MyProfile from '../../components/MyProfile/MyProfile'

Amplify.configure(awsConfig);

import { Container} from 'native-base';

import { NavigationScreenProp } from 'react-navigation';
interface Props{
  navigation: NavigationScreenProp<any, any>
}
interface State{
  loadId: string
  createNew: boolean
  canSave: boolean
  isEditable: boolean
 

}
export default class ProfileScreen extends React.Component <Props,State>{
  constructor(props: Props) {
    super(props);

    this.state = {
      loadId: props.navigation.state.params.id,
      createNew: false,
      canSave: true,
      isEditable: true
    }
   
  }
  render() {
//    const { navigate } = this.props.navigation;
    return (
      <Container>
        <Header title="Profile" navigation={this.props.navigation} />
        <MyProfile loadId={this.state.loadId} navigation={this.props.navigation}/>
      </Container>
    );
  }
}