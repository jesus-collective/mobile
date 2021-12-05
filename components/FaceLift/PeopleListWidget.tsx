import React, { useEffect, useState } from "react"
import { ActivityIndicator, StyleSheet, Text, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import ProfileImage from "../../components/ProfileImage/ProfileImage"

const UpcomingCardStyle = StyleSheet.create({
  CardContainer: {
    backgroundColor: "#F6F5F5",
    borderRadius: 8,
    marginBottom: 32,
  },
})

type Props = {
  title: string
  emptyMessage: string
  loadData: () => Promise<Array<any>>
}
export default function JCWidget(props: Props) {
  const { title, emptyMessage, loadData } = props
  const [data, setData] = useState<Array<any>>([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const load = async () => {
      const items = await loadData()
      setData(items)
      setIsLoading(false)
    }
    load()
  }, [])
  return (
    <View key={title} style={UpcomingCardStyle.CardContainer}>
      <View
        style={{
          padding: 16,
          borderBottomColor: "#E4E1E1",
          borderBottomWidth: 1,
          flexDirection: "row",
        }}
      >
        <Text
          style={{
            flex: 1,
            textTransform: "uppercase",
            fontSize: 12,
            lineHeight: 16,
            color: "#483938",
            letterSpacing: 1,
            fontFamily: "Graphik-Regular-App",
          }}
        >
          {title}
        </Text>
        <TouchableOpacity>
          <Text
            style={{
              color: "#483938",
              textTransform: "uppercase",
              fontSize: 12,
              lineHeight: 16,
              letterSpacing: 1,
              fontFamily: "Graphik-Regular-App",
            }}
          >
            SEE ALL
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          padding: 16,
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "flex-start",
        }}
      >
        {data?.length ? (
          data?.map((item: any, index: number) => {
            return (
              <View style={{ marginBottom: 8, marginRight: 8 }}>
                <ProfileImage linkToProfile size="small5" user={item.id} />
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
