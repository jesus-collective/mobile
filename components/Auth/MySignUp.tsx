import React from 'react';
import { SignUp } from 'aws-amplify-react-native';

import SignUpSidebar from '../../components/SignUpSidebar/SignUpSidebar'
import { View } from 'native-base';
import { Platform } from 'react-native';
import { Dimensions } from 'react-native'
import MainStyles from '../../components/style';

interface Props {
    authState: any
}
class MySignUp extends SignUp<Props> {
    constructor(props) {
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
        //    console.log(this.props.authState)
        return (

            this.props.authState === 'signUp' ?
                (<View style={{ width: "100%", left: 0, top: 0, height: "100%" }}>
                    <View style={this.styles.style.authView}>
                        {super.render()}
                    </View>
                    {Platform.OS === 'web' && Dimensions.get('window').width > 720 ? <SignUpSidebar position="1" /> : null}
                </View>)
                : null


        );
    }
}
export default MySignUp 