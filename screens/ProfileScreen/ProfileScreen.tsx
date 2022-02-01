import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { Auth } from "aws-amplify"
import React, { useEffect, useLayoutEffect, useState } from "react"
import { BrowserView, isMobileOnly, MobileOnlyView } from "react-device-detect"
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native"
import BottomMenuModal, { ModalMenuItem } from "../../components/ActionsModal/ActionsModal"
import { Data } from "../../components/Data/Data"
import GenericButton from "../../components/GenericButton/GenericButton"
import { GenericButtonStyles } from "../../components/GenericButton/GenericButtonStyles"
import Header from "../../components/Header/Header"
import { SubHeader } from "../../components/Header/SubHeader"
import LastListItem from "../../components/LastListItem/LastListItem"
import ProfileImage from "../../components/ProfileImage/ProfileImage"
import TwoItemComponent, { CarouselType } from "../../components/TwoItemComponent/TwoItemComponent"
import { WidgetItem, WidgetType } from "../../components/Widgets/JCWidget"
import PeopleListWidget from "../../components/Widgets/PeopleListWidget"
import ProfileDetailsWidget from "../../components/Widgets/ProfileDetailsWidget"
import EventCard from "../../screens/EventsScreen/EventCard"
import { useOwnedGroups } from "../../screens/EventsScreen/useOwnedGroups"
import GroupCard from "../../screens/GroupsScreen/GroupCard"
import { GetUser2Query } from "../../src/API-customqueries"
import { JCCognitoUser } from "../../src/types"
import { useEventsForProfile } from "./useEventsForProfile"
import { useGroupsForProfile } from "./useGroupsForProfile"

export const ProfileSettings = {
  SETTING_ISVISIBLE_COLLEAGUES_WIDGET: false,
  SETTING_ISVISIBLE_TOGGLEBAR_ABOUT: true,
  SETTING_ISVISIBLE_TOGGLEBAR_EVENTS: true,
  SETTING_ISVISIBLE_TOGGLEBAR_GROUPS: true,
  SETTING_ISVISIBLE_TOGGLEBAR_RESOURCES: false,
  SETTING_ISVISIBLE_TOGGLEBAR_BRETHREN: false,
  SETTING_ISVISIBLE_TOGGLEBAR_EDIT_BUTTON: true,
}
type Props = {
  route: {
    params: {
      id: string
    }
  }
}
export enum ProfileTabType {
  ABOUT = "About",
  EVENTS = "Events",
  GROUPS = "Groups",
  RESOURCES = "Resources",
  BRETHREN = "Brethren",
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

export default function ProfileScreen(props: Props) {
  const navigation = useNavigation<StackNavigationProp<any, any>>()
  const { id } = props.route.params
  const [isOpen, setIsOpen] = useState(false)
  const [currentTab, setCurrentTab] = useState<ProfileTabType>(ProfileTabType.ABOUT)
  const [isLoading, setIsLoading] = useState(true)
  const [userData, setUserData] = useState<GetUser2Query["getUser"]>(null)
  const [currentUser, setCurrentUser] = useState<JCCognitoUser["username"]>()
  const { groups } = useGroupsForProfile(id)
  const { events, updateEvents } = useEventsForProfile(id)
  const joinedGroups: (string | undefined)[] =
    events
      .filter((eventItem) => eventItem?.members?.items?.find((a) => a?.userID === currentUser))
      .map((event) => event?.id) ?? []
  const { ownedGroups } = useOwnedGroups(events)

  const navigateToAbout = () => {
    setCurrentTab(ProfileTabType.ABOUT)
  }
  const navigateToGroups = () => {
    setCurrentTab(ProfileTabType.GROUPS)
  }
  const navigateToEvents = () => {
    setCurrentTab(ProfileTabType.EVENTS)
  }
  const navigateToBrethren = () => {
    setCurrentTab(ProfileTabType.BRETHREN)
  }
  const navigateToResources = () => {
    setCurrentTab(ProfileTabType.RESOURCES)
  }

  const controls = [
    {
      icon: "Dots",
      action: () => setIsOpen((prev) => !prev),
    },
  ]
  const subNavItems = [
    {
      title: "About",
      hide: !ProfileSettings.SETTING_ISVISIBLE_TOGGLEBAR_ABOUT,
      action: navigateToAbout,
    },
    {
      title: "Groups",
      hide: !ProfileSettings.SETTING_ISVISIBLE_TOGGLEBAR_GROUPS,
      action: navigateToGroups,
    },
    {
      title: "Events",
      hide: !ProfileSettings.SETTING_ISVISIBLE_TOGGLEBAR_EVENTS,
      action: navigateToEvents,
    },
    {
      title: "Resources",
      hide: !ProfileSettings.SETTING_ISVISIBLE_TOGGLEBAR_RESOURCES,
      action: navigateToResources,
    },
    {
      title: "Brethren",
      hide: !ProfileSettings.SETTING_ISVISIBLE_TOGGLEBAR_BRETHREN,
      action: navigateToBrethren,
    },
  ]
  useEffect(() => {
    const getUser = async () => {
      const user: JCCognitoUser = await Auth.currentAuthenticatedUser()
      setCurrentUser(user.username)
    }
    getUser()
  }, [])
  useLayoutEffect(() => {
    if (userData)
      navigation.setOptions({
        header: (props: { navigation: StackNavigationProp<any, any> | undefined }) => {
          return (
            <Header
              subnav={subNavItems}
              title={
                isLoading
                  ? "Loading..."
                  : userData?.given_name + " " + userData?.family_name ?? "Profile"
              }
              controls={controls}
              navigation={props.navigation}
            />
          )
        },
      })
  })
  const modalItems: ModalMenuItem[] = [
    {
      title: "Edit",
      action: () => null,
    },
    {
      title: "Create",
      action: () => null,
    },

    {
      title: "Delete",
      action: () => null,
    },

    {
      title: "Test",
      action: () => null,
    },
  ]

  useEffect(() => {
    const getUserData = async () => {
      const user = await Data.getUserForProfile(id)
      setUserData(user.data?.getUser)
      setIsLoading(false)
    }
    getUserData()
  }, [id])
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
        <View style={{ marginHorizontal: "7.778vw" }}>
          <View style={{ flexDirection: "row", marginBottom: 56, marginTop: 56 }}>
            <ProfileImage user={id} size="profile" />
            <View
              style={{
                justifyContent: "center",
                alignItems: "flex-start",
                marginLeft: 24,
              }}
            >
              <Text
                style={{
                  fontFamily: "Graphik-Semibold-App",
                  fontSize: 32,
                  lineHeight: 38,
                  letterSpacing: -0.3,
                  color: "#1A0706",
                }}
              >
                {userData?.given_name} {userData?.family_name}
              </Text>
              <Text
                style={{
                  fontFamily: "Graphik-Regular-App",
                  fontSize: 15,
                  lineHeight: 24,
                  color: "#6A5E5D",
                }}
              >
                {userData?.location?.geocodeFull}
              </Text>
              <Text
                style={{
                  fontFamily: "Graphik-Regular-App",
                  fontSize: 15,
                  lineHeight: 24,
                  color: "#6A5E5D",
                }}
              >
                {userData?.currentRole}
              </Text>
            </View>
          </View>
          {!isMobileOnly ? (
            <View style={{ marginBottom: 32 }}>
              <SubHeader
                currentTab={
                  currentTab === ProfileTabType.ABOUT
                    ? 0
                    : currentTab === ProfileTabType.GROUPS
                    ? 1
                    : currentTab === ProfileTabType.EVENTS
                    ? 2
                    : currentTab === ProfileTabType.RESOURCES
                    ? 3
                    : currentTab === ProfileTabType.BRETHREN
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
                {currentTab === ProfileTabType.ABOUT ? (
                  <>
                    <TwoItemComponent
                      data={groups}
                      updateEvents={() => Promise.resolve()}
                      type={CarouselType.Group}
                      title="Group Memberships"
                      showMore={navigateToGroups}
                    />
                    <TwoItemComponent
                      data={events}
                      type={CarouselType.Event}
                      updateEvents={updateEvents}
                      ownedGroups={ownedGroups}
                      joinedGroups={joinedGroups}
                      title="Upcoming Events"
                      showMore={navigateToEvents}
                    />
                  </>
                ) : currentTab === ProfileTabType.GROUPS ? (
                  <FlatList
                    ListEmptyComponent={() =>
                      !groups?.length ? <Text style={style.NoMembersText}>No groups</Text> : null
                    }
                    numColumns={2}
                    columnWrapperStyle={{ gap: 32 } as any} // can this be used?
                    ItemSeparatorComponent={() => <View style={{ height: 32 }} />}
                    data={groups}
                    style={{ marginBottom: 32 }}
                    renderItem={({ item, index }) => {
                      return (
                        <LastListItem listLength={groups.length} index={index}>
                          <GroupCard item={item} />
                        </LastListItem>
                      )
                    }}
                  />
                ) : currentTab === ProfileTabType.EVENTS ? (
                  <FlatList
                    ListEmptyComponent={() =>
                      !events?.length ? <Text style={style.NoMembersText}>No events</Text> : null
                    }
                    numColumns={2}
                    ItemSeparatorComponent={() => <View style={{ height: 32 }} />}
                    columnWrapperStyle={{ gap: 32 } as any} // can this be used?
                    data={events}
                    style={{ marginBottom: 32 }}
                    renderItem={({ item, index }) => {
                      return (
                        <LastListItem listLength={events.length} index={index}>
                          <EventCard
                            item={item}
                            updateEvents={updateEvents}
                            isOwner={Boolean(ownedGroups.find((a) => a === item?.id))}
                            joined={Boolean(joinedGroups.find((a) => a === item?.id))}
                          />
                        </LastListItem>
                      )
                    }}
                  />
                ) : currentTab === ProfileTabType.RESOURCES ? (
                  <Text>Resources</Text>
                ) : currentTab === ProfileTabType.BRETHREN ? (
                  <Text>Brethren</Text>
                ) : null}
              </View>
              <View style={style.MinorContent}>
                {currentUser === id && ProfileSettings.SETTING_ISVISIBLE_TOGGLEBAR_EDIT_BUTTON ? (
                  <View style={{ marginBottom: 32 }}>
                    <GenericButton
                      label={"Edit Profile"}
                      action={() => navigation.navigate("EditProfileScreen", { id: userData?.id })}
                      icon={"Edit-White"}
                      style={{
                        ButtonStyle: GenericButtonStyles.QuarternaryButtonStyle,
                        LabelStyle: GenericButtonStyles.QuarternaryLabelStyle,
                        custom: undefined,
                      }}
                    />
                  </View>
                ) : null}
                <ProfileDetailsWidget title={`About ${userData?.given_name}`} data={userData} />
                {ProfileSettings.SETTING_ISVISIBLE_COLLEAGUES_WIDGET ? (
                  <PeopleListWidget
                    emptyMessage="No colleagues"
                    buttonAction={() => null}
                    title="Colleagues"
                    userData={[]}
                  />
                ) : null}

                {/* <View style={{ marginBottom: 32 }}>
                  <EventWidgets /> need to implement events for groups
                </View> */}
              </View>
            </View>
          </View>
        </View>
      </BrowserView>
      <MobileOnlyView style={{ overflow: "scroll" }}>
        {currentTab === ProfileTabType.ABOUT ? (
          <View style={{ padding: 12, paddingTop: 16, paddingBottom: 0 }}>
            <View style={style.HeadingContainer}>
              <ProfileImage size="mobileProfile" user={id} />
            </View>
            <Text style={style.DescriptionText}>{userData?.location?.geocodeFull}</Text>
            <Text style={[style.DescriptionText, { marginBottom: 32 }]}>
              {userData?.currentRole}
            </Text>
            {currentUser === id && ProfileSettings.SETTING_ISVISIBLE_TOGGLEBAR_EDIT_BUTTON ? (
              <View style={{ marginTop: -8, marginBottom: 40 }}>
                <GenericButton
                  label={"Edit Profile"}
                  action={() => setIsOpen(true)}
                  style={{
                    ButtonStyle: GenericButtonStyles.QuarternaryButtonStyle,
                    LabelStyle: [GenericButtonStyles.QuarternaryLabelStyle, { fontSize: 16 }],
                    custom: { borderRadius: 37, justifyContent: "center" },
                  }}
                />
              </View>
            ) : null}
            <ProfileDetailsWidget data={userData} title={`ABOUT ${userData?.given_name}`} />
          </View>
        ) : currentTab === ProfileTabType.GROUPS ? (
          <View>
            <FlatList
              ListEmptyComponent={() => <Text style={style.NoMembersText}>No groups</Text>}
              numColumns={1}
              contentContainerStyle={isMobileOnly ? { paddingHorizontal: 12, paddingTop: 16 } : {}}
              data={groups}
              renderItem={({ item }) => <GroupCard item={item} />}
            />
          </View>
        ) : currentTab === ProfileTabType.EVENTS ? (
          <View>
            <FlatList
              ListEmptyComponent={() => <Text style={style.NoMembersText}>No events</Text>}
              numColumns={1}
              style={{ paddingTop: 16, paddingHorizontal: 12 }}
              data={events}
              renderItem={({ item, index }) => (
                <View
                  style={{
                    padding: 12,
                    paddingBottom: 0,
                    flex: 1,
                  }}
                >
                  <View
                    style={{
                      borderBottomColor: "#E4E1E1",
                      borderBottomWidth: 1,
                      paddingBottom: 12,
                    }}
                  >
                    <WidgetItem
                      len={events.length - 1}
                      item={item}
                      index={index}
                      widgetType={WidgetType.Event}
                    />
                  </View>
                </View>
              )}
            />
          </View>
        ) : null}
        <BottomMenuModal menuItems={modalItems} isOpen={isOpen} close={() => setIsOpen(false)} />
      </MobileOnlyView>
    </>
  )
}
