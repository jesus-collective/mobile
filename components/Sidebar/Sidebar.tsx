import { Entypo } from "@expo/vector-icons"
import { DrawerNavigationHelpers } from "@react-navigation/drawer/lib/typescript/src/types"
import { Container, Content, Header, List, ListItem } from "native-base"
import * as React from "react"
import { Text } from "react-native"
import { ListMenusQuery } from "src/API-customqueries"
import { Data } from "../../components/Data/Data"
import JCComponent, { JCState } from "../JCComponent/JCComponent"

interface Props {
  route?: any
  navigation: DrawerNavigationHelpers
}
interface State extends JCState {
  showSubMenu: { [menuId: string]: boolean }
  menus: NonNullable<ListMenusQuery["listMenus"]>["items"]
}
class SideBar extends JCComponent<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      ...super.getInitialState(),
      showSubMenu: {},
      menus: [],
    }
    Data.listMenu(null)
      .then((listMenus) => {
        console.log({ listMenus: listMenus })
        this.setState({
          menus:
            listMenus.data?.listMenus?.items.sort((x, y) => (x.order ?? 0) - (y.order ?? 0)) ?? [],
        })
      })
      .catch((e) => {
        this.setState({ menus: e.data?.listMenus?.items ?? [] })
      })
  }

  renderResourcesSubMenu(subMenus: any): React.ReactNode {
    return (
      <List
        dataArray={subMenus}
        keyExtractor={(data) => data.id}
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
                this.props.navigation.navigate(
                  data.action,
                  data.params == "" ? null : JSON.parse(data.params)
                )
                const z = this.state.showSubMenu
                z[data.id] = false
                this.setState({ showSubMenu: z })
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
            dataArray={this.state.menus}
            keyExtractor={(data) => data.id}
            renderRow={(data) => {
              if ((data.subItems?.items?.length ?? 0) > 0)
                return (
                  <Container>
                    <ListItem
                      style={{ marginRight: 20 }}
                      button
                      onPress={() => {
                        const z = this.state.showSubMenu
                        z[data.id] = !z[data.id]
                        this.setState({ showSubMenu: z })
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
                        name={this.state.showSubMenu[data.id] ? "chevron-up" : "chevron-down"}
                        size={22}
                        color="#333333"
                        style={{ marginTop: 5 }}
                      />
                    </ListItem>
                    {this.state.showSubMenu[data.id]
                      ? this.renderResourcesSubMenu(data.subItems.items)
                      : null}
                  </Container>
                )
              return (
                <ListItem
                  style={{ marginRight: 20 }}
                  button
                  onPress={() => {
                    this.props.navigation.navigate(
                      data.action,
                      data.params == "" ? null : JSON.parse(data.params)
                    )
                    const z = this.state.showSubMenu
                    z[data.id] = false
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
