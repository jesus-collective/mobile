import { Platform, StyleSheet } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Constants from 'expo-constants';
import { Dimensions } from 'react-native'
const mainColor = '#3ca897';
export default EStyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: mainColor,
    },
    textInput: {
        height: 40,
        borderColor: 'white',
        borderWidth: 1,
        marginTop: 8,
        borderRadius: 5,
        padding: 3,
    },
    tag: {
        backgroundColor: '#fff'
    },
    tagText: {
        color: mainColor
    },

    fontRegular: {
        fontFamily: "Graphik-Regular-App"
    },
    font: {
        fontFamily: 'Graphik-Regular-App', fontSize: 16
    },
    fontFormProfileImageButton: {
        position: "absolute", left: 20, width: 210, top: 150, backgroundColor: "#F0493E", textTransform: "capitalize"
    },
    fontFormProfileImageButtonText: {
        fontFamily: 'Graphik-Regular-App', fontWeight: 'bold', fontSize: 16, lineHeight: 24, display: "flex", alignItems: "center", textAlign: "center", letterSpacing: -0.3, color: "#FFFFFF", textTransform: null
    },
    saveProfileButton: {
       backgroundColor: "#F0493E", textTransform: "capitalize"
    },
    saveProfileButtonText: {
        fontFamily: 'Graphik-Regular-App', fontWeight: 'bold', fontSize: 16, lineHeight: 24, display: "flex", alignItems: "center", textAlign: "center", letterSpacing: -0.3, color: "#FFFFFF", textTransform: null
    },

    fontFormProfileImageText: {
        position: "absolute", left: 10, top: 200, fontFamily: 'Graphik-Regular-App', fontSize: 14, lineHeight: 22, textAlign: "center", letterSpacing: -0.3, color: "#FFFFFF", width: 230
    },
    fontFormMandatory: {
        fontFamily: 'Graphik-Regular-App', fontSize: 26, lineHeight: 33, color: "#F0493E"
    },
    fontFormName: {
        fontFamily: 'Graphik-Regular-App', fontSize: 30, lineHeight: 36, textAlign: "center", color: "#333333"
    },
    fontFormText: {
        fontFamily: 'Graphik-Regular-App', fontSize: 18, lineHeight: 25, letterSpacing: -0.3, color: "#333333", opacity: 0.7
    },
    fontFormRole: {
        fontFamily: 'Graphik-Regular-App', fontSize: 16, lineHeight: 21, textAlign: "center", color: "#333333", opacity: 0.6
    },
    fontFormUserType: {
        fontFamily: 'Graphik-Regular-App', fontSize: 14, lineHeight: 16, textAlign: "center", textTransform: "uppercase", color: "#333333"
    },
    fontFormAboutMe: {
        fontFamily: 'Graphik-Regular-App', fontSize: 18, lineHeight: 28, color: "#333333", borderColor: "#dddddd", borderWidth: 1, height: 200, width: 250
    },
    fontFormSmallDarkGrey: {
        fontFamily: 'Graphik-Regular-App', fontSize: 16, lineHeight: 16, color: "#333333"
    },
    fontFormSmallInput: {
        fontFamily: 'Graphik-Regular-App', fontSize: 14, lineHeight: 25, letterSpacing: -0.3, color: "#333333", width: 250, height: 18, borderWidth: 0, borderColor: "#dddddd"
    },
    fontFormSmallGrey: {
        fontFamily: 'Graphik-Regular-App', fontSize: 16, lineHeight: 16, color: "#333333", opacity: 0.5
    },
    fontFormSmallHeader: {
        fontFamily: 'Graphik-Regular-App', fontSize: 14, lineHeight: 26, letterSpacing: -0.3, textTransform: "uppercase", color: "#333333"
    },
    fontFormSmall: {
        fontFamily: 'Graphik-Regular-App', fontSize: 12, lineHeight: 21, textTransform: "uppercase", color: "#333333", opacity: 0.5
    },
    fontBold: {
        fontFamily: 'Graphik-Regular-App', fontWeight: 'bold', fontSize: 24
    },
    fontTitle: {
        fontFamily: 'Graphik-Regular-App', fontWeight: 'bold', fontSize: 24
    },
    fontDetail: {
        fontFamily: 'Graphik-Regular-App', fontSize: 14, color: '#aaaaaa'
    },
    fontSliderHeader: {
        fontFamily: 'Graphik-Regular-App', fontSize: 16, color: '#000000'
    },
    fontSliderButtons: {
        fontFamily: 'Graphik-Regular-App', fontSize: 16, color: '#F0493E'
    },
    sliderButton:
    {
        // color:'#F0493E'
    },
    flexRow:
        { flexDirection: 'row' },
    authView: Platform.OS === 'web' ?
        { left: "40%", width: "40%", top: 100, height: "auto" } :
        { left: "2%", width: "96%", top: "0%", height: "100%" },

    signUpSidebarPanel: Platform.OS === 'web' ?
        { zIndex: 1, position: "fixed", left: 0, minWidth: 196, width: "25%", height: "100%", top: 0 } :
        { zIndex: 1, position: "relative", left: 0, width: "100%", height: 100 + Constants.statusBarHeight, top: 0 },
    signUpSidebarLogo: { zIndex: 2, position: "absolute", left: 20, width: 156, height: 43, top: Platform.OS === 'web' ? 20 : 20 + Constants.statusBarHeight },

    signUpSidebarProgress: Platform.OS === 'web' ?
        { zIndex: 3, position: "fixed", left: 20, width: 20, height: 300, top: "40%" } :
        { zIndex: 3, display: "none", position: "relative", left: 20, width: 20, height: 300, top: "40%" },

    signUpSidebarProgressText1: Platform.OS === 'web' ?
        { zIndex: 3, position: "absolute", width: "95%", height: "10%", left: "50px", top: "calc(40vh - 18px)", fontFamily: "Graphik-Bold-App", fontSize: 12, lineHeight: 48, color: "#FFFFFF" } :
        { zIndex: 3, position: "absolute", width: "50%", height: "10%", left: "65%", top: 20 + Constants.statusBarHeight, fontFamily: "Graphik-Bold-App", fontSize: 12, lineHeight: 48, color: "#FFFFFF" },
    signUpSidebarProgressText2: Platform.OS === 'web' ?
        { zIndex: 3, position: "absolute", width: "95%", height: "10%", left: "50px", top: "calc(40vh + 36px)", fontFamily: "Graphik-Bold-App", fontSize: 12, lineHeight: 48, color: "#FFFFFF" } :
        { zIndex: 3, position: "absolute", width: "50%", height: "10%", left: "65%", top: 20 + Constants.statusBarHeight, fontFamily: "Graphik-Bold-App", fontSize: 12, lineHeight: 48, color: "#FFFFFF" },
    signUpSidebarProgressText3: Platform.OS === 'web' ?
        { zIndex: 3, position: "absolute", width: "95%", height: "10%", left: "50px", top: "calc(40vh + 90px)", fontFamily: "Graphik-Bold-App", fontSize: 12, lineHeight: 48, color: "#FFFFFF" } :
        { zIndex: 3, position: "absolute", width: "50%", height: "10%", left: "65%", top: 20 + Constants.statusBarHeight, fontFamily: "Graphik-Bold-App", fontSize: 12, lineHeight: 48, color: "#FFFFFF" },
    signUpSidebarProgressText4: Platform.OS === 'web' ?
        { zIndex: 3, position: "absolute", width: "95%", height: "10%", left: "50px", top: "calc(40vh + 144px)", fontFamily: "Graphik-Bold-App", fontSize: 12, lineHeight: 48, color: "#FFFFFF" } :
        { zIndex: 3, position: "absolute", width: "50%", height: "10%", left: "65%", top: 20 + Constants.statusBarHeight, fontFamily: "Graphik-Bold-App", fontSize: 12, lineHeight: 48, color: "#FFFFFF" },
    signUpSidebarProgressText5: Platform.OS === 'web' ?
        { zIndex: 3, position: "absolute", width: "95%", height: "10%", left: "50px", top: "calc(40vh + 198px)", fontFamily: "Graphik-Bold-App", fontSize: 12, lineHeight: 48, color: "#FFFFFF" } :
        { zIndex: 3, position: "absolute", width: "50%", height: "10%", left: "65%", top: 20 + Constants.statusBarHeight, fontFamily: "Graphik-Bold-App", fontSize: 12, lineHeight: 48, color: "#FFFFFF" },
    signUpSidebarProgressTextView: { zIndex: 3, position: "absolute", width: "100%", height: "100%", left: "0%", top: "0%" },

    signUpSidebarView: Platform.OS === 'web' ?
        { position: "fixed", width: "25%", height: "100%", left: "0%", top: "0%" } :
        { position: "relative", width: "100%", height: "20%", left: "0%", top: 0 },

    signUpSidebarText: Platform.OS === 'web' ?
        { zIndex: 3, position: "absolute", width: "80%", height: "10%", left: "10%", top: "40%", fontFamily: "Graphik-Bold-App", fontSize: 20, lineHeight: 30, color: "#FFFFFF" } :
        { display: "none", zIndex: 3, position: "absolute", width: "80%", height: "10%", left: "10%", top: "40%", fontFamily: "Graphik-Bold-App", fontSize: 24, lineHeight: 48, color: "#FFFFFF" },

    signUpProfile: Platform.OS === 'web' ?
        { position: "absolute", left: "30%", width: "65%", top: 10 } :
        { position: "absolute", left: "2%", width: "96%", top: 100 + Constants.statusBarHeight, height: "100%" },

    signUpScreen1Content: Platform.OS === 'web' ?
        { position: "absolute", width: "100%" } :
        { position: "absolute", width: "100%", height: Dimensions.get('window').height - (100 + Constants.statusBarHeight), left: 0, top: 100 + Constants.statusBarHeight },
    signUpScreen1PaymentColumn1: Platform.OS === 'web' ?
        { position: "absolute", left: "35%", width: "25%", top: 100, height: "100%" } :
        {},
    signUpScreen1PaymentColumn2: Platform.OS === 'web' ?
        { position: "absolute", left: "70%", width: "25%", top: 100, height: "100%" } :
        {},
    signUpScreen1PaymentBody: Platform.OS === 'web' ?
        { width: "100%", left: 0, top: 0, height: "100%" } :
        { width: "100%", left: 0, top: 0, height: "100%" }
})