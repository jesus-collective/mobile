﻿import React, { lazy } from 'react';
import { StyleProvider, Container, Content } from 'native-base';
import JCButton, { ButtonTypes } from '../../components/Forms/JCButton'

import { Text } from 'react-native'

import Header from '../../components/Header/Header'
import MyMap from '../../components/MyMap/MyMap';
import styles from '../../components/style'
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import EditableText from '../../components/Forms/EditableText'
import Validate from '../../components/Validate/Validate'

import { API, graphqlOperation, Auth, Analytics } from 'aws-amplify';
import { CreateGroupInput } from '../../src/API'
import * as mutations from '../../src/graphql/mutations';
import * as queries from '../../src/graphql/queries';
import GRAPHQL_AUTH_MODE from 'aws-amplify-react-native'
import ProfileImage from '../../components/ProfileImage/ProfileImage'

interface Props {
  navigation: any
  route: any
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



export default class GroupScreen extends React.Component<Props, State>{
  constructor(props: Props) {
    super(props);

    this.state = {
      showMap: false,
      loadId: props.route.params.id,
      createNew: props.route.params.create === "true" || props.route.params.create === true ? true : false,
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


  //switch graphQL operations from groups to org 

  setInitialData(props) {
    if (props.route.params.create === "true" || props.route.params.create === true)
      Auth.currentAuthenticatedUser().then((user: any) => {
        var z: CreateGroupInput = {
          id: "organization-" + Date.now(),
          owner: user.username,
          type: "organization",
          name: "",
          description: "",
          memberCount: 1,
          image: "temp",
          ownerOrgID: "00000000-0000-0000-0000-000000000000"
        }
        this.setState({ data: z })
      })
    else {
      var getGroup: any = API.graphql({
        query: queries.getGroup,
        variables: { id: props.route.params.id },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
      });
      var processResults = (json) => {
        this.setState({ data: json.data.getGroup })
      }
      getGroup.then(processResults).catch(processResults)
    }
  }
  mapChanged = () => {
    this.setState({ showMap: !this.state.showMap })
  }
  validate(): boolean {
    var validation: any = Validate.Organization(this.state.data)
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
        this.setState({ canDelete: true, canSave: true, createNew: false })
        console.log({ "Success mutations.updateGroup": json });
      }).catch((err: any) => {
        console.log({ "Error mutations.updateGroup": err });
      });
    }

  }

  // -> Get organization details

  /*
  async getUserDetails() {
    console.log("getUserDetails")
    var user = await Auth.currentAuthenticatedUser();
    if (this.props.loadId) {
      try {
        const getUser: any = await API.graphql(graphqlOperation(queries.getUser, { id: this.props.loadId }));
        this.setState({
          UserDetails: getUser.data.getUser,
          isEditable: getUser.data.getUser.id == user['username']
        }, () => this.getProfileImage()
        )

        //console.log(this.state.UserDetails)
      }
      catch (e) {
        if (e.data.getUser != null)
          this.setState({
            UserDetails: e.data.getUser
          })
        console.log(e)
      }
    }
    else {

      try {
        const getUser: any = await API.graphql(graphqlOperation(queries.getUser, { id: user['username'] }));
        this.setState({
          UserDetails: getUser.data.getUser,
          isEditable: true
        }, () => this.getProfileImage()
        )

        console.log(this.state.UserDetails)
      }
      catch (e) {
        console.log(e)
      }
    }
  }
  */

  /*
  getProfileImage() {
    console.log("get profile image")
    //console.log(this.state.UserDetails.profileImage)
    if (this.state.UserDetails.profileImage != null)
      Storage.get(this.state.UserDetails.profileImage.filenameUpload, {
        level: 'protected',
        identityId: this.state.UserDetails.profileImage.userId
      })
        .then(result => this.setState({ profileImage: result }))
        .catch(err => { console.log(err) });

  }
  */

  // can't join/leave (i think)
  leave() {
    Analytics.record({
      name: 'leftOrganization',
      // Attribute values must be strings
      attributes: { id: this.state.data.id, name: this.state.data.name }
    });
  }
  join() {
    Analytics.record({
      name: 'joinedOrganization',
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
  
  updateValue(field: any, value: any) {
    var temp = this.state.data
    temp[field] = value
    this.setState({ data: temp })
  }
  render() {
    //console.log(this.state.data)
    console.log("OrganizationScreen")
    return (
      this.state.data ?
        <StyleProvider style={getTheme(material)}>
          <Container >
            <Header title="Jesus Collective" navigation={this.props.navigation} onMapChange={this.mapChanged} />
            <MyMap navigation={this.props.navigation} visible={this.state.showMap}></MyMap>
            <Content>
              <Container style={{ display: "flex", flexDirection: "row", justifyContent: 'flex-start' }}>
                <Container style={{ flex: 30, flexDirection: "column", justifyContent: 'flex-start' }}>
                  <Text>Organization</Text>
                  <Text>Sponsored</Text>

                  <EditableText onChange={(value: any) => { this.updateValue("name", value) }} placeholder="Enter Organization Name" multiline={false} textStyle={styles.fontRegular} inputStyle={styles.groupNameInput} value={this.state.data.name} isEditable={this.state.isEditable}></EditableText>
                  <EditableText onChange={(value: any) => { this.updateValue("description", value) }} placeholder="Enter Organization Description" multiline={true} textStyle={styles.fontRegular} inputStyle={styles.groupDescriptionInput} value={this.state.data.description} isEditable={this.state.isEditable}></EditableText>

                  <Text>Organizer</Text>
                  <ProfileImage user={this.state.data.ownerUser ? this.state.data.ownerUser : this.state.currentUserProfile} size="small" />
                  <Text>Members ({this.state.data.members == null ? "0" : this.state.data.members.items.length})</Text>

                  {
                    this.state.data.members == null ? <Text>No Members Yet</Text> :
                      this.state.data.members.items.length == 0 ?
                        <Text>No Members Yet</Text> :
                        this.state.data.members.items.map((item: any) => {
                          return (<ProfileImage user={item} size="small" />)
                        })}
                  {this.state.canJoin ?
                    <JCButton onPress={() => { this.join() }} buttonType={ButtonTypes.Outline} >Join Organization</JCButton> :
                    null
                  }
                  {this.state.canLeave ?
                    <JCButton onPress={() => { this.leave() }} buttonType={ButtonTypes.Outline} >Leave Organization</JCButton> :
                    null
                  }
                  {this.state.createNew ?
                    <JCButton onPress={() => { this.createNew() }} buttonType={ButtonTypes.Outline}>Create Organization</JCButton>
                    : null
                  }
                  {this.state.canSave ?
                    <JCButton onPress={() => { this.save() }} buttonType={ButtonTypes.Outline}>Save Organization</JCButton>
                    : null
                  }
                  <Text>{this.state.validationError}</Text>
                </Container>
                <Container style={{ flex: 70, flexDirection: "column", alignContent: 'flex-start', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
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
