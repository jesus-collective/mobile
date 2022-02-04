import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import React, { useEffect, useState } from "react"
import { View } from "react-native"
import { Data } from "../../components/Data/Data"
import ResourceCard from "../../screens/ResourcesScreen/ResourceCard"
import HomeCarousel from "../Carousel/HomeCarousel"

const ResourceCarousel = () => {
  const navigation = useNavigation<StackNavigationProp<any, any>>()
  const [resources, setResources] = useState<any[]>([])

  const loadResources = async () => {
    try {
      const resources = await Data.loadResources(null)

      setResources(resources.data?.groupByType?.items ?? [])
    } catch (err: any) {
      setResources(err?.data?.groupByType?.items ?? [])
      console.error({ err })
    }
  }

  useEffect(() => {
    loadResources()
  }, [])
  const renderItem = (item: any, width: number) => {
    if (width)
      return (
        <View style={{ width: width }}>
          <ResourceCard item={item} />
        </View>
      )
    return <></>
  }
  return (
    <HomeCarousel
      seeAllButton={() => navigation.push("ResourcesScreen")}
      renderItem={renderItem}
      title={"Resources"}
      data={resources?.slice(0, 10)}
    />
  )
}

export default ResourceCarousel
