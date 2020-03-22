import { Platform, StyleSheet } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Constants from 'expo-constants';
import { Dimensions } from 'react-native'
const mainColor = '#ffffff';

export default EStyleSheet.create({
    PostOutlineButton:
    {
        paddingTop:10,
        paddingBottom:10,
        alignSelf:"flex-end",
        marginBottom:20,
        marginLeft:10,
        marginRight:10,
      //  color:"#F0493E",
        backgroundColor:"#ffffff",
        borderWidth:1,
        borderColor:"#F0493E",
        boxShadow:"unset"
    },
    PostOutlineText:{
        color:"#F0493E",
        fontFamily: 'Graphik-Regular-App',
        fontSize: 16, 
        padding:5
        
    },
   
    OutlineButton:
    {
        paddingTop:10,
        paddingBottom:10,
        marginBottom:20,
        marginLeft:10,
        marginRight:10,
    //    color:"#F0493E",
        backgroundColor:"#ffffff",
        borderWidth:1,
        borderColor:"#F0493E",
        boxShadow:"unset"
    },
    OutlineText:{
        color:"#F0493E",
        fontFamily: 'Graphik-Regular-App',
        fontSize: 16, 
        padding:5
      
    },
    OutlineBoldButton:
    {
        paddingTop:10,
        paddingBottom:10,
        marginBottom:20,
        marginLeft:10,
        marginRight:10,
     //   color:"#F0493E",
        backgroundColor:"#ffffff",
        borderWidth:1,
        borderColor:"#F0493E",
        boxShadow:"unset"
    },
    OutlineBoldText:{
        color:"#F0493E",
        fontFamily: 'Graphik-Bold-App',
        fontSize: 16, 
        padding:10,
        fontWeight: "bold"
        
    },
    OutlineSmallButton:
    {
        paddingTop:10,
        paddingBottom:10,
        marginBottom:20,
        marginLeft:10,
        marginRight:10,
    //    color:"#F0493E",
        backgroundColor:"#ffffff",
        borderWidth:1,
        borderColor:"#F0493E",
        boxShadow:"unset"
    },
    OutlineSmallText:{
        color:"#F0493E",
        fontFamily: 'Graphik-Regular-App',
        fontSize: 16, 
        padding:5
        
    },
    SolidButton:
    {
        paddingTop:10,
        paddingBottom:10,
        marginBottom:20,
        marginLeft:10,
        marginRight:10,
     //   color:"#F0493E",
        backgroundColor:"#F0493E",
        borderWidth:1,
        borderColor:"#F0493E",
        boxShadow:"unset"
    },
    SolidText:{
        color:"#ffffff",
        fontFamily: 'Graphik-Regular-App',
        fontSize: 16, 
        padding:10
        
    },

    TransparentButton:
    {
        paddingTop:10,
        paddingBottom:10,
     
        marginBottom:20,
        marginLeft:10,
        marginRight:10,
     //   color:"#ffffff",
        backgroundColor:"#ffffff",
        borderWidth:0,
        borderColor:"#ffffff",
        boxShadow:"unset"
    },
    TransparentText:{
        color:"#F0493E",
        fontFamily: 'Graphik-Regular-App',
        fontSize: 16, 
        padding:5
        
    },
    TransparentBoldBlackButton:
    {
        paddingTop:10,
        paddingBottom:10,
     
        marginBottom:20,
        marginLeft:10,
        marginRight:10,
      //  color:"#ffffff",
        backgroundColor:"#ffffff",
        borderWidth:0,
        borderColor:"#ffffff",
        boxShadow:"unset"
    },
    TransparentBoldBlackText:{
        color:"#000000",
        fontFamily: 'Graphik-Bold-App',
        fontSize: 16, 
        padding:10,
        fontWeight: "bold"
    },
    TransparentBoldOrangeButton:
    {
        paddingTop:10,
        paddingBottom:10,
     
        marginBottom:20,
        marginLeft:10,
        marginRight:10,
       // color:"#ffffff",
        backgroundColor:"#ffffff",
        borderWidth:0,
        borderColor:"#ffffff",
        boxShadow:"unset"
    },
    TransparentBoldOrangeText:{
        color:"#F0493E",
        fontFamily: 'Graphik-Bold-App',
        fontSize: 16, 
        padding:10,
        fontWeight: "bold"
        
    },
    saveProfileButton: {
        backgroundColor: "#F0493E", textTransform: "capitalize"
    },
    saveProfileButtonText: {
        fontFamily: 'Graphik-Bold-App', fontWeight: 'bold', fontSize: 16, lineHeight: 24, display: "flex", alignItems: "center", textAlign: "center", letterSpacing: -0.3, color: "#FFFFFF", textTransform: null
    },

    fontSliderHeader: {
        fontFamily: 'Graphik-Bold-App', fontWeight: 'bold', fontSize: 16, color: '#000000'
    },
    fontSliderButtons: {
        fontFamily: 'Graphik-Bold-App', fontSize: 16, color: '#F0493E', fontWeight: "bold",padding:10
    },
    fontStartConversation: {
        fontFamily: 'Graphik-Regular-App', fontSize: 16, color: '#F0493E',padding:5
    },
    fontOrangeButton:{
        fontFamily: 'Graphik-Regular-App', fontSize: 12, color: '#ffffFF', padding:10
    },
    
    connectWithSliderButton: {
        padding: 0,
        height: 25
    },
    
   
    fontFormProfileImageButton: {
        backgroundColor: "#F0493E", textTransform: "capitalize"
    },
    fontFormProfileImageButtonText: {
        fontFamily: 'Graphik-Bold-App', fontWeight: 'bold', fontSize: 12, lineHeight: 24, display: "flex", alignItems: "center", textAlign: "center", letterSpacing: -0.3, color: "#FFFFFF", textTransform: null
    },


})
