import React from 'react';
import { SignIn } from 'aws-amplify-react-native';
import styles from '../../components/style'
import SignUpSidebar from '../../components/SignUpSidebar/SignUpSidebar'
import { View } from 'native-base';
import { Platform } from 'react-native';
import { Dimensions } from 'react-native'
interface Props {
    authState: any
}
interface State { }
class MySignIn extends SignIn<Props, State> {
    constructor(props: Props) {
        super(props);
    }
    render() {
        //    console.log(this.props.authState)
        return (

            this.props.authState === 'signIn' || this.props.authState === "signedOut" || this.props.authState === "signedUp" ?
                (<View style={{ width: "100%", left: 0, top: 0, height: "100%" }}>
                    <View style={styles.authView}>
                        {super.render()}
                    </View>
                    {Platform.OS === 'web' && Dimensions.get('window').width > 720 ?
                        <SignUpSidebar text="It’s time to unite, equip, and amplify a Jesus-centred movement." />

                        : null}
                </View>)
                : null


        );
    }
}
export default MySignIn as React.ComponentType<any>