import * as React from "react"
import { Text, View } from "react-native"
import MapView, { MapEvent, Marker, PROVIDER_GOOGLE } from "react-native-maps"
import JCButton, { ButtonTypes } from "../../components/Forms/JCButton"
import JCComponent, { JCState } from "../JCComponent/JCComponent"

interface Props {
  mapVisible: any
  onClose(mapCoord: any): any
  coord: any
}
interface State extends JCState {
  mapCoord: any
  mapVisible: any
}

export default class MapSelector extends JCComponent<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      ...super.getInitialState(),
      mapCoord: { latitude: 43.7, longitude: -79.4 },
      mapVisible: false,
    }
  }

  render(): React.ReactNode {
    return this.props.mapVisible ? (
      <View style={this.styles.style.mapSelectorView}>
        <View
          style={{
            backgroundColor: "#ffffff",
            borderRadius: 10,
            padding: 10,
            margin: 10,
            left: "10%",
            top: "10%",
            width: "80%",
            height: "80%",
          }}
        >
          <Text>Drag the marker to your location (this will be public)</Text>
          <JCButton
            buttonType={ButtonTypes.OutlineBold}
            onPress={() => this.props.onClose(this.state.mapCoord)}
          >
            Done
          </JCButton>
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
            <Marker
              draggable
              coordinate={this.state.mapCoord}
              onDragEnd={(e: MapEvent) => {
                console.log(e)
                this.setState({
                  mapCoord: {
                    latitude: e.nativeEvent.coordinate.latitude,
                    longitude: e.nativeEvent.coordinate.longitude,
                  },
                })
              }}
            />
          </MapView>
        </View>
      </View>
    ) : null
  }
}
