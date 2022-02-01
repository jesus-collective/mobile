import React from "react"
import { isMobileOnly } from "react-device-detect"
import { StyleSheet, Text, View } from "react-native"

export default function ProfileDetailsWidget(props: Props) {
  const { title, data } = props
  return (
    <View key={title} style={DetailsCard.Container}>
      <View style={DetailsCard.MainHeaderContainer}>
        <Text style={DetailsCard.HeaderText}>{title}</Text>
      </View>
      <View style={isMobileOnly ? {} : { padding: 16 }}>
        <View style={DetailsCard.MainContentContainer}>
          <View style={DetailsCard.Item}>
            <Text style={DetailsCard.ItemText}>{data?.aboutMeShort ?? data?.aboutMeLong}</Text>
          </View>
        </View>
        {data?.currentScope ? (
          <>
            <View style={DetailsCard.HeaderContainer}>
              <Text style={DetailsCard.HeaderText}>CURRENT SCOPE</Text>
            </View>
            <View style={DetailsCard.ContentContainer}>
              <View style={DetailsCard.Item}>
                <Text style={DetailsCard.ItemText}>{data?.currentScope}</Text>
              </View>
            </View>
          </>
        ) : null}
        {data?.interests?.length ? (
          <>
            <View style={DetailsCard.HeaderContainer}>
              <Text style={DetailsCard.HeaderText}>INTERESTS</Text>
            </View>
            <View style={DetailsCard.ContentContainer}>
              {data?.interests?.map((interest: string) => (
                <View key={interest} style={DetailsCard.Item}>
                  <Text style={DetailsCard.ItemText}>{interest}</Text>
                </View>
              ))}
            </View>
          </>
        ) : null}
        {data?.personality ? (
          <>
            <View style={DetailsCard.HeaderContainer}>
              <Text style={DetailsCard.HeaderText}>PERSONALITY TYPE INDICATOR</Text>
            </View>
            <View style={DetailsCard.ContentContainer}>
              <View style={DetailsCard.Item}>
                <Text style={DetailsCard.ItemText}>{data?.personality}</Text>
              </View>
            </View>
          </>
        ) : null}
      </View>
    </View>
  )
}

type Props = {
  title: string
  data: any
}

const DetailsCard = StyleSheet.create({
  Container: {
    backgroundColor: isMobileOnly ? "unset" : "#F6F5F5",
    borderRadius: 8,
    marginBottom: isMobileOnly ? 0 : 32,
  },
  HiddenHeading: {
    borderWidth: 1,
    borderColor: "#E4E1E1",
    borderRadius: 8,
  },
  MainHeaderContainer: {
    paddingHorizontal: isMobileOnly ? 0 : 16,
    paddingBottom: isMobileOnly ? 8 : 16,
    paddingTop: isMobileOnly ? 0 : 16,
    borderBottomColor: "#E4E1E1",
    borderBottomWidth: 1,
    flexDirection: "row",
  },
  HeaderContainer: {
    paddingBottom: 8,
    borderBottomColor: "#E4E1E1",
    borderBottomWidth: 1,
    flexDirection: "row",
  },
  HeaderText: {
    flex: 1,
    textTransform: "uppercase",
    fontSize: 12,
    lineHeight: 16,
    color: "#483938",
    letterSpacing: 1,
    fontFamily: "Graphik-Medium-App",
  },
  MainContentContainer: {
    paddingTop: isMobileOnly ? 16 : 0,
    paddingBottom: isMobileOnly ? 48 : 32,
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  ContentContainer: {
    paddingTop: 16,
    paddingBottom: isMobileOnly ? 48 : 32,
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  Item: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 4,
  },
  ItemText: {
    color: "#1A0706",
    fontSize: isMobileOnly ? 16 : 15,
    fontFamily: "Graphik-Regular-App",
    lineHeight: 24,
  },
  ItemIcon: {
    height: 24,
    width: 24,
    marginRight: 18,
  },
})
