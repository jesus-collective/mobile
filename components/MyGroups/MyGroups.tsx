import { Left,Body, StyleProvider, Card, CardItem, List, ListItem, Right, Button, Text, Container } from 'native-base';
import * as React from 'react';
import styles from '../style.js'
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import { FontAwesome5 } from '@expo/vector-icons';
import { Image } from 'react-native'
import * as queries from '../../src/graphql/queries';
import { GRAPHQL_AUTH_MODE } from '@aws-amplify/api/lib/types';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import ProfileImage from '../../components/ProfileImage/ProfileImage'

var moment = require('moment');

interface Props {
  navigation: any
  wrap: Boolean
  type: String
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
        cardWidth: 250,
        data: null,
        showCreateButton: false
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
        cardWidth: 250,
        data: null,
        showCreateButton: false
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
        cardWidth: 250,
        data: null,
        showCreateButton: false
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
        data: null,
        showCreateButton: false
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
        data: null,
        showCreateButton: false
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
        data: null,
        showCreateButton: false
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
        data: null,
        showCreateButton: false
      }
    }
    this.setInitialData(props)
    var user = Auth.currentAuthenticatedUser();
    user.then((user: any) => {
      if (props.type != "profile")
        this.setState({ showCreateButton: user.signInUserSession.accessToken.payload["cognito:groups"].includes("verifiedUsers") })
    })

  }
  setInitialData(props) {
    if (props.type == "profile") 
    {
      var listUsers: any = API.graphql({
        query: queries.listUsers,
        variables: { filter: null },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
      });
      listUsers.then((json) => {
        this.setState({ data: json.data.listUsers.items })
      }).catch(
        (e: any) => {
          console.log(e)
          this.setState({ data: e.data.listUsers.items })
        }
      )
    }
    else {
      var listGroup: any = API.graphql({
        query: queries.listGroups,
        variables: { filter: { id: { beginsWith: props.type + "-" } } },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
      });

      listGroup.then((json) => {
        this.setState({ data: json.data.listGroups.items })
      })
    }
  }
  openSingle(id: any) {
    console.log({ "Navigate to": this.state.openSingle })
    console.log(id)
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
  canJoin(id: any): boolean {
    return true
  }
  canLeave(id: any): boolean {
    return false
  }
  join(id: any) {

  }
  leave(id: any) {

  }
  renderGroup(item: any) {
    return <Card style={{ minHeight: 330, alignSelf: "flex-start", padding: "0%", width: this.state.cardWidth }
    } >
      <CardItem bordered style={{ paddingLeft: 0, paddingRight: 0, paddingTop: 0, paddingBottom: 0 }} >
        <Image style={{ margin: 0, padding: 0, width: this.state.cardWidth, height: 20 }} source={require('../../assets/svg/pattern.svg')}></Image>
      </CardItem>
      <CardItem ><Text ellipsizeMode='tail' numberOfLines={3} style={styles.fontTitle}>{item.name}</Text></CardItem>
      <CardItem ><Text ellipsizeMode='tail' numberOfLines={3} style={styles.fontDetail}>{item.description}</Text></CardItem>
      {this.canJoin(item.id) ? <CardItem ><Button onPress={() => { this.join(item.id) }}><Text style={styles.font}>Join</Text></Button><Right></Right></CardItem> : null}
      {this.canLeave(item.id) ? <CardItem ><Button onPress={() => { this.leave(item.id) }}><Text style={styles.font}>Leave</Text></Button><Right></Right></CardItem> : null}
    </Card >
  }
  renderProfile(item: any) {
    return  <Card key={item.id} style={{ width: "100%", minHeight: 50 }}>
    <CardItem>
      <Left>
        <ProfileImage user={item} size="small"></ProfileImage>
        <Body>
          <Text style={styles.fontConnectWithName}>{item.given_name} {item.family_name}</Text>
          <Text style={styles.fontConnectWithRole}>{item.currentRole}</Text>
          <Button bordered style={styles.connectWithSliderButton} onPress={() => { //this.openConversation() 
          }}><Text>Start Conversation</Text></Button>
        </Body>
      </Left>
    </CardItem>
  </Card>
  }
  renderEvent(item: any) {
    return <Card style={{ minHeight: 330, alignSelf: "flex-start", padding: '0%', width: this.state.cardWidth }}>
      <CardItem ><Text ellipsizeMode='tail' numberOfLines={1} style={styles.fontDetail}>{moment(item.time).format('MMMM Do YYYY, h:mm a')}</Text></CardItem>
      <CardItem ><Text ellipsizeMode='tail' numberOfLines={3} style={styles.fontTitle}>{item.name}</Text></CardItem>
      <CardItem ><Text ellipsizeMode='tail' numberOfLines={3} style={styles.fontDetail}>{item.description}</Text></CardItem>
      <CardItem ><Text ellipsizeMode='tail' numberOfLines={1} style={styles.fontDetail}>{item.location}</Text></CardItem>
      {this.canJoin(item.id) ? <CardItem ><Button onPress={() => { this.join(item.id) }}><Text style={styles.font}>Attend</Text></Button><Right></Right></CardItem> : null}
      {this.canLeave(item.id) ? <CardItem ><Button onPress={() => { this.leave(item.id) }}><Text style={styles.font}>Don't Attend</Text></Button><Right></Right></CardItem> : null}
    </Card>
  }
  renderResource(item: any) {
    return <Card style={{ minHeight: 330, alignSelf: "flex-start", padding: '0%', width: this.state.cardWidth }}>
      <CardItem bordered style={{ paddingLeft: 0, paddingRight: 0, paddingTop: 0, paddingBottom: 0 }}>
        <Image style={{ margin: 0, padding: 0, width: this.state.cardWidth, height: 20 }} source={require('../../assets/svg/pattern.svg')}></Image>
      </CardItem>
      <CardItem ><Text ellipsizeMode='tail' numberOfLines={3} style={styles.fontTitle}>{item.name}</Text></CardItem>
      <CardItem ><Text ellipsizeMode='tail' numberOfLines={1} style={styles.fontDetail}>Last Updated: {item.lastupdated}</Text></CardItem>
      {this.canJoin(item.id) ? <CardItem ><Button onPress={() => { this.join(item.id) }}><Text style={styles.font}>Join</Text></Button><Right></Right></CardItem> : null}
      {this.canLeave(item.id) ? <CardItem ><Button onPress={() => { this.leave(item.id) }}><Text style={styles.font}>Leave</Text></Button><Right></Right></CardItem> : null}
    </Card>
  }
  renderOrganization(item: any) {
    return <Card style={{ minHeight: 330, alignSelf: "flex-start", padding: '0%', width: this.state.cardWidth }}>
      <CardItem bordered style={{ paddingLeft: 0, paddingRight: 0, paddingTop: 0, paddingBottom: 0 }}>
        <Image style={{ margin: 0, padding: 0, width: this.state.cardWidth, height: 20 }} source={require('../../assets/svg/pattern.svg')}></Image>
      </CardItem>
      <CardItem ><Text ellipsizeMode='tail' numberOfLines={3} style={styles.fontTitle}>{item.name}</Text></CardItem>
      <CardItem ><Text ellipsizeMode='tail' numberOfLines={1} style={styles.fontDetail}>{item.kind}</Text></CardItem>
      {this.canJoin(item.id) ? <CardItem ><Button onPress={() => { this.join(item.id) }}><Text style={styles.font}>Join</Text></Button><Right></Right></CardItem> : null}
      {this.canLeave(item.id) ? <CardItem ><Button onPress={() => { this.leave(item.id) }}><Text style={styles.font}>Leave</Text></Button><Right></Right></CardItem> : null}
    </Card>
  }
  renderCourse(item: any) {
    return <Card style={{ minHeight: 330, alignSelf: "flex-start", padding: '0%', width: this.state.cardWidth }}>
      <CardItem bordered style={{ paddingLeft: 0, paddingRight: 0, paddingTop: 0, paddingBottom: 0 }}>
        <Image style={{ margin: 0, padding: 0, width: this.state.cardWidth, height: 20 }} source={require('../../assets/svg/pattern.svg')}></Image>
      </CardItem>
      <CardItem ><Text ellipsizeMode='tail' numberOfLines={3} style={styles.fontTitle}>{item.name}</Text></CardItem>
      <CardItem ><Text ellipsizeMode='tail' numberOfLines={1} style={styles.fontDetail}>Last Updated: {item.lastupdated}</Text></CardItem>
      {this.canJoin(item.id) ? <CardItem ><Button onPress={() => { this.join(item.id) }}><Text style={styles.font}>Join</Text></Button><Right></Right></CardItem> : null}
      {this.canLeave(item.id) ? <CardItem ><Button onPress={() => { this.leave(item.id) }}><Text style={styles.font}>Leave</Text></Button><Right></Right></CardItem> : null}
    </Card>
  }
  render() {

    if (this.state.titleString == null)
      return null
    else
      return (
        <StyleProvider style={getTheme(material)}>

          <Container style={{ padding: 10, minHeight: 445, width: "100%", flexDirection: 'column', justifyContent: 'flex-start' }}>
            <Container style={{ minHeight: 45, flexGrow: 0, flexDirection: 'row', justifyContent: 'space-between' }} >
              <Button transparent onPress={() => { this.openMultiple() }}><Text style={styles.fontSliderHeader}>{this.state.titleString}</Text></Button>
              <Container style={{ maxHeight: 45, flexDirection: 'row', justifyContent: 'flex-end', alignItems: "flex-start" }}>
                <Button transparent onPress={() => { this.openMultiple() }}><Text style={styles.fontSliderButtons}>Show All</Text></Button>
                <Button transparent onPress={() => { this.openMultiple() }}><Text style={styles.fontSliderButtons}>Show Recommended</Text></Button>
                {this.state.showCreateButton ?
                  <Button bordered onPress={() => { this.createSingle() }} style={styles.sliderButton}><Text style={styles.fontSliderButtons}>{this.state.createString}</Text></Button>
                  : null
                }
              </Container>
            </Container>
            <Container style={{ overflow: "scroll", minHeight: 400, flexWrap: this.props.wrap ? "wrap" : "nowrap", flexGrow: 1, width: "100%", flexDirection: 'row', justifyContent: "flex-start", alignItems: "flex-start" }}>
              {this.state.data ?
                this.state.data.map((item) => {
                  return (
                    <ListItem noBorder key={item.id} style={{ alignSelf: "flex-start" }} button onPress={() => { this.openSingle(item.id) }}>
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
                  )
                })
                : null
              }

            </Container>
          </Container>
        </StyleProvider>
      )
  }
}