import { GraphQLResult } from "@aws-amplify/api/lib/types"
import { AntDesign } from "@expo/vector-icons"
import { Analytics, API, Auth, graphqlOperation } from "aws-amplify"
import GRAPHQL_AUTH_MODE from "aws-amplify-react-native"
import moment from "moment-timezone"
import { CardItem, Container, Content, Icon, Picker, StyleProvider, View } from "native-base"
import React, { lazy } from "react"
import { Image, Text, TouchableOpacity } from "react-native"
import { JCCognitoUser } from "src/types"
import EditableDate from "../../components/Forms/EditableDate"
import EditableLocation from "../../components/Forms/EditableLocation"
import EditableText from "../../components/Forms/EditableText"
import EditableUrl from "../../components/Forms/EditableUrl"
import JCButton, { ButtonTypes } from "../../components/Forms/JCButton"
import Header from "../../components/Header/Header"
import JCComponent, { JCState } from "../../components/JCComponent/JCComponent"
import JCSwitch from "../../components/JCSwitch/JCSwitch"
import { MapData } from "../../components/MyGroups/MyGroups"
import MyMap from "../../components/MyMap/MyMap"
import ProfileImage from "../../components/ProfileImage/ProfileImage"
import Validate from "../../components/Validate/Validate"
import getTheme from "../../native-base-theme/components"
import {
  CreateGroupInput,
  CreateGroupMemberMutation,
  CreateGroupMutation,
  DeleteGroupMemberMutation,
  DeleteGroupMutation,
  GetGroupQuery,
  GetUserQuery,
  GroupMemberByUserQuery,
  UpdateGroupMutation,
  UserGroupType,
} from "../../src/API"
import * as customQueries from "../../src/graphql-custom/queries"
import * as mutations from "../../src/graphql/mutations"
import * as queries from "../../src/graphql/queries"
const MessageBoard = lazy(() => import("../../components/MessageBoard/MessageBoard"))

interface Props {
  navigation: any
  route: any
}
interface State extends JCState {
  groupType: "event" | "group"
  showMap: boolean
  loadId: string
  data: GetGroupQuery["getGroup"] | CreateGroupInput
  createNew: boolean
  canSave: boolean
  canLeave: boolean
  canJoin: boolean
  isEditable: boolean
  canDelete: boolean
  validationError: string
  currentUser: string | null
  currentUserProfile: GetUserQuery["getUser"]
  memberIDs: string[]
  members: any
  mapData: MapData[]
  initCenter: any
  ownsOrgs: GetUserQuery["getUser"]["organizations"]["items"]
}

export default class EventScreen extends JCComponent<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      ...super.getInitialState(),
      showMap: false,
      groupType: props.route.params.groupType,
      loadId: props.route.params.id,
      createNew:
        props.route.params.create === "true" || props.route.params.create === true ? true : false,
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
      mapData: [],
      ownsOrgs: [],
    }
    if (this.state.groupType == "event")
      this.state = { ...this.state, initCenter: { lat: 44, lng: -78 } }
    Auth.currentAuthenticatedUser().then((user: JCCognitoUser) => {
      this.setState({
        currentUser: user.username,
      })
      const getUser = API.graphql(
        graphqlOperation(customQueries.getUserForGroupOrEvent, { id: user["username"] })
      ) as Promise<GraphQLResult<GetUserQuery>>
      getUser
        .then((json) => {
          console.log(json)
          if (json.data) {
            this.setState(
              {
                currentUserProfile: json.data.getUser,
                ownsOrgs: json.data.getUser.organizations.items.filter(
                  (item) => item?.userRole === "superAdmin" || item?.userRole === "admin"
                ),
              },
              () => {
                this.setInitialData(props)
              }
            )
          }
        })
        .catch((e: GraphQLResult<GetUserQuery>) => {
          if (e.data?.getUser) {
            this.setState(
              {
                currentUserProfile: e.data.getUser,
                ownsOrgs: e.data.getUser.organizations.items.filter(
                  (item) => item?.userRole === "superAdmin" || item?.userRole === "admin"
                ),
              },
              () => {
                this.setInitialData(props)
              }
            )
          }

          console.error({ "Error Loading User": e })
        })
    })
  }
  /* getValueFromKey(myObject: unknown, string: string): string {
    const key = Object.keys(myObject).filter((k) => k.includes(string))
    return key.length ? myObject[key[0]] : ""
  }*/
  setInitialData(props: Props): void {
    if (props.route.params.create === true || props.route.params.create === "true") {
      Auth.currentAuthenticatedUser().then((user: JCCognitoUser) => {
        let z: CreateGroupInput = {
          id: this.state.groupType + "-" + Date.now(),
          owner: user.username,
          type: this.state.groupType,
          name: "",
          description: "",
          memberCount: 1,
          image: "temp",
          isSponsored: "false",
          ownerOrgID: "0000000000000",
          readGroups: [
            UserGroupType.partners,
            UserGroupType.legacyUserGroup1,
            UserGroupType.subscriptionPartners,
          ],
        }
        if (this.state.groupType == "event")
          z = { ...z, eventType: "zoom", time: null, location: "" }

        const isEditable = true
        this.setState({
          data: z,
          isEditable: isEditable,
          canLeave: true && !isEditable,
          canJoin: true && !isEditable,
          canSave: !this.state.createNew && isEditable,
          createNew: this.state.createNew && isEditable,
          canDelete: !this.state.createNew && isEditable,
        })
      })
    } else {
      const getGroup = API.graphql({
        query: queries.getGroup,
        variables: { id: props.route.params.id, messages: { sortDirection: "ASC" } },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      }) as Promise<GraphQLResult<GetGroupQuery>>
      const processResults = (json: GraphQLResult<GetGroupQuery>) => {
        if (json.data && json.data.getGroup) {
          const isEditable = json.data.getGroup.owner == this.state.currentUser
          this.setState(
            {
              data: json.data.getGroup,
              memberIDs: json.data.getGroup.members.items.map((item) => item?.userID),
              isEditable: isEditable,
              canLeave: true && !isEditable,
              canJoin: true && !isEditable,
              canSave: !this.state.createNew && isEditable,
              createNew: this.state.createNew && isEditable,
              canDelete: !this.state.createNew && isEditable,
            },

            () => {
              if (this.state.groupType == "event") this.convertEventToMapData()
              else this.convertProfileToMapData()
              if (this.state.data) {
                const groupMemberByUser = API.graphql({
                  query: queries.groupMemberByUser,
                  variables: {
                    userID: this.state.currentUser,
                    groupID: { eq: this.state.data.id },
                  },
                  authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
                }) as Promise<GraphQLResult<GroupMemberByUserQuery>>
                groupMemberByUser.then((json: GraphQLResult<GroupMemberByUserQuery>) => {
                  console.log({ groupMemberByUser: json })
                  if (json.data.groupMemberByUser.items.length > 0)
                    this.setState({ canJoin: false, canLeave: true && !this.state.isEditable })
                  else this.setState({ canJoin: true && !this.state.isEditable, canLeave: false })
                })
              }
              /*
            this.state.memberIDs.map((id) => {
              const getUser: any = API.graphql({
                query: queries.getUser,
                variables: { id: id },
                authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
              })
              getUser
                .then((json: any) => {
                  this.setState({ members: this.state.members.concat(json.data.getUser) }, () => {
                    this.setState({
                      mapData: this.state.mapData.concat(
                        this.convertProfileToMapData(this.state.members)
                      ),
                    })
                  })
                })
                .catch((e: any) => {
                  if (e.data) {
                    this.setState({ members: this.state.members.concat(e.data.getUser) }, () => {
                      this.setState({
                        mapData: this.state.mapData.concat(
                          this.convertProfileToMapData(this.state.members)
                        ),
                      })
                    })
                  }
                })
            })
            const getUser: any = API.graphql({
              query: queries.getUser,
              variables: { id: this.state.data.owner },
              authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
            })
            getUser
              .then((json: any) => {
                this.setState({
                  mapData: this.state.mapData.concat(
                    this.convertProfileToMapData([json.data.getUser])
                  ),
                })
              })
              .catch((e: any) => {
                if (e.data) {
                  this.setState({
                    mapData: this.state.mapData.concat(
                      this.convertProfileToMapData([e.data.getUser])
                    ),
                  })
                }
              })
          */
            }
          )
        }
      }
      getGroup.then(processResults).catch(processResults)
    }
  }
  convertEventToMapData(): void {
    const data = this.state.data
    if (data)
      if (data.locationLatLong && data.locationLatLong.latitude && data.locationLatLong.longitude)
        this.setState({
          mapData: [
            {
              latitude: data.locationLatLong.latitude,
              longitude: data.locationLatLong.longitude,
              name: data.name,
              event: data,
              link: "",
              type: "event",
            },
          ],
          initCenter: { lat: data.locationLatLong.latitude, lng: data.locationLatLong.longitude },
        })
  }
  convertProfileToMapData(): MapData[] | null {
    const data = this.state.data

    /* return data
      .map((dataItem) => {
        if (dataItem?.location && dataItem?.location?.latitude && dataItem?.location?.longitude) {
          return {
            latitude: Number(dataItem.location.latitude) + Number(dataItem.location.randomLatitude),
            longitude:
              Number(dataItem.location.longitude) + Number(dataItem.location.randomLongitude),
            name: dataItem.given_name + " " + dataItem.family_name,
            user: dataItem,
            link: "",
            type: "profile",
          }
        } else return null
      })
      .filter((o) => o)*/
    return null
  }
  mapChanged = (): void => {
    this.setState({ showMap: !this.state.showMap })
  }
  validate(): boolean {
    let validation
    if (this.state.groupType == "event") validation = Validate.Event(this.state.data)
    else validation = Validate.Group(this.state.data)
    this.setState({ validationError: validation.validationError })
    return validation.result
  }
  async createNew(): Promise<void> {
    if (this.validate()) {
      try {
        const createGroup = (await API.graphql({
          query: mutations.createGroup,
          variables: { input: this.state.data },
          authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
        })) as Promise<GraphQLResult<CreateGroupMutation>>
        this.setState(
          {
            createNew: false,
          },
          () => {
            this.setState(
              {
                canSave: !this.state.createNew && this.state.isEditable,
                createNew: this.state.createNew && this.state.isEditable,
                canDelete: !this.state.createNew && this.state.isEditable,
              },
              async () => {
                await this.join()
              }
            )
          }
        )
        console.log({ "Success mutations.createGroup": createGroup })
      } catch (err) {
        console.log({ "Error mutations.createGroup": err })
      }
    }
  }
  clean(item: any): void {
    delete item.members
    delete item.messages
    delete item.organizerGroup
    delete item.organizerUser
    delete item.backOfficeStaff
    delete item.instructors
    delete item.ownerUser
    delete item._deleted
    delete item._lastChangedAt
    delete item.createdAt
    delete item.updatedAt
    delete item.ownerOrg
    return item
  }
  async save(): Promise<void> {
    if (this.validate()) {
      try {
        const updateGroup = (await API.graphql({
          query: mutations.updateGroup,
          variables: { input: this.clean(this.state.data) },
          authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
        })) as Promise<GraphQLResult<UpdateGroupMutation>>
        console.log({ "Success mutations.updateGroup": updateGroup })
      } catch (err) {
        console.log({ "Error mutations.updateGroup": err })
      }
    }
  }
  async leave(): Promise<void> {
    if (this.state.data) {
      try {
        Analytics.record({
          name: "left" + this.state.groupType,
          // Attribute values must be strings
          attributes: { id: this.state.data.id, name: this.state.data.name },
        })
        const groupMemberByUser = (await await API.graphql({
          query: queries.groupMemberByUser,
          variables: { userID: this.state.currentUser, groupID: { eq: this.state.data.id } },
          authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
        })) as Promise<GraphQLResult<GroupMemberByUserQuery>>
        console.log({ "Success queries.groupMemberByUser": groupMemberByUser })
        const groupResponse = await groupMemberByUser
        const responseArr = groupResponse?.data?.groupMemberByUser?.items
        if (responseArr)
          for (let i = 0; i < responseArr?.length; i++) {
            if (responseArr?.[i]?.id) {
              try {
                const deleteGroupMember = (await API.graphql({
                  query: mutations.deleteGroupMember,
                  variables: { input: { id: responseArr[i]?.id } },
                  authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
                })) as Promise<GraphQLResult<DeleteGroupMemberMutation>>
                console.log({ "Success mutations.deleteGroupMember": deleteGroupMember })
                const remainingUsers = this.state.memberIDs.filter(
                  (user) => user !== this.state.currentUser
                )
                this.setState({
                  canJoin: true,
                  canLeave: false,
                  memberIDs: remainingUsers,
                })
                this.renderButtons()
              } catch (err) {
                console.log({ "Error mutations.deleteGroupMember": err })
                const remainingUsers = this.state.memberIDs.filter(
                  (user) => user !== this.state.currentUser
                )
                this.setState({
                  canJoin: true,
                  canLeave: false,
                  memberIDs: remainingUsers,
                })
                this.renderButtons()
              }
            }
          }
      } catch (err) {
        console.log({ "Error queries.groupMemberByUser": err })
      }
    }
  }
  async join(): Promise<void> {
    if (this.state.data) {
      try {
        Analytics.record({
          name: "joined" + this.state.groupType,
          // Attribute values must be strings
          attributes: { id: this.state.data.id, name: this.state.data.name },
        })
        const createGroupMember = (await API.graphql({
          query: mutations.createGroupMember,
          variables: { input: { groupID: this.state.data.id, userID: this.state.currentUser } },
          authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
        })) as Promise<GraphQLResult<CreateGroupMemberMutation>>
        console.log({ "Success mutations.createGroupMember": createGroupMember })
        this.setState({
          canJoin: false,
          canLeave: true,
          memberIDs: this.state.currentUser
            ? this.state.memberIDs.concat(this.state.currentUser)
            : this.state.memberIDs,
        })
        this.renderButtons()
      } catch (err) {
        console.log({ "Error mutations.createGroupMember": err })
        this.setState({
          canJoin: false,
          canLeave: true,
          memberIDs: this.state.currentUser
            ? this.state.memberIDs.concat(this.state.currentUser)
            : this.state.memberIDs,
        })
        this.renderButtons()
      }
    }
  }
  async delete(): Promise<void> {
    if (this.state.data) {
      try {
        const deleteGroup = (await API.graphql({
          query: mutations.deleteGroup,
          variables: { input: { id: this.state.data.id } },
          authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
        })) as Promise<GraphQLResult<DeleteGroupMutation>>
        console.log({ "Success mutations.deleteGroup": deleteGroup })
        this.props.navigation.push("HomeScreen")
      } catch (err) {
        console.log({ "Error mutations.deleteGroup": err })
      }
    }
  }
  updateValue(field: string, value: any): void {
    const temp = this.state.data
    temp[field] = value
    this.setState({ data: temp })
  }
  showProfile(id: string): void {
    console.log("Navigate to profileScreen")
    this.props.navigation.push("ProfileScreen", { id: id, create: false })
  }
  showOrg(id: string): void {
    console.log("Navigate to org")
    this.props.navigation.push("OrganizationScreen", { id: id, create: false })
  }
  capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }
  renderPermissions(): React.ReactNode {
    return (
      this.state.isEditable && (
        <View style={{ marginBottom: 35 }}>
          <Text style={{ fontWeight: "bold" }}>Permissions</Text>
          <Picker
            mode="dropdown"
            style={{
              width: "100%",
              marginTop: 10,
              marginBottom: 30,
              fontSize: 16,
              height: 30,
              flexGrow: 0,
              paddingTop: 3,
              paddingBottom: 3,
            }}
            selectedValue={null}
            onValueChange={(value: string) => {
              console.log({ value: value })
              let tmp = this.state.data.readGroups
              if (!tmp) tmp = []
              tmp.push(value as UserGroupType)
              this.updateValue("readGroups", tmp)
            }}
          >
            <Picker.Item key={null} label={"Add Group"} value={null} />
            {Object.keys(UserGroupType).map((org: string) => {
              return <Picker.Item key={org} label={org} value={org} />
            })}
          </Picker>
          {this.state.data?.readGroups?.map((item: UserGroupType | null, index: number) => {
            return (
              <React.Fragment key={index}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ fontWeight: "normal" }}>{item}</Text>
                  <TouchableOpacity
                    style={{ alignSelf: "center", marginLeft: 15 }}
                    onPress={() => {
                      if (this.state.data) {
                        let tmp = this.state.data.readGroups
                        if (!tmp) tmp = []
                        tmp.splice(index, 1)
                        this.updateValue("readGroups", tmp)
                      }
                    }}
                  >
                    <AntDesign name="close" size={20} color="black" />
                  </TouchableOpacity>
                </View>
              </React.Fragment>
            )
          })}
        </View>
      )
    )
  }
  renderButtons(): React.ReactNode {
    return (
      <Container style={this.styles.style.eventCreationScreenCreateContainer}>
        {this.state.canJoin ? (
          <JCButton
            buttonType={ButtonTypes.OutlineBoldNoMargin}
            onPress={async () => {
              await this.join()
            }}
          >
            {this.state.groupType == "event" ? "Attend" : "Join Group"}
          </JCButton>
        ) : null}
        {this.state.canLeave ? (
          <JCButton
            buttonType={ButtonTypes.OutlineBoldNoMargin}
            onPress={async () => {
              await this.leave()
            }}
          >
            {this.state.groupType == "event" ? "Don't Attend" : "Leave Group"}
          </JCButton>
        ) : null}
        {this.state.createNew ? (
          <Text style={{ fontWeight: "bold" }}>Create as organization:</Text>
        ) : null}
        {this.state.createNew ? (
          <Picker
            mode="dropdown"
            style={{
              width: "100%",
              marginTop: 10,
              marginBottom: 30,
              fontSize: 16,
              height: 30,
              flexGrow: 0,
              paddingTop: 3,
              paddingBottom: 3,
            }}
            selectedValue={this.state.data.ownerOrgID}
            onValueChange={(value: any) => {
              this.updateValue("ownerOrgID", value)
            }}
          >
            <Picker.Item label="None selected" value="" />
            {this.state.ownsOrgs.map((org) => {
              return (
                <Picker.Item
                  key={org.organizationId}
                  label={org.organizationId}
                  value={org.organizationId}
                />
              )
            })}
          </Picker>
        ) : null}
        {this.state.createNew ? (
          <JCButton
            buttonType={ButtonTypes.OutlineBoldNoMargin}
            onPress={async () => {
              await this.createNew()
            }}
          >
            Create {this.capitalize(this.state.groupType)}
          </JCButton>
        ) : null}
        {this.state.canSave ? (
          <JCButton
            buttonType={ButtonTypes.OutlineBoldNoMargin}
            onPress={async () => {
              await this.save()
            }}
          >
            Save {this.capitalize(this.state.groupType)}
          </JCButton>
        ) : null}
        {this.state.canDelete ? (
          <JCButton
            buttonType={ButtonTypes.OutlineBoldNoMargin}
            onPress={async () => {
              if (window.confirm(`Are you sure you wish to delete this ${this.state.groupType}?`))
                await this.delete()
            }}
          >
            Delete {this.capitalize(this.state.groupType)}
          </JCButton>
        ) : null}
      </Container>
    )
  }

  render(): React.ReactNode {
    //console.log(this.state.data)
    console.log("Generic Group Screen")
    return this.state.data ? (
      <StyleProvider style={getTheme()}>
        <Container>
          <Header
            title="Jesus Collective"
            navigation={this.props.navigation}
            onMapChange={() => {
              if (this.state.data)
                !this.state.createNew && this.state.data.eventType === "location"
                  ? this.mapChanged
                  : null
            }}
          />
          <Content>
            <MyMap
              initCenter={this.state.initCenter}
              type={"no-filters"}
              size={"25%"}
              visible={this.state.showMap}
              mapData={this.state.mapData}
            ></MyMap>
            <Container style={this.styles.style.eventScreenMainContainer}>
              <Container style={this.styles.style.detailScreenLeftCard}>
                <Container
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "space-between",
                    flexGrow: 0,
                    marginBottom: 20,
                    height: "auto",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      lineHeight: 16,
                      fontFamily: "Graphik-Regular-App",
                      color: "#333333",
                      textTransform: "uppercase",
                      flex: 0,
                    }}
                  >
                    {this.capitalize(this.state.groupType)}
                  </Text>
                  {this.state.isEditable ? (
                    <JCSwitch
                      switchLabel="Sponsored"
                      initState={
                        this.state.data.isSponsored ? this.state.data.isSponsored === "true" : false
                      }
                      onPress={(status) => {
                        this.updateValue("isSponsored", status ? "true" : "false")
                      }}
                    ></JCSwitch>
                  ) : this.state.data.isSponsored == "true" ? (
                    <Text
                      style={{
                        fontSize: 12,
                        lineHeight: 16,
                        fontFamily: "Graphik-Regular-App",
                        color: "#979797",
                        textTransform: "uppercase",
                        flex: 0,
                      }}
                    >
                      Sponsored
                    </Text>
                  ) : null}
                </Container>

                <View>
                  <EditableText
                    onChange={(value: any) => {
                      this.updateValue("name", value)
                    }}
                    placeholder={"Enter " + this.capitalize(this.state.groupType) + " Name"}
                    multiline={false}
                    textStyle={this.styles.style.eventNameInput}
                    inputStyle={this.styles.style.eventNameInput}
                    value={this.state.data.name}
                    isEditable={this.state.isEditable}
                  ></EditableText>
                  <EditableText
                    onChange={(value: any) => {
                      this.updateValue("description", value)
                    }}
                    placeholder={"Enter " + this.capitalize(this.state.groupType) + " Description"}
                    multiline={true}
                    textStyle={this.styles.style.eventDescriptionInput}
                    inputStyle={this.styles.style.eventDescriptionInput}
                    value={this.state.data.description}
                    isEditable={this.state.isEditable}
                  ></EditableText>
                </View>
                {this.state.groupType == "event" && (
                  <>
                    <View>
                      {this.state.isEditable ? (
                        <EditableDate
                          type="datetime"
                          onChange={(time: any, timeZone: any) => {
                            this.updateValue("time", time)
                            this.updateValue("tz", timeZone)
                          }}
                          placeholder="Enter Event Time"
                          textStyle={this.styles.style.eventDateInput}
                          inputStyle={this.styles.style.eventDateInput}
                          value={this.state.data.time ?? ""}
                          tz={this.state.data.tz ? this.state.data.tz : moment.tz.guess()}
                          isEditable={this.state.isEditable}
                        ></EditableDate>
                      ) : (
                        <EditableDate
                          type="datetime"
                          onChange={(time: any, timeZone: any) => {
                            this.updateValue("time", time)
                            this.updateValue("tz", timeZone)
                          }}
                          placeholder="Enter Event Time"
                          textStyle={this.styles.style.eventDateInput}
                          inputStyle={this.styles.style.eventDateInput}
                          value={this.state.data.time ?? ""}
                          tz={moment.tz.guess()}
                          isEditable={this.state.isEditable}
                        ></EditableDate>
                      )}
                    </View>

                    {this.state.isEditable ? (
                      <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="arrow-down" />}
                        style={{
                          width: "50%",
                          marginBottom: 30,
                          marginTop: 55,
                          fontSize: 16,
                          height: 30,
                          flexGrow: 0,
                        }}
                        placeholder="Event type"
                        placeholderStyle={{ color: "#bfc6ea" }}
                        placeholderIconColor="#007aff"
                        selectedValue={this.state.data.eventType}
                        onValueChange={(value: any) => {
                          this.updateValue("eventType", value)
                        }}
                      >
                        <Picker.Item label="Zoom" value="zoom" />
                        <Picker.Item label="Location" value="location" />
                        <Picker.Item label="Eventbrite" value="eventbrite" />
                      </Picker>
                    ) : null}
                    {this.state.data.eventType != "location" ? (
                      <EditableUrl
                        title={
                          this.state.data.eventType == "eventbrite"
                            ? "Open in Eventbrite"
                            : "Open in Zoom"
                        }
                        onChange={(value: any) => {
                          this.updateValue("eventUrl", value)
                        }}
                        placeholder="Enter Event URL"
                        multiline={false}
                        textStyle={ButtonTypes.Solid}
                        inputStyle={this.styles.style.eventEditableURL}
                        value={this.state.data.eventUrl ?? ""}
                        isEditable={this.state.isEditable}
                      ></EditableUrl>
                    ) : (
                      <CardItem style={{ paddingLeft: 0, paddingRight: 0 }}>
                        <Image
                          style={{ width: "22px", height: "22px", marginRight: 5 }}
                          source={require("../../assets/svg/pin 2.svg")}
                        ></Image>
                        <EditableLocation
                          onChange={(value: any, location: any) => {
                            this.updateValue("location", value)
                            console.log(location)
                            if (location != undefined && location != null)
                              this.updateValue("locationLatLong", {
                                latitude: location.lat,
                                longitude: location.lng,
                              })
                            else this.updateValue("locationLatLong", null)
                          }}
                          placeholder="Enter Event Location"
                          multiline={false}
                          textStyle={this.styles.style.fontRegular}
                          inputStyle={this.styles.style.groupNameInput}
                          value={this.state.data.location ?? ""}
                          isEditable={this.state.isEditable}
                        ></EditableLocation>
                      </CardItem>
                    )}
                  </>
                )}
                <Text
                  style={{
                    fontFamily: "Graphik-Regular-App",
                    fontSize: 16,
                    lineHeight: 23,
                    color: "#333333",
                    paddingBottom: 12,
                    marginTop: 52,
                  }}
                >
                  Organizer
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    if (this.state.data)
                      this.state.data.ownerOrg
                        ? this.showOrg(this.state.data.ownerOrg.id)
                        : this.showProfile(
                            this.state.data.ownerUser
                              ? this.state.data.ownerUser.id
                              : this.state.currentUserProfile.id
                          )
                  }}
                >
                  <ProfileImage
                    user={
                      this.state.data.ownerOrg
                        ? this.state.data.ownerOrg.id
                        : this.state.data.ownerUser
                        ? this.state.data.ownerUser
                        : this.state.currentUserProfile
                    }
                    size="small"
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    fontFamily: "Graphik-Bold-App",
                    fontSize: 20,
                    lineHeight: 25,
                    letterSpacing: -0.3,
                    color: "#333333",
                    paddingTop: 48,
                    paddingBottom: 12,
                  }}
                >
                  {this.state.groupType == "event" ? "Attending" : "Members"}(
                  {this.state.memberIDs.length})
                </Text>
                <View style={this.styles.style.eventAttendeesPictures}>
                  {this.state.memberIDs.length == 0 ? (
                    <Text
                      style={{
                        fontFamily: "Graphik-Bold-App",
                        fontSize: 16,
                        lineHeight: 24,
                        letterSpacing: -0.3,
                        color: "#333333",
                        marginBottom: 30,
                      }}
                    >
                      No {this.state.groupType == "event" ? "Attendees" : "Members"} Yet
                    </Text>
                  ) : (
                    this.state.memberIDs.map((id: any, index: any) => {
                      return (
                        <TouchableOpacity
                          key={index}
                          onPress={() => {
                            this.showProfile(id)
                          }}
                        >
                          <ProfileImage key={index} user={id} size="small" />
                        </TouchableOpacity>
                      )
                    })
                  )}
                </View>
                {this.renderPermissions()}
                {this.renderButtons()}
                <Text style={{ marginTop: 170, color: "red", fontWeight: "bold" }}>
                  {this.state.validationError}
                </Text>
              </Container>
              <Container style={this.styles.style.detailScreenRightCard}>
                <MessageBoard replies style="regular" groupId={this.state.data.id}></MessageBoard>
                {/*  <Zoom></Zoom>*/}
              </Container>
            </Container>
          </Content>
        </Container>
      </StyleProvider>
    ) : null
  }
}
