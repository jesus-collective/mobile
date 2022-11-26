import React from "react"
import { Image, StyleSheet, Text, View } from "react-native"

export default function SearchBarListEmpty({ errorMessage = "Uh oh.. No people found." }) {
  return (
    <View style={SearchBarListEmptyStyle.Container}>
      <Image
        style={SearchBarListEmptyStyle.ImageStyle}
        source={require("../../../assets/undraw_people_search_re_5rre.svg")}
      ></Image>
      <Text style={{ marginTop: 4 }}>{errorMessage}</Text>
    </View>
  )
}

const SearchBarListEmptyStyle = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e4e1e1",
    backgroundColor: "#ffffff",
    flexDirection: "column",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    paddingVertical: 24,
    paddingHorizontal: 8,
  },
  ImageStyle: {
    width: 60,
    height: 60,
  },
})
