import React from "react"
import { Image, StyleSheet, Text, View } from "react-native"
import { GetOrganizationQuery } from "../../src/API"

export default function OrgDetailsWidget(props: Props) {
  const { title, data, hideHeading } = props
  return (
    <View key={title} style={[DetailsCard.Container, hideHeading ? DetailsCard.HiddenHeading : {}]}>
      {!hideHeading ? (
        <View style={DetailsCard.HeaderContainer}>
          <Text style={DetailsCard.HeaderText}>{title}</Text>
        </View>
      ) : null}
      <View style={DetailsCard.ContentContainer}>
        <View style={DetailsCard.Item}>
          <Image
            style={DetailsCard.ItemIcon}
            source={require("../../assets/Facelift/svg/Location.svg")}
          />
          <View style={{ flex: 1 }}>
            <Text style={DetailsCard.ItemText}>{data?.address}</Text>
            <Text style={DetailsCard.ItemText}>{data?.location?.geocodeFull}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

type Props = {
  title: string
  data: GetOrganizationQuery["getOrganization"]
  hideHeading?: boolean
}

const DetailsCard = StyleSheet.create({
  Container: {
    backgroundColor: "#F6F5F5",
    borderRadius: 8,
    marginBottom: 32,
  },
  HiddenHeading: {
    borderWidth: 1,
    borderColor: "#E4E1E1",
    borderRadius: 8,
  },
  HeaderContainer: {
    padding: 16,
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
  ContentContainer: {
    padding: 16,
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
    color: "#483938",
    fontSize: 15,
    fontFamily: "Graphik-Regular-App",
    lineHeight: 24,
  },
  ItemIcon: {
    height: 24,
    width: 24,
    marginRight: 18,
  },
})
