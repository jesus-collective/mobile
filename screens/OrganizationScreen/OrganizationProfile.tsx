import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { Auth } from "aws-amplify"
import React, { useEffect, useLayoutEffect, useState } from "react"
import { BrowserView, isMobileOnly, MobileOnlyView } from "react-device-detect"
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native"
import { GetOrganizationQuery } from "src/API"
import { Data } from "../../components/Data/Data"
import GenericButton from "../../components/GenericButton/GenericButton"
import { GenericButtonStyles } from "../../components/GenericButton/GenericButtonStyles"
import Header from "../../components/Header/Header"
import { SubHeader } from "../../components/Header/SubHeader"
import { MapData } from "../../components/MyGroups/MyGroups"
import MyMap from "../../components/MyMap/MyMap"
import ProfileImage from "../../components/ProfileImage/ProfileImage"
import OrgDetailsWidget from "../../components/Widgets/OrgDetailsWidget"
import PeopleListWidgetWithInfo from "../../components/Widgets/PeopleListWidgetWithInfo"
import { JCCognitoUser } from "../../src/types"

export const OrgSettings = {
  SETTING_ISVISIBLE_COLLEAGUES_WIDGET: false,
  SETTING_ISVISIBLE_TOGGLEBAR: false,
  SETTING_ISVISIBLE_TOGGLEBAR_ABOUT: true,
  SETTING_ISVISIBLE_TOGGLEBAR_EVENTS: true,
  SETTING_ISVISIBLE_TOGGLEBAR_GROUPS: true,
  SETTING_ISVISIBLE_TOGGLEBAR_RESOURCES: false,
  SETTING_ISVISIBLE_TOGGLEBAR_TEAM: false,
  SETTING_ISVISIBLE_TOGGLEBAR_EDIT_BUTTON: true,
}

const style = StyleSheet.create({
  MainContainer: {
    flexDirection: "column",
    paddingBottom: 68, // 120px - 52px from twoitem carousel
  },
  ContentContainer: {
    flexDirection: "row-reverse",
  },
  MinorContent: {
    flex: 0.3,
  },
  MainContent: {
    marginLeft: 64,
    flex: 0.7,
  },
  TitleText: {
    fontFamily: "Graphik-Semibold-App",
    fontSize: 38,
    letterSpacing: -0.3,
    lineHeight: 38,
    marginBottom: 16,
    textAlign: "center",
    color: "#1A0706",
  },
  DescriptionText: {
    color: "#483938",
    fontFamily: "Graphik-Regular-App",
    fontSize: 15,
    lineHeight: 24,
    textAlign: "center",
  },

  OrganizedByText: {
    fontFamily: "Graphik-Regular-App",
    fontSize: 15,
    lineHeight: 24,
    color: "#6A5E5D",
    textAlign: "center",
    marginRight: 8,
  },
  OrganizedByNameText: {
    marginLeft: 8,
    color: "#1A0706",
    fontFamily: "Graphik-Regular-App",
    fontSize: 15,
  },
  HeadingContainer: {
    marginBottom: 28,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  NoMembersText: {
    fontSize: 15,
    fontFamily: "Graphik-Regular-App",
    fontWeight: "400",
    lineHeight: 24,
    paddingBottom: 2,
    color: "#6A5E5D",
  },
  Spinner: {
    marginTop: 32,
    position: "absolute",
    alignSelf: "center",
  },
})

type Props = {
  route: {
    params: {
      id: string
    }
  }
}
type MapStateData = {
  mapData: MapData[]
  initCenter: any
}
export enum OrgTabType {
  ABOUT = "About",
  TEAM = "Team",
  GROUPS = "Groups",
  RESOURCES = "Resources",
  EVENTS = "Events",
}

export default function OrganizationProfile(props: Props) {
  const navigateToAbout = () => {
    setCurrentTab(OrgTabType.ABOUT)
  }
  const navigateToGroups = () => {
    setCurrentTab(OrgTabType.GROUPS)
  }
  const navigateToEvents = () => {
    setCurrentTab(OrgTabType.EVENTS)
  }
  const navigateToTeam = () => {
    setCurrentTab(OrgTabType.TEAM)
  }
  const navigateToResources = () => {
    setCurrentTab(OrgTabType.RESOURCES)
  }
  const subNavItems = [
    {
      title: "About",
      hide: !OrgSettings.SETTING_ISVISIBLE_TOGGLEBAR_ABOUT,
      action: navigateToAbout,
    },
    {
      title: "Groups",
      hide: !OrgSettings.SETTING_ISVISIBLE_TOGGLEBAR_GROUPS,
      action: navigateToGroups,
    },
    {
      title: "Events",
      hide: !OrgSettings.SETTING_ISVISIBLE_TOGGLEBAR_EVENTS,
      action: navigateToEvents,
    },
    {
      title: "Resources",
      hide: !OrgSettings.SETTING_ISVISIBLE_TOGGLEBAR_RESOURCES,
      action: navigateToResources,
    },
    {
      title: "Team",
      hide: !OrgSettings.SETTING_ISVISIBLE_TOGGLEBAR_TEAM,
      action: navigateToTeam,
    },
  ]
  const navigation = useNavigation<any>()
  const { id } = props.route.params
  const [orgData, setOrgData] = useState<GetOrganizationQuery["getOrganization"]>(null)
  const [currentTab, setCurrentTab] = useState(OrgTabType.ABOUT)
  const [mapData, setMapData] = useState<MapStateData>({
    initCenter: {
      lat: 44,
      lng: -78.0,
    },
    mapData: [],
  })
  const [currentUser, setCurrentUser] = useState<JCCognitoUser["username"]>()
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const getUser = async () => {
      const user: JCCognitoUser = await Auth.currentAuthenticatedUser()
      setCurrentUser(user.username)
    }
    getUser()
  }, [])
  useEffect(() => {
    const getOrgData = async () => {
      try {
        const getOrg = await Data.getOrganizationCustom(id)
        console.log({ getOrg })
        setOrgData(getOrg.data?.getOrganization)
        setMapData({
          initCenter: {
            lat: Number(orgData?.location?.latitude) + Number(orgData?.location?.randomLatitude),
            lng: Number(orgData?.location?.longitude) + Number(orgData?.location?.randomLatitude),
          },
          mapData: [
            {
              id: id,
              latitude:
                Number(orgData?.location?.latitude) + Number(orgData?.location?.randomLatitude),
              longitude:
                Number(orgData?.location?.longitude) + Number(orgData?.location?.randomLatitude),
              name: "test",
              user: orgData,
              link: "",
              type: "organization",
            },
          ],
        })
      } catch (err: any) {
        setOrgData(err?.data?.getOrganization)
        setMapData({
          initCenter: {
            lat: Number(orgData?.location?.latitude) + Number(orgData?.location?.randomLatitude),
            lng: Number(orgData?.location?.longitude) + Number(orgData?.location?.randomLatitude),
          },
          mapData: [
            {
              id: id,
              latitude:
                Number(orgData?.location?.latitude) + Number(orgData?.location?.randomLatitude),
              longitude:
                Number(orgData?.location?.longitude) + Number(orgData?.location?.randomLatitude),
              name: "test",
              user: orgData,
              link: "",
              type: "organization",
            },
          ],
        })
      } finally {
        setIsLoading(false)
      }
    }
    getOrgData()
  }, [id])
  useLayoutEffect(() => {
    navigation.setOptions({
      header: (props: { navigation: StackNavigationProp<any, any> | undefined }) => {
        return (
          <Header
            title={orgData?.orgName ?? "Organization"}
            subnav={OrgSettings.SETTING_ISVISIBLE_TOGGLEBAR ? subNavItems : null}
            navigation={props.navigation}
          />
        )
      },
    })
  }, [orgData])
  const centerOffset = isMobileOnly ? 0 : -32
  return isLoading ? (
    <ActivityIndicator
      style={[style.Spinner, { marginLeft: centerOffset }]}
      size="large"
      color="#FF4438"
    />
  ) : (
    <>
      <BrowserView>
        <View style={{ height: 232, flex: 1, backgroundColor: "#FFECEB" }}></View>
        <View style={{ marginHorizontal: "7.778vw" }}>
          <View
            style={{
              flexDirection: "row",
              marginBottom: 56,
              marginTop: -72,
              flex: 1,
            }}
          >
            <ProfileImage isOrg={true} user={orgData} style="orgProfile" />
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-start",
                flex: 1,
                marginLeft: 32,
              }}
            >
              <Text
                style={{
                  fontFamily: "Graphik-Semibold-App",
                  fontSize: 32,
                  lineHeight: 38,
                  letterSpacing: -0.3,
                  marginBottom: 4,
                  marginTop: 84,
                  color: "#1A0706",
                }}
              >
                {orgData?.orgName}
              </Text>
              <Text
                style={{
                  fontFamily: "Graphik-Regular-App",
                  fontSize: 15,
                  lineHeight: 24,
                  color: "#6A5E5D",
                  marginBottom: 4,
                }}
              >
                {orgData?.location?.geocodeFull}
              </Text>
              <Text
                style={{
                  fontFamily: "Graphik-Regular-App",
                  maxWidth: "65ch",
                  flex: 1,
                  fontSize: 15,
                  lineHeight: 24,
                  color: "#483938",
                }}
              >
                {orgData?.aboutMeShort ?? orgData?.aboutMeLong ?? orgData?.orgDescription}
              </Text>
            </View>
          </View>
          {!isMobileOnly && OrgSettings.SETTING_ISVISIBLE_TOGGLEBAR ? (
            <View style={{ marginBottom: 32 }}>
              <SubHeader
                currentTab={
                  currentTab === OrgTabType.ABOUT
                    ? 0
                    : currentTab === OrgTabType.GROUPS
                    ? 1
                    : currentTab === OrgTabType.EVENTS
                    ? 2
                    : currentTab === OrgTabType.RESOURCES
                    ? 3
                    : currentTab === OrgTabType.TEAM
                    ? 4
                    : 0
                }
                navItems={subNavItems}
              />
            </View>
          ) : null}
          <View style={style.MainContainer}>
            <View style={style.ContentContainer}>
              <View style={style.MainContent}>
                {currentTab === OrgTabType.ABOUT ? (
                  <View style={{ borderRadius: 8, borderWidth: 1, borderColor: "#E4E1E1" }}>
                    {orgData && orgData?.location?.geocodeFull ? (
                      <MyMap type={"filters"} mapData={[]} visible={true}></MyMap>
                    ) : null}
                  </View>
                ) : null}
              </View>
              <View style={style.MinorContent}>
                <View style={{ marginBottom: 32 }}>
                  {OrgSettings.SETTING_ISVISIBLE_TOGGLEBAR_EDIT_BUTTON &&
                  currentUser &&
                  orgData?.admins.includes(currentUser) ? (
                    <GenericButton
                      label={"Edit Org Profile"}
                      action={() => navigation.push("EditOrganizationScreen", { id: orgData?.id })}
                      icon={"Edit-White"}
                      style={{
                        ButtonStyle: GenericButtonStyles.QuarternaryButtonStyle,
                        LabelStyle: GenericButtonStyles.QuarternaryLabelStyle,
                        custom: {
                          marginBottom: 32,
                        },
                      }}
                    />
                  ) : null}
                  <OrgDetailsWidget title={"Info"} data={orgData} />
                  <PeopleListWidgetWithInfo
                    members={orgData?.admins ?? []}
                    title="Admins"
                    emptyMessage="No admins found"
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </BrowserView>
      <MobileOnlyView style={{ overflow: "scroll" }}>
        <View style={{ height: 150, flex: 1, backgroundColor: "#FFECEB" }}></View>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            paddingHorizontal: 12,
            alignItems: "center",
            marginTop: -48,
            flex: 1,
          }}
        >
          <ProfileImage isOrg={true} user={orgData} style="orgProfileMobile" />
          <Text
            style={{
              marginTop: 12,
              fontFamily: "Graphik-Regular-App",
              fontSize: 15,
              lineHeight: 24,
              color: "#6A5E5D",
              marginBottom: 8,
            }}
          >
            {orgData?.location?.geocodeFull}
          </Text>
          <Text
            style={{
              fontFamily: "Graphik-Regular-App",
              flex: 1,
              fontSize: 15,
              lineHeight: 24,
              color: "#6A5E5D",
            }}
          >
            {orgData?.aboutMeShort ?? orgData?.aboutMeLong ?? orgData?.orgDescription}
          </Text>
          {OrgSettings.SETTING_ISVISIBLE_TOGGLEBAR_EDIT_BUTTON &&
          currentUser &&
          orgData?.admins.includes(currentUser) ? (
            <GenericButton
              label={"Edit Org Profile"}
              action={() => navigation.navigate("EditOrganizationScreen", { id: orgData?.id })}
              icon={"Edit-White"}
              style={{
                ButtonStyle: GenericButtonStyles.QuarternaryButtonStyle,
                LabelStyle: GenericButtonStyles.QuarternaryLabelStyle,
                custom: {
                  width: "100%",
                  marginTop: 32,
                  marignBottom: 32,
                  borderRadius: 37,
                  justifyContent: "center",
                },
              }}
            />
          ) : null}

          <View
            style={{
              marginTop: 32,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: "#E4E1E1",
              flex: 1,
            }}
          >
            {orgData && orgData?.location?.geocodeFull ? (
              <MyMap visible={true} mapData={[]} type={"filters"}></MyMap>
            ) : null}
          </View>
          <View
            style={{
              marginTop: 32,
              marginBottom: 32,
              flex: 1,
              flexDirection: "row",
              alignSelf: "flex-start",
            }}
          >
            <Image
              style={{ height: 24, width: 24, marginRight: 18 }}
              source={require("../../assets/Facelift/svg/Location.svg")}
            />
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  color: "#483938",
                  fontSize: 15,
                  fontFamily: "Graphik-Regular-App",
                  lineHeight: 24,
                }}
              >
                {orgData?.address /* this is not accessible to all users (?) */}
              </Text>
              <Text
                style={{
                  color: "#483938",
                  fontSize: 15,
                  fontFamily: "Graphik-Regular-App",
                  lineHeight: 24,
                }}
              >
                {orgData?.location?.geocodeFull}
              </Text>
            </View>
          </View>
          <PeopleListWidgetWithInfo
            members={orgData?.admins ?? []}
            title="Admins"
            emptyMessage="No admins found"
          />
        </View>
      </MobileOnlyView>
    </>
  )
}
