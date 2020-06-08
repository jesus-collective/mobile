import React, { lazy } from 'react';
import { Container } from 'native-base';

import { Platform } from 'react-native';
import { Dimensions } from 'react-native'
import MyGroups from '../../components/MyGroups/MyGroups'
import JCComponent from '../../components/JCComponent/JCComponent';

const MyConversations = lazy(() => import('../../components/MyConversations/MyConversations'));
//const MyGroups = lazy(() => import('../../components/MyGroups/MyGroups'));
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


class HomeScreen extends JCComponent<Props, State>{
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
  mapChanged = (): void => {
    this.setState({ showMap: !this.state.showMap })
  }
  mergeMapData(mapData): void {
    //    console.log(mapData)
    const data = this.state.mapData.concat(mapData)
    this.setState({ mapData: data })
  }


  render(): React.ReactNode {
    console.log("Homepage")
    return (
      <Container data-testid="homepage">
        <Header title="Jesus Collective" navigation={this.props.navigation} onMapChange={this.mapChanged} />

        <Container style={{ flexGrow: 1, overflow: "scroll" }}>
          <MyMap type={'filters'} mapData={this.state.mapData} visible={this.state.showMap}></MyMap>
          <Container style={this.styles.style.dashboardPrimaryContainer}>
            <Container style={this.styles.style.dashboardMainContainer}>
              <Container style={this.styles.style.dashboardLeftCard}>
                <MyGroups showMore={false} type="event" wrap={false} navigation={this.props.navigation} onDataload={(mapData) => { this.mergeMapData(mapData) }}></MyGroups>
                <MyGroups showMore={false} type="group" wrap={false} navigation={this.props.navigation} onDataload={(mapData) => { this.mergeMapData(mapData) }}></MyGroups>
                <MyGroups showMore={false} type="resource" wrap={false} navigation={this.props.navigation} onDataload={(mapData) => { this.mergeMapData(mapData) }}></MyGroups>
                <MyGroups showMore={false} type="organization" wrap={false} navigation={this.props.navigation} onDataload={(mapData) => { this.mergeMapData(mapData) }}></MyGroups>
                <MyGroups showMore={false} type="course" wrap={false} navigation={this.props.navigation} onDataload={(mapData) => { this.mergeMapData(mapData) }}></MyGroups>
              </Container>
              <Container style={this.styles.style.dashboardRightCard}>
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
export default HomeScreen