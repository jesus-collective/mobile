import React from 'react';
import { Card, View, Text } from 'native-base';
import PayPal from './Paypal/PayPal';
import { ViewStyle, StyleSheet } from 'react-native';
import { GetProductQuery } from '../../src/API';
import { stateToHTML } from 'draft-js-export-html';
//import { convertFromRaw } from 'draft-js';


interface Params {
    product: NonNullable<GetProductQuery>['getProduct'];
    containerStyle?: ViewStyle;
    payPalWrapperStyle?: ViewStyle;
    onSuccessCallback(details: any): void;
    onFailureCallback(details: any): void;
    onErrorCallback?(err: any): void;
}
 
export default function PaymentForm({ product, containerStyle, payPalWrapperStyle, onSuccessCallback, onFailureCallback, onErrorCallback }: Params): JSX.Element {

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

    const convertCommentFromJSONToHTML = (text: string): string => {
        try {
            return ""//stateToHTML(convertFromRaw(JSON.parse(text)))
        } catch (e) {
            console.log({ Error: e })
            return "<div>Message Can't Be Displayed</div>"
        }
    }

    const description = convertCommentFromJSONToHTML(product.description);

    return <View style={containerStyle} >
        <Card style={{ borderRadius: 4, padding: 35, borderColor: 'rgba(51,51,51,0.1)', borderWidth: 1, shadowOffset: { width: 0, height: 5 }, shadowRadius: 30, shadowColor: 'rgba(0,0,0,0.05)' }}>
            <View style={{ display: 'flex', flexDirection: 'row' }} >
                <View style={{ flex: 7 }} >
                    <Text style={styles.productName}>{product.name}</Text>
                </View>
                <View style={{ flex: 3, marginLeft: 20 }}>
                    <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
                </View>
            </View>
            <View style={{ marginTop: 22, width: '75%' }} >
                <div dangerouslySetInnerHTML={{ __html: description }} style={{
                    fontFamily: 'Graphik-Regular-App',
                    fontSize: 18,
                    color: '#333333',
                    opacity: 0.7
                }} />
            </View>
        </Card>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 25, marginBottom: 34 }} >
            <Text style={[styles.totalPrice, { marginLeft: 24 }]} >Total</Text>
            <Text style={styles.totalPrice} >${product.price.toFixed(2)}</Text>
        </View>
        <View style={payPalWrapperStyle} >
            <PayPal cost={product.price} productId={product.id} onSuccessCallback={onSuccessCallback} onFailureCallback={onFailureCallback} onErrorCallback={onErrorCallback} />
        </View>
    </View>
}
