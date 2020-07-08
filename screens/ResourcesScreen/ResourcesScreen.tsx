import React from 'react';
import { Container, Content } from 'native-base';
import Header from '../../components/Header/Header'
import MyMap from '../../components/MyMap/MyMap';
import MyGroups, { MapData } from '../../components/MyGroups/MyGroups';

import JCComponent, { JCState } from '../../components/JCComponent/JCComponent';

interface Props {
  navigation: any
}
interface State extends JCState {
  showMap: boolean
  mapData: MapData[]
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
    console.log("ResourcesScreen")
    return (

      <Container data-testid="resources" >
        <Header title="Jesus Collective" navigation={this.props.navigation} />
        <Content>
          <MyMap type={"no-filters"} size={'50%'} mapData={this.state.mapData} visible={this.state.showMap}></MyMap>
          <Container style={this.styles.style.resourcesScreenMainContainer}>
            <Container style={this.styles.style.resourcesScreenLeftContainer}>

              <MyGroups showMore={true} type="resource" wrap={true} navigation={this.props.navigation} onDataload={(mapData) => { this.mergeMapData(mapData) }}></MyGroups>

            </Container>
            {/*
            <Container style={this.styles.style.resourcesScreenRightContainer}>
              <MyPeople wrap={false} navigation={this.props.navigation} onDataload={(mapData) => { this.mergeMapData(mapData) }}></MyPeople>
              <MyConversations navigation={this.props.navigation}> </MyConversations>
              <Container ></Container>
            </Container>
  */}
          </Container>
        </Content>
      </Container>


    );
  }
}
