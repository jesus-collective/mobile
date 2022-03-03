import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import React, { useEffect, useState } from "react"
import { View } from "react-native"
import { Data } from "../../components/Data/Data"
import GroupCard from "../../screens/GroupsScreen/GroupCard"
import { Group, ModelSortDirection } from "../../src/API"
import HomeCarousel from "../Carousel/HomeCarousel"

const GroupCarousel = () => {
  const navigation = useNavigation<StackNavigationProp<any, any>>()
  const [groups, setGroups] = useState<Group[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const loadGroups = async () => {
    try {
      const listGroup = await Data.groupByTypeForMyGroups("group", ModelSortDirection.DESC, null)
      setGroups(listGroup?.data?.groupByType?.items as Group[])
    } catch (err: any) {
      console.error({ GroupCarousel: err })
      setGroups(err?.data?.groupByType?.items as Group[])
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    loadGroups()
  }, [])
  const renderItem = (item: any, width: number) => {
    if (width)
      return (
        <View style={{ width: width }}>
          <GroupCard item={item} />
        </View>
      )
    return <></>
  }
  return (
    <HomeCarousel
      isLoading={isLoading}
      seeAllButton={() => navigation.navigate("GroupsScreen")}
      renderItem={renderItem}
      title={"Groups"}
      data={groups.slice(0, 10)}
    />
  )
}

export default GroupCarousel
