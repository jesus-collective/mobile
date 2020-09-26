import React from 'react';
import SignUpSidebar from '../../components/SignUpSidebar/SignUpSidebar'
import { View } from 'native-base';
import { Platform, TextInput, Text, TouchableOpacity, NativeSyntheticEvent, TextInputKeyPressEventData, ActivityIndicator } from 'react-native';
import JCButton, { ButtonTypes } from '../../components/Forms/JCButton';
import { Dimensions } from 'react-native'
import MainStyles from '../../components/style';
import { Auth } from 'aws-amplify'
import { Entypo } from '@expo/vector-icons';
import { Copyright } from './Copyright';

interface Props {
    authState: string;
    onStateChange(state: string): any;
}

interface State {
    email: string;
    code: string;
    authError: string;
    sendingData: boolean;
}
class MyConfirmSignUp extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            email: '',
            code: '',
            authError: '',
            sendingData: false
        }
    }

    changeAuthState(state: string): void {
        this.setState({
            email: '',
            code: '',
            authError: '',
            sendingData: false
        })
        this.props.onStateChange(state);
    }

    async handleConfirmSignUp(): Promise<void> {
        try {
            this.setState({ sendingData: true })
            await Auth.confirmSignUp(this.state.email, this.state.code).then(() => { this.changeAuthState('signIn') })
        } catch (e) {
            this.setState({ authError: e.message, sendingData: false })
        }
    }

    handleEnter(keyEvent: NativeSyntheticEvent<TextInputKeyPressEventData>): void {
        if (keyEvent.nativeEvent.key === 'Enter')
            this.handleConfirmSignUp();
    }

    styles = MainStyles.getInstance();
    componentDidMount(): void {
        Dimensions.addEventListener('change', () => { this.styles.updateStyles(this) })
    }
    componentWillUnmount(): void {
        Dimensions.removeEventListener("change", () => { this.styles.updateStyles(this) });
    }
    render(): React.ReactNode {
        return (
            this.props.authState === 'confirmSignUp' ?
                (<View style={{ width: "100%", left: 0, top: 0, height: "100%" }}>
                    <View style={this.styles.style.signUpBackButtonWrapper} >
                        <TouchableOpacity onPress={() => { this.changeAuthState('signIn') }}>
                            <Text style={{ alignSelf: 'flex-end', marginRight: 30, fontSize: 20, fontFamily: 'Graphik-Regular-App', lineHeight: 24, color: '#333333' }}><Entypo name="chevron-left" size={20} color="#333333" />Back</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={this.styles.style.authView2}>
                        <Text style={{ width: "100%", marginBottom: '5.5%', fontFamily: 'Graphik-Regular-App', fontWeight: 'bold', fontSize: 22, lineHeight: 30 }}>Enter your security code</Text>
                        <TextInput autoCompleteType="email" textContentType="emailAddress" keyboardType="email-address" placeholder="Email address" value={this.state.email} onChange={e => this.setState({ email: e.nativeEvent.text })} style={{ borderBottomWidth: 1, borderColor: "#00000020", width: "100%", marginBottom: '1.4%', paddingTop: 10, paddingRight: 10, paddingBottom: 10, paddingLeft: 5, fontFamily: 'Graphik-Regular-App', fontSize: 18, lineHeight: 24 }}></TextInput>
                        <View style={this.styles.style.confirmationCodeWrapper}>
                            <TextInput textContentType="oneTimeCode" keyboardType="number-pad" onKeyPress={(e) => this.handleEnter(e)} placeholder="One-time security code" value={this.state.code} onChange={e => this.setState({ code: e.nativeEvent.text })} style={{ borderBottomWidth: 1, borderColor: "#00000020", marginBottom: '1.4%', marginRight: 30, width: '100%', paddingTop: 10, paddingRight: 10, paddingBottom: 10, paddingLeft: 5, fontFamily: 'Graphik-Regular-App', fontSize: 18, lineHeight: 24 }}></TextInput>
                            <JCButton buttonType={ButtonTypes.SolidSignIn2} onPress={() => this.handleConfirmSignUp()}>{this.state.sendingData ? <ActivityIndicator animating color="#333333" /> : 'Submit'}</JCButton>
                        </View>
                        <Text style={{ alignSelf: 'center', alignItems: 'center', fontSize: 14, fontFamily: 'Graphik-Regular-App', lineHeight: 22, marginTop: 20 }} >{this.state.authError ? <Entypo name="warning" size={18} color="#F0493E" /> : null} {this.state.authError}</Text>
                        <Copyright />
                    </View>
                    {Platform.OS === 'web' && Dimensions.get('window').width > 720 ? <SignUpSidebar text="It’s time to unite, equip, and amplify a Jesus-centred movement." /> : null}
                </View>)
                : null


        );
    }
}
export default MyConfirmSignUp 