import { StackNavigationProp } from "@react-navigation/stack"
import { Container, Content } from "native-base"
import React from "react"
import JCComponent, { JCState } from "../../components/JCComponent/JCComponent"
import MyConversations from "../../components/MyConversations/MyConversations"
import MyGroups, { MapData } from "../../components/MyGroups/MyGroups"
import MyMap from "../../components/MyMap/MyMap"
import MyPeople from "../../components/MyPeople/MyPeople"

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

  render(): React.ReactNode {
    console.log("OrganizationScreen")
    return (
      <Container testID="organizations">
        <Content>
          <MyMap
            type={"no-filter"}
            size={"50%"}
            mapData={this.state.mapData}
            visible={this.state.showMap}
          ></MyMap>

          <Container
            style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start" }}
          >
            <Container style={{ flex: 70, flexDirection: "column", justifyContent: "flex-start" }}>
              <MyGroups
                showMore={true}
                type="organization"
                wrap={true}
                navigation={this.props.navigation}
              ></MyGroups>
            </Container>
            <Container
              style={{
                flex: 30,
                flexDirection: "column",
                alignContent: "flex-start",
                alignItems: "flex-start",
                justifyContent: "flex-start",
              }}
            >
              <MyPeople wrap={false} navigation={this.props.navigation}></MyPeople>
              <MyConversations navigation={this.props.navigation}> </MyConversations>
              <Container></Container>
            </Container>
          </Container>
        </Content>
      </Container>
    )
  }
}
