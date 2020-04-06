import React from 'react';
import { StyleProvider, Container, Content } from 'native-base';
import JCButton, { ButtonTypes } from '../../components/Forms/JCButton'

import { Text } from 'react-native'

import Header from '../../components/Header/Header'
import MyMap from '../../components/MyMap/MyMap';
import styles from '../../components/style.js'
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import MessageBoard from '../../components/MessageBoard/MessageBoard'
import EditableText from '../../components/Forms/EditableText'
import Validate from '../../components/Validate/Validate'
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { CreateGroupInput } from '../../src/API'
import * as mutations from '../../src/graphql/mutations';
import * as queries from '../../src/graphql/queries';
import {GRAPHQL_AUTH_MODE} from 'aws-amplify-react-native'
import ProfileImage from '../../components/ProfileImage/ProfileImage'
import ResourceViewer from '../../components/ResourceViewer/ResourceViewer'
import ImportKidsandYouth from './ImportKidsandYouth'


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



export default class GroupScreen extends React.Component<Props, State>{
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
          id: "resource-" + Date.now(),
          owner: user.username,
          type: "resource",
          name: "",
          description: "",
          memberCount: 1,
          image: "temp"
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
        this.setState({ data: json.data.getGroup })
      }
      getGroup.then(processResults).catch(processResults)
    }
  }
  mapChanged = () => {
    this.setState({ showMap: !this.state.showMap })
  }
  validate(): boolean {
    var validation: any = Validate.Resource(this.state.data)
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

    var deleteGroupMember: any = API.graphql({
      query: mutations.deleteGroupMember,
      variables: { input: { id: this.state.data.id } },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
    });
    deleteGroupMember.then((json: any) => {
      this.setState({ canJoin: true, canLeave: false })
      console.log({ "Success mutations.deleteGroupMember": json });
    }).catch((err: any) => {
      console.log({ "Error mutations.deleteGroupMember": err });
    });
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
  //console.log(this.state)
    console.log("ResourceScreen")

    return (
      this.state.data ?
        <StyleProvider style={getTheme(material)}>
          <Container >
            <Header title="Jesus Collective" navigation={this.props.navigation} onMapChange={this.mapChanged} />
            <MyMap navigation={this.props.navigation} visible={this.state.showMap}></MyMap>
            <ResourceViewer navigation={this.props.navigation} groupId={this.state.data.id}></ResourceViewer>
          
          </Container>
        </StyleProvider>
        :
        null

    );
  }
}
