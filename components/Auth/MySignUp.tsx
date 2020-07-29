import React from 'react';
import SignUpSidebar from '../../components/SignUpSidebar/SignUpSidebar'
import { View } from 'native-base';
import { Platform, TextInput, Text, NativeSyntheticEvent, TextInputKeyPressEventData, Picker, TouchableOpacity } from 'react-native';
import JCButton, { ButtonTypes } from '../../components/Forms/JCButton';
import { Entypo } from '@expo/vector-icons';
import { Dimensions } from 'react-native'
import MainStyles from '../../components/style';
import countryDialCodes from 'aws-amplify-react-native/src/CountryDialCodes';
import { Auth } from 'aws-amplify';
import { Copyright } from './Copyright';

interface Props {
    authState: string;
    onStateChange(state: string): any;
}

interface State {
    user: {
        first: string;
        last: string;
        pass: string;
        pass2: string;
        email: string;
        phone: string;
        code: string;
    }
    authError: string;
    enabled: boolean;
}

class MySignUp extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            user: {
                first: '',
                last: '',
                pass: '',
                pass2: '',
                email: '',
                phone: '',
                code: '+1', // default to Canada
            },
            authError: '',
            enabled: false,
        }
    }

    changeAuthState(state: string): void {
        this.setState({
            user: {
                first: '',
                last: '',
                pass: '',
                pass2: '',
                email: '',
                phone: '',
                code: '+1',
            },
            authError: '',
            enabled: false,
        })
        this.props.onStateChange(state);
    }

    validate(): boolean {

        let val = true;
        if (!this.state.user.first) {
            val = false;
        }

        if (!this.state.user.last) {
            val = false;
        }

        if (!this.state.user.pass || !this.state.user.pass) {
            val = false;
        }

        if (!this.state.user.email || !this.state.user.email.includes('@')) {
            val = false;
        }

        if (!this.state.user.phone) {
            val = false;
        }

        return val
    }

    componentDidUpdate(_prevProps: Props, prevState: State): void {
        if (prevState.user !== this.state.user) {
            this.setState({ enabled: this.validate() })
        }
    }

    async signUp(): Promise<void> {
        try {
            if (this.state.user.pass !== this.state.user.pass2) {
                this.setState({ authError: 'Passwords do not match' })
                return;
            }
            if (!this.validate())
                return;
            await Auth.signUp({
                username: this.state.user.email,
                password: this.state.user.pass,
                attributes: {
                    family_name: this.state.user.last,
                    given_name: this.state.user.first,
                    phone_number: this.state.user.code + this.state.user.phone,
                    email: this.state.user.email
                }
            }).then(() => this.changeAuthState('confirmSignUp'));
        } catch (e) {
            this.setState({ authError: e.message })
        }
    }

    handleEnter(keyEvent: NativeSyntheticEvent<TextInputKeyPressEventData>): void {
        if (keyEvent.nativeEvent.key === 'Enter')
            this.signUp();
    }

    handleChange(field: keyof State['user'], input: string): void {
        this.setState((prevState) => ({
            user: {
                ...prevState.user,
                [field]: input,
            },
        }));
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
            this.props.authState === 'signUp' ?
                (<View style={{ width: "100%", left: 0, top: 0, height: "100%" }}>
                    <View style={this.styles.style.signUpBackButtonWrapper} >
                        <TouchableOpacity onPress={() => this.changeAuthState('signIn')}>
                            <Text style={{ alignSelf: 'flex-end', marginRight: 30, fontSize: 20, fontFamily: 'Graphik-Regular-App', lineHeight: 24, color: '#333333' }}><Entypo name="chevron-left" size={20} color="#333333" />Back</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={this.styles.style.authView3}>
                        <Text style={{ width: "100%", marginBottom: '8.33%', fontFamily: 'Graphik-Regular-App', fontWeight: 'bold', fontSize: 22, lineHeight: 30 }}>Create your account</Text>
                        <View style={{ display: 'flex', flexDirection: 'row', marginBottom: '5.5%' }}>
                            <Text style={{ fontSize: 22, color: '#F0493E', fontFamily: 'Graphik-Regular-App' }}>*</Text><TextInput textContentType="name" placeholder="First Name" value={this.state.user.first} onChange={e => this.handleChange('first', e.nativeEvent.text)} style={{ borderBottomWidth: 1, borderColor: "#00000020", marginBottom: '1.4%', marginRight: 30, width: '100%', paddingTop: 10, paddingRight: 10, paddingBottom: 10, paddingLeft: 5, fontFamily: 'Graphik-Regular-App', fontSize: 18, lineHeight: 24 }}></TextInput>
                            <Text style={{ fontSize: 22, color: '#F0493E', fontFamily: 'Graphik-Regular-App' }}>*</Text><TextInput textContentType="familyName" placeholder="Last Name" value={this.state.user.last} onChange={e => this.handleChange('last', e.nativeEvent.text)} style={{ borderBottomWidth: 1, borderColor: "#00000020", marginBottom: '1.4%', width: '100%', paddingTop: 10, paddingRight: 10, paddingBottom: 10, paddingLeft: 5, fontFamily: 'Graphik-Regular-App', fontSize: 18, lineHeight: 24 }}></TextInput>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', marginBottom: '1.4%', }}>
                            <Text style={{ fontSize: 22, color: '#F0493E', fontFamily: 'Graphik-Regular-App' }}>*</Text><TextInput autoCompleteType="email" textContentType="emailAddress" keyboardType="email-address" placeholder="Email address" value={this.state.user.email} onChange={e => this.handleChange('email', e.nativeEvent.text)} style={{ borderBottomWidth: 1, borderColor: "#00000020", width: "100%", paddingTop: 10, paddingRight: 10, paddingBottom: 10, paddingLeft: 5, fontFamily: 'Graphik-Regular-App', fontSize: 18, lineHeight: 24 }}></TextInput>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', marginBottom: '5.5%' }}>
                            <Text style={{ fontSize: 22, color: '#F0493E', fontFamily: 'Graphik-Regular-App' }}>*</Text><TextInput textContentType="newPassword" placeholder="Create Password" value={this.state.user.pass} onChange={e => this.handleChange('pass', e.nativeEvent.text)} secureTextEntry={true} style={{ borderBottomWidth: 1, borderColor: "#00000020", marginBottom: '1.4%', marginRight: 30, width: '100%', paddingTop: 10, paddingRight: 10, paddingBottom: 10, paddingLeft: 5, fontFamily: 'Graphik-Regular-App', fontSize: 18, lineHeight: 24 }}></TextInput>
                            <Text style={{ fontSize: 22, color: '#F0493E', fontFamily: 'Graphik-Regular-App' }}>*</Text><TextInput textContentType="newPassword" placeholder="Confirm Password" value={this.state.user.pass2} onChange={e => this.handleChange('pass2', e.nativeEvent.text)} secureTextEntry={true} style={{ borderBottomWidth: 1, borderColor: "#00000020", marginBottom: '1.4%', width: '100%', paddingTop: 10, paddingRight: 10, paddingBottom: 10, paddingLeft: 5, fontFamily: 'Graphik-Regular-App', fontSize: 18, lineHeight: 24 }}></TextInput>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', marginBottom: '8.33%' }}>
                            <Picker
                                selectedValue={this.state.user.code}
                                onValueChange={val => this.handleChange('code', val)}
                                style={{ marginRight: 5, borderColor: '#00000070' }}
                            >
                                {countryDialCodes.map(dialCode => (
                                    <Picker.Item key={dialCode} value={dialCode} label={dialCode} />
                                ))}
                            </Picker>
                            <Text style={{ fontSize: 22, color: '#F0493E', fontFamily: 'Graphik-Regular-App' }}>*</Text>
                            <TextInput autoCompleteType="tel" textContentType="telephoneNumber" onKeyPress={(e) => this.handleEnter(e)} keyboardType="phone-pad" placeholder="Phone number" value={this.state.user.phone} onChange={e => this.handleChange('phone', e.nativeEvent.text)} style={{ borderBottomWidth: 1, borderColor: "#00000020", width: "100%", paddingTop: 10, paddingRight: 10, paddingBottom: 10, paddingLeft: 5, fontFamily: 'Graphik-Regular-App', fontSize: 18, lineHeight: 24 }}></TextInput>
                        </View>
                        <JCButton enabled={this.state.enabled} buttonType={this.state.enabled ? ButtonTypes.SolidSignIn : ButtonTypes.DisabledSignIn} onPress={() => this.signUp()}>Continue</JCButton>
                        <TouchableOpacity onPress={() => this.changeAuthState('confirmSignUp')}>
                            <Text style={{ alignSelf: 'flex-end', marginRight: 30, fontSize: 14, fontFamily: 'Graphik-Regular-App', lineHeight: 22, color: '#333333', opacity: 0.7, marginTop: 20 }}>Confirm a code</Text>
                        </TouchableOpacity>
                        <Text style={{ alignSelf: 'center', alignItems: 'center', fontSize: 14, fontFamily: 'Graphik-Regular-App', lineHeight: 22, marginTop: 20 }} >{this.state.authError ? <Entypo name="warning" size={18} color="#F0493E" /> : null} {this.state.authError}</Text>
                        <Copyright />
                    </View>
                    {Platform.OS === 'web' && Dimensions.get('window').width > 720 ? <SignUpSidebar position="1" /> : null}
                </View>)
                : null
        );
    }
}
export default MySignUp 