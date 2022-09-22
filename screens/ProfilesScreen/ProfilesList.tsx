import React, { useEffect, useState } from "react"
import { isMobile, isMobileOnly } from "react-device-detect"
import { ActivityIndicator, FlatList, Text, View } from "react-native"
import { Data, UserGroupType } from "../../components/Data/Data"
import GenericButton from "../../components/GenericButton/GenericButton"
import { GenericButtonStyles } from "../../components/GenericButton/GenericButtonStyles"
import LastListItem from "../../components/LastListItem/LastListItem"
import ProfileCard from "./ProfileCard"

type Props = {
  filter: any
  reverse: any
}
export default function ProfilesList(props: Props) {
  const { reverse, filter } = props
  const [data, setData] = useState<Array<any>>([])
  const [isLoading, setIsLoading] = useState(true)
  const [nextToken, setNextToken] = useState<string | null>(null)
  const loadProfiles = async (next: string | undefined | null = null) => {
    const userGroup = UserGroupType.Partners
    const listUsers = await Data.listUsersForProfile(userGroup, next)
    setData((prev) =>
      [...prev, ...(listUsers?.data?.listUsers?.items ?? [])].sort((userA, userB) =>
        userA?.family_name?.toLowerCase()?.localeCompare(userB?.family_name?.toLowerCase())
      )
    )
    setNextToken(listUsers.data?.listUsers?.nextToken ?? "")
    setIsLoading(false)
  }
  useEffect(() => {
    loadProfiles()
  }, [])
  const centerOffset = isMobile ? 0 : -32
  return (
    <FlatList
      style={{ minHeight: 300, marginRight: 0 }} // prevents UI shifting on desktop, 2 rows of 292 + footer height
      ListFooterComponent={() => (
        <View
          style={{
            marginLeft: centerOffset,
            marginBottom: 30,
            marginTop: 30,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <GenericButton
            style={{
              ButtonStyle: GenericButtonStyles.SecondaryButtonStyle,
              LabelStyle: GenericButtonStyles.SecondaryLabelStyle,
            }}
            label="Load More"
            action={() => loadProfiles(nextToken)}
          />
        </View>
      )}
      ListHeaderComponent={() =>
        isLoading ? (
          <ActivityIndicator
            style={{
              marginTop: isMobile ? 32 : 0,
              marginLeft: centerOffset,
              position: "absolute",
              alignSelf: "center",
            }}
            size="large"
            color="#FF4438"
          />
        ) : null
      }
      ListFooterComponentStyle={!nextToken || isLoading ? { display: "none" } : {}}
      ItemSeparatorComponent={() => (isMobileOnly ? null : <View style={{ height: 64 }}></View>)}
      columnWrapperStyle={isMobileOnly ? null : ({ gap: 32 } as any)}
      ListEmptyComponent={() =>
        !isLoading && !data.length ? (
          <Text
            style={{
              fontSize: 15,
              fontFamily: "Graphik-Regular-App",
              fontWeight: "400",
              lineHeight: 24,
              paddingBottom: 2,
              color: "#6A5E5D",
            }}
          >
            No groups found
          </Text>
        ) : null
      }
      data={reverse ? data.reverse() : data}
      numColumns={isMobile ? 1 : 3}
      refreshing={isLoading}
      renderItem={({ item, index }) => {
        return isMobileOnly ? (
          <ProfileCard item={item} />
        ) : (
          <LastListItem listLength={data.length} index={index} isThreeColumn={true}>
            <ProfileCard item={item} />
          </LastListItem>
        )
      }}
    />
  )
}
