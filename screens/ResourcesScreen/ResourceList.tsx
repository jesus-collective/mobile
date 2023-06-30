import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { Auth } from "aws-amplify"
import React, { useEffect, useState } from "react"
import { isMobile, isMobileOnly } from "react-device-detect"
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from "react-native"
import { Group } from "src/API"
import { JCCognitoUser } from "src/types"
import { Data } from "../../components/Data/Data"
import LastListItem from "../../components/LastListItem/LastListItem"
import ResourceCard from "./ResourceCard"

type Props = {
  filter: string
  reverse: boolean
  type: "card" | "list"
}
function ResourceItem({ item }: { item: Group }) {
  const navigation = useNavigation<StackNavigationProp<any, any>>()

  const navigateToResourceScreen = () => {
    navigation.push("ResourceScreen", { id: item.id })
  }

  return (
    <TouchableOpacity delayPressIn={150} onPress={navigateToResourceScreen}>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <Image
          style={{
            margin: 5,
            padding: 0,
            width: 40,
            height: 40,
            borderRadius: 3,
          }}
          source={require("../../assets/svg/pattern.svg")}
        ></Image>
        <View>
          <Text
            style={{
              fontFamily: "Graphik-Regular-App",
              fontStyle: "normal",
              fontWeight: "600",
              fontSize: 16,
              lineHeight: "150%",
              color: "#1D61B8",
            }}
          >
            {item.name}
          </Text>
          <Text
            style={{
              fontFamily: "Graphik-Regular-App",
              fontStyle: "normal",
              fontWeight: 400,
              fontSize: 14,
              lineHeight: "140%",
              color: "#7A8899",
            }}
          >
            {item.description.substring(0, 90)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}
export default function GroupsList(props: Props) {
  const { reverse, filter } = props
  const [data, setData] = useState<Array<any>>([])
  const [currentUser, setCurrentUser] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const isList = props.type == "list"
  const filterResources = (d: any[]) => {
    if (filter === ": Your Resources") {
      return d.filter((a) => a?.owner === currentUser)
    }
    return d
  }
  useEffect(() => {
    const loadUser = async () => {
      try {
        const jcUser: JCCognitoUser = await Auth.currentAuthenticatedUser()
        setCurrentUser(jcUser.username)
      } catch (err) {
        console.error({ err })
      }
    }
    loadUser()
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
        columnWrapperStyle={isMobileOnly ? null : isList ? null : { gap: 32 }}
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
          (!isLoading && !data.length) ||
          (filter &&
            !filterResources(
              data.sort((a, b) =>
                reverse ? b?.name?.localeCompare(a?.name) : a?.name.localeCompare(b?.name)
              )
            ).length) ? (
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
        data={filterResources(
          data.sort((a, b) =>
            reverse ? b?.name?.localeCompare(a?.name) : a?.name.localeCompare(b?.name)
          )
        )}
        numColumns={isMobile ? 1 : isList ? 1 : 2}
        keyExtractor={(item) => item?.id}
        refreshing={isLoading}
        renderItem={({ item, index }) => {
          return isMobileOnly ? (
            <ResourceCard item={item} />
          ) : (
            <LastListItem listLength={data.length} index={index}>
              {isList ? <ResourceItem item={item} /> : <ResourceCard item={item} />}
            </LastListItem>
          )
        }}
      />
    </>
  )
}
