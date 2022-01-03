import { Auth } from "aws-amplify"
import React, { useEffect, useState } from "react"
import { isMobile, isMobileOnly } from "react-device-detect"
import { ActivityIndicator, FlatList, Text, View } from "react-native"
import { JCCognitoUser } from "src/types"
import { Data } from "../../components/Data/Data"
import GenericButton from "../../components/FaceLift/GenericButton"
import { GenericButtonStyles } from "../../components/FaceLift/GenericButtonStyles"
import LastListItem from "../../components/FaceLift/LastListItem"
import GroupCard from "./GroupCard"

type Props = {
  filter: any
  reverse: any
}
export default function GroupsList(props: Props) {
  const { reverse, filter } = props
  const [data, setData] = useState<Array<any>>([])
  const [refreshing, setRefreshing] = useState(true)
  const [nextToken, setNextToken] = useState<string | null>(null)
  const [joinedGroups, setJoinedGroups] = useState<Array<any>>([])
  const [isOwnerGroups, setIsOwnerGroups] = useState<Array<any>>([])
  const loadGroups = async () => {
    const listGroup = await Data.groupByTypeForMyGroups("group", null)
    setData(
      listGroup?.data?.groupByType?.items?.sort((groupA, groupB) => {
        if (reverse && groupA?.name && groupB?.name)
          return groupA?.name?.toLowerCase()?.localeCompare(groupB?.name?.toLowerCase())
        return 1
      }) ?? []
    )
    setNextToken(listGroup.data?.groupByType?.nextToken ?? "")
    setRefreshing(false)
  }
  useEffect(() => {
    setData([])
    setNextToken(null)
    loadGroups()
  }, [reverse])
  useEffect(() => {
    const loadUser = async () => {
      const jcUser: JCCognitoUser = await Auth.currentAuthenticatedUser()
      return jcUser.username
    }
    if (data.length) {
      const loadJoinedData = async () => {
        const user = await loadUser()
        data.forEach((item: any) => {
          const groupMemberByUser = Data.groupMemberByUser(user, item.id)
          groupMemberByUser.then((json) => {
            if ((json.data?.groupMemberByUser?.items?.length ?? 0) > 0) {
              setJoinedGroups((prev) => [...prev, item.id])
            }
          })
        })
      }
      const loadOwnerData = async () => {
        const user = await loadUser()
        data.forEach((item: any) => {
          const getGroup = Data.getGroupForOwner(item.id)
          getGroup.then((json) => {
            if (json.data?.getGroup?.owner === user) {
              setIsOwnerGroups((prev) => [...prev, item.id])
            }
          })
        })
      }
      loadOwnerData()
      loadJoinedData()
    }
  }, [data])
  const centerOffset = isMobileOnly ? 0 : -32
  return (
    <>
      <FlatList
        style={isMobileOnly ? { paddingBottom: 16 } : { minHeight: 300, marginRight: 32 }} // prevents UI shifting on desktop, 2 rows of 292 + footer height
        contentContainerStyle={isMobileOnly ? { paddingHorizontal: 12, paddingTop: 16 } : {}}
        ItemSeparatorComponent={() => (isMobileOnly ? null : <View style={{ height: 32 }}></View>)}
        columnWrapperStyle={isMobileOnly ? null : { gap: 32 }}
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
              action={() => loadGroups()}
            />
          </View>
        )}
        ListHeaderComponent={() =>
          refreshing ? (
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
        ListFooterComponentStyle={
          (data?.length % 4 !== 0 && !nextToken) || !data.length ? { display: "none" } : {}
        }
        ListEmptyComponent={() =>
          !refreshing && !data.length ? (
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
        data={filter ? data.filter((a) => a.id === joinedGroups.find((b) => b === a.id)) : data}
        numColumns={isMobile ? 1 : 2}
        refreshing={refreshing}
        renderItem={({ item, index }) => {
          const isLastAndOdd = data.length - 1 === index && index % 2 === 0
          return isMobileOnly ? (
            <GroupCard item={item} />
          ) : (
            <LastListItem isLastAndOdd={isLastAndOdd}>
              <GroupCard item={item} />
            </LastListItem>
          )
        }}
      />
    </>
  )
}
