import React from 'react';
import { Container, Content, Text } from 'native-base';
import Header from '../../components/Header/Header'
import HeaderAdmin from '../../components/HeaderAdmin/HeaderAdmin';
import JCComponent, { JCState } from '../../components/JCComponent/JCComponent';
import { API } from 'aws-amplify';
import GRAPHQL_AUTH_MODE from 'aws-amplify-react-native'
import { View, TextInput, NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import JCButton, { ButtonTypes } from '../../components/Forms/JCButton';
import EditableRichText from '../../components/Forms/EditableRichText';
import { EditorState, convertToRaw } from 'draft-js';
import * as mutations from '../../src/graphql/mutations';
import * as queries from '../../src/graphql/queries';
import { CreateProductInput, ListProductsQuery, UpdateProductInput } from '../../src/API';
import { GraphQLResult } from '@aws-amplify/api/lib/types';
import { AntDesign } from '@expo/vector-icons';

interface Props {
    navigation: any
    route: any
}
interface State extends JCState {
    products: NonNullable<ListProductsQuery>['listProducts']['items'];
    name: string;
    description: string;
    productId: string;
    confirmationMsg: string;
    price: string;
    mode: 'save' | 'edit';
}

const toolBar = {
    options: ['inline', 'list'],
    inline: {
        options: ['bold', 'italic', 'underline']
    },
    list: {
        options: ['unordered', 'ordered']
    },
}

export default class AdminScreen extends JCComponent<Props, State>{
    constructor(props: Props) {
        super(props);
        this.state = {
            ...super.getInitialState(),
            products: [],
            name: '',
            description: JSON.stringify(convertToRaw(EditorState.createEmpty().getCurrentContent())),
            productId: '',
            confirmationMsg: '',
            price: '',
            mode: 'save'
        }
        this.setInitialData()
    }
    async setInitialData(): Promise<void> {
        try {
            const listProducts = await API.graphql({
                query: queries.listProducts,
                variables: { limit: 50 },
                authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
            }) as GraphQLResult<ListProductsQuery>
            this.setState({ products: listProducts.data.listProducts.items })
        } catch (err) {
            console.error(err)
        }
    }

    handlePress(product: any): void {
        this.setState({
            name: product.name,
            productId: product.id,
            description: product.description,
            confirmationMsg: product.confirmationMsg,
            price: product.price.toFixed(2),
            mode: 'edit'
        })
    }

    async deleteProduct(id: string): Promise<void> {
        if (window.confirm(`Delete ${id}?`)) {
            try {
                const deleteProduct = await API.graphql({
                    query: mutations.deleteProduct,
                    variables: { input: { id } },
                    authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
                });
                console.log(deleteProduct)
                this.setInitialData();
            } catch (e) {
                console.error(e)
            }
        } else {
            return;
        }
    }

    async saveProduct(): Promise<void> {
        try {
            switch (this.state.mode) {
                case 'save':
                    const newProduct: CreateProductInput = {
                        id: `JC-${Date.now()}`,
                        price: parseFloat(this.state.price),
                        description: this.state.description,
                        name: this.state.name,
                        confirmationMsg: this.state.confirmationMsg
                    }
                    const createProduct = await API.graphql({
                        query: mutations.createProduct,
                        variables: { input: newProduct },
                        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
                    });
                    console.log(createProduct)
                    this.setInitialData();
                    this.setState({
                        name: '',
                        description: JSON.stringify(convertToRaw(EditorState.createEmpty().getCurrentContent())),
                        productId: '',
                        confirmationMsg: '',
                        price: '',
                    });
                    break;
                case 'edit':
                    const editProduct: UpdateProductInput = {
                        id: this.state.productId,
                        price: parseFloat(this.state.price),
                        description: this.state.description,
                        name: this.state.name,
                        confirmationMsg: this.state.confirmationMsg
                    }
                    const updateProduct = await API.graphql({
                        query: mutations.updateProduct,
                        variables: { input: editProduct },
                        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
                    });
                    console.log(updateProduct)
                    this.setInitialData();
                    this.setState({
                        name: '',
                        description: JSON.stringify(convertToRaw(EditorState.createEmpty().getCurrentContent())),
                        productId: '',
                        confirmationMsg: '',
                        price: '',
                    });
                    break;
            }
        } catch (err) {
            console.error(err)
        }
    }

    render(): React.ReactNode {
        return (
            <Container>
                <Header title="Jesus Collective" navigation={this.props.navigation} />

                <HeaderAdmin title="Jesus Collective" navigation={this.props.navigation} />
                {this.isMemberOf("admin") ?
                    <Content>
                        <View>
                            <Text>Product name: </Text>
                            <TextInput
                                onChange={(val: NativeSyntheticEvent<TextInputChangeEventData>) => { this.setState({ name: val.nativeEvent.text }) }}
                                placeholder="Name"
                                multiline={false}
                                value={this.state.name}></TextInput>
                            <Text>Price: </Text>
                            <TextInput
                                onChange={(val: NativeSyntheticEvent<TextInputChangeEventData>) => { this.setState({ price: val.nativeEvent.text }) }}
                                placeholder="Price in CAD"
                                multiline={false}
                                value={this.state.price}></TextInput>
                            <Text>Purchase confirmation message</Text>
                            <TextInput
                                onChange={(val: NativeSyntheticEvent<TextInputChangeEventData>) => { this.setState({ confirmationMsg: val.nativeEvent.text }) }}
                                placeholder="optional: 1-2 sentences"
                                multiline={false}
                                value={this.state.confirmationMsg}></TextInput>
                        </View>
                        <Text>Description</Text>

                        <EditableRichText toolBar={toolBar} onChange={(description) => this.setState({ description })} value={this.state.description} isEditable={true} textStyle={{}} />

                        <JCButton buttonType={ButtonTypes.Outline} onPress={() => this.saveProduct()}>save product</JCButton>
                        <Container style={this.styles.style.fontRegular}>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', width: 750 }} >
                                <View style={{ borderColor: 'black', borderWidth: 1, width: 250, margin: 0, borderRadius: 0 }}>
                                    <Text style={{ alignSelf: 'center' }} >Name</Text>
                                </View>
                                <View style={{ borderColor: 'black', borderWidth: 1, width: 250, margin: 0, borderRadius: 0 }}>
                                    <Text style={{ alignSelf: 'center' }} >Id</Text>
                                </View>
                                <View style={{ borderColor: 'black', borderWidth: 1, width: 250, margin: 0, borderRadius: 0 }}>
                                    <Text style={{ alignSelf: 'center' }} >Price (CAD)</Text>
                                </View>
                            </View>
                            {this.state.products.map(product => {
                                return <View key={product.id} style={{ display: 'flex', flexDirection: 'row' }} >
                                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', width: 750 }} >
                                        <View style={{ borderColor: 'black', borderWidth: 1, width: 250, margin: 0, borderRadius: 0 }}>
                                            <Text style={{ alignSelf: 'center' }} >{product.name}</Text>
                                        </View>
                                        <View style={{ borderColor: 'black', borderWidth: 1, width: 250, margin: 0, borderRadius: 0 }}>
                                            <Text style={{ alignSelf: 'center' }}>{product.id}</Text>
                                        </View>
                                        <View style={{ borderColor: 'black', borderWidth: 1, width: 250, margin: 0, borderRadius: 0 }}>
                                            <Text style={{ alignSelf: 'center' }}>{product.price.toFixed(2)}</Text>
                                        </View>
                                    </View>
                                    <AntDesign name="delete" size={20} color="black" onPress={() => this.deleteProduct(product.id)} />
                                    <AntDesign name="edit" size={20} color="black" onPress={() => this.handlePress(product)} />
                                </View>
                            })}
                        </Container>
                    </Content>
                    : <Content>
                        <Container style={this.styles.style.eventsScreenMainContainer}>
                            <Container style={this.styles.style.eventsScreenLeftContainer}>
                                <Text>You must be an admin to see this screen</Text>
                            </Container>
                        </Container>
                    </Content>
                }

            </Container>


        );
    }
}
