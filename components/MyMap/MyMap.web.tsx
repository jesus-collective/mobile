
import * as React from 'react';
import { GoogleApiWrapper } from 'google-maps-react';
//import {ProviderProps} from 'google-maps-react';
//import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Marker } from 'google-maps-react';
import { Map, InfoWindow } from 'google-maps-react';

import { Text } from 'react-native'
import { Container } from 'native-base';
interface Props {
  navigation: any
  visible: boolean
  google: any
  mapData: any
}
interface State { }

class MyMap extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    console.log(this.props.mapData)
    if (this.props.visible)
      return (
        <Container style={{ height: 250 }}>
          <Map google={window.google} zoom={6}
            initialCenter={{ lat: 44, lng: -78.0 }}
            mapTypeControl={false}
            style={{ position: "relative", width: "100%", height: "400px" }}
          >
            {this.props.mapData.map((mapItem, index) => {
              return <Marker key={index} title={mapItem.name}
                label={mapItem.name}

                position={{ lat: mapItem.latitude, lng: mapItem.longitude }}></Marker>
            })}


          </Map>
        </Container>
      )
    else return null
  }
}


export default MyMap