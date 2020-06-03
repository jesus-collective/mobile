import React from 'react';
import { Loading } from 'aws-amplify-react-native';
import styles from '../../components/style'
import { View } from 'native-base';


interface Props {
    authState: string
}

export default class MyLoading extends Loading<Props> {
    constructor(props: Props) {
        super(props);
        this.props = props
    }
    props: Props
    render(): React.ReactNode {
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
