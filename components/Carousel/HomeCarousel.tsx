import React, { createRef, useEffect, useState } from "react"
import { isMobileOnly } from "react-device-detect"
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native"

type Props = {
  data: any
  title: string
  isLoading: boolean
  renderItem: (item: any, width: number) => JSX.Element
  seeAllButton?: () => void
}
export default function HomeCarousel(props: Props) {
  const { title, data, renderItem, seeAllButton } = props
  const numItemsToShow = 9
  const carouselData = data.slice(0, numItemsToShow)
  const listRef = createRef<FlatList>()
  const [page, setPage] = useState(0)
  const { width } = useWindowDimensions()
  const [carouselScreenWidth, setCarouselScreenWidth] = useState(0)
  const cardWidth = isMobileOnly
    ? carouselScreenWidth
    : width < 875
    ? carouselScreenWidth / 2
    : carouselScreenWidth / 3
  const numberOnScreen = carouselScreenWidth / cardWidth
  const maximumPages = Math.ceil(carouselData.length / numberOnScreen)
  const scrollForward = (currentPage: number) => {
    if (currentPage < maximumPages - 1) setPage((prev) => prev + 1)
  }
  const scrollBackward = (currentPage: number) => {
    if (currentPage > 0) setPage((prev) => prev - 1)
    else setPage(0)
  }

  useEffect(() => {
    const carouselAndDividerWidth = carouselScreenWidth + 65
    if (listRef.current)
      listRef.current.scrollToOffset({
        animated: true,
        offset: page * carouselAndDividerWidth,
      })
  }, [page])
  return (
    <>
      <View style={Style.HomeCarouselContainer}>
        <Text style={Style.TitleText}>{title}</Text>
        <TouchableOpacity style={Style.SeeAllButton} onPress={seeAllButton}>
          <Text style={Style.SeeAllText}>SEE ALL</Text>
        </TouchableOpacity>
      </View>
      {carouselData?.length || props.isLoading ? (
        <View style={Style.ContentContainer}>
          {!isMobileOnly && !props.isLoading ? (
            <TouchableOpacity
              disabled={page === 0}
              style={Style.ArrowContainer}
              onPress={() => scrollBackward(page)}
            >
              <Image
                style={[Style.ArrowImage, page === 0 ? { display: "none" } : {}]}
                source={require("../../assets/Facelift/svg/Left-Arrow.svg")}
              ></Image>
            </TouchableOpacity>
          ) : null}
          {props.isLoading ? (
            <>
              <View style={Style.SpinnerContainer}>
                <ActivityIndicator size="large" color="#FF4438" />
              </View>
              <View style={Style.SpinnerContainer}>
                <ActivityIndicator size="large" color="#FF4438" />
              </View>
              <View style={Style.SpinnerContainer}>
                <ActivityIndicator size="large" color="#FF4438" />
              </View>
            </>
          ) : (
            <FlatList<JSX.Element>
              ref={listRef}
              data={carouselData}
              pagingEnabled
              ItemSeparatorComponent={() => <View style={{ width: 32 }} />}
              showsHorizontalScrollIndicator={false}
              horizontal
              onLayout={(e) => {
                setCarouselScreenWidth(e.nativeEvent.layout.width - 65)
                // carousel is scrolled on load, does not show first item at all times.
                // \/ should not be needed. todo: WHY
                if (listRef?.current) listRef.current.scrollToIndex({ animated: false, index: 0 })
              }}
              style={Style.CarouselList}
              contentContainerStyle={Style.CarouselListContent}
              renderItem={({ item }) => renderItem(item, cardWidth)}
            />
          )}
          {!isMobileOnly && !props.isLoading ? (
            <TouchableOpacity
              disabled={page === maximumPages - 1}
              style={Style.ArrowContainer}
              onPress={() => scrollForward(page)}
            >
              <Image
                style={[Style.ArrowImage, page === maximumPages - 1 ? { display: "none" } : {}]}
                source={require("../../assets/Facelift/svg/Right-Arrow.svg")}
              ></Image>
            </TouchableOpacity>
          ) : null}
        </View>
      ) : (
        <View style={{ height: 60 }}>
          <Text style={Style.EmptyCarouselText}>
            No <Text style={{ textTransform: "lowercase" }}>{title}</Text> found
          </Text>
        </View>
      )}
    </>
  )
}

const Style = StyleSheet.create({
  TitleText: isMobileOnly
    ? {
        flex: 1,
        fontFamily: "Graphik-Medium-App",
        color: "#6A5E5D",
        fontSize: 12,
        lineHeight: 16,
        letterSpacing: 1,
        textTransform: "uppercase",
      }
    : {
        justifyContent: "center",
        flex: 1,
        fontFamily: "Graphik-Semibold-App",
        color: "#1A0706",
        fontSize: 32,
        lineHeight: 38,
        letterSpacing: -0.3,
      },
  SeeAllButton: {
    marginRight: isMobileOnly ? 12 : 0,
    justifyContent: "center",
  },
  SeeAllText: {
    fontFamily: "Graphik-Medium-App",
    color: "#6A5E5D",
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  HomeCarouselContainer: isMobileOnly
    ? { marginTop: 0, marginBottom: 0, flexDirection: "row" }
    : { marginTop: 80, marginBottom: 24, flexDirection: "row" },
  EmptyCarouselText: {
    fontSize: isMobileOnly ? 14 : 15,
    fontFamily: "Graphik-Regular-App",
    fontWeight: "400",
    lineHeight: 24,
    paddingBottom: 16,
    paddingTop: 4,
    color: "#6A5E5D",
  },
  CarouselListContent: isMobileOnly ? {} : { width: "84.444vw" },
  ContentContainer: {
    flexDirection: "row",
    marginHorizontal: !isMobileOnly ? -32 : 0,
    justifyContent: "center",
    alignItems: "center",
  },
  CarouselList: isMobileOnly
    ? { flex: 1, marginBottom: 64, marginTop: 16 }
    : { flex: 1, margin: 16 },
  SpinnerContainer: {
    marginTop: 80,
    marginBottom: 80,
    flex: 1,
  },
  ArrowContainer: {
    width: 24,
    height: 24,
  },
  ArrowImage: {
    width: 24,
    height: 24,
  },
})
