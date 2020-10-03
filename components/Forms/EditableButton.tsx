import React from 'react';
import { Input, Button } from 'native-base';
import { Text } from 'react-native'
import JCComponent, { JCState } from '../JCComponent/JCComponent';

interface Props {
  value: string,
  isEditable: boolean,
  textStyle: any,
  inputStyle?: any,
  placeholder?: string,
  onChange?(arg0: string): void,
  onPress(): void,
  onDelete(): void
}
interface State extends JCState {
  value: string,
  isEditable: boolean,
  isEditMode: boolean,
  textStyle: any,
  inputStyle: any,
  placeholder?: string
}
export default class EditableButton extends JCComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      ... super.getInitialState(),
      value: props.value,
      isEditMode: false,
      isEditable: props.isEditable,
      //      textStyle: props.textStyle,
      //      inputStyle: props.inputStyle,
      placeholder: props.placeholder
    }
  }
  onChanged(val: any): void {
    if (val.target.value == "") {
      this.setState({ isEditMode: false })
      this.props.onDelete()
    }
    else {
      if (this.props.onChange) {
        this.props.onChange(val.target.value)
        this.setState({ isEditMode: false })
      }
    }
  }

  render(): React.ReactNode {


    if (this.state.isEditable)
      if (this.state.isEditMode)
        return <Input
          onBlur={(value: any) => { this.onChanged(value) }}
          onSubmitEditing={(value: any) => { this.onChanged(value) }}
          onChange={(val: any) => { this.setState({ value: val.target.value }) }}
          placeholder={this.state.placeholder} style={this.props.inputStyle} value={this.state.value} ></Input >
      else
        return <Button onLongPress={() => { this.setState({ isEditMode: true }) }} transparent onPress={() => { this.props.onPress() }}><Text style={this.props.textStyle}>{this.props.value}</Text></Button>
    else
      return <Button transparent onPress={() => { this.props.onPress() }}><Text style={this.props.textStyle}>{this.props.value}</Text></Button>


  }
}