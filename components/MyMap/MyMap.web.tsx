
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
}
interface State { }

class MyMap extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    if (this.props.visible)
      return (
        <Container style={{ height: 250 }}>
          <Map google={this.props.google} zoom={6}
            initialCenter={{ lat: 44, lng: -78.0 }}
            mapTypeControl={false}
            style={{ position: "relative", width: "100%", height: "250px" }}
          >



          </Map>
        </Container>
      )
    else return null
  }
}


export default GoogleApiWrapper({
  apiKey: ('AIzaSyDXxLzyv5pYsIPl3XnVX5ONklXvs48zjn0')
})(MyMap)