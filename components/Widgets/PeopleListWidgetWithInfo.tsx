import { GraphQLResult } from "@aws-amplify/api-graphql"
import Auth from "@aws-amplify/auth"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import React, { useEffect, useState } from "react"
import { isMobileOnly } from "react-device-detect"
import { ActivityIndicator, StyleSheet, Text, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { GetUser2Query } from "src/API-customqueries"
import { Data } from "../../components/Data/Data"
import ProfileImage from "../../components/ProfileImage/ProfileImage"
import ProfileCard from "../../screens/ProfilesScreen/ProfileCard"

export default function PeopleListWidgetWithInfo(props: Props) {
  const { title, emptyMessage, buttonAction, members } = props
  const navigation = useNavigation<StackNavigationProp<any, any>>()
  const [currentUser, setCurrentUser] = useState(null)
  const [data, setData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    const loadItems = async () => {
      const user = await Auth.currentAuthenticatedUser()
      setCurrentUser(user.username)
      setIsLoading(true)
      const items: Promise<GraphQLResult<GetUser2Query>>[] = []
      for await (const member of members) {
        const item = Data.getUserForProfile(member)
        items.push(item)
      }
      const temp = await Promise.all(items)
      const transformedItems = temp.map((a) => a?.data?.getUser)
      setData(transformedItems)
      setIsLoading(false)
    }
    loadItems()
  }, [members])

  return (
    <View key={title} style={Style.CardContainer}>
      <View style={Style.HeaderContainer}>
        <Text style={[Style.HeaderText, { flex: 1 }]}>{title}</Text>
        {buttonAction ? (
          <TouchableOpacity delayPressIn={150} onPress={buttonAction ?? (() => null)}>
            <Text style={Style.HeaderText}>SEE ALL</Text>
          </TouchableOpacity>
        ) : null}
      </View>
      <View style={Style.MembersContainer}>
        {data?.length ? (
          data?.map((item, index) => {
            return isMobileOnly ? (
              <ProfileCard hideBottomBorder={true} item={item}></ProfileCard>
            ) : (
              <TouchableOpacity
                key={item?.id}
                onPress={() => {
                  if (item?.id !== currentUser)
                    navigation.push("ConversationScreen", {
                      initialUserID: item?.id,
                      initialUserName: item?.given_name + " " + item?.family_name,
                    })
                }}
                style={[
                  Style.MemberItemContainer,
                  index === data?.length - 1 ? { borderBottomWidth: 0 } : {},
                ]}
              >
                <ProfileImage
                  size={isMobileOnly ? "small6" : "small5"}
                  user={item.userID ?? item?.id}
                />

                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "center",
                    marginLeft: 16,
                    flex: 1,
                  }}
                >
                  <Text numberOfLines={1} style={Style.NameText}>
                    {item?.given_name + " " + item?.family_name}
                  </Text>
                  <Text numberOfLines={1} style={Style.LocationText}>
                    {item?.location?.geocodeFull}
                  </Text>
                </View>
              </TouchableOpacity>
            )
          })
        ) : isLoading ? (
          <View
            style={{ paddingVertical: 20, justifyContent: "center", alignItems: "center", flex: 1 }}
          >
            <ActivityIndicator size="large" color="#ff4438"></ActivityIndicator>
          </View>
        ) : (
          <Text style={Style.EmptyListText}>{emptyMessage}</Text>
        )}
      </View>
    </View>
  )
}

type Props = {
  title: string
  emptyMessage: string
  buttonAction?: () => void
  members: string[]
}

const Style = StyleSheet.create({
  CardContainer: {
    backgroundColor: isMobileOnly ? "#fff" : "#F6F5F5",
    borderRadius: 8,
    flex: 1,
    width: isMobileOnly ? "100%" : "initial",
    marginBottom: 32,
  },
  HeaderContainer: {
    paddingVertical: 16,
    paddingHorizontal: isMobileOnly ? 0 : 16,
    borderBottomColor: "#E4E1E1",
    borderBottomWidth: 1,
    flexDirection: "row",
  },
  EmptyListText: {
    fontSize: 15,
    fontFamily: "Graphik-Regular-App",
    fontWeight: "400",
    lineHeight: 24,
    paddingBottom: 2,
    color: "#6A5E5D",
  },
  HeaderText: {
    color: "#483938",
    textTransform: "uppercase",
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 1,
    fontFamily: "Graphik-Medium-App",
  },
  NameText: {
    fontFamily: "Graphik-Medium-App",
    fontWeight: "500",
    fontSize: 15,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    color: "#1A0706",
    lineHeight: isMobileOnly ? 16 : 38,
  },
  LocationText: {
    color: "#6A5E5D",
    fontSize: 15,
    flex: 1,
    lineHeight: 20,
    fontFamily: "Graphik-Regular-App",
  },
  MembersContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  MemberItemContainer: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    paddingHorizontal: isMobileOnly ? 0 : 16,
    flex: 1,
    borderColor: "#E4E1E1",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
})
