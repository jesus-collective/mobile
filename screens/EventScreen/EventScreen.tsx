import React, { lazy } from 'react';
import { Icon, Picker, StyleProvider, Container, Content } from 'native-base';
import JCButton, { ButtonTypes } from '../../components/Forms/JCButton'

import { Text } from 'react-native'

import Header from '../../components/Header/Header'
import MyMap from '../../components/MyMap/MyMap';
import styles from '../../components/style.js'
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
      canSave: true,
      canLeave: false,
      canJoin: true,
      isEditable: true,
      canDelete: true,
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

        this.setState({
          currentUserProfile: json.data.getUser
        })
      })
    })
    this.setInitialData(props)
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
                this.setState({ canJoin: false, canLeave: true })
              else
                this.setState({ canJoin: true, canLeave: false })
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
        this.setState({ canDelete: true, canSave: true, createNew: false })
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
        this.setState({ canDelete: true, canSave: true, createNew: false })
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
                <Container style={{ flex: 30, flexDirection: "column", alignContent: 'flex-start', alignItems: 'flex-start', justifyContent: 'flex-start', paddingLeft: 30, paddingRight: 30, paddingTop: 40, marginLeft: 32, marginRight: 32, marginTop: 30, borderRadius: 4, boxShadow: "0px 5px 30px rgba(0, 0, 0, 0.05)", border: "none", minHeight: 700, width: 446 }}>
                  <Container style={{ display: "flex", flexDirection: "row" }}>
                    <Text style={{ fontSize: 12, lineHeight: 16, fontFamily: 'Helvetica-Neue, sans-serif', color: '#333333', textTransform: "uppercase", flex: 0 }}>Event</Text>
                    <Text style={{ fontSize: 12, lineHeight: 16, fontFamily: 'Helvetica-Neue, sans-serif', color: '#979797', textTransform: "uppercase", flex: 0 }}>Sponsored</Text>
                  </Container>
                  
                  <EditableText onChange={(value: any) => { this.updateValue("name", value) }} placeholder="Enter Event Name" multiline={false} textStyle={styles.fontRegular} inputStyle={styles.groupNameInput} value={this.state.data.name} isEditable={this.state.isEditable}></EditableText>
                  <EditableText onChange={(value: any) => { this.updateValue("description", value) }} placeholder="Enter Event Description" multiline={true} textStyle={styles.fontRegular} inputStyle={styles.groupDescriptionInput} value={this.state.data.description} isEditable={this.state.isEditable}></EditableText>
                  <EditableDate type="datetime" onChange={(value: any) => { this.updateValue("time", value) }} placeholder="Enter Event Time" multiline={false} textStyle={styles.fontRegular} inputStyle={styles.groupNameInput} value={this.state.data.time} isEditable={this.state.isEditable}></EditableDate>
                  {this.state.isEditable ? <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    style={{ width: undefined }}
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
                    <EditableUrl title={this.state.data.eventType}
                      onChange={(value: any) => { this.updateValue("eventUrl", value) }}
                      placeholder="Enter Event URL" multiline={false} textStyle={styles.fontRegular}
                      inputStyle={styles.groupNameInput} value={this.state.data.eventUrl}
                      isEditable={false}></EditableUrl>
                    :
                    <EditableLocation onChange={(value: any) => { this.updateValue("location", value) }}
                      placeholder="Enter Event Location" multiline={false} textStyle={styles.fontRegular}
                      inputStyle={styles.groupNameInput} value={this.state.data.location}
                      isEditable={this.state.isEditable}></EditableLocation>
                  }
                  <Text>Organizer</Text>
                  <ProfileImage user={this.state.data.ownerUser ? this.state.data.ownerUser : this.state.currentUserProfile} size="small" />
                  <Text>Attending ({this.state.data.members == null ? "0" : this.state.data.members.items.length})</Text>

                  {
                    this.state.data.members == null ? <Text>No Members Yet</Text> :
                      this.state.data.members.items.length == 0 ?
                        <Text>No Attendees Yet</Text> :
                        this.state.data.members.items.map((item: any) => {
                          return (<ProfileImage user={item} size="small" />)
                        })}
                  {this.state.canJoin ?
                    <JCButton buttonType={ButtonTypes.Outline} onPress={() => { this.join() }} >Attend</JCButton> :
                    null
                  }
                  {this.state.canLeave ?
                    <JCButton buttonType={ButtonTypes.Outline} onPress={() => { this.leave() }} >Don't Attend</JCButton> :
                    null
                  }
                  {this.state.createNew ?
                    <JCButton buttonType={ButtonTypes.Outline} onPress={() => { this.createNew() }} >Create Event</JCButton>
                    : null
                  }
                  {this.state.canSave ?
                    <JCButton buttonType={ButtonTypes.Outline} onPress={() => { this.save() }} >Save Event</JCButton>
                    : null
                  }
                  {this.state.canDelete ?
                    <JCButton buttonType={ButtonTypes.Outline} onPress={() => { if (window.confirm('Are you sure you wish to delete this event?')) this.delete() }}>Delete Event</JCButton>
                    : null
                  }
                  <Text>{this.state.validationError}</Text>
                </Container>
                <Container style={{ flex: 70, flexDirection: "column", alignContent: 'flex-start', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
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
