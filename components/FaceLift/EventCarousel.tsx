import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import React from "react"
import { View } from "react-native"
import EventCard from "../../screens/EventsScreen/EventCard"
import { useFetchEvents } from "../../screens/EventsScreen/useFetchEvents"
import { useMyGroups } from "../../screens/EventsScreen/useMyGroups"
import HomeCarousel from "./HomeCarousel"

const EventCarousel = () => {
  const navigation = useNavigation<StackNavigationProp<any, any>>()
  const { events, updateEvents, joinedGroups } = useFetchEvents({ reverse: false, loadAll: true })
  const { ownedGroups } = useMyGroups(events)
  const renderItem = (item: any, width: number) => {
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
  }
  return (
    <HomeCarousel
      seeAllButton={() => navigation.navigate("EventsScreen")}
      title={"Events"}
      renderItem={renderItem}
      data={events.slice(0, 10)}
    />
  )
}

export default EventCarousel
