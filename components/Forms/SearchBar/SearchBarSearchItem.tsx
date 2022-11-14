import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import React from "react"
import { GestureResponderEvent, StyleSheet, Text, TouchableHighlight, View } from "react-native"
import ProfileImageNew, {
  ProfileImageQuality,
  ProfileImageStyle,
} from "../../../components/ProfileImage/ProfileImageNew"

export default function SearchBarSearchItem({
  item,
  isFirst,
  isLast,
  clearData,
}: {
  item: any
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
  const ContainerStyle =
    isLast && isFirst
      ? [SearchBarItemStyle.Container, SearchBarItemStyle.isLast, SearchBarItemStyle.isFirst]
      : isLast
      ? [SearchBarItemStyle.Container, SearchBarItemStyle.isLast]
      : isFirst
      ? [SearchBarItemStyle.Container, SearchBarItemStyle.isFirst]
      : SearchBarItemStyle.Container
  return (
    <TouchableHighlight
      underlayColor="transparent"
      onPress={navigateToProfile}
      style={SearchBarItemStyle.TouchableContainer}
    >
      <View style={ContainerStyle}>
        <ProfileImageNew
          user={item?.id}
          style={ProfileImageStyle.UserXSmall3}
          type="user"
          quality={ProfileImageQuality.medium}
        />

        <View style={SearchBarItemStyle.TextContainer}>
          <Text style={SearchBarItemStyle.TextName}>
            {item.given_name} {item.family_name}
          </Text>

          <Text style={SearchBarItemStyle.TextLocation}>{item.location?.geocodeFull}</Text>
        </View>
      </View>
    </TouchableHighlight>
  )
}

const SearchBarItemStyle = StyleSheet.create({
  TouchableContainer: {
    zIndex: 10000,
  },
  isFirst: {
    borderTopWidth: 1,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  isLast: {
    borderBottomWidth: 1,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  Container: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#e4e1e1",
    backgroundColor: "#ffffff",
    flexDirection: "row",
    flex: 1,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
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
