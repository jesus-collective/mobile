import moment from "moment"
import React, { useCallback, useEffect, useState } from "react"
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native"

const UpcomingCardStyle = StyleSheet.create({
  CardContainer: {
    backgroundColor: "#F6F5F5",
    borderRadius: 8,
    marginLeft: 16,
    marginBottom: 32,
  },
})

export enum WidgetType {
  Event = "event",
  Group = "group",
  Resource = "resouce",
}

type Props = {
  title: string
  emptyMessage: string
  loadData: () => Promise<Array<any>>
  widgetType: WidgetType
}
export default function JCWidget(props: Props) {
  const { title, emptyMessage, loadData, widgetType } = props
  const [data, setData] = useState<Array<any>>([])
  const WidgetIcon = useCallback((item) => {
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
                fontFamily: "Graphik-Regular-App",
                fontWeight: "600",
                lineHeight: 32,
              }}
            >
              {moment(item.time).format("DD")}
            </Text>
          </View>
        )
      case WidgetType.Group:
        console.log("It's a group")
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
              source={require("../../assets/Facelift/People.png")}
            ></Image>
          </View>
        )
      case WidgetType.Resource:
        return (
          <View
            style={{
              width: 64,
              height: 64,
              borderRadius: 64,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Image
              style={{ width: 64, height: 64 }}
              source={require("../../assets/Facelift/JC-Logo.png")}
            ></Image>
          </View>
        )
    }
  }, [])
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
          fontFamily: "Graphik-Regular-App",
          padding: 16,
          borderBottomColor: "#E4E1E1",
          borderBottomWidth: 1,
        }}
      >
        {title}
      </Text>
      <View style={{ padding: 16 }}>
        {data?.length ? (
          data?.map((item: any, index: number) => {
            return (
              <View
                key={item.title}
                style={{
                  marginBottom: index !== data.length - 1 ? 32 : 0,
                  flexDirection: "row",
                }}
              >
                <WidgetIcon item={item}></WidgetIcon>
                <View style={{ marginLeft: 16, flex: 1, flexWrap: "wrap" }}>
                  <Text
                    style={{
                      fontFamily: "Graphik-Regular-App",
                      fontWeight: "600",
                      fontSize: 16,
                      color: "#1a0706",
                    }}
                  >
                    {item.description}
                  </Text>
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
                    {moment(item.time).format("hh:mm")}
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
