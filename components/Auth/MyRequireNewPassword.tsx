import React from 'react';
import { RequireNewPassword } from 'aws-amplify-react-native';

import SignUpSidebar from '../../components/SignUpSidebar/SignUpSidebar'
import { View } from 'native-base';
import { Platform } from 'react-native';
import { Dimensions } from 'react-native'
import MainStyles from '../../components/style';

interface Props {
    authState: any
}
class MyRequireNewPassword extends RequireNewPassword<Props> {
    constructor(props: Props) {
        super(props);
    }

    styles = MainStyles.getInstance();
    componentDidMount(): void {
        Dimensions.addEventListener('change', this.styles.updateStyles(this))
    }
    componentWillUnmount(): void {
        Dimensions.removeEventListener("change", this.styles.updateStyles(this));
    }
    render() {
        //  console.log(this.props.authState)
        return (

            this.props.authState === 'requireNewPassword' ?
                (<View style={{ width: "100%", left: 0, top: 0, height: "100%" }}>
                    <View style={this.styles.style.authView}>
                        {super.render()}
                    </View>
                    {Platform.OS === 'web' && Dimensions.get('window').width > 720 ? <SignUpSidebar text="It’s time to unite, equip, and amplify a Jesus-centred movement." /> : null}
                </View>)
                : null


        );
    }
}
export default MyRequireNewPassword 