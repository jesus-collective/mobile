import React from 'react';
import { Text } from 'react-native'
import './EditableDateStyle.ts';
import { KeyboardDatePicker, KeyboardDateTimePicker } from "@material-ui/pickers";
import moment from 'moment';
import JCComponent from '../JCComponent/JCComponent';

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
export default class EditableDate extends JCComponent<Props, State> {
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
        // console.log(props)
    }
    onChanged(val: any): void {
        this.props.onChange(val.format())
    }

    render(): React.ReactNode {


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
                        emptyLabel="Date not set"
                        initialFocusedDate={moment().add(5, 'days').format()}

                    />)
            else
                return (
                    <KeyboardDatePicker
                        variant="inline"
                        format='MMMM Do YYYY, h:mm a'
                        label={this.state.placeholder}
                        value={moment(this.props.value)}
                        onChange={(value) => { this.onChanged(value) }}
                        //onError={console.log}
                        disablePast
                        emptyLabel="Date not set"
                        initialFocusedDate={moment().add(5, 'days').format()}


                    />)
        }
        else
            return <Text style={this.state.textStyle}> {moment(this.props.value).format('MMMM Do YYYY, h:mm a')} </Text >
    }
}