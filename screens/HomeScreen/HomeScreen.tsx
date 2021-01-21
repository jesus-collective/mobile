import { Container } from "native-base"
import React, { lazy } from "react"
import { Dimensions, Platform } from "react-native"
import Cookies from "universal-cookie"
import JCComponent, { JCState } from "../../components/JCComponent/JCComponent"
import MyGroups, { MapData } from "../../components/MyGroups/MyGroups"

const cookies = new Cookies()

const MyConversations = lazy(() => import("../../components/MyConversations/MyConversations"))
//const MyGroups = lazy(() => import('../../components/MyGroups/MyGroups'));
const MyPeople = lazy(() => import("../../components/MyPeople/MyPeople"))

const Header = lazy(() => import("../../components/Header/Header"))
const FooterJC = lazy(() => import("../../components/Footer/Footer"))
const MyMap = lazy(() => import("../../components/MyMap/MyMap"))

interface Props {
  navigation: any
}
interface State extends JCState {
  showMap: boolean
  width: number
  height: number
  mapData: MapData[]
}

class HomeScreen extends JCComponent<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      ...super.getInitialState(),
      mapData: [],
      showMap: cookies.get("showMap")
        ? cookies.get("showMap") == "true"
        : Dimensions.get("window").width > 720,
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height,
    }
    Dimensions.addEventListener("change", (e) => {
      const { width, height } = e.window
      this.setState({ width, height })
    })
  }
  mapChanged = (): void => {
    this.setState({ showMap: !this.state.showMap }, () => {
      cookies.set("showMap", this.state.showMap, { path: "/" })
    })
  }
  mergeMapData(mapData: MapData[]): void {
    console.log({ MergedMapData: mapData })
    //    console.log(mapData)
    const data = this.state.mapData.concat(mapData)
    this.setState({ mapData: data })
  }

  render(): React.ReactNode {
    console.log("Homepage")
    return (
      <Container data-testid="homepage">
        <Header
          title="Jesus Collective"
          navigation={this.props.navigation}
          onMapChange={this.mapChanged}
        />

        <Container style={{ flexGrow: 1, overflow: "scroll" }}>
          <MyMap type={"filters"} mapData={this.state.mapData} visible={this.state.showMap}></MyMap>
          <Container style={this.styles.style.dashboardPrimaryContainer}>
            <Container style={this.styles.style.dashboardMainContainer}>
              <Container style={this.styles.style.dashboardLeftCard}>
                <MyGroups
                  showMore={false}
                  type="event"
                  wrap={false}
                  navigation={this.props.navigation}
                  onDataload={(mapData: MapData[]) => {
                    this.mergeMapData(mapData)
                  }}
                ></MyGroups>
                <MyGroups
                  showMore={false}
                  type="group"
                  wrap={false}
                  navigation={this.props.navigation}
                  onDataload={(mapData: MapData[]) => {
                    this.mergeMapData(mapData)
                  }}
                ></MyGroups>
                <MyGroups
                  showMore={false}
                  type="resource"
                  wrap={false}
                  navigation={this.props.navigation}
                  onDataload={(mapData: MapData[]) => {
                    this.mergeMapData(mapData)
                  }}
                ></MyGroups>
                <MyGroups
                  showMore={false}
                  type="organization"
                  wrap={false}
                  navigation={this.props.navigation}
                  onDataload={(mapData: MapData[]) => {
                    this.mergeMapData(mapData)
                  }}
                ></MyGroups>
                <MyGroups
                  showMore={false}
                  type="course"
                  wrap={false}
                  navigation={this.props.navigation}
                  onDataload={(mapData: MapData[]) => {
                    this.mergeMapData(mapData)
                  }}
                ></MyGroups>
              </Container>
              <Container style={this.styles.style.dashboardRightCard}>
                <MyPeople
                  wrap={false}
                  navigation={this.props.navigation}
                  onDataload={(mapData: MapData[]) => {
                    this.mergeMapData(mapData)
                  }}
                ></MyPeople>
                <MyConversations navigation={this.props.navigation}></MyConversations>
                <Container style={{ flex: 10 }}></Container>
              </Container>
            </Container>

            {Platform.OS == "web" && this.state.width > 720 ? (
              <FooterJC title="Jesus Collective" navigation={this.props.navigation}></FooterJC>
            ) : null}
          </Container>
        </Container>
      </Container>
    )
  }
}
export default HomeScreen
