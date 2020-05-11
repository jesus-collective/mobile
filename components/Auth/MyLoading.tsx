import React from 'react';
import { Loading } from 'aws-amplify-react-native';
import styles from '../../components/style.js'
import SignUpSidebar from '../../components/SignUpSidebar/SignUpSidebar'
import { View } from 'native-base';
import { Text } from 'react-native'

import { Platform } from 'react-native';
import { Dimensions } from 'react-native'

interface Props {
    authState: any
}
interface State { }
export default class MyLoading extends Loading<Props, State> {
    constructor(props: Props) {
        super(props);
        this.props = props
    }
    props: any
    render() {
        //   console.log(this.props.authState)
        return (

            this.props.authState === 'loading' ?
                (<View style={{ width: "100%", left: 0, top: 0, height: "100%" }}>
                    <View style={styles.authView}>

                    </View>

                </View>)
                : null


        );
    }
}
