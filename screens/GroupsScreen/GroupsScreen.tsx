import { Container, Content } from "native-base"
import React from "react"
import Header from "../../components/Header/Header"
import JCComponent, { JCState } from "../../components/JCComponent/JCComponent"
import MyGroups, { MapData } from "../../components/MyGroups/MyGroups"

interface Props {
  navigation: any
  route: any
}
interface State extends JCState {
  showMap: boolean
  mapData: MapData[]
  showMy: boolean
}

export default class HomeScreen extends JCComponent<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      ...super.getInitialState(),
      mapData: [],
      showMap: false,
      showMy: this.props.route.params ? this.props.route.params.mine : false,
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
    console.log("GroupsScreen")
    return (
      <Container testID="groups">
        <Header title="Jesus Collective" navigation={this.props.navigation} />
        <Content>
          {/*Map not displayed since Groups currently don't have location data need to re-add onMapChange to <Header/>
          <MyMap size={'50%'} type={"no-filters"}  mapData={this.state.mapData} visible={this.state.showMap}></MyMap>*/}
          <Container style={this.styles.style.groupsScreenMainContainer}>
            <Container style={this.styles.style.groupsScreenLeftContainer}>
              <MyGroups
                showMy={this.state.showMy}
                showMore={true}
                type="group"
                wrap={true}
                navigation={this.props.navigation}
                onDataload={(mapData) => {
                  this.mergeMapData(mapData)
                }}
              ></MyGroups>
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
    )
  }
}
