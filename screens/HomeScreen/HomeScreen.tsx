import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import React, { lazy, useLayoutEffect } from "react"
import { BrowserView, isMobileOnly, MobileOnlyView } from "react-device-detect"
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native"
import Cookies from "universal-cookie"
import EventCarousel from "../../components/Carousel/EventCarousel"
import GroupCarousel from "../../components/Carousel/GroupCarousel"
import OrgCarousel from "../../components/Carousel/OrgCarousel"
import PeopleCarousel from "../../components/Carousel/PeopleCarousel"
import ResourceCarousel from "../../components/Carousel/ResourceCarousel"

const cookies = new Cookies()
const MyMap = lazy(() => import("../../components/MyMap/MyMap"))

export default function HomeScreen() {
  const { width } = Dimensions.get("window")
  const navigation = useNavigation<StackNavigationProp<any, any>>()
  useLayoutEffect(() => {
    if (isMobileOnly)
      navigation.setOptions({
        header: () => (
          <View
            style={{
              backgroundColor: "#ffffff",
              flexDirection: "row",
              paddingVertical: 8,
              borderBottomColor: "#E4E1E1",
              borderBottomWidth: 1,
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
            }}
          >
            <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")} style={{}}>
              <Image
                style={{
                  resizeMode: "contain",
                  width: 87,
                  height: 52,
                }}
                source={require(`../../assets/Facelift/svg/JC-Logo.svg`)}
              />
            </TouchableOpacity>
          </View>
        ),
      })
  }, [])
  return (
    <>
      <BrowserView style={{ overflowX: "hidden", overflowY: "scroll" }}>
        <View style={{ marginHorizontal: "7.778vw" }}>
          <EventCarousel />
          <GroupCarousel />
          <ResourceCarousel />
          <PeopleCarousel />
          <OrgCarousel />

          <View style={{ marginBottom: 80 }}>
            <Text
              style={{
                fontFamily: "Graphik-Semibold-App",
                color: "#1A0706",
                fontSize: 32,
                lineHeight: 38,
                letterSpacing: -0.3,
                marginTop: 80,
              }}
            >
              Explore The Map
            </Text>
            <MyMap
              type={"filters"}
              mapData={[]}
              visible={
                cookies.get("showMap")
                  ? cookies.get("showMap") == "true"
                  : Dimensions.get("window").width > 720
              }
            ></MyMap>
          </View>
        </View>
      </BrowserView>

      <MobileOnlyView
        style={{
          overflowX: "hidden",
          overflowY: "scroll",
          paddingTop: 24,
          paddingLeft: 12,
          paddingRight: 12,
        }} // fix margins
      >
        <EventCarousel />
        <GroupCarousel />
        <ResourceCarousel />
        <PeopleCarousel />
        <OrgCarousel />

        <View style={{ marginBottom: 60, marginTop: 48 }}>
          <Text
            style={{
              fontFamily: "Graphik-Medium-App",
              color: "#6A5E5D",
              fontSize: 12,
              lineHeight: 16,
              letterSpacing: 1,
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            Explore The Map
          </Text>
          <View style={{ borderRadius: 8, borderWidth: 1, borderColor: "#E4E1E1" }}>
            <MyMap type={"filters"} mapData={[]} visible={true}></MyMap>
          </View>
        </View>
      </MobileOnlyView>
    </>
  )
}

/* <TouchableOpacity
          style={{
            borderBottomWidth: 2,
            borderTopWidth: 2,
            borderTopColor: "#E4E1E1",
            borderBottomColor: "#E4E1E1",
          }}
          onPress={() => navigation.navigate("EventsScreen")}
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: "700",
              padding: 16,
              backgroundColor: "white",
              color: "black",
            }}
          >
            Events
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ borderBottomWidth: 2, borderBottomColor: "#E4E1E1" }}
          onPress={() => navigation.navigate("GroupsScreen")}
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: "700",
              padding: 16,
              backgroundColor: "white",
              color: "black",
            }}
          >
            Groups
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ borderBottomWidth: 2, borderBottomColor: "#E4E1E1" }}
          onPress={() => navigation.navigate("ProfilesScreen")}
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: "700",
              padding: 16,
              backgroundColor: "white",
              color: "black",
            }}
          >
            People
          </Text>
        </TouchableOpacity> */
