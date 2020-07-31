import React from 'react';
import { Button } from 'native-base';
import { Text } from 'react-native'
import styles from './JCButtonStyle'
import JCComponent from '../JCComponent/JCComponent';

export enum ButtonTypes {
    CourseSideBar,
    CourseSideBarFirst,
    CourseHome,
    Solid,
    SolidSignIn,
    SolidSignIn2,
    DisabledSignIn,
    SolidCreateAccount,
    SolidProfileDelete,
    SolidProfile,
    SolidProfileName,
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
    TransparentBoldBlackNoMargin,
    TransparentBoldGreyNoMargin,
    TransparentBoldOrange,
    TransparentRegularOrange,
    MoreSeriesOutlineBold,
    EditButton,
}
export interface Props {
    enabled?: boolean
    onPress(): any
    children: any
    buttonType: ButtonTypes
    "data-testid"?: any
}
class JCButton extends JCComponent<Props> {
    static defaultProps = {
        enabled: true
    }
    constructor(props: Props) {
        super(props);

    }
    onPress(): void {
        this.props.onPress()
    }
    render(): React.ReactNode {
        return (
            <Button disabled={!this.props.enabled}
                data-testid={this.props["data-testid"]}
                style={[styles[ButtonTypes[this.props.buttonType] + "Button"], !this.props.enabled ? styles[ButtonTypes[this.props.buttonType] + "ButtonDisabled"] : '']}
                onPress={() => { this.onPress() }}>
                <Text style={styles[ButtonTypes[this.props.buttonType] + "Text"]}>{this.props.children}</Text>
            </Button>
        )
    }
}

export default JCButton