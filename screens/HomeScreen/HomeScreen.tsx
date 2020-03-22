import React from 'react';
import { Container, Content, Footer } from 'native-base';
import {Text} from 'react-native'

import Header from '../../components/Header/Header'
import FooterJC from '../../components/Footer/Footer'
import MyMap from '../../components/MyMap/MyMap';
import MyConversations from '../../components/MyConversations/MyConversations';
import MyGroups from '../../components/MyGroups/MyGroups';
import MyPeople from '../../components/MyPeople/MyPeople';
import { Platform } from 'react-native';
import { Dimensions } from 'react-native'

interface Props {
  navigation: any
}
interface State {
  showMap: boolean
  width:any
  height:any
}


export default class HomeScreen extends React.Component<Props, State>{
  constructor(props: Props) {
    super(props);
    this.state = {
      showMap: false,
      width:Dimensions.get('window').width,
      height:Dimensions.get('window').height
    }
    Dimensions.addEventListener('change', (e) => {
      const { width, height } = e.window;
      this.setState({width, height});
    })
  }
  mapChanged = () => {
    this.setState({ showMap: !this.state.showMap })
  }

  render() {
    console.log("Homepage")
    return (
      <Container >
        <Header title="Jesus Collective" navigation={this.props.navigation} onMapChange={this.mapChanged} />
        <MyMap navigation={this.props.navigation} visible={this.state.showMap}></MyMap>

        <Container style={{ flexGrow: 1, overflow: "scroll" }}>
          <Container style={{ display: "block" }}>
            <Container style={{ height: 2300, flex: 1, display: "flex", flexDirection: "row" }}>
              <Container style={{ flex: 70, flexDirection: "column" }}>
                <MyGroups showMore={false} type="event" wrap={false} navigation={this.props.navigation}></MyGroups>
                <MyGroups showMore={false} type="group" wrap={false} navigation={this.props.navigation}></MyGroups>
                <MyGroups showMore={false} type="resource" wrap={false} navigation={this.props.navigation}></MyGroups>
                <MyGroups showMore={false} type="organization" wrap={false} navigation={this.props.navigation}></MyGroups>
                <MyGroups showMore={false} type="course" wrap={false} navigation={this.props.navigation}></MyGroups>
              </Container>
              <Container style={{ flex: 30, flexDirection: "column" }}>
                <MyPeople wrap={false} navigation={this.props.navigation}></MyPeople>
                <MyConversations navigation={this.props.navigation}> </MyConversations>
                <Container style={{ flex: 10 }}></Container>
              </Container>
            </Container>


            {
              Platform.OS == 'web' && this.state.width>720  ? <FooterJC title="Jesus Collective" navigation={this.props.navigation} ></FooterJC>
                : null
            }

          </Container>

        </Container>



      </Container>
    );
  }
}
