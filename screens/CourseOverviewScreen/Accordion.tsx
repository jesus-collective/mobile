import React, { Component } from "react"
import { isBrowser, isMobile } from "react-device-detect"
import { Image, LayoutAnimation, Platform, TouchableOpacity, UIManager, View } from "react-native"

interface Props {
  header: any
}
interface State {
  expanded: boolean
}
export default class Accordion extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      expanded: false,
    }

    if (Platform.OS === "android") {
      UIManager.setLayoutAnimationEnabledExperimental(true)
    }
  }

  render(): React.ReactNode {
    return (
      <View style={{ width: isBrowser ? "30vw" : isMobile ? "100%" : "30vw" }}>
        <TouchableOpacity
          onPress={() => this.toggleExpand()}
          style={{
            width: "100%",
            borderRadius: 4,
            backgroundColor: "#F0493E",
            paddingTop: 13,
            paddingBottom: 13,
            paddingLeft: 20,
            paddingRight: 20,
            marginTop: 10,
            marginBottom: 10,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {this.props.header}
          {this.state.expanded ? (
            <Image
              style={{ width: 12, height: 6, alignSelf: "center" }}
              source={require("../../assets/svg/dropdown_up_white.svg")}
            />
          ) : (
            <Image
              style={{ width: 12, height: 6, alignSelf: "center" }}
              source={require("../../assets/svg/dropdown_white.svg")}
            />
          )}
        </TouchableOpacity>
        {this.state.expanded && this.props.children}
      </View>
    )
  }

  toggleExpand = (): void => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    this.setState({ expanded: !this.state.expanded })
  }
}
