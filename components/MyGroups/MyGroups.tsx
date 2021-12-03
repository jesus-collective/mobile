import { GraphQLResult } from "@aws-amplify/api/lib/types"
import { Ionicons } from "@expo/vector-icons"
import { Tooltip } from "@material-ui/core"
import { StackNavigationProp } from "@react-navigation/stack"
import { Analytics, Auth } from "aws-amplify"
import moment from "moment-timezone"
import { Body, Card, CardItem, Container, Left, ListItem, Right, StyleProvider } from "native-base"
import * as React from "react"
import {
  Dimensions,
  Image,
  Modal,
  Picker,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import DropDownPicker from "react-native-dropdown-picker"
import { Data, UserGroupType } from "../../components/Data/Data"
import ErrorBoundry from "../../components/ErrorBoundry"
import JCButton, { ButtonTypes } from "../../components/Forms/JCButton"
import ProfileImage from "../../components/ProfileImage/ProfileImage"
import getTheme from "../../native-base-theme/components"
import { UserActions, UserContext } from "../../screens/HomeScreen/UserContext"
import {
  EventBriteEvent,
  EventBriteListEventsQuery,
  EventBriteListTicketClassesQuery,
  ListOrganizationsQuery,
  ListUsersQuery,
} from "../../src/API"
import {
  GroupByTypeByTimeQuery,
  GroupByTypeByTimeQueryVariables,
  GroupByTypeQuery,
  ModelSortDirection,
} from "../../src/API-customqueries"
import { constants } from "../../src/constants"
import { JCCognitoUser } from "../../src/types"
import EventbriteButton from "../EventBrite/EventBriteButton"
import JCComponent, { JCState } from "../JCComponent/JCComponent"

interface Props {
  navigation: StackNavigationProp<any, any>
  wrap: boolean
  type: string
  showMore: boolean
  showMy?: boolean
  homeDashboard?: boolean
  showAllEvents?: boolean
}

type GroupData = (
  | NonNullable<
      NonNullable<NonNullable<GraphQLResult<GroupByTypeQuery>["data"]>["groupByType"]>["items"]
    >[0]
  | NonNullable<
      NonNullable<NonNullable<GraphQLResult<ListUsersQuery>["data"]>["listUsers"]>["items"]
    >[0]
  | NonNullable<
      NonNullable<
        NonNullable<GraphQLResult<ListOrganizationsQuery>["data"]>["listOrganizations"]
      >["items"]
    >[0]
)[]
type EventBriteTicketClass = NonNullable<
  NonNullable<
    NonNullable<
      NonNullable<
        GraphQLResult<EventBriteListTicketClassesQuery>["data"]
      >["eventBriteListTicketClasses"]
    >["ticket_classes"]
  >[0]
>
type EventBriteTicketEvent = NonNullable<
  NonNullable<
    NonNullable<GraphQLResult<EventBriteListEventsQuery>["data"]>["eventBriteListEvents"]
  >["events"]
>[0]

interface State extends JCState {
  eventBriteListTicketClass: Record<string, EventBriteTicketClass>
  currentEventBriteID: string
  myFilter: boolean
  eventFilter: boolean
  myTitleScreen: string
  openSingle: string
  genericGroupType: "group" | "event" | null
  openMultiple: string
  type: string
  cardWidth: any
  createString: string
  titleString: string
  data: GroupData[]
  eventBriteEvents: EventBriteEvent[]
  pastEventBriteEvents: EventBriteEvent[]
  pastEvents: GroupData[]
  showAllEvents: boolean
  showCreateButton: boolean
  currentUser: string | null
  nextToken: string | null | undefined
  nextTokenPastEvents: string | null
  nextEventBriteTokenPastEvents: number | null
  nextEventBriteToken: number | null
  canLeave: Record<string, boolean>
  isOwner: Record<string, boolean>
  canPay: any
  isPaid: any
  pickerState: any
  joinCourse: any
  userGroupType: UserGroupType
}
export interface MapData {
  id: string
  latitude: any
  longitude: any
  name: string
  user?: any
  event?: any
  link: string
  type: any
}

export default class MyGroups extends JCComponent<Props, State> {
  constructor(props: Props) {
    super(props)

    const commonInitialState = {
      eventBriteListTicketClass: {},
      currentEventBriteID: "",
      data: [],
      eventBriteEvents: [],
      pastEventBriteEvents: [],
      pastEvents: [],
      showCreateButton: false,
      currentUser: null,
      nextToken: null,
      nextTokenPastEvents: null,
      canLeave: {},
      isOwner: {},
      joinCourse: null,
      canPay: [],
      isPaid: [],
      type: props.type,
      showAllEvents: !!this.props.showAllEvents,
      userGroupType: UserGroupType.All,
    }

    if (props.type === "event") {
      this.state = {
        ...super.getInitialState(),
        myFilter: !!this.props.showMy,
        eventFilter: false,
        pickerState: "",
        myTitleScreen: "My Events",
        openSingle: "GenericGroupScreen",
        genericGroupType: "event",
        openMultiple: "EventsScreen",
        createString: "+ Create Event",
        titleString: "Events",
        cardWidth: 300,
        ...commonInitialState,
      }
    } else if (props.type === "group") {
      this.state = {
        ...super.getInitialState(),
        myFilter: !!this.props.showMy,
        eventFilter: false,
        myTitleScreen: "My Groups",
        openSingle: "GenericGroupScreen",
        genericGroupType: "group",
        openMultiple: "GroupsScreen",
        createString: "+ Create Group",
        titleString: "Groups",
        cardWidth: 300,
        ...commonInitialState,
      }
    } else if (props.type === "resource") {
      this.state = {
        ...super.getInitialState(),
        myFilter: false,
        eventFilter: false,
        myTitleScreen: "My Resources",
        openSingle: "ResourceScreen",
        genericGroupType: null,
        openMultiple: "ResourcesScreen",
        createString: "+ Create Resource",
        titleString: "Resources",
        cardWidth: 215,
        ...commonInitialState,
      }
    } else if (props.type === "organization") {
      this.state = {
        ...super.getInitialState(),
        myFilter: false,
        eventFilter: false,
        myTitleScreen: "My Organizations",
        openSingle: "OrganizationScreen",
        genericGroupType: null,
        openMultiple: "OrganizationsScreen",
        createString: "+ Create Organization",
        titleString: "Organizations",
        cardWidth: 215,
        ...commonInitialState,
      }
    } else if (props.type === "course") {
      this.state = {
        ...super.getInitialState(),
        myFilter: false,
        eventFilter: false,
        myTitleScreen: "My Courses",
        openSingle: "CourseOverviewScreen",
        genericGroupType: null,
        openMultiple: "CoursesScreen",
        createString: "+ Create Course",
        titleString: "Courses",
        cardWidth: 215,
        ...commonInitialState,
      }
    } else if (props.type === "profile") {
      this.state = {
        ...super.getInitialState(),
        myFilter: false,
        eventFilter: false,
        myTitleScreen: "My Profiles",
        openSingle: "ProfileScreen",
        genericGroupType: null,
        openMultiple: "ProfilesScreen",
        createString: "+ Create Profile",
        titleString: "Profiles",
        cardWidth: 215,
        ...commonInitialState,
      }
    } else {
      this.state = {
        ...super.getInitialState(),
        myTitleScreen: "",
        myFilter: false,
        eventFilter: false,
        openSingle: "",
        genericGroupType: null,
        openMultiple: "",
        titleString: "",
        createString: "",
        cardWidth: 300,
        ...commonInitialState,
      }
    }
  }

  async componentDidMount(): Promise<void> {
    try {
      const user: JCCognitoUser = await Auth.currentAuthenticatedUser()
      this.setState({ currentUser: user.username })
      if (this.props.type != "profile") {
        const groupList: string[] = user.getSignInUserSession()?.getAccessToken().payload[
          "cognito:groups"
        ]
        this.setState({
          userGroupType:
            groupList?.includes("partner") || groupList?.includes("legacyUserGroup1")
              ? UserGroupType.Partners
              : groupList?.includes("subscriptionkyyouth") ||
                groupList?.includes("subscriptionkykids") ||
                groupList?.includes("subscriptionkyearlyyears")
              ? UserGroupType.OneStory
              : groupList?.includes("Friend")
              ? UserGroupType.Friends
              : UserGroupType.All,
          showCreateButton:
            this.props.type == "resource"
              ? groupList?.includes("admin")
              : this.props.type == "course"
              ? groupList?.includes("courseAdmin") || groupList?.includes("admin")
              : this.props.type == "organization"
              ? groupList?.includes("admin")
              : groupList?.includes("verifiedUsers"),
        })
      }
    } catch (e) {
      console.error(e)
    }

    await this.setData(this.props, true)
  }

  getTicketClasses = async (value: EventBriteTicketEvent): Promise<void> => {
    const ticketClasses = await Data.eventBriteListTicketClasses({
      eventId: value?.id,
    })

    const temp = this.state.eventBriteListTicketClass
    ticketClasses.data?.eventBriteListTicketClasses?.ticket_classes?.map((item) => {
      if (item) temp[item.event_id ?? ""] = item
    })
    this.setState({
      eventBriteListTicketClass: temp,
    })
  }
  async setData(props: Props, initialCall = false, pastEvents = false): Promise<void> {
    if (props.type == "profile") {
      const listUsers = Data.listUsers(this.state.userGroupType, this.state.nextToken)
      const processList = (json: GraphQLResult<ListUsersQuery>) => {
        const temp = [...this.state.data, ...(json.data?.listUsers?.items ?? [])].filter(
          (z) => z
        ) as GroupData[]
        this.setState({
          data: temp,
          nextToken: json.data?.listUsers?.nextToken,
        })
      }
      listUsers.then(processList).catch(processList)
    } else if (props.type == "organization") {
      const listOrgs = Data.listOrgs(this.state.nextToken)
      const processList = (json: GraphQLResult<ListOrganizationsQuery>) => {
        console.log({ profile: json })
        const temp = [...this.state.data, ...(json.data?.listOrganizations?.items ?? [])].filter(
          (z) => z
        ) as GroupData[]
        this.setState({
          data: temp,
          nextToken: json.data?.listOrganizations?.nextToken,
        })
      }
      listOrgs.then(processList).catch(processList)
    } else if (props.type === "event") {
      const processEventBrite = (json: GraphQLResult<EventBriteListEventsQuery>, past: boolean) => {
        if (!json.data?.eventBriteListEvents) {
          return
        }
        console.debug({ eventBriteData: json })
        //  this.setCanLeave(json.data.eventBriteListEvents.events)
        //  this.setIsOwner(json.data.eventBriteListEvents.events)

        if (past) {
          json.data.eventBriteListEvents.events?.map(this.getTicketClasses)
          this.setState({
            nextEventBriteTokenPastEvents:
              json.data.eventBriteListEvents.pagination?.page_number ?? null,
            pastEventBriteEvents: (
              [
                ...this.state.pastEventBriteEvents,
                ...(json.data.eventBriteListEvents.events ?? []),
              ].filter((z) => z) as EventBriteEvent[]
            )
              .filter((z) => moment(z.start?.utc).isBefore(moment()))
              .filter((z) => z.status != "draft" && z.status != "canceled"),
          })
        } else {
          json.data.eventBriteListEvents.events?.map(this.getTicketClasses)
          this.setState({
            nextEventBriteToken: json.data.eventBriteListEvents.pagination?.page_number ?? null,
            eventBriteEvents: (
              [
                ...this.state.eventBriteEvents,
                ...(json.data.eventBriteListEvents.events ?? []),
              ].filter((z) => z) as EventBriteEvent[]
            )
              .filter((z) => moment(z.start?.utc).isAfter(moment()))
              .filter((z) => z.status != "draft" && z.status != "canceled"),
          })
        }
      }
      const processEvents = (json: GraphQLResult<GroupByTypeByTimeQuery>, past: boolean) => {
        if (!json.data?.groupByTypeByTime) {
          return
        }
        console.debug({ eventData: json })
        this.setCanLeave(json.data.groupByTypeByTime.items)
        this.setIsOwner(json.data.groupByTypeByTime.items)

        if (past) {
          this.setState({
            nextTokenPastEvents: json.data.groupByTypeByTime.nextToken ?? null,
            pastEvents: [
              ...this.state.pastEvents,
              ...(json.data.groupByTypeByTime.items ?? []),
            ].filter((z) => z) as GroupData[],
          })
        } else {
          this.setState({
            nextToken: json.data.groupByTypeByTime.nextToken ?? null,
            data: [...this.state.data, ...(json.data.groupByTypeByTime.items ?? [])].filter(
              (z) => z
            ) as GroupData[],
          })
        }
      }

      try {
        const makeQueryVariables = (
          nextToken: GroupByTypeByTimeQueryVariables["nextToken"],
          past: boolean,
          limit: number
        ): GroupByTypeByTimeQueryVariables => {
          return {
            nextToken,
            type: props.type,
            limit,
            time: past
              ? { lt: moment().format() }
              : {
                  ge: moment().format(),
                },
            sortDirection: ModelSortDirection.DESC,
          }
        }

        if (initialCall || !pastEvents) {
          // future or current events
          const json = await Data.groupByTypeByTime(
            makeQueryVariables(this.state.nextToken, false, initialCall ? 30 : 10)
          )
          processEvents(json, false)
          const eventBriteEvents = await Data.eventBriteListEvents({})
          processEventBrite(eventBriteEvents, false)
        }

        if (initialCall || pastEvents) {
          // past events
          const json = await Data.groupByTypeByTime(
            makeQueryVariables(this.state.nextTokenPastEvents, true, initialCall ? 30 : 10)
          )
          processEvents(json, true)

          const pastEventBriteEvents = await Data.eventBriteListEvents({})
          processEventBrite(pastEventBriteEvents, true)
        }
      } catch (e) {
        console.error(e)
      }
    } else {
      const listGroup = Data.groupByTypeForMyGroups(props.type, this.state.nextToken)
      const processList = (json: GraphQLResult<GroupByTypeQuery>) => {
        if (json.data?.groupByType == null) return
        console.log({ groupData: json })
        this.setCanPay()
        this.setIsPaid(json.data.groupByType.items)
        this.setCanLeave(json.data.groupByType.items)
        this.setIsOwner(json.data.groupByType.items)
        let temp: any[]
        if (this.state.data) temp = [...this.state.data, ...(json.data.groupByType.items ?? [])]
        else temp = [...(json.data.groupByType.items ?? [])]
        this.setState({
          data: temp,
          nextToken: json.data.groupByType.nextToken,
        })
      }
      listGroup.then(processList).catch(processList)
    }
  }

  canCourseQuickOpen(userActions: UserActions, id: string): boolean {
    if (this.state.isOwner[id]) return false
    else if (this.isCourseCoach(userActions)) return false
    else if (this.isCourseAdmin(userActions)) return false
    else if (this.canCoursePay(id)) return false
    else if (this.isCoursePaid(id)) return true
    else if (this.canCourseApply()) return false
    else return false
  }
  openSingle(userActions: UserActions, id: string): void {
    console.log({ "Navigate to": this.state.openSingle })
    if (this.state.openSingle == "CourseOverviewScreen" && this.canCourseQuickOpen(userActions, id))
      this.props.navigation.push("CourseHomeScreen", { id: id, create: false })
    else
      this.props.navigation.push(this.state.openSingle, {
        groupType: this.state.genericGroupType,
        id: id,
        create: false,
      })
  }
  createSingle(): void {
    console.log({ "Navigate to": this.state.openSingle })
    this.props.navigation.push(this.state.openSingle, {
      groupType: this.state.genericGroupType,
      create: true,
    })
  }
  openMultiple(): void {
    if (this.props.type === "event" && !this.props.homeDashboard) {
      this.setState({ showAllEvents: !this.state.showAllEvents, myFilter: false })
    } else {
      console.log({ "Navigate to": this.state.openMultiple })
      this.props.navigation.push(
        this.state.openMultiple,
        this.props.type === "event" ? { showAllEvents: true } : {}
      )
    }
  }
  async setCanPay(): Promise<void> {
    const courseTriadUserByUser = Data.courseTriadUserByUser(this.state.currentUser)
    courseTriadUserByUser
      .then((json) => {
        console.log(json)
        json.data?.courseTriadUserByUser?.items?.map((item: any) => {
          console.log(item.triad.courseInfoID)
          this.setState({
            canPay: this.state.canPay.concat([item.triad.courseInfoID]),
          })
        })
      })
      .catch((err) => {
        console.log({ "Error query.getPayment": err })
      })
  }
  async setIsPaid(data: any): Promise<void> {
    data.forEach((item: any) => {
      const getPayment = Data.getPayment(item.id + "-" + this.state.currentUser)
      getPayment
        .then((json: any) => {
          console.log(json)
          if (json.data.getPayment != null) {
            this.setState({ isPaid: this.state.isPaid.concat([item.id]) })
          }
        })
        .catch((err: any) => {
          console.log({ "Error query.getPayment": err })
        })
    })
    //console.log({ isPaid: this.state.isPaid })
  }
  async setCanLeave(data: any): Promise<void> {
    data.forEach((item: any) => {
      const groupMemberByUser = Data.groupMemberByUser(this.state.currentUser, item.id)
      groupMemberByUser
        .then((json) => {
          if ((json.data?.groupMemberByUser?.items?.length ?? 0) > 0) {
            const canLeave = { ...this.state.canLeave }
            canLeave[item.id] = true
            this.setState({ canLeave })
          }
        })
        .catch((err) => {
          console.log({ "Error query.groupMemberByUser": err })
        })
    })
  }

  async setIsOwner(data: any): Promise<void> {
    data.forEach((item: any) => {
      const getGroup = Data.getGroupForOwner(item.id)
      getGroup
        .then((json) => {
          if (json.data?.getGroup?.owner === this.state.currentUser) {
            const isOwner = { ...this.state.isOwner }
            isOwner[item.id] = true
            this.setState({ isOwner })
          }
        })
        .catch((err) => {
          console.log({ "Error query.getGroup": err })
        })
    })
  }
  getPromoCode(userActions: UserActions): string {
    const promoCode =
      userActions.isMemberOf("admin") ||
      userActions.isMemberOf("partner") ||
      userActions.isMemberOf("legacyUserGroup1")
        ? "JesusCollectivePartners"
        : userActions.isMemberOf("subscriptionkyyouth") ||
          userActions.isMemberOf("subscriptionkykids") ||
          userActions.isMemberOf("subscriptionkyearlyyears")
        ? "JesusCollectiveOneStory"
        : ""

    return promoCode
  }
  async join(userActions: UserActions, group: any, groupType: string): Promise<void> {
    Analytics.record({
      name: "joined" + groupType,
      // Attribute values must be strings
      attributes: { id: group.id, name: group.name },
    })
    try {
      const createGroupMember = await Data.createGroupMember({
        groupID: group.id,
        userID: this.state.currentUser,
      })

      console.log({ "Success Data.createGroupMember": createGroupMember })
      const canLeave = { ...this.state.canLeave }
      canLeave[group.id] = true
      this.setState({ canLeave })
      this.renderByType(userActions, group, groupType)
    } catch (err) {
      console.log({ "Error Data.createGroupMember": err })
      const canLeave = { ...this.state.canLeave }
      canLeave[group.id] = true
      this.setState({ canLeave })
      this.renderByType(userActions, group, groupType)
    }
  }
  openConversation(initialUser: string, name: string): void {
    console.log("Navigate to conversationScreen")
    this.props.navigation.push("ConversationScreen", {
      initialUserID: initialUser,
      initialUserName: name,
    })
  }
  async leave(userActions: UserActions, group: any, groupType: string): Promise<void> {
    try {
      Analytics.record({
        name: "left" + groupType,
        // Attribute values must be strings
        attributes: { id: group.id, name: group.name },
      })
      const groupMemberByUser = await Data.groupMemberByUser(this.state.currentUser, group.id)
      console.log({ "Success Data.groupMemberByUser": groupMemberByUser })
      const groupMember = groupMemberByUser?.data?.groupMemberByUser?.items
      for (let i = 0; i < (groupMember?.length ?? 0); i++) {
        try {
          const deleteGroupMember = await Data.deleteGroupMember(groupMember![i]?.id)
          console.log({ "Success Data.deleteGroupMember": deleteGroupMember })
          const canLeave = { ...this.state.canLeave }
          canLeave[group.id] = false
          this.setState({ canLeave })

          this.renderByType(userActions, group, groupType)
        } catch (err) {
          console.log({ "Error Data.deleteGroupMember": err })
          const canLeave = { ...this.state.canLeave }
          canLeave[group.id] = false
          this.setState({ canLeave })
          this.renderByType(userActions, group, groupType)
        }
      }
    } catch (err) {
      console.log({ "Error Data.groupMemberByUser": err })
    }
  }

  renderByType(userActions: UserActions, item: any, type: string): React.ReactNode {
    switch (type) {
      case "group":
        return this.renderGroup(userActions, item)
      case "event":
        return this.renderEvent(userActions, item)
      case "resource":
        return this.renderResource(userActions, item)
      case "organization":
        return this.renderOrganization(item)
      case "course":
        return this.renderCourse(userActions, item)
      case "profile":
        return this.renderProfile(item)
    }
  }

  renderGroup(userActions: UserActions, item: any): React.ReactNode {
    return (
      <Tooltip title={item.name}>
        <Card style={[this.styles.style.groupCard, { width: this.state.cardWidth }]}>
          <CardItem
            style={{
              paddingLeft: 0,
              paddingRight: 0,
              paddingTop: 10,
              height: 50,
              paddingBottom: 0,
            }}
          >
            {item.isSponsored === "true" || item.isSponsored === true ? (
              <View
                style={{
                  width: this.state.cardWidth,
                  paddingRight: 20,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <Text ellipsizeMode="tail" numberOfLines={1} style={this.styles.style.sponsoredTag}>
                  sponsored
                </Text>
                <Image
                  style={{
                    margin: 0,
                    padding: 0,
                    width: 40,
                    height: 40,
                    borderRadius: 100,
                    paddingRight: 20,
                    paddingTop: 15,
                  }}
                  source={require("../../assets/icon.png")}
                ></Image>
              </View>
            ) : null}
          </CardItem>
          {item.name.length > 54 || item.name.length == 54 ? (
            <CardItem style={{ height: 100, paddingTop: 0 }}>
              <Text
                ellipsizeMode="tail"
                numberOfLines={3}
                style={[this.styles.style.fontTitleGroup, { paddingTop: 0 }]}
                data-tip={item.name}
              >
                {item.name}
              </Text>
              <Image
                style={{
                  margin: 0,
                  padding: 0,
                  width: 40,
                  height: 40,
                  borderRadius: 100,
                  alignSelf: "flex-end",
                }}
                source={require("../../assets/icon.png")}
              ></Image>
            </CardItem>
          ) : (
            <CardItem style={{ height: 100, paddingTop: 0 }}>
              <Text
                ellipsizeMode="tail"
                numberOfLines={3}
                style={[this.styles.style.fontTitleGroup, { paddingTop: 0 }]}
              >
                {item.name}
              </Text>
            </CardItem>
          )}
          <CardItem style={{ height: 100 }}>
            <Text ellipsizeMode="tail" numberOfLines={3} style={this.styles.style.fontDetailMiddle}>
              {item.description}
            </Text>
          </CardItem>
          {constants.SETTING_ISVISIBLE_MEMBER_COUNT ? (
            <CardItem>
              <Image
                style={{ width: "22px", height: "22px", marginRight: 5 }}
                source={require("../../assets/svg/user.svg")}
              ></Image>
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={this.styles.style.fontDetailBottom}
              >
                Members: {item.memberCount}
              </Text>
            </CardItem>
          ) : null}
          {!this.state.canLeave[item.id] && !this.state.isOwner[item.id] ? (
            <CardItem>
              <JCButton
                buttonType={ButtonTypes.Solid}
                onPress={async () => {
                  await this.join(userActions, item, "Group")
                }}
              >
                Join
              </JCButton>
              <Right></Right>
            </CardItem>
          ) : null}
          {this.state.canLeave[item.id] && !this.state.isOwner[item.id] ? (
            <CardItem>
              <JCButton
                buttonType={ButtonTypes.Solid}
                onPress={async () => {
                  await this.leave(userActions, item, "Group")
                }}
              >
                Leave
              </JCButton>
              <Right></Right>
            </CardItem>
          ) : null}
          {this.state.isOwner[item.id] ? (
            <CardItem>
              <JCButton buttonType={ButtonTypes.Solid} onPress={() => null}>
                Owner
              </JCButton>
              <Right></Right>
            </CardItem>
          ) : null}
        </Card>
      </Tooltip>
    )
  }
  renderProfile(item: any): React.ReactNode {
    return (
      <Card key={item.id} style={this.styles.style.profilesCard}>
        <CardItem style={this.styles.style.profileCard}>
          <Left style={this.styles.style.profileCardContent}>
            <ProfileImage user={item} size="small3"></ProfileImage>
            <Body>
              <Text style={this.styles.style.fontConnectWithName}>
                {item.given_name} {item.family_name}
              </Text>
              <Text style={this.styles.style.fontConnectWithRole}>{item.currentRole}</Text>
              <JCButton
                buttonType={ButtonTypes.ProfileSmall}
                onPress={() => {
                  this.openConversation(item.id, item.given_name + " " + item.family_name)
                }}
              >
                Start Conversation
              </JCButton>
            </Body>
          </Left>
        </CardItem>
      </Card>
    )
  }
  renderEvent(userActions: UserActions, item: any): React.ReactNode {
    const zone = moment.tz.guess()
    return (
      <Tooltip title={item.name}>
        <Card style={[this.styles.style.eventCard, { width: this.state.cardWidth }]}>
          <CardItem
            style={{
              paddingLeft: 0,
              paddingRight: 0,
              paddingTop: 10,
              height: 50,
              paddingBottom: 0,
            }}
          >
            {item.isSponsored === "true" || item.isSponsored === true ? (
              <View
                style={{
                  width: this.state.cardWidth,
                  paddingRight: 20,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <Text ellipsizeMode="tail" numberOfLines={1} style={this.styles.style.sponsoredTag}>
                  sponsored
                </Text>
                <Image
                  style={{
                    margin: 0,
                    padding: 0,
                    width: 40,
                    height: 40,
                    borderRadius: 100,
                    paddingRight: 20,
                    paddingTop: 15,
                  }}
                  source={require("../../assets/icon.png")}
                ></Image>
              </View>
            ) : null}
          </CardItem>
          <CardItem style={{ paddingTop: 0 }}>
            <Text numberOfLines={1} style={[this.styles.style.fontDetailTop, { paddingTop: 0 }]}>
              {moment.tz(item.time, zone).format("ddd, MMM D, h:mm a")}{" "}
              {moment.tz.zone(zone)?.abbr(+moment(item.time).format("x"))}
            </Text>
          </CardItem>
          <CardItem style={{ height: 60, marginTop: 8 }}>
            <Text ellipsizeMode="tail" numberOfLines={3} style={this.styles.style.fontTitle}>
              {item.name}
            </Text>
          </CardItem>

          <CardItem style={{ height: 80 }}>
            <Text ellipsizeMode="tail" numberOfLines={3} style={this.styles.style.fontDetailMiddle}>
              {item.description}
            </Text>
          </CardItem>

          <CardItem>
            <Image
              style={{ width: "22px", height: "22px", marginRight: 5 }}
              source={require("../../assets/svg/pin 2.svg")}
            ></Image>
            {item.eventType == "location" ? (
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={this.styles.style.fontDetailBottom}
              >
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={
                    "https://www.google.com/maps/dir/?api=1&destination=" + escape(item.location)
                  }
                >
                  {item.location}
                </a>
              </Text>
            ) : item.eventType == "eventbrite" || item.eventType == "eventbriteJC" ? (
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={this.styles.style.fontDetailBottom}
              >
                <a target="_blank" rel="noreferrer" href={item.eventUrl}>
                  Online
                </a>
              </Text>
            ) : (
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={this.styles.style.fontDetailBottom}
              >
                <a target="_blank" rel="noreferrer" href={item.eventUrl}>
                  Zoom
                </a>
              </Text>
            )}
          </CardItem>
          {!this.state.canLeave[item.id] && !this.state.isOwner[item.id] ? (
            <CardItem>
              {item.eventType == "eventbrite" ? (
                <JCButton
                  buttonType={ButtonTypes.Solid}
                  onPress={async () => {
                    await this.join(userActions, item, "Event")
                  }}
                >
                  Attend
                </JCButton>
              ) : (
                <>
                  <EventbriteButton
                    componentProps={{
                      style: {
                        cursor: "pointer",
                        paddingTop: 6,
                        paddingBottom: 6,
                        paddingLeft: 29,
                        paddingRight: 29,
                        marginBottom: 20,
                        marginLeft: 0,
                        marginRight: 0,
                        //   color:"#F0493E",
                        backgroundColor: "#F0493E",
                        borderWidth: 1,
                        borderColor: "#F0493E",
                        shadowOffset: { height: 0, width: 0 },
                        shadowOpacity: 0,
                        borderRadius: 4,
                      },
                    }}
                    isModal={true}
                    promoCode={this.getPromoCode(userActions)}
                    ebEventId={item.id.replace("eventbriteJC-", "")}
                  >
                    <div
                      style={{
                        color: "#ffffff",
                        fontFamily: "Graphik-Regular-App",
                        fontSize: 16,
                        padding: 10,
                        fontWeight: 600,
                      }}
                    >
                      Register
                    </div>
                  </EventbriteButton>
                </>
              )}
              <Right></Right>
            </CardItem>
          ) : null}
          {this.state.canLeave[item.id] && !this.state.isOwner[item.id] ? (
            <CardItem>
              <JCButton
                buttonType={ButtonTypes.Solid}
                onPress={async () => {
                  await this.leave(userActions, item, "Event")
                }}
              >
                {"Don't Attend"}
              </JCButton>
              <Right></Right>
            </CardItem>
          ) : null}
          {this.state.isOwner[item.id] ? (
            <CardItem>
              <JCButton buttonType={ButtonTypes.Solid} onPress={() => null}>
                Owner
              </JCButton>
              <Right></Right>
            </CardItem>
          ) : null}
        </Card>
      </Tooltip>
    )
  }
  renderResource(userActions: UserActions, item: any): React.ReactNode {
    return (
      <Tooltip title={item.name}>
        <Card style={[this.styles.style.resourceCard, { width: this.state.cardWidth }]}>
          <CardItem
            bordered
            style={{
              paddingLeft: 0,
              paddingRight: 0,
              paddingTop: 0,
              paddingBottom: 0,
              width: this.state.cardWidth,
              right: 5,
            }}
          >
            <Image
              style={{
                margin: 0,
                padding: 0,
                width: this.state.cardWidth,
                height: 70,
              }}
              source={require("../../assets/svg/pattern.svg")}
            ></Image>
          </CardItem>
          <CardItem>
            <Text ellipsizeMode="tail" numberOfLines={3} style={this.styles.style.fontTitleGroup}>
              {item.name}
            </Text>
          </CardItem>
          <CardItem>
            <Text ellipsizeMode="tail" numberOfLines={1} style={this.styles.style.fontDetailMiddle}>
              Last Updated: {item.lastupdated}
            </Text>
          </CardItem>
          {(!this.state.isOwner[item.id] && !this.state.canLeave[item.id]) ||
          (!this.state.isOwner[item.id] && this.state.canLeave[item.id]) ? (
            <CardItem>
              <JCButton
                buttonType={ButtonTypes.Solid}
                onPress={async () => {
                  if (!this.state.isOwner[item.id] && !this.state.canLeave[item.id]) {
                    await this.join(userActions, item, "Resource")
                  } else if (!this.state.isOwner[item.id] && this.state.canLeave[item.id]) {
                    await this.leave(userActions, item, "Resource")
                  }
                }}
              >
                {this.state.canLeave[item.id] ? "Leave" : "Join"}
              </JCButton>
              <Right></Right>
            </CardItem>
          ) : null}
          {this.state.isOwner[item.id] ? (
            <CardItem>
              <JCButton buttonType={ButtonTypes.Solid} onPress={() => null}>
                Owner
              </JCButton>
              <Right></Right>
            </CardItem>
          ) : null}
        </Card>
      </Tooltip>
    )
  }
  renderOrganization(item: any): React.ReactNode {
    return (
      <Tooltip title={item.orgName}>
        <Card style={[this.styles.style.resourceCard, { width: this.state.cardWidth }]}>
          <CardItem>
            <ProfileImage size="small" user={item}></ProfileImage>
          </CardItem>
          <CardItem>
            <Text ellipsizeMode="tail" numberOfLines={3} style={this.styles.style.fontTitle}>
              {item.orgName}
            </Text>
          </CardItem>
          <CardItem>
            <JCButton buttonType={ButtonTypes.Outline} onPress={() => null}>
              View
            </JCButton>
            <Right></Right>
          </CardItem>
        </Card>
      </Tooltip>
    )
  }
  isCourseCoach(userActions: UserActions): boolean {
    return userActions.isMemberOf("courseCoach")
  }
  isCourseAdmin(userActions: UserActions): boolean {
    return userActions.isMemberOf("courseAdmin")
  }
  canCourseApply(): boolean {
    return false
  }

  canCoursePay(id: string): boolean {
    const test = this.state.canPay.filter((elem: any) => elem === id)
    if (test.length > 0) return true && !this.isCoursePaid(id)
    else return false
  }
  isCoursePaid(id: string): boolean {
    const test = this.state.isPaid.filter((elem: any) => elem === id)
    if (test.length > 0) return true
    else return false
  }

  purchase(id: string): void {
    this.props.navigation.push("CoursePaymentScreen", { id: id })
  }

  renderCourseStatus(userActions: UserActions, item: any): React.ReactNode {
    if (this.state.isOwner[item.id])
      return (
        <CardItem>
          <Text style={{ fontFamily: "Graphik-Bold-App", color: "#333333" }}>Owner</Text>
          <Right></Right>
        </CardItem>
      )
    else if (this.isCourseCoach(userActions))
      return (
        <CardItem>
          <Text style={{ fontFamily: "Graphik-Bold-App", color: "#333333" }}>Coach</Text>
          <Right></Right>
        </CardItem>
      )
    else if (this.isCourseAdmin(userActions))
      return (
        <CardItem>
          <Text style={{ fontFamily: "Graphik-Bold-App", color: "#333333" }}>Admin</Text>
          <Right></Right>
        </CardItem>
      )
    else if (this.canCoursePay(item.id))
      return (
        <CardItem>
          <JCButton
            buttonType={ButtonTypes.Solid}
            onPress={() => {
              this.purchase(item.id)
            }}
          >
            Pay
          </JCButton>
          <Right></Right>
        </CardItem>
      )
    else if (this.isCoursePaid(item.id))
      return (
        <CardItem>
          <Text style={{ fontFamily: "Graphik-Bold-App", color: "#333333" }}>Purchased</Text>
          <Right></Right>
        </CardItem>
      )
    else if (this.canCourseApply())
      return (
        <CardItem>
          <JCButton
            buttonType={ButtonTypes.Solid}
            onPress={() => {
              //this.applyCourse(item, "Course")
            }}
          >
            Apply
          </JCButton>
          <Right></Right>
        </CardItem>
      )
    else
      return (
        <CardItem>
          <Text style={{ fontFamily: "Graphik-Bold-App", color: "#333333" }}>Closed</Text>
          <Right></Right>
        </CardItem>
      )
  }
  eventBriteFilter = (z: EventBriteEvent): boolean => {
    const item = this.state.eventBriteListTicketClass[z?.id ?? ""]
    const ticketClassesOneStory = item?.variants?.map((item2) =>
      item2?.display_name?.includes("One Story")
    )

    const ticketClassesPartners = item?.variants?.map((item2) =>
      item2?.display_name?.includes("Partners")
    )
    if (ticketClassesOneStory?.includes(true) || ticketClassesPartners?.includes(true)) return true
    return false
  }
  eventBriteToEvent = (z: EventBriteEvent): GroupData => {
    const r = {
      id: "eventbriteJC-" + (z.id ?? "1"),
      type: "event",
      owner: "",
      name: z.name?.text,
      isSponsored: true,
      eventType: "eventbriteJC",
      time: z.start?.utc,
    } as unknown as GroupData
    return r
  }
  renderCourse(userActions: UserActions, item: any): React.ReactNode {
    return (
      <Tooltip title={item.name}>
        <Card style={[this.styles.style.courseCard, { width: this.state.cardWidth }]}>
          <CardItem
            bordered
            style={{
              paddingLeft: 0,
              paddingRight: 0,
              paddingTop: 0,
              paddingBottom: 0,
              width: this.state.cardWidth,
              right: 5,
            }}
          >
            <Image
              style={{
                margin: 0,
                padding: 0,
                width: this.state.cardWidth,
                height: 70,
              }}
              source={require("../../assets/svg/pattern.svg")}
            ></Image>
          </CardItem>
          <CardItem>
            <Text
              testID="group-course-title"
              ellipsizeMode="tail"
              numberOfLines={3}
              style={this.styles.style.fontTitleGroup}
              data-tip={item.name}
            >
              {item.name}
            </Text>
          </CardItem>
          <CardItem>
            <Text ellipsizeMode="tail" numberOfLines={1} style={this.styles.style.fontDetail}>
              Last Updated: {item.lastupdated}
            </Text>
          </CardItem>
          {this.renderCourseStatus(userActions, item)}
        </Card>
      </Tooltip>
    )
  }
  filterMy = (item: any): boolean => {
    return !this.state.myFilter || this.state.canLeave[item.id] || this.state.isOwner[item.id]
  }

  renderJoinCourseModal(): React.ReactNode {
    return this.state.joinCourse ? (
      <View style={this.styles.style.groupsJoinCourseModalContainer}>
        <Modal style={{ overflow: "hidden" }} transparent={true} visible={this.state.joinCourse}>
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 20,
              padding: 35,
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
            <JCButton
              buttonType={ButtonTypes.Outline}
              onPress={() => {
                this.setState({ joinCourse: null })
              }}
            >
              X
            </JCButton>
            <Text>Applications are currently closed, please check back later.</Text>
          </View>
        </Modal>
      </View>
    ) : null
  }
  handlePickerChange(itemValue: string): void {
    this.setState({ pickerState: itemValue })
    if (itemValue === "Previous Events") {
      this.setState({
        eventFilter: !this.state.eventFilter,
        showAllEvents: false,
      })
    } else if (itemValue === "Upcoming Events") {
      this.setState({
        eventFilter: this.state.eventFilter,
        showAllEvents: false,
      })
    } else if (itemValue === "Show All") {
      this.openMultiple()
    } else if (itemValue === "Show Recommended") {
      this.openMultiple()
    } else if (itemValue === this.state.myTitleScreen) {
      this.setState({
        myFilter: !this.state.myFilter,
        showAllEvents: false,
      })
    } else if (itemValue === "Create") {
      this.createSingle()
    }
  }
  static UserConsumer = UserContext.Consumer
  icon = (): React.ReactNode => {
    return <Ionicons name="md-eye-outline" style={this.styles.style.resourceIcon} />
  }
  icon2 = (): React.ReactNode => {
    return <Ionicons name="thumbs-up" style={this.styles.style.resourceIcon} />
  }
  icon3 = (): React.ReactNode => {
    return <Ionicons name="documents-outline" style={this.styles.style.resourceIcon} />
  }
  icon4 = (): React.ReactNode => {
    return <Ionicons name="arrow-forward-outline" style={this.styles.style.resourceIcon} />
  }
  icon5 = (): React.ReactNode => {
    return <Ionicons name="arrow-back-outline" style={this.styles.style.resourceIcon} />
  }
  icon6 = (): React.ReactNode => {
    return <Ionicons name="add-outline" style={this.styles.style.resourceIcon} />
  }
  getButtonItems(): any[] {
    const z = []

    z.push({
      label: "Show All",
      value: "Show All",
      icon: this.icon,
    })
    if (constants["SETTING_ISVISIBLE_SHOWRECOMMENDED"])
      z.push({
        label: "Show Recommended",
        value: "Show Recommended",
        icon: this.icon2,
      })

    if (constants["SETTING_ISVISIBLE_SHOWMYFILTER"])
      z.push({
        label: this.state.myTitleScreen,
        value: this.state.myTitleScreen,
        icon: this.icon3,
      })
    if (constants["SETTING_ISVISIBLE_SHOWEVENTFILTER"] && this.props.type == "event")
      z.push({
        label: "Upcoming Events",
        value: "Upcoming Events",
        icon: this.icon4,
      })
    if (constants["SETTING_ISVISIBLE_SHOWEVENTFILTER"] && this.props.type == "event")
      z.push({
        label: "Previous Events",
        value: "Previous Events",
        icon: this.icon5,
      })
    if (constants["SETTING_ISVISIBLE_CREATE_" + this.state.type])
      z.push({
        label: `Create ${this.state.titleString.slice(0, -1)}`,
        value: "Create",
        icon: this.icon6,
      })

    return z
  }
  render(): React.ReactNode {
    return (
      <MyGroups.UserConsumer>
        {({ userState, userActions }) => {
          if (!userState) return null

          const deviceWidth = Dimensions.get("window").width
          if (!userActions.isReady()) return null
          if (!constants["SETTING_ISVISIBLE_" + this.state.type]) return null
          else if (
            this.state.type == "course" &&
            !userActions.isMemberOf("courseUser") &&
            !userActions.isMemberOf("courseCoach") &&
            !userActions.isMemberOf("courseAdmin")
          ) {
            return null
          } else if (this.state.titleString == null) return null
          else {
            let data: GroupData[] = [
              ...this.state.data,
              ...this.state.eventBriteEvents
                .filter(this.eventBriteFilter, userActions)
                .map(this.eventBriteToEvent),
            ]
            const timeCompare = (a: GroupData, b: GroupData) =>
              (b?.time ?? "").localeCompare(a?.time ?? "")
            const timeCompareReverse = (a: GroupData, b: GroupData) =>
              (a?.time ?? "").localeCompare(b?.time ?? "")

            if (this.props.type === "event") {
              if (this.state.showAllEvents || this.state.myFilter) {
                data = [
                  ...this.state.data,
                  ...this.state.pastEvents,
                  ...this.state.pastEventBriteEvents
                    .filter(this.eventBriteFilter)
                    .map(this.eventBriteToEvent),
                  ...this.state.eventBriteEvents
                    .filter(this.eventBriteFilter)
                    .map(this.eventBriteToEvent),
                ]
                data.sort(timeCompare)
              } else if (this.state.eventFilter) {
                data = [
                  ...this.state.pastEvents,
                  ...this.state.pastEventBriteEvents
                    .filter(this.eventBriteFilter)
                    .map(this.eventBriteToEvent),
                ]
                data.sort(timeCompare)
              } else {
                data.sort(timeCompareReverse)
              }
            }

            return (
              <ErrorBoundry>
                <StyleProvider style={getTheme()}>
                  <>
                    <Container
                      style={{
                        padding: 10,
                        minHeight: 525,
                        width: "100%",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                      }}
                    >
                      <Container
                        style={[this.styles.style.sectionHeadingDashboard, { zIndex: 6000 }]}
                      >
                        <>
                          <JCButton
                            buttonType={ButtonTypes.TransparentBoldBlack}
                            onPress={() => {
                              this.openMultiple()
                            }}
                          >
                            {this.state.titleString}
                          </JCButton>
                          <Container style={this.styles.style.dashboardSectionSubNav}>
                            {Platform.OS !== "web" || Dimensions.get("window").width < 720 ? (
                              <DropDownPicker
                                zIndex={6000}
                                containerStyle={{
                                  height: 40,
                                  width: 80,
                                  zIndex: 5000,
                                  marginTop: 5,
                                  marginBottom: 5,
                                  alignSelf: "center",
                                }}
                                dropDownStyle={{
                                  backgroundColor: "#FF4438",
                                  right: 0,
                                  width: 200,
                                  zIndex: 5000,
                                }}
                                style={{
                                  backgroundColor: "#FF4438",
                                  zIndex: 5000,
                                  alignSelf: "center",
                                }}
                                itemStyle={{
                                  justifyContent: "flex-start",
                                  width: 100,
                                  zIndex: 5000,
                                }}
                                customArrowUp={() => (
                                  <Ionicons
                                    name="cog-outline"
                                    style={this.styles.style.resourceIcon}
                                  />
                                )}
                                customArrowDown={() => (
                                  <Ionicons
                                    name="cog-outline"
                                    style={this.styles.style.resourceIcon}
                                  />
                                )}
                                placeholder=""
                                labelStyle={{
                                  fontSize: 14,
                                  textAlign: "left",
                                  color: "#FFFFFF",
                                  fontWeight: "600",
                                  alignSelf: "center",
                                  zIndex: 5000,
                                }}
                                items={this.getButtonItems()}
                                onChangeItem={(itemValue) =>
                                  this.handlePickerChange(itemValue.value)
                                }
                              />
                            ) : (
                              <>
                                {this.state.type == "profile" && (
                                  <Picker
                                    mode="dropdown"
                                    style={{
                                      width: "10%",
                                      marginTop: 12,
                                      marginBottom: 20,
                                      fontSize: 18,
                                      height: 30,
                                      flexGrow: 0,
                                      paddingTop: 3,
                                      paddingBottom: 3,
                                    }}
                                    selectedValue={this.state.userGroupType}
                                    onValueChange={(value: UserGroupType) => {
                                      console.log({ value: value })
                                      this.setState({ data: [], userGroupType: value }, () => {
                                        this.setData(this.props, false)
                                      })
                                    }}
                                  >
                                    {Object.keys(UserGroupType).map((org) => {
                                      return <Picker.Item key={org} label={org} value={org} />
                                    })}
                                  </Picker>
                                )}
                                <JCButton
                                  buttonType={ButtonTypes.TransparentBoldOrange}
                                  testID={"mygroup-showall-" + this.state.titleString}
                                  onPress={() => {
                                    this.openMultiple()
                                  }}
                                >
                                  Show All
                                </JCButton>
                                {constants["SETTING_ISVISIBLE_SHOWRECOMMENDED"] ? (
                                  <JCButton
                                    buttonType={ButtonTypes.TransparentBoldOrange}
                                    testID={"mygroup-recommended-" + this.state.titleString}
                                    onPress={() => {
                                      this.openMultiple()
                                    }}
                                  >
                                    Show Recommended
                                  </JCButton>
                                ) : null}

                                {constants["SETTING_ISVISIBLE_SHOWMYFILTER"] &&
                                this.state.type != "profile" ? (
                                  <JCButton
                                    buttonType={ButtonTypes.TransparentBoldOrange}
                                    testID={"mygroup-showmyfilter-" + this.state.titleString}
                                    onPress={() => {
                                      this.setState({
                                        myFilter: !this.state.myFilter,
                                        showAllEvents: false,
                                      })
                                    }}
                                  >
                                    {this.state.myTitleScreen}
                                  </JCButton>
                                ) : null}
                                {constants["SETTING_ISVISIBLE_SHOWEVENTFILTER"] &&
                                this.props.type == "event" &&
                                (deviceWidth >= 950 || this.props.wrap) ? (
                                  <JCButton
                                    buttonType={ButtonTypes.TransparentBoldOrange}
                                    testID={"mygroup-showeventfilter-" + this.state.titleString}
                                    onPress={() => {
                                      this.setState({
                                        eventFilter: !this.state.eventFilter,
                                        showAllEvents: false,
                                        myFilter: false,
                                      })
                                    }}
                                  >
                                    {this.state.eventFilter ? "Upcoming Events" : "Previous Events"}
                                  </JCButton>
                                ) : null}
                                {this.state.showCreateButton &&
                                constants["SETTING_ISVISIBLE_CREATE_" + this.state.type] ? (
                                  <JCButton
                                    buttonType={ButtonTypes.OutlineBold}
                                    testID={"mygroup-create-" + this.state.titleString}
                                    onPress={() => {
                                      this.createSingle()
                                    }}
                                  >
                                    {deviceWidth < 950 && !this.props.wrap
                                      ? "+"
                                      : this.state.createString}
                                  </JCButton>
                                ) : null}
                              </>
                            )}
                          </Container>
                        </>
                      </Container>

                      <Container
                        style={
                          this.props.wrap && this.props.type != "profile"
                            ? this.styles.style.ResourcesMyGroupsWrap
                            : this.props.wrap && this.props.type == "profile"
                            ? this.styles.style.profileMyGroupsWrap
                            : this.styles.style.ResourcesMyGroupsNoWrap
                        }
                      >
                        {data ? (
                          data.filter(this.filterMy).length > 0 ? (
                            data.filter(this.filterMy).map((item: any, index: number) => {
                              return (
                                <ErrorBoundry key={index}>
                                  {item.eventType == "eventbriteJC" ? (
                                    <ListItem
                                      noBorder
                                      style={[
                                        this.styles.style.conversationsCard,
                                        { cursor: "default" },
                                      ]}
                                      button
                                    >
                                      {this.renderByType(userActions, item, this.state.type)}
                                    </ListItem>
                                  ) : (
                                    <ListItem
                                      noBorder
                                      style={this.styles.style.conversationsCard}
                                      button
                                      onPress={() => {
                                        this.openSingle(userActions, item.id)
                                      }}
                                    >
                                      {this.renderByType(userActions, item, this.state.type)}
                                    </ListItem>
                                  )}
                                </ErrorBoundry>
                              )
                            })
                          ) : (
                            <Text style={this.styles.style.noCardFontTitle}>
                              No{" "}
                              {this.state.type == "event"
                                ? this.state.eventFilter
                                  ? "previous "
                                  : "upcoming "
                                : ""}
                              {this.state.type}s
                            </Text>
                          )
                        ) : (
                          <Text style={this.styles.style.loadingFontTitle}>
                            Loading {this.state.type}s
                          </Text>
                        )}
                        {this.state.nextToken ||
                        ((this.state.eventFilter || this.state.showAllEvents) &&
                          this.state.nextTokenPastEvents) ? (
                          this.props.showMore ? (
                            this.state.type == "profile" ? (
                              <ListItem
                                noBorder
                                style={this.styles.style.conversationsCard}
                                button
                                onPress={() => {
                                  this.setData(this.props)
                                }}
                              >
                                <Card
                                  style={[
                                    this.styles.style.profilesCard,
                                    { width: this.state.cardWidth },
                                  ]}
                                >
                                  <CardItem style={this.styles.style.profileCard}>
                                    <Text
                                      ellipsizeMode="tail"
                                      numberOfLines={3}
                                      style={this.styles.style.groupsLoadMoreFont}
                                    >
                                      Load more...
                                    </Text>
                                  </CardItem>
                                </Card>
                              </ListItem>
                            ) : (
                              <TouchableOpacity
                                style={{ top: 15, height: 80 }}
                                onPress={() => {
                                  this.setData(
                                    this.props,
                                    false,
                                    this.state.eventFilter || this.state.showAllEvents
                                  )
                                }}
                              >
                                <Card
                                  style={[
                                    this.styles.style.groupMoreCard,
                                    { width: this.state.cardWidth },
                                  ]}
                                >
                                  <CardItem
                                    style={{
                                      backgroundColor: "none",
                                      alignItems: "center",
                                    }}
                                  >
                                    <Text
                                      ellipsizeMode="tail"
                                      numberOfLines={3}
                                      style={this.styles.style.groupsLoadMoreFont}
                                    >
                                      Load more...
                                    </Text>
                                  </CardItem>
                                </Card>
                              </TouchableOpacity>
                            )
                          ) : null
                        ) : null}
                      </Container>
                    </Container>
                    {this.renderJoinCourseModal()}
                  </>
                </StyleProvider>
              </ErrorBoundry>
            )
          }
        }}
      </MyGroups.UserConsumer>
    )
  }
}
