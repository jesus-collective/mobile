import React, { useEffect, useState } from 'react';
import { Container, Content, Text } from 'native-base';
import Header from '../../components/Header/Header'
import PaymentFrom from '../../components/Forms/PaymentForm';
import JCButton, { ButtonTypes } from '../../components/Forms/JCButton';
import { graphqlOperation, API } from 'aws-amplify';
import * as queries from '../../src/graphql/queries'
import * as mutations from '../../src/graphql/mutations'
import { GraphQLResult } from '@aws-amplify/api/lib/types';
import { GetProductQuery } from '../../src/API';
import { Auth } from 'aws-amplify';

interface Params {
    navigation: any
    route: any
}

export default function CoursePayment({ navigation, route }: Params): JSX.Element {
    const productId = route.params?.id;
    const [product, setProduct] = useState<NonNullable<GetProductQuery>['getProduct'] | 'unknown' | null>('unknown');

    useEffect(() => {
        async function getProduct() {
            try {
                const getProduct = await API.graphql(graphqlOperation(queries.getProduct, { id: productId })) as GraphQLResult<GetProductQuery>;
                setProduct(getProduct.data.getProduct);
            } catch (e) {
                console.error(e)
            }
        }
        getProduct();
    }, [])

    const success = async (details: any) => {
        const productId = details?.purchase_units[0]?.custom_id
        const id = details?.purchase_units[0]?.invoice_id
        const create_time = details?.create_time
        const user = await Auth.currentAuthenticatedUser();

        try {
            const saveResult = await API.graphql(graphqlOperation(mutations.createPayment, { input: { id: productId + "-" + user['username'], productID: productId, userID: user['username'], dateCompleted: create_time, paymentType: "Paypal", paymentInfo: details } })) as GraphQLResult<GetProductQuery>;
            console.log(saveResult)
        }
        catch (e) {
            console.error(e)
        }
        navigation.push('PurchaseConfirmationScreen', { productId, id })
    }

    if (product === 'unknown') {
        return <Container />
    }

    if (productId && product) {
        return (
            <Container >
                <Header title="Jesus Collective" navigation={navigation} />
                <Content>
                    <Container style={{ maxWidth: 800, alignSelf: 'center', marginVertical: 48, marginHorizontal: 24 }} >
                        <PaymentFrom product={product} onSuccessCallback={success} onFailureCallback={(e) => console.error(e)} />
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
                        <Container style={{ marginTop: 50 }} >
                            <JCButton buttonType={ButtonTypes.Solid} onPress={() => navigation.push('HomeScreen')} >Back to Home</JCButton>
                        </Container>
                    </Container>
                </Content>
            </Container>
        );
    }
}
