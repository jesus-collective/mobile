import React from "react"
import { isMobile, isMobileOnly } from "react-device-detect"
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native"
import GenericButton from "../../components/GenericButton/GenericButton"
import { GenericButtonStyles } from "../../components/GenericButton/GenericButtonStyles"
import LastListItem from "../../components/LastListItem/LastListItem"
import { useMyGroups } from "../../screens/EventsScreen/useMyGroups"
import GroupCard from "./GroupCard"
import { sortByName, useGroups } from "./useGroups"

type Props = {
  filter: string
  reverse: boolean
}

export default function GroupsList(props: Props) {
  const { reverse, filter } = props

  const { groups, isLoading, loadMore, nextToken } = useGroups(filter, reverse)
  const { joinedGroups } = useMyGroups(groups)
  return (
    <>
      <FlatList
        style={style.ListContainer} // prevents UI shifting on desktop, 2 rows of 292 + footer height
        contentContainerStyle={style.ContentContainer}
        ItemSeparatorComponent={() => (isMobileOnly ? null : <View style={{ height: 32 }}></View>)}
        columnWrapperStyle={isMobileOnly ? null : { gap: 32 }}
        ListFooterComponent={() => (
          <View style={style.ListFooterContainer}>
            <GenericButton
              style={{
                ButtonStyle: GenericButtonStyles.SecondaryButtonStyle,
                LabelStyle: GenericButtonStyles.SecondaryLabelStyle,
              }}
              label="Load More"
              action={() => loadMore()}
            />
          </View>
        )}
        ListHeaderComponent={() =>
          isLoading ? (
            <ActivityIndicator style={style.Spinner} size="large" color="#FF4438" />
          ) : null
        }
        ListFooterComponentStyle={!nextToken ? { display: "none" } : {}}
        ListEmptyComponent={() =>
          !isLoading && !groups.length ? (
            <Text style={style.EmptyListText}>No groups found</Text>
          ) : null
        }
        data={
          filter
            ? sortByName(
                groups.filter((a) => a?.id === joinedGroups.find((b) => b === a?.id)),
                reverse
              )
            : sortByName(groups, reverse)
        }
        numColumns={isMobile ? 1 : 2}
        refreshing={isLoading}
        renderItem={({ item, index }) => {
          return isMobileOnly ? (
            <GroupCard item={item} />
          ) : (
            <LastListItem
              listLength={
                filter
                  ? groups.filter((a) => a?.id === joinedGroups.find((b) => b === a?.id)).length
                  : groups.length
              }
              index={index}
            >
              <GroupCard item={item} />
            </LastListItem>
          )
        }}
      />
    </>
  )
}

const style = StyleSheet.create({
  EmptyListText: {
    fontSize: 15,
    fontFamily: "Graphik-Regular-App",
    fontWeight: "400",
    lineHeight: 24,
    paddingBottom: 2,
    color: "#6A5E5D",
  },
  ListFooterContainer: {
    marginBottom: 30,
    marginTop: 30,
    marginLeft: isMobileOnly ? 0 : -32,
    justifyContent: "center",
    alignItems: "center",
  },
  ListContainer: {
    paddingBottom: isMobileOnly ? 16 : 0,
    minHeight: isMobileOnly ? "initial" : 300,
    marginRight: isMobileOnly ? "initial" : 32,
  },
  ContentContainer: {
    paddingHorizontal: isMobileOnly ? 12 : "initial",
    paddingTop: isMobileOnly ? 16 : "initial",
  },
  Spinner: {
    marginTop: isMobileOnly ? 32 : 0,
    marginLeft: isMobileOnly ? 0 : -32,
    position: "absolute",
    alignSelf: "center",
  },
})
