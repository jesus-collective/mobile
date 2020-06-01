import { Left, Body, StyleProvider, Card, CardItem, List, ListItem, Right, Container } from 'native-base';
import JCButton, { ButtonTypes } from '../../components/Forms/JCButton'

import * as React from 'react';
import { Text } from 'react-native'
import styles from '../style'
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import { FontAwesome5 } from '@expo/vector-icons';
import { Image } from 'react-native'
import * as queries from '../../src/graphql/queries';
import * as mutations from '../../src/graphql/mutations';
import GRAPHQL_AUTH_MODE, { Greetings } from 'aws-amplify-react-native'
import { API, graphqlOperation, Auth, Analytics } from 'aws-amplify';
import ProfileImage from '../../components/ProfileImage/ProfileImage'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { constants } from '../../src/constants'
import ErrorBoundry from '../../components/ErrorBoundry'
import Item from '../../native-base-theme/components/Item';
var moment = require('moment');

interface Props {
  navigation: any
  wrap: Boolean
  type: String
  showMore: Boolean
  onDataload(data: any): any
}
interface State {
  openSingle: string
  openMultiple: string
  type: String
  cardWidth: any
  createString: String
  titleString: String
  data: any
  showCreateButton: Boolean
  currentUser: String
  nextToken: any
  canLeave: any
  isOwner: any
}

export default class MyGroups extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    if (props.type == "event") {
      this.state = {
        openSingle: "EventScreen",
        openMultiple: "EventsScreen",
        createString: "+ Create Event",
        titleString: "Events",
        type: props.type,
        cardWidth: 350,
        data: [],
        showCreateButton: false,
        currentUser: null,
        nextToken: null,
        canLeave: [],
        isOwner: []
      }

    }
    else if (props.type == "group") {
      this.state =
      {
        openSingle: "GroupScreen",
        openMultiple: "GroupsScreen",
        createString: "+ Create Group",
        titleString: "Groups",
        type: props.type,
        cardWidth: 350,
        data: [],
        showCreateButton: false,
        currentUser: null,
        nextToken: null,
        canLeave: [],
        isOwner: []
      }
    }
    else if (props.type == "resource") {
      this.state =
      {
        openSingle: "ResourceScreen",
        openMultiple: "ResourcesScreen",
        createString: "+ Create Resource",
        titleString: "Resources",
        type: props.type,
        cardWidth: 200,
        data: [],
        showCreateButton: false,
        currentUser: null,
        nextToken: null,
        canLeave: [],
        isOwner: []
      }

    }
    else if (props.type == "organization") {
      this.state =
      {
        openSingle: "OrganizationScreen",
        openMultiple: "OrganizationsScreen",
        createString: "+ Create Organization",
        titleString: "Organizations",
        type: props.type,
        cardWidth: 200,
        data: [],
        showCreateButton: false,
        currentUser: null,
        nextToken: null,
        canLeave: [],
        isOwner: []
      }

    }
    else if (props.type == "course") {
      this.state =
      {
        openSingle: "CourseHomeScreen",
        openMultiple: "CoursesScreen",
        createString: "+ Create Course",
        titleString: "Courses",
        type: props.type,
        cardWidth: 200,
        data: [],
        showCreateButton: false,
        currentUser: null,
        nextToken: null,
        canLeave: [],
        isOwner: []
      }

    }
    else if (props.type == "profile") {
      this.state =
      {
        openSingle: "ProfileScreen",
        openMultiple: "ProfilesScreen",
        createString: "+ Create Course",
        titleString: "Profiles",
        type: props.type,
        cardWidth: 200,
        data: [],
        showCreateButton: false,
        currentUser: null,
        nextToken: null,
        canLeave: [],
        isOwner: []
      }

    }
    else {
      this.state =
      {
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
        isOwner: []
      }
    }
    this.setInitialData(props)
    var user = Auth.currentAuthenticatedUser();
    user.then((user: any) => {
      this.setState({ currentUser: user.username })
      if (props.type != "profile")
        this.setState({ showCreateButton: user.signInUserSession.accessToken.payload["cognito:groups"].includes("verifiedUsers") })
    })

  }
  convertProfileToMapData(data) {
    return [{
      latitude: 30.01,
      longitude: 40.02,
      name: "Bob",
      link: "",
      type: "profile"
    }]
  }
  convertEventToMapData(data) {
    return data.map((dataItem) => {
      if (dataItem.locationLatLong && dataItem.locationLatLong.latitude && dataItem.locationLatLong.longitude)
        return {
          latitude: dataItem.locationLatLong.latitude,
          longitude: dataItem.locationLatLong.longitude,
          name: dataItem.name,
          link: "",
          type: "event"
        }
      else return null
    }).filter(o => o)
  }
  convertToMapData(data) {
    switch (this.state.type) {
      case "group":
        return []
      case "event":
        return this.convertEventToMapData(data)
      case "resource":
        return []
      case "organization":
        return []
      case "course":
        return []
      case "profile":
        return this.convertProfileToMapData(data)
    }

  }
  setInitialData(props) {
    if (props.type == "profile") {
      var listUsers: any = API.graphql({
        query: queries.listUsers,
        variables: { limit: 20, filter: { profileState: { eq: "Complete" } }, nextToken: this.state.nextToken },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
      });
      var processList = (json) => {
        console.log({ profile: json })
        var temp = [...this.state.data, ...json.data.listUsers.items]
        this.setState({
          data: temp,
          nextToken: json.data.listUsers.nextToken
        }, () => { this.props.onDataload(this.convertToMapData(this.state.data)) })
      }
      listUsers.then(processList).catch(processList)
    }
    else {
      var listGroup: any = API.graphql({
        query: queries.groupByType,
        variables: { limit: 20, type: props.type, nextToken: this.state.nextToken },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
      });

      var processList = (json) => {
        console.log({ profile: json })
        this.setCanLeave(json.data.groupByType.items)
        this.setIsOwner(json.data.groupByType.items)
        var temp = [...this.state.data, ...json.data.groupByType.items]
        this.setState({
          data: temp,
          nextToken: json.data.groupByType.nextToken
        }, () => { this.props.onDataload(this.convertToMapData(this.state.data)) })
      }
      listGroup.then(processList).catch(processList)
    }
  }
  openSingle(id: any) {
    console.log({ "Navigate to": this.state.openSingle })
    // console.log(id)
    this.props.navigation.push(this.state.openSingle, { id: id, create: false })
  }
  createSingle() {
    console.log({ "Navigate to": this.state.openSingle })
    this.props.navigation.push(this.state.openSingle, { create: true })
  }
  openMultiple() {
    console.log({ "Navigate to": this.state.openMultiple })
    this.props.navigation.push(this.state.openMultiple);
  }
  setCanLeave(data: any) {
    data.forEach((item: any) => {
      var groupMemberByUser: any = API.graphql({
        query: queries.groupMemberByUser,
        variables: { userID: this.state.currentUser, groupID: { eq: item.id } },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
      });
      groupMemberByUser.then((json: any) => {
        console.log({ "groupMemberByUser": json })
        if (json.data.groupMemberByUser.items.length > 0) {
          this.setState({ canLeave: this.state.canLeave.concat([item.id]) })
        }
      }).catch((err: any) => {
        console.log({ "Error query.groupMemberByUser": err });
      });
    });
  }

  setIsOwner(data: any) {
    data.forEach((item: any) => {
      var getGroup: any = API.graphql({
        query: queries.getGroup,
        variables: { id: item.id, owner: { eq: this.state.currentUser } },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
      });
      getGroup.then((json: any) => {
        console.log({ "getGroup": json })
        if (json.data.getGroup) {
          this.setState({ isOwner: this.state.isOwner.concat([item.id]) })
        }
      }).catch((err: any) => {
        console.log({ "Error query.getGroup": err });
      });
    });
  }
  canLeave(id: any): boolean {
    var test = this.state.canLeave.filter((elem)=>elem===id)
    if (test.length > 0)
      return true
    else 
      return false
  }
  canJoin(id: any): boolean {
    var test = this.state.canLeave.filter((elem)=>elem===id)
    if (test.length > 0) 
      return false
    else  
      return true
  }
  isOwner(id: any): boolean {
    var test = this.state.isOwner.filter((elem)=>elem===id)
    if (test.length > 0)
      return true
    else
      return false
  }

  join(group: any, groupType: any) {
    Analytics.record({
      name: 'joined' + groupType,
      // Attribute values must be strings
      attributes: { id: group.id, name: group.name }
    });

    var createGroupMember: any = API.graphql({
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
  openConversation() {

  }
  leave(group: any, groupType: any) {
    Analytics.record({
      name: 'left' + groupType,
      // Attribute values must be strings
      attributes: { id: group.id, name: group.name }
    });
    var groupMemberByUser: any = API.graphql({
      query: queries.groupMemberByUser,
      variables: { userID: this.state.currentUser, groupID: { eq: group.id } },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
    });
    groupMemberByUser.then((json: any) => {
      console.log({ "Success queries.groupMemberByUser": json });

      json.data.groupMemberByUser.items.map((item) => {
        var deleteGroupMember: any = API.graphql({
          query: mutations.deleteGroupMember,
          variables: { input: { id: item.id } },
          authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
        });
        deleteGroupMember.then((json: any) => {

          console.log({ "Success mutations.deleteGroupMember": json });
        }).catch((err: any) => {
          console.log({ "Error mutations.deleteGroupMember": err });
        });
      })

      const index = this.state.canLeave.indexOf(group.id)
      var canLeave = this.state.canLeave
      canLeave.splice(index, 1)
      this.setState({ canLeave: canLeave })
      this.renderByType(group, groupType)

    }).catch((err: any) => {
      console.log({ "Error queries.groupMemberByUser": err });
    });

  }

  renderByType(item:any, type: string) {
    switch (type) {
      case "group":
        this.renderGroup(item)
      case "event":
        this.renderEvent(item)
      case "resource":
        this.renderResource(item)
      case "organization":
        this.renderOrganization(item)
      case "course":
        this.renderCourse(item)
      case "profile":
        this.renderProfile(item)
    }
  }

  renderGroup(item: any) {
    return <Card style={{ height: 365, alignSelf: "flex-start", padding: '0%', paddingLeft: '0.25rem', paddingRight: '0.25rem', borderRadius: 4, boxShadow: "0px 5px 30px rgba(0, 0, 0, 0.05)", borderStyle: "solid", borderColor: "#FFFFFF", width: this.state.cardWidth }
    } >
      <CardItem bordered style={{ paddingLeft: 0, paddingRight: 0, paddingTop: 0, paddingBottom: 0 }} >
        <Image style={{ margin: 0, padding: 0, width: this.state.cardWidth, height: 70 }} source={require('../../assets/svg/pattern.svg')}></Image>
      </CardItem>
      <CardItem style={{ height: 100 }}><Text ellipsizeMode='tail' numberOfLines={3} style={styles.fontTitleGroup}>{item.name}</Text></CardItem>
      <CardItem style={{ height: 100 }}><Text ellipsizeMode='tail' numberOfLines={3} style={styles.fontDetailMiddle}>{item.description}</Text></CardItem>
      {this.canJoin(item.id) && !this.isOwner(item.id) ? <CardItem ><JCButton buttonType={ButtonTypes.Solid} onPress={() => { this.join(item, "Group") }}>Join</JCButton><Right></Right></CardItem> : null}
      {this.canLeave(item.id) && !this.isOwner(item.id) ? <CardItem ><JCButton buttonType={ButtonTypes.Solid} onPress={() => { this.leave(item, "Group") }}>Leave</JCButton><Right></Right></CardItem> : null}
      {this.isOwner(item.id)  ? <CardItem ><JCButton buttonType={ButtonTypes.Solid} onPress={()=>null}>Owner</JCButton><Right></Right></CardItem> : null}
    </Card >
  }
  renderProfile(item: any) {
    return <Card key={item.id} style={styles.profilesCard}>
      <CardItem style={{ padding: '0%', paddingLeft: '1.5rem', paddingRight: '1.5rem', borderRadius: 4, boxShadow: "0px 5px 30px rgba(0, 0, 0, 0.05)", borderStyle: "solid", borderColor: "#FFFFFF" }}>
        <Left>
          <ProfileImage user={item} size="small"></ProfileImage>
          <Body>
            <Text style={styles.fontConnectWithName}>{item.given_name} {item.family_name}</Text>
            <Text style={styles.fontConnectWithRole}>{item.currentRole}</Text>
            <JCButton buttonType={ButtonTypes.OutlineSmall} onPress={() => { this.openConversation() }}>Start Conversation</JCButton>
          </Body>
        </Left>
      </CardItem>
    </Card>
  }
  renderEvent(item: any) {
    return <Card style={{ minHeight: 395, alignSelf: "flex-start", padding: '0%', paddingLeft: '0.25rem', paddingRight: '0.25rem', borderRadius: 4, boxShadow: "0px 5px 30px rgba(0, 0, 0, 0.05)", borderStyle: "solid", borderColor: "#FFFFFF", width: this.state.cardWidth }}>
      <CardItem ><Text ellipsizeMode='tail' numberOfLines={1} style={styles.fontDetailTop}>{moment(item.time).format('MMMM Do YYYY, h:mm a')}</Text></CardItem>
      <CardItem style={{ height: 100 }}><Text ellipsizeMode='tail' numberOfLines={3} style={styles.fontTitle}>{item.name}</Text></CardItem>
      <CardItem style={{ height: 100 }}><Text ellipsizeMode='tail' numberOfLines={3} style={styles.fontDetailMiddle}>{item.description}</Text></CardItem>
      <CardItem>
        {item.eventType == "location" ?
          <Text ellipsizeMode='tail' numberOfLines={1} style={styles.fontDetailBottom}><a target="_blank" href={"https://www.google.com/maps/dir/?api=1&destination=" + escape(item.location)}>{item.location}</a></Text>
          : item.eventType == "zoom" ?
            <Text ellipsizeMode='tail' numberOfLines={1} style={styles.fontDetailBottom}><a target="_blank" href={item.eventUrl}>Zoom</a></Text>
            :
            <Text ellipsizeMode='tail' numberOfLines={1} style={styles.fontDetailBottom}><a target="_blank" href={item.eventUrl}>Eventbrite</a></Text>
        }
      </CardItem>
      {this.canJoin(item.id) && !this.isOwner(item.id) ? <CardItem ><JCButton buttonType={ButtonTypes.Solid} onPress={() => { this.join(item, "Event") }}>Attend</JCButton><Right></Right></CardItem> : null}
      {this.canLeave(item.id) && !this.isOwner(item.id) ? <CardItem ><JCButton buttonType={ButtonTypes.Solid} onPress={() => { this.leave(item, "Event") }}>Don't Attend</JCButton><Right></Right></CardItem> : null}
      {this.isOwner(item.id) ? <CardItem ><JCButton buttonType={ButtonTypes.Solid} onPress={()=>null}>Owner</JCButton><Right></Right></CardItem> : null}
    </Card>
  }
  renderResource(item: any) {
    return <Card style={{ minHeight: 330, alignSelf: "flex-start", padding: '0%', paddingLeft: '0.25rem', paddingRight: '0.25rem', borderRadius: 4, boxShadow: "0px 5px 30px rgba(0, 0, 0, 0.05)", borderStyle: "solid", borderColor: "#FFFFFF", width: this.state.cardWidth }}>
      <CardItem bordered style={{ paddingLeft: 0, paddingRight: 0, paddingTop: 0, paddingBottom: 0 }}>
        <Image style={{ margin: 0, padding: 0, width: this.state.cardWidth, height: 70 }} source={require('../../assets/svg/pattern.svg')}></Image>
      </CardItem>
      <CardItem ><Text ellipsizeMode='tail' numberOfLines={3} style={styles.fontTitleGroup}>{item.name}</Text></CardItem>
      <CardItem ><Text ellipsizeMode='tail' numberOfLines={1} style={styles.fontDetailMiddle}>Last Updated: {item.lastupdated}</Text></CardItem>
      {true ? <CardItem ><JCButton buttonType={ButtonTypes.Solid} onPress={() => { this.join(item, "Resource") }}>Join</JCButton><Right></Right></CardItem> : null}
      {false ? <CardItem ><JCButton buttonType={ButtonTypes.Solid} onPress={() => { this.leave(item, "Resource") }}>Leave</JCButton><Right></Right></CardItem> : null}
    </Card>
  }
  renderOrganization(item: any) {
    return <Card style={{ minHeight: 330, alignSelf: "flex-start", padding: '0%', paddingLeft: '0.25rem', paddingRight: '0.25rem', borderRadius: 4, boxShadow: "0px 5px 30px rgba(0, 0, 0, 0.05)", width: this.state.cardWidth }}>
      <CardItem bordered style={{ paddingLeft: 0, paddingRight: 0, paddingTop: 0, paddingBottom: 0 }}>
        <Image style={{ margin: 0, padding: 0, width: this.state.cardWidth, height: 20 }} source={require('../../assets/svg/pattern.svg')}></Image>
      </CardItem>
      <CardItem ><Text ellipsizeMode='tail' numberOfLines={3} style={styles.fontTitle}>{item.name}</Text></CardItem>
      <CardItem ><Text ellipsizeMode='tail' numberOfLines={1} style={styles.fontDetail}>{item.kind}</Text></CardItem>
      {true ? <CardItem ><JCButton buttonType={ButtonTypes.Solid} onPress={() => { this.join(item, "Organization") }}>Join</JCButton><Right></Right></CardItem> : null}
      {false ? <CardItem ><JCButton buttonType={ButtonTypes.Solid} onPress={() => { this.leave(item, "Organization") }}>Leave</JCButton><Right></Right></CardItem> : null}
    </Card>
  }
  renderCourse(item: any) {
    return <Card style={{ minHeight: 330, alignSelf: "flex-start", padding: '0%', paddingLeft: '0.25rem', paddingRight: '0.25rem', borderRadius: 4, boxShadow: "0px 5px 30px rgba(0, 0, 0, 0.05)", width: this.state.cardWidth }}>
      <CardItem bordered style={{ paddingLeft: 0, paddingRight: 0, paddingTop: 0, paddingBottom: 0 }}>
        <Image style={{ margin: 0, padding: 0, width: this.state.cardWidth, height: 20 }} source={require('../../assets/svg/pattern.svg')}></Image>
      </CardItem>
      <CardItem ><Text ellipsizeMode='tail' numberOfLines={3} style={styles.fontTitle}>{item.name}</Text></CardItem>
      <CardItem ><Text ellipsizeMode='tail' numberOfLines={1} style={styles.fontDetail}>Last Updated: {item.lastupdated}</Text></CardItem>
      {true ? <CardItem ><JCButton buttonType={ButtonTypes.Solid} onPress={() => { this.join(item, "Course") }}>Join</JCButton><Right></Right></CardItem> : null}
      {false ? <CardItem ><JCButton buttonType={ButtonTypes.Solid} onPress={() => { this.leave(item, "Course") }}>Leave</JCButton><Right></Right></CardItem> : null}
    </Card>
  }
  render() {
    if (!constants["SETTING_ISVISIBLE_" + this.state.type])
      return null
    else
      if (this.state.titleString == null)
        return null
      else
        return (
          <ErrorBoundry>
            <StyleProvider style={getTheme(material)}>

              <Container style={{ padding: 10, minHeight: 525, width: "100%", flexDirection: 'column', justifyContent: 'flex-start' }}>
                <Container style={styles.sectionHeadingDashboard} >
                  <JCButton buttonType={ButtonTypes.TransparentBoldBlack} onPress={() => { this.openMultiple() }}>{this.state.titleString}</JCButton>
                  <Container style={{ maxHeight: 45, flexDirection: 'row', justifyContent: 'flex-end', alignItems: "flex-start" }}>
                    <JCButton buttonType={ButtonTypes.TransparentBoldOrange} data-testid={"mygroup-showall-" + this.state.titleString} onPress={() => { this.openMultiple() }}>Show All</JCButton>
                    {constants["SETTING_ISVISIBLE_SHOWRECOMMENDED"] ? <JCButton buttonType={ButtonTypes.TransparentBoldOrange} data-testid={"mygroup-recommmended-" + this.state.titleString} onPress={() => { this.openMultiple() }}>Show Recommended</JCButton> : null}
                    {this.state.showCreateButton && constants["SETTING_ISVISIBLE_CREATE_" + this.state.type] ?
                      <JCButton buttonType={ButtonTypes.OutlineBold} data-testid={"mygroup-create-" + this.state.titleString} onPress={() => { this.createSingle() }}>{this.state.createString}</JCButton>
                      : null
                    }
                  </Container>
                </Container>
                <Container style={styles.ResourcesMyGroups}>
                  {this.state.data ?
                    this.state.data.map((item, index) => {

                      return (
                        <ErrorBoundry key={index}>
                          <ListItem noBorder style={{ alignSelf: "flex-start" }} button onPress={() => { this.openSingle(item.id) }}>
                            {this.state.type == "group" ?
                              this.renderGroup(item) :
                              this.state.type == "event" ?
                                this.renderEvent(item) :
                                this.state.type == "resource" ?
                                  this.renderResource(item) :
                                  this.state.type == "organization" ?
                                    this.renderOrganization(item) :
                                    this.state.type == "course" ?
                                      this.renderCourse(item) :
                                      this.state.type == "profile" ?
                                        this.renderProfile(item) :
                                        null
                            }


                          </ListItem>
                        </ErrorBoundry>
                      )
                    })
                    : null
                  }
                  {this.state.nextToken ?
                    this.props.showMore ?
                      <TouchableOpacity onPress={() => { this.setInitialData(this.props) }} >
                        <Card style={{ minHeight: 330, alignSelf: "flex-start", padding: '0%', width: this.state.cardWidth }}>
                          <CardItem   ><Text ellipsizeMode='tail' numberOfLines={3} style={styles.fontTitle}>Load more...</Text></CardItem>
                        </Card>
                      </TouchableOpacity>
                      : null
                    : null}
                </Container>
              </Container>
            </StyleProvider>
          </ErrorBoundry>
        )
  }
}