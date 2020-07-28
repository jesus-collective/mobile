import React from 'react';
import { View, Text, } from 'react-native';


export function Copyright(): JSX.Element {
    return (
        <View style={{ justifyContent: 'flex-end', alignSelf: 'center' }}>
            <Text style={{ fontFamily: 'Graphik-Regular-App', fontSize: 14, color: '#333333', opacity: 0.7 }}>Copyright &copy; {new Date().getFullYear()} Jesus Collective. All rights reserved.</Text>
        </View>
    )
}