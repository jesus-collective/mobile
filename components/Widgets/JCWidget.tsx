import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import moment from "moment"
import React, { useCallback, useEffect, useState } from "react"
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import ProfileImage from "../../components/ProfileImage/ProfileImage"

const UpcomingCardStyle = StyleSheet.create({
  CardContainer: {
    backgroundColor: "#F6F5F5",
    borderRadius: 8,
  },
})

export enum WidgetType {
  Event = "event",
  Group = "group",
  Resource = "resouce",
  People = "people",
  Org = "org",
}

type Props = {
  title: string
  emptyMessage: string
  loadData: () => Promise<Array<any>>
  widgetType: WidgetType
}

export const WidgetItem = ({
  len,
  widgetType,
  item,
  index,
}: {
  len: number
  widgetType: WidgetType
  item: any
  index: number
}) => {
  const navigation = useNavigation<StackNavigationProp<any, any>>()
  const WidgetTitle = useCallback((item) => {
    switch (widgetType) {
      case WidgetType.Event:
        return item.name
      case WidgetType.Group:
        return item.name
      case WidgetType.Resource:
        return item.name
      case WidgetType.Org:
        return item.orgName
    }
  }, [])

  const WidgetSubtitle = useCallback((item) => {
    switch (widgetType) {
      case WidgetType.Event:
        return moment(item.time).format("hh:mm")
      case WidgetType.Group:
        return item.description
      case WidgetType.Resource:
        return item.description
      case WidgetType.Org:
        return item.aboutMeLong ?? item.aboutMeShort
    }
  }, [])
  const handleAction = () => {
    switch (widgetType) {
      case WidgetType.Group:
        navigation.navigate("GroupScreen", { id: item.id })
        break
      case WidgetType.Event:
        navigation.navigate("EventScreen", { id: item.id })
        break
      case WidgetType.Org:
        navigation.push("OrganizationScreen", { id: item.id })
        break
      case WidgetType.Resource:
        navigation.push("ResourceScreen", { id: item.id })
        break
      default:
      //do nothing
    }
  }
  const WidgetIcon = useCallback((entry) => {
    const { item } = entry
    switch (widgetType) {
      case WidgetType.Event:
        return (
          <View
            style={{
              width: 64,
              height: 64,
              borderRadius: 64,
              backgroundColor: "#FF4438",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 12,
                lineHeight: 12,
                fontFamily: "Graphik-Regular-App",
              }}
            >
              {moment(item.time).format("MMM")}
            </Text>
            <Text
              style={{
                color: "#fff",
                letterSpacing: -0.3,
                textAlign: "center",
                fontSize: 32,
                fontFamily: "Graphik-Semibold-App",
                fontWeight: "600",
                lineHeight: 32,
              }}
            >
              {moment(item.time).format("D")}
            </Text>
          </View>
        )
      case WidgetType.Group:
        return (
          <View
            style={{
              width: 64,
              height: 64,
              borderRadius: 64,
              backgroundColor: "#FF4438",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Image
              style={{ width: 48, height: 48 }}
              source={require("../../assets/Facelift/svg/People-White.svg")}
            ></Image>
          </View>
        )
      case WidgetType.Resource:
        return (
          <Image
            style={{
              width: 53,
              height: 64,
              borderRadius: 100,
              backgroundColor: "white",
            }}
            source={require("../../assets/Facelift/svg/JC-Logo-No-Text.svg")}
          ></Image>
        )
      case WidgetType.People:
        return <></>
      case WidgetType.Org:
        return (
          <View
            style={{
              width: 60,
              height: 60,
              borderWidth: 1,
              borderColor: "#E4E1E1",
              borderRadius: 120,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Image
              style={{
                width: 60,
                height: 60,
                borderWidth: 1,
                borderColor: "#E4E1E1",
                borderRadius: 120,
              }}
              source={require("../../assets/Facelift/svg/JC-Logo-No-Text.svg")}
            ></Image>
          </View>
        )
      default:
        return <></>
    }
  }, [])
  switch (widgetType) {
    case WidgetType.People:
      return (
        <View
          key={item.title}
          style={{
            flexDirection: "row",
          }}
        >
          <ProfileImage size="small2" user={item.id} style="personCard"></ProfileImage>
        </View>
      )
    default:
      return (
        <TouchableOpacity
          key={item.title}
          delayPressIn={150}
          style={{
            flexDirection: "row",
            paddingTop: index === 0 ? 4 : 0,
          }}
          onPress={handleAction}
        >
          <WidgetIcon item={item}></WidgetIcon>
          <View style={{ marginLeft: 16, flex: 1, flexWrap: "wrap" }}>
            <Text
              numberOfLines={3}
              style={{
                fontFamily: "Graphik-Medium-App",
                fontWeight: "400",
                fontSize: 16,
                color: "#1a0706",
                paddingBottom: 2,
              }}
            >
              {WidgetTitle(item)}
            </Text>
            <Text
              numberOfLines={2}
              style={{
                fontSize: 15,
                fontFamily: "Graphik-Regular-App",
                fontWeight: "400",
                lineHeight: 24,
                paddingBottom: 2,
                color: "#6A5E5D",
              }}
            >
              {WidgetSubtitle(item)}
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontFamily: "Graphik-Regular-App",
                fontWeight: "400",
                lineHeight: 24,
                paddingBottom: 2,
                color: "#6A5E5D",
                textTransform: "capitalize",
              }}
            >
              {item.eventType === "location" ? item.location : item.eventType}
            </Text>
          </View>
        </TouchableOpacity>
      )
  }
}

export default function JCWidget(props: Props) {
  const { title, emptyMessage, loadData, widgetType } = props
  const [data, setData] = useState<Array<any>>([])

  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const load = async () => {
      loadData().then((data) => {
        setData(data)
        setIsLoading(false)
      })
    }
    load()
  }, [])

  return (
    <View key={title} style={UpcomingCardStyle.CardContainer}>
      <Text
        style={{
          textTransform: "uppercase",
          fontSize: 12,
          lineHeight: 16,
          letterSpacing: 1,
          fontFamily: "Graphik-Medium-App",
          padding: 16,
          borderBottomColor: "#E4E1E1",
          borderBottomWidth: 1,
          color: "#483938",
        }}
      >
        {title}
      </Text>
      <View style={{ padding: 16 }}>
        {data?.length ? (
          data?.map((item: any, index: number) => {
            return (
              <View key={item?.id} style={index === data.length - 1 ? {} : { marginBottom: 32 }}>
                <WidgetItem
                  len={data.length - 1}
                  widgetType={widgetType}
                  item={item}
                  index={index}
                />
              </View>
            )
          })
        ) : isLoading ? (
          <View style={{ paddingVertical: 40 }}>
            <ActivityIndicator size="large" color="#ff4438"></ActivityIndicator>
          </View>
        ) : (
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
            {emptyMessage}
          </Text>
        )}
      </View>
    </View>
  )
}
