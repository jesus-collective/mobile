import { View } from 'native-base';
import { Text } from 'react-native'
import * as React from 'react';
import JCButton, { ButtonTypes } from '../../components/Forms/JCButton'

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

interface Props {
    mapVisible: any,
    onClose(mapCoord: any): any
}
interface State {
    mapCoord: any
    mapVisible: any
}

export default class MapSelector extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            mapCoord: { latitude: 43.7, longitude: -79.4 },
            mapVisible: false
        }
    }

    render(): React.ReactNode {
        return (

            this.props.mapVisible ?
                <View style={{ position: "fixed", left: 0, top: 0, width: "100%", height: "100%", zIndex: 100, backgroundColor: "#33333366" }}>
                    <View style={{ backgroundColor: "#ffffff", borderRadius: 10, padding: 10, margin: 10, left: "10%", top: "10%", width: "80%", height: "80%" }}>
                        <Text>Drag the marker to your location (this will be public)</Text>
                        <JCButton buttonType={ButtonTypes.OutlineBold} onPress={() => this.props.onClose(this.state.mapCoord)}>Done</JCButton>
                        <MapView
                            provider={PROVIDER_GOOGLE}
                            style={{ left: 10, top: 10, width: 480, height: 480 }}

                            initialRegion={{
                                latitude: 43.78825,
                                longitude: -78.4324,
                                latitudeDelta: 6,
                                longitudeDelta: 6,
                            }}
                        >
                            <MapView.Marker draggable
                                coordinate={this.state.mapCoord}
                                onDragEnd={(e) => {
                                    console.log(e)
                                    this.setState({ mapCoord: { latitude: e.latLng.lat(), longitude: e.latLng.lng() } })
                                }}
                            />
                        </MapView>

                    </View>
                </View>
                : null
        )
    }
}
