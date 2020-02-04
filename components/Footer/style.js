import { Platform, StyleSheet } from 'react-native';

export default StyleSheet.create({

    footerContainer: {
        backgroundColor: '#333333',
        padding: 20,
        flex:0,
        minHeight:200,
        width:'100%',
        height:200
    },

    icon: {
        color: '#aaaaaa'
    },
    leftButtons: {

        display: Platform.OS === 'web' ? 'none' : 'flex',
    },
    footerCenterMenuButtonsWhite: {
        alignItems: "flex-start",
        marginTop:0,
        paddingTop:0,
        marginBottom:0,
        paddingBottom:0,
        height:45,
        width:null
    },
    footerCenterMenuButtons: {
        alignItems: "flex-start",
        marginTop:0,
        paddingTop:0,
        marginBottom:0,
        paddingBottom:0,
        height:35,
        width:null
    },
    footerCenterMenuButtonsTextWhite: {
        fontFamily: "Graphik-Bold-App",
        color: '#ffffff',
        fontSize: 15,
        fontWeight: 'bold',
        marginRight: 30
    },
    footerCenterMenuButtonsText: {
        fontFamily: "Graphik-Bold-App",
        color: '#aaaaaa',
        fontSize: 13,
        fontWeight: 'bold',
        marginRight: 30,
        marginTop:0,
        paddingTop:0,
        marginBottom:0,
        paddingBottom:0
    },
    logo: {
        resizeMode: "stretch",
        width: 126,
        height: 33,
        marginRight: 70,
        marginTop: 5,
        marginBottom: 10
    },
    copywriteText: {
        fontFamily: "Graphik-Regular-App",
        color: '#ffffff',
        fontSize: 13
    }
});