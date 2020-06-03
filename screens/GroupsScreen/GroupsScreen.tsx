import React from 'react';
import { Container, Content } from 'native-base';
import Header from '../../components/Header/Header'
import MyMap from '../../components/MyMap/MyMap';
import MyGroups from '../../components/MyGroups/MyGroups';
import style from '../../components/style'

interface Props {
  navigation: any
}
interface State {
  showMap: boolean
  mapData: any
}


export default class HomeScreen extends React.Component<Props, State>{
  constructor(props: Props) {
    super(props);
    this.state = {
      mapData: [],
      showMap: false
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
        <Header title="Jesus Collective" navigation={this.props.navigation} onMapChange={this.mapChanged} />
        <MyMap navigation={this.props.navigation} mapData={this.state.mapData} visible={this.state.showMap}></MyMap>
        <Content>
          <Container style={style.groupsScreenMainContainer}>
            <Container style={style.groupsScreenLeftContainer}>
              <MyGroups showMore={true} type="group" wrap={true} navigation={this.props.navigation} onDataload={(mapData) => { this.mergeMapData(mapData) }}></MyGroups>
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
