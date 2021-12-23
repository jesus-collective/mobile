import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import React, { useEffect, useState } from "react"
import { View } from "react-native"
import { Data, UserGroupType } from "../../components/Data/Data"
import ProfileCard from "../../screens/ProfilesScreen/ProfileCard"
import { ListUsersQuery } from "../../src/API"
import HomeCarousel from "./HomeCarousel"

const PeopleCarousel = () => {
  const navigation = useNavigation<StackNavigationProp<any, any>>()
  const [people, setPeople] = useState<NonNullable<ListUsersQuery["listUsers"]>["items"]>([])
  const loadGroups = async () => {
    const listUsers = await Data.listUsersForProfile(UserGroupType.All, null)
    setPeople(listUsers?.data?.listUsers?.items)
  }
  useEffect(() => {
    loadGroups()
  }, [])
  const renderItem = (item: any, width: number) => {
    return (
      <View style={{ width: width }}>
        <ProfileCard forceDesktop={true} item={item} />
      </View>
    )
  }
  return (
    <HomeCarousel
      seeAllButton={() => navigation.navigate("ProfilesScreen")}
      renderItem={renderItem}
      title={"People"}
      data={people?.slice(0, 10)}
    />
  )
}

export default PeopleCarousel
