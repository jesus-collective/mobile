import React, { useEffect, useState } from "react"
import { ActivityIndicator, StyleSheet, Text, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import ProfileImage from "../../components/ProfileImage/ProfileImage"
import { GetGroupQuery } from "../../src/API"

export default function JCWidget(props: Props) {
  const { title, emptyMessage, loadData, userData, buttonAction } = props
  const [data, setData] = useState<
    Array<any> | NonNullable<NonNullable<GetGroupQuery["getGroup"]>["members"]>["items"]
  >(userData ?? [])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const load = async () => {
      if (loadData) {
        const items = await loadData()
        setData(items)
      }
      setIsLoading(false)
    }
    load()
  }, [])
  return (
    <View key={title} style={UpcomingCardStyle.CardContainer}>
      <View style={UpcomingCardStyle.HeaderContainer}>
        <Text style={[UpcomingCardStyle.HeaderText, { flex: 1 }]}>{title}</Text>
        <TouchableOpacity delayPressIn={150} onPress={buttonAction ?? (() => null)}>
          <Text style={UpcomingCardStyle.HeaderText}>SEE ALL</Text>
        </TouchableOpacity>
      </View>
      <View style={UpcomingCardStyle.MembersContainer}>
        {data?.length ? (
          data?.map((item) => {
            return (
              <View key={item?.id} style={UpcomingCardStyle.MemberItemContainer}>
                <ProfileImage
                  linkToProfile
                  size={userData ? "small6" : "small5"}
                  user={userData ? item?.userID : item.id}
                />
              </View>
            )
          })
        ) : isLoading ? (
          <View style={{ paddingVertical: 40 }}>
            <ActivityIndicator size="large" color="#ff4438"></ActivityIndicator>
          </View>
        ) : (
          <Text style={UpcomingCardStyle.EmptyListText}>{emptyMessage}</Text>
        )}
      </View>
    </View>
  )
}

type Props = {
  title: string
  emptyMessage: string
  loadData?: () => Promise<Array<any>>
  userData?: NonNullable<NonNullable<GetGroupQuery["getGroup"]>["members"]>["items"]
  buttonAction?: () => void
}

const UpcomingCardStyle = StyleSheet.create({
  CardContainer: {
    backgroundColor: "#F6F5F5",
    borderRadius: 8,
    marginBottom: 32,
  },
  HeaderContainer: {
    padding: 16,
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
  MembersContainer: {
    padding: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  MemberItemContainer: {
    marginBottom: 8,
    marginRight: 8,
  },
})
