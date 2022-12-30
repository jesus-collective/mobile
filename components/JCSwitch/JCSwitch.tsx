import { ActivityIndicator, Animated, Text, TouchableWithoutFeedback, View } from "react-native"
import JCComponent, { JCState } from "../JCComponent/JCComponent"

interface Props {
  switchLabel: string
  initState: boolean
  onPress(status: boolean): any
  asyncOnPress?(): Promise<boolean>
  /**
   * Set a larger value if switchLabel does not fit on a single line.
   * @default 170
   */
  containerWidth?: number | string
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
  disabled?: boolean
  toggleSpacing?: string
  toggleMargin?: number
  flexDirection?: "row" | "column" | "row-reverse" | "column-reverse" | undefined
  toggleMarginLeft?: number
  toggleMarginTop?: number
  toggleMarginBottom?: number
  testId?: string
}
interface State extends JCState {
  enabled: boolean
  loading?: boolean
  animationState: Animated.Value
  onColor: string
  offColor: string
  thumbColor: string
}

export default class JCSwitch extends JCComponent<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      ...super.getInitialState(),
      enabled: this.props.initState,
      loading: false,
      animationState: new Animated.Value(this.props.initState ? 1 : 0),
      onColor: this.props.onColor ? this.props.onColor : "#333333",
      offColor: this.props.offColor ? this.props.offColor : "#aaaaaa",
      thumbColor: this.props.thumbColor ? this.props.thumbColor : "#ffffff",
    }
  }

  async onPress(): Promise<void> {
    if (this.props.asyncOnPress) {
      this.setState({ loading: true })
      const success = await this.props.asyncOnPress()
      if (success) {
        Animated.timing(this.state.animationState, {
          toValue: this.state.enabled ? 0 : 1,
          duration: 200,
          useNativeDriver: true,
        }).start(() => {
          this.setState({ enabled: !this.state.enabled, loading: false })
        })
      } else {
        this.setState({ loading: false })
      }
    } else {
      Animated.timing(this.state.animationState, {
        toValue: this.state.enabled ? 0 : 1,
        duration: 200,
        useNativeDriver: true,
      }).start()
      this.setState({ enabled: !this.state.enabled }, () => {
        this.props.onPress(this.state.enabled)
      })
    }
  }

  render(): React.ReactNode {
    return (
      <View
        style={{
          width: this.props.containerWidth ? this.props.containerWidth : 175,
          flexDirection: this.props.flexDirection ? this.props.flexDirection : "row",
          justifyContent: this.props.toggleSpacing ? "space-between" : undefined,
          marginTop: this.props.toggleMargin ? 10 : undefined,
          marginBottom: this.props.toggleMargin ? 10 : undefined,
        }}
      >
        {this.props.switchLabel ? (
          <Text style={this.styles.style.fontMyMapOptions}>{this.props.switchLabel}</Text>
        ) : null}

        <TouchableWithoutFeedback
          accessible
          accessibilityState={{ checked: this.state.enabled }}
          accessibilityLabel={this.props.switchLabel}
          accessibilityRole="switch"
          testID={this.props.testId}
          disabled={this.props.disabled}
          onPress={() => (!this.state.loading ? this.onPress() : null)}
        >
          <View
            style={{
              backgroundColor: this.props.disabled
                ? this.state.offColor
                : this.state.enabled
                ? this.state.onColor
                : this.state.offColor,
              borderColor: this.props.disabled
                ? this.state.offColor
                : this.state.enabled
                ? this.state.onColor
                : this.state.offColor,
              borderWidth: 2,
              borderRadius: 25,
              width: 34,
              height: 20,
              marginLeft: this.props.toggleMarginLeft ? this.props.toggleMarginLeft : undefined,
              marginTop: this.props.toggleMarginTop ? this.props.toggleMarginTop : undefined,
              marginBottom: this.props.toggleMarginBottom
                ? this.props.toggleMarginBottom
                : undefined,
            }}
          >
            <Animated.View
              style={{
                backgroundColor: this.state.thumbColor,
                borderRadius: 25,
                width: 16,
                height: 16,
                transform: [
                  {
                    translateX: this.state.animationState.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 14],
                    }),
                  },
                ],
              }}
            >
              {this.state.loading && this.props.asyncOnPress ? (
                <ActivityIndicator
                  color="rgb(240, 73, 62)"
                  style={{ position: "absolute", zIndex: 10000, marginTop: -2, marginLeft: -2 }}
                  size="small"
                />
              ) : null}
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}
