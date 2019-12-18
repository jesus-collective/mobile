import React from 'react';
import { Container,Content, Text } from 'native-base';
import Header from '../../components/Header/Header'
import MyMap from '../../components/MyMap/MyMap';
import MyConversations from '../../components/MyConversations/MyConversations';
import MyEvents from '../../components/MyEvents/MyEvents';
import MyGroups from '../../components/MyGroups/MyGroups';
import MyResources from '../../components/MyResources/MyResources';
import MyPeople from '../../components/MyPeople/MyPeople';
import MyOrganizations from '../../components/MyOrganizations/MyOrganizations';
import { NavigationScreenProp } from 'react-navigation';
interface Props {
  navigation: NavigationScreenProp<any, any>
}
interface State {
  showMap: boolean
}


export default class HomeScreen extends React.Component<Props, State>{
  constructor(props: Props) {
    super(props);
    this.state = {
      showMap: false
    }
  }
  mapChanged = () => {
    this.setState({ showMap: !this.state.showMap })
  }

  render() {
    console.log("Homepage")
    return (

      <Container >
        <Header title="Jesus Collective" navigation={this.props.navigation} onMapChange={this.mapChanged} />
        <MyMap visible={this.state.showMap}></MyMap>
        <Content>
          <Container style={{ display: "flex", flexDirection: "row", justifyContent: 'flex-start' }}>
            <Container style={{ flex: 70, flexDirection: "column", justifyContent: 'flex-start' }}>
              <MyEvents ></MyEvents>
              <MyGroups ></MyGroups>
              <MyResources ></MyResources>
              <MyOrganizations ></MyOrganizations>
            </Container>
            <Container style={{ flex: 30, flexDirection: "column", alignContent: 'flex-start', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
              <MyPeople ></MyPeople>
              <MyConversations > </MyConversations>
              <Container ></Container>
            </Container>
          </Container>
        </Content>
      </Container>


    );
  }
}
