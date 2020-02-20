import {Platform, StyleSheet} from 'react-native';

export default StyleSheet.create({

    container: {
        backgroundColor: '#333333',
       
    },
    courseSidebarFontRegular: {
        fontFamily: "Graphik-Regular-App",
        color:"#cccccc",
        fontSize:16,
        marginLeft:5
    },
    icon: {
        color: '#aaaaaa'
    },
    leftButtons: {
      
        display: Platform.OS === 'web' ? 'none' : 'flex',
    },
    centerMenuButtons: {
        display: Platform.OS === 'web' ? 'flex' : 'none',
        
    },
    centerMenuButtonsText: {
        color: '#aaaaaa',
        fontSize:15,
        fontWeight: 'bold',
        marginRight: 30
    },
    logo:
    {
        resizeMode: "stretch",
        width: 126,
        height: 33,
        marginRight: 70,
        marginTop: 10,
        marginLeft: 10,
        marginBottom: 10,
    }
    
});