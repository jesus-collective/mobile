import { Platform } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Constants from 'expo-constants';
import { Dimensions } from 'react-native'
const mainColor = '#ffffff';

export default EStyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: mainColor,
    },
    groupNameInput: {
        borderColor: 'white',
        borderWidth: 1,
        marginTop: 8,
        borderRadius: 5,
        padding: 3,
        paddingLeft: 0,
        flex: 0,
        fontSize: 30,
        lineHeight: 36,
        fontWeight: "bold",
        fontFamily: "Graphik-Bold-App",
        width: "100%"
    },
    eventNameInput: {
        borderColor: 'white',
        borderWidth: 1,
        marginTop: 8,
        borderRadius: 5,
        padding: 3,
        paddingLeft: 0,
        flex: 0,
        fontSize: 30,
        lineHeight: 36,
        fontWeight: "bold",
        fontFamily: "Graphik-Bold-App",
        width: "100%"
    },
    groupDescriptionInput: {
        borderColor: 'white',
        borderWidth: 1,
        marginTop: 8,
        borderRadius: 5,
        padding: 3,
        paddingLeft: 0,
        flex: 0,
        minHeight: 100,
        fontSize: 16,
        lineHeight: 23,
        fontWeight: "normal",
        fontFamily: "Graphik-Regular-App",
        width: "100%"
    },
    eventDescriptionInput: {
        borderColor: 'white',
        borderWidth: 1,
        marginTop: 8,
        borderRadius: 5,
        padding: 3,
        paddingLeft: 0,
        flex: 0,
        minHeight: 50,
        fontSize: 16,
        lineHeight: 23,
        fontWeight: "normal",
        fontFamily: "Graphik-Regular-App",
        width: "100%",
        marginBottom: 10
    },
    eventDateInput: {
        padding: 3,
        paddingLeft: 0,
        flex: 0,
        fontSize: 14,
        lineHeight: 16,
        fontFamily: "Graphik-bold-App",
        width: "100%",
        marginBottom: 20
    },
    eventEditableURL: {
        borderColor: 'rgba(155, 166, 175, 0.23)',
        borderWidth: 1,
        marginTop: 8,
        borderRadius: 5,
        padding: 6,
        paddingLeft: 10,
        flex: 0,
        fontSize: 16,
        lineHeight: 23,
        fontWeight: "bold",
        fontFamily: "Graphik-Bold-App",
        width: "100%"
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
        color: "#000000"
    },

    fontRegular: {
        fontFamily: "Graphik-Regular-App"
    },
    editableURLText: {
        fontFamily: "Graphik-Bold-App",
        fontSize: 16,
        color: "#ffffff"
    },
    font: {
        fontFamily: 'Graphik-Regular-App',
        fontSize: 16
    },
    fontMyMapOptions: {
        //font family is Helvetica Neue on Figma
        fontSize: 14,
        paddingRight: 10
    },
    fontMyProfileLeftTop: {
        fontFamily: 'Graphik-Regular-App',
        fontSize: 30,
        lineHeight: 36,
        marginBottom: 18
    },
    fontGroupNameDetailPage: {
        fontSize: 30,
        lineHeight: 36,
        color: "#333333",
        fontFamily: "Graphik-Regular-App"
    },
    saveProfileButton: {
        backgroundColor: "#F0493E", textTransform: "capitalize"
    },
    saveProfileButtonText: {
        fontFamily: 'Graphik-Bold-App', fontWeight: 'bold', fontSize: 16, lineHeight: 24, display: "flex", alignItems: "center", textAlign: "center", letterSpacing: -0.3, color: "#FFFFFF", textTransform: null
    },

    fontFormProfileImageText: {
        position: "absolute", left: 10, top: 200, fontFamily: 'Graphik-Regular-App', fontSize: 14, lineHeight: 22, textAlign: "center", letterSpacing: -0.3, color: "#FFFFFF", width: 230
    },
    fontFormMandatory: {
        fontFamily: 'Graphik-Regular-App', fontSize: 26, lineHeight: 33, color: "#F0493E"
    },
    fontFormName: {
        fontFamily: 'Graphik-Regular-App', fontSize: 30, lineHeight: 36, textAlign: "center", color: "#333333", fontWeight: "bold"
    },
    fontFormText: {
        fontFamily: 'Graphik-Regular-App', fontSize: 18, lineHeight: 25, letterSpacing: -0.3, color: "#333333", opacity: 0.7, marginTop: 40
    },
    fontFormText2: {
        fontFamily: 'Graphik-Regular-App', fontSize: 18, lineHeight: 25, letterSpacing: -0.3, color: "#333333", opacity: 0.7, marginTop: 20
    },
    fontFormRole: {
        fontFamily: 'Graphik-Regular-App', fontSize: 16, lineHeight: 21, textAlign: "center", color: "#333333", opacity: 0.6
    },
    fontFormUserType: {
        fontFamily: 'Graphik-Regular-App', fontSize: 14, lineHeight: 16, textAlign: "center", textTransform: "uppercase", color: "#333333", marginTop: 18, marginBottom: 18
    },
    fontFormAboutMe: {
        fontFamily: 'Graphik-Regular-App', fontSize: 18, lineHeight: 28, color: "#333333", borderColor: "#dddddd", borderWidth: 1, height: 40, width: "100%"
    },
    fontFormSmallDarkGrey: {
        fontFamily: 'Graphik-Regular-App', fontSize: 16, lineHeight: 16, color: "#333333", paddingTop: 5
    },
    fontFormSmallInput: {
        fontFamily: 'Graphik-Regular-App', fontSize: 14, lineHeight: 25, letterSpacing: -0.3, color: "#333333", width: 250, height: 18, borderWidth: 0, borderColor: "#dddddd"
    },
    fontFormMediumInput: {
        fontFamily: 'Graphik-Regular-App', fontSize: 18, lineHeight: 28, letterSpacing: -0.3, color: "#333333", width: 250, height: 18, borderWidth: 0, borderColor: "#dddddd"
    },
    fontFormSmallGrey: {
        fontFamily: 'Graphik-Regular-App', fontSize: 16, lineHeight: 16, color: "#333333", opacity: 0.5, marginBottom: 19
    },
    fontFormSmallHeader: {
        fontFamily: 'Graphik-Regular-App', fontSize: 14, lineHeight: 26, letterSpacing: -0.3, textTransform: "uppercase", color: "#333333"
    },
    fontFormSmall: {
        fontFamily: 'Graphik-Regular-App', fontSize: 12, lineHeight: 21, textTransform: "uppercase", color: "#333333", opacity: 0.5
    },
    fontBold: {
        fontFamily: 'Graphik-Bold-App', fontWeight: 'bold', fontSize: 24
    },
    fontTitle: {
        fontFamily: 'Graphik-Bold-App', fontWeight: 'bold', fontSize: 24, lineHeight: 30, height: 60, color: '#333333'
    },
    fontTitleGroup: {
        fontFamily: 'Graphik-Bold-App', fontWeight: 'bold', fontSize: 24, lineHeight: 30, height: 90, color: '#333333', paddingTop: 29,
    },
    profileFontTitle: {
        fontFamily: 'Graphik-Bold-App', fontWeight: 'bold', fontSize: 20, height: 75, lineHeight: 65, flex: 3
    },
    fontDetailTop: {
        fontFamily: 'Graphik-Regular-App', fontSize: 14, lineHeight: 16, color: '#333333', opacity: 0.4, paddingTop: 23
    },
    fontDetailMiddle: {
        fontFamily: 'Graphik-Regular-App', fontSize: 16, lineHeight: 22, color: '#333333', opacity: 0.7
    },
    fontDetailBottom: {
        fontFamily: 'Graphik-Regular-App', fontSize: 14, lineHeight: 16, color: '#333333', opacity: 0.5
    },
    fontSliderHeader: {
        fontFamily: 'Graphik-Bold-App', fontWeight: 'bold', fontSize: 16, color: '#000000'
    },
    fontSliderButtons: {
        fontFamily: 'Graphik-Bold-App', fontSize: 16, color: '#F0493E', fontWeight: "bold", padding: 10
    },
    fontStartConversation: {
        fontFamily: 'Graphik-Regular-App', fontSize: 16, color: '#F0493E', padding: 5
    },
    fontOrangeButton: {
        fontFamily: 'Graphik-Regular-App', fontSize: 12, color: '#ffffFF', padding: 10
    },
    fontCourseHeaderBold: {
        fontFamily: 'Graphik-Bold-App',
        fontWeight: "bold",
        fontSize: 30,
        lineHeight: 35,
        textAlign: "center",
        color: "#FFFFFF"
    },
    fontResourceHeaderBold: {
        fontFamily: 'Graphik-Bold-App',
        fontWeight: "bold",
        fontSize: 30,
        lineHeight: 35,
        alignSelf: "center",
        textAlign: "center",
        color: "#FFFFFF",
        width: "100%"
    },
    fontCourseHeader: {
        fontFamily: 'Graphik-Regular-App',
        fontWeight: "normal",
        fontSize: 30,
        lineHeight: 35,
        textAlign: "center",
        color: "#FFFFFF"
    },
    fontCourseHeaderTime: {
        fontFamily: 'Graphik-Regular-App',
        fontWeight: "normal",
        fontSize: 10,
        lineHeight: 35,
        textAlign: "center",
        color: "#FFFFFF"
    },
    fontCourseHeaderDescription: {
        fontFamily: 'Graphik-Regular-App',
        fontWeight: "normal",
        fontSize: 14,
        lineHeight: 35,
        textAlign: "center",
        color: "#FFFFFF"
    },
    fontResourceHeaderDescription: {
        fontFamily: 'Graphik-Regular-App',
        fontWeight: "normal",
        fontSize: 14,
        lineHeight: 35,
        textAlign: "center",
        color: "#FFFFFF",
        width: "100%",
        alignSelf: "center"
    },
    fontConnectWith: {
        fontFamily: 'Graphik-Bold-App',
        fontWeight: "bold",
        fontSize: 20,
        lineHeight: 25,
        color: "#000000",
        letterSpacing: -0.3,
        paddingLeft: 20,
    },
    fontConnectWithName: {
        fontFamily: 'Graphik-Bold-App',
        fontWeight: "bold",
        fontSize: 20,
        lineHeight: 25,
        color: "#000000",
        letterSpacing: -0.3
    },
    fontConnectWithRole: {
        fontFamily: 'Graphik-Regular-App',
        fontSize: 14,
        lineHeight: 22,
        letterSpacing: -0.3,
        color: "#333333",
        paddingBottom: 9,
    },
    groupFormName: {
        fontFamily: "Graphik-Bold-App",
        fontWeight: "bold",
        fontSize: 16,
        lineHeight: 21,
        color: "#333333"
    },
    groupFormRole: {
        fontFamily: "Graphik-Regular-App",
        fontWeight: "normal",
        fontSize: 12,
        lineHeight: 16,
        color: "#333333"
    },
    groupFormDate: {
        fontFamily: "Graphik-Regular-App",
        fontWeight: "400",
        fontSize: 12,
        lineHeight: 16,
        color: "#333333",
        opacity: 0.5
    },
    homePageContainers: {
        flex: 70,
        flexDirection: "column",
        backgroundColor: "#F9FAFC"
    },
    connectWithTopSectionButton: {
        paddingTop: 30,
        paddingBottom: 25
    },
    connectWithSliderButton: {
        padding: 0,
        height: 25,
        borderColor: "#F0493E",
        width: "75%",
        alignItems: "center",
        justifyContent: "center"
    },
    postButton:
    {
        paddingTop: 10,
        paddingBottom: 10,
        alignSelf: "flex-end",
        marginBottom: 20,
        marginLeft: 10,
        marginRight: 10,
        color: "#F0493E",
    },
    postButtonText: {
        color: "#F0493E",
        fontFamily: 'Graphik-Regular-App',
        fontSize: 16,
        padding: 5

    },
    sliderButton:
    {
        // color:'#F0493E'
    },
    flexRow: {
        flexDirection: 'row'
    },
    groupMiddleText: {
        fontFamily: "Graphik-Bold-App",
        fontSize: 20,
        lineHeight: 25,
        letterSpacing: -0.3,
        color: "#333333",
        paddingTop: 48,
        paddingBottom: 12
    },
    groupMiddleTextNoPaddingTop: {
        fontFamily: "Graphik-Bold-App",
        fontSize: 20,
        lineHeight: 25,
        letterSpacing: -0.3,
        color: "#333333",
        paddingTop: 0,
        paddingBottom: 12
    },

    rightCardWidth: {
        minWidth: "100%"
    },

    detailScreenLeftCard: Platform.OS === 'web' ?
        { flex: 30, flexDirection: "column", alignContent: 'flex-start', alignItems: 'flex-start', justifyContent: 'flex-start', paddingLeft: 30, paddingRight: 30, paddingTop: 40, marginLeft: 32, marginRight: 32, marginTop: 30, borderRadius: 4, boxShadow: "0px 5px 30px rgba(0, 0, 0, 0.05)", minHeight: "175vh", width: 446, paddingBottom: 40 } :
        { flex: 30, flexDirection: "column", alignContent: 'flex-start', alignItems: 'flex-start', justifyContent: 'flex-start', paddingLeft: 30, paddingRight: 30, paddingTop: 40, marginLeft: 32, marginRight: 32, marginTop: 30, borderRadius: 4, minHeight: "175vh", width: 446, paddingBottom: 40 }
    ,
    detailScreenRightCard: Platform.OS === 'web' ?
        { flex: 70, flexDirection: "column", alignContent: 'flex-start', alignItems: 'flex-start', justifyContent: 'flex-start', marginLeft: 32, marginRight: 32, marginTop: 30, borderRadius: 4, boxShadow: "0px 5px 30px rgba(0, 0, 0, 0.05)", height: "100%", width: 446, } :
        { flex: 70, flexDirection: "column", alignContent: 'flex-start', alignItems: 'flex-start', justifyContent: 'flex-start', marginLeft: 32, marginRight: 32, marginTop: 30, borderRadius: 4, height: "100%", width: 446, }
    ,
    profileScreenLeftCard: Platform.OS === 'web' ?
        { flex: 30, flexDirection: "column", alignContent: 'flex-start', alignItems: 'flex-start', justifyContent: 'flex-start', paddingLeft: 30, paddingRight: 30, paddingTop: 40, marginLeft: 32, marginRight: 32, marginTop: 0, borderRadius: 4, boxShadow: "0px 5px 30px rgba(0, 0, 0, 0.05)", minHeight: 700, width: 446 } :
        { flex: 30, flexDirection: "column", alignContent: 'flex-start', alignItems: 'flex-start', justifyContent: 'flex-start', paddingLeft: 30, paddingRight: 30, paddingTop: 40, marginLeft: 32, marginRight: 32, marginTop: 0, borderRadius: 4, minHeight: 700, width: 446 }
    ,
    profileScreenRightCard: Platform.OS === 'web' ?
        { flex: 70, flexDirection: "column", alignContent: 'flex-start', alignItems: 'flex-start', justifyContent: 'flex-start', marginLeft: 32, marginRight: 32, marginTop: 0, borderRadius: 4, boxShadow: "0px 5px 30px rgba(0, 0, 0, 0.05)", minHeight: 1500, width: 446, paddingTop: 30, paddingRight: 30, paddingBottom: 30, paddingLeft: 30 } :
        { flex: 70, flexDirection: "column", alignContent: 'flex-start', alignItems: 'flex-start', justifyContent: 'flex-start', marginLeft: 32, marginRight: 32, marginTop: 0, borderRadius: 4, minHeight: 1500, width: 446, paddingTop: 30, paddingRight: 30, paddingBottom: 30, paddingLeft: 30 }
    ,
    myProfileTopButtons: {
        justifyContent: "space-between",
        flexDirection: "row",
        width: "100%",
        flexGrow: 0,
        marginTop: 30,
        paddingLeft: 32,
        paddingRight: 32,
        minHeight: 45
    },
    myProfileImageWrapper: {
        alignSelf: "center",
        marginBottom: 90
    },
    myProfileImage: {
        width: "250px",
        height: "290px",
        borderRadius: 120
    },
    fileInputWrapper: {
        left: 0,
        width: 250,
        top: 310,
        overflow: "hidden",
        position: "absolute"
    },
    myProfilePersonalInfoWrapper: {
        marginBottom: 35,
        alignSelf: "center",
        width: "100%"
    },
    eventAttendeesPictures: {
        flexDirection: "row",
        marginBottom: 20,
        flexGrow: 0,
        flexWrap: "wrap",
    },
    groupAttendeesPictures: {
        flexDirection: "row",
        marginBottom: 20,
        flexGrow: 0,
        flexWrap: "wrap",
    },
    myProfileCoordinates: {
        justifyContent: "space-between",
        flexDirection: "row",
        width: "100%",
        flexGrow: 0,
        marginTop: 30,
        alignSelf: "flex-start",
        height: "2.75rem"
    },
    // dashboardMainContainer: {
    //     height: 2300, 
    //     flex: 1, 
    //     display: "flex", 
    //     flexDirection: "row"
    // },
    dashboardLeftCard: {
        flex: 70,
        flexDirection: "column",
        backgroundColor: "#F9FAFC"
    },
    dashboardRightCard: {
        flex: 30,
        flexDirection: "column"
    },
    myProfileMainContainer: {
        marginBottom: 20, 
        display: "flex", 
        flexDirection: "row"
    },
    myProfileTopButtonsInternalContainer: {
        flex: 6, 
        flexDirection: "row", 
        alignSelf: "flex-end",
        justifyContent: "flex-end"
    },
    myProfileMapSelectorContainer: {
        position: "fixed", 
        left: 0, 
        top: 0, 
        width: "100%", 
        height: "100%", 
        zIndex: 100, 
        backgroundColor: "#33333366"
    },
    myProfileMapSelectorInnerContainer: {
        backgroundColor: "#ffffff", 
        borderRadius: 10, 
        padding: 10, 
        margin: 10, 
        left: "10%", 
        top: "10%", 
        width: "80%", 
        height: "100%"
    },
    myProfileMapSelectorInnerCopyContainer: {
        flexDirection: "row", 
        alignContent: "space-between", 
        alignItems: "center", 
        justifyContent: "center", 
        zIndex: "1000", 
        backgroundColor: "#FFFFFF", 
        paddingLeft: 20, 
        paddingRight: 20, 
        paddingTop: 20, 
        paddingBottom: 20, 
        width: "100%", 
        borderBottomRightRadius: 4
    },
    map: {
        height: "94.5%", 
        width: "98%"
    },
    mapSelectorText: {
        fontFamily: 'Graphik-Regular-App', 
        fontWeight: 'bold', 
        fontSize: 20, 
        marginBottom: 0, 
        marginRight: 20,
        textAlign: "center"
    },
    eventScreenMainContainer: {
        display: "flex", 
        flexDirection: "row", 
        justifyContent: 'flex-start', 
        backgroundColor: "#F9FAFC",
        height: "100%"
    },
    groupScreenMainContainer: {
        display: "flex", 
        flexDirection: "row", 
        justifyContent: 'flex-start', 
        backgroundColor: "#F9FAFC",
        height: "100%"
    },
    eventPageMessageBoard: {
        borderBottomLeftRadius: 0, 
        borderBottomRightRadius: 0, 
        borderTopLeftRadius: 10, 
        borderTopRightRadius: 10, 
        backgroundColor: "#F9FAFC"
    },
    eventPageMessageBoardInnerCard: {
        wordBreak: "break-word",
        marginTop: 0, 
        paddingTop: 0, 
        paddingBottom: 0, 
        borderTopLeftRadius: 0, 
        borderTopRightRadius: 0, 
        borderBottomLeftRadius: 10, 
        borderBottomRightRadius: 10, 
        backgroundColor: "#ffffff",
        fontFamily: "Graphik-Regular-App"
    },
    eventPageMessageBoardLeft: {
        alignSelf: "center"
    },
    eventsScreenLeftContainer: {
        flex: 70, 
        flexDirection: "column", 
        justifyContent: 'flex-start'
    },
    eventsScreenRightContainer: {
        flex: 30, 
        flexDirection: "column", 
        alignContent: 'flex-start', 
        alignItems: 'flex-start', 
        justifyContent: 'flex-start'
    },
    eventsScreenMainContainer: {
        display: "flex", 
        flexDirection: "row", 
        justifyContent: 'flex-start'
    },
    groupsScreenMainContainer: {
        display: "flex", 
        flexDirection: "row", 
        justifyContent: 'flex-start'
    },
    groupsScreenLeftContainer: {
        flex: 70, 
        flexDirection: "column", 
        justifyContent: 'flex-start',
    },
    groupsScreenRightContainer: {
        flex: 30, 
        flexDirection: "column", 
        alignContent: 'flex-start', 
        alignItems: 'flex-start', 
        justifyContent: 'flex-start',
    },
    resourcesScreenMainContainer: {
        display: "flex", 
        flexDirection: "row", 
        justifyContent: 'flex-start'
    },
    resourcesScreenLeftContainer: {
        flex: 70, 
        flexDirection: "column", 
        justifyContent: 'flex-start',
    },
    resourcesScreenRightContainer: {
        flex: 30, 
        flexDirection: "column", 
        alignContent: 'flex-start', 
        alignItems: 'flex-start', 
        justifyContent: 'flex-start',
    },
    ResourcesMyGroups: {
        overflow: "scroll", 
        overflowY: "hidden", 
        minHeight: 375, 
        flexWrap: "nowrap",
        // flexWrap: this.props.wrap ? "wrap" : "nowrap", 
        flexGrow: 1, 
        width: "100%", 
        flexDirection: "row", 
        justifyContent: "flex-start", 
        alignItems: "flex-start"
    },
    profilesScreenMainContainer: {
        display: "flex", 
        flexDirection: "row", 
        justifyContent: 'flex-start'
    },
    profilesScreenLeftContainer: {
        flex: 70, 
        flexDirection: "column", 
        justifyContent: 'flex-start'
    },
    profilesScreensRightContainer: {
        flex: 30, 
        flexDirection: "column", 
        alignContent: 'flex-start', 
        alignItems: 'flex-start', 
        justifyContent: 'flex-start'
    },
    resourcesOverviewScreenMainContainer: {
        display: "flex", 
        flexDirection: "row", 
        justifyContent: 'flex-start',
        height: "100%",
        // backgroundColor: "#F9FAFC"
    },
    resourceContentMainContainer:{
        display: "flex", 
        flexDirection: "row", 
        justifyContent: 'flex-start',
        backgroundColor: "#F9FAFC"
    },
    resourceContentLeftContainer: {
        flex: 70, 
        flexDirection: "column", 
        justifyContent: 'flex-start',
        paddingLeft: 30,
        paddingRight: 0,
        marginLeft: 30,
        marginTop: 30,
        backgroundColor: "#ffffff",
        borderRadius: 4, boxShadow: "0px 5px 30px rgba(0, 0, 0, 0.05)",
        height: 900
    },
    resourceContentRightContainer: {
        flex: 30, 
        flexDirection: "column", 
        justifyContent: 'flex-start',
        paddingLeft: 30,
        paddingRight: 30,
        marginRight: 30,
        marginTop: 30,
        backgroundColor: "#ffffff",
        borderRadius: 4, 
        boxShadow: "0px 5px 30px rgba(0, 0, 0, 0.05)",
        height: 900
    },
    resourceContentCurrentSeriesContainer: {
        overflow: "scroll", 
        minHeight: 375, 
        flexWrap: "nowrap", 
        // flexWrap: this.props.wrap ? "wrap" : "nowrap", 
        flexGrow: 0, 
        width: "100%", 
        flexDirection: 'row', 
        justifyContent: "flex-start", 
        alignItems: "flex-start",
    },
    resourceContentCurrentSeriesCard: {
        padding: "0px", 
        marginLeft: "10px", 
        marginRight: "10px", 
        width: "300px", 
        borderRadius: 4, 
        boxShadow: "0px 5px 30px rgba(0, 0, 0, 0.05)",
        borderColor: "#ffffff",
        minHeight: 275
    },
    resourceContentCurrentSeriesIframeContainer: {
        width: "300px", 
        paddingLeft: "0px", 
        paddingRight: "0px", 
        margin: "0px",
        paddingTop: 0
    },
    resourceContentMoreSeriesContainer: {
        overflow: "scroll", 
        minHeight: 375, 
        flexWrap: "nowrap", 
        // flexWrap: this.props.wrap ? "wrap" : "nowrap", 
        flexGrow: 0, 
        width: "100%", 
        flexDirection: 'row', 
        justifyContent: "flex-start", 
        alignItems: "flex-start",
    },
    resourceContentMoreSeriesCard: {
        padding: "0px", 
        marginLeft: "10px", 
        marginRight: "10px", 
        width: "300px", 
        borderRadius: 4, 
        boxShadow: "0px 5px 30px rgba(0, 0, 0, 0.05)",
        borderColor: "#ffffff",
        flexWrap: "wrap",
        minHeight: 300
    },
    resourceContentMoreSeriesIframeContainer: {
        width: "300px", 
        paddingLeft: "0px", 
        paddingRight: "0px", 
        margin: "0px",
        paddingTop: 0
    },
    resourceContentEpisodeMainContainer: {
        display: "flex", 
        flexDirection: "row", 
        justifyContent: 'flex-start'
    },
    resourceContentEpisodeLeftContainer: {
        flex: 70, 
        flexDirection: "column", 
        justifyContent: 'flex-start',
        paddingLeft: 30,
        paddingRight: 0,
        marginLeft: 30,
        marginTop: 30,
        backgroundColor: "#ffffff",
        borderRadius: 4, boxShadow: "0px 5px 30px rgba(0, 0, 0, 0.05)",
        height: 900
    },
    resourceContentEpisodeRightContainer: {
        flex: 30, 
        flexDirection: "column", 
        justifyContent: 'flex-start',
        paddingLeft: 30,
        paddingRight: 30,
        marginRight: 30,
        marginTop: 30,
        backgroundColor: "#ffffff",
        borderRadius: 4, 
        boxShadow: "0px 5px 30px rgba(0, 0, 0, 0.05)",
        height: 900
    },
    resourceContentEpisodesContainer: {
        overflow: "scroll", 
        minHeight: 375, 
        flexWrap: "nowrap", 
        // flexWrap: this.props.wrap ? "wrap" : "nowrap", 
        flexGrow: 0, 
        width: "100%", 
        flexDirection: 'row', 
        justifyContent: "flex-start", 
        alignItems: "flex-start",
        marginTop: 30
    },
    resourceContentEpisodeCard: {
        padding: "0px", 
        marginLeft: "10px", 
        marginRight: "10px", 
        width: "300px", 
        borderRadius: 4, 
        boxShadow: "0px 5px 30px rgba(0, 0, 0, 0.05)",
        borderColor: "#ffffff",
        flexWrap: "wrap",
        minHeight: 275
    },
    resourceContentEpisodesIframeContainer: {
        width: "300px", 
        paddingLeft: "0px", 
        paddingRight: "0px", 
        margin: "0px",
        paddingTop: 0
    },
    resourcefileInputWrapper: { 
        width: "100%", 
        overflow: "hidden", 
        position: "absolute" 
    },
    resourcefileFieldWrapper: { 
        alignSelf: "center", 
        top: "5vw", 
        width: "50%", 
        overflow: "hidden", 
        position: "absolute" 
    },
    resourceImageIcon: {
        color: "#aaaaaa"
    },
    dashboardConversationCard: {
        minHeight: 50, 
        paddingTop: 28, 
        paddingBottom: 28, 
        borderStyle: "solid", 
        borderColor: "#FFFFFF",
        width: "100%"
    },
    profilesCard: {
        width: "100%", 
        minHeight: 50, 
        borderColor: "#ffffff"
    },
    sectionHeadingDashboard: {
        minHeight: 45, 
        flexGrow: 0, 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginTop: 30, 
        paddingRight: 12
    },
    resourcesOverviewRightCard: {
        display: "inline", 
        marginTop: 10, 
        overflow: "visible", 
        width: "100%"
    },
    myProfileErrorValidation: {
        color: "red",
        fontWeight: "bold",
        flex: .75,
        paddingLeft: 20,
        paddingTop: 5,
    },


    // Media Query Desktop Tablet
    '@media (min-width: 350) and (max-width: 768)': {
        connectWithSliderButton: {
            height: 45,
            paddingTop: 6,
            paddingBottom: 6,
            paddingLeft: 10,
            paddingRight: 10,
            width: "90%"
        },

        connectWithTopSectionButton: {
            paddingTop: 50,
            paddingBottom: 35,
            paddingRight: 15
        },
        fontConnectWithName: {
            fontSize: 18,
            lineHeight: 23,
        },
        rightCardWidth: {
            minWidth: "100%"
        },
        detailScreenLeftCard: {
            marginRight: 10,
            flex: 35,
            minHeight: "50%",
        },
        detailScreenRightCard: {
            marginLeft: 10,
            flex: 65,
        },
        groupNameInput: {
            fontSize: 24,
            lineHeight: 30,
        },
        eventNameInput: {
            fontSize: 24,
            lineHeight: 30,
        },
        myProfileTopButtons: {
            width: "100%",
        },
        profileScreenLeftCard: {
            marginRight: 10,
            flex: 35,
            minHeight: "50%",
        },
        profileScreenRightCard: {
            marginLeft: 10,
            flex: 65
        },
        myProfileImageWrapper: {
            marginBottom: 0
        },
        myProfileImage: {
            width: "200px",
            height: "240px",
            borderRadius: 120
        },
        fileInputWrapper: {
            width: "100%",
            top: 265,
            left: "8%"
        },
        myProfileCoordinates: {
            flexDirection: "column",
            marginBottom: 30,
        },
        myProfilePersonalInfoWrapper: {
            marginBottom: 35,
            alignSelf: "center",
            width: "100%",
            top: 100
        },
        fontFormSmallHeader: {
            marginTop: 100
        },
        resourcefileFieldWrapper: { 
            top: "10vw" 
        },
        dashboardConversationCard:{
            width: "100%"
        },
        myProfileTopButtonsInternalContainer: {
            flex: 3, 
        },
        myProfileErrorValidation: {
            flex: 1,
        },
    },

    // Media Query Desktop Large Tablet
    '@media (min-width: 769) and (max-width: 1024)': {
        connectWithSliderButton: {
            height: 45,
            width: "100%",
        },

        connectWithTopSectionButton: {
            paddingTop: 50,
            paddingBottom: 35,
            paddingRight: 15
        },
        rightCardWidth: {
            minWidth: "100%"
        },
        detailScreenLeftCard: {
            marginRight: 10,
            flex: 40,
        },
        detailScreenRightCard: {
            marginLeft: 10,
        },
        profileScreenLeftCard: {
            marginRight: 10,
            flex: 35,
            minHeight: "50%",
        },
        profileScreenRightCard: {
            marginLeft: 10,
            flex: 65
        },
        myProfileTopButtons: {
            width: "100%",
        },
        resourcefileFieldWrapper: { 
            top: "7vw" 
        },
        dashboardConversationCard:{
            width: "100%",
            paddingRight: 32
        },
        myProfileTopButtonsInternalContainer: {
            flex: 2.5
        },
    },

    '@media (min-width: 320px) and (max-width: 480px)': {
        // rightCardWidth: {
        //     width: "100%"
        // },
        dashboardLeftCard: {
            flexBasis: "auto",
        },
        dashboardRightCard: {
            flexBasis: "auto",
            top: 1150
        },
        myProfileMainContainer: {
            flexDirection: "column"
        },
        myProfileTopButtons: {
            flexDirection: "column",
            width: "100%",
            paddingRight: 32
        },
        myProfileTopButtonsInternalContainer: {
            flex: 0, 
            flexDirection: "column", 
            alignSelf: "auto",
            minWidth: "100%"
        },
        profileFontTitle: {
            minWidth: 300,
            flex: 0 
        },
        profileScreenLeftCard: {
            marginRight: 32,
            flex: 0,
            paddingBottom: 100,
            width: "auto"
        },
        profileScreenRightCard: {
            width: "auto",
            flex: 0,
            top: 50
        },
        myProfileCoordinates: {
            flexDirection: "row",
        },
        myProfileMapSelectorInnerContainer: {
            top: "5%",
            margin: 0,
            height: "90%"
        },
        myProfileMapSelectorInnerCopyContainer: {
            width: "107%",
            right: "3.5%", 
            borderRadius: 0,
            flexDirection: "column",
        },
        mapSelectorText: {
            marginBottom: 15,
            marginRight: 0, 
        },
        eventScreenMainContainer: {
            flexDirection: "column", 
        },
        groupScreenMainContainer: {
            flexDirection: "column",
        },
        detailScreenLeftCard: {
            width: "auto",
            marginRight: 0,
            minHeight: 800,
            marginLeft: 0,
            marginTop: 0,
            flex: 10,
        },
        detailScreenRightCard: {
           width: "auto",
           marginLeft: 0,
           marginRight: 0
        },
        groupNameInput: {
            width: "100%"
        },
        eventNameInput: {
            width: "100%"
        },
        eventPageMessageBoardInnerCard: {
            paddingTop: 5, 
            paddingBottom: 5, 
            fontSize: 15, 
            lineHeight: 20
        },
        eventPageMessageBoard: {
            flexDirection: "column"
        },
        eventPageMessageBoardLeft: {
            alignSelf: "flex-start"
        },
        eventsScreenMainContainer: {
            flexDirection: "column", 
        },
        groupsScreenMainContainer: {
            flexDirection: "column", 
        },
        resourcesScreenMainContainer: {
            flexDirection: "column", 
        },
        ResourcesMyGroups: {
            flexDirection: "column",
            flexWrap: "wrap",
        },
        profilesScreenMainContainer: {
            flexDirection: "column", 
        },
        resourcefileFieldWrapper: { 
            top: "17vw" 
        },
        resourcesOverviewScreenMainContainer: {
            flexDirection: "column"
        },
        resourceContentMainContainer: {
            flexDirection: "column",
            minHeight: 900,
        },
        resourceContentLeftContainer: {
            marginLeft: 0,
            marginTop: 0,
        },
        resourceContentRightContainer: {
            marginRight: 0,
            marginTop: 0,
            top: 300
        },
        resourceContentEpisodeMainContainer: {
            flexDirection: "column", 
            minHeight: 400,
        },
        resourceContentEpisodeLeftContainer: {
            marginLeft: 0,
            marginTop: 0,
        },
        resourceContentEpisodeRightContainer: {
            marginRight: 0,
            marginTop: 0,
            top: 200
        },
        dashboardConversationCard: {
            marginLeft: 10,
        },
        profilesCard: {
            minWidth: 340
        },
        profilesScreenLeftContainer: {
            minHeight: 2000
        },
        fontFormName: {
            textAlign: "left",
        },
        fontFormRole: {
            textAlign: "left",
        },
        fontFormUserType: {
            textAlign: "left",
        },
        myProfileErrorValidation: {
            textAlign: "center",
            paddingLeft: 0,
            paddingBottom: 20
        },
    },

    dashboardMainContainer: Platform.OS === 'web' && Dimensions.get('window').width > 720 ?
        { height: 2300, flex: 1, display: "flex", flexDirection: "row" } :
        { flexDirection: "column", },

    authView: Platform.OS === 'web' && Dimensions.get('window').width > 720 ?
        { left: "40%", width: "40%", top: 100, height: "auto" } :
        { left: "2%", width: "96%", top: "0%", height: "100%" },

    signUpSidebarPanel: Platform.OS === 'web' && Dimensions.get('window').width > 720 ?
        { zIndex: 1, position: "fixed", left: 0, minWidth: 196, width: "25%", height: "100%", top: 0 } :
        { zIndex: 1, position: "relative", left: 0, width: "100%", height: 100 + Constants.statusBarHeight, top: 0 },
    signUpSidebarLogo: { zIndex: 2, position: "absolute", left: 20, width: 156, height: 43, top: Platform.OS === 'web' && Dimensions.get('window').width > 720 ? 20 : 20 + Constants.statusBarHeight },

    signUpSidebarProgress: Platform.OS === 'web' && Dimensions.get('window').width > 720 ?
        { zIndex: 3, position: "fixed", left: 20, width: 20, height: 300, top: "40%" } :
        { zIndex: 3, display: "none", position: "relative", left: 20, width: 20, height: 300, top: "40%" },

    signUpSidebarProgressText1: Platform.OS === 'web' && Dimensions.get('window').width > 720 ?
        { zIndex: 3, position: "absolute", width: "95%", height: "10%", left: "50px", top: "calc(40vh - 18px)", fontFamily: "Graphik-Bold-App", fontSize: 12, lineHeight: 48, color: "#FFFFFF" } :
        { zIndex: 3, position: "absolute", width: "50%", height: "10%", left: "65%", top: 20 + Constants.statusBarHeight, fontFamily: "Graphik-Bold-App", fontSize: 12, lineHeight: 48, color: "#FFFFFF" },
    signUpSidebarProgressText2: Platform.OS === 'web' && Dimensions.get('window').width > 720 ?
        { zIndex: 3, position: "absolute", width: "95%", height: "10%", left: "50px", top: "calc(40vh + 36px)", fontFamily: "Graphik-Bold-App", fontSize: 12, lineHeight: 48, color: "#FFFFFF" } :
        { zIndex: 3, position: "absolute", width: "50%", height: "10%", left: "65%", top: 20 + Constants.statusBarHeight, fontFamily: "Graphik-Bold-App", fontSize: 12, lineHeight: 48, color: "#FFFFFF" },
    signUpSidebarProgressText3: Platform.OS === 'web' && Dimensions.get('window').width > 720 ?
        { zIndex: 3, position: "absolute", width: "95%", height: "10%", left: "50px", top: "calc(40vh + 90px)", fontFamily: "Graphik-Bold-App", fontSize: 12, lineHeight: 48, color: "#FFFFFF" } :
        { zIndex: 3, position: "absolute", width: "50%", height: "10%", left: "65%", top: 20 + Constants.statusBarHeight, fontFamily: "Graphik-Bold-App", fontSize: 12, lineHeight: 48, color: "#FFFFFF" },
    signUpSidebarProgressText4: Platform.OS === 'web' && Dimensions.get('window').width > 720 ?
        { zIndex: 3, position: "absolute", width: "95%", height: "10%", left: "50px", top: "calc(40vh + 144px)", fontFamily: "Graphik-Bold-App", fontSize: 12, lineHeight: 48, color: "#FFFFFF" } :
        { zIndex: 3, position: "absolute", width: "50%", height: "10%", left: "65%", top: 20 + Constants.statusBarHeight, fontFamily: "Graphik-Bold-App", fontSize: 12, lineHeight: 48, color: "#FFFFFF" },
    signUpSidebarProgressText5: Platform.OS === 'web' && Dimensions.get('window').width > 720 ?
        { zIndex: 3, position: "absolute", width: "95%", height: "10%", left: "50px", top: "calc(40vh + 198px)", fontFamily: "Graphik-Bold-App", fontSize: 12, lineHeight: 48, color: "#FFFFFF" } :
        { zIndex: 3, position: "absolute", width: "50%", height: "10%", left: "65%", top: 20 + Constants.statusBarHeight, fontFamily: "Graphik-Bold-App", fontSize: 12, lineHeight: 48, color: "#FFFFFF" },
    signUpSidebarProgressTextView: { zIndex: 3, position: "absolute", width: "100%", height: "100%", left: "0%", top: "0%" },

    signUpSidebarView: Platform.OS === 'web' && Dimensions.get('window').width > 720 ?
        { position: "fixed", width: "25%", height: "100%", left: "0%", top: "0%" } :
        { position: "relative", width: "100%", height: "20%", left: "0%", top: 0 },

    signUpSidebarText: Platform.OS === 'web' && Dimensions.get('window').width > 720 ?
        { zIndex: 3, position: "absolute", width: "80%", height: "10%", left: "10%", top: "40%", fontFamily: "Graphik-Bold-App", fontSize: 20, lineHeight: 30, color: "#FFFFFF" } :
        { display: "none", zIndex: 3, position: "absolute", width: "80%", height: "10%", left: "10%", top: "40%", fontFamily: "Graphik-Bold-App", fontSize: 24, lineHeight: 48, color: "#FFFFFF" },

    signUpProfile: Platform.OS === 'web' && Dimensions.get('window').width > 720 ?
        { position: "absolute", left: "30%", width: "65%", top: 10 } :
        { position: "absolute", left: "2%", width: "96%", top: 100 + Constants.statusBarHeight, height: "100%" },

    signUpScreen1Content: Platform.OS === 'web' && Dimensions.get('window').width > 720 ?
        { position: "absolute", width: "100%" } :
        { position: "absolute", width: "100%", height: "100%", left: 0, top: 0 },
    signUpScreen1PaymentColumn1: Platform.OS === 'web' && Dimensions.get('window').width > 720 ?
        { position: "absolute", left: "35%", width: "25%", top: 100, height: "100%" } :
        {},
    signUpScreen1PaymentColumn2: Platform.OS === 'web' && Dimensions.get('window').width > 720 ?
        { position: "absolute", left: "70%", width: "25%", top: 100, height: "100%" } :
        {},
    signUpScreen1PaymentBody: Platform.OS === 'web' && Dimensions.get('window').width > 720 ?
        { width: "100%", left: 0, top: 0, height: "100%" } :
        { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, flex: 1 },

    fontFormProfileImageButton: {
        backgroundColor: "#F0493E", paddingRight: 10, paddingLeft: 30
    },
    fontFormProfileImageButtonText: {
        fontFamily: 'Graphik-Bold-App', fontWeight: 'bold', fontSize: 12, lineHeight: 12, letterSpacing: -0.3, color: "#FFFFFF"
    },



    fileInputWrapperBtn: Platform.OS === 'web' && Dimensions.get('window').width > 720 ?
        { display: "inline-block", width: 200, height: 40 } :
        {},



})
