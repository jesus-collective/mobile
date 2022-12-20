import React from "react"
import { isMobileOnly } from "react-device-detect"
import { StyleSheet, Text, View } from "react-native"
import GenericButton from "../../components/GenericButton/GenericButton"
import { MyAccountContext } from "./MyAccountContext"
import { MyAccountActionType } from "./MyAccountTypes"
const MyAccountMenuItems = ["Overview", "Invoices", "Notification Settings"]
export const getPageTitle = (page: string) => {
  switch (page) {
    case "Overview":
      return "Manage Your Account"
    case "Invoices":
      return "Account & Invoices"
    case "Notification Settings":
      return "Notification Settings"
    case "Your Organization":
      return "Your Organization"
    default:
      return "Manage Your Account"
  }
}
export default function MyAccountMenu() {
  const { state, dispatch } = React.useContext(MyAccountContext)
  const onPress = (newPage: string) => {
    dispatch({
      type: MyAccountActionType.SET_PAGE,
      payload: {
        currentPage: newPage,
        pageTitle: getPageTitle(newPage),
      },
    })
  }
  return (
    <View style={[DetailsCard.Container, isMobileOnly ? { margin: 12 } : {}]}>
      <View style={DetailsCard.MainHeaderContainer}>
        <Text style={DetailsCard.HeaderText}>Browse</Text>
      </View>
      <View>
        {MyAccountMenuItems.map((item) => {
          const isTabActive = state.currentPage === item
          return (
            <GenericButton
              key={item}
              label={item}
              action={() => onPress(item)}
              style={{
                ButtonStyle: [DetailsCard.Item, isTabActive ? { backgroundColor: "#E4E1E1" } : {}],
                LabelStyle: [
                  DetailsCard.ItemText,
                  isTabActive ? { color: "#483938", fontFamily: "Graphik-Medium-App" } : {},
                ],
              }}
            />
          )
        })}
      </View>
    </View>
  )
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
  MainHeaderContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 16,
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
    paddingTop: 0,
    paddingBottom: 32,
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  ContentContainer: {
    paddingTop: 16,
    paddingBottom: 32,
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  Item: {
    padding: 16,
    flex: 1,
    flexDirection: "row",
  },
  ItemText: {
    color: "#1A0706",
    fontSize: 15,
    fontFamily: "Graphik-Regular-App",
    flex: 1,
    lineHeight: 24,
  },
})
