import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import React from "react"
import { View } from "react-native"
import EventCard from "../../screens/EventsScreen/EventCard"
import { useFetchEvents } from "../../screens/EventsScreen/useFetchEvents"
import HomeCarousel from "./HomeCarousel"

const EventCarousel = () => {
  const navigation = useNavigation<StackNavigationProp<any, any>>()
  const { events, updateEvents, joinedGroups, isLoading, ownedGroups } = useFetchEvents({
    reverse: false,
    loadAll: true,
  })
  const renderItem = (item: any, width: number) => {
    if (width)
      return (
        <View style={{ width: width }}>
          <EventCard
            item={item}
            updateEvents={updateEvents}
            isOwner={Boolean(ownedGroups?.find((a) => a === item?.id))}
            joined={Boolean(joinedGroups?.find((a) => a === item?.id))}
          />
        </View>
      )
    return <></>
  }
  return (
    <HomeCarousel
      isLoading={isLoading}
      seeAllButton={() => navigation.push("EventsScreen")}
      title={"Events"}
      renderItem={renderItem}
      data={events.slice(0, 10)}
    />
  )
}

export default EventCarousel
