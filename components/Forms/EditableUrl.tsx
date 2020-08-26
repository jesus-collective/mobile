import React from 'react';
import { Text, TextInput } from 'react-native'
import { Button } from 'native-base';
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
class EditableUrlImpl extends JCComponent<Props> {

    onChanged(val: any) {
        this.props.onChange(val.target.value)
    }
    navigate(id) {

        window.location.href = id


    }
    render() {


        if (this.props.isEditable)
            return (
                <TextInput
                    onChange={(value) => { this.onChanged(value) }}
                    placeholder={this.props.placeholder}
                    multiline={this.props.multiline}
                    onStartShouldSetResponder={() => true}
                    onMoveShouldSetResponderCapture={() => true}
                    onStartShouldSetResponderCapture={() => true}
                    onMoveShouldSetResponder={() => true}
                    style={this.props.inputStyle} value={this.props.value}>

                </TextInput>
            )
        else
            return (
                this.props.value && this.props.value != "" ? <Button
                    style={{ paddingTop: 6, paddingBottom: 6, paddingLeft: 29, paddingRight: 29, marginBottom: 20, marginLeft: 0, marginRight: 0, backgroundColor: "#F0493E", borderWidth: 1, borderColor: "#F0493E", borderRadius: 4 }}
                    onPress={() => { this.navigate(this.props.value) }}>
                    <Text style={this.props.textStyle}>{this.props.title}
                    </Text>
                </Button >
                    : null
            )
    }
}

export default function EditableUrl(props: Props): JSX.Element {
    const route = useRoute();
    const navigation = useNavigation()
    return <EditableUrlImpl {...props} navigation={navigation} route={route} />;
}


