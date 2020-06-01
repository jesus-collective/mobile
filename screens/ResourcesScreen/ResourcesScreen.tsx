import React from 'react';
import { Container, Content } from 'native-base';
import Header from '../../components/Header/Header'
import MyMap from '../../components/MyMap/MyMap';
import MyConversations from '../../components/MyConversations/MyConversations';
import MyGroups from '../../components/MyGroups/MyGroups';
import MyPeople from '../../components/MyPeople/MyPeople';
import styles from '../../components/style'

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

      <Container data-testid="resources" >
        <Header title="Jesus Collective" navigation={this.props.navigation} onMapChange={this.mapChanged} />
        <MyMap navigation={this.props.navigation} mapData={this.state.mapData} visible={this.state.showMap}></MyMap>
        <Content>
          <Container style={styles.resourcesScreenMainContainer}>
            <Container style={styles.resourcesScreenLeftContainer}>

              <MyGroups showMore={true} type="resource" wrap={true} navigation={this.props.navigation} onDataload={(mapData) => { this.mergeMapData(mapData) }}></MyGroups>

            </Container>
            {/*
            <Container style={styles.resourcesScreenRightContainer}>
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
