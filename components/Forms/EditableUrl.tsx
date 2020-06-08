import React from 'react';

import { Input, Button } from 'native-base';
import { Text } from 'react-native'
import JCComponent from '../JCComponent/JCComponent';
import { useRoute, useNavigation } from '@react-navigation/native';

interface Props {
    value: string,
    title: string,
    isEditable: boolean,
    textStyle: any,
    inputStyle?: any,
    multiline: boolean,
    placeholder?: string,
    onChange?(string),
    navigation?: any
    route?: any
}
interface State {
    // value: string,
    isEditable: boolean,
    textStyle: any,
    inputStyle: any,
    multiline: boolean,
    placeholder: string
}
class EditableUrlImpl extends JCComponent<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            // value: props.value,
            isEditable: props.isEditable,
            textStyle: props.textStyle,
            inputStyle: props.inputStyle,
            multiline: props.multiline,
            placeholder: props.placeholder
        }
        // console.log(props)
    }
    onChanged(val: any) {
        this.props.onChange(val.target.value)
    }
    navigate(id) {

        window.location.href = id


    }
    render() {


        if (this.state.isEditable)
            return <Input onChange={(value) => { this.onChanged(value) }} placeholder={this.state.placeholder} multiline={this.state.multiline} style={this.state.inputStyle} value={this.props.value}></Input>
        else
            return <Button style={{ paddingTop: 6, paddingBottom: 6, paddingLeft: 29, paddingRight: 29, marginBottom: 20, marginLeft: 0, marginRight: 0, backgroundColor: "#F0493E", borderWidth: 1, borderColor: "#F0493E", borderRadius: 4 }} onPress={() => { this.navigate(this.props.value) }}><Text style={this.state.textStyle}>{this.props.title}</Text></Button>
    }
}

export default function EditableUrl(props: Props): JSX.Element {
    const route = useRoute();
    const navigation = useNavigation()
    return <EditableUrlImpl {...props} navigation={navigation} route={route} />;
}


