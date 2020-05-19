import React, { lazy } from 'react';
import { Icon, Picker, StyleProvider, Container, Content } from 'native-base';
import JCButton, { ButtonTypes } from '../../components/Forms/JCButton'

import { Text } from 'react-native'

import Header from '../../components/Header/Header'
import MyMap from '../../components/MyMap/MyMap';
import styles from '../../components/style'
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
//import  from '../../components/MessageBoard/MessageBoard'
import EditableDate from '../../components/Forms/EditableDate'
import EditableText from '../../components/Forms/EditableText'
import EditableLocation from '../../components/Forms/EditableLocation'
import EditableUrl from '../../components/Forms/EditableUrl'
import Validate from '../../components/Validate/Validate'
import { Image } from 'react-native'
import { API, graphqlOperation, Auth, Analytics } from 'aws-amplify';
import { CreateGroupInput } from '../../src/API'
import * as mutations from '../../src/graphql/mutations';
import * as queries from '../../src/graphql/queries';
import GRAPHQL_AUTH_MODE from 'aws-amplify-react-native'
import ProfileImage from '../../components/ProfileImage/ProfileImage'
import Zoom from '../../components/Zoom/Zoom'
import moment from 'moment'
const MessageBoard = lazy(() => import('../../components/MessageBoard/MessageBoard'));

interface Props {
  navigation: any
}
interface State {
  showMap: boolean
  loadId: string
  data: any
  createNew: boolean
  canSave: boolean
  canLeave: boolean
  canJoin: boolean
  isEditable: boolean
  canDelete: boolean
  validationError: String
  currentUser: String
  currentUserProfile: any
}



export default class EventScreen extends React.Component<Props, State>{
  constructor(props: Props) {
    super(props);

    this.state = {
      showMap: false,
      loadId: props.navigation.state.params.id,
      createNew: props.navigation.state.params.create,
      data: null,
      canSave: false,
      canLeave: false,
      canJoin: false,
      isEditable: false,
      canDelete: false,
      validationError: "",
      currentUser: null,
      currentUserProfile: null
    }
    Auth.currentAuthenticatedUser().then((user: any) => {
      this.setState({
        currentUser: user.username
      })
      const getUser: any = API.graphql(graphqlOperation(queries.getUser, { id: user['username'] }));
      getUser.then((json) => {

        var isEditable = (json.data.getUser.owner == user['username'])

        this.setState({
          currentUserProfile: json.data.getUser,
          isEditable: isEditable,
          canLeave: true && !isEditable,
          canJoin: true && !isEditable,
          canSave: (!this.state.createNew) && isEditable,
          createNew: this.state.createNew && isEditable,
          canDelete: (!this.state.createNew) && isEditable
        }, () => {
          this.setInitialData(props)
        })

      }).catch((e) => {
        console.log({
          "Error Loading User": e
        }
        )
      })
    })

  }
  getValueFromKey(myObject: any, string: any) {
    const key = Object.keys(myObject).filter(k => k.includes(string));
    return key.length ? myObject[key[0]] : "";
  }
  setInitialData(props) {
    if (props.navigation.state.params.create)
      Auth.currentAuthenticatedUser().then((user: any) => {
        var z: CreateGroupInput = {
          id: "event-" + Date.now(),
          owner: user.username,
          type: "event",
          name: "",
          description: "",
          memberCount: 1,
          image: "temp",
          time: null,
          location: ""
        }
        this.setState({ data: z })
      })
    else {
      var getGroup: any = API.graphql({
        query: queries.getGroup,
        variables: { id: props.navigation.state.params.id },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
      });
      var processResults = (json) => {

        this.setState({ data: json.data.getGroup },

          () => {
            var groupMemberByUser: any = API.graphql({
              query: queries.groupMemberByUser,
              variables: { userID: this.state.currentUser, groupID: { eq: this.state.data.id } },
              authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
            });
            groupMemberByUser.then((json: any) => {
              console.log({ "groupMemberByUser": json })
              if (json.data.groupMemberByUser.items.length > 0)
                this.setState({ canJoin: false, canLeave: true && !this.state.isEditable })
              else
                this.setState({ canJoin: true && !this.state.isEditable, canLeave: false })
            })
          }
        )
      }
      getGroup.then(processResults).catch(processResults)
    }
  }
  mapChanged = () => {
    this.setState({ showMap: !this.state.showMap })
  }
  validate(): boolean {
    var validation: any = Validate.Event(this.state.data)
    this.setState({ validationError: validation.validationError })
    return validation.result
  }
  createNew() {
    if (this.validate()) {
      var createGroup: any = API.graphql({
        query: mutations.createGroup,
        variables: { input: this.state.data },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
      });
      createGroup.then((json: any) => {
        this.setState({
          createNew: false
        }, () => {
          this.setState({
            canSave: (!this.state.createNew) && this.state.isEditable,
            createNew: this.state.createNew && this.state.isEditable,
            canDelete: (!this.state.createNew) && this.state.isEditable
          })
        })
        console.log({ "Success mutations.createGroup": json });
      }).catch((err: any) => {
        console.log({ "Error mutations.createGroup": err });
      });
    }
  }
  clean(item) {
    delete item.members
    delete item.messages
    delete item.organizerGroup
    delete item.organizerUser
    delete item.instructors
    delete item.ownerUser
    delete item._deleted
    delete item._lastChangedAt
    delete item.createdAt
    delete item.updatedAt
    return item
  }
  save() {
    if (this.validate()) {
      var updateGroup: any = API.graphql({
        query: mutations.updateGroup,
        variables: { input: this.clean(this.state.data) },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
      });
      updateGroup.then((json: any) => {

        console.log({ "Success mutations.updateGroup": json });
      }).catch((err: any) => {
        console.log({ "Error mutations.updateGroup": err });
      });
    }

  }
  leave() {
    Analytics.record({
      name: 'leftEvent',
      // Attribute values must be strings
      attributes: { id: this.state.data.id, name: this.state.data.name }
    });
    var groupMemberByUser: any = API.graphql({
      query: queries.groupMemberByUser,
      variables: { userID: this.state.currentUser, groupID: { eq: this.state.data.id } },
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
      this.setState({ canJoin: true, canLeave: false })

      // this.setState({ canJoin: true, canLeave: false })
    }).catch((err: any) => {
      console.log({ "Error queries.groupMemberByUser": err });
    });

  }
  join() {
    Analytics.record({
      name: 'joinedEvent',
      // Attribute values must be strings
      attributes: { id: this.state.data.id, name: this.state.data.name }
    });
    var createGroupMember: any = API.graphql({
      query: mutations.createGroupMember,
      variables: { input: { groupID: this.state.data.id, userID: this.state.currentUser } },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
    });
    createGroupMember.then((json: any) => {

      this.setState({ canJoin: false, canLeave: true })
      console.log({ "Success mutations.createGroupMember": json });
    }).catch((err: any) => {
      console.log({ "Error mutations.createGroupMember": err });
    });
  }
  delete() {
    var deleteGroup: any = API.graphql({
      query: mutations.deleteGroup,
      variables: { input: { id: this.state.data.id } },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
    });
    deleteGroup.then((json: any) => {
      console.log({ "Success mutations.deleteGroup": json });
      this.props.navigation.push("HomeScreen")
    }).catch((err: any) => {
      console.log({ "Error mutations.deleteGroup": err });
    });
  }
  updateValue(field: any, value: any) {
    var temp = this.state.data
    temp[field] = value
    this.setState({ data: temp })
  }
  render() {
    //console.log(this.state.data)
    console.log("EventScreen")
    return (
      this.state.data ?
        <StyleProvider style={getTheme(material)}>
          <Container >
            <Header title="Jesus Collective" navigation={this.props.navigation} onMapChange={this.mapChanged} />
            <MyMap navigation={this.props.navigation} visible={this.state.showMap}></MyMap>
            <Content>
              <Container style={{ display: "flex", flexDirection: "row", justifyContent: 'flex-start', background: "#F9FAFC" }}>
                <Container style={styles.detailScreenLeftCard}>
                  <Container style={{ flexDirection: "row", width: "100%", justifyContent: "space-between", flexGrow: 0, marginBottom: 20 }}>
                    <Text style={{ fontSize: 12, lineHeight: 16, fontFamily: 'Helvetica-Neue, sans-serif', color: '#333333', textTransform: "uppercase", flex: 0 }}>Event</Text>
                    <Text style={{ fontSize: 12, lineHeight: 16, fontFamily: 'Helvetica-Neue, sans-serif', color: '#979797', textTransform: "uppercase", flex: 0 }}>Sponsored</Text>
                  </Container>
    
                    <EditableText onChange={(value: any) => { this.updateValue("name", value) }} placeholder="Enter Event Name" multiline={false} textStyle={styles.fontRegular} inputStyle={styles.groupNameInput} value={this.state.data.name} isEditable={this.state.isEditable}></EditableText>
                    <EditableText onChange={(value: any) => { this.updateValue("description", value) }} placeholder="Enter Event Description" multiline={true} textStyle={styles.fontRegular} inputStyle={styles.groupDescriptionInput} value={this.state.data.description} isEditable={this.state.isEditable}></EditableText>
                    <EditableDate type="datetime" onChange={(value: any) => { this.updateValue("time", value) }} placeholder="Enter Event Time" multiline={false} textStyle={styles.fontRegular} inputStyle={styles.groupNameInput} value={this.state.data.time} isEditable={this.state.isEditable}></EditableDate>
          
                  {this.state.isEditable ? <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    style={{ width: "75%", marginBottom: 30, marginTop: 30, fontSize: 16, height: 100, flexGrow: 0 }}
                    placeholder="Event type"
                    placeholderStyle={{ color: "#bfc6ea" }}
                    placeholderIconColor="#007aff"
                    selectedValue={this.state.data.eventType}
                    onValueChange={(value: any) => { this.updateValue("eventType", value) }}
                  >
                    <Picker.Item label="Zoom" value="zoom" />
                    <Picker.Item label="Location" value="location" />
                    <Picker.Item label="Eventbrite" value="eventbrite" />

                  </Picker>
                    : null}
                  {this.state.data.eventType != "location" ?
                    <EditableUrl title={this.state.data.eventType == "zoom" ? "Open in Zoom" : "Open in Eventbrite"}
                      onChange={(value: any) => { this.updateValue("eventUrl", value) }}
                      placeholder="Enter Event URL" multiline={false} textStyle={styles.fontRegular}
                      inputStyle={styles.groupNameInput} value={this.state.data.eventUrl}
                      isEditable={this.state.isEditable}></EditableUrl>
                    :
                    <EditableLocation onChange={(value: any, location: any) => {
                      this.updateValue("location", value)
                      console.log(location)
                      if (location != undefined && location != null)
                        this.updateValue("locationLatLong", { latitude: location.lat, longitude: location.lng })
                      else
                        this.updateValue("locationLatLong", null)
                    }}
                      placeholder="Enter Event Location" multiline={false} textStyle={styles.fontRegular}
                      inputStyle={styles.groupNameInput} value={this.state.data.location}
                      isEditable={this.state.isEditable}></EditableLocation>
                  }
                  <Text style={{ fontFamily: "Graphik-Regular-App", fontSize: 16, lineHeight: 23, color: "#333333", paddingBottom: 12, marginTop: 52 }}>Organizer</Text>
                  <ProfileImage user={this.state.data.ownerUser ? this.state.data.ownerUser : this.state.currentUserProfile} size="small" />
                  <Text style={{ fontFamily: "Graphik-Bold-App", fontSize: 20, lineHeight: 25, letterSpacing: -0.3, color: "#333333", paddingTop: 48, paddingBottom: 12 }}>Attending ({this.state.data.members == null ? "0" : this.state.data.members.items.length})</Text>
                  <Container style={styles.eventAttendeesPictures}>
                    {
                      this.state.data.members == null ? <Text>No Members Yet</Text> :
                        this.state.data.members.items.length == 0 ?
                          <Text style={{ fontFamily: "Graphik-Bold-App", fontSize: 20, lineHeight: 25, letterSpacing: -0.3, color: "#333333", marginBottom: 30 }}>No Attendees Yet</Text> :
                          this.state.data.members.items.map((item: any, index: any) => {
                            return (<ProfileImage key={index} user={item} size="small" />)
                          })}
                  </Container>
                  <Container style={{ flexDirection: "column", flexGrow: 1 }}>
                    {this.state.canJoin ?
                      <JCButton buttonType={ButtonTypes.OutlineBoldNoMargin} onPress={() => { this.join() }} >Attend</JCButton> :
                      null
                    }
                    {this.state.canLeave ?
                      <JCButton buttonType={ButtonTypes.OutlineBoldNoMargin} onPress={() => { this.leave() }} >Don't Attend</JCButton> :
                      null
                    }
                    {this.state.createNew ?
                      <JCButton buttonType={ButtonTypes.OutlineBoldNoMargin} onPress={() => { this.createNew() }} >Create Event</JCButton>
                      : null
                    }
                    {this.state.canSave ?
                      <JCButton buttonType={ButtonTypes.OutlineBoldNoMargin} onPress={() => { this.save() }} >Save Event</JCButton>
                      : null
                    }
                    {this.state.canDelete ?
                      <JCButton buttonType={ButtonTypes.OutlineBoldNoMargin} onPress={() => { if (window.confirm('Are you sure you wish to delete this event?')) this.delete() }}>Delete Event</JCButton>
                      : null
                    }
                  </Container>
                  <Text>{this.state.validationError}</Text>
                </Container>
                <Container style={styles.detailScreenRightCard}>
                  <MessageBoard navigation={this.props.navigation} groupId={this.state.data.id}></MessageBoard>
                  {/*  <Zoom></Zoom>*/}
                </Container>
              </Container>
            </Content>
          </Container>
        </StyleProvider>
        :
        null

    );
  }
}
