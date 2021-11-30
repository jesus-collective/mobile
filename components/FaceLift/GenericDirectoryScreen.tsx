import { StackNavigationProp } from "@react-navigation/stack"
import React from "react"
import { BrowserView, MobileView } from "react-device-detect"
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
  const { pageTitle, Widgets, ControlButtons, MainContent, navigation, oneColumn, reverseContent } =
    props
  const style = StyleSheet.create({
    MainContainer: {
      flexDirection: "column",
    },
    ContentContainer: {
      flexDirection: reverseContent ? "row-reverse" : "row",
    },
    MinorContent: {
      flex: oneColumn ? 0 : 0.3,
    },
    MainContent: {
      flex: oneColumn ? 1 : 0.7,
    },
  })

  return (
    <>
      <BrowserView>
        <View style={{ marginHorizontal: "7.778vw" }}>
          <Text
            style={{
              marginTop: 160,
              marginBottom: 80,
              fontFamily: "Graphik-Medium-App",
              fontSize: 96,
              lineHeight: 96,
              letterSpacing: -0.5,
              color: "#483938",
            }}
          >
            {pageTitle}
          </Text>

          <View
            style={{
              borderBottomColor: "#E4E1E1",
              borderBottomWidth: 1,
              marginBottom: 24,
            }}
          />
          <ControlButtons />
          <View style={style.MainContainer}>
            <View style={style.ContentContainer}>
              <View style={style.MainContent}>
                <MainContent />
              </View>
              {!oneColumn ? (
                <View style={style.MinorContent}>
                  <Widgets />
                </View>
              ) : null}
            </View>
          </View>
        </View>
      </BrowserView>
      <MobileView>
        <MainContent />
      </MobileView>
    </>
  )
}
