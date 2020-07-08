import React from 'react';
import { Input } from 'native-base';
import { Text, TextInput } from 'react-native'
import JCComponent, { JCState } from '../JCComponent/JCComponent';

interface Props {
    value: string,
    isEditable: boolean,
    textStyle: any,
    inputStyle?: any,
    multiline: boolean,
    placeholder?: string,
    placeholderTextColor?: string,
    onChange?(string),
    "data-testid"?: any,
    ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip',
    numberOfLines?: number
}
interface State extends JCState {
    // value: string,
    isEditable: boolean,
    // textStyle: any,
    //   inputStyle: any,
    //   multiline: boolean,
    //   placeholder: string,
    value: string
}
export default class EditableText extends JCComponent<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            ... super.getInitialState(),
            value: props.value,
            isEditable: props.isEditable,
        }

    }

    componentDidUpdate(prevProps: Props): void {
        if (this.props.isEditable !== prevProps.isEditable) {
            this.setState({isEditable: this.props.isEditable})
        }
    }

    onChanged(val: any): void {
        console.log(val)
        this.props.onChange(val)
    }
    render(): React.ReactNode {


        if (this.state.isEditable)
            return <TextInput data-testid={this.props["data-testid"]}

                onBlur={(val: any) => { this.onChanged(val.target.value) }}
                onSubmitEditing={(val: any) => { this.onChanged(val.target.value) }}
                onChange={(val: any) => { this.setState({ value: val.target.value }) }}



                //onChange={(value) => { this.onChanged(value) }}
                placeholder={this.props.placeholder}
                placeholderTextColor={this.props.placeholderTextColor}
                multiline={this.props.multiline}
                style={this.props.inputStyle} value={this.state.value}></TextInput>
        else
            return <Text ellipsizeMode={this.props.ellipsizeMode} numberOfLines={this.props.numberOfLines} style={this.props.textStyle}>{this.props.value}</Text>
    }
}