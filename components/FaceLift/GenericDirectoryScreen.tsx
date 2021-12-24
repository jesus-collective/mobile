import { StackNavigationProp } from "@react-navigation/stack"
import React from "react"
import { BrowserView, MobileOnlyView } from "react-device-detect"
import { StyleSheet, Text, View } from "react-native"

interface Props {
  navigation: StackNavigationProp<any, any>
  route: any
  pageTitle: string
  ControlButtons: () => JSX.Element
  MainContent: (filter: any, reverse: boolean) => JSX.Element
  reverseContent?: boolean
  oneColumn?: boolean
  Widgets: () => JSX.Element
}

export default function GenericDirectoryScreen(props: Props) {
  const { pageTitle, Widgets, ControlButtons, MainContent, oneColumn, reverseContent } = props

  return (
    <>
      <BrowserView>
        <View style={style.TopContainer}>
          <Text style={style.PageTitle}>{pageTitle}</Text>
          <View style={style.HorizontalLine} />
          <ControlButtons />
          <View style={style.MainContainer}>
            <View
              style={[
                style.ContentContainer,
                reverseContent ? { flexDirection: "row-reverse" } : {},
              ]}
            >
              <View style={[style.MainContent, oneColumn ? { flex: 1 } : {}]}>
                <MainContent />
              </View>
              {!oneColumn ? (
                <View style={[style.MinorContent, oneColumn ? { flex: 0 } : {}]}>
                  <Widgets />
                </View>
              ) : null}
            </View>
          </View>
        </View>
      </BrowserView>
      <MobileOnlyView style={{ overflow: "scroll" }}>
        <MainContent />
      </MobileOnlyView>
    </>
  )
}
const style = StyleSheet.create({
  TopContainer: {
    marginHorizontal: "7.778vw",
    paddingBottom: 120,
  },
  MainContainer: {
    flexDirection: "column",
  },
  ContentContainer: {
    flexDirection: "row",
  },
  MinorContent: {
    flex: 0.3,
  },
  MainContent: {
    flex: 0.7,
  },
  PageTitle: {
    marginTop: 160,
    marginBottom: 80,
    fontFamily: "Graphik-Medium-App",
    fontSize: 96,
    lineHeight: 96,
    letterSpacing: -0.5,
    color: "#483938",
  },
  HorizontalLine: {
    borderBottomColor: "#E4E1E1",
    borderBottomWidth: 1,
    marginBottom: 24,
  },
})
