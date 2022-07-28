import React, { useEffect } from "react"
import { BrowserView, MobileOnlyView } from "react-device-detect"
import { StyleSheet, Text, View } from "react-native"
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated"

interface Props {
  pageTitle: string
  ControlButtons: JSX.Element
  MainContent: JSX.Element
  reverseContent?: boolean
  oneColumn?: boolean
  Widgets?: JSX.Element
}

export default function GenericDirectoryScreen(props: Props) {
  const { pageTitle, Widgets, ControlButtons, MainContent, oneColumn, reverseContent } = props
  const topV = useSharedValue(0)

  useEffect(() => {
    const handleScroll = (e: Event) => {
      if (window.scrollY > 450) {
        topV.value = window.scrollY - 450
      }
    }
    document.addEventListener("scroll", handleScroll)
    return () => {
      document.removeEventListener("scroll", handleScroll)
    }
  }, [])
  const animatedStyle = useAnimatedStyle(() => {
    return {
      marginTop: withSpring(topV.value),
    }
  }, [topV.value])
  return (
    <>
      <BrowserView>
        <View style={style.TopContainer}>
          <Text style={style.PageTitle}>{pageTitle}</Text>
          <View style={style.HorizontalLine} />

          <View style={{ backgroundColor: "#fffdfc", zIndex: 300000 }}>{ControlButtons}</View>

          <View style={style.MainContainer}>
            <View
              style={[
                style.ContentContainer,
                reverseContent ? { flexDirection: "row-reverse" } : {},
              ]}
            >
              <View style={[style.MainContent, !Widgets ? { flex: 1 } : {}]}>{MainContent}</View>

              {Widgets ? (
                <Animated.View style={[animatedStyle, style.MinorContent]}>{Widgets}</Animated.View>
              ) : null}
            </View>
          </View>
        </View>
      </BrowserView>
      <MobileOnlyView style={{ overflow: "scroll" }}>{MainContent}</MobileOnlyView>
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
