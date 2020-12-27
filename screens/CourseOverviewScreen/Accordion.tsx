import { View } from "native-base"
import React, { Component } from "react"
import { LayoutAnimation, Platform, TouchableOpacity, UIManager } from "react-native"
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

  render() {
    return (
      <View>
        <TouchableOpacity onPress={() => this.toggleExpand()}>{this.props.header}</TouchableOpacity>
        <View />
        {this.state.expanded && this.props.children}
      </View>
    )
  }

  toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    this.setState({ expanded: !this.state.expanded })
  }
}
