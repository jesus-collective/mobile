import { Auth } from "aws-amplify"
import React, { useEffect, useState } from "react"
import { ActivityIndicator, FlatList, Text, View } from "react-native"
import { JCCognitoUser } from "src/types"
import { Data, UserGroupType } from "../../components/Data/Data"
import GenericButton from "../../components/FaceLift/GenericButton"
import { GenericButtonStyles } from "../../components/FaceLift/GenericButtonStyles"
import ProfileCard from "./ProfileCard"

type Props = {
  filter: any
  reverse: any
}
export default function ProfilesList(props: Props) {
  const { reverse, filter } = props
  const [data, setData] = useState<Array<any>>([])
  const [refreshing, setRefreshing] = useState(true)
  const [nextToken, setNextToken] = useState<string | null>(null)
  const [joinedGroups, setJoinedGroups] = useState<Array<any>>([])
  const [isOwnerGroups, setIsOwnerGroups] = useState<Array<any>>([])
  const loadProfiles = async () => {
    const listUsers = await Data.listUsers(UserGroupType.All, null)
    setData(
      listUsers?.data?.listUsers?.items?.sort((userA, userB) => {
        if (reverse && userA?.family_name && userB?.family_name)
          return userA?.family_name?.toLowerCase()?.localeCompare(userB?.family_name?.toLowerCase())
        return 1
      }) ?? []
    )
    setNextToken(listUsers.data?.listUsers?.nextToken ?? "")
    setRefreshing(false)
  }
  useEffect(() => {
    setData([])
    setNextToken(null)
    loadProfiles()
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
          console.log("setting joined data")
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
  return (
    <>
      <FlatList
        style={{ minHeight: 662 }} // prevents UI shifting on desktop, 2 rows of 292 + footer height
        ListFooterComponent={() => (
          <View
            style={{
              marginLeft: -32,
              marginBottom: 30,
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
              action={() => loadProfiles()}
            />
          </View>
        )}
        ListHeaderComponent={() =>
          refreshing ? (
            <ActivityIndicator
              style={{ marginLeft: -32, position: "absolute", alignSelf: "center" }}
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
        numColumns={2}
        refreshing={refreshing}
        renderItem={({ item, index }) => {
          return <ProfileCard item={item} />
        }}
      />
    </>
  )
}
