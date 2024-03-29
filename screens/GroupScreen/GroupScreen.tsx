import { GraphQLResult } from "@aws-amplify/api/lib/types"
import Auth from "@aws-amplify/auth"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import React, { useEffect, useLayoutEffect, useState } from "react"
import { BrowserView, isMobileOnly, MobileOnlyView } from "react-device-detect"
import { ActivityIndicator, StyleSheet, Text, View } from "react-native"
import { FlatList } from "react-native-gesture-handler"
import BottomMenuModal, { ModalMenuItem } from "../../components/ActionsModal/ActionsModal"
import { Data } from "../../components/Data/Data"
import GenericButton from "../../components/GenericButton/GenericButton"
import { GenericButtonStyles } from "../../components/GenericButton/GenericButtonStyles"
import Header from "../../components/Header/Header"
import { SubHeader } from "../../components/Header/SubHeader"
import LastListItem from "../../components/LastListItem/LastListItem"
import MessageBoard from "../../components/MessageBoard/MessageBoard"
import ProfileImageNew, {
  ProfileImageQuality,
  ProfileImageStyle,
} from "../../components/ProfileImage/ProfileImageNew"
import PeopleListWidget from "../../components/Widgets/PeopleListWidget"
import { GetUserQuery } from "../../src/API"
import { GetUser2Query } from "../../src/API-customqueries"
import { Group, joinGroup, leaveGroup } from "../EventsScreen/GroupUtils"
import ProfileCard from "../ProfilesScreen/ProfileCard"
type Props = {
  route: {
    params: {
      id: string
    }
  }
}
export enum GroupTabType {
  DISCUSSION = "Discussion",
  MEMBERS = "Members",
  EVENTS = "Events",
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
    flex: 0.32,
  },
  MainContent: {
    marginLeft: 64,
    flex: 0.68,
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
export default function GroupScreen(props: Props) {
  const navigation = useNavigation<StackNavigationProp<any, any>>()
  const { id } = props.route.params
  const [isOpen, setIsOpen] = useState(false)
  const [currentTab, setCurrentTab] = useState<GroupTabType>(GroupTabType.DISCUSSION)
  const [isLoading, setIsLoading] = useState(true)
  const [group, setGroup] = useState<Group>()
  const [attendees, setAttendees] = useState<Array<GetUserQuery["getUser"]>>([])
  const [currentUser, setCurrentUser] = useState("")
  const [isAttending, setIsAttending] = useState(false)
  const navigateToMembersList = () => {
    setCurrentTab(GroupTabType.MEMBERS)
  }
  const navigateToDiscussions = () => {
    setCurrentTab(GroupTabType.DISCUSSION)
  }
  const controls = [
    {
      icon: "Dots",
      action: () => setIsOpen((prev) => !prev),
    },
  ]
  const subNavItems = [
    {
      title: "Discussion",
      action: navigateToDiscussions,
    },
    {
      title: "Members",
      action: navigateToMembersList,
    },
    // {
    //   title: "Events",
    //   action: navigateToEvents,
    // },
  ]
  useLayoutEffect(() => {
    if (group)
      navigation.setOptions({
        header: (props: { navigation: StackNavigationProp<any, any> | undefined }) => {
          return (
            <Header
              subnav={subNavItems}
              title={"Group"}
              controls={controls}
              navigation={props.navigation}
            />
          )
        },
      })
  })
  const getAttendees = async (attendeeIds: Array<string>) => {
    try {
      const user = await Auth.currentAuthenticatedUser()
      setCurrentUser(user.username)
      setIsAttending(Boolean(attendeeIds.find((a) => a === user.username)))
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
  const getGroup = async (showSpinner = true) => {
    if (showSpinner) setIsLoading(true)
    const currentEvent = await Data.getGroupForItemPage(id)
    const membersToGetDataFor =
      currentEvent?.data?.getGroup?.members?.items?.map((att) => att?.userID ?? "") ?? []
    getAttendees(membersToGetDataFor)
    setGroup(currentEvent.data?.getGroup)
    if (showSpinner) setIsLoading(false)
  }
  useEffect(() => {
    getGroup()
  }, [id])
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
  const centerOffset = isMobileOnly ? 0 : -32
  const handleAction = async () => {
    if (group) {
      if (isAttending) {
        console.log("leaving")
        const success = await leaveGroup(group, "group")
        console.log({ success })
        if (success) {
          getGroup(false)
        }
      } else {
        console.log("joining")
        const success = await joinGroup(group, "group")
        console.log({ success })
        if (success) {
          getGroup(false)
        }
      }
    }
  }
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
              <ProfileImageNew
                linkToProfile
                style={ProfileImageStyle.UserXSmall2}
                quality={ProfileImageQuality.small}
                type={"user"}
                user={group?.ownerUser?.id}
              />
              <Text style={style.OrganizedByNameText}>
                {group?.ownerUser?.given_name} {group?.ownerUser?.family_name}
              </Text>
            </View>
            <Text style={style.TitleText}>{group?.name}</Text>
            <Text style={style.DescriptionText}>{group?.description}</Text>
          </View>
          {!isMobileOnly ? (
            <View style={{ marginBottom: 32 }}>
              <SubHeader
                currentTab={currentTab === GroupTabType.MEMBERS ? 1 : 0}
                navItems={subNavItems}
              />
            </View>
          ) : null}
          <View style={style.MainContainer}>
            <View style={style.ContentContainer}>
              <View style={style.MainContent}>
                {currentTab === GroupTabType.DISCUSSION ? (
                  <MessageBoard replies style="regular" groupId={id}></MessageBoard>
                ) : currentTab === GroupTabType.MEMBERS ? (
                  <View>
                    <FlatList
                      ListEmptyComponent={() =>
                        !attendees?.length ? (
                          <Text style={style.NoMembersText}>No members</Text>
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
                ) : currentTab === GroupTabType.EVENTS ? null : null}
              </View>
              <View style={style.MinorContent}>
                <View style={{ marginBottom: 32 }}>
                  <GenericButton
                    label={isAttending ? "Leave Group" : "Join Group"}
                    action={handleAction}
                    icon={isAttending ? "Minus-White" : "Plus-White"}
                    style={{
                      ButtonStyle: GenericButtonStyles.QuarternaryButtonStyle,
                      LabelStyle: GenericButtonStyles.QuarternaryLabelStyle,
                      custom: undefined,
                    }}
                  />
                  {group?.owner === currentUser ? (
                    <GenericButton
                      label={"Edit Group"}
                      action={() =>
                        navigation.push("GenericGroupScreen", {
                          groupType: "group",
                          id: group?.id,
                          create: false,
                        })
                      }
                      icon={"Edit-White"}
                      style={{
                        ButtonStyle: GenericButtonStyles.QuarternaryButtonStyle,
                        LabelStyle: GenericButtonStyles.QuarternaryLabelStyle,
                        custom: { marginTop: 4 },
                      }}
                    />
                  ) : null}
                </View>

                <PeopleListWidget
                  emptyMessage="No members"
                  buttonAction={navigateToMembersList}
                  title="Current Members"
                  userData={group?.members?.items}
                />

                {/* <View style={{ marginBottom: 32 }}>
                  <EventWidgets /> need to implement events for groups
                </View> */}
              </View>
            </View>
          </View>
        </View>
      </BrowserView>
      <MobileOnlyView style={{ overflow: "scroll" }}>
        {currentTab === GroupTabType.DISCUSSION ? (
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
              <ProfileImageNew
                linkToProfile
                style={ProfileImageStyle.UserXSmall2}
                quality={ProfileImageQuality.small}
                type={"user"}
                user={group?.ownerUser?.id}
              />
              <Text style={style.OrganizedByNameText}>
                {group?.ownerUser?.given_name} {group?.ownerUser?.family_name}
              </Text>
            </View>
            <Text style={[style.TitleText, { fontSize: 20, lineHeight: 30 }]}>{group?.name}</Text>
            <Text style={[style.DescriptionText, { marginBottom: 32 }]}>{group?.description}</Text>
            <View style={{ marginTop: -8 }}>
              <GenericButton
                label={isAttending ? "Leave Group" : "Join Group"}
                action={handleAction}
                style={{
                  ButtonStyle: GenericButtonStyles.QuarternaryButtonStyle,
                  LabelStyle: [GenericButtonStyles.QuarternaryLabelStyle, { fontSize: 16 }],
                  custom: { borderRadius: 37, justifyContent: "center" },
                }}
              />
            </View>
            <MessageBoard replies style="regular" groupId={id}></MessageBoard>
          </View>
        ) : currentTab === GroupTabType.MEMBERS ? (
          <View>
            <FlatList
              ListEmptyComponent={() =>
                !attendees?.length ? <Text style={style.NoMembersText}>No members</Text> : null
              }
              numColumns={1}
              data={attendees}
              keyExtractor={({ item }) => item?.id}
              renderItem={({ item }) => <ProfileCard item={item} />}
            />
          </View>
        ) : currentTab === GroupTabType.EVENTS ? (
          <View>
            <FlatList
              ListEmptyComponent={() =>
                !attendees?.length ? <Text style={style.NoMembersText}>No events</Text> : null
              }
              numColumns={1}
              data={attendees}
              keyExtractor={({ item }) => item?.id}
              renderItem={({ item }) => <ProfileCard item={item} />}
            />
          </View>
        ) : null}
        <BottomMenuModal menuItems={modalItems} isOpen={isOpen} close={() => setIsOpen(false)} />
      </MobileOnlyView>
    </>
  )
}
