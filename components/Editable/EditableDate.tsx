import React from 'react';
import { Input, Content, Left, Right, Body, StyleProvider, Container, Card, CardItem, Button, Text } from 'native-base';
import { KeyboardDatePicker, DateTimePicker, KeyboardDateTimePicker } from "@material-ui/pickers";
var moment = require('moment');

interface Props {
    value: string,
    isEditable: boolean,
    textStyle: any,
    inputStyle?: any,
    multiline: boolean,
    placeholder?: string,
    onChange?(string),
    type: string
}
interface State {
    // value: string,
    isEditable: boolean,
    textStyle: any,
    inputStyle: any,
    multiline: boolean,
    placeholder: string

}
export default class MessageBoard extends React.Component<Props, State> {
    constructor(props: Props) {

        super(props);
        this.state = {
            // value: props.value,
            isEditable: props.isEditable,
            textStyle: props.textStyle,
            inputStyle: props.inputStyle,
            multiline: props.multiline,
            placeholder: props.placeholder,

        }
        console.log(props)
    }
    onChanged(val: any) {
        this.props.onChange(val.format())
    }

    render() {


        if (this.state.isEditable) {
            if (this.props.type == 'datetime') 
                return (
                    <KeyboardDateTimePicker
                        variant="inline"
                        ampm={true}
                        label={this.state.placeholder}
                        value={this.props.value}
                        format='MMMM Do YYYY, h:mm a'
                        onChange={(value) => { this.onChanged(value) }}
                        onError={console.log}
                        disablePast
                        minutesStep={15}


                    />)
            else
                return (
                    <KeyboardDatePicker
                        variant="inline"
                        format='MMMM Do YYYY, h:mm a'
                        label={this.state.placeholder}
                        value={moment(this.props.value)}
                        onChange={(value) => { console.log(value); this.onChanged(value) }}
                        //onError={console.log}
                        disablePast



                    />)
        }
        else
            return <Text style={this.state.textStyle}> {moment(this.props.value).format('MMMM Do YYYY, h:mm a')} </Text >
    }
}