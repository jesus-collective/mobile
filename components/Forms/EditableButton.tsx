import React from 'react';
import { Input, Content, Left, Right, Body, StyleProvider, Container, Card, CardItem, Button } from 'native-base';
import { Text } from 'react-native'

interface Props {
  value: string,
  isEditable: boolean,
  textStyle: any,
  inputStyle?: any,
  placeholder?: string,
  onChange?(string),
  onPress(),
  onDelete()
}
interface State {
  value: string,
  isEditable: boolean,
  isEditMode: boolean,
  textStyle: any,
  inputStyle: any,
  placeholder: string
}
export default class MessageBoard extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      value: props.value,
      isEditMode: false,
      isEditable: props.isEditable,
      textStyle: props.textStyle,
      inputStyle: props.inputStyle,
      placeholder: props.placeholder
    }
  }
  onChanged(val: any) {
    if (val.target.value == "")
      this.props.onDelete()
    else {
      this.props.onChange(val.target.value)
      this.setState({ isEditMode: false })
    }
  }

  render() {


    if (this.state.isEditable)
      if (this.state.isEditMode)
        return <Input onSubmitEditing={(value) => { this.onChanged(value) }} onChange={(val) => { this.setState({ value: val.target.value }) }} placeholder={this.state.placeholder} style={this.state.inputStyle} value={this.state.value}></Input>
      else
        return <Button onLongPress={() => { this.setState({ isEditMode: true }) }} transparent onPress={() => { this.props.onPress() }}><Text style={this.state.textStyle}>{this.props.value}</Text></Button>
    else
      return <Button
        transparent
      >
        <Text style={this.state.textStyle}>{this.props.value}</Text>
      </Button>


  }
}