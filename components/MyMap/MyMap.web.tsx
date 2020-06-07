
import * as React from 'react';
//import {ProviderProps} from 'google-maps-react';
//import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Body, Card, CardItem, Button, View } from 'native-base';
import { TouchableOpacity, Animated, TouchableWithoutFeedback } from 'react-native'


import { Marker } from 'google-maps-react';
<<<<<<< HEAD
=======

>>>>>>> 5a3b6c3a1464ca2cbba7d5dbd2c10e9a942bc14b
import { Map, InfoWindow } from 'google-maps-react';
import ProfileImage from '../../components/ProfileImage/ProfileImage'

import { Text } from 'react-native'
import ErrorBoundary from '../ErrorBoundry';
import moment from 'moment';
import JCComponent from '../JCComponent/JCComponent';
import { useRoute, useNavigation } from '@react-navigation/native';

import mapStyle from './mapstyle.json';

interface Props {
  navigation?: any
  route?: any
  visible: boolean
  google: any
  mapData: any
  type: string
  initCenter?: any
  size?: string
}
interface State {
  selectedPlace: any
  activeMarker: any
  showingInfoWindow: any
  groupsEnabled: boolean
  profilesEnabled: boolean
  organizationsEnabled: boolean
  eventsEnabled: boolean
  groupsToggle: any
  profilesToggle: any
  organizationsToggle: any
  eventsToggle: any
  initCenterProfile: any
}

class MyMapImpl extends JCComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      activeMarker: null,
      selectedPlace: {},
      showingInfoWindow: false,
      groupsEnabled: false,
      profilesEnabled: true,
      organizationsEnabled: true,
      eventsEnabled: false,
      groupsToggle: new Animated.Value(1),
      profilesToggle: new Animated.Value(1),
      organizationsToggle: new Animated.Value(1),
      eventsToggle: new Animated.Value(1),
      initCenterProfile: null
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

  _mapLoaded(map) {
    map.setOptions({
      styles: mapStyle
    })
  }

  toggleFilters(type: string): boolean {
    switch (type) {
      case "organization":

        if (this.state.organizationsEnabled) {
          Animated.timing(this.state.organizationsToggle, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true
          }).start();
        } else {
          Animated.timing(this.state.organizationsToggle, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true
          }).start();
        }
        this.setState({ organizationsEnabled: !this.state.organizationsEnabled })
        return this.state.organizationsEnabled

      case "group":

        if (this.state.groupsEnabled) {
          Animated.timing(this.state.groupsToggle, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true
          }).start();
        } else {
          Animated.timing(this.state.groupsToggle, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true
          }).start();
        }
        this.setState({ groupsEnabled: !this.state.groupsEnabled })
        return this.state.groupsEnabled

      case "event":

        if (this.state.eventsEnabled) {
          Animated.timing(this.state.eventsToggle, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true
          }).start();
        } else {
          Animated.timing(this.state.eventsToggle, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true
          }).start();
        }
        this.setState({ eventsEnabled: !this.state.eventsEnabled })
        return this.state.eventsEnabled

      case "profile":

        if (this.state.profilesEnabled) {
          Animated.timing(this.state.profilesToggle, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true
          }).start();
        } else {
          Animated.timing(this.state.profilesToggle, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true
          }).start();
        }
        this.setState({ profilesEnabled: !this.state.profilesEnabled })
        return this.state.profilesEnabled
    }
  }

  renderProfile() {
    return <TouchableOpacity onPress={() => { this.showProfile(this.state.selectedPlace.mapItem.user.id) }}>
      <Card style={this.styles.style.myMapDashboardConversationCard}>
        <CardItem>

          <Body>
            <ProfileImage user={this.state.selectedPlace.mapItem.user.id} size='small'>
            </ProfileImage>
            <Text style={this.styles.style.fontConnectWithName}>{this.state.selectedPlace.mapItem.user.given_name} {this.state.selectedPlace.mapItem.user.family_name}</Text>
            <Text style={this.styles.style.fontConnectWithRole}>{this.state.selectedPlace.mapItem.user.currentRole}</Text>
            <Button bordered style={this.styles.style.myMapConnectWithSliderButton} onPress={() => { this.openConversation(this.state.selectedPlace.mapItem.user.id, this.state.selectedPlace.mapItem.user.given_name + " " + this.state.selectedPlace.mapItem.user.family_name) }}><Text style={this.styles.style.fontStartConversation}>Start Conversation</Text></Button>
          </Body>

        </CardItem>
      </Card>
    </TouchableOpacity>
  }
  renderEvent() {
    return <Card style={this.styles.style.myMapCalloutEventContainer}>
      <CardItem ><Text ellipsizeMode='tail' numberOfLines={1} style={this.styles.style.myMapFontDetailTop}>{moment(this.state.selectedPlace.mapItem.event.time).format('MMMM Do YYYY, h:mm a')}</Text></CardItem>
      <CardItem style={this.styles.style.myMapCalloutEventName}><Text ellipsizeMode='tail' numberOfLines={2} style={this.styles.style.myMapFontTitle}>{this.state.selectedPlace.mapItem.event.name}</Text></CardItem>
      <CardItem style={this.styles.style.myMapCalloutEventDescription}><Text ellipsizeMode='tail' numberOfLines={3} style={this.styles.style.myMapFontDetailMiddle}>{this.state.selectedPlace.mapItem.event.description}</Text></CardItem>
      <CardItem style={{ paddingBottom: 40 }}>
        {this.state.selectedPlace.mapItem.event.eventType == "location" ?
          <Text ellipsizeMode='tail' numberOfLines={1} style={this.styles.style.myMapFontDetailBottom}><a target="_blank" rel="noreferrer" href={"https://www.google.com/maps/dir/?api=1&destination=" + escape(this.state.selectedPlace.mapItem.event.location)}>{this.state.selectedPlace.mapItem.event.location}</a></Text>
          : this.state.selectedPlace.mapItem.event.eventType == "zoom" ?
            <Text ellipsizeMode='tail' numberOfLines={1} style={this.styles.style.myMapFontDetailBottom}><a target="_blank" rel="noreferrer" href={this.state.selectedPlace.mapItem.event.eventUrl}>Zoom</a></Text>
            :
            <Text ellipsizeMode='tail' numberOfLines={1} style={this.styles.style.myMapFontDetailBottom}><a target="_blank" rel="noreferrer" href={this.state.selectedPlace.mapItem.event.eventUrl}>Eventbrite</a></Text>
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
    if (this.props.visible && this.props.type === "filters") {
      return (
        <ErrorBoundary>

          <View style={{ display: 'flex', height: '50%' }}>
            <View style={{ flex: 1, minHeight: 50 }}>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingLeft: '5%' }}>
                <View style={{ width: 170, flexDirection: 'row' }}>
                  <Text style={this.styles.style.fontMyMapOptions}>Show Groups</Text>
                  <TouchableWithoutFeedback onPress={() => this.toggleFilters("group")}>
                    <View style={{
                      backgroundColor: this.state.groupsEnabled ? '#333333' : '#aaaaaa',
                      borderColor: this.state.groupsEnabled ? '#333333' : '#aaaaaa',
                      borderWidth: 2, borderRadius: 25, width: 50, height: 20
                    }}>
                      <Animated.View
                        style={{
                          backgroundColor: '#ffffff', borderRadius: 25, width: 16, height: 16,
                          transform: [{
                            translateX: this.state.groupsToggle.interpolate({
                              inputRange: [0, 1],
                              outputRange: [0, 30]
                            })
                          }]
                        }} />
                    </View>
                  </TouchableWithoutFeedback>
                </View>
                <View style={{ width: 170, flexDirection: 'row' }}>
                  <Text style={this.styles.style.fontMyMapOptions}>Show Events</Text>
                  <TouchableWithoutFeedback onPress={() => this.toggleFilters("event")}>
                    <View style={{
                      backgroundColor: this.state.eventsEnabled ? '#333333' : '#aaaaaa',
                      borderColor: this.state.eventsEnabled ? '#333333' : '#aaaaaa',
                      borderWidth: 2, borderRadius: 25, width: 50, height: 20
                    }}>
                      <Animated.View
                        style={{
                          backgroundColor: '#ffffff', borderRadius: 25, width: 16, height: 16,
                          transform: [{
                            translateX: this.state.eventsToggle.interpolate({
                              inputRange: [0, 1],
                              outputRange: [0, 30]
                            })
                          }]
                        }} />
                    </View>
                  </TouchableWithoutFeedback>
                </View>
                <View style={{ width: 170, flexDirection: 'row' }}>
                  <Text style={this.styles.style.fontMyMapOptions}>Show Profiles</Text>
                  <TouchableWithoutFeedback onPress={() => this.toggleFilters("profile")}>
                    <View style={{
                      backgroundColor: this.state.profilesEnabled ? '#333333' : '#aaaaaa',
                      borderColor: this.state.profilesEnabled ? '#333333' : '#aaaaaa',
                      borderWidth: 2, borderRadius: 25, width: 50, height: 20
                    }}>
                      <Animated.View
                        style={{
                          backgroundColor: '#ffffff', borderRadius: 25, width: 16, height: 16,
                          transform: [{
                            translateX: this.state.profilesToggle.interpolate({
                              inputRange: [0, 1],
                              outputRange: [0, 30]
                            })
                          }]
                        }} />
                    </View>
                  </TouchableWithoutFeedback>
                </View>
                <View style={{ width: 200, flexDirection: 'row' }}>
                  <Text style={this.styles.style.fontMyMapOptions}>Show Organizations</Text>
                  <TouchableWithoutFeedback onPress={() => this.toggleFilters("organization")}>
                    <View style={{
                      backgroundColor: this.state.organizationsEnabled ? '#333333' : '#aaaaaa',
                      borderColor: this.state.organizationsEnabled ? '#333333' : '#aaaaaa',
                      borderWidth: 2, borderRadius: 25, width: 50, height: 20
                    }}>
                      <Animated.View
                        style={{
                          backgroundColor: '#ffffff', borderRadius: 25, width: 16, height: 16,
                          transform: [{
                            translateX: this.state.organizationsToggle.interpolate({
                              inputRange: [0, 1],
                              outputRange: [0, 30]
                            })
                          }]
                        }} />
                    </View>
                  </TouchableWithoutFeedback>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', paddingRight: '2%' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 20 }}>
                    <View style={{ backgroundColor: '#f0493e', borderRadius: 25, width: 25, height: 13, }}></View>
                    <Text style={this.styles.style.fontMyMapLegend}>Partners</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 20 }}>
                    <View style={{ backgroundColor: '#ffb931', borderRadius: 25, width: 25, height: 13 }}></View>
                    <Text style={this.styles.style.fontMyMapLegend}>Friends</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={{ flex: 9 }}>

              <Map google={window.google} zoom={6}
                initialCenter={{ lat: 44, lng: -78.0 }}
                mapTypeControl={false}
                onClick={this.onMapClicked}
                onReady={(mapProps, map) => this._mapLoaded(map)}
                style={{ position: "relative", width: "100%", height: "100%" }}
                streetViewControl={false}
                fullscreenControl={false}
              >

                {
                  this.props.mapData.map((mapItem, index) => {

                    const filters = []
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

                    const filtered = filters.filter(item => mapItem.type === item)
                    if (filtered.length === 0) {
                      return <Marker key={index} title={mapItem.name}
                        mapItemType={mapItem.type}
                        mapItem={mapItem}
                        onClick={this.onMarkerClick}
                        position={{ lat: mapItem.latitude, lng: mapItem.longitude }}
                        icon={{
                          url: require("../../assets/svg/map-icon-red.svg"),
                          scaledSize: new google.maps.Size(32, 32)
                        }}>
                      </Marker>
                    }

                    //will need later for friends
                    //url: require("../../assets/svg/map-icon-yellow.svg"),

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
    }
<<<<<<< HEAD

=======
    
>>>>>>> 5a3b6c3a1464ca2cbba7d5dbd2c10e9a942bc14b
    else if (this.props.visible && this.props.type === "profile") {
      return (
        <ErrorBoundary>

          <View style={{ height: 362, width: '100%' }}>

            <Map google={window.google} zoom={6}
              center={this.props.initCenter}
              mapTypeControl={false}
              onClick={this.onMapClicked}
              onReady={(mapProps, map) => this._mapLoaded(map)}
              style={{ position: "relative", width: "100%", height: "100%" }}
              streetViewControl={false}
              fullscreenControl={false}
            >
              {this.props.mapData.map((item, index) => {
                return <Marker key={index}
                  position={{ lat: item.latitude, lng: item.longitude }}
                  icon={{
                    url: require("../../assets/svg/map-location.svg"),
                    anchor: new google.maps.Point(50, 50),
                    scaledSize: new google.maps.Size(100, 100)
                  }} />
              })}

            </Map>
          </View>

        </ErrorBoundary>
      )
    }

    else if (this.props.type === "no-filters") {
      //the visible prop controls height because the map must render to set the correct center position 
      return (
        <ErrorBoundary>

<<<<<<< HEAD
          <View style={{ height: this.props.visible ? this.props.size ? this.props.size : 510 : 0 }}>

            <Map google={window.google} zoom={6}
              center={this.props.initCenter ? this.props.initCenter : { lat: 44, lng: -78 }}
              mapTypeControl={false}
              onClick={this.onMapClicked}
              onReady={(mapProps, map) => this._mapLoaded(map)}
              style={{ position: "relative", width: "100%", height: "100%" }}
              streetViewControl={false}
              fullscreenControl={false}
            >

              {this.props.mapData.map((mapItem, index) => {

                return <Marker key={index} title={mapItem.name}
                  mapItemType={mapItem.type}
                  mapItem={mapItem}
                  onClick={this.onMarkerClick}
                  position={{ lat: mapItem.latitude, lng: mapItem.longitude }}
                  icon={{
                    url: require("../../assets/svg/map-icon-red.svg"),
                    scaledSize: new google.maps.Size(32, 32)
                  }}>
                </Marker>

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
=======
          <View style={{ height: this.props.visible ? this.props.size ? this.props.size : 510 : 0}}>

              <Map google={window.google} zoom={6}
                center={this.props.initCenter ? this.props.initCenter : {lat: 44, lng: -78}}
                mapTypeControl={false}
                onClick={this.onMapClicked}
                onReady={(mapProps, map) => this._mapLoaded(map)}
                style={{ position: "relative", width: "100%", height: "100%" }}
                streetViewControl={false}
                fullscreenControl={false}
              >

                {this.props.mapData.map((mapItem, index) => {

                    return <Marker key={index} title={mapItem.name}
                      mapItemType={mapItem.type}
                      mapItem={mapItem}
                      onClick={this.onMarkerClick}
                      position={{ lat: mapItem.latitude, lng: mapItem.longitude }}
                      icon={{
                        url: require("../../assets/svg/map-icon-red.svg"),
                        scaledSize: new google.maps.Size(32, 32)
                      }}>
                    </Marker>

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
>>>>>>> 5a3b6c3a1464ca2cbba7d5dbd2c10e9a942bc14b
          </View>

        </ErrorBoundary>
      )
    }
    else return null
  }
}


export default function MyMap(props: Props) {
  const route = useRoute();
  const navigation = useNavigation()
  return <MyMapImpl {...props} navigation={navigation} route={route} />;
}
