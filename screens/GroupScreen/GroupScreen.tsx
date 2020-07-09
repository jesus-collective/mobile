import React, { lazy } from 'react';
import { StyleProvider, Container, Content, View } from 'native-base';
import JCButton, { ButtonTypes } from '../../components/Forms/JCButton'
import { Text, TouchableOpacity } from 'react-native'

import Header from '../../components/Header/Header'
import MyMap from '../../components/MyMap/MyMap';

import getTheme from '../../native-base-theme/components';
import EditableText from '../../components/Forms/EditableText'
import Validate from '../../components/Validate/Validate'
import JCSwitch from '../../components/JCSwitch/JCSwitch';

import { API, graphqlOperation, Auth, Analytics } from 'aws-amplify';
import { CreateGroupInput } from '../../src/API'
import * as mutations from '../../src/graphql/mutations';
import * as queries from '../../src/graphql/queries';
import GRAPHQL_AUTH_MODE from 'aws-amplify-react-native'
import ProfileImage from '../../components/ProfileImage/ProfileImage'
import JCComponent, { JCState } from '../../components/JCComponent/JCComponent';
import { MapData } from 'components/MyGroups/MyGroups';

const MessageBoard = lazy(() => import('../../components/MessageBoard/MessageBoard'));


interface Props {
  navigation: any
  route: any
}
interface State extends JCState {
  showMap: boolean
  loadId: string
  data: any
  createNew: boolean
  canSave: boolean
  canLeave: boolean
  canJoin: boolean
  isEditable: boolean
  canDelete: boolean
  validationError: string
  currentUser: string
  currentUserProfile: any
  memberIDs: string[]
  members: any
  mapData: MapData[]
}



export default class GroupScreen extends JCComponent<Props, State>{
  constructor(props: Props) {
    super(props);

    this.state = {
      ...super.getInitialState(),
      showMap: false,
      loadId: props.route.params.id,
      createNew: props.route.params.create === "true" || props.route.params.create === true ? true : false,
      data: null,
      canSave: false,
      canLeave: false,
      canJoin: false,
      isEditable: false,
      canDelete: false,
      validationError: "",
      currentUser: null,
      currentUserProfile: null,
      memberIDs: [],
      members: [],
      mapData: []
    }
    Auth.currentAuthenticatedUser().then((user: any) => {
      this.setState({
        currentUser: user.username
      })
      const getUser: any = API.graphql(graphqlOperation(queries.getUser, { id: user['username'] }));
      getUser.then((json) => {
        this.setState({
          currentUserProfile: json.data.getUser,

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
  getValueFromKey(myObject: any, string: any): string {
    const key = Object.keys(myObject).filter(k => k.includes(string));
    return key.length ? myObject[key[0]] : "";
  }
  setInitialData(props: Props): void {
    if (props.route.params.create === true || props.route.params.create === "true")
      Auth.currentAuthenticatedUser().then((user: any) => {
        const z: CreateGroupInput = {
          id: "group-" + Date.now(),
          owner: user.username,
          type: "group",
          name: "",
          description: "",
          memberCount: 1,
          image: "temp",
          isSponsored: "false"
          // ownerOrgID: "00000000-0000-0000-0000-000000000000"
        }
        const isEditable = true
        this.setState({
          data: z,
          isEditable: isEditable,
          canLeave: true && !isEditable,
          canJoin: true && !isEditable,
          canSave: (!this.state.createNew) && isEditable,
          createNew: this.state.createNew && isEditable,
          canDelete: (!this.state.createNew) && isEditable
        })
      })
    else {
      const getGroup: any = API.graphql({
        query: queries.getGroup,
        variables: { id: props.route.params.id, messages: { sortDirection: "ASC" } },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
      });
      const processResults = (json) => {
        const isEditable = json.data.getGroup.owner == this.state.currentUser

        this.setState({
          data: json.data.getGroup,
          memberIDs: json.data.getGroup.members.items.map(item => item.userID),
          isEditable: isEditable,
          canLeave: true && !isEditable,
          canJoin: true && !isEditable,
          canSave: (!this.state.createNew) && isEditable,
          createNew: this.state.createNew && isEditable,
          canDelete: (!this.state.createNew) && isEditable
        },

          () => {
            const groupMemberByUser: any = API.graphql({
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
            });

            this.state.memberIDs.map(id => {
              const getUser: any = API.graphql({
                query: queries.getUser,
                variables: { id: id },
                authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
              });
              getUser.then((json: any) => {
                this.setState({ members: this.state.members.concat(json.data.getUser) }, () => {
                  this.setState({ mapData: this.state.mapData.concat(this.convertProfileToMapData(this.state.members)) })
                })
              }).catch((e: any) => {
                if (e.data) {
                  this.setState({ members: this.state.members.concat(e.data.getUser) }, () => {
                    this.setState({ mapData: this.state.mapData.concat(this.convertProfileToMapData(this.state.members)) })
                  })
                }
              })
            });

            const getUser: any = API.graphql({
              query: queries.getUser,
              variables: { id: this.state.data.owner },
              authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
            });
            getUser.then((json: any) => {
              this.setState({ mapData: this.state.mapData.concat(this.convertProfileToMapData([json.data.getUser])) })
            }).catch((e: any) => {
              if (e.data) {
                this.setState({ mapData: this.state.mapData.concat(this.convertProfileToMapData([e.data.getUser])) })
              }
            });
          }
        )
      }
      getGroup.then(processResults).catch(processResults)
    }
  }
  convertProfileToMapData(data: any): MapData[] {
    return data.map((dataItem) => {
      if (dataItem?.location && dataItem?.location?.latitude && dataItem?.location?.longitude) {
        return {
          latitude: dataItem.location.latitude,
          longitude: dataItem.location.longitude,
          name: dataItem.given_name + " " + dataItem.family_name,
          user: dataItem,
          link: "",
          type: "profile"
        }
      }
      else return null
    }).filter(o => o)
  }
  mapChanged = (): void => {
    this.setState({ showMap: !this.state.showMap })
  }
  validate(): boolean {
    const validation: any = Validate.Group(this.state.data)
    this.setState({ validationError: validation.validationError })
    return validation.result
  }
  createNew(): void {
    if (this.validate()) {
      const createGroup: any = API.graphql({
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
  clean(item: any): void {
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
    delete item.ownerOrg
    return item
  }
  save(): void {
    if (this.validate()) {
      const updateGroup: any = API.graphql({
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
  leave(): void {
    Analytics.record({
      name: 'leftGroup',
      // Attribute values must be strings
      attributes: { id: this.state.data.id, name: this.state.data.name }
    });
    const groupMemberByUser: any = API.graphql({
      query: queries.groupMemberByUser,
      variables: { userID: this.state.currentUser, groupID: { eq: this.state.data.id } },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
    });
    groupMemberByUser.then((json: any) => {
      console.log({ "Success queries.groupMemberByUser": json });

      json.data.groupMemberByUser.items.map((item) => {
        const deleteGroupMember: any = API.graphql({
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

      const remainingUsers = this.state.memberIDs.filter(user => user !== this.state.currentUser)
      this.setState({ canJoin: true, canLeave: false, memberIDs: remainingUsers })
      this.renderButtons()

    }).catch((err: any) => {
      console.log({ "Error queries.groupMemberByUser": err });
    });

  }
  join(): void {
    Analytics.record({
      name: 'joinedGroup',
      // Attribute values must be strings
      attributes: { id: this.state.data.id, name: this.state.data.name }
    });
    const createGroupMember: any = API.graphql({
      query: mutations.createGroupMember,
      variables: { input: { groupID: this.state.data.id, userID: this.state.currentUser } },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
    });
    createGroupMember.then((json: any) => {

      console.log({ "Success mutations.createGroupMember": json });
    }).catch((err: any) => {
      console.log({ "Error mutations.createGroupMember": err });
    });

    this.setState({ canJoin: false, canLeave: true, memberIDs: this.state.memberIDs.concat(this.state.currentUser) })
    this.renderButtons()
  }
  delete(): void {
    const deleteGroup: any = API.graphql({
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
  updateValue(field: any, value: any): void {
    const temp = this.state.data
    temp[field] = value
    this.setState({ data: temp })
  }
  showProfile(id: string): void {
    console.log("Navigate to profileScreen")
    this.props.navigation.push("ProfileScreen", { id: id, create: false });
  }
  renderButtons(): React.ReactNode {
    return (
      <Container style={{ minHeight: 30 }}>
        {this.state.canJoin ?
          <JCButton buttonType={ButtonTypes.OutlineBoldNoMargin} onPress={() => { this.join() }} >Join Group</JCButton> :
          null
        }
        {this.state.canLeave ?
          <JCButton buttonType={ButtonTypes.OutlineBoldNoMargin} onPress={() => { this.leave() }} >Leave Group</JCButton> :
          null
        }
        {this.state.createNew ?
          <JCButton buttonType={ButtonTypes.OutlineBoldNoMargin} onPress={() => { this.createNew() }} >Create Group</JCButton>
          : null
        }
        {this.state.canSave ?
          <JCButton buttonType={ButtonTypes.OutlineBoldNoMargin} onPress={() => { this.save() }} >Save Group</JCButton>
          : null
        }
        {this.state.canDelete ?
          <JCButton buttonType={ButtonTypes.OutlineBoldNoMargin} onPress={() => { if (window.confirm('Are you sure you wish to delete this group?')) this.delete() }}>Delete Group</JCButton>
          : null
        }
        <Text>{this.state.validationError}</Text>
      </Container>
    )
  }
  render(): React.ReactNode {
    //console.log(this.state)
    console.log("GroupScreen")
    return (
      this.state.data ?
        <StyleProvider style={getTheme()}>
          <Container >
            <Header title="Jesus Collective" navigation={this.props.navigation} onMapChange={this.state.createNew ? null : this.mapChanged} />
            <Content>
              <MyMap type={"no-filters"} size={'25%'} visible={this.state.showMap} mapData={this.state.mapData}></MyMap>
              <Container style={this.styles.style.groupScreenMainContainer}>
                <Container style={this.styles.style.detailScreenLeftCard}>
                  <Container style={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-between", flexGrow: 0, marginBottom: 20 }}>
                    <Text style={{ fontSize: 12, lineHeight: 16, fontFamily: "Graphik-Regular-App", color: '#333333', textTransform: "uppercase", flex: 0 }}>Group</Text>
                    {this.state.isEditable ?
                      <JCSwitch switchLabel="Sponsored" initState={this.state.data.isSponsored ? this.state.data.isSponsored === "true" : false} onPress={(status) => { this.updateValue("isSponsored", status ? "true" : "false") }}></JCSwitch>
                      :
                      this.state.data.isSponsored == "true" ?
                        <Text style={{ fontSize: 12, lineHeight: 16, fontFamily: "Graphik-Regular-App", color: '#979797', textTransform: "uppercase", flex: 0 }}>Sponsored</Text>
                        : null
                    }
                  </Container>

                  <View>
                    <EditableText onChange={(value: any) => { this.updateValue("name", value) }} placeholder="Enter Group Name" multiline={false} textStyle={this.styles.style.groupNameInput} inputStyle={this.styles.style.groupNameInput} value={this.state.data.name} isEditable={this.state.isEditable}></EditableText>
                    <EditableText onChange={(value: any) => { this.updateValue("description", value) }} placeholder="Enter Group Description" multiline={true} textStyle={this.styles.style.groupDescriptionInput} inputStyle={this.styles.style.groupDescriptionInput} value={this.state.data.description} isEditable={this.state.isEditable}></EditableText>
                  </View>

                  <Text style={{ fontFamily: "Graphik-Regular-App", fontSize: 16, lineHeight: 23, color: "#333333", paddingBottom: 12 }}>Organizer</Text>
                  <TouchableOpacity onPress={() => { this.showProfile(this.state.data.ownerUser ? this.state.data.ownerUser.id : this.state.currentUserProfile.id) }}>
                    <ProfileImage user={this.state.data.ownerUser ? this.state.data.ownerUser : this.state.currentUserProfile} size="small" />
                  </TouchableOpacity>
                  <Text style={{ fontFamily: "Graphik-Bold-App", fontSize: 20, lineHeight: 25, letterSpacing: -0.3, color: "#333333", paddingTop: 48, paddingBottom: 12 }}>Members ({this.state.memberIDs.length})</Text>
                  <View style={this.styles.style.groupAttendeesPictures}>
                    {this.state.memberIDs.length == 0 ?
                      <Text style={{ fontFamily: "Graphik-Bold-App", fontSize: 16, lineHeight: 24, letterSpacing: -0.3, color: "#333333", marginBottom: 30 }}>No Members Yet</Text> :
                      this.state.memberIDs.map((id: any, index: any) => {
                        return (
                          <TouchableOpacity key={index} onPress={() => { this.showProfile(id) }}>
                            <ProfileImage key={index} user={id} size="small" />
                          </TouchableOpacity>
                        )
                      })}
                  </View>

                  {this.renderButtons()}
                </Container>
                <Container style={this.styles.style.detailScreenRightCard}>
                  <MessageBoard groupId={this.state.data.id}></MessageBoard>
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
