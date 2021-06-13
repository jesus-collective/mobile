import { Entypo } from "@expo/vector-icons"
import { DrawerNavigationHelpers } from "@react-navigation/drawer/lib/typescript/src/types"
import { Container, Content, Header, List, ListItem } from "native-base"
import * as React from "react"
import { Text } from "react-native"
import { constants } from "../../src/constants"
import JCComponent, { JCState } from "../JCComponent/JCComponent"
const routes = [
  {
    name: "Home",
    route: "HomeScreen",
  },
  {
    name: "Events",
    route: "EventsScreen",
  },
  {
    name: "Groups",
    route: "GroupsScreen",
  },
  {
    name: "Resources",
    route: "ResourcesScreen",
  },

  {
    name: "Courses",
    route: "CoursesScreen",
  },
]

const resourceRoutes = [
  {
    name: "All Resources",
    route: "ResourcesScreen",
    props: {},
  },
  {
    name: "Kids & Youth Curriculum",
    route: "ResourceScreen",
    props: { create: false, id: constants["SETTING_KY_GROUP_ID"] },
  },
]

interface Props {
  route?: any
  navigation: DrawerNavigationHelpers
}
interface State extends JCState {
  showResourcesSubMenu: boolean
}
class SideBar extends JCComponent<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      ...super.getInitialState(),
      showResourcesSubMenu: false,
    }
  }

  renderResourcesSubMenu(): React.ReactNode {
    return (
      <List
        dataArray={resourceRoutes}
        keyExtractor={(data) => data.name}
        renderRow={(data) => {
          return (
            <ListItem
              style={
                data.name === "All Resources"
                  ? { marginRight: 20, height: 40 }
                  : { marginRight: 20, borderBottomWidth: 0, height: 40 }
              }
              button
              onPress={() => {
                this.props.navigation.navigate(data.route, data.props)
                this.setState({ showResourcesSubMenu: false })
              }}
            >
              <Text
                style={{
                  fontFamily: "Graphik-Regular-App",
                  fontSize: 16,
                  lineHeight: 30,
                  color: "#333333",
                  marginLeft: 24,
                }}
              >
                {data.name}
              </Text>
            </ListItem>
          )
        }}
      />
    )
  }

  render(): React.ReactNode {
    return (
      <Container style={{ width: "100%" }}>
        <Content>
          <Header style={{ backgroundColor: "#FFFFFF" }}></Header>
          <List
            dataArray={routes}
            keyExtractor={(data) => data.name}
            renderRow={(data) => {
              if (data.name === "Resources")
                return (
                  <Container>
                    <ListItem
                      style={{ marginRight: 20 }}
                      button
                      onPress={() => {
                        this.setState({ showResourcesSubMenu: !this.state.showResourcesSubMenu })
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "Graphik-Regular-App",
                          fontSize: 18,
                          lineHeight: 30,
                          color: "#333333",
                          fontWeight: "800",
                        }}
                      >
                        {data.name}
                      </Text>
                      <Entypo
                        name={this.state.showResourcesSubMenu ? "chevron-up" : "chevron-down"}
                        size={22}
                        color="#333333"
                        style={{ marginTop: 5 }}
                      />
                    </ListItem>
                    {this.state.showResourcesSubMenu ? this.renderResourcesSubMenu() : null}
                  </Container>
                )
              return (
                <ListItem
                  style={{ marginRight: 20 }}
                  button
                  onPress={() => {
                    this.props.navigation.navigate(data.route)
                    this.setState({ showResourcesSubMenu: false })
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Graphik-Regular-App",
                      fontSize: 18,
                      lineHeight: 30,
                      color: "#333333",
                      fontWeight: "800",
                    }}
                  >
                    {data.name}
                  </Text>
                </ListItem>
              )
            }}
          />
        </Content>
      </Container>
    )
  }
}

export default SideBar
