import React from 'react';
import { Container, Content } from 'native-base';
import Header from '../../components/Header/Header'
import MyMap from '../../components/MyMap/MyMap';
import MyGroups, { MapData } from '../../components/MyGroups/MyGroups';
import JCComponent, { JCState } from '../../components/JCComponent/JCComponent';


interface Props {
  navigation: any
  route: any
}
interface State extends JCState {
  showMap: boolean
  mapData: MapData[]
  showMy: boolean
}


export default class HomeScreen extends JCComponent<Props, State>{
  constructor(props: Props) {
    super(props);
    this.state = {
      ...super.getInitialState(),
      mapData: [],
      showMap: false,
      showMy: this.props.route.params ? this.props.route.params.mine : false
    }
  }
  mapChanged = (): void => {
    this.setState({ showMap: !this.state.showMap })
  }
  mergeMapData(mapData: MapData[]): void {
    //    console.log(mapData)
    const data = this.state.mapData.concat(mapData)
    this.setState({ mapData: data })
  }
  render(): React.ReactNode {
    console.log("Homepage")
    return (

      <Container data-testid="events">
        <Header title="Jesus Collective" navigation={this.props.navigation} onMapChange={this.mapChanged} />
        <Content>
          <MyMap type={"no-filters"} size={'50%'} mapData={this.state.mapData} visible={this.state.showMap}></MyMap>
          <Container style={this.styles.style.eventsScreenMainContainer}>
            <Container style={this.styles.style.eventsScreenLeftContainer}>
              <MyGroups showMy={this.state.showMy} showMore={true} type="event" wrap={true} navigation={this.props.navigation} onDataload={(mapData: MapData[]) => { this.mergeMapData(mapData) }}></MyGroups>

            </Container>
            { /*
            <Container style={style.eventsScreenRightContainer}>
              <MyPeople wrap={false} navigation={this.props.navigation} onDataload={(mapData) => { this.mergeMapData(mapData) }}></MyPeople>
              <MyConversations navigation={this.props.navigation}> </MyConversations>
              <Container ></Container>
            </Container>*/}
          </Container>
        </Content>
      </Container>


    );
  }
}
