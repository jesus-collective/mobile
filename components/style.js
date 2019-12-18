import { Platform, StyleSheet } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Constants from 'expo-constants';
export default EStyleSheet.create({
    font:
    {
        fontFamily: 'Graphik-Regular-App',
        fontSize: 16
    },
    fontBold:
    {
        fontFamily: 'Graphik-Regular-App',
        fontWeight: 'bold',
        fontSize: 24
    },
    fontTitle:
    {
        fontFamily: 'Graphik-Regular-App',
        fontWeight: 'bold',
        fontSize: 24
    },
    fontDetail:
    {
        fontFamily: 'Graphik-Regular-App',
        fontSize: 14,
        color: '#aaaaaa'
    },
    fontSliderHeader:
    {
        fontFamily: 'Graphik-Regular-App',
        fontSize: 16,
        color: '#000000'
    },
    fontSliderButtons:
    {
        fontFamily: 'Graphik-Regular-App',
        fontSize: 16,
        color: '#F0493E'
    },
    sliderButton:
    {
        // color:'#F0493E'
    },
    authView: Platform.OS === 'web'?
        { left: "40%", width: "40%", top: 150, height: "90%" }:
        { left: "2%", width: "96%", top: "10%", height: "90%" },

    signUpSidebarPanel: Platform.OS === 'web'?
        { zIndex: 1, position: "fixed", left: 0, minWidth: 196, width: "25%", height: "100%", top: 0 }:
        { zIndex: 1, position: "relative", left: 0,  width: "100%", height: 100+Constants.statusBarHeight, top: 0 },
    signUpSidebarLogo: { zIndex: 2, position: "absolute", left: 20, width: 156, height: 43, top: Platform.OS === 'web'?20:20+Constants.statusBarHeight },
    
    signUpSidebarProgress: Platform.OS === 'web'?
        { zIndex: 3, position: "fixed" , left: 20, width: 20, height: 300, top: "40%" }:
        { zIndex: 3, display:"none", position: "relative", left: 20, width: 20, height: 300, top: "40%" },
        
    signUpSidebarProgressText1: Platform.OS === 'web'?
        { zIndex: 3, position: "absolute", width: "50%", height: "10%", left: "15%", top: "38%", fontFamily: "Graphik-Bold-App", fontSize: 12, lineHeight: 48, color: "#FFFFFF" }:
        { zIndex: 3, position: "absolute", width: "50%", height: "10%", left: "65%", top: 20+Constants.statusBarHeight, fontFamily: "Graphik-Bold-App", fontSize: 12, lineHeight: 48, color: "#FFFFFF" },
    signUpSidebarProgressText2: Platform.OS === 'web'?
        { zIndex: 3, position: "absolute", width: "50%", height: "10%", left: "15%", top: "44%", fontFamily: "Graphik-Bold-App", fontSize: 12, lineHeight: 48, color: "#FFFFFF" }:
        { zIndex: 3, position: "absolute", width: "50%", height: "10%", left: "65%", top: 20+Constants.statusBarHeight, fontFamily: "Graphik-Bold-App", fontSize: 12, lineHeight: 48, color: "#FFFFFF" },
    signUpSidebarProgressText3: Platform.OS === 'web'?
        { zIndex: 3, position: "absolute", width: "50%", height: "10%", left: "15%", top: "50%", fontFamily: "Graphik-Bold-App", fontSize: 12, lineHeight: 48, color: "#FFFFFF" }:
        { zIndex: 3, position: "absolute", width: "50%", height: "10%", left: "65%", top: 20+Constants.statusBarHeight, fontFamily: "Graphik-Bold-App", fontSize: 12, lineHeight: 48, color: "#FFFFFF" },
    signUpSidebarProgressText4: Platform.OS === 'web'?
        { zIndex: 3, position: "absolute", width: "50%", height: "10%", left: "15%", top: "56%", fontFamily: "Graphik-Bold-App", fontSize: 12, lineHeight: 48, color: "#FFFFFF" }:
        { zIndex: 3, position: "absolute", width: "50%", height: "10%", left: "65%", top: 20+Constants.statusBarHeight, fontFamily: "Graphik-Bold-App", fontSize: 12, lineHeight: 48, color: "#FFFFFF" },
    signUpSidebarProgressText5: Platform.OS === 'web'?
        { zIndex: 3, position: "absolute", width: "50%", height: "10%", left: "15%", top: "62%", fontFamily: "Graphik-Bold-App", fontSize: 12, lineHeight: 48, color: "#FFFFFF" }:
        { zIndex: 3, position: "absolute", width: "50%", height: "10%", left: "65%", top: 20+Constants.statusBarHeight, fontFamily: "Graphik-Bold-App", fontSize: 12, lineHeight: 48, color: "#FFFFFF" },
    signUpSidebarProgressTextView: { zIndex: 3, position: "absolute", width: "100%", height: "100%", left: "0%", top: "0%" },

    signUpSidebarView: Platform.OS === 'web'?
        { position: "fixed" , width: "25%", height: "100%", left: "0%", top: "0%" }:
        { position: "relative", width: "100%", height: "20%", left: "0%", top: 0 },

    signUpSidebarText: Platform.OS === 'web'?
    { zIndex: 3, position: "absolute", width: "80%", height: "10%", left: "10%", top: "40%", fontFamily: "Graphik-Bold-App", fontSize: 20, lineHeight: 30, color: "#FFFFFF" }:
    { display:"none", zIndex: 3, position: "absolute", width: "80%", height: "10%", left: "10%", top: "40%", fontFamily: "Graphik-Bold-App", fontSize: 24, lineHeight: 48, color: "#FFFFFF" },

    signUpProfile: Platform.OS === 'web'?
        {position:"absolute", left: "30%", width: "65%", top: 100, height: "100%" }:
        {position:"absolute", left: "2%", width: "96%", top: 100+Constants.statusBarHeight , height: "100%" },
    
    signUpScreen1PaymentColumn1:Platform.OS === 'web'?
        { position: "absolute", left: "35%", width: "25%", top: 100, height: "100%" }:
        {  },
    signUpScreen1PaymentColumn2:Platform.OS === 'web'?
        { position: "absolute", left: "70%", width: "25%", top: 100, height: "100%" }:
        {  },
    signUpScreen1PaymentBody:Platform.OS === 'web'? 
         { width: "100%", left: 0, top: 0, height: "100%" }:
         {width: "100%", left: 0, top: 0, height: "100%"}
}
)