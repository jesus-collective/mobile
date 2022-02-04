import React from "react"
import { isMobileOnly } from "react-device-detect"
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native"
import GenericButton from "../../components/GenericButton/GenericButton"
import { GenericButtonStyles } from "../../components/GenericButton/GenericButtonStyles"
import LastListItem from "../../components/LastListItem/LastListItem"
import { WidgetItem, WidgetType } from "../../components/Widgets/JCWidget"
import { Group } from "../../src/API"
import OrganizationCard from "./OrganizationCard"
import { useOrgs } from "./useOrgs"

type Props = {
  filter: string
  reverse: boolean
}
export type JCEvent = Group

const OrgList = StyleSheet.create({
  Container: {
    minHeight: 300,
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
    fontSize: 15,
    paddingLeft: 12,
    fontFamily: "Graphik-Regular-App",
    fontWeight: "400",
    lineHeight: 24,
    paddingBottom: 2,
    color: "#6A5E5D",
  },
})

export default function OrganizationsList(props: Props) {
  const { orgs, isLoading, loadMore, nextToken } = useOrgs()
  const { reverse, filter } = props
  return (
    <FlatList
      ItemSeparatorComponent={() => (isMobileOnly ? null : <View style={{ height: 32 }}></View>)}
      columnWrapperStyle={isMobileOnly ? null : ({ gap: 32 } as any)}
      style={OrgList.Container}
      ListFooterComponentStyle={nextToken && !isLoading ? {} : { display: "none" }}
      ListFooterComponent={() => (
        <View
          style={[
            OrgList.FooterContainer,
            {
              marginLeft: isMobileOnly ? 0 : -32,
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
              marginLeft: isMobileOnly ? 0 : -32,
            }}
            size="large"
            color="#FF4438"
          />
        ) : null
      }
      ListEmptyComponent={() =>
        !isLoading && !orgs.length ? (
          <Text style={OrgList.EmptyText}>No organizations found</Text>
        ) : null
      }
      data={
        reverse
          ? orgs.sort((orgA, orgB) =>
              orgB?.orgName?.toLowerCase()?.localeCompare(orgA?.orgName?.toLowerCase())
            )
          : orgs
      }
      numColumns={isMobileOnly ? 1 : 3}
      refreshing={isLoading}
      renderItem={({ item, index }) => {
        return !isMobileOnly ? (
          <LastListItem listLength={orgs.length} index={index} isThreeColumn={true}>
            <OrganizationCard item={item} />
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
                len={orgs.length - 1}
                item={item}
                index={index}
                widgetType={WidgetType.Org}
              />
            </View>
          </View>
        )
      }}
    />
  )
}
