import React from 'react';

import { Button } from 'native-base';
import { Text } from 'react-native'
import styles from './JCButtonStyle'
export enum ButtonTypes {
    Solid,
    Outline,
    OutlineBold,
    OutlineSmall,
    PostOutline,
    Transparent,
    TransparentBoldBlack,
    TransparentBoldOrange
}
export interface Props {
    onPress()
    children: any
    buttonType: ButtonTypes
}
interface State {
}
class EditableUrl extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

    }
    onPress() {
        this.props.onPress()
    }
    render() {
        return <Button style={styles[ButtonTypes[this.props.buttonType]+"Button"]} onPress={() => { this.onPress() }}>
            <Text style={styles[ButtonTypes[this.props.buttonType]+"Text"]}>{this.props.children}</Text>
        </Button>
    }
}

export default EditableUrl