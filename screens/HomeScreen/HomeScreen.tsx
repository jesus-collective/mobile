import React, { lazy } from 'react';
import { Container } from 'native-base';
import styles from '../../components/style'
import { Platform } from 'react-native';
import { Dimensions } from 'react-native'
import { withNavigation } from 'react-navigation';

const MyConversations = lazy(() => import('../../components/MyConversations/MyConversations'));
const MyGroups = lazy(() => import('../../components/MyGroups/MyGroups'));
const MyPeople = lazy(() => import('../../components/MyPeople/MyPeople'));

const Header = lazy(() => import('../../components/Header/Header'));
const FooterJC = lazy(() => import('../../components/Footer/Footer'));
const MyMap = lazy(() => import('../../components/MyMap/MyMap'));

interface Props {
  navigation: any
}
interface State {
  showMap: boolean
  width: any
  height: any
  mapData: any
}


class HomeScreen extends React.Component<Props, State>{
  constructor(props: Props) {
    super(props);
    this.state = {
      mapData: [],
      showMap: false,
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height
    }
    Dimensions.addEventListener('change', (e) => {
      const { width, height } = e.window;
      this.setState({ width, height });
    })
  }
  mapChanged = () => {
    this.setState({ showMap: !this.state.showMap })
  }
  mergeMapData(mapData) {
    //    console.log(mapData)
    var data = this.state.mapData.concat(mapData)
    this.setState({ mapData: data })
  }
  render() {
    console.log("Homepage")
    return (
      <Container >
        <Header title="Jesus Collective" navigation={this.props.navigation} onMapChange={this.mapChanged} />
        <MyMap navigation={this.props.navigation} mapData={this.state.mapData} visible={this.state.showMap}></MyMap>

        <Container style={{ flexGrow: 1, overflow: "scroll" }}>
          <Container style={{ display: "block" }}>
            <Container style={{ height: 2300, flex: 1, display: "flex", flexDirection: "row" }}>
              <Container style={{ flex: 70, flexDirection: "column", backgroundColor: "#F9FAFC" }}>
                <MyGroups showMore={false} type="event" wrap={false} navigation={this.props.navigation} onDataload={(mapData) => { this.mergeMapData(mapData) }}></MyGroups>
                <MyGroups showMore={false} type="group" wrap={false} navigation={this.props.navigation} onDataload={(mapData) => { this.mergeMapData(mapData) }}></MyGroups>
                <MyGroups showMore={false} type="resource" wrap={false} navigation={this.props.navigation} onDataload={(mapData) => { this.mergeMapData(mapData) }}></MyGroups>
                <MyGroups showMore={false} type="organization" wrap={false} navigation={this.props.navigation} onDataload={(mapData) => { this.mergeMapData(mapData) }}></MyGroups>
                <MyGroups showMore={false} type="course" wrap={false} navigation={this.props.navigation} onDataload={(mapData) => { this.mergeMapData(mapData) }}></MyGroups>
              </Container>
              <Container style={{ flex: 30, flexDirection: "column" }}>
                <MyPeople wrap={false} navigation={this.props.navigation} onDataload={(mapData) => { this.mergeMapData(mapData) }}></MyPeople>
                <MyConversations navigation={this.props.navigation}></MyConversations>
                <Container style={{ flex: 10 }}></Container>
              </Container>
            </Container>


            {
              Platform.OS == 'web' && this.state.width > 720 ? <FooterJC title="Jesus Collective" navigation={this.props.navigation} ></FooterJC>
                : null
            }

          </Container>

        </Container>



      </Container>
    );
  }
}
export default withNavigation(HomeScreen)