import React from 'react';
import { ConfirmSignIn } from 'aws-amplify-react-native';
import SignUpSidebar from '../../components/SignUpSidebar/SignUpSidebar'
import { View } from 'native-base';
import { Platform } from 'react-native';
import { Dimensions } from 'react-native'

interface Props {
    authState: any
}
class MyConfirmSignIn extends ConfirmSignIn<Props> {
    constructor(props: Props) {
        super(props);
    }
    render() {
        //        console.log(this.props.authState)
        return (

            this.props.authState === 'confirmSignIn' ?
                (<View style={{ width: "100%", left: 0, top: 0, height: "100%" }}>
                    <View style={this.styles.style.authView}>
                        {super.render()}
                    </View>
                    {Platform.OS === 'web' && Dimensions.get('window').width > 720 ?
                        <SignUpSidebar text="It’s time to unite, equip, and amplify a Jesus-centred movement." />
                        : null
                    }
                </View>)
                : null


        );
    }
}
export default MyConfirmSignIn as React.ComponentType<any>