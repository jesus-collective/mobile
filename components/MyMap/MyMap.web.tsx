import { AntDesign } from "@expo/vector-icons"
import { useNavigation, useRoute } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { Auth, Storage } from "aws-amplify"
import { MapData } from "components/MyGroups/MapData"
import maplibregl from "maplibre-gl"
import { createMap } from "maplibre-gl-js-amplify"
import "maplibre-gl/dist/maplibre-gl.css"
import moment from "moment"
//import { withRouter, RouteComponentProps } from 'react-router-dom';
import * as React from "react"
import { Dimensions, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { Data } from "../../components/Data/Data"
import JCButton, { ButtonTypes } from "../../components/Forms/JCButton"
import ProfileImage from "../../components/ProfileImage/ProfileImage"
import { MapContext, MapState } from "../../screens/HomeScreen/MapContext"
import { GetUserQueryResult, JCCognitoUser } from "../../src/types"
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
  zoom: any
  bounds: any
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
    this.mapRef = React.createRef<Map>()
    this.popupRef = null
    this.state = {
      ...super.getInitialState(),
      bounds: [0, 0, 10, 10],
      zoom: 1,
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
      const getUser = Data.getUser(user["username"])
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
      <View style={this.styles.style.myMapDashboardConversationCard}>
        <View>
          <View style={{ flex: 1, flexDirection: "row" }}>
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
          </View>
          <View style={{ position: "absolute", top: -10, right: 10 }}>
            <TouchableOpacity onPress={() => this.setState({ showingInfoWindow: false })}>
              <AntDesign name="close" size={24} color="#979797" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  async getProfileImage(user: any): Promise<string | null> {
    if (user == "" || user == null) {
      return null
    } else {
      try {
        return await Storage.get(user.filenameSmall, {
          level: "protected",
          contentType: "image/png",
          identityId: user.userId,
        })
      } catch (e) {
        return null
      }
    }
  }
  async getProfileImageFromUserID(user: string): Promise<string | null> {
    try {
      const getUser = await Data.getUserForProfile(user)

      return await this.getProfileImage(getUser.data?.getUser?.profileImage)
    } catch (e: any) {
      return await this.getProfileImage(e.data?.getUser?.profileImage)
    }
  }

  async getProfileImageFromOrgID(user: string): Promise<string | null> {
    try {
      const getUser = await Data.getOrgForImage(user)
      return await this.getProfileImage(getUser.data?.getOrganization?.profileImage)
    } catch (e: any) {
      return await this.getProfileImage(e.data?.getOrganization?.profileImage)
    }
  }
  async getImageUrl(mapItem: MapData): Promise<string | null> {
    if (mapItem.type == "organization") {
      return (
        (await this.getProfileImageFromOrgID(mapItem.user.id)) ||
        require("../../assets/profile-placeholder.png")
      )
    } else {
      return (
        (await this.getProfileImageFromUserID(mapItem.user.id)) ||
        require("../../assets/profile-placeholder.png")
      )
    }
  }
  async renderProfileHTML(mapItem: MapData) {
    return (
      "<div style='margin:30px;display: flex;flex-direction:row'><div><img style='border:solid;border-color:#ffffff;border-radius:120px;margin-right:10px' width='80' height='96' src='" +
      (await this.getImageUrl(mapItem)) +
      "'/></div><div><div style='font-size:20px;font-family:Graphik-Bold-App;'>" +
      mapItem.name +
      " </div><div style='color:rgb(51,51,51);opacity:0.6;text-transform:uppercase;font-size:12px;font-family:Graphik-Regular-App;'>" +
      mapItem.user.currentRole +
      "</div>" +
      (mapItem.user.aboutMeShort
        ? "<div style='margin-top:10px;font-size:16px;font-weight:600;font-family:Graphik-Regular-App;'>" +
          mapItem.user.aboutMeShort +
          "</div>"
        : "") +
      "<div style='margin-top:10px;'><button onclick='window.location.href=\"/app/conversation?initialUserID=" +
      mapItem.user.id +
      "&initialUserName=" +
      mapItem.name +
      "\"' style='font-family:Graphik-Regular-App;font-size:16px;padding:10px;background-color:rgb(240, 73, 62);color:#ffffff;border:none;border-radius:4px'>Start Conversation</button>" +
      "<button onclick='window.location.href=\"/app/profile?id=" +
      mapItem.user.id +
      "&create=false\"' style='font-family:Graphik-Regular-App;font-size:16px;padding:10px;background-color:rgb(240, 73, 62);color:#ffffff;border:none;border-radius:4px'>View Profile</button></div>" +
      "</div>"
    )
  }
  async renderEventHTML(mapItem: MapData) {
    if (mapItem.event)
      return (
        "<div style='display: flex;flex-direction:row'><div><img style='margin-right:10px' width='50' height='66' src='" +
        (await this.getImageUrl(mapItem)) +
        "'/></div><div><div style='font-size:10px;font-family:Graphik-Bold-App;'>" +
        moment(mapItem.event.time).format("MMMM Do YYYY, h:mm a") +
        " </div><div style='font-size:20px;font-family:Graphik-Bold-App;'>" +
        mapItem.event.name +
        " </div><div style='font-size:16px;font-family:Graphik-Bold-App;'>" +
        mapItem.event.description +
        "</div>" +
        (mapItem.event.eventType == "location"
          ? "<a target='_blank' rel='noreferrer' href='https://www.google.com/maps/dir/?api=1&destination=" +
            escape(this.state.selectedPlace.mapItem.event.location) +
            "'>" +
            mapItem.event.location +
            "</a>"
          : mapItem.event.eventType == "zoom"
          ? "<a target='_blank' rel='noreferrer' href='" + mapItem.event.eventUrl + "'>Zoom</a>"
          : "<a target='_blank' rel='noreferrer' href='" +
            this.state.selectedPlace.mapItem.event.eventUrl +
            "'>Eventbrite</a>") +
        "</div>"
      )
    else return ""
  }

  async renderOrgHTML(mapItem: MapData) {
    return (
      "<div style='margin:30px;display: flex;flex-direction:row'><div><img style='border:solid;border-color:#ffffff;border-radius:120px;margin-right:10px' width='80' height='96' src='" +
      (await this.getImageUrl(mapItem)) +
      "'/></div><div><div style='font-size:20px;font-family:Graphik-Bold-App;'>" +
      mapItem.user.orgName +
      " </div><div style='color:rgb(51,51,51);opacity:0.6;text-transform:uppercase;font-size:12px;font-family:Graphik-Regular-App;'>" +
      mapItem.user.orgType +
      "</div>" +
      (mapItem.user.aboutMeShort
        ? "<div style='margin-top:10px;font-size:16px;font-weight:600;font-family:Graphik-Regular-App;'>" +
          mapItem.user.aboutMeShort +
          "</div>"
        : "") +
      "<button onclick='window.location.href=\"/app/organization?groupType=null&id=" +
      mapItem.user.id +
      "&create=false\"' style='font-family:Graphik-Regular-App;font-size:16px;padding:10px;background-color:rgb(240, 73, 62);color:#ffffff;border:none;border-radius:4px'>View Profile</button></div>" +
      "</div>"
    )
  }

  renderProfile() {
    return (
      <View style={this.styles.style.myMapDashboardConversationCard}>
        <View>
          <View style={this.styles.style.mapCardBody}>
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
          </View>
          <View style={{ position: "absolute", top: -10, right: 10 }}>
            <TouchableOpacity onPress={() => this.setState({ showingInfoWindow: false })}>
              <AntDesign name="close" size={24} color="#979797" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  renderEvent() {
    return (
      <View style={this.styles.style.myMapCalloutEventContainer}>
        <View>
          <Text ellipsizeMode="tail" numberOfLines={1} style={this.styles.style.myMapFontDetailTop}>
            {moment(this.state.selectedPlace.mapItem.event.time).format("MMMM Do YYYY, h:mm a")}
          </Text>
        </View>
        <View style={this.styles.style.myMapCalloutEventName}>
          <Text ellipsizeMode="tail" numberOfLines={2} style={this.styles.style.myMapFontTitle}>
            {this.state.selectedPlace.mapItem.event.name}
          </Text>
        </View>
        <View style={this.styles.style.myMapCalloutEventDescription}>
          <Text
            ellipsizeMode="tail"
            numberOfLines={3}
            style={this.styles.style.myMapFontDetailMiddle}
          >
            {this.state.selectedPlace.mapItem.event.description}
          </Text>
        </View>
        <View style={{ paddingBottom: 40 }}>
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
        </View>
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
      </View>
    )
  }
  mapRef: any
  popupRef: HTMLDivElement | null
  componentWillUnmount() {
    this.map?.remove()
  }
  map: maplibregl.Map | undefined

  createDonutChart(props: any): HTMLElement {
    const offsets = []
    const counts = [props.groupEvent, props.groupOrg, props.groupProfile]
    let total = 0
    for (let i = 0; i < counts.length; i++) {
      offsets.push(total)
      total += counts[i]
    }
    const fontSize = total >= 1000 ? 22 : total >= 100 ? 20 : total >= 10 ? 18 : 16
    const r = total >= 1000 ? 50 : total >= 100 ? 32 : total >= 10 ? 24 : 18
    const r0 = Math.round(r * 0.6)
    const w = r * 2

    let html =
      '<div><svg width="' +
      w +
      '" height="' +
      w +
      '" viewbox="0 0 ' +
      w +
      " " +
      w +
      '" text-anchor="middle" style="font: ' +
      fontSize +
      'px sans-serif; display: block">'

    for (let i = 0; i < counts.length; i++) {
      html += this.donutSegment(
        offsets[i] / total,
        (offsets[i] + counts[i]) / total,
        r,
        r0,
        this.colors[i]
      )
    }
    html +=
      '<circle cx="' +
      r +
      '" cy="' +
      r +
      '" r="' +
      r0 +
      '" fill="white" /><text dominant-baseline="central" transform="translate(' +
      r +
      ", " +
      r +
      ')">' +
      total.toLocaleString() +
      "</text></svg></div>"

    const el = document.createElement("div")
    el.innerHTML = html
    return el.firstChild as HTMLElement
  }

  donutSegment(start: number, end: number, r: number, r0: number, color: string) {
    if (end - start === 1) end -= 0.00001
    const a0 = 2 * Math.PI * (start - 0.25)
    const a1 = 2 * Math.PI * (end - 0.25)
    const x0 = Math.cos(a0),
      y0 = Math.sin(a0)
    const x1 = Math.cos(a1),
      y1 = Math.sin(a1)
    const largeArc = end - start > 0.5 ? 1 : 0

    return [
      '<path d="M',
      r + r0 * x0,
      r + r0 * y0,
      "L",
      r + r * x0,
      r + r * y0,
      "A",
      r,
      r,
      0,
      largeArc,
      1,
      r + r * x1,
      r + r * y1,
      "L",
      r + r0 * x1,
      r + r0 * y1,
      "A",
      r0,
      r0,
      0,
      largeArc,
      0,
      r + r0 * x0,
      r + r0 * y0,
      '" fill="' + color + '" />',
    ].join(" ")
  }

  markers: any = {}
  markersOnScreen: any = {}
  async renderPopup(item: MapData): Promise<string | null> {
    return item.type == "profile"
      ? await this.renderProfileHTML(item)
      : item.type == "event"
      ? await this.renderEventHTML(item)
      : item.type == "organization"
      ? await this.renderOrgHTML(item)
      : null
  }

  updateMarkers = async () => {
    const newMarkers: any = {}
    const features: any = this.map?.querySourceFeatures("earthquakes")

    // for every cluster on the screen, create an HTML marker for it (if we didn't yet),
    // and add it to the map if it's not there already
    for (let i = 0; i < features.length; i++) {
      const coords = features[i].geometry.coordinates
      const props = features[i].properties

      if (!props.cluster) {
        let popup = undefined
        if (props.item) {
          popup = new maplibregl.Popup({ maxWidth: "500", offset: 25 }).setHTML(
            await this.renderPopup(JSON.parse(props.item) as MapData)
          )
        }
        //.setText(
        //  (JSON.parse(props.item) as MapData).name
        // )
        const id = props.id
        console.log()
        let marker = this.markers[id]

        if (!marker) {
          this.markers[id] = new maplibregl.Marker().setPopup(popup).setLngLat(coords)
          marker = this.markers[id]
        }
        newMarkers[id] = marker

        if (!this.markersOnScreen[id]) marker.addTo(this.map)
      } else {
        const id = props.cluster_id

        let marker = this.markers[id]

        if (!marker) {
          const el = this.createDonutChart(props)

          this.markers[id] = new maplibregl.Marker({
            element: el,
          }).setLngLat(coords)
          marker = this.markers[id]
        }
        newMarkers[id] = marker

        if (!this.markersOnScreen[id]) marker.addTo(this.map)
      }
    }
    // for every marker we've added previously, remove those that are no longer visible
    for (const id in this.markersOnScreen) {
      if (!newMarkers[id]) this.markersOnScreen[id].remove(this.map)
    }
    this.markersOnScreen = newMarkers
  }
  colors = ["#fed976", "#feb24c", "#fd8d3c", "#fc4e2a", "#e31a1c"]
  static contextType = MapContext
  groupEvent = ["==", ["get", "type"], "event"]
  groupOrg = ["==", ["get", "type"], "organization"]
  groupProfile = ["==", ["get", "type"], "profile"]
  mapFilter = (e: MapData) => {
    if (e.type == "event" && this.state.eventsEnabled) return true
    if (e.type == "profile" && this.state.profilesEnabled) return true
    if (e.type == "organization" && this.state.organizationsEnabled) return true
    return false
  }
  getGeoJson(): any {
    const mapState: MapState = this.context.mapState
    return {
      type: "FeatureCollection",
      features: mapState.MapItems.filter(this.mapFilter).map((z) => {
        return {
          type: "Feature",
          properties: { id: z.id, item: z, type: z.type },
          geometry: {
            type: "Point",
            coordinates: [z.longitude, z.latitude],
          },
        }
      }),
    }
  }
  updateSource() {
    const z = this.map?.getSource("earthquakes") as maplibregl.GeoJSONSource
    z.setData(this.getGeoJson())
  }
  addSource() {
    const geojson = this.getGeoJson()

    this.map?.addSource("earthquakes", {
      type: "geojson",
      data: geojson,
      cluster: true,
      clusterRadius: 50,
      clusterProperties: {
        // keep separate counts for each magnitude category in a cluster
        groupEvent: ["+", ["case", this.groupEvent, 1, 0]],
        groupOrg: ["+", ["case", this.groupOrg, 1, 0]],
        groupProfile: ["+", ["case", this.groupProfile, 1, 0]],
      },
    })
  }
  addMapDetails = async () => {
    // colors to use for the categories

    this.addSource()

    this.map?.addLayer({
      id: "earthquake_circle",
      type: "circle",
      source: "earthquakes",
      filter: ["==", "cluster", true],
      paint: {
        "circle-color": [
          "case",
          this.groupEvent,
          this.colors[0],
          this.groupOrg,
          this.colors[1],
          this.groupProfile,
          this.colors[2],
          this.colors[3],
        ],
        "circle-opacity": 0.6,
        "circle-radius": 12,
      },
    })
    this.map?.addLayer({
      id: "earthquake_circle2",
      type: "circle",
      source: "earthquakes",
      filter: ["!=", "cluster", true],
      paint: {
        "circle-color": [
          "case",
          this.groupEvent,
          this.colors[0],
          this.groupOrg,
          this.colors[1],
          this.groupProfile,
          this.colors[2],
          this.colors[3],
        ],
        "circle-opacity": 0.6,
        "circle-radius": 12,
      },
    })

    // after the GeoJSON data is loaded, update markers on the screen and do so on every map move/moveend
    this.map?.on("data", await this.dataUpdate)
    console.log("MOUNDED2")
  }
  dataUpdate = async (e) => {
    if (e.sourceId !== "earthquakes" || !e.isSourceLoaded) return

    this.map?.on("move", await this.updateMarkers)
    this.map?.on("moveend", await this.updateMarkers)
    await this.updateMarkers()
  }
  async componentDidMount() {
    console.log("MOUNDED")
    if (this.mapRef != null) {
      console.log("MOUNDED1")
      this.map = await createMap({
        container: this.mapRef,
        center: this.state.currentUserLocation
          ? [Number(this.state.currentUserLocation.lng), Number(this.state.currentUserLocation.lat)]
          : [-78, 44],
        zoom: 0.3,
        region: "us-east-1",
      })
      this.map.addControl(new maplibregl.NavigationControl())
      this.map.on("load", this.addMapDetails)
    }
  }
  renderMap() {
    if (this.props.type === "filters") {
      return (
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
                {/* <JCSwitch
                  switchLabel="Show Events"
                  initState={false}
                  onPress={() =>
                    this.setState({ eventsEnabled: !this.state.eventsEnabled }, () => {
                      this.updateSource()
                    })
                  }
                ></JCSwitch>*/}
                <JCSwitch
                  switchLabel="Show Profiles"
                  initState={true}
                  onPress={() =>
                    this.setState({ profilesEnabled: !this.state.profilesEnabled }, () => {
                      this.updateSource()
                    })
                  }
                ></JCSwitch>
                <JCSwitch
                  switchLabel="Show Organizations"
                  initState={true}
                  containerWidth={200}
                  onPress={() =>
                    this.setState(
                      { organizationsEnabled: !this.state.organizationsEnabled },
                      () => {
                        this.updateSource()
                      }
                    )
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
            <div
              ref={(x) => (this.mapRef = x)}
              style={{ position: "relative", width: "100%", height: "100%" }}
              id="map"
            />

            {/*window.google ? (
              <Map
                ref={(x) => (this.mapRef = x)}
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
                {this.getBBox() &&
                  mapState.superCluster
                    ?.getClusters(this.getBBox(), this.getZoom())
                    .map((mapItem, index) => {
                      console.log({ MAP: mapItem })
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
                      if (mapItem.properties.cluster)
                        return (
                          <Marker
                            key={index}
                            title={"CLUSTER"}
                            mapItemType={mapItem.type}
                            mapItem={mapItem}
                            onClick={this.onMarkerClick}
                            position={{
                              lat: mapItem.geometry.coordinates[0],
                              lng: mapItem.geometry.coordinates[1],
                            }}
                            icon={{
                              url: require("../../assets/svg/map-icon-red.svg"),
                              scaledSize: new google.maps.Size(32, 32),
                            }}
                          ></Marker>
                        )
                      if (filters.find((item) => item === mapItem.type) === mapItem.type) {
                        return (
                          <Marker
                            key={index}
                            title={mapItem.properties.mapItem.name}
                            mapItemType={mapItem.properties.mapItem.type}
                            mapItem={mapItem}
                            onClick={this.onMarkerClick}
                            position={{
                              lat: mapItem.geometry.coordinates[0],
                              lng: mapItem.geometry.coordinates[1],
                            }}
                            icon={
                              mapItem.properties.mapItem.type === "event" &&
                              this.state.eventsEnabled
                                ? {
                                    url: require("../../assets/svg/map-icon-red.svg"),
                                    scaledSize: new google.maps.Size(32, 32),
                                  }
                                : mapItem.properties.mapItem.type === "organization" &&
                                  this.state.organizationsEnabled
                                ? {
                                    url: require("../../assets/svg/map-icon-darkred.svg"),
                                    scaledSize: new google.maps.Size(32, 32),
                                  }
                                : mapItem.properties.mapItem.type === "profile" &&
                                  this.state.profilesEnabled
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
                  ) : null*/}
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
      )
    } else if (this.props.visible && this.props.type === "profile") {
      return (
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
      )
    } else if (this.props.type === "no-filters") {
      //the visible prop controls height because the map must render to set the correct center position
      return (
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
      )
    } else return null
  }
  static MapConsumer = MapContext.Consumer
  render() {
    return (
      <ErrorBoundary>
        <MyMapImpl.MapConsumer>
          {({ mapState }) => {
            if (mapState == undefined) return null
            return this.renderMap()
          }}
        </MyMapImpl.MapConsumer>
      </ErrorBoundary>
    )
  }
}

export default function MyMap(props: Props): JSX.Element {
  const route = useRoute()
  const navigation = useNavigation<StackNavigationProp<any, any>>()
  return <MyMapImpl {...props} navigation={navigation} route={route} />
}
