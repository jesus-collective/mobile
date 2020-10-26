import JCComponent from "../JCComponent/JCComponent";
import React from "react";
import { View, TextInput, Modal, Picker } from 'react-native';
import { Container, Content, Text } from 'native-base';
import JCButton, { ButtonTypes } from '../../components/Forms/JCButton';

interface Props {
    visible: boolean
    onHide(): void
    title: string
}


export default class AdminScreen extends JCComponent<Props>{
    constructor(props: Props) {
        super(props);
    }
    render() {
        return (
            this.props.visible ?
                <Modal animationType="slide" transparent={true} presentationStyle="pageSheet" style={{ backgroundColor: 'rgba(0,0,0,0.5)', width: '100%', height: '100%', borderWidth: 0 }} visible={this.state.showAddTierModal}>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <View style={{ margin: 20, backgroundColor: "white", borderRadius: 10, paddingTop: 10, paddingBottom: 25, paddingLeft: 20, paddingRight: 20, alignItems: "center", shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                <Text style={this.styles.style.adminCRMModalHeading}>{this.props.title}</Text>
                                <JCButton buttonType={ButtonTypes.AdminModal} onPress={() => { this.props.onHide() }}>X</JCButton>
                            </View>
                            <View style={{ borderBottomColor: '#333333', opacity: 0.2, borderBottomWidth: 1, width: '100%', marginBottom: 15 }}>
                            </View>
                            {this.props.children}
                        </View>
                    </View>
                </Modal > : null
        )
    }
}
