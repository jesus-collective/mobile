import { GraphQLResult } from "@aws-amplify/api/lib/types"
import Auth from "@aws-amplify/auth"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import moment from "moment"
import React, { useEffect, useLayoutEffect, useState } from "react"
import { BrowserView, isMobileOnly, MobileOnlyView } from "react-device-detect"
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native"
import { FlatList } from "react-native-gesture-handler"
import { GetUser2Query } from "src/API-customqueries"
import BottomMenuModal, { ModalMenuItem } from "../../components/ActionsModal/ActionsModal"
import { Data } from "../../components/Data/Data"
import GenericButton from "../../components/GenericButton/GenericButton"
import { GenericButtonStyles } from "../../components/GenericButton/GenericButtonStyles"
import Header from "../../components/Header/Header"
import { SubHeader } from "../../components/Header/SubHeader"
import LastListItem from "../../components/LastListItem/LastListItem"
import MessageBoard from "../../components/MessageBoard/MessageBoard"
import ProfileImage from "../../components/ProfileImage/ProfileImage"
import DetailsWidget from "../../components/Widgets/DetailsWidget"
import PeopleListWidget from "../../components/Widgets/PeopleListWidget"
import ProfileCard from "../../screens/ProfilesScreen/ProfileCard"
import { GetGroupQuery, GetUserQuery } from "../../src/API"

export default function EventScreen(props: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const navigation = useNavigation()
  const { id } = props.route.params
  const [currentTab, setCurrentTab] = useState<EventTabType>(
    isMobileOnly ? EventTabType.ABOUT : EventTabType.DISCUSSION
  )
  const [isLoading, setIsLoading] = useState(true)
  const [event, setEvent] = useState<GetGroupQuery["getGroup"]>(null)
  const [attendees, setAttendees] = useState<Array<GetUserQuery["getUser"]>>([])
  const [owner, setOwner] = useState<GetUserQuery["getUser"]>(null)
  const [isAttending, setIsAttending] = useState(false)

  const navigateToAttendeesList = () => {
    setCurrentTab(EventTabType.ATTENDEES)
  }
  const navigateToDiscussions = () => {
    setCurrentTab(EventTabType.DISCUSSION)
  }
  const navigateToAbout = () => {
    setCurrentTab(EventTabType.ABOUT)
  }

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

  const headerSubItems = [
    {
      title: "About",
      action: navigateToAbout,
    },
    {
      title: "Discussion",
      action: navigateToDiscussions,
    },

    {
      title: "Attendees",
      action: navigateToAttendeesList,
    },
  ]
  const controls = [
    {
      icon: "Dots",
      action: () => setIsOpen((prev) => !prev),
    },
  ]
  useLayoutEffect(() => {
    if (event)
      navigation.setOptions({
        header: (props: { navigation: StackNavigationProp<any, any> | undefined }) => {
          return (
            <Header
              subnav={headerSubItems}
              title={"Event"}
              controls={controls}
              navigation={props.navigation}
            />
          )
        },
      })
  })

  useEffect(() => {
    setIsLoading(true)
    const getAttendees = async (attendeeIds: Array<string>) => {
      try {
        const currentUser = await Auth.currentAuthenticatedUser()
        setIsAttending(Boolean(attendeeIds.find((a) => a === currentUser.username)))
        const getAllAttendees: Array<GraphQLResult<GetUser2Query>> = []
        for (const attendeeId of attendeeIds) {
          const attendeeData = Data.getUserForProfile(attendeeId)
          getAllAttendees.push(attendeeData as GraphQLResult<GetUser2Query>)
        }
        const d = await Promise.all(getAllAttendees)
        const userData = d?.map((item) => item?.data?.getUser)
        setAttendees(userData)
      } catch (err) {
        console.log({ "something went wrong": err })
      }
    }
    const getOwner = async (ownerId: string) => {
      const owner = await Data.getUserForProfile(ownerId)
      setOwner(owner.data?.getUser)
    }
    const getEvent = async () => {
      const currentEvent = await Data.getGroupForItemPage(id)
      if (currentEvent?.data?.getGroup?.owner) getOwner(currentEvent?.data?.getGroup?.owner)
      getAttendees(
        currentEvent?.data?.getGroup?.members?.items?.map((att) => att?.userID ?? "") ?? []
      )
      setEvent(currentEvent.data?.getGroup)
      setIsLoading(false)
    }
    getEvent()
  }, [id])
  console.log({ owner })
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
          <View style={{ marginVertical: 132, marginHorizontal: "21.666vw" }}>
            <View style={style.HeadingContainer}>
              <Text style={style.OrganizedByText}>Organized by</Text>
              <ProfileImage size="roundEvent" user={owner?.id} />
              <Text style={style.OrganizedByNameText}>
                {owner?.given_name} {owner?.family_name}
              </Text>
            </View>
            <Text style={style.TitleText}>{event?.name}</Text>
            <View style={style.InfoBarContainer}>
              <View style={style.InfoItemContainer}>
                <Image
                  style={style.InfoItemIcon}
                  source={require("../../assets/Facelift/svg/Calendar.svg")}
                />
                <Text style={style.InfoItemText}>{moment(event?.time).format("MMMM D, YYYY")}</Text>
              </View>
              <View style={style.InfoItemContainer}>
                <Image
                  style={style.InfoItemIcon}
                  source={require("../../assets/Facelift/svg/Clock.svg")}
                />
                <Text style={style.InfoItemText}>{moment(event?.time).format("LT")}</Text>
              </View>
              <View style={style.InfoItemContainer}>
                <Image
                  style={style.InfoItemIcon}
                  source={require("../../assets/Facelift/svg/Eye.svg")}
                />
                <Text style={style.InfoItemText}>Public</Text>
              </View>
            </View>
            <Text style={style.DescriptionText}>{event?.description}</Text>
          </View>
          {!isMobileOnly ? (
            <View style={{ marginBottom: 32 }}>
              <SubHeader
                currentTab={currentTab === EventTabType.ATTENDEES ? 1 : 0}
                navItems={[
                  {
                    title: "Discussion",
                    action: navigateToDiscussions,
                  },
                  {
                    title: "Attendees",
                    action: navigateToAttendeesList,
                  },
                ]}
              />
            </View>
          ) : null}
          <View style={style.MainContainer}>
            <View style={style.ContentContainer}>
              <View style={style.MainContent}>
                {currentTab === EventTabType.DISCUSSION ? (
                  <MessageBoard replies style="regular" groupId={id}></MessageBoard>
                ) : currentTab === EventTabType.ATTENDEES ? (
                  <View>
                    <FlatList
                      ListEmptyComponent={() =>
                        !attendees?.length ? (
                          <Text style={style.NoMembersText}>No attendees</Text>
                        ) : null
                      }
                      columnWrapperStyle={{ gap: 32 } as any}
                      numColumns={2}
                      data={attendees}
                      keyExtractor={({ item }) => item?.id}
                      renderItem={({ item, index }) => {
                        return (
                          <LastListItem listLength={attendees.length} index={index}>
                            <ProfileCard item={item} />
                          </LastListItem>
                        )
                      }}
                    />
                  </View>
                ) : null}
              </View>
              <View style={style.MinorContent}>
                <View style={{ marginBottom: 32 }}>
                  <GenericButton
                    label={isAttending ? "Don't Attend" : "Attend"}
                    action={() => null}
                    icon={isAttending ? "Minus-White" : "Plus-White"}
                    style={{
                      ButtonStyle: GenericButtonStyles.QuarternaryButtonStyle,
                      LabelStyle: GenericButtonStyles.QuarternaryLabelStyle,
                      custom: undefined,
                    }}
                  />
                </View>
                <DetailsWidget title="Event Details" data={event} />
                {event?.members?.items?.length ? (
                  <PeopleListWidget
                    emptyMessage="No attendees"
                    buttonAction={navigateToAttendeesList}
                    title="Attendees"
                    userData={event?.members?.items}
                  />
                ) : null}
              </View>
            </View>
          </View>
        </View>
      </BrowserView>
      <MobileOnlyView style={{ overflow: "scroll" }}>
        {currentTab === EventTabType.DISCUSSION ? (
          <Text>Discussion</Text>
        ) : currentTab === EventTabType.ATTENDEES ? (
          <View>
            <FlatList
              ListEmptyComponent={() =>
                !attendees?.length ? <Text style={style.NoMembersText}>No attendees</Text> : null
              }
              numColumns={1}
              data={attendees}
              keyExtractor={({ item }) => item?.id}
              renderItem={({ item }) => <ProfileCard item={item} />}
            />
          </View>
        ) : currentTab === EventTabType.ABOUT ? (
          <View style={{ padding: 12, paddingTop: 16 }}>
            <View style={style.HeadingContainer}>
              <Text
                style={[
                  style.OrganizedByText,
                  {
                    fontSize: 12,
                    lineHeight: 18,
                  },
                ]}
              >
                Organized by
              </Text>
              <ProfileImage size="roundEvent" user={owner?.id} />
              <Text style={style.OrganizedByNameText}>
                {owner?.given_name} {owner?.family_name}
              </Text>
            </View>
            <Text style={[style.TitleText, { fontSize: 20, lineHeight: 30 }]}>{event?.name}</Text>
            <Text style={style.DescriptionText}>{event?.description}</Text>
            <View style={{ marginTop: 24 }}>
              <DetailsWidget hideHeading={true} title="" data={event} />
            </View>
            <View style={{ marginTop: -8 }}>
              <GenericButton
                label={isAttending ? "Don't Attend" : "Attend"}
                action={() => null}
                style={{
                  ButtonStyle: GenericButtonStyles.QuarternaryButtonStyle,
                  LabelStyle: [GenericButtonStyles.QuarternaryLabelStyle, { fontSize: 16 }],
                  custom: { borderRadius: 37, justifyContent: "center" },
                }}
              />
            </View>
          </View>
        ) : null}
        <BottomMenuModal menuItems={modalItems} isOpen={isOpen} close={() => setIsOpen(false)} />
      </MobileOnlyView>
    </>
  )
}

type Props = {
  route: {
    params: {
      id: string
    }
  }
}
export enum EventTabType {
  DISCUSSION = "Discussion",
  ATTENDEES = "Attendees",
  ABOUT = "About",
}

const style = StyleSheet.create({
  MainContainer: {
    flexDirection: "column",
    paddingBottom: 120,
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
  InfoBarContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 16,
    marginBottom: 32,
  },
  InfoItemContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
  },
  InfoItemText: {
    color: "#483938",
    fontFamily: "Graphik-Regular-App",
    textAlign: "center",
    fontSize: 15,
  },
  InfoItemIcon: {
    height: 24,
    width: 24,
    marginRight: 11,
  },
})
