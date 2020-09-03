import React from 'react';
import { Container, Content, Text } from 'native-base';
import Header from '../../components/Header/Header'
import HeaderAdmin from '../../components/HeaderAdmin/HeaderAdmin';
import JCComponent, { JCState } from '../../components/JCComponent/JCComponent';
import { Auth, API } from 'aws-amplify';
import { View, TextInput, NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import JCButton, { ButtonTypes } from '../../components/Forms/JCButton';
import EditableRichText from '../../components/Forms/EditableRichText';
import { EditorState, convertToRaw } from 'draft-js';


interface Props {
    navigation: any
    route: any
}
interface State extends JCState {
    products: any[];
    name: string;
    description: string;
    productId: string;
    confirmationMsg: string;
    price: string;
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
        }
        this.setInitialData()
    }
    async setInitialData(): Promise<void> {
        //console.log('test')
    }

    render(): React.ReactNode {
        console.log("AdminScreen")
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

                        <JCButton buttonType={ButtonTypes.Outline} onPress={() => { null }}>Create Product</JCButton>
                        <Container style={this.styles.style.fontRegular}>
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
