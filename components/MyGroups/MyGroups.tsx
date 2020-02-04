import { StyleProvider, Card, CardItem, List, ListItem, Right, Button, Text, Container } from 'native-base';
import * as React from 'react';
import styles from '../style.js'
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import { FontAwesome5 } from '@expo/vector-icons';
import { Image } from 'react-native'
import { DrawerActions, NavigationScreenProp } from 'react-navigation';
import { Auth } from 'aws-amplify';


interface Props {
  navigation: NavigationScreenProp<any, any>
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
    const data = require('../../assets/json/groups.json');
    if (props.type == "event") {
      this.state = {
        openSingle: "EventScreen",
        openMultiple: "EventsScreen",
        createString: "+ Create Event",
        titleString: "Events",
        type: props.type,
        cardWidth: 250,
        data: data.filter(item => item.type == props.type),
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
        data: data.filter(item => item.type == props.type),
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
        data: data.filter(item => item.type == props.type),
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
        data: data.filter(item => item.type == props.type),
        showCreateButton: false
      }

    }
    else if (props.type == "course") {
      this.state =
      {
        openSingle: "CourseScreen",
        openMultiple: "CoursesScreen",
        createString: "+ Create Course",
        titleString: "Courses",
        type: props.type,
        cardWidth: 200,
        data: data.filter(item => item.type == props.type),
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
        data: data.filter(item => item.type == props.type),
        showCreateButton: false
      }
    }
    var user = Auth.currentAuthenticatedUser();
    user.then((user: any) => {
      this.setState({ showCreateButton: user.signInUserSession.accessToken.payload["cognito:groups"].includes("verifiedUsers") })
    })

  }
  openSingle(id: any) {
    console.log({ "Navigate to": this.state.openSingle })
    console.log(id)
    this.props.navigation.navigate(this.state.openSingle, { id: id, create:false })
  }
  createSingle(){
    console.log({ "Navigate to": this.state.openSingle })
    this.props.navigation.navigate(this.state.openSingle, { create:true })
  }
  openMultiple() {
    console.log({ "Navigate to": this.state.openMultiple })
    this.props.navigation.navigate(this.state.openMultiple);
  }

  renderGroup(item: any) {
    return <Card style={{ alignSelf: "flex-start", padding: "0px", width: this.state.cardWidth }
    } >
      <CardItem bordered style={{ paddingLeft: 0, paddingRight: 0, paddingTop: 0, paddingBottom: 0 }} >
        <Image style={{ margin: 0, padding: 0, width: this.state.cardWidth, height: 20 }} source={require('../../assets/svg/pattern.svg')}></Image>
      </CardItem>
      <CardItem ><Text style={styles.fontTitle}>{item.name}</Text></CardItem>
      <CardItem ><Text style={styles.fontDetail}>{item.description}</Text></CardItem>
      <CardItem ><Button><Text style={styles.font}>Join</Text></Button><Right></Right></CardItem>
    </Card >
  }
  renderEvent(item: any) {
    return <Card style={{ alignSelf: "flex-start", padding: "0px", width: this.state.cardWidth }}>
      <CardItem ><Text style={styles.fontDetail}>{item.time}</Text></CardItem>
      <CardItem ><Text style={styles.fontTitle}>{item.name}</Text></CardItem>
      <CardItem ><Text style={styles.fontDetail}>{item.description}</Text></CardItem>
      <CardItem ><Text style={styles.fontDetail}>{item.location}</Text></CardItem>
      <CardItem ><Button><Text style={styles.font}>Attend</Text></Button><Right></Right></CardItem>
    </Card>
  }
  renderResource(item: any) {
    return <Card style={{ alignSelf: "flex-start", padding: "0px", width: this.state.cardWidth }}>
      <CardItem bordered style={{ paddingLeft: 0, paddingRight: 0, paddingTop: 0, paddingBottom: 0 }}>
        <Image style={{ margin: 0, padding: 0, width: this.state.cardWidth, height: 20 }} source={require('../../assets/svg/pattern.svg')}></Image>
      </CardItem>
      <CardItem ><Text style={styles.fontTitle}>{item.name}</Text></CardItem>
      <CardItem ><Text style={styles.fontDetail}>Last Updated: {item.lastupdated}</Text></CardItem>
      <CardItem ><Button><Text style={styles.font}>View</Text></Button><Right></Right></CardItem>
    </Card>
  }
  renderOrganization(item: any) {
    return <Card style={{ alignSelf: "flex-start", padding: "0px", width: this.state.cardWidth }}>
      <CardItem bordered style={{ paddingLeft: 0, paddingRight: 0, paddingTop: 0, paddingBottom: 0 }}>
        <Image style={{ margin: 0, padding: 0, width: this.state.cardWidth, height: 20 }} source={require('../../assets/svg/pattern.svg')}></Image>
      </CardItem>
      <CardItem ><Text style={styles.fontTitle}>{item.name}</Text></CardItem>
      <CardItem ><Text style={styles.fontDetail}>{item.kind}</Text></CardItem>
      <CardItem ><Button><Text style={styles.font}>View</Text></Button><Right></Right></CardItem>
    </Card>
  }
  renderCourse(item: any) {
    return <Card style={{ alignSelf: "flex-start", padding: "0px", width: this.state.cardWidth }}>
      <CardItem bordered style={{ paddingLeft: 0, paddingRight: 0, paddingTop: 0, paddingBottom: 0 }}>
        <Image style={{ margin: 0, padding: 0, width: this.state.cardWidth, height: 20 }} source={require('../../assets/svg/pattern.svg')}></Image>
      </CardItem>
      <CardItem ><Text style={styles.fontTitle}>{item.name}</Text></CardItem>
      <CardItem ><Text style={styles.fontDetail}>Last Updated: {item.lastupdated}</Text></CardItem>
      <CardItem ><Button><Text style={styles.font}>View</Text></Button><Right></Right></CardItem>
    </Card>
  }
  render() {

    if (this.state.titleString == null)
      return null
    else
      return (
        <StyleProvider style={getTheme(material)}>

          <Container style={{ minHeight: 400, width: "100%", flexDirection: 'column', justifyContent: 'flex-start' }}>
            <Container style={{ minHeight: 45, flexGrow: 0, flexDirection: 'row', justifyContent: 'space-between' }} >
              <Button transparent onPress={() => { this.openMultiple() }}><Text style={styles.fontSliderHeader}>{this.state.titleString}</Text></Button>
              <Container style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: "flex-start" }}>
                <Button transparent onPress={() => { this.openMultiple() }}><Text style={styles.fontSliderButtons}>Show All</Text></Button>
                <Button transparent onPress={() => { this.openMultiple() }}><Text style={styles.fontSliderButtons}>Show Recommended</Text></Button>
                {this.state.showCreateButton ?
                  <Button bordered onPress={() => { this.createSingle() }} style={styles.sliderButton}><Text style={styles.fontSliderButtons}>{this.state.createString}</Text></Button>
                  : null
                }
              </Container>
            </Container>
            <Container style={{ overflow: "scroll", minHeight: 330, flexWrap: this.props.wrap ? "wrap" : "nowrap", flexGrow: 1, width: "100%", flexDirection: 'row', justifyContent: "flex-start", alignItems: "flex-start" }}>
              {this.state.data.map((item) => {
                return (
                  <ListItem key={item.id} style={{ alignSelf: "flex-start" }} button onPress={() => { this.openSingle(item.id) }}>
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
                              null
                    }


                  </ListItem>
                )
              })}

            </Container>
          </Container>
        </StyleProvider>
      )
  }
}