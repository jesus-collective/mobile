import React from 'react';
import { Text } from 'react-native'
import './EditableDateStyle.ts';
import { KeyboardDatePicker, KeyboardDateTimePicker } from "@material-ui/pickers";
import { Picker, Container } from 'native-base';
import moment from 'moment-timezone';
import JCComponent from '../JCComponent/JCComponent';

interface Props {
    value: string,
    isEditable: boolean,
    textStyle: any,
    inputStyle?: any,
    multiline: boolean,
    placeholder?: string,
    onChange?(arg1, arg2),
    type: string
    tz: string
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
            timezone: props.tz

        }
    }
    onChanged(dateTime: any, tz: string): void {
        this.props.onChange(dateTime.tz(this.state.timezone).format(), tz)
    }

    onTzChanged(tz: string) {
        this.setState({ timezone: tz }, () => this.onChanged(moment(this.props.value), tz))
    }

    render(): React.ReactNode {


        if (this.state.isEditable) {
            if (this.props.type == 'datetime')
                return (
                    <Container style={{maxHeight: 100}}>
                        <KeyboardDateTimePicker
                            variant="inline"
                            ampm={true}
                            placeholder={this.state.placeholder}
                            value={moment(this.props.value).tz(this.state.timezone)}
                            format='MMMM Do YYYY, h:mm a '
                            onChange={(value) => { this.onChanged(value, this.state.timezone) }}
                            onError={console.log}
                            disablePast
                            minutesStep={15}
                            emptyLabel="Date not set"
                        />
                        <Picker
                            mode="dropdown"
                            style={{ width: "75%", marginBottom: 30, marginTop: 30, fontSize: 16, height: 30, flexGrow: 0 }}
                            selectedValue={this.state.timezone}
                            onValueChange={value => this.onTzChanged(value)}
                        >
                            {moment.tz.names().map((item, index) => {
                                return <Picker.Item key={index} label={item} value={item}></Picker.Item>
                            })}                   
                        </Picker>
                    </Container>
                    
                    )
            else
                return (
                    <Container style={{maxHeight: 100}}>
                        <KeyboardDatePicker
                            variant="inline"
                            format='MMMM Do YYYY, h:mm a'
                            placeholder={this.state.placeholder}
                            value={moment(this.props.value).tz(this.state.timezone)}
                            onChange={(value) => { this.onChanged(value, this.state.timezone) }}
                            //onError={console.log}
                            disablePast
                            emptyLabel="Date not set"
                        />
                        <Picker
                            mode="dropdown"
                            style={{ width: "75%", marginBottom: 30, marginTop: 30, fontSize: 16, height: 30, flexGrow: 0 }}
                            selectedValue={this.state.timezone}
                            onValueChange={value => this.onTzChanged(value)}
                        >
                            {moment.tz.names().map((item, index) => {
                                return <Picker.Item key={index} label={item} value={item}></Picker.Item>
                            })}                   
                        </Picker>
                    </Container>
                    )
        }
        else
            return <Text style={this.state.textStyle}> 
                {moment.tz(this.props.value, this.state.timezone).format('dddd, MMMM D, YYYY @ h:mm a')} 
                &nbsp;
                {moment.tz.zone(this.state.timezone).abbr(+moment(this.props.value).format('x'))}
            </Text >
    }
}