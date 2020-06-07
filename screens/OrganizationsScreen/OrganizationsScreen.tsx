import React from 'react';
import { Container, Content } from 'native-base';
import Header from '../../components/Header/Header'
import MyMap from '../../components/MyMap/MyMap';
import MyConversations from '../../components/MyConversations/MyConversations';
import MyGroups from '../../components/MyGroups/MyGroups';
import MyPeople from '../../components/MyPeople/MyPeople';

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

      <Container data-testid="organizations">
        <Header title="Jesus Collective" navigation={this.props.navigation} onMapChange={this.mapChanged} />
        <Content>
          <MyMap type={'no-filter'} size={'50%'} navigation={this.props.navigation} mapData={this.state.mapData} visible={this.state.showMap}></MyMap>

          <Container style={{ display: "flex", flexDirection: "row", justifyContent: 'flex-start' }}>
            <Container style={{ flex: 70, flexDirection: "column", justifyContent: 'flex-start' }}>
              <MyGroups showMore={true} type="organization" wrap={true} navigation={this.props.navigation} onDataload={(mapData) => { this.mergeMapData(mapData) }}></MyGroups>
            </Container>
            <Container style={{ flex: 30, flexDirection: "column", alignContent: 'flex-start', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
              <MyPeople wrap={false} navigation={this.props.navigation} onDataload={(mapData) => { this.mergeMapData(mapData) }}></MyPeople>
              <MyConversations navigation={this.props.navigation}> </MyConversations>
              <Container ></Container>
            </Container>
          </Container>
        </Content>
      </Container>


    );
  }
}
