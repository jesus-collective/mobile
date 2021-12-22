import React, { createRef, useEffect, useState } from "react"
import { isMobileOnly } from "react-device-detect"
import { FlatList, Image, Text, TouchableOpacity, useWindowDimensions, View } from "react-native"

type Props = {
  data: any
  title: string
  renderItem: (item: any, width: number) => JSX.Element
  seeAllButton?: () => void
}
export default function HomeCarousel(props: Props) {
  const { title, data, renderItem, seeAllButton } = props
  const listRef = createRef<FlatList>()
  const [page, setPage] = useState(0)
  const scrollForward = (index: number) => {
    if (index < data.length - 1) setPage((prev) => prev + 1)
    else setPage(index)
  }
  const scrollBackward = (index: number) => {
    if (index >= 1) setPage((prev) => prev - 1)
    else setPage(0)
  }
  const { width } = useWindowDimensions()
  const [carouselScreenWidth, setCarouselScreenWidth] = useState(0)
  useEffect(() => {
    const carouselAndDividerWidth = carouselScreenWidth + 65
    if (listRef.current)
      listRef.current.scrollToOffset({
        animated: true,
        offset: page * carouselAndDividerWidth,
      })
  }, [page])
  const cardWidth = isMobileOnly
    ? carouselScreenWidth
    : width < 875
    ? carouselScreenWidth / 2
    : carouselScreenWidth / 3

  return (
    <>
      <View
        style={
          isMobileOnly
            ? { marginTop: 0, marginBottom: 0, flexDirection: "row" }
            : { marginTop: 80, marginBottom: 24, flexDirection: "row" }
        }
      >
        <Text
          style={
            isMobileOnly
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
                }
          }
        >
          {title}
        </Text>
        {seeAllButton && data?.length ? (
          <TouchableOpacity style={{ justifyContent: "center" }} onPress={seeAllButton}>
            <Text
              style={{
                fontFamily: "Graphik-Medium-App",
                color: "#6A5E5D",
                fontSize: 12,
                lineHeight: 16,
                letterSpacing: 1,
                textTransform: "uppercase",
              }}
            >
              SEE ALL
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
      {data?.length ? (
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: -32,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={() => scrollBackward(page)}>
            <Image
              style={{ width: 16, height: 14 }}
              source={require("../../assets/Facelift/Arrow-Left.png")}
            ></Image>
          </TouchableOpacity>
          <FlatList<JSX.Element>
            ref={listRef}
            data={data}
            pagingEnabled
            getItemLayout={(data, index) => {
              return {
                length: carouselScreenWidth / 3,
                offset: (carouselScreenWidth / 3 - 32) * index,
                index,
              }
            }}
            ItemSeparatorComponent={() => <View style={{ width: 32 }} />}
            showsHorizontalScrollIndicator={false}
            horizontal
            onLayout={(e) => setCarouselScreenWidth(e.nativeEvent.layout.width - 65)}
            style={{ flex: 1, margin: 16, minHeight: 308 }}
            contentContainerStyle={{ width: "84.444vw" }}
            renderItem={({ item }) => renderItem(item, cardWidth)}
          />
          <TouchableOpacity onPress={() => scrollForward(page)}>
            <Image
              style={{ width: 16, height: 14 }}
              source={require("../../assets/Facelift/Arrow-Right.png")}
            ></Image>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ height: 60 }}>
          <Text
            style={{
              fontSize: isMobileOnly ? 14 : 15,
              fontFamily: "Graphik-Regular-App",
              fontWeight: "400",
              lineHeight: 24,
              paddingBottom: 16,
              paddingTop: 4,
              color: "#6A5E5D",
            }}
          >
            No <Text style={{ textTransform: "lowercase" }}>{title}</Text> found
          </Text>
        </View>
      )}
    </>
  )
}
