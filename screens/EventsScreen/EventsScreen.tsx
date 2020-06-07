import React from 'react';
import { Container, Content } from 'native-base';
import Header from '../../components/Header/Header'
import MyMap from '../../components/MyMap/MyMap';
import MyGroups from '../../components/MyGroups/MyGroups';
import style from '../../components/style'


interface Props {
  navigation: any
  route: any
}
interface State {
  showMap: boolean
  mapData: any
  showMy: boolean
}


export default class HomeScreen extends React.Component<Props, State>{
  constructor(props: Props) {
    super(props);
    this.state = {
      mapData: [],
      showMap: false,
      showMy: this.props.route.params ? this.props.route.params.mine : false 
    }
  }
  mapChanged = () => {
    this.setState({ showMap: !this.state.showMap })
  }
  mergeMapData(mapData) {
    //    console.log(mapData)
    const data = this.state.mapData.concat(mapData)
    this.setState({ mapData: data })
  }
  render() {
    console.log("Homepage")
    return (

      <Container data-testid="events">
        <Header title="Jesus Collective" navigation={this.props.navigation} onMapChange={this.mapChanged} />
        <Content>
          <MyMap type={"no-filters"} size={'50%'} navigation={this.props.navigation} mapData={this.state.mapData} visible={this.state.showMap}></MyMap>
          <Container style={style.eventsScreenMainContainer}>
            <Container style={style.eventsScreenLeftContainer}>
              <MyGroups showMy={this.state.showMy} showMore={true} type="event" wrap={true} navigation={this.props.navigation} onDataload={(mapData) => { this.mergeMapData(mapData) }}></MyGroups>

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
