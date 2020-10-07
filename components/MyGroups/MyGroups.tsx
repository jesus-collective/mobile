import { Left, Body, StyleProvider, Card, CardItem, ListItem, Right, Container } from 'native-base';
import JCButton, { ButtonTypes } from '../../components/Forms/JCButton'
import ReactTooltip from "react-tooltip";
import * as React from 'react';
import { Text, Dimensions, View, Modal } from 'react-native'
import './MyGroups.css';
import getTheme from '../../native-base-theme/components';
import { Image } from 'react-native'
import * as customQueries from '../../src/graphql-custom/queries';
import * as queries from '../../src/graphql/queries';
import * as mutations from '../../src/graphql/mutations';
import GRAPHQL_AUTH_MODE from 'aws-amplify-react-native'
import { API, Auth, Analytics } from 'aws-amplify';
import ProfileImage from '../../components/ProfileImage/ProfileImage'
import { TouchableOpacity } from 'react-native';
import { constants } from '../../src/constants'
import ErrorBoundry from '../../components/ErrorBoundry'
import moment from 'moment-timezone';
import JCComponent, { JCState } from '../JCComponent/JCComponent';

interface Props {
  navigation: any
  wrap: boolean
  type: string
  showMore: boolean
  onDataload(mapData: MapData[]): void
  showMy?: boolean
}
interface State extends JCState {
  myFilter: boolean
  eventFilter: boolean
  myTitleScreen: string
  openSingle: string
  openMultiple: string
  type: string
  cardWidth: any
  createString: string
  titleString: string
  data: any
  showCreateButton: boolean
  currentUser: string
  nextToken: string | null
  canLeave: any
  isOwner: any
  canPay: any
  isPaid: any

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
    super(props);
    if (props.type == "event") {
      this.state = {
        ...super.getInitialState(),
        myFilter: false || this.props.showMy,
        eventFilter: false,
        myTitleScreen: "My Events",
        openSingle: "EventScreen",
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
        isPaid: []
      }

    }
    else if (props.type == "group") {
      this.state =
      {
        ...super.getInitialState(),
        myFilter: false || this.props.showMy,
        eventFilter: false,
        myTitleScreen: "My Groups",
        openSingle: "GroupScreen",
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
        isPaid: []
      }
    }
    else if (props.type == "resource") {
      this.state =
      {
        ...super.getInitialState(),
        myFilter: false,
        eventFilter: false,
        myTitleScreen: "My Resources",
        openSingle: "ResourceScreen",
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
        isPaid: []
      }

    }
    else if (props.type == "organization") {
      this.state =
      {
        ...super.getInitialState(),
        myFilter: false,
        eventFilter: false,
        myTitleScreen: "My Organizations",
        openSingle: "OrganizationScreen",
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
        isPaid: []
      }

    }
    else if (props.type == "course") {
      this.state =
      {
        ...super.getInitialState(),
        myFilter: false,
        eventFilter: false,
        myTitleScreen: "My Courses",
        openSingle: "CourseOverviewScreen",
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
        isPaid: []
      }

    }
    else if (props.type == "profile") {
      this.state =
      {
        ...super.getInitialState(),
        myFilter: false,
        eventFilter: false,
        myTitleScreen: "My Profiles",
        openSingle: "ProfileScreen",
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
        isPaid: []
      }

    }
    else {
      this.state =
      {
        ...super.getInitialState(),
        myTitleScreen: "",
        myFilter: false,
        eventFilter: false,
        openSingle: "",
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
        isPaid: []
      }
    }

  }
  componentDidMount(): void {
    this.setInitialData(this.props)
    const user = Auth.currentAuthenticatedUser();
    user.then((user: any) => {
      this.setState({ currentUser: user.username })
      if (this.props.type != "profile")
        this.setState({
          showCreateButton: this.props.type == "resource" ?
            user.signInUserSession.accessToken.payload["cognito:groups"]?.includes("admin")
            : this.props.type == "course" ?
              user.signInUserSession.accessToken.payload["cognito:groups"]?.includes("courseAdmin") || user.signInUserSession.accessToken.payload["cognito:groups"]?.includes("admin")
              : this.props.type == "organization" ?
                user.signInUserSession.accessToken.payload["cognito:groups"]?.includes("admin")
                : user.signInUserSession.accessToken.payload["cognito:groups"]?.includes("verifiedUsers")
        })
    })
  }

  convertProfileToMapData(data: any, isOrg?: boolean): MapData[] {

    if (isOrg) {
      return data.map((dataItem) => {
        if (dataItem.location && dataItem.location.latitude && dataItem.location.longitude)
          return {
            latitude: Number(dataItem.location.latitude) + Number(dataItem.location.randomLatitude),
            longitude: Number(dataItem.location.longitude) + Number(dataItem.location.randomLongitude),
            name: dataItem.orgName,
            user: dataItem,
            link: "",
            type: "organization"
          } as MapData
        else return null
      }).filter(o => o)
    } else {
      return data.map((dataItem) => {
        if (dataItem.location && dataItem.location.latitude && dataItem.location.longitude)
          return {
            latitude: Number(dataItem.location.latitude) + Number(dataItem.location.randomLatitude),
            longitude: Number(dataItem.location.longitude) + Number(dataItem.location.randomLongitude),
            name: dataItem.given_name + " " + dataItem.family_name,
            user: dataItem,
            link: "",
            type: "profile"
          } as MapData
        else return null
      }).filter(o => o)
    }

  }

  convertEventToMapData(data: any): MapData[] {
    return data.map((dataItem) => {
      if (dataItem && dataItem.locationLatLong && dataItem.locationLatLong.latitude && dataItem.locationLatLong.longitude && moment(dataItem.time).isAfter(moment().subtract(3, 'day')))
        return {
          latitude: dataItem.locationLatLong.latitude,
          longitude: dataItem.locationLatLong.longitude,
          name: dataItem.name,
          event: dataItem,
          link: "",
          type: "event"
        } as MapData
      else return null
    }).filter(o => o)
  }
  convertToMapData(data: any): MapData[] {
    switch (this.state.type) {
      case "group":
        return []
      case "event":
        return this.convertEventToMapData(data)
      case "resource":
        return []
      case "organization":
        return this.convertProfileToMapData(data, true)
      case "course":
        return []
      case "profile":
        return this.convertProfileToMapData(data)
    }

  }
  setInitialData(props: Props): void {
    if (props.type == "profile") {
      const listUsers: any = API.graphql({
        query: queries.listUsers,
        variables: { limit: 20, filter: { profileState: { eq: "Complete" } }, nextToken: this.state.nextToken },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
      });
      const processList = (json: any) => {

        let temp: any[]
        if (this.state.data)
          temp = [...this.state.data, ...json.data.listUsers.items]
        else
          temp = [...json.data.listUsers.items]
        this.setState({
          data: temp,
          nextToken: json.data.listUsers.nextToken
        }, () => { this.props.onDataload(this.convertToMapData(this.state.data)) })
      }
      listUsers.then(processList).catch(processList)
    } else if (props.type == "organization") {
      const listOrgs: any = API.graphql({
        query: queries.listOrganizations,
        variables: { limit: 20, filter: { profileState: { eq: 'Complete' } }, nextToken: this.state.nextToken },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
      });

      const processList = (json) => {
        console.log({ profile: json })
        const temp = [...this.state.data, ...json.data.listOrganizations.items]
        this.setState({
          data: temp,
          nextToken: json.data.listOrganizations.nextToken
        }, () => { this.props.onDataload(this.convertToMapData(this.state.data)) })
      }
      listOrgs.then(processList).catch(processList)
    } else {
      const listGroup: any = API.graphql({
        query: customQueries.groupByTypeForMyGroups,
        variables: { limit: 20, type: props.type, nextToken: this.state.nextToken },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
      });

      const processList = (json: any) => {
        this.setCanPay(json.data.groupByType.items)
        this.setIsPaid(json.data.groupByType.items)
        this.setCanLeave(json.data.groupByType.items)
        this.setIsOwner(json.data.groupByType.items)
        let temp: any[]
        if (this.state.data)
          temp = [...this.state.data, ...json.data.groupByType.items]
        else
          temp = [...json.data.groupByType.items]
        this.setState({
          data: temp,
          nextToken: json.data.groupByType.nextToken
        }, async () => { this.props.onDataload(this.convertToMapData(this.state.data)) })
      }
      listGroup.then(processList).catch(processList)
    }
  }

  canCourseQuickOpen(id: string) {
    if (this.isOwner(id))
      return (false)
    else if (this.isCourseCoach(id))
      return (false)
    else if (this.isCourseAdmin(id))
      return (false)
    else if (this.canCoursePay(id))
      return (false)
    else if (this.isCoursePaid(id))
      return (true)
    else if (this.canCourseApply(id))
      return (false)
    else
      return (false)

  }
  openSingle(id: string): void {
    console.log({ "Navigate to": this.state.openSingle })
    if (this.state.openSingle == "CourseOverviewScreen" && this.canCourseQuickOpen(id))
      this.props.navigation.push("CourseHomeScreen", { id: id, create: false })
    else
      this.props.navigation.push(this.state.openSingle, { id: id, create: false })

  }
  createSingle(): void {
    console.log({ "Navigate to": this.state.openSingle })
    this.props.navigation.push(this.state.openSingle, { create: true })
  }
  openMultiple(): void {
    console.log({ "Navigate to": this.state.openMultiple })
    this.props.navigation.push(this.state.openMultiple);
  }
  async setCanPay(data: any): Promise<void> {
    const courseTriadUserByUser: any = API.graphql({
      query: queries.courseTriadUserByUser,
      variables: { userID: this.state.currentUser },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
    });
    courseTriadUserByUser.then((json: any) => {
      console.log(json)
      json.data.courseTriadUserByUser.items.map((item: any) => {
        console.log(item.triad.courseInfoID)
        this.setState({ canPay: this.state.canPay.concat([item.triad.courseInfoID]) })
      })
    }).catch((err: any) => {
      console.log({ "Error query.getPayment": err });
    });

  }
  async setIsPaid(data: any): Promise<void> {
    data.forEach((item: any) => {
      const getPayment: any = API.graphql({
        query: queries.getPayment,
        variables: { id: item.id + "-" + this.state.currentUser },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
      });
      getPayment.then((json: any) => {
        console.log(json)
        if (json.data.getPayment != null) {
          this.setState({ isPaid: this.state.isPaid.concat([item.id]) })
        }
      }).catch((err: any) => {
        console.log({ "Error query.getPayment": err });
      });
    })
    //console.log({ isPaid: this.state.isPaid })
  }
  async setCanLeave(data: any): Promise<void> {
    data.forEach((item: any) => {
      const groupMemberByUser: any = API.graphql({
        query: queries.groupMemberByUser,
        variables: { userID: this.state.currentUser, groupID: { eq: item.id } },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
      });
      groupMemberByUser.then((json: any) => {
        if (json.data.groupMemberByUser.items.length > 0) {
          this.setState({ canLeave: this.state.canLeave.concat([item.id]) })
        }
      }).catch((err: any) => {
        console.log({ "Error query.groupMemberByUser": err });
      });
    });
  }

  async setIsOwner(data: any): Promise<void> {
    data.forEach((item: any) => {
      const getGroup: any = API.graphql({
        query: customQueries.getGroupForOwner,
        variables: { id: item.id },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
      });
      getGroup.then((json: any) => {
        if (json.data.getGroup.owner === this.state.currentUser) {
          this.setState({ isOwner: this.state.isOwner.concat([item.id]) })
        }
      }).catch((err: any) => {
        console.log({ "Error query.getGroup": err });
      });
    });
  }
  canLeave(id: string): boolean {
    const test = this.state.canLeave.filter((elem: any) => elem === id)
    if (test.length > 0)
      return true
    else
      return false
  }
  canJoin(id: string): boolean {
    const test = this.state.canLeave.filter((elem: any) => elem === id)
    if (test.length > 0)
      return false
    else
      return true
  }
  isOwner(id: string): boolean {
    const test = this.state.isOwner.filter((elem: any) => elem === id)
    if (test.length > 0)
      return true
    else
      return false
  }

  join(group: any, groupType: string): void {
    Analytics.record({
      name: 'joined' + groupType,
      // Attribute values must be strings
      attributes: { id: group.id, name: group.name }
    });

    const createGroupMember: any = API.graphql({
      query: mutations.createGroupMember,
      variables: { input: { groupID: group.id, userID: this.state.currentUser } },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
    });
    createGroupMember.then((json: any) => {
      console.log({ "Success mutations.createGroupMember": json });
    }).catch((err: any) => {
      console.log({ "Error mutations.createGroupMember": err });
    });

    this.setState({ canLeave: this.state.canLeave.concat([group.id]) })
    this.renderByType(group, groupType)
  }
  openConversation(initialUser: string, name: string): void {
    console.log("Navigate to conversationScreen")
    this.props.navigation.push("ConversationScreen", { initialUserID: initialUser, initialUserName: name });
  }
  leave(group: any, groupType: string): void {
    Analytics.record({
      name: 'left' + groupType,
      // Attribute values must be strings
      attributes: { id: group.id, name: group.name }
    });
    const groupMemberByUser: any = API.graphql({
      query: queries.groupMemberByUser,
      variables: { userID: this.state.currentUser, groupID: { eq: group.id } },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
    });
    groupMemberByUser.then((json: any) => {
      console.log({ "Success queries.groupMemberByUser": json });

      json.data.groupMemberByUser.items.map((item: any) => {
        const deleteGroupMember: any = API.graphql({
          query: mutations.deleteGroupMember,
          variables: { input: { id: item.id } },
          authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
        });
        deleteGroupMember.then((json: any) => {

          console.log({ "Success mutations.deleteGroupMember": json });
        }).catch((err: Error) => {
          console.log({ "Error mutations.deleteGroupMember": err });
        });
      })

      const index = this.state.canLeave.indexOf(group.id)
      const canLeave = this.state.canLeave
      canLeave.splice(index, 1)
      this.setState({ canLeave: canLeave })
      this.renderByType(group, groupType)

    }).catch((err: Error) => {
      console.log({ "Error queries.groupMemberByUser": err });
    });

  }

  renderByType(item: any, type: string): React.ReactNode {
    switch (type) {
      case "group":
        return this.renderGroup(item)
      case "event":
        return this.renderEvent(item)
      case "resource":
        return this.renderResource(item)
      case "organization":
        return this.renderOrganization(item)
      case "course":
        return this.renderCourse(item)
      case "profile":
        return this.renderProfile(item)
    }
  }

  renderGroup(item: any): React.ReactNode {
    return <Card style={[this.styles.style.groupCard, { width: this.state.cardWidth }]} >
      <CardItem style={{ paddingLeft: 0, paddingRight: 0, paddingTop: 10, height: 50, paddingBottom: 0 }} >
        {item.isSponsored === 'true' || item.isSponsored === true ?
          <View style={{ width: this.state.cardWidth, paddingRight: 20, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
            <Text ellipsizeMode='tail' numberOfLines={1} style={this.styles.style.sponsoredTag}>sponsored</Text>
            <Image style={{ margin: 0, padding: 0, width: 40, height: 40, borderRadius: 100, paddingRight: 20, paddingTop: 15 }} source={require('../../assets/icon.png')}></Image>
          </View> : null}
      </CardItem>
      {item.name.length > 54 || item.name.length == 54 ?
        <CardItem style={{ height: 100, paddingTop: 0 }}><Text ellipsizeMode='tail' numberOfLines={3} style={[this.styles.style.fontTitleGroup, { paddingTop: 0 }]} data-tip={item.name}>{item.name}</Text>
          <Image style={{ margin: 0, padding: 0, width: 40, height: 40, borderRadius: 100, alignSelf: 'flex-end' }} source={require('../../assets/icon.png')}></Image>
          <ReactTooltip place="top" type="dark" effect="solid" backgroundColor="#F0493E" className="tooltipStyle" />
        </CardItem>
        : <CardItem style={{ height: 100, paddingTop: 0 }}><Text ellipsizeMode='tail' numberOfLines={3} style={[this.styles.style.fontTitleGroup, { paddingTop: 0 }]}>{item.name}</Text>
        </CardItem>
      }
      <CardItem style={{ height: 100 }}><Text ellipsizeMode='tail' numberOfLines={3} style={this.styles.style.fontDetailMiddle}>{item.description}</Text></CardItem>
      {
        constants.SETTING_ISVISIBLE_MEMBER_COUNT ?
          <CardItem>
            <Image style={{ width: "22px", height: "22px", marginRight: 5 }} source={require('../../assets/svg/user.svg')}></Image>
            <Text ellipsizeMode='tail' numberOfLines={1} style={this.styles.style.fontDetailBottom}>Members: {item.memberCount}</Text>
          </CardItem>
          : null
      }
      {this.canJoin(item.id) && !this.isOwner(item.id) ? <CardItem ><JCButton buttonType={ButtonTypes.Solid} onPress={() => { this.join(item, "Group") }}>Join</JCButton><Right></Right></CardItem> : null}
      {this.canLeave(item.id) && !this.isOwner(item.id) ? <CardItem ><JCButton buttonType={ButtonTypes.Solid} onPress={() => { this.leave(item, "Group") }}>Leave</JCButton><Right></Right></CardItem> : null}
      {this.isOwner(item.id) ? <CardItem ><JCButton buttonType={ButtonTypes.Solid} onPress={() => null}>Owner</JCButton><Right></Right></CardItem> : null}
    </Card >
  }
  renderProfile(item: any): React.ReactNode {
    return <Card key={item.id} style={this.styles.style.profilesCard}>
      <CardItem style={this.styles.style.profileCard}>
        <Left style={{ paddingTop: 15 }}>
          <ProfileImage user={item} size="small3"></ProfileImage>
          <Body>
            <Text style={this.styles.style.fontConnectWithName}>{item.given_name} {item.family_name}</Text>
            <Text style={this.styles.style.fontConnectWithRole}>{item.currentRole}</Text>
            <JCButton buttonType={ButtonTypes.OutlineSmall} onPress={() => { this.openConversation(item.id, item.user.given_name + " " + item.user.family_name) }}>Start Conversation</JCButton>
          </Body>
        </Left>
      </CardItem>
    </Card>
  }
  renderEvent(item: any): React.ReactNode {
    const zone = moment.tz.guess()
    return <Card style={[this.styles.style.eventCard, { width: this.state.cardWidth }]}>
      <CardItem style={{ paddingLeft: 0, paddingRight: 0, paddingTop: 10, height: 50, paddingBottom: 0 }} >
        {item.isSponsored === 'true' || item.isSponsored === true ?
          <View style={{ width: this.state.cardWidth, paddingRight: 20, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
            <Text ellipsizeMode='tail' numberOfLines={1} style={this.styles.style.sponsoredTag}>sponsored</Text>
            <Image style={{ margin: 0, padding: 0, width: 40, height: 40, borderRadius: 100, paddingRight: 20, paddingTop: 15 }} source={require('../../assets/icon.png')}></Image>
          </View> : null}
      </CardItem>
      <CardItem style={{ paddingTop: 0 }}>
        <Text numberOfLines={1} style={[this.styles.style.fontDetailTop, { paddingTop: 0 }]}>{moment.tz(item.time, zone).format('ddd, MMM D, h:mm a')} {moment.tz.zone(zone).abbr(+moment(item.time).format('x'))}</Text>
      </CardItem>
      {
        item.name.length > 54 || item.name.length == 54 ?
          <CardItem style={{ height: 60, marginTop: 8 }}><Text ellipsizeMode='tail' numberOfLines={3} style={this.styles.style.fontTitle} data-tip={item.name}>{item.name}</Text>
            <ReactTooltip place="top" type="dark" effect="solid" backgroundColor="#F0493E" className="tooltipStyle" />
          </CardItem>
          : <CardItem style={{ height: 60, marginTop: 8 }}><Text ellipsizeMode='tail' numberOfLines={3} style={this.styles.style.fontTitle}>{item.name}</Text>
          </CardItem>
      }
      <CardItem style={{ height: 80 }}><Text ellipsizeMode='tail' numberOfLines={3} style={this.styles.style.fontDetailMiddle}>{item.description}</Text></CardItem>

      <CardItem>
        <Image style={{ width: "22px", height: "22px", marginRight: 5 }} source={require('../../assets/svg/pin 2.svg')}></Image>
        {item.eventType == "location" ?
          <Text ellipsizeMode='tail' numberOfLines={1} style={this.styles.style.fontDetailBottom}><a target="_blank" rel="noreferrer" href={"https://www.google.com/maps/dir/?api=1&destination=" + escape(item.location)}>{item.location}</a></Text>
          : item.eventType == "eventbrite" ?
            <Text ellipsizeMode='tail' numberOfLines={1} style={this.styles.style.fontDetailBottom}><a target="_blank" rel="noreferrer" href={item.eventUrl}>Eventbrite</a></Text>
            : <Text ellipsizeMode='tail' numberOfLines={1} style={this.styles.style.fontDetailBottom}><a target="_blank" rel="noreferrer" href={item.eventUrl}>Zoom</a></Text>
        }
      </CardItem>
      {this.canJoin(item.id) && !this.isOwner(item.id) ? <CardItem ><JCButton buttonType={ButtonTypes.Solid} onPress={() => { this.join(item, "Event") }}>Attend</JCButton><Right></Right></CardItem> : null}
      {this.canLeave(item.id) && !this.isOwner(item.id) ? <CardItem ><JCButton buttonType={ButtonTypes.Solid} onPress={() => { this.leave(item, "Event") }}>Don&apos;t Attend</JCButton><Right></Right></CardItem> : null}
      {this.isOwner(item.id) ? <CardItem ><JCButton buttonType={ButtonTypes.Solid} onPress={() => null}>Owner</JCButton><Right></Right></CardItem> : null}
    </Card >
  }
  renderResource(item: any): React.ReactNode {
    return <Card style={[this.styles.style.resourceCard, { width: this.state.cardWidth }]}>
      <CardItem bordered style={{ paddingLeft: 0, paddingRight: 0, paddingTop: 0, paddingBottom: 0, width: this.state.cardWidth, right: 5 }}>
        <Image style={{ margin: 0, padding: 0, width: this.state.cardWidth, height: 70 }} source={require('../../assets/svg/pattern.svg')}></Image>
      </CardItem>
      {item.name.length > 29 || item.name.length == 29 ?
        <CardItem ><Text ellipsizeMode='tail' numberOfLines={3} style={this.styles.style.fontTitleGroup} data-tip={item.name}>{item.name}</Text>
          <ReactTooltip place="top" type="dark" effect="solid" backgroundColor="#F0493E" className="tooltipStyle" /></CardItem>
        : <CardItem ><Text ellipsizeMode='tail' numberOfLines={3} style={this.styles.style.fontTitleGroup}>{item.name}</Text></CardItem>}
      <CardItem ><Text ellipsizeMode='tail' numberOfLines={1} style={this.styles.style.fontDetailMiddle}>Last Updated: {item.lastupdated}</Text></CardItem>
      {this.canJoin(item.id) && !this.isOwner(item.id) ? <CardItem ><JCButton buttonType={ButtonTypes.Solid} onPress={() => { this.join(item, "Resource") }}>Join</JCButton><Right></Right></CardItem> : null}
      {this.canLeave(item.id) && !this.isOwner(item.id) ? <CardItem ><JCButton buttonType={ButtonTypes.Solid} onPress={() => { this.leave(item, "Resource") }}>Leave</JCButton><Right></Right></CardItem> : null}
      {this.isOwner(item.id) ? <CardItem ><JCButton buttonType={ButtonTypes.Solid} onPress={() => null}>Owner</JCButton><Right></Right></CardItem> : null}
    </Card>
  }
  renderOrganization(item: any): React.ReactNode {
    return <Card style={[this.styles.style.resourceCard, { width: this.state.cardWidth }]}>
      <CardItem ><ProfileImage size="small" user={item}></ProfileImage></CardItem>
      <CardItem ><Text ellipsizeMode='tail' numberOfLines={3} style={this.styles.style.fontTitle}>{item.orgName}</Text></CardItem>
      <CardItem ><JCButton buttonType={ButtonTypes.Outline} onPress={() => null}>View</JCButton><Right></Right></CardItem>
    </Card>
  }
  isCourseCoach(id) {
    return this.isMemberOf("courseCoach")
  }
  isCourseAdmin(id) {
    return this.isMemberOf("courseAdmin")
  }
  canCourseApply(id) {
    return false
  }

  canCoursePay(id) {
    const test = this.state.canPay.filter((elem: any) => elem === id)
    if (test.length > 0)
      return true && !this.isCoursePaid(id)
    else
      return false
  }
  isCoursePaid(id: string) {
    const test = this.state.isPaid.filter((elem: any) => elem === id)
    if (test.length > 0)
      return true
    else
      return false
  }

  purchase(id: string) {
    this.props.navigation.push("CoursePaymentScreen", { id: id })
  }

  applyCourse(item, type) {
    this.setState({ applyCourse: item })
  }
  renderCourseStatus(item: any): React.ReactNode {
    if (this.isOwner(item.id))
      return (<CardItem ><Text style={{ fontFamily: "Graphik-Bold-App", color: "#333333" }}>Owner</Text><Right></Right></CardItem>)
    else if (this.isCourseCoach(item.id))
      return (<CardItem ><Text style={{ fontFamily: "Graphik-Bold-App", color: "#333333" }}>Coach</Text><Right></Right></CardItem>)
    else if (this.isCourseAdmin(item.id))
      return (<CardItem ><Text style={{ fontFamily: "Graphik-Bold-App", color: "#333333" }}>Admin</Text><Right></Right></CardItem>)
    else if (this.canCoursePay(item.id))
      return (<CardItem ><JCButton buttonType={ButtonTypes.Solid} onPress={() => { this.purchase(item.id) }}>Pay</JCButton><Right></Right></CardItem>)
    else if (this.isCoursePaid(item.id))
      return (<CardItem ><Text style={{ fontFamily: "Graphik-Bold-App", color: "#333333" }}>Purchased</Text><Right></Right></CardItem>)
    else if (this.canCourseApply(item.id))
      return (<CardItem ><JCButton buttonType={ButtonTypes.Solid} onPress={() => { this.applyCourse(item, "Course") }}>Apply</JCButton><Right></Right></CardItem>)
    else
      return (<CardItem ><Text style={{ fontFamily: "Graphik-Bold-App", color: "#333333" }}>Closed</Text><Right></Right></CardItem>)
  }
  renderCourse(item: any): React.ReactNode {
    return <Card style={[this.styles.style.courseCard, { width: this.state.cardWidth }]}>
      <CardItem bordered style={{ paddingLeft: 0, paddingRight: 0, paddingTop: 0, paddingBottom: 0, width: this.state.cardWidth, right: 5 }}>
        <Image style={{ margin: 0, padding: 0, width: this.state.cardWidth, height: 70 }} source={require('../../assets/svg/pattern.svg')}></Image>
      </CardItem>
      <CardItem >
        <Text ellipsizeMode='tail' numberOfLines={3} style={this.styles.style.fontTitleGroup} data-tip={item.name}>{item.name}</Text>
        <ReactTooltip place="top" type="dark" effect="solid" backgroundColor="#F0493E" className="tooltipStyle" />
      </CardItem>
      <CardItem ><Text ellipsizeMode='tail' numberOfLines={1} style={this.styles.style.fontDetail}>Last Updated: {item.lastupdated}</Text></CardItem>
      {this.renderCourseStatus(item)}
    </Card>
  }
  filterMy = (item: any): boolean => {
    return !this.state.myFilter || this.canLeave(item.id) || this.isOwner(item.id)
  }
  filterEvent = (item: any): boolean => {
    return !(this.props.type === "event") ||
      this.state.eventFilter && !moment(item.time).isSameOrAfter(moment.now()) ||
      !this.state.eventFilter && moment(item.time).isSameOrAfter(moment.now())
  }

  renderJoinCourseModal() {
    return (this.state.joinCourse ?
      <View style={{ overflow: 'none', height: "100vh", width: "100vw", position: "absolute", top: "0px", left: "0px" }}>
        <Modal style={{ overflow: 'hidden' }} transparent={true}
          visible={this.state.joinCourse}>
          <View style={{ backgroundColor: 'white', borderRadius: 20, padding: 35, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, }}>
            <JCButton buttonType={ButtonTypes.Outline} onPress={() => { this.setState({ joinCourse: null }) }}>X</JCButton>
            <Text>Applications are currently closed, please check back later.</Text>
          </View>
        </Modal>
      </View>
      : null)
  }
  render(): React.ReactNode {
    const deviceWidth = Dimensions.get('window').width;

    if (!constants["SETTING_ISVISIBLE_" + this.state.type])
      return null
    else if (this.state.type == "course" && (!this.isMemberOf("courseUser") && !this.isMemberOf("courseCoach") && !this.isMemberOf("courseAdmin"))) {
      return null
    }
    else
      if (this.state.titleString == null)
        return null
      else
        return (
          <ErrorBoundry>

            <StyleProvider style={getTheme()}>
              <>
                <Container style={{ padding: 10, minHeight: 525, width: "100%", flexDirection: 'column', justifyContent: 'flex-start' }}>
                  <Container style={this.styles.style.sectionHeadingDashboard} >
                    <JCButton buttonType={ButtonTypes.TransparentBoldBlack} onPress={() => { this.openMultiple() }}>{this.state.titleString}</JCButton>
                    <Container style={{ maxHeight: 45, flexDirection: 'row', justifyContent: 'flex-end', alignItems: "flex-start" }}>
                      <JCButton buttonType={ButtonTypes.TransparentBoldOrange} data-testid={"mygroup-showall-" + this.state.titleString} onPress={() => { this.openMultiple() }}>Show All</JCButton>
                      {constants["SETTING_ISVISIBLE_SHOWRECOMMENDED"] ? <JCButton buttonType={ButtonTypes.TransparentBoldOrange} data-testid={"mygroup-recommmended-" + this.state.titleString} onPress={() => { this.openMultiple() }}>Show Recommended</JCButton> : null}
                      {constants["SETTING_ISVISIBLE_SHOWMYFILTER"] ? <JCButton buttonType={ButtonTypes.TransparentBoldOrange} data-testid={"mygroup-showmyfilter-" + this.state.titleString} onPress={() => { this.setState({ myFilter: !this.state.myFilter }) }}>{this.state.myTitleScreen}</JCButton> : null}
                      {constants["SETTING_ISVISIBLE_SHOWEVENTFILTER"] && this.props.type == "event" && (deviceWidth >= 950 || this.props.wrap) ? <JCButton buttonType={ButtonTypes.TransparentBoldOrange} data-testid={"mygroup-showeventfilter-" + this.state.titleString} onPress={() => { this.setState({ eventFilter: !this.state.eventFilter }) }}>{this.state.eventFilter ? "Upcoming Events" : "Previous Events"}</JCButton> : null}
                      {this.state.showCreateButton && constants["SETTING_ISVISIBLE_CREATE_" + this.state.type] ?
                        <JCButton buttonType={ButtonTypes.OutlineBold} data-testid={"mygroup-create-" + this.state.titleString} onPress={() => { this.createSingle() }}>{(deviceWidth < 950 && !this.props.wrap) ? "+" : this.state.createString}</JCButton>
                        : null
                      }
                    </Container>
                  </Container>

                  <Container style={(this.props.wrap && this.props.type != "profile") ? this.styles.style.ResourcesMyGroupsWrap : (this.props.wrap && this.props.type == "profile") ? this.styles.style.profileMyGroupsWrap : this.styles.style.ResourcesMyGroupsNoWrap}>
                    {this.state.data ?
                      this.state.data.filter(this.filterMy).filter(this.filterEvent).length > 0 ?
                        this.state.data.filter(this.filterMy).filter(this.filterEvent).map((item: any, index: number) => {

                          return (
                            <ErrorBoundry key={index}>
                              <ListItem noBorder style={this.styles.style.conversationsCard} button onPress={() => { this.openSingle(item.id) }}>
                                {this.renderByType(item, this.state.type)}
                              </ListItem>
                            </ErrorBoundry>
                          )
                        })
                        : <Text style={this.styles.style.noCardFontTitle}>No {this.state.type == "event" ? this.state.eventFilter ? "previous " : "upcoming " : ""}{this.state.type}s</Text>
                      : <Text style={this.styles.style.loadingFontTitle}>Loading {this.state.type}s</Text>
                    }
                    {this.state.nextToken ?
                      this.props.showMore ?
                        this.state.type == "profile" ?
                          <ListItem noBorder style={this.styles.style.conversationsCard} button onPress={() => { this.setInitialData(this.props) }}>

                            <Card style={[this.styles.style.profilesCard, { width: this.state.cardWidth }]}>

                              <CardItem style={this.styles.style.profileCard}  >
                                <Text ellipsizeMode='tail' numberOfLines={3}
                                  style={this.styles.style.groupsLoadMoreFont}>Load more...</Text>
                              </CardItem>
                            </Card>
                          </ListItem>
                          :
                          <TouchableOpacity style={{ top: 15, height: 80 }} onPress={() => { this.setInitialData(this.props) }} >
                            <Card style={[this.styles.style.groupMoreCard, { width: this.state.cardWidth }]}>
                              <CardItem style={{ backgroundColor: "none", alignItems: "center" }}
                              ><Text
                                ellipsizeMode='tail'
                                numberOfLines={3}
                                style={this.styles.style.groupsLoadMoreFont}>Load more...</Text>
                              </CardItem>
                            </Card>
                          </TouchableOpacity>
                        : null
                      : null}
                  </Container>
                </Container>
                {this.renderJoinCourseModal()}
              </>
            </StyleProvider>
          </ErrorBoundry>
        )
  }
}