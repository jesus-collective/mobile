import React from 'react';
import { Icon, Picker, StyleProvider, Container, Content, Text, Button } from 'native-base';
import Header from '../../components/Header/Header'
import MyMap from '../../components/MyMap/MyMap';
import styles from '../../components/style.js'
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import MessageBoard from '../../components/MessageBoard/MessageBoard'
import EditableDate from '../../components/Editable/EditableDate'
import EditableText from '../../components/Editable/EditableText'
import EditableUrl from '../../components/Editable/EditableUrl'
import Validate from '../../components/Validate/Validate'
import { Image } from 'react-native'
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { CreateGroupInput } from '../../src/API'
import * as mutations from '../../src/graphql/mutations';
import * as queries from '../../src/graphql/queries';
import { GRAPHQL_AUTH_MODE } from '@aws-amplify/api/lib/types';
import ProfileImage from '../../components/ProfileImage/ProfileImage'


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
      currentUser: null
    }
    Auth.currentAuthenticatedUser().then((user: any) => { this.setState({ currentUser: user.username }) })
    this.setInitialData(props)
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
          time: "",
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
      var processResults=(json) => {
        this.setState({ data: json.data.getGroup })
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

  }
  join() {
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
    console.log(this.state.data)
    console.log("EventScreen")
    return (
      this.state.data ?
        <StyleProvider style={getTheme(material)}>
          <Container >
            <Header title="Jesus Collective" navigation={this.props.navigation} onMapChange={this.mapChanged} />
            <MyMap navigation={this.props.navigation} visible={this.state.showMap}></MyMap>
            <Content>
              <Container style={{ display: "flex", flexDirection: "row", justifyContent: 'flex-start' }}>
                <Container style={{ flex: 30, flexDirection: "column", justifyContent: 'flex-start' }}>
                  <Text>Event</Text>
                  <Text>Sponsored</Text>
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
                    <EditableText onChange={(value: any) => { this.updateValue("location", value) }}
                      placeholder="Enter Event Location" multiline={false} textStyle={styles.fontRegular}
                      inputStyle={styles.groupNameInput} value={this.state.data.location}
                      isEditable={this.state.isEditable}></EditableText>
                  }
                  <Text>Organizer</Text>
                  <ProfileImage user={this.state.data.ownerUser} size="small" />
                  <Text>Attending ({this.state.data.members == null ? "0" : this.state.data.members.items.length})</Text>

                  {
                    this.state.data.members == null ? <Text>No Members Yet</Text> :
                      this.state.data.members.items.length == 0 ?
                        <Text>No Attendees Yet</Text> :
                        this.state.data.members.items.map((item: any) => {
                          return (<ProfileImage user={item} size="small" />)
                        })}
                  {this.state.canJoin ?
                    <Button onPress={() => { this.join() }} bordered style={styles.sliderButton}><Text>Attend</Text></Button> :
                    null
                  }
                  {this.state.canLeave ?
                    <Button onPress={() => { this.leave() }} bordered style={styles.sliderButton}><Text>Don't Attend</Text></Button> :
                    null
                  }
                  {this.state.createNew ?
                    <Button onPress={() => { this.createNew() }} bordered style={styles.sliderButton}><Text>Create Event</Text></Button>
                    : null
                  }
                  {this.state.canSave ?
                    <Button onPress={() => { this.save() }} bordered style={styles.sliderButton}><Text>Save Event</Text></Button>
                    : null
                  }
                  {this.state.canDelete ?
                    <Button onPress={() => { if (window.confirm('Are you sure you wish to delete this event?')) this.delete() }} bordered style={styles.sliderButton}><Text>Delete Event</Text></Button>
                    : null
                  }
                  <Text>{this.state.validationError}</Text>
                </Container>
                <Container style={{ flex: 70, flexDirection: "column", alignContent: 'flex-start', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                  <MessageBoard navigation={this.props.navigation} groupId={this.state.data.id}></MessageBoard>
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
