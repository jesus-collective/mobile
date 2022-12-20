import { Auth } from "aws-amplify"
import React, { useContext, useEffect } from "react"
import { BrowserView, MobileOnlyView } from "react-device-detect"
import { StyleSheet, Text, View } from "react-native"
import { Data } from "../../components/Data/Data"
import { JCCognitoUser } from "../../src/types"
import { MyAccountContext } from "./MyAccountContext"
import MyAccountInvoices from "./MyAccountInvoices/MyAccountInvoices"
import MyAccountMenu from "./MyAccountMenu"
import MyAccountNotificationSettings from "./MyAccountNotificationSettings/MyAccountNotificationSettings"
import MyAccountOrganization from "./MyAccountOrganization/MyAccountOrganization"
import MyAccountOverview from "./MyAccountOverview/MyAccountOverview"
import { MyAccountActionType, MyAccountPage } from "./MyAccountTypes"
export default function MyAccount() {
  const { state, dispatch } = useContext(MyAccountContext)
  useEffect(() => {
    console.log("MyAccount useEffect")
    const getUser = async () => {
      const user = (await Auth.currentAuthenticatedUser()) as JCCognitoUser
      const userId = user.username
      const getUser = await Data.getUser(userId)
      dispatch({
        type: MyAccountActionType.SET_USER,
        payload: {
          user: getUser.data?.getUser,
        },
      })
    }
    getUser()
  }, [dispatch])
  console.log({ state })
  return (
    <>
      <BrowserView>
        <View style={style.TopContainer}>
          <Text style={style.PageTitle}>{state.pageTitle}</Text>
          <View style={style.MainContainer}>
            <View style={style.ContentContainer}>
              <View style={style.MinorContent}>
                <MyAccountMenu />
              </View>
              <View style={style.MainContent}>
                <CurrentPage
                  currentPage={state.currentPage ?? MyAccountPage.Overview}
                ></CurrentPage>
              </View>
            </View>
          </View>
        </View>
      </BrowserView>
      <MobileOnlyView style={{ overflow: "scroll" }}>
        <MyAccountMenu />
        <CurrentPage currentPage={state.currentPage ?? MyAccountPage.Overview}></CurrentPage>
      </MobileOnlyView>
    </>
  )
}

const CurrentPage = ({ currentPage }: { currentPage?: MyAccountPage }) => {
  switch (currentPage) {
    case "Overview":
      return <MyAccountOverview />
    case "Invoices":
      return <MyAccountInvoices />
    case "Notification Settings":
      return <MyAccountNotificationSettings />
    case "Your Organization":
      return <MyAccountOrganization />
    default:
      return <MyAccountOverview />
  }
}

const style = StyleSheet.create({
  TopContainer: {
    marginHorizontal: "7.778vw",
    paddingBottom: 120,
  },
  MainContainer: {
    flexDirection: "column",
    zIndex: 0,
  },
  ContentContainer: {
    flexDirection: "row",
  },
  MinorContent: {
    flex: 0.3,
  },
  MainContent: {
    flex: 0.7,
    marginLeft: 65,
  },
  PageTitle: {
    marginTop: 160,
    marginBottom: 120,
    fontFamily: "Graphik-Medium-App",
    fontSize: 96,
    lineHeight: 96,
    letterSpacing: -0.5,
    color: "#483938",
  },
})
