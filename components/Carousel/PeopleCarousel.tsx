import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import React, { useEffect, useState } from "react"
import { View } from "react-native"
import { Data, UserGroupType } from "../../components/Data/Data"
import ProfileCard from "../../screens/ProfilesScreen/ProfileCard"
import { ListUsersQuery } from "../../src/API"
import HomeCarousel from "../Carousel/HomeCarousel"

const PeopleCarousel = () => {
  const navigation = useNavigation<StackNavigationProp<any, any>>()
  const [people, setPeople] = useState<NonNullable<ListUsersQuery["listUsers"]>["items"]>([])
  const [isLoading, setIsLoading] = useState(true)
  const loadGroups = async () => {
    try {
      const listUsers = await Data.listUsersForProfile(UserGroupType.All, null)
      setPeople(listUsers?.data?.listUsers?.items ?? [])
    } catch (err: any) {
      setPeople(err?.data?.listUsers?.items ?? [])
      console.error({ err })
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
          <ProfileCard forceDesktop={true} item={item} />
        </View>
      )
    return <></>
  }
  return (
    <HomeCarousel
      isLoading={isLoading}
      seeAllButton={() => navigation.push("ProfilesScreen")}
      renderItem={renderItem}
      title={"People"}
      data={people?.slice(0, 10)}
    />
  )
}

export default PeopleCarousel
