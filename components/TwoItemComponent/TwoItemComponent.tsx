import React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { FlatList } from "react-native-gesture-handler"
import { Group } from "src/API"
import EventCard from "../../screens/EventsScreen/EventCard"
import GroupCard from "../../screens/GroupsScreen/GroupCard"
import LastListItem from "../LastListItem/LastListItem"

export enum CarouselType {
  Event = "event",
  Group = "group",
  Resource = "resouce",
  People = "people",
}
type Props = {
  title: string
  showMore?: () => void
  data: Group[]
  type: CarouselType
  updateEvents: (action: string, id: string) => Promise<void>
  joinedGroups?: string[]
  ownedGroups?: string[]
}

const style = StyleSheet.create({
  Container: {
    backgroundColor: "#fff",
    minHeight: 344,
  },
  HeaderText: {
    textTransform: "uppercase",
    fontSize: 12,
    lineHeight: 12,
    color: "#483938",
    letterSpacing: 1,
    fontFamily: "Graphik-Medium-App",
  },
  NoItemsText: {
    fontSize: 15,
    fontFamily: "Graphik-Regular-App",
    fontWeight: "400",
    lineHeight: 24,
    paddingTop: 2,
    color: "#6A5E5D",
  },
})
export default function TwoItemComponent(props: Props) {
  const { title, showMore, data, type, updateEvents, joinedGroups, ownedGroups } = props
  return (
    <View style={style.Container}>
      <View
        style={{
          paddingBottom: 8,
          borderBottomWidth: 1,
          borderBottomColor: "#D1CDCD",
          flexDirection: "row",
        }}
      >
        <Text style={[style.HeaderText, { flex: 1 }]}>{title}</Text>
        {showMore ? (
          <TouchableOpacity onPress={showMore}>
            <Text style={style.HeaderText}>SEE ALL</Text>
          </TouchableOpacity>
        ) : null}
      </View>
      <FlatList
        data={data.slice(0, 2)}
        ListEmptyComponent={() => <Text style={style.NoItemsText}>No {type}s</Text>}
        columnWrapperStyle={{ gap: 32 } as any} // can this be used?
        contentContainerStyle={{
          paddingTop: 16,
          paddingBottom: 52,
          justifyContent: "space-between",
        }}
        numColumns={2}
        keyExtractor={({ item }) => item?.id}
        renderItem={({ item, index }) => {
          switch (type) {
            case CarouselType.Event:
              return (
                <LastListItem listLength={data.length} index={index}>
                  <EventCard
                    item={item}
                    updateEvents={updateEvents}
                    isOwner={Boolean(ownedGroups?.find((a) => a === item?.id))}
                    joined={Boolean(joinedGroups?.find((a) => a === item?.id))}
                  />
                </LastListItem>
              )
            case CarouselType.Group:
              return (
                <LastListItem listLength={data.length} index={index}>
                  <GroupCard item={item} />
                </LastListItem>
              )
            default:
              return null
          }
        }}
      />
    </View>
  )
}
