import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import React from "react"
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableHighlight,
  useWindowDimensions,
  View,
} from "react-native"
import { ResourceEpisode } from "src/API"

export default function SearchBarSearchItemResourceEpisode({
  item,
  isFirst,
  isLast,
  clearData,
}: {
  item: ResourceEpisode
  isFirst: boolean
  isLast: boolean
  clearData: () => void
}) {
  const navigation = useNavigation<StackNavigationProp<any, any>>()
  const navigateToProfile = (event: GestureResponderEvent) => {
    event.stopPropagation()
    clearData()
    navigation.navigate("ProfileScreen", { id: item.id })
  }
  const { width } = useWindowDimensions()
  const ContainerStyle =
    isLast && isFirst
      ? [
          SearchBarItemStyle.Container,
          SearchBarItemStyle.isLast,
          width < 1000
            ? { borderTopRightRadius: 0, borderTopLeftRadius: 0, borderTopWidth: 1 }
            : {},
        ]
      : isLast
      ? [SearchBarItemStyle.Container, SearchBarItemStyle.isLast]
      : isFirst
      ? [
          SearchBarItemStyle.Container,
          width < 1000
            ? { borderTopRightRadius: 0, borderTopLeftRadius: 0, borderTopWidth: 1 }
            : {},
        ]
      : SearchBarItemStyle.Container
  return (
    <TouchableHighlight
      underlayColor="transparent"
      onPress={navigateToProfile}
      style={SearchBarItemStyle.TouchableContainer}
    >
      <View style={ContainerStyle}>
        <View style={SearchBarItemStyle.TextContainer}>
          <Text style={SearchBarItemStyle.TextName}>{item.title}</Text>

          <Text style={SearchBarItemStyle.TextLocation}>{item.description}</Text>
        </View>
      </View>
    </TouchableHighlight>
  )
}

const SearchBarItemStyle = StyleSheet.create({
  TouchableContainer: {
    zIndex: 10000,
  },
  isLast: { borderBottomWidth: 0 },
  Container: {
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderColor: "#E4E1E1",
    flexDirection: "row",
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  TextContainer: {
    flexDirection: "column",
    flex: 1,
    marginLeft: 16,
    justifyContent: "center",
    display: "flex",
  },
  TextName: {
    lineHeight: 18,
    color: "#483938",
    fontFamily: "Graphik-Regular-App",
    fontSize: 12,
  },
  TextLocation: {
    marginTop: 2,
    lineHeight: 18,
    color: "#6a5e5d",
    fontSize: 12,
    fontFamily: "Graphik-Regular-App",
  },
})
