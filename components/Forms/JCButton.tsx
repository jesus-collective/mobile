import React from 'react';
import { Button } from 'native-base';
import { Text } from 'react-native'
import styles from './JCButtonStyle'
import JCComponent from '../JCComponent/JCComponent';

export enum ButtonTypes {
    Solid,
    SolidProfileDelete,
    SolidProfile,
    SolidAboutMe,
    SolidMap,
    SolidResources,
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
    TransparentBoldOrange,
    TransparentRegularOrange,
    MoreSeriesOutlineBold
}
export interface Props {
    onPress(): any
    children: any
    buttonType: ButtonTypes
    "data-testid"?: any
}
class JCButton extends JCComponent<Props> {
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