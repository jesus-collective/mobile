import React, { useEffect, useState } from 'react';
import { Container, Content, Text } from 'native-base';
import Header from '../../components/Header/Header'
import PaymentFrom from '../../components/Forms/PaymentForm';
import JCButton, { ButtonTypes } from '../../components/Forms/JCButton';

interface Params {
    navigation: any
    route: any
}

export default function CoursePayment({ navigation, route }: Params): JSX.Element {
    const productId = route.params?.id;
    const [product, setProduct] = useState({})

    useEffect(() => {
        //get product
    }, [])

    const success = (details: any) => {
        const productId = details?.purchase_units[0]?.custom_id
        const id = details?.purchase_units[0]?.invoice_id

        navigation.push('PurchaseConfirmationScreen', { productId, id })
    }

    if (productId) {
        return (
            <Container >
                <Header title="Jesus Collective" navigation={navigation} />
                <Content>
                    <Container style={{ maxWidth: 800, alignSelf: 'center', marginVertical: 48, marginHorizontal: 24 }} >
                        <PaymentFrom product={{}} onSuccessCallback={success} onFailureCallback={(e) => console.error(e)} />
                    </Container>
                </Content>
            </Container>
        );
    } else {
        return (
            <Container >
                <Header title="Jesus Collective" navigation={navigation} />
                <Content>
                    <Container style={{ width: '50%', alignSelf: 'center', marginVertical: 64 }} >
                        <Text style={{ fontSize: 36, fontFamily: 'Graphik-Regular-App' }}>Something went wrong.</Text>
                        <Text style={{ fontSize: 16, fontFamily: 'Graphik-Regular-App', marginTop: 16 }}>Product not found. Please contact the Jesus Collective team for assistance.</Text>
                    </Container>
                    <Container style={{ marginTop: 50 }} >
                        <JCButton buttonType={ButtonTypes.Solid} onPress={() => navigation.push('HomeScreen')} >Back to Home</JCButton>
                    </Container>
                </Content>
            </Container>
        );
    }
}
