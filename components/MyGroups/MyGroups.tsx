import { GraphQLResult } from "@aws-amplify/api/lib/types"
import { Ionicons } from "@expo/vector-icons"
import { Tooltip } from "@material-ui/core"
import { Analytics, API, Auth } from "aws-amplify"
import GRAPHQL_AUTH_MODE from "aws-amplify-react-native"
import moment from "moment-timezone"
import { Body, Card, CardItem, Container, Left, ListItem, Right, StyleProvider } from "native-base"
import * as React from "react"
import { Dimensions, Image, Modal, Platform, Text, TouchableOpacity, View } from "react-native"
import DropDownPicker from "react-native-dropdown-picker"
import { ListOrganizationsQuery, ListUsersQuery } from "src/API"
import { GroupByTypeQuery } from "src/API-customqueries"
import { JCCognitoUser } from "src/types"
import ErrorBoundry from "../../components/ErrorBoundry"
import JCButton, { ButtonTypes } from "../../components/Forms/JCButton"
import ProfileImage from "../../components/ProfileImage/ProfileImage"
import getTheme from "../../native-base-theme/components"
import { UserActions, UserContext } from "../../screens/HomeScreen/UserContext"
import { constants } from "../../src/constants"
import * as customQueries from "../../src/graphql-custom/queries"
import * as mutations from "../../src/graphql/mutations"
import * as queries from "../../src/graphql/queries"
import JCComponent, { JCState } from "../JCComponent/JCComponent"

interface Props {
  navigation: any
  wrap: boolean
  type: string
  showMore: boolean
  onDataload(mapData: MapData[]): void
  showMy?: boolean
}
type GroupData =
  | NonNullable<NonNullable<GraphQLResult<GroupByTypeQuery>["data"]>["groupByType"]>["items"]
  | NonNullable<NonNullable<GraphQLResult<ListUsersQuery>["data"]>["listUsers"]>["items"]
  | NonNullable<
      NonNullable<GraphQLResult<ListOrganizationsQuery>["data"]>["listOrganizations"]
    >["items"]
interface State extends JCState {
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
  data: GroupData

  showCreateButton: boolean
  currentUser: string | null
  nextToken: string | null
  canLeave: any
  isOwner: any
  canPay: any
  isPaid: any
  pickerState: any
  joinCourse: any
}
export interface MapData {
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
    if (props.type == "event") {
      this.state = {
        ...super.getInitialState(),
        myFilter: false || this.props.showMy,
        eventFilter: false,
        pickerState: "",
        myTitleScreen: "My Events",
        openSingle: "GenericGroupScreen",
        genericGroupType: "event",
        openMultiple: "EventsScreen",
        createString: "+ Create Event",
        titleString: "Events",
        type: props.type,
        cardWidth: 300,
        data: null,
        showCreateButton: false,
        currentUser: null,
        nextToken: null,
        canLeave: [],
        isOwner: [],
        joinCourse: null,
        canPay: [],
        isPaid: [],
      }
    } else if (props.type == "group") {
      this.state = {
        ...super.getInitialState(),
        myFilter: false || this.props.showMy,
        eventFilter: false,
        myTitleScreen: "My Groups",
        openSingle: "GenericGroupScreen",
        genericGroupType: "group",
        openMultiple: "GroupsScreen",
        createString: "+ Create Group",
        titleString: "Groups",
        type: props.type,
        cardWidth: 300,
        data: [],
        showCreateButton: false,
        currentUser: null,
        nextToken: null,
        canLeave: [],
        isOwner: [],
        joinCourse: null,
        canPay: [],
        isPaid: [],
      }
    } else if (props.type == "resource") {
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
        type: props.type,
        cardWidth: 215,
        data: [],
        showCreateButton: false,
        currentUser: null,
        nextToken: null,
        canLeave: [],
        isOwner: [],
        joinCourse: null,
        canPay: [],
        isPaid: [],
      }
    } else if (props.type == "organization") {
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
        type: props.type,
        cardWidth: 215,
        data: [],
        showCreateButton: false,
        currentUser: null,
        nextToken: null,
        canLeave: [],
        isOwner: [],
        joinCourse: null,
        canPay: [],
        isPaid: [],
      }
    } else if (props.type == "course") {
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
        type: props.type,
        cardWidth: 215,
        data: [],
        showCreateButton: false,
        currentUser: null,
        nextToken: null,
        canLeave: [],
        isOwner: [],
        joinCourse: null,
        canPay: [],
        isPaid: [],
      }
    } else if (props.type == "profile") {
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
        type: props.type,
        cardWidth: 215,
        data: [],
        showCreateButton: false,
        currentUser: null,
        nextToken: null,
        canLeave: [],
        isOwner: [],
        joinCourse: null,
        canPay: [],
        isPaid: [],
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
        type: props.type,
        titleString: "",
        createString: "",
        cardWidth: 300,
        data: [],
        showCreateButton: false,
        currentUser: null,
        nextToken: null,
        canLeave: [],
        isOwner: [],
        joinCourse: null,
        canPay: [],
        isPaid: [],
      }
    }
  }
  componentDidMount(): void {
    this.setInitialData(this.props)

    const user = Auth.currentAuthenticatedUser()
    user.then((user: JCCognitoUser) => {
      this.setState({ currentUser: user.username })
      if (this.props.type != "profile")
        this.setState({
          showCreateButton:
            this.props.type == "resource"
              ? user
                  .getSignInUserSession()
                  ?.getAccessToken()
                  .payload["cognito:groups"]?.includes("admin")
              : this.props.type == "course"
              ? user
                  .getSignInUserSession()
                  ?.getAccessToken()
                  .payload["cognito:groups"]?.includes("courseAdmin") ||
                user
                  .getSignInUserSession()
                  ?.getAccessToken()
                  .payload["cognito:groups"]?.includes("admin")
              : this.props.type == "organization"
              ? user
                  .getSignInUserSession()
                  ?.getAccessToken()
                  .payload["cognito:groups"]?.includes("admin")
              : user
                  .getSignInUserSession()
                  ?.getAccessToken()
                  .payload["cognito:groups"]?.includes("verifiedUsers"),
        })
    })
  }

  convertOrgToMapData(
    data: NonNullable<
      NonNullable<GraphQLResult<ListOrganizationsQuery>["data"]>["listOrganizations"]
    >["items"]
  ): MapData[] {
    return data
      ?.map((dataItem) => {
        if (
          dataItem &&
          dataItem.location &&
          dataItem.location.latitude &&
          dataItem.location.longitude
        )
          return {
            latitude: Number(dataItem.location.latitude) + Number(dataItem.location.randomLatitude),
            longitude:
              Number(dataItem.location.longitude) + Number(dataItem.location.randomLongitude),
            name: dataItem.orgName,
            user: dataItem,
            link: "",
            type: "organization",
          } as MapData
        else return null
      })
      .filter((o) => o) as MapData[]
  }
  convertProfileToMapData(
    data: NonNullable<NonNullable<GraphQLResult<ListUsersQuery>["data"]>["listUsers"]>["items"]
  ): MapData[] {
    return data
      ?.map((dataItem) => {
        if (
          dataItem &&
          dataItem.location &&
          dataItem.location.latitude &&
          dataItem.location.longitude
        )
          return {
            latitude: Number(dataItem.location.latitude) + Number(dataItem.location.randomLatitude),
            longitude:
              Number(dataItem.location.longitude) + Number(dataItem.location.randomLongitude),
            name: dataItem.given_name + " " + dataItem.family_name,
            user: dataItem,
            link: "",
            type: "profile",
          } as MapData
        else return null
      })
      .filter((o) => o) as MapData[]
  }

  convertEventToMapData(
    data: NonNullable<NonNullable<GraphQLResult<GroupByTypeQuery>["data"]>["groupByType"]>["items"]
  ): MapData[] {
    return data
      ?.map((dataItem) => {
        if (
          dataItem &&
          dataItem.locationLatLong &&
          dataItem.locationLatLong.latitude &&
          dataItem.locationLatLong.longitude &&
          moment(dataItem.time).isAfter(moment().subtract(3, "day"))
        )
          return {
            latitude: dataItem.locationLatLong.latitude,
            longitude: dataItem.locationLatLong.longitude,
            name: dataItem.name,
            event: dataItem,
            link: "",
            type: "event",
          } as MapData
        else return null
      })
      .filter((o) => o) as MapData[]
  }
  convertToMapData(data: GroupData): MapData[] {
    switch (this.state.type) {
      case "group":
        return []
      case "event":
        return this.convertEventToMapData(
          data as NonNullable<
            NonNullable<GraphQLResult<GroupByTypeQuery>["data"]>["groupByType"]
          >["items"]
        )
      case "resource":
        return []
      case "organization":
        return this.convertOrgToMapData(
          data as NonNullable<
            NonNullable<GraphQLResult<ListOrganizationsQuery>["data"]>["listOrganizations"]
          >["items"]
        )
      case "course":
        return []
      case "profile":
        return this.convertProfileToMapData(
          data as NonNullable<
            NonNullable<GraphQLResult<ListUsersQuery>["data"]>["listUsers"]
          >["items"]
        )
      default:
        return []
    }
  }
  setInitialData(props: Props): void {
    if (props.type == "profile") {
      const listUsers = API.graphql({
        query: queries.listUsers,
        variables: {
          limit: 20,
          filter: { profileState: { eq: "Complete" } },
          nextToken: this.state.nextToken,
        },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      }) as Promise<GraphQLResult<ListUsersQuery>>
      const processList = (json: GraphQLResult<ListUsersQuery>) => {
        let temp
        if (this.state.data) temp = [...this.state.data, ...(json.data.listUsers.items ?? [])]
        else temp = [...(json.data.listUsers.items ?? [])]
        this.setState(
          {
            data: temp,
            nextToken: json.data.listUsers.nextToken,
          },
          () => {
            this.props.onDataload(this.convertToMapData(this.state.data))
          }
        )
      }
      listUsers.then(processList).catch(processList)
    } else if (props.type == "organization") {
      const listOrgs = API.graphql({
        query: queries.listOrganizations,
        variables: {
          limit: 20,
          filter: { profileState: { eq: "Complete" } },
          nextToken: this.state.nextToken,
        },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      }) as Promise<GraphQLResult<ListOrganizationsQuery>>

      const processList = (json: GraphQLResult<ListOrganizationsQuery>) => {
        console.log({ profile: json })
        const temp = [...this.state.data, ...(json.data.listOrganizations.items ?? [])]
        this.setState(
          {
            data: temp,
            nextToken: json.data.listOrganizations.nextToken,
          },
          () => {
            this.props.onDataload(this.convertToMapData(this.state.data))
          }
        )
      }
      listOrgs.then(processList).catch(processList)
    } else {
      const listGroup = API.graphql({
        query: customQueries.groupByTypeForMyGroups,
        variables: {
          limit: 20,
          type: props.type,
          nextToken: this.state.nextToken,
        },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      }) as Promise<GraphQLResult<GroupByTypeQuery>>

      const processList = (json: GraphQLResult<GroupByTypeQuery>) => {
        if (json.data?.groupByType == null) return
        if (props.type === "event") {
          // sorting events by date
          if (json?.data?.groupByType?.items) {
            json.data.groupByType.items = json.data.groupByType.items.sort((a: any, b: any) =>
              a.time.localeCompare(b.time)
            )
          }
        }
        console.log({ groupData: json })
        this.setCanPay(json.data.groupByType.items)
        this.setIsPaid(json.data.groupByType.items)
        this.setCanLeave(json.data.groupByType.items)
        this.setIsOwner(json.data.groupByType.items)
        let temp: any[]
        if (this.state.data) temp = [...this.state.data, ...(json.data.groupByType.items ?? [])]
        else temp = [...(json.data.groupByType.items ?? [])]
        this.setState(
          {
            data: temp,
            nextToken: json.data.groupByType.nextToken,
          },
          async () => {
            this.props.onDataload(this.convertToMapData(this.state.data))
          }
        )
      }
      listGroup.then(processList).catch(processList)
    }
  }

  canCourseQuickOpen(userActions: UserActions, id: string) {
    if (this.isOwner(id)) return false
    else if (this.isCourseCoach(userActions, id)) return false
    else if (this.isCourseAdmin(userActions, id)) return false
    else if (this.canCoursePay(id)) return false
    else if (this.isCoursePaid(id)) return true
    else if (this.canCourseApply(id)) return false
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
    console.log({ "Navigate to": this.state.openMultiple })
    this.props.navigation.push(this.state.openMultiple)
  }
  async setCanPay(data: any): Promise<void> {
    const courseTriadUserByUser: any = API.graphql({
      query: queries.courseTriadUserByUser,
      variables: { userID: this.state.currentUser },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    })
    courseTriadUserByUser
      .then((json: any) => {
        console.log(json)
        json.data.courseTriadUserByUser.items.map((item: any) => {
          console.log(item.triad.courseInfoID)
          this.setState({
            canPay: this.state.canPay.concat([item.triad.courseInfoID]),
          })
        })
      })
      .catch((err: any) => {
        console.log({ "Error query.getPayment": err })
      })
  }
  async setIsPaid(data: any): Promise<void> {
    data.forEach((item: any) => {
      const getPayment: any = API.graphql({
        query: queries.getPayment,
        variables: { id: item.id + "-" + this.state.currentUser },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })
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
      const groupMemberByUser: any = API.graphql({
        query: queries.groupMemberByUser,
        variables: { userID: this.state.currentUser, groupID: { eq: item.id } },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })
      groupMemberByUser
        .then((json: any) => {
          if (json.data.groupMemberByUser.items.length > 0) {
            this.setState({ canLeave: this.state.canLeave.concat([item.id]) })
          }
        })
        .catch((err: any) => {
          console.log({ "Error query.groupMemberByUser": err })
        })
    })
  }

  async setIsOwner(data: any): Promise<void> {
    data.forEach((item: any) => {
      const getGroup: any = API.graphql({
        query: customQueries.getGroupForOwner,
        variables: { id: item.id },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })
      getGroup
        .then((json: any) => {
          if (json.data.getGroup.owner === this.state.currentUser) {
            this.setState({ isOwner: this.state.isOwner.concat([item.id]) })
          }
        })
        .catch((err: any) => {
          console.log({ "Error query.getGroup": err })
        })
    })
  }
  canLeave(id: string): boolean {
    const test = this.state.canLeave.filter((elem: any) => elem === id)
    if (test.length > 0) return true
    else return false
  }
  canJoin(id: string): boolean {
    const test = this.state.canLeave.filter((elem: any) => elem === id)
    if (test.length > 0) return false
    else return true
  }
  isOwner(id: string): boolean {
    const test = this.state.isOwner.filter((elem: any) => elem === id)
    if (test.length > 0) return true
    else return false
  }

  async join(userActions: UserActions, group: any, groupType: string): Promise<void> {
    Analytics.record({
      name: "joined" + groupType,
      // Attribute values must be strings
      attributes: { id: group.id, name: group.name },
    })
    try {
      const createGroupMember: any = await API.graphql({
        query: mutations.createGroupMember,
        variables: {
          input: { groupID: group.id, userID: this.state.currentUser },
        },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })
      console.log({ "Success mutations.createGroupMember": createGroupMember })
      this.setState({
        canLeave: this.state.canLeave.concat([group.id]),
      })
      this.renderByType(userActions, group, groupType)
    } catch (err) {
      console.log({ "Error mutations.createGroupMember": err })
      this.setState({
        canLeave: this.state.canLeave.concat([group.id]),
      })
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
      const groupMemberByUser: any = await API.graphql({
        query: queries.groupMemberByUser,
        variables: { userID: this.state.currentUser, groupID: { eq: group.id } },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })
      console.log({ "Success queries.groupMemberByUser": groupMemberByUser })
      const groupMember = groupMemberByUser?.data?.groupMemberByUser?.items
      for (let i = 0; i < groupMember?.length; i++) {
        try {
          const deleteGroupMember: any = await API.graphql({
            query: mutations.deleteGroupMember,
            variables: { input: { id: groupMember[i].id } },
            authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
          })
          console.log({ "Success mutations.deleteGroupMember": deleteGroupMember })

          const index = this.state.canLeave.indexOf(group.id)
          const canLeave = this.state.canLeave
          canLeave.splice(index, 1)
          this.setState({
            canLeave: canLeave,
          })
          this.renderByType(userActions, group, groupType)
        } catch (err) {
          console.log({ "Error mutations.deleteGroupMember": err })
          const index = this.state.canLeave.indexOf(group.id)
          const canLeave = this.state.canLeave
          canLeave.splice(index, 1)
          this.setState({
            canLeave: canLeave,
          })
          this.renderByType(userActions, group, groupType)
        }
      }
    } catch (err) {
      console.log({ "Error queries.groupMemberByUser": err })
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
          {this.canJoin(item.id) && !this.isOwner(item.id) ? (
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
          {this.canLeave(item.id) && !this.isOwner(item.id) ? (
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
          {this.isOwner(item.id) ? (
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
                  this.openConversation(item.id, item.user.given_name + " " + item.user.family_name)
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
            ) : item.eventType == "eventbrite" ? (
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={this.styles.style.fontDetailBottom}
              >
                <a target="_blank" rel="noreferrer" href={item.eventUrl}>
                  Eventbrite
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
          {this.canJoin(item.id) && !this.isOwner(item.id) ? (
            <CardItem>
              <JCButton
                buttonType={ButtonTypes.Solid}
                onPress={async () => {
                  await this.join(userActions, item, "Event")
                }}
              >
                Attend
              </JCButton>
              <Right></Right>
            </CardItem>
          ) : null}
          {this.canLeave(item.id) && !this.isOwner(item.id) ? (
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
          {this.isOwner(item.id) ? (
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
          {(!this.isOwner(item.id) && this.canJoin(item.id)) ||
          (!this.isOwner(item.id) && this.canLeave(item.id)) ? (
            <CardItem>
              <JCButton
                buttonType={ButtonTypes.Solid}
                onPress={async () => {
                  if (!this.isOwner(item.id) && this.canJoin(item.id)) {
                    await this.join(userActions, item, "Resource")
                  } else if (!this.isOwner(item.id) && this.canLeave(item.id)) {
                    await this.leave(userActions, item, "Resource")
                  }
                }}
              >
                {this.canJoin(item.id) ? "Join" : this.canLeave(item.id) ? "Leave" : null}
              </JCButton>
              <Right></Right>
            </CardItem>
          ) : null}
          {this.isOwner(item.id) ? (
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
  isCourseCoach(userActions: UserActions, id: string) {
    return userActions.isMemberOf("courseCoach")
  }
  isCourseAdmin(userActions: UserActions, id: string) {
    return userActions.isMemberOf("courseAdmin")
  }
  canCourseApply(id: string) {
    return false
  }

  canCoursePay(id: string) {
    const test = this.state.canPay.filter((elem: any) => elem === id)
    if (test.length > 0) return true && !this.isCoursePaid(id)
    else return false
  }
  isCoursePaid(id: string) {
    const test = this.state.isPaid.filter((elem: any) => elem === id)
    if (test.length > 0) return true
    else return false
  }

  purchase(id: string) {
    this.props.navigation.push("CoursePaymentScreen", { id: id })
  }

  applyCourse(item, type) {
    this.setState({ applyCourse: item })
  }
  renderCourseStatus(userActions: UserActions, item: any): React.ReactNode {
    if (this.isOwner(item.id))
      return (
        <CardItem>
          <Text style={{ fontFamily: "Graphik-Bold-App", color: "#333333" }}>Owner</Text>
          <Right></Right>
        </CardItem>
      )
    else if (this.isCourseCoach(userActions, item.id))
      return (
        <CardItem>
          <Text style={{ fontFamily: "Graphik-Bold-App", color: "#333333" }}>Coach</Text>
          <Right></Right>
        </CardItem>
      )
    else if (this.isCourseAdmin(userActions, item.id))
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
    else if (this.canCourseApply(item.id))
      return (
        <CardItem>
          <JCButton
            buttonType={ButtonTypes.Solid}
            onPress={() => {
              this.applyCourse(item, "Course")
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
    return !this.state.myFilter || this.canLeave(item.id) || this.isOwner(item.id)
  }
  filterEvent = (item: any): boolean => {
    return (
      !(this.props.type === "event") ||
      (this.state.eventFilter && !moment(item.time).isSameOrAfter(moment.now(), "day")) ||
      (!this.state.eventFilter && moment(item.time).isSameOrAfter(moment.now(), "day"))
    )
  }

  renderJoinCourseModal() {
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
  handlePickerChange(itemValue: string) {
    this.setState({ pickerState: itemValue })
    if (itemValue === "Previous Events") {
      this.setState({
        eventFilter: !this.state.eventFilter,
      })
    } else if (itemValue === "Upcoming Events") {
      this.setState({
        eventFilter: this.state.eventFilter,
      })
    } else if (itemValue === "Show All") {
      this.openMultiple()
    } else if (itemValue === "Show Recommended") {
      this.openMultiple()
    } else if (itemValue === this.state.myTitleScreen) {
      this.setState({
        myFilter: !this.state.myFilter,
      })
    } else if (itemValue === "Create") {
      this.createSingle()
    }
  }
  static UserConsumer = UserContext.Consumer
  icon = () => {
    return <Ionicons name="md-eye-outline" style={this.styles.style.resourceIcon} />
  }
  icon2 = () => {
    return <Ionicons name="thumbs-up" style={this.styles.style.resourceIcon} />
  }
  icon3 = () => {
    return <Ionicons name="documents-outline" style={this.styles.style.resourceIcon} />
  }
  icon4 = () => {
    return <Ionicons name="arrow-forward-outline" style={this.styles.style.resourceIcon} />
  }
  icon5 = () => {
    return <Ionicons name="arrow-back-outline" style={this.styles.style.resourceIcon} />
  }
  icon6 = () => {
    return <Ionicons name="add-outline" style={this.styles.style.resourceIcon} />
  }
  getButtonItems() {
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
                                {constants["SETTING_ISVISIBLE_SHOWMYFILTER"] ? (
                                  <JCButton
                                    buttonType={ButtonTypes.TransparentBoldOrange}
                                    testID={"mygroup-showmyfilter-" + this.state.titleString}
                                    onPress={() => {
                                      this.setState({
                                        myFilter: !this.state.myFilter,
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
                        {this.state.data ? (
                          this.state.data.filter(this.filterMy).filter(this.filterEvent).length >
                          0 ? (
                            this.state.data
                              .filter(this.filterMy)
                              .filter(this.filterEvent)
                              .sort((a: any, b: any) => {
                                if (this.state.type == "event" && this.state.eventFilter)
                                  return b.time.localeCompare(a.time)
                                else return 0
                              })
                              .map((item: any, index: number) => {
                                return (
                                  <ErrorBoundry key={index}>
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
                        {this.state.nextToken ? (
                          this.props.showMore ? (
                            this.state.type == "profile" ? (
                              <ListItem
                                noBorder
                                style={this.styles.style.conversationsCard}
                                button
                                onPress={() => {
                                  this.setInitialData(this.props)
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
                                  this.setInitialData(this.props)
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
