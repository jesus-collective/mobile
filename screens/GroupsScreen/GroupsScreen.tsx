import React from 'react';
import { Container, Content } from 'native-base';
import Header from '../../components/Header/Header'
import MyMap from '../../components/MyMap/MyMap';
import MyGroups from '../../components/MyGroups/MyGroups';
import JCComponent from '../../components/JCComponent/JCComponent';

interface Props {
  navigation: any
  route: any
}
interface State {
  showMap: boolean
  mapData: any
  showMy: boolean
}


export default class HomeScreen extends JCComponent<Props, State>{
  constructor(props: Props) {
    super(props);
    this.state = {
      mapData: [],
      showMap: false,
      showMy: this.props.route.params ? this.props.route.params.mine : false
    }
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
      <Container data-testid="groups" >
        <Header title="Jesus Collective" navigation={this.props.navigation} />
        <Content>
          {/*Map not displayed since Groups currently don't have location data
          need to re-add onMapChange to <Header/>
          <MyMap size={'50%'} type={"no-filters"} navigation={this.props.navigation} mapData={this.state.mapData} visible={this.state.showMap}></MyMap>*/}
          <Container style={style.groupsScreenMainContainer}>
            <Container style={style.groupsScreenLeftContainer}>
              <MyGroups showMy={this.state.showMy} showMore={true} type="group" wrap={true} navigation={this.props.navigation} onDataload={(mapData) => { this.mergeMapData(mapData) }}></MyGroups>
            </Container>
            {/*
            <Container style={style.groupsScreenRightContainer}>
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
