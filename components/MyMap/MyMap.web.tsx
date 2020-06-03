
import * as React from 'react';
//import {ProviderProps} from 'google-maps-react';
//import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Body, Card, CardItem, Button, View } from 'native-base';
import { TouchableOpacity, Switch } from 'react-native'
import styles from '../style'

import { Marker, } from 'google-maps-react';
import { Map, InfoWindow } from 'google-maps-react';
import ProfileImage from '../../components/ProfileImage/ProfileImage'

import { Text } from 'react-native'
import ErrorBoundary from '../ErrorBoundry';
import moment from 'moment';

const mapStyle = require('./mapstyle.json')

interface Props {
  navigation: any
  visible: boolean
  google: any
  mapData: any
}
interface State {
  selectedPlace: any
  activeMarker: any
  showingInfoWindow: any
  groupsEnabled: boolean
  profilesEnabled: boolean
  organizationsEnabled: boolean
  eventsEnabled: boolean
}

class MyMap extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      activeMarker: null,
      selectedPlace: {},
      showingInfoWindow: false,
      groupsEnabled: true,
      profilesEnabled: true,
      organizationsEnabled: true,
      eventsEnabled: true,
    }

  }
  onMarkerClick = (props, marker) =>
    this.setState({
      activeMarker: marker,
      selectedPlace: props,
      showingInfoWindow: true
    });
  onMapClicked = () => {
    if (this.state.showingInfoWindow)
      this.setState({
        activeMarker: null,
        showingInfoWindow: false
      });
  };
  openConversation(initialUser, name) {
    console.log("Navigate to conversationScreen")
    this.props.navigation.push("ConversationScreen", { initialUserID: initialUser, initialUserName: name });
  }
  showProfiles() {
    console.log("Navigate to profilesScreen")
    this.props.navigation.push("ProfilesScreen");
  }
  showProfile(id) {
    console.log("Navigate to profileScreen")
    this.props.navigation.push("ProfileScreen", { id: id, create: false });
  }

  _mapLoaded(mapProps, map) {
    map.setOptions({
       styles: mapStyle
    })
 }

  toggleFilters(type: string): boolean {
    switch(type) {
      case "organization":
        this.setState({ organizationsEnabled: !this.state.organizationsEnabled })
        return this.state.organizationsEnabled
      case "group":
        this.setState({ groupsEnabled: !this.state.groupsEnabled })
        return this.state.groupsEnabled
      case "event":
        this.setState({ eventsEnabled: !this.state.eventsEnabled })
        return this.state.eventsEnabled
      case "profile":
        this.setState({ profilesEnabled: !this.state.profilesEnabled })
        return this.state.profilesEnabled
    }

  }

  renderProfile() {
    return <TouchableOpacity onPress={() => { this.showProfile(this.state.selectedPlace.mapItem.user.id) }}>
      <Card style={styles.dashboardConversationCard}>
        <CardItem>

          <Body>
            <ProfileImage user={this.state.selectedPlace.mapItem.user.id} size='small'>
            </ProfileImage>
            <Text style={styles.fontConnectWithName}>{this.state.selectedPlace.mapItem.user.given_name} {this.state.selectedPlace.mapItem.user.family_name}</Text>
            <Text style={styles.fontConnectWithRole}>{this.state.selectedPlace.mapItem.user.currentRole}</Text>
            <Button bordered style={styles.connectWithSliderButton} onPress={() => { this.openConversation(this.state.selectedPlace.mapItem.user.id, this.state.selectedPlace.mapItem.user.given_name + " " + this.state.selectedPlace.mapItem.user.family_name) }}><Text style={styles.fontStartConversation}>Start Conversation</Text></Button>
          </Body>

        </CardItem>
      </Card>
    </TouchableOpacity>
  }
  renderEvent() {
    return <Card style={{ minHeight: 395, alignSelf: "flex-start", padding: '0%', paddingLeft: '0.25rem', paddingRight: '0.25rem', borderRadius: 4, boxShadow: "0px 5px 30px rgba(0, 0, 0, 0.05)", borderStyle: "solid", borderColor: "#FFFFFF", width: 100 }}>
      <CardItem ><Text ellipsizeMode='tail' numberOfLines={1} style={styles.fontDetailTop}>{moment(this.state.selectedPlace.mapItem.event.time).format('MMMM Do YYYY, h:mm a')}</Text></CardItem>
      <CardItem style={{ height: 100 }}><Text ellipsizeMode='tail' numberOfLines={3} style={styles.fontTitle}>{this.state.selectedPlace.mapItem.event.name}</Text></CardItem>
      <CardItem style={{ height: 100 }}><Text ellipsizeMode='tail' numberOfLines={3} style={styles.fontDetailMiddle}>{this.state.selectedPlace.mapItem.event.description}</Text></CardItem>
      <CardItem>
        {this.state.selectedPlace.mapItem.event.eventType == "location" ?
          <Text ellipsizeMode='tail' numberOfLines={1} style={styles.fontDetailBottom}><a target="_blank" rel="noreferrer" href={"https://www.google.com/maps/dir/?api=1&destination=" + escape(this.state.selectedPlace.mapItem.event.location)}>{this.state.selectedPlace.mapItem.event.location}</a></Text>
          : this.state.selectedPlace.mapItem.event.eventType == "zoom" ?
            <Text ellipsizeMode='tail' numberOfLines={1} style={styles.fontDetailBottom}><a target="_blank" rel="noreferrer" href={this.state.selectedPlace.mapItem.event.eventUrl}>Zoom</a></Text>
            :
            <Text ellipsizeMode='tail' numberOfLines={1} style={styles.fontDetailBottom}><a target="_blank" rel="noreferrer" href={this.state.selectedPlace.mapItem.event.eventUrl}>Eventbrite</a></Text>
        }
      </CardItem>
      {/*
        {this.canJoin(item.id) && !this.isOwner(item.id) ? <CardItem ><JCButton buttonType={ButtonTypes.Solid} onPress={() => { this.join(item, "Event") }}>Attend</JCButton><Right></Right></CardItem> : null}
        {this.canLeave(item.id) && !this.isOwner(item.id) ? <CardItem ><JCButton buttonType={ButtonTypes.Solid} onPress={() => { this.leave(item, "Event") }}>Don't Attend</JCButton><Right></Right></CardItem> : null}
        {this.isOwner(item.id) ? <CardItem ><JCButton buttonType={ButtonTypes.Solid} onPress={() => null}>Owner</JCButton><Right></Right></CardItem> : null}
        */}
    </Card>

  }
  render() {
    //console.log(this.props.mapData)
    if (this.props.visible)
      return (
        <ErrorBoundary>
          <View style={{ display: 'flex', height: '60%' }}>
            <View style={{ flex: 1 }}>
              <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingLeft: '5%'}}>
                <View style={{flex: 0.1, flexDirection: 'row'}}>
                  <Text style={{ paddingRight: 10 }}>Show Organizations</Text>
                  <Switch
                    onValueChange={()=>this.toggleFilters("organization")}
                    value={this.state.organizationsEnabled}
                  />
                </View>
                <View style={{flex: 0.08, flexDirection: 'row'}}>
                  <Text style={{ paddingRight: 10 }}>Show Groups</Text>
                  <Switch         
                    onValueChange={()=>this.toggleFilters("group")}
                    value={this.state.groupsEnabled}
                  />                
                </View>
                <View style={{flex: 0.08, flexDirection: 'row'}}>
                  <Text style={{ paddingRight: 10 }}>Show Events</Text>
                  <Switch         
                    onValueChange={()=>this.toggleFilters("event")}
                    value={this.state.eventsEnabled}
                  />                
                </View>
                <View style={{flex: 0.08, flexDirection: 'row'}}>
                  <Text style={{ paddingRight: 10 }}>Show Profiles</Text>
                  <Switch         
                    onValueChange={()=>this.toggleFilters("profile")}
                    value={this.state.profilesEnabled}
                  />                
                </View>
              </View>
            </View>
            <View style={{ flex: 9 }}>
              <Map google={window.google} zoom={6}
                initialCenter={{ lat: 44, lng: -78.0 }}
                mapTypeControl={false}
                onClick={this.onMapClicked}
                onReady={(mapProps, map)=>this._mapLoaded(mapProps, map)}
                style={{ position: "relative", width: "100%", height: "100%" }}
                streetViewControl={false}
                fullscreenControl={false}
              >

              {
              this.props.mapData.map((mapItem, index) => {
                  
                  let filters = []
                  if (!this.state.groupsEnabled) {
                    filters.push("group")
                  }
                  if (!this.state.organizationsEnabled) {
                    filters.push("organization")
                  }
                  if (!this.state.eventsEnabled) {
                    filters.push("event")
                  }
                  if (!this.state.profilesEnabled) {
                    filters.push("profile")
                  }

                  let filtered = filters.filter(item => mapItem.type === item)
                  if (filtered.length === 0) {
                    return <Marker key={index} title={mapItem.name}
                    mapItemType={mapItem.type}
                    mapItem={mapItem}
                    onClick={this.onMarkerClick}
                    position={{ lat: mapItem.latitude, lng: mapItem.longitude }}
                    icon={{
                      url: require("../../assets/svg/mapicon.svg"),
                      anchor: new google.maps.Point(32,32),
                      scaledSize: new google.maps.Size(32,32)
                    }}>
                    </Marker>
                  }
            
                })}

                <InfoWindow
                  google={window.google}
                  visible={this.state.showingInfoWindow}
                  marker={this.state.activeMarker}>
                  {this.state.selectedPlace != null ?
                    this.state.selectedPlace.mapItemType == "profile" ?
                      this.renderProfile() :
                      this.state.selectedPlace.mapItemType == "event" ?
                        this.renderEvent()
                        : null
                    : null
                  }

                </InfoWindow>
              </Map>
            </View>
          </View>
        </ErrorBoundary>
      )
    else return null
  }
}


export default MyMap