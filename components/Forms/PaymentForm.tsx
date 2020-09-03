import React, { useState, useEffect } from 'react';
import { Card, View, Text } from 'native-base';
import PayPal from './PayPal';
import { ViewStyle, StyleSheet } from 'react-native';

interface Params {
    productId: string
    containerStyle?: ViewStyle
    payPalWrapperStyle?: ViewStyle
}

export default function PaymentForm({ productId, containerStyle, payPalWrapperStyle }: Params): JSX.Element {

    const styles = StyleSheet.create({
        productName: {
            fontFamily: 'Graphik-Bold-App',
            fontSize: 24,
            color: '#333333'
        },
        productPrice: {
            fontFamily: 'Graphik-Regular-App',
            fontSize: 20,
            lineHeight: 25,
            color: '#333333'
        },
        totalPrice: {
            fontFamily: 'Graphik-Regular-App',
            fontSize: 24,
            lineHeight: 40,
            color: '#333333'
        }
    })

    const [product, setProduct] = useState({});

    useEffect(() => {
        //fetch product

    }, [])

    const testHTML = `<ul>
    <li>Learn how to use the Force like Luke Skywalker</li>
    <li>Jedi mind tricks</li>
    <li>Instructed by Grand Master Yoda</li>
    <li>More info, etc, etc</li>
    </ul>`

    return <View style={containerStyle} >
        <Card style={{ borderRadius: 4, padding: 35, borderColor: 'rgba(51,51,51,0.1)', borderWidth: 1, shadowOffset: { width: 0, height: 5 }, shadowRadius: 30, shadowColor: 'rgba(0,0,0,0.05)' }}>
            <View style={{ display: 'flex', flexDirection: 'row' }} >
                <View style={{ flex: 7 }} >
                    <Text style={styles.productName}>Becoming a Jedi Knight</Text>
                </View>
                <View style={{ flex: 3, marginLeft: 20 }}>
                    <Text style={styles.productPrice}>$500.00</Text>
                </View>
            </View>
            <View style={{ marginTop: 22, width: '75%' }} >
                <div dangerouslySetInnerHTML={{ __html: testHTML }} style={{
                    fontFamily: 'Graphik-Regular-App',
                    fontSize: 18,
                    color: '#333333',
                    opacity: 0.7
                }} />
            </View>
        </Card>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 25, marginBottom: 34 }} >
            <Text style={[styles.totalPrice, { marginLeft: 24 }]} >Total</Text>
            <Text style={styles.totalPrice} >$500.00</Text>
        </View>
        <View style={payPalWrapperStyle} >
            <PayPal cost={999.00} onSuccessCallback={() => null} onFailureCallback={() => null} />
        </View>
    </View>
}
