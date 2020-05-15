import React from 'react';

import { Button } from 'native-base';
import { Text } from 'react-native'
import styles from './JCButtonStyle'
export enum ButtonTypes {
    Solid,
    SolidMap,
    SolidRightMargin,
    SolidRightJustified,
    Outline,
    OutlineBold,
    OutlineBoldNoMargin,
    OutlineSmall,
    PostOutline,
    Transparent,
    TransparentNoPadding,
    TransparentBoldBlack,
    TransparentBoldOrange

}
export interface Props {
    onPress()
    children: any
    buttonType: ButtonTypes
    "data-testid"?: any
}
interface State {
}
class JCButton extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

    }
    onPress() {
        this.props.onPress()
    }
    render() {
        return <Button data-testId={this.props["data-testid"]} style={styles[ButtonTypes[this.props.buttonType] + "Button"]} onPress={() => { this.onPress() }}>
            <Text style={styles[ButtonTypes[this.props.buttonType] + "Text"]}>{this.props.children}</Text>
        </Button>
    }
}

export default JCButton