import React from 'react';
import { withNavigation } from 'react-navigation';

import { Input, Content, Left, Right, Body, StyleProvider, Container, Card, CardItem, Button } from 'native-base';
import { Text } from 'react-native'

interface Props {
    value: string,
    title: string,
    isEditable: boolean,
    textStyle: any,
    inputStyle?: any,
    multiline: boolean,
    placeholder?: string,
    onChange?(string),
    navigation: any
}
interface State {
    // value: string,
    isEditable: boolean,
    textStyle: any,
    inputStyle: any,
    multiline: boolean,
    placeholder: string
}
class EditableUrl extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            // value: props.value,
            isEditable: props.isEditable,
            textStyle: props.textStyle,
            inputStyle: props.inputStyle,
            multiline: props.multiline,
            placeholder: props.placeholder
        }
        // console.log(props)
    }
    onChanged(val: any) {
        this.props.onChange(val.target.value)
    }
    navigate(id) {

        window.location.href = id


    }
    render() {


        if (this.state.isEditable)
            return <Input onChange={(value) => { this.onChanged(value) }} placeholder={this.state.placeholder} multiline={this.state.multiline} style={this.state.inputStyle} value={this.props.value}></Input>
        else
            return <Button onPress={() => { this.navigate(this.props.value) }}><Text style={this.state.textStyle}>{this.props.title}</Text></Button>
    }
}

export default withNavigation(EditableUrl)