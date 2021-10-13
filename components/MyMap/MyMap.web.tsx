import { AntDesign } from "@expo/vector-icons"
import { useNavigation, useRoute } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { API, Auth, graphqlOperation } from "aws-amplify"
import { MapData } from "components/MyGroups/MyGroups"
import { Map, Marker } from "google-maps-react"
import moment from "moment"
//import {ProviderProps} from 'google-maps-react';
//import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Body, Card, CardItem, View } from "native-base"
import * as React from "react"
import { Dimensions, ScrollView, Text, TouchableOpacity } from "react-native"
import JCButton, { ButtonTypes } from "../../components/Forms/JCButton"
import ProfileImage from "../../components/ProfileImage/ProfileImage"
import * as queries from "../../src/graphql/queries"
import { GetUserQueryResult, GetUserQueryResultPromise, JCCognitoUser } from "../../src/types"
import ErrorBoundary from "../ErrorBoundry"
import JCComponent, { JCState } from "../JCComponent/JCComponent"
import JCSwitch from "../JCSwitch/JCSwitch"
import mapStyle from "./mapstyle.json"

interface Props {
  navigation?: StackNavigationProp<any, any>
  route?: any
  visible: boolean
  google: any
  mapData: MapData[]
  type: string
  initCenter?: any
  size?: string
}
interface State extends JCState {
  selectedPlace: any
  activeMarker: any
  showingInfoWindow: boolean
  profilesEnabled: boolean
  organizationsEnabled: boolean
  eventsEnabled: boolean
  currentUserLocation: { lat: string; lng: string } | null
  currentUser: string | null
  mapHeight: number
}

class MyMapImpl extends JCComponent<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      ...super.getInitialState(),
      activeMarker: null,
      selectedPlace: {},
      showingInfoWindow: false,
      profilesEnabled: true,
      organizationsEnabled: true,
      eventsEnabled: false,
      currentUserLocation: null,
      currentUser: null,
      mapHeight: 0,
    }
    Auth.currentAuthenticatedUser().then((user: JCCognitoUser) => {
      this.setState({
        currentUser: user.username,
      })
      const getUser: GetUserQueryResultPromise = API.graphql(
        graphqlOperation(queries.getUser, { id: user["username"] })
      ) as GetUserQueryResultPromise
      getUser
        .then((json: GetUserQueryResult) => {
          this.setState({
            currentUserLocation: {
              lat: json.data?.getUser?.location?.latitude ?? "0",
              lng: json.data?.getUser?.location?.longitude ?? "0",
            },
          })
        })
        .catch((e: any) => {
          console.error({
            "Error Loading User": e,
          })
        })
    })
  }
  onMarkerClick = (props: any, marker: any) =>
    this.setState({
      activeMarker: marker,
      selectedPlace: props,
      showingInfoWindow: true,
    })
  onMapClicked = () => {
    if (this.state.showingInfoWindow)
      this.setState({
        activeMarker: null,
        showingInfoWindow: false,
      })
  }
  openConversation(initialUser: string, name: string) {
    console.log("Navigate to conversationScreen")
    this.props.navigation?.push("ConversationScreen", {
      initialUserID: initialUser,
      initialUserName: name,
    })
  }
  showProfiles() {
    console.log("Navigate to profilesScreen")
    this.props.navigation?.push("ProfilesScreen")
  }
  showProfile(id: string) {
    console.log("Navigate to profileScreen")
    this.props.navigation?.push("ProfileScreen", { id: id, create: false })
  }
  showOrg(id: string) {
    this.props.navigation?.push("OrganizationScreen", { id: id, create: false })
  }

  _mapLoaded(map: any) {
    map.setOptions({
      styles: mapStyle,
    })
  }

  renderOrg() {
    return (
      <Card style={this.styles.style.myMapDashboardConversationCard}>
        <CardItem>
          <Body style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ marginRight: 10 }}>
              <ProfileImage
                user={this.state.selectedPlace.mapItem.user.id}
                size="medium"
                style="map"
              />
            </View>
            <View>
              <Text style={this.styles.style.fontConnectWithName}>
                {this.state.selectedPlace.mapItem.user.orgName}
              </Text>
              <Text style={this.styles.style.myMapConversationCardRole}>
                {this.state.selectedPlace.mapItem.user.orgType}
              </Text>
              {this.state.selectedPlace.mapItem.user.aboutMeShort ? (
                <Text style={this.styles.style.myMapConversationCardAboutMe}>
                  {this.state.selectedPlace.mapItem.user.aboutMeShort}
                </Text>
              ) : null}
              <View style={{ flex: 1, flexDirection: "row", paddingTop: 10 }}>
                {/*<JCButton buttonType={ButtonTypes.Solid} onPress={() => console.error('messaging not yet supported')}>Start Conversation</JCButton>*/}
                <JCButton
                  buttonType={ButtonTypes.Solid}
                  onPress={() => {
                    this.showOrg(this.state.selectedPlace.mapItem.user.id)
                  }}
                >
                  View Profile
                </JCButton>
              </View>
            </View>
          </Body>
          <View style={{ position: "absolute", top: -10, right: 10 }}>
            <TouchableOpacity onPress={() => this.setState({ showingInfoWindow: false })}>
              <AntDesign name="close" size={24} color="#979797" />
            </TouchableOpacity>
          </View>
        </CardItem>
      </Card>
    )
  }

  renderProfile() {
    return (
      <Card style={this.styles.style.myMapDashboardConversationCard}>
        <CardItem>
          <Body style={this.styles.style.mapCardBody}>
            <View style={this.styles.style.mapCardImage}>
              <ProfileImage
                user={this.state.selectedPlace.mapItem.user.id}
                size="medium"
                style="map"
              />
            </View>
            <View>
              <Text style={this.styles.style.fontConnectWithNameMap}>
                {this.state.selectedPlace.mapItem.user.given_name}{" "}
                {this.state.selectedPlace.mapItem.user.family_name}
              </Text>
              <Text style={this.styles.style.myMapConversationCardRole}>
                {this.state.selectedPlace.mapItem.user.currentRole}
              </Text>
              {this.state.selectedPlace.mapItem.user.aboutMeShort ? (
                <Text style={this.styles.style.myMapConversationCardAboutMe}>
                  {this.state.selectedPlace.mapItem.user.aboutMeShort}
                </Text>
              ) : null}
              <View style={this.styles.style.mapCardJCButtonContainer}>
                <JCButton
                  buttonType={ButtonTypes.SolidMap}
                  onPress={() => {
                    this.openConversation(
                      this.state.selectedPlace.mapItem.user.id,
                      this.state.selectedPlace.mapItem.user.given_name +
                        " " +
                        this.state.selectedPlace.mapItem.user.family_name
                    )
                  }}
                >
                  Start Conversation
                </JCButton>
                <JCButton
                  buttonType={ButtonTypes.TransparentRegularOrange}
                  onPress={() => {
                    this.showProfile(this.state.selectedPlace.mapItem.user.id)
                  }}
                >
                  View Profile
                </JCButton>
              </View>
            </View>
          </Body>
          <View style={{ position: "absolute", top: -10, right: 10 }}>
            <TouchableOpacity onPress={() => this.setState({ showingInfoWindow: false })}>
              <AntDesign name="close" size={24} color="#979797" />
            </TouchableOpacity>
          </View>
        </CardItem>
      </Card>
    )
  }
  renderEvent() {
    return (
      <Card style={this.styles.style.myMapCalloutEventContainer}>
        <CardItem>
          <Text ellipsizeMode="tail" numberOfLines={1} style={this.styles.style.myMapFontDetailTop}>
            {moment(this.state.selectedPlace.mapItem.event.time).format("MMMM Do YYYY, h:mm a")}
          </Text>
        </CardItem>
        <CardItem style={this.styles.style.myMapCalloutEventName}>
          <Text ellipsizeMode="tail" numberOfLines={2} style={this.styles.style.myMapFontTitle}>
            {this.state.selectedPlace.mapItem.event.name}
          </Text>
        </CardItem>
        <CardItem style={this.styles.style.myMapCalloutEventDescription}>
          <Text
            ellipsizeMode="tail"
            numberOfLines={3}
            style={this.styles.style.myMapFontDetailMiddle}
          >
            {this.state.selectedPlace.mapItem.event.description}
          </Text>
        </CardItem>
        <CardItem style={{ paddingBottom: 40 }}>
          {this.state.selectedPlace.mapItem.event.eventType == "location" ? (
            <Text
              ellipsizeMode="tail"
              numberOfLines={1}
              style={this.styles.style.myMapFontDetailBottom}
            >
              <a
                target="_blank"
                rel="noreferrer"
                href={
                  "https://www.google.com/maps/dir/?api=1&destination=" +
                  escape(this.state.selectedPlace.mapItem.event.location)
                }
              >
                {this.state.selectedPlace.mapItem.event.location}
              </a>
            </Text>
          ) : this.state.selectedPlace.mapItem.event.eventType == "zoom" ? (
            <Text
              ellipsizeMode="tail"
              numberOfLines={1}
              style={this.styles.style.myMapFontDetailBottom}
            >
              <a
                target="_blank"
                rel="noreferrer"
                href={this.state.selectedPlace.mapItem.event.eventUrl}
              >
                Zoom
              </a>
            </Text>
          ) : (
            <Text
              ellipsizeMode="tail"
              numberOfLines={1}
              style={this.styles.style.myMapFontDetailBottom}
            >
              <a
                target="_blank"
                rel="noreferrer"
                href={this.state.selectedPlace.mapItem.event.eventUrl}
              >
                Eventbrite
              </a>
            </Text>
          )}
        </CardItem>
        {/*
        {this.canJoin(item.id) && !this.isOwner(item.id) ? <CardItem ><JCButton buttonType={ButtonTypes.Solid} onPress={() => { this.join(item, "Event") }}>Attend</JCButton><Right></Right></CardItem> : null}
        {this.canLeave(item.id) && !this.isOwner(item.id) ? <CardItem ><JCButton buttonType={ButtonTypes.Solid} onPress={() => { this.leave(item, "Event") }}>Don't Attend</JCButton><Right></Right></CardItem> : null}
        {this.isOwner(item.id) ? <CardItem ><JCButton buttonType={ButtonTypes.Solid} onPress={() => null}>Owner</JCButton><Right></Right></CardItem> : null}
        */}
        <View style={{ position: "absolute", top: 10, right: 10 }}>
          <TouchableOpacity onPress={() => this.setState({ showingInfoWindow: false })}>
            <AntDesign name="close" size={24} color="#979797" />
          </TouchableOpacity>
        </View>
      </Card>
    )
  }
  render() {
    if (this.props.type === "filters") {
      return (
        <ErrorBoundary>
          <View
            style={{
              display: "flex",
              height: this.props.visible ? Dimensions.get("window").height * 0.65 : 0,
            }}
            onLayout={(e) => this.setState({ mapHeight: e.nativeEvent.layout.height })}
          >
            <View style={{ flex: 1, minHeight: 50, maxHeight: 75 }}>
              <ScrollView horizontal contentContainerStyle={{ flexGrow: 1 }}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    paddingLeft: "4.5%",
                  }}
                >
                  <JCSwitch
                    switchLabel="Show Events"
                    initState={false}
                    onPress={() => this.setState({ eventsEnabled: !this.state.eventsEnabled })}
                  ></JCSwitch>
                  <JCSwitch
                    switchLabel="Show Profiles"
                    initState={true}
                    onPress={() => this.setState({ profilesEnabled: !this.state.profilesEnabled })}
                  ></JCSwitch>
                  <JCSwitch
                    switchLabel="Show Organizations"
                    initState={true}
                    containerWidth={200}
                    onPress={() =>
                      this.setState({ organizationsEnabled: !this.state.organizationsEnabled })
                    }
                  ></JCSwitch>
                  <View style={this.styles.style.partnerFriendsLegend}>
                    <View style={this.styles.style.partnerLegend}>
                      <View
                        style={{
                          backgroundColor: "#f0493e",
                          borderRadius: 25,
                          width: 25,
                          height: 13,
                        }}
                      ></View>
                      <Text style={this.styles.style.fontMyMapLegend}>Partners</Text>
                    </View>
                    <View style={this.styles.style.friendsLegend}>
                      <View
                        style={{
                          backgroundColor: "#ffb931",
                          borderRadius: 25,
                          width: 25,
                          height: 13,
                        }}
                      ></View>
                      <Text style={this.styles.style.fontMyMapLegend}>Friends</Text>
                    </View>
                  </View>
                </View>
              </ScrollView>
            </View>
            <View style={{ flex: 9 }}>
              {window.google ? (
                <Map
                  google={window.google}
                  zoom={6}
                  center={
                    this.state.currentUserLocation
                      ? {
                          lat: Number(this.state.currentUserLocation.lat),
                          lng: Number(this.state.currentUserLocation.lng),
                        }
                      : { lat: 44, lng: -78 }
                  }
                  mapTypeControl={false}
                  onClick={this.onMapClicked}
                  onReady={(mapProps, map) => this._mapLoaded(map)}
                  style={{ position: "relative", width: "100%", height: "100%" }}
                  streetViewControl={false}
                  fullscreenControl={false}
                >
                  {this.props.mapData.map((mapItem, index) => {
                    const filters = []
                    if (this.state.organizationsEnabled) {
                      filters.push("organization")
                    }
                    if (this.state.eventsEnabled) {
                      filters.push("event")
                    }
                    if (this.state.profilesEnabled) {
                      filters.push("profile")
                    }
                    if (filters.find((item) => item === mapItem.type) === mapItem.type) {
                      return (
                        <Marker
                          key={index}
                          title={mapItem.name}
                          mapItemType={mapItem.type}
                          mapItem={mapItem}
                          onClick={this.onMarkerClick}
                          position={{ lat: mapItem.latitude, lng: mapItem.longitude }}
                          icon={
                            mapItem.type === "event" && this.state.eventsEnabled
                              ? {
                                  url: require("../../assets/svg/map-icon-red.svg"),
                                  scaledSize: new google.maps.Size(32, 32),
                                }
                              : mapItem.type === "organization" && this.state.organizationsEnabled
                              ? {
                                  url: require("../../assets/svg/map-icon-darkred.svg"),
                                  scaledSize: new google.maps.Size(32, 32),
                                }
                              : mapItem.type === "profile" && this.state.profilesEnabled
                              ? {
                                  url: require("../../assets/svg/map-icon-yellow.svg"),
                                  scaledSize: new google.maps.Size(32, 32),
                                }
                              : undefined
                          }
                        ></Marker>
                      )
                    }

                    //will need later for friends
                    //url: require("../../assets/svg/map-icon-yellow.svg"),
                  })}
                </Map>
              ) : null}
            </View>
            {this.state.showingInfoWindow ? (
              <View
                style={{
                  position: "absolute",
                  alignSelf: "center",
                  justifyContent: "center",
                  top: (this.state.mapHeight - 250) / 2,
                }}
              >
                {this.state.selectedPlace != null
                  ? this.state.selectedPlace.mapItemType == "profile"
                    ? this.renderProfile()
                    : this.state.selectedPlace.mapItemType == "event"
                    ? this.renderEvent()
                    : this.state.selectedPlace.mapItemType == "organization"
                    ? this.renderOrg()
                    : null
                  : null}
              </View>
            ) : null}
          </View>
        </ErrorBoundary>
      )
    } else if (this.props.visible && this.props.type === "profile") {
      return (
        <ErrorBoundary>
          <View style={{ height: 362, width: "100%" }}>
            {window.google ? (
              <Map
                google={window.google}
                zoom={6}
                center={this.props.initCenter}
                mapTypeControl={false}
                onClick={this.onMapClicked}
                onReady={(mapProps, map) => this._mapLoaded(map)}
                style={{ position: "relative", width: "100%", height: "100%" }}
                streetViewControl={false}
                fullscreenControl={false}
              >
                {this.props.mapData.map((item, index) => {
                  return (
                    <Marker
                      key={index}
                      position={{ lat: item.latitude, lng: item.longitude }}
                      icon={{
                        url: require("../../assets/svg/map-location.svg"),
                        anchor: new google.maps.Point(50, 50),
                        scaledSize: new google.maps.Size(100, 100),
                      }}
                    />
                  )
                })}
              </Map>
            ) : null}
          </View>
        </ErrorBoundary>
      )
    } else if (this.props.type === "no-filters") {
      //the visible prop controls height because the map must render to set the correct center position
      return (
        <ErrorBoundary>
          <View
            style={{ height: this.props.visible ? (this.props.size ? this.props.size : 510) : 0 }}
          >
            {window.google ? (
              <Map
                google={window.google}
                zoom={5}
                center={
                  this.props.initCenter
                    ? this.props.initCenter
                    : this.state.currentUserLocation
                    ? this.state.currentUserLocation
                    : { lat: 44, lng: -78 }
                }
                mapTypeControl={false}
                onClick={this.onMapClicked}
                onReady={(mapProps, map) => this._mapLoaded(map)}
                style={{ position: "relative", width: "100%", height: "100%" }}
                streetViewControl={false}
                fullscreenControl={false}
              >
                {this.props.mapData.map((mapItem, index) => {
                  return (
                    <Marker
                      key={index}
                      title={mapItem.name}
                      mapItemType={mapItem.type}
                      mapItem={mapItem}
                      onClick={this.onMarkerClick}
                      position={{ lat: mapItem.latitude, lng: mapItem.longitude }}
                      icon={{
                        url: require("../../assets/svg/map-icon-red.svg"),
                        scaledSize: new google.maps.Size(32, 32),
                      }}
                    ></Marker>
                  )
                })}
              </Map>
            ) : null}
            {this.state.showingInfoWindow ? (
              <View
                style={{
                  position: "absolute",
                  alignSelf: "center",
                  height: "100%",
                  justifyContent: "center",
                }}
              >
                {this.state.selectedPlace != null
                  ? this.state.selectedPlace.mapItemType == "profile"
                    ? this.renderProfile()
                    : this.state.selectedPlace.mapItemType == "event"
                    ? this.renderEvent()
                    : this.state.selectedPlace.mapItemType == "organization"
                    ? this.renderOrg()
                    : null
                  : null}
              </View>
            ) : null}
          </View>
        </ErrorBoundary>
      )
    } else return null
  }
}

export default function MyMap(props: Props): JSX.Element {
  const route = useRoute()
  const navigation = useNavigation<StackNavigationProp<any, any>>()
  return <MyMapImpl {...props} navigation={navigation} route={route} />
}
