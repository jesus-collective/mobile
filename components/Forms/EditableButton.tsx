import { Input } from "native-base"
import React from "react"
import { Pressable, Text } from "react-native"
import JCComponent, { JCState } from "../JCComponent/JCComponent"

interface Props {
  value: string
  isEditable: boolean
  textStyle: any
  inputStyle?: any
  placeholder?: string
  onChange?(arg0: string): void
  onPress(): void
  onDelete(): void
  testID?: string
}
interface State extends JCState {
  value: string
  isEditable: boolean
  isEditMode: boolean
  textStyle: any
  inputStyle: any
  placeholder?: string
}
export default class EditableButton extends JCComponent<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      ...super.getInitialState(),
      value: props.value,
      isEditMode: false,
      isEditable: props.isEditable,
      //      textStyle: props.textStyle,
      //      inputStyle: props.inputStyle,
      placeholder: props.placeholder,
    }
  }
  onChanged(val: any): void {
    if (val.target.value == "") {
      this.setState({ isEditMode: false })
      this.props.onDelete()
    } else {
      if (this.props.onChange) {
        this.props.onChange(val.target.value)
        this.setState({ isEditMode: false })
      }
    }
  }

  render(): React.ReactNode {
    if (this.state.isEditable)
      if (this.state.isEditMode)
        return (
          <Input
            testID={this.props.testID + "-editor"}
            onBlur={(value: any) => {
              this.onChanged(value)
            }}
            onSubmitEditing={(value: any) => {
              this.onChanged(value)
            }}
            onChange={(val: any) => {
              this.setState({ value: val.target.value })
            }}
            placeholder={this.state.placeholder}
            style={this.props.inputStyle}
            value={this.state.value}
          ></Input>
        )
      else
        return (
          <Pressable
            testID={this.props.testID + "-button"}
            onLongPress={() => {
              this.setState({ isEditMode: true })
            }}
            onPress={() => {
              this.props.onPress()
            }}
          >
            <Text style={this.props.textStyle}>{this.props.value}</Text>
          </Pressable>
        )
    else
      return (
        <Pressable
          onPress={() => {
            this.props.onPress()
          }}
        >
          <Text style={this.props.textStyle}>{this.props.value}</Text>
        </Pressable>
      )
  }
}
