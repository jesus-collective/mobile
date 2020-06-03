
import * as React from 'react';
//import {ProviderProps} from 'google-maps-react';
//import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Body, Card, CardItem, Container, Button, View } from 'native-base';
import { TouchableOpacity } from 'react-native'
import styles from '../style'

import { Marker, } from 'google-maps-react';
import { Map, InfoWindow } from 'google-maps-react';
import ProfileImage from '../../components/ProfileImage/ProfileImage'

import { Text } from 'react-native'
import ErrorBoundary from '../ErrorBoundry';
import moment from 'moment';
interface Props {
  navigation: any
  visible: boolean
  google: any
  mapData: any
}
interface State {
  selectedPlace: any,
  activeMarker: any,
  showingInfoWindow: any
}

class MyMap extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      activeMarker: null,
      selectedPlace: {},
      showingInfoWindow: false
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
    return <Card style={styles.myMapCalloutEventContainer}>
      <CardItem ><Text ellipsizeMode='tail' numberOfLines={1} style={styles.myMapFontDetailTop}>{moment(this.state.selectedPlace.mapItem.event.time).format('MMMM Do YYYY, h:mm a')}</Text></CardItem>
      <CardItem style={styles.myMapCalloutEventName}><Text ellipsizeMode='tail' numberOfLines={2} style={styles.myMapFontTitle}>{this.state.selectedPlace.mapItem.event.name}</Text></CardItem>
      <CardItem style={styles.myMapCalloutEventDescription}><Text ellipsizeMode='tail' numberOfLines={3} style={styles.myMapFontDetailMiddle}>{this.state.selectedPlace.mapItem.event.description}</Text></CardItem>
      <CardItem style={{ paddingBottom: 40 }}>
        {this.state.selectedPlace.mapItem.event.eventType == "location" ?
          <Text ellipsizeMode='tail' numberOfLines={1} style={styles.myMapFontDetailBottom}><a target="_blank" rel="noreferrer" href={"https://www.google.com/maps/dir/?api=1&destination=" + escape(this.state.selectedPlace.mapItem.event.location)}>{this.state.selectedPlace.mapItem.event.location}</a></Text>
          : this.state.selectedPlace.mapItem.event.eventType == "zoom" ?
            <Text ellipsizeMode='tail' numberOfLines={1} style={styles.myMapFontDetailBottom}><a target="_blank" rel="noreferrer" href={this.state.selectedPlace.mapItem.event.eventUrl}>Zoom</a></Text>
            :
            <Text ellipsizeMode='tail' numberOfLines={1} style={styles.myMapFontDetailBottom}><a target="_blank" rel="noreferrer" href={this.state.selectedPlace.mapItem.event.eventUrl}>Eventbrite</a></Text>
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
          <Container style={{ height: "50%" }}>
            <Map google={window.google} zoom={6}
              initialCenter={{ lat: 44, lng: -78.0 }}
              mapTypeControl={false}
              onClick={this.onMapClicked}

              style={{ position: "relative", width: "100%", height: "100%" }}
            >

              {this.props.mapData.map((mapItem, index) => {
                return <Marker key={index} title={mapItem.name}
                  mapItemType={mapItem.type}
                  mapItem={mapItem}
                  onClick={this.onMarkerClick}
                  position={{ lat: mapItem.latitude, lng: mapItem.longitude }}>


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
          </Container>
        </ErrorBoundary>
      )
    else return null
  }
}


export default MyMap