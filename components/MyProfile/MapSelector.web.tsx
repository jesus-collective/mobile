//import { withRouter, RouteComponentProps } from 'react-router-dom';
import * as React from "react"
import { Text, View } from "react-native"
import JCButton, { ButtonTypes } from "../../components/Forms/JCButton"
import JCComponent, { JCState } from "../JCComponent/JCComponent"
//import styles from '../../components/style'
import mapStyle from "./mapstyle.json"

interface Props {
  mapVisible: any
  onClose(mapCoord: any): any
  google: any
  coord: any
}
interface State extends JCState {
  mapCoord: any
  mapVisible: any
}

class MapSelector extends JCComponent<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      ...super.getInitialState(),
      mapCoord: {
        latitude: this.props.coord != null ? this.props.coord.latitude : 0.0,
        longitude: this.props.coord != null ? this.props.coord.longitude : 0.0,
      },
      mapVisible: false,
    }
  }

  _mapLoaded(map: any): void {
    map.setOptions({
      styles: mapStyle,
    })
  }

  render(): React.ReactNode {
    return this.props.mapVisible ? (
      <View style={this.styles.style.myProfileMapSelectorContainer}>
        <View style={this.styles.style.myProfileMapSelectorInnerContainer}>
          <View style={this.styles.style.myProfileMapSelectorInnerCopyContainer}>
            <Text style={this.styles.style.mapSelectorText}>
              Select a location (this will be public)
            </Text>
            <JCButton
              testID="mapselector-save"
              buttonType={ButtonTypes.SolidMap}
              onPress={() => this.props.onClose(this.state.mapCoord)}
            >
              Done
            </JCButton>
          </View>
          <View style={this.styles.style.mapView}>
            <Map
              google={window.google}
              zoom={2}
              initialCenter={{ lat: 0, lng: 0 }}
              mapTypeControl={false}
              onReady={(mapProps, map) => this._mapLoaded(map)}
              style={this.styles.style.map}
              streetViewControl={false}
              fullscreenControl={false}
            >
              <Marker
                title="Location"
                position={{ lat: this.state.mapCoord.latitude, lng: this.state.mapCoord.longitude }}
                draggable={true}
                onDragend={(e: any, e2: any, coord: any) => {
                  console.log(e)
                  console.log(coord.latLng)
                  this.setState({
                    mapCoord: { latitude: coord.latLng.lat(), longitude: coord.latLng.lng() },
                  })
                }}
                icon={{
                  url: require("../../assets/svg/map-icon-red.svg"),
                  scaledSize: new google.maps.Size(32, 32),
                }}
              ></Marker>
            </Map>
          </View>
        </View>
      </View>
    ) : null
  }
}

export default MapSelector
