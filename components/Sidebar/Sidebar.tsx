import { Entypo } from "@expo/vector-icons"
import { useDrawerStatus } from "@react-navigation/drawer"
import { DrawerNavigationHelpers } from "@react-navigation/drawer/lib/typescript/src/types"
import * as React from "react"
import { useEffect, useState } from "react"
import { FlatList, Text, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { ListMenusQuery } from "src/API-customqueries"
import { Data } from "../../components/Data/Data"
import Header from "../../components/Header/Header"
import { JCState } from "../JCComponent/JCComponent"

interface Props {
  route?: any
  navigation: DrawerNavigationHelpers
}
interface State extends JCState {
  showSubMenu: { [menuId: string]: boolean }
  menus: NonNullable<ListMenusQuery["listMenus"]>["items"]
}

export default function SideBar(props: Props) {
  const [state, setState] = useState<State>({
    menus: [],
    showSubMenu: {},
  })

  useEffect(() => {
    Data.listMenu(null)
      .then((listMenus) => {
        console.log({ listMenus: listMenus })
        setState((prev) => ({
          ...prev,
          menus:
            listMenus.data?.listMenus?.items.sort((x, y) => (x?.order ?? 0) - (y?.order ?? 0)) ??
            [],
        }))
      })
      .catch((e) => {
        setState((prev) => ({ ...prev, menus: e.data?.listMenus?.items ?? [] }))
      })

    //Dimensions.addEventListener("change", updateStyles)
    return () => {
      //Dimensions.removeEventListener("change", updateStyles)
    }
  }, [])
  const [showResourcesSubMenu, setShowResourcesSubMenu] = React.useState(false)
  const renderResourcesSubMenu = (subMenus: any): React.ReactNode => {
    return (
      <FlatList
        data={subMenus}
        keyExtractor={(data) => data.name}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={
                item.name === "All Resources"
                  ? { marginRight: 20, height: 40 }
                  : { marginRight: 20, borderBottomWidth: 0, height: 40 }
              }
              onPress={() => {
                props.navigation.navigate(
                  item.action,
                  item.params == "" ? null : JSON.parse(item.params)
                )

                const z = state.showSubMenu
                z[item.id] = false
                setState((prev) => ({ ...prev, showSubMenu: z }))
              }}
            >
              <Text
                style={{
                  fontFamily: "Graphik-Semibold-App",
                  fontSize: 16,
                  lineHeight: 30,
                  color: "#483938",
                  marginLeft: 24,
                }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )
        }}
      />
    )
  }
  return (
    <View style={{ flex: 1 }}>
      <Header title="Jesus Collective" drawerState={useDrawerStatus()} />
      <FlatList
        style={{ padding: 24, paddingTop: 36 }}
        data={state.menus}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          if (item == null) return null
          if ((item.subItems?.items?.length ?? 0) > 0)
            return (
              <View>
                <TouchableOpacity
                  style={{ marginRight: 20, marginBottom: 24, flexDirection: "row" }}
                  onPress={() => {
                    const z = state.showSubMenu
                    z[item.id] = !z[item.id]
                    setState((prev) => ({ ...prev, showSubMenu: z }))
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Graphik-Semibold-App",
                      fontSize: 32,
                      lineHeight: 38,
                      letterSpacing: 0.3,
                      color: "#483938",
                    }}
                  >
                    {item.name}
                  </Text>
                  <Entypo
                    name={showResourcesSubMenu ? "chevron-up" : "chevron-down"}
                    size={22}
                    color="#333333"
                    style={{ marginTop: 10, marginLeft: 5, alignSelf: "center" }}
                  />
                </TouchableOpacity>
                {state.showSubMenu[item.id] ? renderResourcesSubMenu(item.subItems?.items) : null}
              </View>
            )
          return (
            <TouchableOpacity
              style={{ marginRight: 20, marginBottom: 24 }}
              onPress={() => {
                props.navigation.navigate(
                  item.action ?? "",
                  item.params == "" || item.params == null ? null : JSON.parse(item.params)
                )
                const z = state.showSubMenu
                z[item.id] = false
                setState((prev) => ({ ...prev, showSubMenu: z }))
              }}
            >
              <Text
                style={{
                  fontFamily: "Graphik-Semibold-App",
                  fontSize: 32,
                  lineHeight: 38,
                  letterSpacing: 0.3,
                  color: "#483938",
                  fontWeight: "600",
                }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )
        }}
      />
    </View>
  )
}
function setState(arg0: (prev: any) => any) {
  throw new Error("Function not implemented.")
}
