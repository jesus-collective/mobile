﻿import React from 'react';
import { Container, Content } from 'native-base';
import Header from '../../components/Header/Header'
import MyMap from '../../components/MyMap/MyMap';
import MyConversations from '../../components/MyConversations/MyConversations';
import MyGroups, { MapData } from '../../components/MyGroups/MyGroups';
import MyPeople from '../../components/MyPeople/MyPeople';
import JCComponent, { JCState } from '../../components/JCComponent/JCComponent';

interface Props {
  navigation: any
}
interface State extends JCState {
  showMap: boolean
  mapData: any
}


export default class HomeScreen extends JCComponent<Props, State>{
  constructor(props: Props) {
    super(props);
    this.state = {
      ...super.getInitialState(),
      mapData: [],
      showMap: false
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

      <Container >
        <Header title="Jesus Collective" navigation={this.props.navigation} onMapChange={this.mapChanged} />
        <Content>
          <MyMap type={'no-filters'} size={'50%'} mapData={this.state.mapData} visible={this.state.showMap}></MyMap>
          <Container style={{ display: "flex", flexDirection: "row", justifyContent: 'flex-start' }}>
            <Container style={{ flex: 70, flexDirection: "column", justifyContent: 'flex-start' }}>
              <MyGroups showMore={true} type="course" wrap={true} navigation={this.props.navigation} onDataload={(mapData: MapData[]) => { this.mergeMapData(mapData) }}></MyGroups>
            </Container>
            <Container style={{ flex: 30, flexDirection: "column", alignContent: 'flex-start', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
              <MyPeople wrap={false} navigation={this.props.navigation} onDataload={(mapData: MapData[]) => { this.mergeMapData(mapData) }}></MyPeople>
              <MyConversations navigation={this.props.navigation}> </MyConversations>
              <Container ></Container>
            </Container>
          </Container>
        </Content>
      </Container>


    );
  }
}
