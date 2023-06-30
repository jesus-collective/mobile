//import Constants from "expo-constants"
import { Dimensions, Platform } from "react-native"
import EStyleSheet from "react-native-extended-stylesheet"
import courseStyles from "./courseStyles"
import resourceStyles from "./resourceStyles"
const mainColor = "#ffffff"
const Constants = {
  statusBarHeight: 0,
}
export default class MainStyles {
  constructor() {
    this.update()
  }
  static instance: MainStyles = new MainStyles()
  public static getInstance(): MainStyles {
    return this.instance
  }
  style!: EStyleSheet.AnyObject
  updateStyles = (obj: any): void => {
    obj.styles.update()
    obj.forceUpdate()
  }
  update(): void {
    this.style = EStyleSheet.create({
      ...resourceStyles,
      ...courseStyles,

      container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: mainColor,
      },
      groupsJoinCourseModalContainer: {
        overflow: "none",
        height: "100vh",
        width: "100vw",
        position: "absolute",
        top: "0px",
        left: "0px",
      },

      editableRichText: {
        fontFamily: "Graphik-Regular-App",
        fontSize: "16px",
        lineHeight: "26px",
        color: "#333333",
        marginTop: 0,
        paddingTop: 0,
        minHeight: 50,
        paddingRight: 15,
      },

      groupMoreCard: {
        minHeight: 43,
        alignSelf: "flex-start",
        alignItems: "center",
        borderRadius: 4,
        backgroundColor: "#F0493E",
        marginTop: 100,
        padding: "0%",
      },
      nativeMessageBoardContainer: {
        overflow: "visible",
        width: "100%",
        paddingTop: 30,
        paddingLeft: 30,
        paddingRight: 30,
        marginBottom: 60,
      },

      peopleContainer: {
        width: "100%",
        flexDirection: "column",
        alignItems: "flex-start",
        minHeight: 675,
        marginTop: 30,
        borderRadius: 4,
        shadowOffset: { width: 0, height: 0 },
        shadowColor: "rgba(0, 0, 0, 0.05)",
        shadowRadius: 30,
      },
      dashboardPrimaryContainer: Platform.OS === "web" ? { display: "block" } : { display: "flex" },

      profileCard: {
        padding: "0%",
        paddingLeft: "1.5rem",
        paddingRight: "1.5rem",
        borderRadius: 4,
        shadowOffset: { width: 0, height: 5 },
        shadowColor: "rgba(0, 0, 0, 0.15)",
        shadowRadius: 30,
        borderStyle: "solid",
        borderColor: "#FFFFFF",
      },
      eventCard: {
        minHeight: 300,
        alignSelf: "flex-start",
        padding: "0%",
        paddingLeft: "0.25rem",
        paddingRight: "0.25rem",
        borderRadius: 4,
        shadowOffset: { width: 0, height: 5 },
        shadowColor: "rgba(0, 0, 0, 0.45)",
        shadowRadius: 30,
        borderStyle: "solid",
        borderColor: "#FFFFFF",
      },
      groupCard: {
        height: 365,
        alignSelf: "flex-start",
        padding: "0%",
        paddingLeft: "0.25rem",
        paddingRight: "0.25rem",
        borderRadius: 4,
        shadowOffset: { width: 0, height: 5 },
        shadowColor: "rgba(0, 0, 0, 0.45)",
        shadowRadius: 30,
        borderStyle: "solid",
        borderColor: "#FFFFFF",
      },
      conversationCard: {
        minHeight: 50,
        width: "92.5%",
        shadowOffset: { width: 0, height: 5 },
        shadowColor: "rgba(0, 0, 0, 0.45)",
        shadowRadius: 30,
      },
      messageBoardContainer: {
        display: Platform.OS === "web" ? "inline" : "flex",
        overflow: "visible",
        width: "100%",
        paddingTop: 0,
        paddingLeft: 0,
        paddingRight: 0,
        marginBottom: 60,
      },
      messageBoardContainerFullSize: {
        display: Platform.OS === "web" ? "inline" : "flex",
        overflow: "visible",
        width: "100%",
        paddingTop: 0,
        paddingLeft: 30,
        paddingRight: 30,
        marginBottom: 20,
      },

      eventNameInput: {
        borderColor: "white",
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
        width: "100%",
      },
      groupDescriptionInput: {
        borderColor: "white",
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
        width: "100%",
      },

      eventDescriptionInput: {
        borderColor: "white",
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
        marginBottom: 10,
      },
      eventDateInput: {
        padding: 3,
        paddingLeft: 0,
        flex: 0,
        fontSize: 14,
        lineHeight: 16,
        fontFamily: "Graphik-bold-App",
        width: "100%",
        marginBottom: 20,
      },
      eventEditableURL: {
        borderColor: "rgba(155, 166, 175, 0.23)",
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
        width: "100%",
      },

      textInput: {
        height: 40,
        borderColor: "white",
        borderWidth: 1,
        marginTop: 8,
        borderRadius: 5,
        padding: 3,
      },
      tag: {
        backgroundColor: "#fff",
      },
      tagText: {
        color: "#000000",
      },

      font: {
        fontFamily: "Graphik-Regular-App",
        fontSize: 16,
      },
      fontMyMapOptions: {
        fontSize: 14,
        paddingRight: 10,
        marginLeft: 10,
      },
      fontMyMapLegend: {
        fontSize: 14,
        paddingLeft: 5,
      },
      fontMyProfileLeftTop: {
        fontFamily: "Graphik-Regular-App",
        fontSize: 30,
        lineHeight: 36,
        marginBottom: 18,
        marginTop: 18,
      },

      fontFormProfileImageText: {
        position: "absolute",
        left: 10,
        top: 200,
        fontFamily: "Graphik-Regular-App",
        fontSize: 14,
        lineHeight: 22,
        textAlign: "center",
        letterSpacing: -0.3,
        color: "#FFFFFF",
        width: 230,
      },

      fontFormLargeInput: {
        fontFamily: "Graphik-Regular-App",
        fontSize: 16,
        lineHeight: 28,
        letterSpacing: -0.3,
        color: "#333333",
        width: "100%",
        height: 30,
        borderWidth: 0,
        borderColor: "#dddddd",
        overflow: "hidden",
        marginTop: 7,
      },

      profilePrivateInformation: {
        fontFamily: "Graphik-Regular-App",
        fontSize: 14,
        lineHeight: 26,
        letterSpacing: -0.3,
        textTransform: "uppercase",
        color: "#333333",
      },

      fontTitle: {
        fontFamily: "Graphik-Bold-App",
        fontWeight: "bold",
        fontSize: 22,
        lineHeight: 30,
        height: 60,
        color: "#333333",
      },
      noCardFontTitle: {
        fontFamily: "Graphik-Bold-App",
        fontWeight: "bold",
        fontSize: 26,
        lineHeight: 30,
        height: 60,
        color: "#333333",
        opacity: 0.6,
        marginLeft: 20,
      },
      loadingFontTitle: {
        fontFamily: "Graphik-Regular-App",
        fontWeight: "normal",
        fontSize: 16,
        lineHeight: 30,
        height: 60,
        color: "#333333",
        marginLeft: 20,
      },
      myMapFontTitle: {
        fontFamily: "Graphik-Bold-App",
        fontWeight: "bold",
        fontSize: 24,
        lineHeight: 30,
        height: 60,
        color: "#333333",
      },
      groupsLoadMoreFont: {
        fontFamily: "Graphik-Bold-App",
        fontWeight: "bold",
        fontSize: 16,
        lineHeight: 24,
        height: "100%",
        color: "#000000",
      },

      fontTitleGroup: {
        fontFamily: "Graphik-Bold-App",
        fontWeight: "bold",
        fontSize: 22,
        lineHeight: 30,
        height: 90,
        color: "#333333",
        paddingTop: 29,
      },

      fontDetailTop: {
        fontFamily: "Graphik-Regular-App",
        fontSize: 14,
        lineHeight: 16,
        color: "#333333",
        opacity: 0.4,
        paddingTop: 23,
        textTransform: "uppercase",
      },
      sponsoredTag: {
        fontFamily: "Graphik-Regular-App",
        fontSize: 14,
        lineHeight: 16,
        color: "#333333",
        opacity: 0.4,
        textTransform: "uppercase",
        marginRight: 8,
        fontWeight: "600",
      },
      myMapFontDetailTop: {
        fontFamily: "Graphik-Regular-App",
        fontSize: 14,
        lineHeight: 16,
        color: "#333333",
        opacity: 0.4,
        paddingTop: 23,
      },
      fontDetailMiddle: {
        fontFamily: "Graphik-Regular-App",
        fontSize: 14,
        lineHeight: 22,
        color: "#333333",
        opacity: 0.7,
      },
      myMapFontDetailMiddle: {
        fontFamily: "Graphik-Regular-App",
        fontSize: 16,
        lineHeight: 22,
        color: "#333333",
        opacity: 0.7,
      },
      fontDetailBottom: {
        fontFamily: "Graphik-Regular-App",
        fontSize: 14,
        lineHeight: 16,
        color: "#333333",
        opacity: 0.5,
      },
      myMapFontDetailBottom: {
        fontFamily: "Graphik-Regular-App",
        fontSize: 14,
        lineHeight: 16,
        color: "#333333",
        opacity: 0.5,
      },

      fontConnectWith: {
        fontFamily: "Graphik-Bold-App",
        fontWeight: "bold",
        fontSize: 20,
        lineHeight: 25,
        color: "#000000",
        letterSpacing: -0.3,
        paddingLeft: 20,
        marginTop: 15,
      },
      fontConnectWithName: {
        fontFamily: "Graphik-Bold-App",
        fontWeight: "bold",
        fontSize: 20,
        lineHeight: 25,
        color: "#000000",
        letterSpacing: -0.3,
        alignSelf: "flex-start",
      },

      fontConnectWithNameMap: {
        fontFamily: "Graphik-Bold-App",
        fontWeight: "bold",
        fontSize: 20,
        lineHeight: 25,
        color: "#000000",
        letterSpacing: -0.3,
        alignSelf: "flex-start",
      },

      fontConnectWithRole: {
        fontFamily: "Graphik-Regular-App",
        fontSize: 14,
        lineHeight: 22,
        letterSpacing: -0.3,
        color: "#333333",
        paddingBottom: 9,
      },
      fontConnectConversation: {
        fontFamily: "Graphik-Regular-App",
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
        color: "#333333",
      },

      groupFormRole: {
        fontFamily: "Graphik-Regular-App",
        fontWeight: "normal",
        fontSize: 12,
        lineHeight: 16,
        color: "#333333",
      },
      groupFormDate: {
        fontFamily: "Graphik-Regular-App",
        fontWeight: "400",
        fontSize: 12,
        lineHeight: 16,
        color: "#333333",
        opacity: 0.5,
      },
      MessageBoardFormDate: {
        fontFamily: "Graphik-Regular-App",
        fontWeight: "400",
        fontSize: 12,
        lineHeight: 16,
        color: "#333333",
        opacity: 0.5,
        marginTop: 3,
      },
      myMapConversationCardRole: {
        fontFamily: "Graphik-Regular-App",
        textTransform: "uppercase",
        fontWeight: "600",
        fontSize: 12,
        lineHeight: 16,
        color: "#333333",
        opacity: 0.6,
        marginTop: 5,
      },
      myMapConversationCardAboutMe: {
        fontFamily: "Graphik-Regular-App",
        fontWeight: "600",
        fontSize: 16,
        lineHeight: 23,
        color: "#333333",
        marginTop: 10,
        flexWrap: "wrap",
      },

      rightCardWidth: {
        minWidth: "100%",
      },
      conversationScreenLeftCard:
        Platform.OS === "web"
          ? {
              flex: 30,
              flexDirection: "column",
              alignContent: "flex-start",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              paddingTop: 20,
              marginLeft: 32,
              marginRight: 32,
              marginTop: 30,
              borderRadius: 4,
              shadowOffset: { width: 0, height: 5 },
              shadowColor: "rgba(0, 0, 0, 0.45)",
              shadowRadius: 30,
              height: "80vh",
              width: 446,
              paddingBottom: 40,
              overflowY: "auto",
            }
          : {
              flex: 30,
              flexDirection: "column",
              alignContent: "flex-start",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              paddingLeft: 30,
              paddingRight: 30,
              paddingTop: 40,
              marginLeft: 32,
              marginRight: 32,
              marginTop: 30,
              borderRadius: 4,
              shadowOffset: { width: 0, height: 5 },
              shadowColor: "rgba(0, 0, 0, 0.45)",
              shadowRadius: 30,
              height: "auto",
              width: 446,
              paddingBottom: 40,
            },

      detailScreenLeftCard:
        Platform.OS === "web"
          ? {
              flex: 30,
              flexDirection: "column",
              alignContent: "flex-start",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              paddingLeft: 30,
              paddingRight: 30,
              paddingTop: 40,
              marginLeft: 32,
              marginRight: 32,
              marginTop: 30,
              borderRadius: 4,
              shadowOffset: { width: 0, height: 5 },
              shadowColor: "rgba(0, 0, 0, 0.05)",
              shadowRadius: 30,
              width: 446,
              paddingBottom: 40,
              height: "auto",
            }
          : {
              flex: 30,
              flexDirection: "column",
              alignContent: "flex-start",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              paddingLeft: 30,
              paddingRight: 30,
              paddingTop: 40,
              marginLeft: 32,
              marginRight: 32,
              marginTop: 30,
              borderRadius: 4,
              width: 446,
              paddingBottom: 40,
              height: "auto",
            },
      detailScreenRightCard:
        Platform.OS === "web"
          ? {
              flex: 70,
              flexDirection: "column",
              alignContent: "flex-start",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              marginLeft: 32,
              marginRight: 32,
              marginTop: 30,
              borderRadius: 4,
              shadowOffset: { width: 0, height: 5 },
              shadowColor: "rgba(0, 0, 0, 0.05)",
              shadowRadius: 30,
              height: "auto",
              width: 446,
            }
          : {
              flex: 70,
              flexDirection: "column",
              alignContent: "flex-start",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              marginLeft: 32,
              marginRight: 32,
              marginTop: 30,
              borderRadius: 4,
              height: "auto",
              width: 446,
            },
      conversationsScreenRightCard:
        Platform.OS === "web"
          ? {
              flex: 70,
              flexDirection: "column",
              alignContent: "flex-start",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              marginLeft: 32,
              marginRight: 32,
              marginTop: 30,
              borderRadius: 4,
              shadowOffset: { width: 0, height: 5 },
              shadowColor: "rgba(0, 0, 0, 0.45)",
              shadowRadius: 30,
              height: "80vh",
              width: 446,
            }
          : {
              flex: 70,
              flexDirection: "column",
              alignContent: "flex-start",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              marginLeft: 32,
              marginRight: 32,
              marginTop: 30,
              borderRadius: 4,
              height: "auto",
              width: 446,
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

      dashboardLeftCard: {
        flex: 70,
        flexDirection: "column",
        backgroundColor: "#F9FAFC",
      },
      dashboardRightCard: {
        flex: 25,
        flexDirection: "column",
      },

      map: {
        height: "94.5%",
        width: "98%",
      },

      eventScreenMainContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        backgroundColor: "#F9FAFC",
        height: "100%",
      },
      conversationScreenMainContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        backgroundColor: "#F9FAFC",
        height: "100%",
      },

      groupScreenMainContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        backgroundColor: "#F9FAFC",
        height: "100%",
      },

      eventPageMessageBoard: {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: "#F9FAFC",
      },

      eventPageMessageBoardInnerCard:
        Platform.OS === "web"
          ? {
              wordBreak: "break-word",
              marginTop: 0,
              paddingTop: 0,
              paddingBottom: 0,
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              backgroundColor: "#ffffff",
              fontFamily: "Graphik-Regular-App",
              fontSize: 16,
              lineHeight: 22,
              paddingLeft: 100,
            }
          : {
              marginTop: 0,
              paddingTop: 0,
              paddingBottom: 0,
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              backgroundColor: "#ffffff",
              fontFamily: "Graphik-Regular-App",
              fontSize: 16,
              lineHeight: 22,
            },
      coursePageMessageBoardInnerCard:
        Platform.OS === "web"
          ? {
              wordBreak: "break-word",
              marginTop: 0,
              paddingTop: 15,
              paddingBottom: 15,
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              backgroundColor: "#ffffff",
              fontFamily: "Graphik-Regular-App",
              fontSize: 16,
              lineHeight: 22,
              paddingLeft: 100,
            }
          : {
              marginTop: 0,
              paddingTop: 15,
              paddingBottom: 15,
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              backgroundColor: "#ffffff",
              fontFamily: "Graphik-Regular-App",
              fontSize: 16,
              lineHeight: 22,
            },
      eventPageMessageBoardLeft: {
        alignSelf: "center",
      },

      eventsScreenLeftContainer: {
        flex: 70,
        flexDirection: "column",
        justifyContent: "flex-start",
      },
      eventsScreenRightContainer: {
        flex: 30,
        flexDirection: "column",
        alignContent: "flex-start",
        alignItems: "flex-start",
        justifyContent: "flex-start",
      },
      eventsScreenMainContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
      },
      groupsScreenMainContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
      },
      groupsScreenLeftContainer: {
        flex: 70,
        flexDirection: "column",
        justifyContent: "flex-start",
      },
      groupsScreenRightContainer: {
        flex: 30,
        flexDirection: "column",
        alignContent: "flex-start",
        alignItems: "flex-start",
        justifyContent: "flex-start",
      },

      profileMyGroupsWrap: {
        flexWrap: "wrap",
        flexGrow: 1,
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start",
      },
      profilesScreenMainContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
      },
      profilesScreenLeftContainer: {
        flex: 70,
        flexDirection: "column",
        justifyContent: "flex-start",
      },
      profilesScreensRightContainer: {
        flex: 30,
        flexDirection: "column",
        alignContent: "flex-start",
        alignItems: "flex-start",
        justifyContent: "flex-start",
      },

      dashboardConversationCard: {
        paddingTop: 28,
        paddingBottom: 28,
        borderStyle: "solid",
        borderColor: "#FFFFFF",
        width: "100%",
        paddingRight: 30,
        paddingLeft: 0,

        borderBottomWidth: 1,
        borderBottomStyle: "solid",
        borderBottomColor: "#ebebeb",
      },

      dashboardConversationCardLeft: {
        flexDirection: "row",
      },

      dashboardConversationBody: {
        width: "100%",
        marginLeft: 0,
      },
      myMapDashboardConversationCard: {
        paddingTop: 20,
        paddingBottom: 20,
        width: 500,
        backgroundColor: "#FFFFFF",
        opacity: 0.9,
      },
      profilesCard: {
        width: "100%",
        minHeight: "50px",
        borderColor: "#ffffff",
      },
      sectionHeadingDashboard: {
        minHeight: 45,
        flexGrow: 0,
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 30,
        paddingRight: 12,
      },

      myMapCalloutEventContainer: {
        height: 233,
        paddingTop: 20,
        paddingBottom: 20,
        width: 500,
        backgroundColor: "#FFFFFF",
        opacity: 0.9,
      },
      myMapCalloutEventName: {
        height: 50,
      },
      myMapCalloutEventDescription: {
        height: 50,
      },

      conversationsCard: {
        alignSelf: "flex-start",
      },

      myprofileMyRoleContainer: {
        marginBottom: 15,
        width: "100%",
        // marginTop: 80
      },

      headerLeft: {
        flex: 0,
      },
      headerMiddleBody: {
        flex: 1,
        flexGrow: 2,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        marginLeft: 25,
      },
      jcDirectoryButton: {
        marginLeft: 20,
        marginVertical: 10,
        paddingHorizontal: 10,
        height: 36,
        borderColor: "#F0493E",
        alignItems: "center",
        justifyContent: "center",
      },

      animatedCircleContainerSideBar: {
        backgroundColor: "#00000000",
        alignSelf: "center",
        marginTop: 75,
      },

      assignmentCheckmark: {
        alignSelf: "center",
      },
      smallProfileImageMBoard: {
        width: "50px",
        height: "66px",
        borderRadius: 120,
        marginRight: 10,
        marginBottom: 15,
        marginLeft: 10,
        top: 30,
      },
      smallProfileImageConversations: {
        width: "50px",
        height: "66px",
        borderRadius: 120,
        marginRight: 10,
        marginBottom: 15,
        marginLeft: 10,
        top: 0,
      },
      small4ProfileImageConversations: {
        width: "30px",
        height: "40px",
        borderRadius: 120,
        marginRight: 10,
        marginBottom: 15,
        marginLeft: 10,
        top: 0,
      },
      eventCreationScreenCreateContainer: {
        flexDirection: "column",
        flexGrow: 0,
      },

      pickerDropDown: {
        width: "75%",
        marginBottom: 15,
        marginTop: 15,
        fontSize: 16,
        height: 30,
        flexGrow: 0,
        paddingTop: 3,
        paddingBottom: 3,
      },

      detailsYoutubeDateText: {
        fontSize: 16,
        lineHeight: 21,
        fontFamily: "Graphik-Regular-App",
        color: "#333333",
        marginTop: 45,
      },

      partnerFriendsLegend: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
        paddingRight: "2%",
        display: "none",
      },
      partnerLegend: {
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 20,
      },
      friendsLegend: {
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 20,
      },
      mapCardBody: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
      },
      mapCardJCButtonContainer: {
        flex: 1,
        flexDirection: "row",
        paddingTop: 10,
      },
      mapCardImage: {
        marginRight: 10,
        alignSelf: "center",
      },
      resourceIcon: {
        color: "#ffffff",
        fontSize: 20,
      },
      dashboardSubNavIcon: {
        color: "FF4438",
        fontSize: 20,
      },
      dashboardSectionSubNav: {
        zIndex: 6000,
        maxHeight: 45,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "flex-start",
      },
      mapTogglesContainer: {
        flex: 1,
        minHeight: 50,
      },
      profileCardContent: {
        paddingTop: 15,
      },

      // Media Query Desktop Tablet
      "@media (min-width: 350) and (max-width: 768)": {
        fontConnectWithName: {
          fontSize: 18,
          lineHeight: 23,
          alignSelf: "center",
          marginTop: 10,
        },
        fontConnectWithNameMap: {
          fontSize: 18,
          lineHeight: 23,
          marginTop: 10,
        },
        rightCardWidth: {
          minWidth: "100%",
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
        conversationsScreenRightCard: {
          marginLeft: 10,
          flex: 65,
        },

        eventNameInput: {
          fontSize: 24,
          lineHeight: 30,
        },

        profilePrivateInformation: {
          marginTop: 25,
        },

        dashboardConversationCard: {
          width: "100%",
        },
        dashboardConversationCardLeft: {
          flexDirection: "column",
          justifyContent: "center",
        },

        myMapFontTitle: {
          fontSize: 22,
          lineHeight: 28,
        },
        myMapFontDetailMiddle: {
          fontSize: 14,
          lineHeight: 20,
        },

        dashboardConversationBody: {
          alignItems: "center",
        },
        fontConnectConversation: {
          textAlign: "center",
        },

        jcDirectoryButton: {
          height: 50,
          paddingTop: 10,
          paddingBottom: 10,
          width: "75%",
        },

        animatedCircleContainerSideBar: {
          marginTop: 40,
          flex: 0.375,
        },

        pickerDropDown: {
          width: "100%",
        },

        icon: {
          color: "#aaaaaa",
          fontSize: 34,
        },
        resourceIcon: {
          color: "#ffffff",
          fontSize: 20,
        },
        dashboardSubNavIcon: {
          color: "#FF4438",
          fontSize: 20,
        },
        partnerFriendsLegend: {
          flexDirection: "column",
        },
        partnerLegend: {
          paddingLeft: 40,
        },
        friendsLegend: {
          paddingLeft: 40,
        },
      },

      // Media Query Desktop Large Tablet
      "@media (min-width: 769) and (max-width: 1024)": {
        rightCardWidth: {
          minWidth: "100%",
        },
        detailScreenLeftCard: {
          marginRight: 10,
          flex: 40,
        },
        detailScreenRightCard: {
          marginLeft: 10,
        },
        conversationsScreenRightCard: {
          marginLeft: 10,
        },

        dashboardConversationCard: {
          width: "100%",
          paddingRight: 32,
        },
        dashboardConversationCardLeft: {
          flexDirection: "row",
        },

        myMapFontTitle: {
          fontSize: 22,
          lineHeight: 28,
        },
        myMapFontDetailMiddle: {
          fontSize: 14,
          lineHeight: 20,
        },

        animatedCircleContainerSideBar: {
          marginTop: 40,
          flex: 0.2,
        },

        icon: {
          color: "#aaaaaa",
          fontSize: 28,
        },
        resourceIcon: {
          color: "#ffffff",
          fontSize: 28,
        },
        dashboardSubNavIcon: {
          color: "#FF4438",
          fontSize: 28,
        },
      },

      "@media (min-width: 320px) and (max-width: 720px)": {
        createAccountButtonWrapper:
          Platform.OS === "web"
            ? { position: "absolute", top: "0%", left: "2%", marginTop: 5 }
            : { position: "absolute", top: "0%", left: "2%", marginTop: 5 },

        dashboardLeftCard: {
          flexBasis: "auto",
        },
        dashboardRightCard: {
          flexBasis: "auto",
          top: 2150,
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
          marginRight: 0,
        },
        conversationsScreenRightCard: {
          width: "auto",
          marginLeft: 0,
          marginRight: 0,
          marginTop: 0,
          shadowOffset: "none",
          shadowColor: "none",
          shadowRadius: 0,
        },

        courseMktNameInput: {
          width: "100%",
        },
        eventNameInput: {
          width: "100%",
        },
        eventPageMessageBoardInnerCard: {
          paddingTop: 5,
          paddingBottom: 5,
          fontSize: 15,
          lineHeight: 20,
        },
        eventPageMessageBoard: {
          flexDirection: "column",
        },
        eventPageMessageBoardLeft: {
          alignSelf: "flex-start",
        },
        eventsScreenMainContainer: {
          flexDirection: "column",
        },
        groupsScreenMainContainer: {
          flexDirection: "column",
        },
        profilesScreenMainContainer: {
          flexDirection: "column",
        },
        dashboardConversationCard: {
          marginLeft: 0,
          width: "100vw",
          paddingRight: 10,
          paddingTop: 0,
          paddingBottom: 0,
          marginTop: 0,
          marginBottom: 0,
        },
        dashboardConversationBody: {
          alignItems: "center",
        },
        profilesCard: {
          minWidth: 320,
        },
        profilesScreenLeftContainer: {
          minHeight: 2000,
        },

        myMapCalloutEventContainer: {
          width: 250,
        },

        conversationsCard: {
          maxWidth: 300,
        },

        fontConnectConversation: {
          textAlign: "center",
        },

        headerLeft: {
          flex: 0.3,
        },
        headerMiddleBody: {
          marginLeft: 0,
        },
        jcDirectoryButton: {
          width: "90%",
        },
        smallProfileImageMBoard: {
          display: "none",
        },
        icon: {
          color: "#aaaaaa",
          fontSize: 30,
        },
        resourceIcon: {
          color: "#ffffff",
          fontSize: 30,
          alignSelf: "center",
        },
        dashboardSubNavIcon: {
          color: "#FF4438",
          fontSize: 30,
          alignSelf: "center",
        },
        conversationScreenMainContainer: {
          flexDirection: "column",
        },
        conversationScreenLeftCard: {
          marginTop: 0,
          marginLeft: 0,
          marginRight: 0,
        },
        dashboardConversationCardLeft: {
          flexDirection: "row",
        },

        peopleContainer: {
          shadowOffset: { width: 0, height: 0 },
          shadowColor: "rgba(0, 0, 0, 0.0)",
          shadowRadius: 0,
        },
        mapCardBody: {
          flexDirection: "column",
          alignItems: "center",
        },
        mapCardJCButtonContainer: {
          alignContent: "center",
          flexDirection: "column",
        },
        myMapDashboardConversationCard: {
          width: "auto",
        },
        mapCardImage: {
          marginRight: 0,
        },
        myMapConversationCardRole: {
          textAlign: "center",
        },
        fontConnectWithRole: {
          textAlign: "center",
        },
        dashboardSectionSubNav: {
          marginRight: 10,
        },
        fontMyMapOptions: {
          marginLeft: 0,
          marginBottom: 8,
        },
        mapTogglesContainer: {
          overflow: "scroll",
          marginRight: "4.5%",
        },
        profileCardContent: {
          paddingTop: 0,
        },
        smallProfileImageConversations: {
          marginBottom: 0,
        },
        fontConnectWithNameMap: {
          alignSelf: "center",
        },
        myMapConversationCardAboutMe: {
          alignSelf: "center",
        },
        coursePageMessageBoardInnerCard: {
          paddingLeft: 20,
        },
      },

      dashboardMainContainer:
        Platform.OS === "web" && Dimensions.get("window").width > 720
          ? { height: 2800, flex: 1, display: "flex", flexDirection: "row" }
          : { flexDirection: "column" },

      createAccountButtonWrapper: {
        position: "absolute",
        top: "6%",
        right: "3.5%",
      },

      signUpSidebarLogoOneStory:
        Platform.OS === "web" && Dimensions.get("window").width > 720
          ? {
              zIndex: 2,
              position: "absolute",
              left: 20,
              width: 150,
              height: 33,
              top:
                Platform.OS === "web" && Dimensions.get("window").width > 720
                  ? 120
                  : 20 + Constants.statusBarHeight,
            }
          : {
              zIndex: 2,
              position: "absolute",
              left: 250,
              width: 150,
              height: 33,
              top:
                Platform.OS === "web" && Dimensions.get("window").width > 720
                  ? 120
                  : 30 + Constants.statusBarHeight,
            },
      signUpSidebarPlus:
        Platform.OS === "web" && Dimensions.get("window").width > 720
          ? {
              zIndex: 2,
              fontFamily: "Graphik-Bold-App",
              fontWeight: "bold",
              fontSize: "65px",
              position: "absolute",
              color: "#ffffff",
              left: 75,
              top: 57,
            }
          : {
              zIndex: 2,
              fontFamily: "Graphik-Bold-App",
              fontWeight: "bold",
              fontSize: "45px",
              position: "absolute",
              color: "#ffffff",
              left: 200,
              top: 22,
            },

      signUpScreen1Content:
        Platform.OS === "web" && Dimensions.get("window").width > 720
          ? { position: "absolute", width: "100%" }
          : { position: "absolute", width: "100%", height: "100%", left: 0, top: 0 },

      fontFormProfileImageButton: {
        backgroundColor: "#F0493E",
        paddingRight: 10,
        paddingLeft: 30,
      },
      fontFormProfileImageButtonText: {
        fontFamily: "Graphik-Bold-App",
        fontWeight: "bold",
        fontSize: 12,
        lineHeight: 12,
        letterSpacing: -0.3,
        color: "#FFFFFF",
      },

      fileInputWrapperBtn:
        Platform.OS === "web" && Dimensions.get("window").width > 720
          ? { display: "inline-block", width: 200, height: 40 }
          : {},

      changeNamePasswordContainer: {
        display: "flex",
        flexDirection: Dimensions.get("window").width > 800 ? "row" : "column",
        marginTop: 40,
      },

      changePasswordContainer:
        Dimensions.get("window").width > 800
          ? { marginRight: 20, marginBottom: 0 }
          : { marginRight: 0, marginBottom: 20 },

      changeNamePasswordInput: {
        borderWidth: 1,
        borderColor: "#dddddd",
        width: "100%",
        marginBottom: 15,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        fontFamily: "Graphik-Regular-App",
        fontSize: 16,
        lineHeight: 28,
        minWidth: 240,
      },
    })
  }
}
