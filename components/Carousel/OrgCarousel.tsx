import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import React, { useEffect, useState } from "react"
import { View } from "react-native"
import { Org } from "screens/OrganizationsScreen/useOrgs"
import OrganizationCard from "../../screens/OrganizationsScreen/OrganizationCard"
import HomeCarousel from "../Carousel/HomeCarousel"
import { Data } from "../Data/Data"

const OrgCarousel = () => {
  const navigation = useNavigation<StackNavigationProp<any, any>>()
  const [orgs, setOrgs] = useState<Org[]>([])
  const loadOrgs = async () => {
    try {
      const orgs = await Data.listOrgs(null)
      setOrgs(orgs?.data?.listOrganizations?.items ?? [])
    } catch (err) {
      console.error({ err })
    }
  }
  useEffect(() => {
    loadOrgs()
  }, [])
  const renderItem = (item: any, width: number) => {
    if (width)
      return (
        <View style={{ width: width }}>
          <OrganizationCard item={item} />
        </View>
      )
    return <></>
  }
  return (
    <HomeCarousel
      seeAllButton={() => navigation.push("OrganizationsScreen")}
      renderItem={renderItem}
      title={"Orgs"}
      data={orgs?.slice(0, 10)}
    />
  )
}

export default OrgCarousel
