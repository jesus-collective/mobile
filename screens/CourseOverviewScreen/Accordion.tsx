
import React, { Component } from 'react';
import { TouchableOpacity, Text, StyleSheet, LayoutAnimation, Platform, UIManager } from "react-native";
import { View } from "native-base"
//import { Colors } from './Colors';
import Icon from "react-native-vector-icons/MaterialIcons";
interface Props {
    header: any
}
interface State {
    expanded: boolean
}
export default class Accordian extends Component<Props, State> {

    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
        }

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    render() {

        return (
            <View>
                <TouchableOpacity onPress={() => this.toggleExpand()}>
                    {this.props.header}
                </TouchableOpacity>
                <View />
                {
                    this.state.expanded && this.props.children
                }
            </View>
        )
    }

    toggleExpand = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({ expanded: !this.state.expanded })
    }

}
