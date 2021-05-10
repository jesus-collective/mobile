import { createMuiTheme } from "@material-ui/core"
import lightBlue from "@material-ui/core/colors/lightBlue"
import { KeyboardDatePicker, KeyboardDateTimePicker } from "@material-ui/pickers"
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date"
import { ThemeProvider } from "@material-ui/styles"
import moment from "moment-timezone"
import { Container, Picker } from "native-base"
import React from "react"
import { Text } from "react-native"
import JCComponent from "../JCComponent/JCComponent"
import "./EditableDateStyle.ts"

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
})

interface Props {
  testID?: string
  value: string
  isEditable: boolean
  textStyle: any
  inputStyle?: any
  placeholder?: string
  onChange?(time: string, timezone: string): void
  type: string
  tz: string
}
interface State {
  inputValue: string
}
export default class EditableDate extends JCComponent<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      inputValue: "",
    }
  }
  onChanged(dateTime: MaterialUiPickersDate, tz: string): void {
    if (dateTime?.isValid()) {
      console.log("isValid")
      if (this.props.onChange) this.props.onChange(dateTime?.tz(this.props.tz).format() ?? "", tz)
    }
  }

  onTzChanged(tz: string): void {
    this.onChanged(moment(this.props.value), tz)
  }
  render(): React.ReactNode {
    if (this.props.isEditable) {
      if (this.props.type == "datetime")
        return (
          <Container style={{ height: "unset", width: "55%", marginTop: 22 }}>
            <ThemeProvider theme={materialTheme}>
              <KeyboardDateTimePicker
                data-testid={this.props.testID + "-datetime"}
                format="YYYY-MM-DD, hh:mm A"
                variant="inline"
                ampm={true}
                placeholder={this.props.placeholder}
                value={this.props.value == "" ? null : this.props.value}
                inputValue={this.state.inputValue ?? ""}
                onChange={(date, value) => {
                  this.setState({ inputValue: value ?? null })
                  this.onChanged(date, this.props.tz)
                }}
                onError={(e) => {
                  console.log({ Error: e })
                }}
                disablePast
                minutesStep={15}
              />
              <Picker
                mode="dropdown"
                style={{
                  width: "100%",
                  marginBottom: 15,
                  marginTop: 15,
                  fontSize: 16,
                  height: 30,
                  flexGrow: 0,
                  paddingTop: 3,
                  paddingBottom: 3,
                }}
                testID={this.props.testID + "-tz"}
                selectedValue={this.props.tz}
                placeholder="Timezone"
                //placeholderStyle={{ color: "#bfc6ea" }}
                //placeholderIconColor="#007aff"
                onValueChange={(value) => this.onTzChanged(value)}
              >
                {moment.tz.names().map((item, index) => {
                  return <Picker.Item key={index} label={item} value={item}></Picker.Item>
                })}
              </Picker>
            </ThemeProvider>
          </Container>
        )
      else
        return (
          <Container style={{ height: "unset", width: "70%" }}>
            <ThemeProvider theme={materialTheme}>
              <KeyboardDatePicker
                data-testid={this.props.testID + "-date"}
                format="YYYY-MM-DD"
                placeholder={this.props.placeholder}
                value={this.props.value == "" ? null : this.props.value}
                inputValue={this.state.inputValue ?? ""}
                onChange={(date, value) => {
                  this.setState({ inputValue: value ?? null })
                  this.onChanged(date, this.props.tz)
                }}
                disablePast
              />
              <Picker
                mode="dropdown"
                style={this.styles.style.pickerDropDown}
                selectedValue={this.props.tz}
                placeholder="Timezone"
                testID={this.props.testID + "-tz"}
                //placeholderStyle={{ color: "#bfc6ea" }}
                //placeholderIconColor="#007aff"
                // style={{ width: "75%", marginBottom: 30, marginTop: 30, fontSize: 16, height: 30, flexGrow: 0 }}
                onValueChange={(value) => {
                  this.onTzChanged(value)
                }}
              >
                {moment.tz.names().map((item, index) => {
                  return <Picker.Item key={index} label={item} value={item}></Picker.Item>
                })}
              </Picker>
            </ThemeProvider>
          </Container>
        )
    } else if (this.props.type == "datetime")
      return (
        <Text
          style={{
            fontSize: 16,
            lineHeight: 26,
            fontFamily: "Graphik-Regular-App",
            width: "90%",
            marginBottom: 20,
            marginTop: 0,
          }}
        >
          {moment.tz(this.props.value, this.props.tz).format("dddd, MMMM D, YYYY @ h:mm a")}
          &nbsp;
          {moment.tz.zone(this.props.tz)?.abbr(+moment(this.props.value).format("x"))}
        </Text>
      )
    else
      return (
        <Text
          style={{
            fontSize: 16,
            lineHeight: 26,
            fontFamily: "Graphik-Regular-App",
            width: "90%",
            marginBottom: 20,
            marginTop: 0,
          }}
        >
          {moment.tz(this.props.value, this.props.tz).format("dddd, MMMM D")}
          &nbsp;
          {moment.tz.zone(this.props.tz)?.abbr(+moment(this.props.value).format("x"))}
        </Text>
      )
  }
}
