import React from 'react';
import { View } from 'native-base';
import { Text, Animated, TouchableWithoutFeedback } from 'react-native'
import JCComponent from '../JCComponent/JCComponent';

interface Props {
  switchLabel: string
  initState: boolean
  onPress(status): any
  /** 
   * Set a larger value if switchLabel does not fit on a single line. 
   * @default 170
  */
  containerWidth?: number
  /**
   * Sets color of the pill when the switch is on.
   * @default "#333333"
   * @example <JCSwitch onColor="#F0493E"/>
  */
  onColor?: string
  /**
   * Sets color of the pill when the switch is off.
   * @default "#aaaaaa"
   * @example <JCSwitch offColor="#F0493E"/>
  */
  offColor?: string
  /**
   * Statically sets color of the circle.
   * @default "#ffffff"
   * @example <JCSwitch offColor="#F0493E"/>
  */
  thumbColor?: string
}
interface State {
  enabled: boolean
  animationState: any
  onColor: string
  offColor: string
  thumbColor: string
}

export default class JCSwitch extends JCComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      enabled: this.props.initState,
      animationState: new Animated.Value(this.props.initState ? 1 : 0),
      onColor: this.props.onColor ? this.props.onColor : '#333333',
      offColor: this.props.offColor ? this.props.offColor : '#aaaaaa',
      thumbColor: this.props.thumbColor ? this.props.thumbColor : '#ffffff'
    }
  }

  onPress(): void {
    Animated.timing(this.state.animationState, {
      toValue: this.state.enabled ? 0 : 1,
      duration: 200,
      useNativeDriver: true
    }).start();
    this.setState({ enabled: !this.state.enabled }, () => { this.props.onPress(this.state.enabled) }
    )
  }

  render(): React.ReactNode {
    return <View style={{ width: this.props.containerWidth ? this.props.containerWidth : 170, flexDirection: 'row' }}>
      <Text style={this.styles.style.fontMyMapOptions}>{this.props.switchLabel}</Text>
      <TouchableWithoutFeedback onPress={() => this.onPress()}>
        <View style={{
          backgroundColor: this.state.enabled ? this.state.onColor : this.state.offColor,
          borderColor: this.state.enabled ? this.state.onColor : this.state.offColor,
          borderWidth: 2, borderRadius: 25, width: 50, height: 20
        }}>
          <Animated.View
            style={{
              backgroundColor: this.state.thumbColor, borderRadius: 25, width: 16, height: 16,
              transform: [{
                translateX: this.state.animationState.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 30]
                })
              }]
            }} />
        </View>
      </TouchableWithoutFeedback>
    </View>
  }
}