import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import React, { useEffect, useState } from "react"
import { View } from "react-native"
import { Org } from "screens/OrganizationsScreen/useOrgs"
import { ListOrganizationsQuery } from "src/API"
import OrganizationCard from "../../screens/OrganizationsScreen/OrganizationCard"
import HomeCarousel from "../Carousel/HomeCarousel"
import { Data } from "../Data/Data"

const OrgCarousel = () => {
  const navigation = useNavigation<StackNavigationProp<any, any>>()
  const [orgs, setOrgs] = useState<Org[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const loadOrgs = async () => {
    let tempOrgs: NonNullable<ListOrganizationsQuery["listOrganizations"]>["items"] = []
    const loadNext = async (next: null | undefined | string = null) => {
      try {
        const orgs = await Data.listOrgs(next)
        if (orgs.data?.listOrganizations?.items?.length)
          tempOrgs = [...tempOrgs, ...(orgs?.data?.listOrganizations?.items ?? [])]
        if (orgs?.data?.listOrganizations?.nextToken && tempOrgs.length < 10)
          await loadNext(orgs?.data?.listOrganizations?.nextToken)
      } catch (err: any) {
        if (err?.data?.listOrganizations?.items?.length)
          tempOrgs = [...tempOrgs, ...(err?.data?.listOrganizations?.items ?? [])]
        if (err?.data?.listOrganizations?.nextToken && tempOrgs.length < 10)
          await loadNext(err?.data?.listOrganizations?.nextToken)
        console.error({ OrgCarousel: err })
      }
    }

    await loadNext()
    setIsLoading(false)
    setOrgs(tempOrgs)
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
      isLoading={isLoading}
      seeAllButton={() => navigation.push("OrganizationsScreen")}
      renderItem={renderItem}
      title={"Orgs"}
      data={orgs?.slice(0, 9)}
    />
  )
}

export default OrgCarousel
