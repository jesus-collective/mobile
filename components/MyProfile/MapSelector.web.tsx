import { View, Container } from 'native-base';
import { Text } from 'react-native'
import * as React from 'react';
import JCButton, { ButtonTypes } from '../../components/Forms/JCButton'
//import {ProviderProps} from 'google-maps-react';
//import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Marker } from 'google-maps-react';
import { Map } from 'google-maps-react';
import JCComponent from '../JCComponent/JCComponent';
import styles from '../../components/style'
import mapStyle from './mapstyle.json';

interface Props {
    mapVisible: any,
    onClose(mapCoord: any): any
    google: any
    coord: any
}
interface State {
    mapCoord: any
    mapVisible: any
}

class MapSelector extends JCComponent<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            mapCoord: { latitude: this.props.coord != null ? this.props.coord.latitude : 0.0, longitude: this.props.coord != null ? this.props.coord.longitude : 0.0 },
            mapVisible: false
        }
    }

    _mapLoaded(map) {
        map.setOptions({
            styles: mapStyle
        })
    }

    render() {
        return (

            this.props.mapVisible ?
                <View style={this.styles.style.myProfileMapSelectorContainer}>
                    <View style={this.styles.style.myProfileMapSelectorInnerContainer}>
                        <View style={this.styles.style.myProfileMapSelectorInnerCopyContainer}>
                            <Text style={this.styles.style.mapSelectorText}>Select a location (this will be public)</Text>
                            <JCButton data-testid="mapselector-save" buttonType={ButtonTypes.SolidMap} onPress={() => this.props.onClose(this.state.mapCoord)}>Done</JCButton>
                        </View>
                        <Container style={styles.mapView}>
                            <Map google={window.google} zoom={2}
                                initialCenter={{ lat: 0, lng: 0 }}
                                mapTypeControl={false}
                                onReady={(mapProps, map) => this._mapLoaded(map)}
                                style={styles.map}
                                streetViewControl={false}
                                fullscreenControl={false}
                            >
                                <Marker
                                    title="Location"
                                    id={1}
                                    position={{ lat: this.state.mapCoord.latitude, lng: this.state.mapCoord.longitude }}
                                    draggable={true}
                                    onDragend={(e, e2, coord) => {
                                        console.log(e)
                                        console.log(coord.latLng)
                                        this.setState({ mapCoord: { latitude: coord.latLng.lat(), longitude: coord.latLng.lng() } })
                                    }}
                                    icon={{
                                        url: require("../../assets/svg/map-icon-red.svg"),
                                        scaledSize: new google.maps.Size(32, 32)
                                    }}
                                ></Marker>


                            </Map>
                        </Container>
                    </View>
                </View>
                : null
        )
    }
}



export default MapSelector