import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import React, { useEffect, useState } from "react"
import { View } from "react-native"
import { Group } from "src/API"
import { Data } from "../../components/Data/Data"
import GroupCard from "../../screens/GroupsScreen/GroupCard"
import HomeCarousel from "../Carousel/HomeCarousel"

const GroupCarousel = () => {
  const navigation = useNavigation<StackNavigationProp<any, any>>()
  const [groups, setGroups] = useState<Group[]>([])
  const loadGroups = async () => {
    const listGroup = await Data.groupByTypeForMyGroups("group", null)
    setGroups(listGroup?.data?.groupByType?.items as Group[])
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
      seeAllButton={() => navigation.navigate("GroupsScreen")}
      renderItem={renderItem}
      title={"Groups"}
      data={groups.slice(0, 10)}
    />
  )
}

export default GroupCarousel
