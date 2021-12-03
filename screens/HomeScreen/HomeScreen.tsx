import { StackNavigationProp } from "@react-navigation/stack"
import React, { lazy } from "react"
import { BrowserView, MobileOnlyView } from "react-device-detect"
import { Dimensions, Platform, SafeAreaView, Text, TouchableOpacity, View } from "react-native"
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
  navigation: StackNavigationProp<any, any>
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
    // Dimensions.addEventListener("change", (e) => {
    //   const { width, height } = e.window
    //   this.setState({ width, height })
    // })
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
    const windowHeight = Dimensions.get("window").height
    console.log("Homepage")
    return (
      <SafeAreaView style={Platform.OS === "web" ? { height: windowHeight, flexGrow: 1 } : {}}>
        <BrowserView>
          {Platform.OS == "web" && this.state.width > 720 ? (
            <MyMap
              type={"filters"}
              mapData={this.state.mapData}
              visible={this.state.showMap}
            ></MyMap>
          ) : null}
          <View style={this.styles.style.dashboardPrimaryContainer}>
            <View style={this.styles.style.dashboardMainContainer}>
              <View style={this.styles.style.dashboardLeftCard}>
                <MyGroups
                  showMore={false}
                  type="event"
                  wrap={false}
                  navigation={this.props.navigation}
                  onDataload={(mapData: MapData[]) => {
                    this.mergeMapData(mapData)
                  }}
                  homeDashboard
                ></MyGroups>
                <MyGroups
                  showMore={false}
                  type="group"
                  wrap={false}
                  navigation={this.props.navigation}
                  onDataload={(mapData: MapData[]) => {
                    this.mergeMapData(mapData)
                  }}
                  homeDashboard
                ></MyGroups>
                <MyGroups
                  showMore={false}
                  type="resource"
                  wrap={false}
                  navigation={this.props.navigation}
                  onDataload={(mapData: MapData[]) => {
                    this.mergeMapData(mapData)
                  }}
                  homeDashboard
                ></MyGroups>
                <MyGroups
                  showMore={false}
                  type="organization"
                  wrap={false}
                  navigation={this.props.navigation}
                  onDataload={(mapData: MapData[]) => {
                    this.mergeMapData(mapData)
                  }}
                  homeDashboard
                ></MyGroups>
                <MyGroups
                  showMore={false}
                  type="course"
                  wrap={false}
                  navigation={this.props.navigation}
                  onDataload={(mapData: MapData[]) => {
                    this.mergeMapData(mapData)
                  }}
                  homeDashboard
                ></MyGroups>
              </View>
              <View style={this.styles.style.dashboardRightCard}>
                <MyPeople
                  wrap={false}
                  navigation={this.props.navigation}
                  onDataload={(mapData: MapData[]) => {
                    this.mergeMapData(mapData)
                  }}
                ></MyPeople>
                <MyConversations navigation={this.props.navigation}></MyConversations>
                <View style={{ flex: 10 }}></View>
              </View>
            </View>

            {Platform.OS == "web" && this.state.width > 720 ? (
              <FooterJC title="Jesus Collective" navigation={this.props.navigation}></FooterJC>
            ) : null}
          </View>
        </BrowserView>
        <MobileOnlyView style={{ marginTop: 30 }}>
          <TouchableOpacity
            style={{
              borderBottomWidth: 2,
              borderTopWidth: 2,
              borderTopColor: "#E4E1E1",
              borderBottomColor: "#E4E1E1",
            }}
            onPress={() => this.props.navigation.navigate("EventsScreen")}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: "700",
                padding: 16,
                backgroundColor: "white",
                color: "black",
              }}
            >
              Events
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ borderBottomWidth: 2, borderBottomColor: "#E4E1E1" }}
            onPress={() => this.props.navigation.navigate("GroupsScreen")}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: "700",
                padding: 16,
                backgroundColor: "white",
                color: "black",
              }}
            >
              Groups
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ borderBottomWidth: 2, borderBottomColor: "#E4E1E1" }}
            onPress={() => this.props.navigation.navigate("ProfilesScreen")}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: "700",
                padding: 16,
                backgroundColor: "white",
                color: "black",
              }}
            >
              People
            </Text>
          </TouchableOpacity>
        </MobileOnlyView>
      </SafeAreaView>
    )
  }
}
export default HomeScreen
