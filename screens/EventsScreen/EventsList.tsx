import React from "react"
import { isMobileOnly } from "react-device-detect"
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native"
import GenericButton from "../../components/GenericButton/GenericButton"
import { GenericButtonStyles } from "../../components/GenericButton/GenericButtonStyles"
import LastListItem from "../../components/LastListItem/LastListItem"
import { WidgetItem, WidgetType } from "../../components/Widgets/JCWidget"
import { Group } from "../../src/API"
import EventCard from "./EventCard"
import { useFetchEvents } from "./useFetchEvents"
import { useMyGroups } from "./useMyGroups"

type Props = {
  filter: string
  reverse: boolean
}
export type JCEvent = Group

const EventList = StyleSheet.create({
  Container: {
    minHeight: 300,
    marginRight: isMobileOnly ? 0 : 32,
  },
  FooterContainer: {
    marginBottom: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  Spinner: {
    position: "absolute",
    alignSelf: "center",
  },
  EmptyText: {
    paddingLeft: 12,
    fontSize: 15,
    fontFamily: "Graphik-Regular-App",
    fontWeight: "400",
    lineHeight: 24,
    paddingBottom: 2,
    color: "#6A5E5D",
  },
})

export default function EventsList(props: Props) {
  const { reverse, filter } = props
  const { events, isLoading, nextToken, loadMore, currentUser, updateEvents, joinedGroups } =
    useFetchEvents({
      reverse: reverse ?? false,
    })
  const { ownedGroups } = useMyGroups(events)
  const centerOffset = isMobileOnly ? 0 : -32
  const filteredData = filter
    ? events.filter((a) => a?.id === ownedGroups.find((b) => b === a?.id))
    : events
  return (
    <FlatList
      ItemSeparatorComponent={() => (isMobileOnly ? null : <View style={{ height: 32 }}></View>)}
      columnWrapperStyle={isMobileOnly ? null : ({ gap: 32 } as any)}
      style={EventList.Container}
      ListFooterComponentStyle={nextToken && !isLoading ? {} : { display: "none" }}
      ListFooterComponent={() => (
        <View
          style={[
            EventList.FooterContainer,
            {
              marginLeft: centerOffset,
              marginBottom: 30,
              marginTop: 30,
            },
          ]}
        >
          <GenericButton
            style={{
              ButtonStyle: GenericButtonStyles.SecondaryButtonStyle,
              LabelStyle: GenericButtonStyles.SecondaryLabelStyle,
            }}
            label="Load More"
            action={loadMore}
          />
        </View>
      )}
      ListHeaderComponent={() =>
        isLoading ? (
          <ActivityIndicator
            style={{
              marginTop: isMobileOnly ? 32 : 0,
              marginLeft: centerOffset,
            }}
            size="large"
            color="#FF4438"
          />
        ) : null
      }
      contentContainerStyle={isMobileOnly ? { marginTop: 16 } : {}}
      ListEmptyComponent={() =>
        !isLoading && !filteredData.length ? (
          <Text style={EventList.EmptyText}>No upcoming events</Text>
        ) : null
      }
      data={filteredData}
      numColumns={isMobileOnly ? 1 : 2}
      refreshing={isLoading}
      renderItem={({ item, index }) => {
        return !isMobileOnly ? (
          <LastListItem listLength={filteredData.length} index={index}>
            <EventCard
              key={item.id}
              item={item}
              updateEvents={updateEvents}
              isOwner={Boolean(ownedGroups.find((a) => a === item?.id))}
              joined={Boolean(joinedGroups.find((a) => a === item?.id))}
            />
          </LastListItem>
        ) : (
          <View
            style={{
              padding: 12,
              paddingBottom: 0,
              flex: 1,
            }}
          >
            <View style={{ borderBottomColor: "#E4E1E1", borderBottomWidth: 1, paddingBottom: 12 }}>
              <WidgetItem
                len={filteredData.length - 1}
                item={item}
                index={index}
                widgetType={WidgetType.Event}
              />
            </View>
          </View>
        )
      }}
    />
  )
}
