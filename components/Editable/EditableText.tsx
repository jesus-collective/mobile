import React from 'react';
import { Input, Content, Left, Right, Body, StyleProvider, Container, Card, CardItem, Button, Text } from 'native-base';
interface Props {
    value: string,
    isEditable: boolean,
    textStyle: any,
    inputStyle?: any,
    multiline:boolean,
    placeholder?:string,
    onChange?(string)
}
interface State {
   // value: string,
    isEditable: boolean,
    textStyle: any,
    inputStyle: any,
    multiline:boolean,
    placeholder:string
}
export default class MessageBoard extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
           // value: props.value,
            isEditable: props.isEditable,
            textStyle: props.textStyle,
            inputStyle: props.inputStyle,
            multiline:props.multiline,
            placeholder:props.placeholder
        }
        console.log(props)
    }
    onChanged(val:any){
        this.props.onChange(val.target.value)
    }
   
    render() {
        
        
        if (this.state.isEditable)
            return <Input onChange={(value)=>{this.onChanged(value)}} placeholder={this.state.placeholder} multiline={this.state.multiline} style={this.state.inputStyle} value={this.props.value}></Input>
        else
            return <Text style={this.state.textStyle}>{this.props.value}</Text>
    }
}