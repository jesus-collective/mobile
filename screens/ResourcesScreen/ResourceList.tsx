import React, { useEffect, useState } from "react"
import { isMobile, isMobileOnly } from "react-device-detect"
import { ActivityIndicator, FlatList, Text, View } from "react-native"
import { Data } from "../../components/Data/Data"
import LastListItem from "../../components/FaceLift/LastListItem"
import ResourceCard from "./ResourceCard"

type Props = {
  filter: string
  reverse: boolean
}
export default function GroupsList(props: Props) {
  const { reverse, filter } = props
  const [data, setData] = useState<Array<any>>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadResources = async () => {
      console.log("loading")
      let tempArr: any = []
      const loadNext = async (next: string | undefined | null = null) => {
        try {
          const resources = await Data.loadResources(next)
          if (resources?.data?.groupByType?.items?.length) {
            tempArr = [...tempArr, ...resources.data.groupByType.items]
          }
          if (resources?.data?.groupByType?.nextToken)
            await loadNext(resources.data?.groupByType?.nextToken)
          setData(tempArr)
        } catch (err: any) {
          if (err?.data?.groupByType?.items?.length) {
            tempArr = [...tempArr, ...err.data.groupByType.items]
          }
          if (err?.data?.groupByType?.nextToken) await loadNext(err?.data?.groupByType?.nextToken)
          setData(tempArr)
          console.error({ err })
        } finally {
          setIsLoading(false)
        }
      }
      loadNext()
    }
    if (!data.length) loadResources()
  }, [])

  const centerOffset = isMobileOnly ? 0 : -32
  return (
    <>
      <FlatList
        style={isMobileOnly ? { paddingBottom: 16 } : { minHeight: 300, marginRight: 32 }} // prevents UI shifting on desktop, 2 rows of 292 + footer height
        contentContainerStyle={isMobileOnly ? { paddingHorizontal: 12, paddingTop: 16 } : {}}
        ItemSeparatorComponent={() => (isMobileOnly ? null : <View style={{ height: 32 }}></View>)}
        columnWrapperStyle={isMobileOnly ? null : { gap: 32 }}
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
        ListFooterComponentStyle={{ display: "none" }}
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
              No resources found
            </Text>
          ) : null
        }
        data={data.sort((a, b) =>
          reverse ? b?.name?.localeCompare(a?.name) : a?.name.localeCompare(b?.name)
        )}
        numColumns={isMobile ? 1 : 2}
        keyExtractor={(item) => item?.id}
        refreshing={isLoading}
        renderItem={({ item, index }) => {
          return isMobileOnly ? (
            <ResourceCard item={item} />
          ) : (
            <LastListItem listLength={data.length} index={index}>
              <ResourceCard item={item} />
            </LastListItem>
          )
        }}
      />
    </>
  )
}
