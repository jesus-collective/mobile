import React from 'react';
import { Button } from 'native-base';
import { Text } from 'react-native'
import styles from './JCButtonStyle'
export enum ButtonTypes {
    Solid,
    SolidProfile,
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
    onPress(): any
    children: any
    buttonType: ButtonTypes
    "data-testid"?: any
}
class JCButton extends React.Component<Props> {
    constructor(props: Props) {
        super(props);

    }
    onPress(): void {
        this.props.onPress()
    }
    render(): React.ReactNode {
        return <Button data-testid={this.props["data-testid"]} style={styles[ButtonTypes[this.props.buttonType] + "Button"]} onPress={() => { this.onPress() }}>
            <Text style={styles[ButtonTypes[this.props.buttonType] + "Text"]}>{this.props.children}</Text>
        </Button>
    }
}

export default JCButton