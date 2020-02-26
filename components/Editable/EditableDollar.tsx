import React from 'react';
import { Content, Left, Right, Body, StyleProvider, Container, Card, CardItem, Button, Text } from 'native-base';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
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
            return (<FormControl fullWidth>
            <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
            <Input
             
              value={this.props.value}
              onChange={(value)=>{this.onChanged(value)}}
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
            />
          </FormControl>)
            
        else
            return <Text style={this.state.textStyle}>${this.props.value}</Text>
    }
}