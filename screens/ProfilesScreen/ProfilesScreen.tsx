import { StackNavigationProp } from "@react-navigation/stack"
import { Container, Content } from "native-base"
import React from "react"
import Header from "../../components/Header/Header"
import JCComponent, { JCState } from "../../components/JCComponent/JCComponent"
import MyGroups, { MapData } from "../../components/MyGroups/MyGroups"
import MyMap from "../../components/MyMap/MyMap"
interface Props {
  navigation: StackNavigationProp<any, any>
}
interface State extends JCState {
  showMap: boolean
  mapData: MapData[]
}

export default class HomeScreen extends JCComponent<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      ...super.getInitialState(),
      mapData: [],
      showMap: false,
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
    console.log("Profiles")
    return (
      <Container testID="profiles">
        <Header
          title="Jesus Collective"
          navigation={this.props.navigation}
          onMapChange={this.mapChanged}
        />
        <Content>
          <MyMap
            type={"no-filters"}
            mapData={this.state.mapData}
            visible={this.state.showMap}
          ></MyMap>
          <Container style={this.styles.style.profilesScreenMainContainer}>
            <Container style={this.styles.style.profilesScreenLeftContainer}>
              <MyGroups
                showMore={true}
                type="profile"
                wrap={true}
                navigation={this.props.navigation}
                onDataload={(mapData) => {
                  this.mergeMapData(mapData)
                }}
              ></MyGroups>
            </Container>
            {/*
            <Container style={this.styles.style.profilesScreensRightContainer}>
              <MyConversations navigation={this.props.navigation}> </MyConversations>
              <Container ></Container>
            </Container>
            */}
          </Container>
        </Content>
      </Container>
    )
  }
}
