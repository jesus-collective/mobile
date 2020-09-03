import React, { useState, useEffect } from 'react';
import { Container, Content, Text } from 'native-base';
import { Image } from 'react-native';
import Header from '../../components/Header/Header'
import JCButton, { ButtonTypes } from '../../components/Forms/JCButton';

interface Params {
    navigation: any
    route: any
}

export default function PurchaseConfirmationScreen({ navigation, route }: Params): JSX.Element {

    const productId = route.params?.productId;
    const id = route.params?.id;

    const [message, setMessage] = useState('');

    useEffect(() => {
        //get product
    }, [])

    if (id) {
        return (
            <Container >
                <Header title="Jesus Collective" navigation={navigation} />
                <Content>
                    <Container style={{ width: '50%', alignSelf: 'center', marginVertical: 64, alignItems: 'center' }} >
                        <Image source={require('../../assets/confirmation-checkmark.png')} style={{ width: 100, height: 100 }} />
                        <Text style={{ fontFamily: 'Graphik-Medium-App', fontSize: 42, marginVertical: 26 }} >Purchase Successful</Text>
                        {message ? <Text style={{ fontFamily: 'Graphik-Regular-App', fontSize: 24, marginBottom: 12 }}>{message}</Text> : null}
                        <Text style={{ fontFamily: 'Graphik-Regular-App', fontSize: 24 }}> Invoice number: {id}</Text>
                        <Container style={{ marginTop: 26 }} >
                            <JCButton buttonType={ButtonTypes.Solid} onPress={() => navigation.push('HomeScreen')} >Back to Home</JCButton>
                        </Container>
                    </Container>
                </Content>
            </Container >
        );
    } else {
        return (
            <Container >
                <Header title="Jesus Collective" navigation={navigation} />
                <Content>
                    <Container style={{ marginTop: 50, alignItems: 'center' }} >
                        <Text style={{ fontSize: 36, fontFamily: 'Graphik-Regular-App' }}>Page not found.</Text>
                        <Container style={{ marginTop: 50 }} >
                            <JCButton buttonType={ButtonTypes.Solid} onPress={() => navigation.push('HomeScreen')} >Back to Home</JCButton>
                        </Container>
                    </Container>
                </Content>
            </Container>
        );
    }
}
