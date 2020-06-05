import React from 'react';
import { Text } from 'react-native'
import './EditableDateStyle.ts';
import { KeyboardDatePicker, KeyboardDateTimePicker } from "@material-ui/pickers";
import { Picker, Container } from 'native-base';
import moment from 'moment-timezone';

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
    placeholder: string,
    timezone: string

}
export default class EditableDate extends React.Component<Props, State> {
    constructor(props: Props) {

        super(props);
        this.state = {
            // value: props.value,
            isEditable: props.isEditable,
            textStyle: props.textStyle,
            inputStyle: props.inputStyle,
            multiline: props.multiline,
            placeholder: props.placeholder,
            timezone: moment.tz.guess()

        }
        // console.log(props)
    }
    onChanged(val: any): void {
        this.props.onChange(val.tz(this.state.timezone).format())
        console.log('jon')
        console.log(val.tz(this.state.timezone).format())
    }

    onTzChanged(value) {
        this.setState({ timezone: value }, () => this.onChanged(moment(this.props.value)))
    }

    render(): React.ReactNode {


        if (this.state.isEditable) {
            if (this.props.type == 'datetime')
                return (
                    <Container style={{maxHeight: 100}}>
                    <KeyboardDateTimePicker
                        variant="inline"
                        ampm={true}
                        label={this.state.placeholder}
                        value={moment(this.props.value).tz(this.state.timezone)}
                        format='MMMM Do YYYY, h:mm a '
                        onChange={(value) => { this.onChanged(value) }}
                        onError={console.log}
                        disablePast
                        minutesStep={15}
                        emptyLabel="Date not set"
                        initialFocusedDate={moment().add(5, 'days').format()}
                    />
                    <Picker
                        mode="dropdown"
                        style={{ width: "75%", marginBottom: 30, marginTop: 30, fontSize: 16, height: 30, flexGrow: 0 }}
                        selectedValue={this.state.timezone}
                        onValueChange={value => this.onTzChanged(value)}
                    >
                        <Picker.Item label={moment.tz.guess()} value={moment.tz.guess()}></Picker.Item>
                        {moment.tz.names().map((item, index) => {
                            return <Picker.Item key={index} label={item} value={item}></Picker.Item>
                        })
                        }                   
                    </Picker>
                    </Container>
                    
                    )
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