import React from "react"
import { StyleSheet, View } from "react-native"

interface Props {
  ToggleBarComponent: () => JSX.Element | null
  MinorContentComponent: () => JSX.Element | null
  MainContentComponent: () => JSX.Element | null
  reverseContent?: boolean
  oneColumn?: boolean
}

export default function GenericContainer(props: Props) {
  const {
    MinorContentComponent,
    MainContentComponent,
    ToggleBarComponent,
    reverseContent,
    oneColumn,
  } = props
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
    <View style={style.MainContainer}>
      <ToggleBarComponent />
      <View style={style.ContentContainer}>
        {!oneColumn ? (
          <View style={style.MinorContent}>
            <MinorContentComponent />
          </View>
        ) : null}
        <View style={style.MainContent}>
          <MainContentComponent />
        </View>
      </View>
    </View>
  )
}
