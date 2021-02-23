import FormControl from "@material-ui/core/FormControl"
import Input from "@material-ui/core/Input"
import InputAdornment from "@material-ui/core/InputAdornment"
import InputLabel from "@material-ui/core/InputLabel"
import React from "react"
import { Text } from "react-native"
import JCComponent, { JCState } from "../JCComponent/JCComponent"

interface Props {
  value: string
  isEditable: boolean
  textStyle: any
  inputStyle?: any
  multiline: boolean
  placeholder?: string
  testID?: string
  onChange?(value: string): void
}
interface State extends JCState {
  // value: string,
  isEditable: boolean
  textStyle: any
  inputStyle: any
  multiline: boolean
  placeholder: string
}
export default class EditableDollar extends JCComponent<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      ...super.getInitialState(),
      isEditable: props.isEditable,
      textStyle: props.textStyle,
      inputStyle: props.inputStyle,
      multiline: props.multiline,
      placeholder: props.placeholder ?? "",
    }
  }

  onChanged(val: any): void {
    if (this.props.onChange) this.props.onChange(val.target.value)
  }

  render(): React.ReactNode {
    if (this.state.isEditable)
      return (
        <FormControl fullWidth>
          <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
          <Input
            data-testid={this.props.testID}
            style={{ width: "70%" }}
            value={this.props.value}
            onChange={(value) => {
              this.onChanged(value)
            }}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
        </FormControl>
      )
    else return <Text style={this.state.textStyle}>${this.props.value}</Text>
  }
}
