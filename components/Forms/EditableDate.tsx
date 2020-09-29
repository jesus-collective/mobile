import React from 'react';
import { Text } from 'react-native'
import './EditableDateStyle.ts';
import lightBlue from "@material-ui/core/colors/lightBlue";
import { KeyboardDatePicker, KeyboardDateTimePicker } from "@material-ui/pickers";
import { Picker, Container } from 'native-base';
import moment from 'moment-timezone';
import { createMuiTheme } from "@material-ui/core";
import JCComponent from '../JCComponent/JCComponent';
import { ThemeProvider } from '@material-ui/styles';


const materialTheme = createMuiTheme({
    overrides: {
        MuiPickersToolbar: {
            toolbar: {
                backgroundColor: lightBlue.A200,
            },
        },
        MuiPickersCalendarHeader: {
            switchHeader: {
                // backgroundColor: lightBlue.A200,
                // color: "white",
            },
        },
        MuiPickersDay: {
            day: {
                color: lightBlue.A700,
            },
            daySelected: {
                backgroundColor: lightBlue["400"],
            },
            dayDisabled: {
                color: lightBlue["100"],
            },
            current: {
                color: lightBlue["900"],
            },
        },
        MuiPickersModal: {
            dialogAction: {
                color: lightBlue["400"],
            },
        },
    },
});

interface Props {
    value: string,
    isEditable: boolean,
    textStyle: any,
    inputStyle?: any,
    placeholder?: string,
    onChange?(arg1, arg2),
    type: string
    tz: string
}
export default class EditableDate extends JCComponent<Props> {
    constructor(props: Props) {
        super(props);
    }

    onChanged(dateTime: moment.Moment, tz: string): void {
        this.props.onChange(dateTime.tz(this.props.tz).format(), tz)
    }

    onTzChanged(tz: string): void {
        this.onChanged(moment(this.props.value), tz)
    }

    render(): React.ReactNode {

        if (this.props.isEditable) {
            if (this.props.type == 'datetime')
                return (
                    <Container style={{ height: "unset", width: '52%', marginTop: 10 }}>
                        <ThemeProvider theme={materialTheme}>
                            <KeyboardDateTimePicker
                                variant="inline"
                                ampm={true}
                                placeholder={this.props.placeholder}
                                value={(this.props.value == null || this.props.tz == null) ? moment.now() : moment(this.props.value).tz(this.props.tz)}
                                format='MMMM Do YYYY, h:mm a '
                                onChange={(value) => { this.onChanged(value, this.props.tz) }}
                                onError={(e) => { console.log(e) }}
                                disablePast
                                minutesStep={15}
                                emptyLabel="Date not set"

                            />
                            <Picker
                                mode="dropdown"
                                style={{ width: "75%", marginBottom: 15, marginTop: 15, fontSize: 16, height: 30, flexGrow: 0, paddingTop: 3, paddingBottom: 3 }}
                                selectedValue={this.props.tz}
                                placeholder="Timezone"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                onValueChange={value => this.onTzChanged(value)}
                                onStartShouldSetResponder={() => true}
                                onMoveShouldSetResponderCapture={() => true}
                                onStartShouldSetResponderCapture={() => true}
                                onMoveShouldSetResponder={() => true}
                            >
                                {moment.tz.names().map((item, index) => {
                                    return <Picker.Item key={index} label={item} value={item}></Picker.Item>
                                })}
                            </Picker>
                        </ThemeProvider>
                    </Container >

                )
            else
                return (
                    <Container style={{ height: "unset", width: '30%' }}>
                        <ThemeProvider theme={materialTheme}>
                            <KeyboardDatePicker

                                format='MMMM Do YYYY'
                                placeholder={this.props.placeholder}
                                value={(this.props.value == null || this.props.tz == null) ? moment.now() : moment(this.props.value).tz(this.props.tz)}
                                onChange={(value) => { this.onChanged(value, this.props.tz) }}
                                onError={console.log}
                                disablePast
                                emptyLabel="Date not set"
                            />
                            <Picker
                                mode="dropdown"
                                style={{ width: "75%", marginBottom: 15, marginTop: 15, fontSize: 16, height: 30, flexGrow: 0, paddingTop: 3, paddingBottom: 3 }}
                                selectedValue={this.props.tz}
                                placeholder="Timezone"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                // style={{ width: "75%", marginBottom: 30, marginTop: 30, fontSize: 16, height: 30, flexGrow: 0 }}
                                onValueChange={value => this.onTzChanged(value)}
                                onStartShouldSetResponder={() => true}
                                onMoveShouldSetResponderCapture={() => true}
                                onStartShouldSetResponderCapture={() => true}
                                onMoveShouldSetResponder={() => true}
                            >
                                {moment.tz.names().map((item, index) => {
                                    return <Picker.Item key={index} label={item} value={item}></Picker.Item>
                                })}
                            </Picker>
                        </ThemeProvider>
                    </Container>
                )
        }
        else
            if (this.props.type == 'datetime')
                return (
                    <Text style={{ fontSize: 16, lineHeight: 26, fontFamily: 'Graphik-Regular-App', width: '90%', marginBottom: 20, marginTop: 20 }}>
                        {moment.tz(this.props.value, this.props.tz).format('dddd, MMMM D, YYYY @ h:mm a')}
                    &nbsp;
                        {moment.tz.zone(this.props.tz).abbr(+moment(this.props.value).format('x'))}
                    </Text >
                )
            else
                return (
                    <Text style={{ fontSize: 16, lineHeight: 26, fontFamily: 'Graphik-Regular-App', width: '90%', marginBottom: 20, marginTop: 20 }}>
                        {moment.tz(this.props.value, this.props.tz).format('dddd, MMMM D')}
                    &nbsp;
                        {moment.tz.zone(this.props.tz).abbr(+moment(this.props.value).format('x'))}
                    </Text >
                )
    }
}