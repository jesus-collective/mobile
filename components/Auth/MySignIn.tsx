import React from 'react';
import SignUpSidebar from '../../components/SignUpSidebar/SignUpSidebar'
import { View } from 'native-base';
import { Platform, Text, TextInput, TouchableOpacity, NativeSyntheticEvent, TextInputKeyPressEventData } from 'react-native';
import { Dimensions } from 'react-native'
import { Auth } from 'aws-amplify';
import JCButton, { ButtonTypes } from '../../components/Forms/JCButton';
import MainStyles from '../../components/style';
import { Entypo } from '@expo/vector-icons';
import { Copyright } from './Copyright';

interface Props {
    authState: string;
    onStateChange(state: string): any;
    onSetUser(user: any): any
}

interface State {
    pass: string;
    user: string;
    authError: string;
}

class MySignIn extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            pass: '',
            user: '',
            authError: '',
        }
    }

    changeAuthState(state: string, user?: string): void {
        this.setState({
            pass: '',
            user: '',
            authError: '',
        })
        this.props.onStateChange(state)
        if (user)
            this.props.onSetUser(user);


    }

    async handleSignIn(): Promise<void> {
        try {
            await Auth.signIn(this.state.user.toLowerCase(), this.state.pass).then((user) => {
                if (user.challengeName == "NEW_PASSWORD_REQUIRED")
                    this.changeAuthState('requireNewPassword', user)
                else
                    this.changeAuthState('signedIn')
            });
        } catch (err) {

            if (!this.state.pass && this.state.user) {
                this.setState({ authError: 'Password cannot be empty' })
            } else {
                this.setState({ authError: err.message })
            }
        }
    }

    handleEnter(keyEvent: NativeSyntheticEvent<TextInputKeyPressEventData>): void {
        if (keyEvent.nativeEvent.key === 'Enter')
            this.handleSignIn();
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
            this.props.authState === 'signIn' || this.props.authState === "signedOut" || this.props.authState === "signedUp" ?
                (<View style={{ width: "100%", left: 0, top: 0, height: "100%" }}>
                    <View style={this.styles.style.createAccountButtonWrapper} >
                        <JCButton buttonType={ButtonTypes.SolidCreateAccount} onPress={() => { this.changeAuthState('signUp') }}>Create an Account</JCButton>
                    </View>
                    <View style={this.styles.style.authView2}>
                        <Text style={{ width: "100%", marginBottom: '5.5%', fontFamily: 'Graphik-Regular-App', fontWeight: 'bold', fontSize: 22, lineHeight: 30 }}>Sign in to Jesus Collective</Text>
                        <TextInput autoCompleteType="email" textContentType="emailAddress" autoFocus keyboardType="email-address" placeholder="Email" value={this.state.user} onChange={e => this.setState({ user: e.nativeEvent.text })} secureTextEntry={false} style={{ borderBottomWidth: 1, borderColor: "#00000020", width: "100%", marginBottom: '1.4%', paddingTop: 10, paddingRight: 10, paddingBottom: 10, paddingLeft: 5, fontFamily: 'Graphik-Regular-App', fontSize: 18, lineHeight: 24 }}></TextInput>
                        <TextInput autoCompleteType="password" textContentType="password" onKeyPress={(e) => { this.handleEnter(e) }} placeholder="Password" value={this.state.pass} onChange={e => this.setState({ pass: e.nativeEvent.text })} secureTextEntry={true} style={{ borderBottomWidth: 1, borderColor: "#00000020", width: "100%", marginBottom: '4.2%', paddingTop: 10, paddingRight: 10, paddingBottom: 10, paddingLeft: 5, fontFamily: 'Graphik-Regular-App', fontSize: 18, lineHeight: 24 }}></TextInput>
                        <JCButton buttonType={ButtonTypes.SolidSignIn} onPress={() => { this.handleSignIn() }}>Sign In</JCButton>
                        <TouchableOpacity onPress={() => { this.changeAuthState('forgotPassword') }}>
                            <Text style={{ alignSelf: 'flex-end', marginRight: 30, fontSize: 14, fontFamily: 'Graphik-Regular-App', lineHeight: 22, color: '#333333', opacity: 0.7, marginTop: 20 }}>Forgot password?</Text>
                        </TouchableOpacity>
                        <Text style={{ alignSelf: 'center', alignItems: 'center', fontSize: 14, fontFamily: 'Graphik-Regular-App', lineHeight: 22, marginTop: 20 }} >{this.state.authError ? <Entypo name="warning" size={18} color="#F0493E" /> : null} {this.state.authError}</Text>
                        <Copyright />
                    </View>
                    {Platform.OS === 'web' && Dimensions.get('window').width > 720 ?
                        <SignUpSidebar text="It’s time to unite, equip, and amplify a Jesus-centred movement." />

                        : null}
                </View>)
                : null
        );
    }
}
export default MySignIn 