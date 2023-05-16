import { StackNavigationProp } from "@react-navigation/stack"
import React, { useContext, useEffect, useState } from "react"
import { ScrollView, StyleSheet, Text, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { GetResourceRootData, GroupData } from "src/types"
import { AdminStyles } from "../../components/AdminStyles"
import { Data } from "../../components/Data/Data"
import { ListResourceRootsQuery } from "../../src/API"
import { UserContext } from "../HomeScreen/UserContext"
interface Props {
  navigation: StackNavigationProp<any, any>
  route: any
}
type ResourceRoots = NonNullable<
  NonNullable<ListResourceRootsQuery["listResourceRoots"]>["items"]
>[0]

export default function AdminResourcesScreen(props: Props) {
  const styles = StyleSheet.create(AdminStyles)
  const [groups, setGroups] = useState<GroupData[]>([])
  const [resourceRoots, setResourceRoots] = useState<ResourceRoots[]>()
  const [resourceRootData, setResourceRootData] = useState<GetResourceRootData[]>([])
  useEffect(() => {
    setInitialData()
  }, [])

  const setInitialData = async () => {
    try {
      //      const groups = await Data.loadResources(null)
      //      console.log({ groups: groups })
      //      groups.data?.groupByType?.items.forEach(async (item) => {
      const resourceRoutes = await Data.listResourceRoots(null)
      console.log({ resourceRoutes: resourceRoutes })
      setResourceRoots(resourceRoutes.data?.listResourceRoots?.items ?? [])

      const z =
        resourceRoutes.data?.listResourceRoots?.items.map(async (item) => {
          try {
            const groupData = await Data.getGroup(item?.groupId)
            setGroups((a) => {
              return [...a, groupData.data?.getGroup]
            })
            const itemData = await Data.getResourceRoot(item.id)

            console.log({ itemData: itemData })
            setResourceRootData((a) => {
              return [...a, itemData.data?.getResourceRoot]
            })
          } catch (e) {
            console.log(e)
          }
          return true
        }) ?? []
      await Promise.all(z)

      console.log({ resourceRootData: resourceRootData })
    } catch (e) {
      console.log(e)
    }
  }
  const UserConsumer = useContext(UserContext)
  if (!UserConsumer.userState) return null
  console.log("AdminScreen")
  return (
    <View testID="events" style={{ margin: 96 }}>
      {UserConsumer.userActions.isMemberOf("admin") ? (
        <ScrollView>
          <Text style={AdminStyles.textHeader}>Resource Collections</Text>
          <View>
            <View style={{ padding: 10, flexDirection: "row", width: "100%" }}>
              <View style={{ flexBasis: 1, flexGrow: 1 }}>
                <Text style={AdminStyles.textTableHeader}>
                  {resourceRootData.length} Resource Collections
                </Text>
              </View>
              <View style={{ flexBasis: 1, flexGrow: 1 }}>
                <Text style={AdminStyles.textTableHeader}>Status</Text>
              </View>
              <View style={{ flexBasis: 1, flexGrow: 1 }}>
                <Text style={AdminStyles.textTableHeader}>Date</Text>
              </View>
            </View>
            {resourceRootData?.map((item) => {
              if (groups.filter((z) => z?.id == item?.groupId).length == 0) return null
              const group = groups.filter((z) => z?.id == item?.groupId)[0]
              return (
                <View style={{ padding: 10, borderTopWidth: 1, borderTopColor: "#E9EDF2" }}>
                  <View key={item.id} style={{ flexDirection: "row", width: "100%" }}>
                    <View style={{ flexBasis: 1, flexGrow: 1 }}>
                      <Text style={AdminStyles.textTableBold}>{group?.name}</Text>
                    </View>
                    <View style={{ flexBasis: 1, flexGrow: 1 }}>
                      <Text style={AdminStyles.textTableBold}>
                        {item?.resources?.items.length} Resources
                      </Text>
                    </View>
                    <View style={{ flexBasis: 1, flexGrow: 1 }}></View>
                  </View>
                  {item?.resources?.items.map((item2) => {
                    return (
                      <TouchableOpacity>
                        <View key={item.id} style={{ flexDirection: "row", width: "100%" }}>
                          <View style={{ flexBasis: 1, flexGrow: 1 }}>
                            <Text style={AdminStyles.textTableBold}>{item2?.title}</Text>
                            <Text style={AdminStyles.textTableBold}>{item2?.subtitle}</Text>
                          </View>
                          <View style={{ flexBasis: 1, flexGrow: 1 }}>
                            <Text style={AdminStyles.textTableBold}>Published</Text>
                          </View>
                          <View style={{ flexBasis: 1, flexGrow: 1 }}>
                            <Text style={AdminStyles.textTableBold}>1/1/1980</Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    )
                  })}
                </View>
              )
            })}
          </View>
        </ScrollView>
      ) : (
        <ScrollView>
          <View style={styles.adminScreenMainContainer}>
            <View style={styles.adminScreenLeftContainer}>
              <Text>You must be an admin to see this screen</Text>
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  )
}
