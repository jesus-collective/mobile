import Constants from "expo-constants"
import { Dimensions, Platform } from "react-native"
import EStyleSheet from "react-native-extended-stylesheet"
import adminStyles from "./adminStyles"
import courseStyles from "./courseStyles"
import resourceStyles from "./resourceStyles"
const mainColor = "#ffffff"

export default class MainStyles {
  constructor() {
    this.update()
  }
  static instance: MainStyles
  public static getInstance(): MainStyles {
    if (MainStyles.instance == undefined) {
      MainStyles.instance = new MainStyles()
    }

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
      ...adminStyles,
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
      jcModal: {
        position: "fixed",
        backgroundColor: "rgba(0,0,0,0.5)",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderWidth: 0,
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
      mapSelectorView:
        Platform.OS === "web"
          ? {
              position: "fixed",
              left: 0,
              top: 0,
              width: "100%",
              height: "100%",
              zIndex: 100,
              backgroundColor: "#33333366",
            }
          : {
              position: "absolute",
              left: 0,
              top: 0,
              width: "100%",
              height: "100%",
              zIndex: 100,
              backgroundColor: "#33333366",
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

      orgCard: {
        minHeight: 330,
        alignSelf: "flex-start",
        padding: "0%",
        paddingLeft: "0.25rem",
        paddingRight: "0.25rem",
        borderRadius: 4,
        shadowOffset: { width: 0, height: 5 },
        shadowColor: "rgba(0, 0, 0, 0.45)",
        shadowRadius: 30,
      },

      profileCard: {
        padding: "0%",
        paddingLeft: "1.5rem",
        paddingRight: "1.5rem",
        borderRadius: 4,
        shadowOffset: { width: 0, height: 5 },
        shadowColor: "rgba(0, 0, 0, 0.45)",
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
      messageBoardContainer:
        Platform.OS === "web"
          ? {
              display: "inline",
              overflow: "visible",
              width: "100%",
              paddingTop: 0,
              paddingLeft: 0,
              paddingRight: 0,
              marginBottom: 60,
            }
          : {
              display: "flex",
              overflow: "visible",
              width: "100%",
              paddingTop: 0,
              paddingLeft: 0,
              paddingRight: 0,
              marginBottom: 60,
            },
      messageBoardContainerFullSize:
        Platform.OS === "web"
          ? {
              display: "inline",
              overflow: "visible",
              width: "100%",
              paddingTop: 0,
              paddingLeft: 30,
              paddingRight: 30,
              marginBottom: 60,
            }
          : {
              display: "flex",
              overflow: "visible",
              width: "100%",
              paddingTop: 0,
              paddingLeft: 30,
              paddingRight: 30,
              marginBottom: 60,
            },
      groupNameInput: {
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
      fontRegular: {
        fontFamily: "Graphik-Regular-App",
      },

      editableURLText: {
        fontFamily: "Graphik-Bold-App",
        fontSize: 16,
        color: "#ffffff",
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
      fontGroupNameDetailPage: {
        fontSize: 30,
        lineHeight: 36,
        color: "#333333",
        fontFamily: "Graphik-Regular-App",
      },
      saveProfileButton: {
        backgroundColor: "#F0493E",
        textTransform: "capitalize",
      },
      saveProfileButtonText: {
        fontFamily: "Graphik-Bold-App",
        fontWeight: "bold",
        fontSize: 16,
        lineHeight: 24,
        display: "flex",
        alignItems: "center",
        textAlign: "center",
        letterSpacing: -0.3,
        color: "#FFFFFF",
        textTransform: null,
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
      fontFormMandatory: {
        fontFamily: "Graphik-Regular-App",
        fontSize: 26,
        lineHeight: 33,
        color: "#F0493E",
      },
      fontFormName: {
        fontFamily: "Graphik-Bold-App",
        fontSize: 30,
        lineHeight: 36,
        textAlign: "center",
        color: "#333333",
        fontWeight: "bold",
      },
      fontFormText: {
        fontFamily: "Graphik-Regular-App",
        fontSize: 18,
        lineHeight: 25,
        letterSpacing: -0.3,
        color: "#333333",
        opacity: 0.7,
        marginTop: 40,
      },
      fontFormText2: {
        fontFamily: "Graphik-Regular-App",
        fontSize: 18,
        lineHeight: 25,
        letterSpacing: -0.3,
        color: "#333333",
        opacity: 0.7,
        marginTop: 20,
      },
      fontFormRole: {
        fontFamily: "Graphik-Regular-App",
        fontSize: 16,
        lineHeight: 21,
        textAlign: "center",
        color: "#333333",
        opacity: 0.6,
      },
      fontFormUserType: {
        fontFamily: "Graphik-Regular-App",
        fontSize: 14,
        lineHeight: 16,
        textAlign: "center",
        textTransform: "uppercase",
        color: "#333333",
        marginTop: 18,
        marginBottom: 18,
      },
      fontFormAboutMe: {
        fontFamily: "Graphik-Regular-App",
        fontSize: 16,
        lineHeight: 28,
        color: "#333333",
        borderColor: "#dddddd",
        borderWidth: 1,
        height: 40,
        width: "100%",
        paddingBottom: 60,
        paddingLeft: 10,
      },
      fontFormSmallDarkGrey: {
        fontFamily: "Graphik-Regular-App",
        fontSize: 16,
        lineHeight: 26,
        color: "#333333",
        paddingTop: 6,
        width: "100%",
      },

      fontFormSmallDarkGreyCourseTopEditable: {
        fontFamily: "Graphik-Regular-App",
        fontSize: 40,
        lineHeight: 55,
        color: "#333333",
        paddingTop: 30,
        width: "100%",
        marginBottom: 15,
      },
      fontFormSmallDarkGreyCoordinates: {
        fontFamily: "Graphik-Regular-App",
        fontSize: 16,
        lineHeight: 22,
        color: "#333333",
        paddingTop: 5,
        width: "100%",
      },
      fontFormSmallInput: {
        fontFamily: "Graphik-Regular-App",
        fontSize: 14,
        lineHeight: 25,
        letterSpacing: -0.3,
        color: "#333333",
        maxWidth: 250,
        height: 18,
        borderWidth: 0,
        borderColor: "#dddddd",
      },
      fontFormMediumInput: {
        fontFamily: "Graphik-Regular-App",
        fontSize: 16,
        lineHeight: 28,
        letterSpacing: -0.3,
        color: "#333333",
        maxWidth: 350,
        height: 18,
        borderWidth: 0,
        borderColor: "#dddddd",
        overflow: "hidden",
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

      fontFormSmallGrey: {
        fontFamily: "Graphik-Regular-App",
        fontSize: 16,
        lineHeight: 16,
        color: "#333333",
        opacity: 0.5,
        marginBottom: 19,
      },
      fontFormSmallHeader: {
        fontFamily: "Graphik-Regular-App",
        fontSize: 14,
        lineHeight: 26,
        letterSpacing: -0.3,
        textTransform: "uppercase",
        color: "#333333",
      },
      profilePrivateInformation: {
        fontFamily: "Graphik-Regular-App",
        fontSize: 14,
        lineHeight: 26,
        letterSpacing: -0.3,
        textTransform: "uppercase",
        color: "#333333",
      },
      fontFormSmall: {
        fontFamily: "Graphik-Regular-App",
        fontSize: 12,
        lineHeight: 21,
        textTransform: "uppercase",
        color: "#333333",
        opacity: 0.5,
        marginTop: 10,
      },
      fontBold: {
        fontFamily: "Graphik-Bold-App",
        fontWeight: "bold",
        fontSize: 24,
      },
      myprofileAboutMe: {
        fontFamily: "Graphik-Bold-App",
        fontWeight: "bold",
        fontSize: 24,
        marginTop: 60,
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
      conversationsLoadMoreFont: {
        fontFamily: "Graphik-Bold-App",
        fontWeight: "bold",
        fontSize: 16,
        lineHeight: 24,
        height: "100%",
        color: "#ffffff",
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
      profileFontTitle: {
        fontFamily: "Graphik-Bold-App",
        fontWeight: "bold",
        fontSize: 20,
        height: 75,
        lineHeight: 32,
        flex: 3,
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
      fontSliderHeader: {
        fontFamily: "Graphik-Bold-App",
        fontWeight: "bold",
        fontSize: 16,
        color: "#000000",
      },
      fontSliderButtons: {
        fontFamily: "Graphik-Bold-App",
        fontSize: 16,
        color: "#F0493E",
        fontWeight: "bold",
        padding: 10,
      },
      fontStartConversation: {
        fontFamily: "Graphik-Regular-App",
        fontSize: 16,
        color: "#F0493E",
        padding: 5,
      },

      fontOrangeButton: {
        fontFamily: "Graphik-Regular-App",
        fontSize: 12,
        color: "#ffffFF",
        padding: 10,
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
        width: 330,
      },
      homePageContainers: {
        flex: 70,
        flexDirection: "column",
        backgroundColor: "#F9FAFC",
      },
      connectWithTopSectionButton: {
        paddingTop: 30,
        paddingBottom: 25,
      },
      connectWithSliderButton: {
        padding: 0,
        height: "auto",
        borderColor: "#F0493E",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      },

      myMapConnectWithSliderButton: {
        padding: 0,
        height: 25,
        borderColor: "#F0493E",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: 10,
        paddingRight: 10,
      },
      postButton: {
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
        fontFamily: "Graphik-Regular-App",
        fontSize: 16,
        padding: 5,
      },
      sliderButton: {
        // color:'#F0493E'
      },
      flexRow: {
        flexDirection: "row",
        marginTop: 10,
      },
      groupMiddleText: {
        fontFamily: "Graphik-Bold-App",
        fontSize: 20,
        lineHeight: 25,
        letterSpacing: -0.3,
        color: "#333333",
        paddingTop: 48,
        paddingBottom: 12,
        paddingLeft: 0,
      },
      groupMiddleTextNoPaddingTop: {
        fontFamily: "Graphik-Bold-App",
        fontSize: 20,
        lineHeight: 25,
        letterSpacing: -0.3,
        color: "#333333",
        paddingTop: 0,
        paddingBottom: 12,
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
              overflowY: "scroll",
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

      profileScreenLeftCard:
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
              marginTop: 0,
              borderRadius: 4,
              shadowOffset: { width: 0, height: 5 },
              shadowColor: "rgba(0, 0, 0, 0.05)",
              shadowRadius: 30,
              // height: 'auto',
              width: 446,
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
              marginTop: 0,
              borderRadius: 4,
              minHeight: 700,
              width: 446,
            },
      profileScreenRightCard:
        Platform.OS === "web"
          ? {
              flex: 70,
              flexDirection: "column",
              alignContent: "flex-start",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              marginLeft: 32,
              marginRight: 32,
              marginTop: 0,
              borderRadius: 4,
              shadowOffset: { width: 0, height: 5 },
              shadowColor: "rgba(0, 0, 0, 0.05)",
              shadowRadius: 30,
              // minHeight: 1500,
              width: 446,
              paddingTop: 30,
              paddingRight: 30,
              paddingBottom: 30,
              paddingLeft: 30,
            }
          : {
              flex: 70,
              flexDirection: "column",
              alignContent: "flex-start",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              marginLeft: 32,
              marginRight: 32,
              marginTop: 0,
              borderRadius: 4,
              minHeight: 1500,
              width: 446,
              paddingTop: 30,
              paddingRight: 30,
              paddingBottom: 30,
              paddingLeft: 30,
            },
      myProfileTopButtons: {
        justifyContent: "space-between",
        flexDirection: "row",
        width: "100%",
        flexGrow: 0,
        marginTop: 30,
        paddingLeft: 32,
        paddingRight: 32,
        minHeight: 45,
      },
      myProfileImageWrapper: {
        alignSelf: "center",
        marginBottom: 90,
      },
      myProfileImage: {
        width: "250px",
        height: "290px",
        borderRadius: 120,
      },
      fileInputWrapper: {
        left: 0,
        width: 250,
        top: 310,
        overflow: "hidden",
        position: "absolute",
      },
      myProfilePersonalInfoWrapper: {
        marginBottom: 35,
        alignSelf: "center",
        width: "100%",
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
        marginBottom: 80,
        width: "100%",
        flexGrow: 0,
        marginTop: 30,
        alignSelf: "flex-start",
        height: "2.75rem",
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
        backgroundColor: "#F9FAFC",
      },
      dashboardRightCard: {
        flex: 25,
        flexDirection: "column",
      },
      myProfileMainContainer: {
        marginBottom: 20,
        display: "flex",
        flexDirection: "row",
      },
      myProfileTopButtonsInternalContainer: {
        flex: 1,
        flexDirection: "row",
        alignSelf: "flex-end",
        justifyContent: "flex-end",
      },
      myProfileTopButtonsExternalContainer: {
        flexDirection: "column",
      },
      myProfileMapSelectorContainer:
        Platform.OS === "web"
          ? {
              position: "fixed",
              left: 0,
              top: 0,
              width: "100%",
              height: 1955,
              zIndex: 100,
              backgroundColor: "#33333366",
            }
          : {
              position: "relative",
              left: 0,
              top: 0,
              width: "100%",
              height: 1955,
              zIndex: 100,
              backgroundColor: "#33333366",
            },
      myProfileMapSelectorInnerContainer: {
        backgroundColor: "#ffffff",
        borderRadius: 10,
        padding: 10,
        margin: 10,
        left: "10%",
        top: "10%",
        width: "80%",
        height: "40%",
      },
      myProfileMapSelectorInnerCopyContainer: {
        flexDirection: "row",
        alignContent: "space-between",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        backgroundColor: "#FFFFFF",
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
        paddingBottom: 20,
        width: "100%",
        borderBottomRightRadius: 4,
      },
      map: {
        height: "94.5%",
        width: "98%",
      },
      mapSelectorText: {
        fontFamily: "Graphik-Regular-App",
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 0,
        marginRight: 20,
        textAlign: "center",
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
        // overflowX: "scroll",
        // overflowY: "hidden",
        //minHeight: "100vw",
        flexWrap: "wrap",
        flexGrow: 1,
        width: "100%",
        //  height: "100%",
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
        // shadowOffset: { height: 0, width: 6 },
        // shadowRadius: 20,
        // shadowColor: "rgba(0,0,0,0.19)",
        // marginTop: 30,
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
        height: 233,
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

      myProfileErrorValidation: {
        color: "red",
        fontWeight: "bold",
        flex: 0.75,
        paddingLeft: 20,
        textAlign: "right",
        paddingBottom: 20,
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
      myprofilePickerContainer: {
        flexGrow: 0,
        flexDirection: "column",
        alignItems: "center",
      },
      myprofilePickerContainerView: {
        flexDirection: "row",
      },
      myprofileBadgeContainer: {
        flex: 0,
        flexDirection: "row",
        flexWrap: "wrap",
        alignContent: "flex-start",
        top: 20,
        marginBottom: 120,
      },
      myprofileMyRoleContainer: {
        marginBottom: 15,
        width: "100%",
        // marginTop: 80
      },
      myprofilePickerMainContainer: {
        width: "100%",
        alignItems: "flex-start",
        marginTop: 5,
        //flexGrow: 0.5,
      },
      myprofilePicker: {
        height: 45,
        width: 308,
        marginRight: 10,
        borderWidth: 1,
        borderColor: "#dddddd",
      },
      myProfileOrgView: {
        flex: 1,
        flexDirection: "row",
      },
      myProfileOrgTypeInput: {
        borderWidth: 1,
        borderColor: "#dddddd",
        width: 308,
        paddingTop: 8,
        paddingRight: 10,
        paddingBottom: 8,
        paddingLeft: 10,
        fontFamily: "Graphik-Regular-App",
        fontSize: 16,
        lineHeight: 24,
      },

      headerLeft: {
        flex: 0,
      },
      headerMiddleBody: {
        flex: 1,
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
      },
      mapCardJCButtonContainer: {
        flex: 1,
        flexDirection: "column",
        paddingTop: 10,
      },
      mapCardImage: {
        marginRight: 10,
      },
      resourceIcon: {
        color: "#ffffff",
        fontSize: 20,
      },

      // Media Query Desktop Tablet
      "@media (min-width: 350) and (max-width: 768)": {
        confirmationCodeWrapper: { display: "flex", flexDirection: "column" },
        signUpBackButtonWrapper: { position: "absolute", top: "10%", left: "30%" },
        authView2: { left: "37.5%", width: 300, top: "20%", height: "auto" },
        connectWithSliderButton: {
          height: 45,
          paddingTop: 6,
          paddingBottom: 6,
          paddingLeft: 10,
          paddingRight: 10,
          width: "100%",
        },

        connectWithTopSectionButton: {
          paddingTop: 50,
          paddingBottom: 35,
          paddingRight: 15,
        },
        fontConnectWithName: {
          fontSize: 18,
          lineHeight: 23,
          alignSelf: "center",
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

        groupNameInput: {
          fontSize: 24,
          lineHeight: 30,
          width: "50%",
        },

        eventNameInput: {
          fontSize: 24,
          lineHeight: 30,
        },
        myProfileTopButtons: {
          width: "100%",
          flexDirection: "column",
          alignItems: "flex-start",
        },
        profileScreenLeftCard: {
          marginRight: 10,
          flex: 35,
          minHeight: "50%",
        },
        profileScreenRightCard: {
          marginLeft: 10,
          flex: 65,
        },
        myProfileImageWrapper: {
          marginBottom: 0,
        },
        myProfileImage: {
          width: "160px",
          height: "200px",
          borderRadius: 120,
        },
        fileInputWrapper: {
          width: "100%",
          top: 265,
          left: 0,
        },
        myProfileCoordinates: {
          flexDirection: "column",
          marginBottom: 130,
        },
        myProfilePersonalInfoWrapper: {
          marginBottom: 35,
          alignSelf: "center",
          width: "100%",
          top: 100,
        },
        fontFormSmallHeader: {
          marginTop: 100,
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
        myProfileTopButtonsInternalContainer: {
          flex: 3,
        },
        myProfileErrorValidation: {
          flex: 1,
          paddingLeft: 0,
          paddingBottom: 15,
          paddingTop: 0,
          textAlign: "left",
        },
        myMapFontTitle: {
          fontSize: 22,
          lineHeight: 28,
        },
        myMapFontDetailMiddle: {
          fontSize: 14,
          lineHeight: 20,
        },
        fontFormMediumInput: {
          maxWidth: 175,
        },
        fontFormSmallDarkGreyCoordinates: {
          width: "100%",
          marginBottom: 15,
        },
        myProfileTopButtonsExternalContainer: {
          flexDirection: "column",
        },

        myprofilePickerContainerView: {
          flexDirection: "column",
        },
        myprofilePicker: {
          marginBottom: 10,
          width: "75%",
        },
        dashboardConversationBody: {
          alignItems: "center",
        },
        fontConnectConversation: {
          textAlign: "center",
        },

        myProfileOrgView: {
          flexDirection: "column",
        },
        myprofilePickerMainContainer: {
          flexGrow: 0.2,
        },
        profileFontTitle: {
          marginBottom: 15,
        },
        fontFormName: {
          marginTop: 30,
        },
        myProfileOrgTypeInput: {
          width: "100%",
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

        // courseDetailCalendarImage: {
        //     top: 30
        // },
        // detailsYoutubeDateText: {
        //     top: 30,
        // },

        icon: {
          color: "#aaaaaa",
          fontSize: 34,
        },
        resourceIcon: {
          color: "#ffffff",
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
        connectWithSliderButton: {
          height: 45,
          width: "100%",
        },

        connectWithTopSectionButton: {
          paddingTop: 50,
          paddingBottom: 35,
          paddingRight: 15,
        },
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

        profileScreenLeftCard: {
          marginRight: 10,
          flex: 35,
          minHeight: "50%",
        },
        profileScreenRightCard: {
          marginLeft: 10,
          flex: 65,
        },
        myProfileTopButtons: {
          width: "100%",
        },

        dashboardConversationCard: {
          width: "100%",
          paddingRight: 32,
        },
        dashboardConversationCardLeft: {
          flexDirection: "row",
        },
        myProfileTopButtonsInternalContainer: {
          flex: 1,
        },
        myMapFontTitle: {
          fontSize: 22,
          lineHeight: 28,
        },
        myMapFontDetailMiddle: {
          fontSize: 14,
          lineHeight: 20,
        },
        fontFormMediumInput: {
          maxWidth: 287,
        },
        myprofilePickerMainContainer: {
          maxHeight: 300,
        },
        myProfileTopButtonsExternalContainer: {
          flexDirection: "column",
        },
        myProfileOrgView: {
          flexDirection: "column",
        },
        myProfileOrgTypeInput: {
          marginTop: 10,
        },
        myProfileCoordinates: {
          flexDirection: "column",
          marginBottom: 80,
        },
        fontFormSmallDarkGreyCoordinates: {
          width: "100%",
          marginBottom: 15,
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
      },

      "@media (min-width: 320px) and (max-width: 720px)": {
        authView2: { left: "2%", width: "96%", top: "12%", height: "100%" },
        createAccountButtonWrapper: { position: "absolute", top: "0%", left: "2%", marginTop: 5 },
        confirmationCodeWrapper: { display: "flex", flexDirection: "column" },
        signUpBackButtonWrapper: { position: "absolute", top: "0%", left: "5%" },
        // rightCardWidth: {
        //     width: "100%"
        // },
        dashboardLeftCard: {
          flexBasis: "auto",
        },
        dashboardRightCard: {
          flexBasis: "auto",
          top: 2150,
        },
        myProfileMainContainer: {
          flexDirection: "column",
        },
        myProfileTopButtons: {
          flexDirection: "column",
          width: "100%",
          paddingRight: 32,
          alignItems: "center",
        },
        myProfileTopButtonsInternalContainer: {
          flex: 0,
          flexDirection: "column",
          alignSelf: "auto",
          width: 200,
        },
        profileFontTitle: {
          minWidth: 300,
          flex: 0,
          textAlign: "center",
          marginBottom: 20,
        },
        profileScreenLeftCard: {
          marginRight: 0,
          marginLeft: 0,
          flex: 0,
          paddingBottom: 0,
          width: "auto",
          shadowOffset: { width: 0, height: 0 },
          shadowRadius: 0,
          shadowColor: "rgba(0, 0, 0, 0)",
          minHeight: "auto",
        },
        profileScreenRightCard: {
          width: "auto",
          flex: 0,
          top: 0,
          marginLeft: 0,
          marginRight: 0,
          shadowOffset: { width: 0, height: 0 },
          shadowRadius: 0,
          shadowColor: "rgba(0, 0, 0, 0)",
        },
        myProfileCoordinates: {
          flexDirection: "column",
          alignSelf: "flex-start",
          marginBottom: 75,
        },
        myProfileMapSelectorContainer: {
          height: 3210,
        },
        myProfileMapSelectorInnerContainer: {
          top: "5%",
          margin: 0,
          height: "20%",
        },
        myProfileMapSelectorInnerCopyContainer: {
          width: "107%",
          right: "3.5%",
          borderRadius: 0,
          flexDirection: "column",
        },
        myprofilePicker: {
          width: 250,
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
        groupNameInput: {
          width: "100%",
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
        fontFormName: {
          textAlign: "center",
        },
        fontFormRole: {
          textAlign: "center",
        },
        fontFormUserType: {
          textAlign: "center",
        },
        myProfileErrorValidation: {
          textAlign: "center",
          paddingLeft: 0,
          paddingBottom: 20,
        },
        myMapCalloutEventContainer: {
          width: 250,
        },
        fontFormMediumInput: {
          maxWidth: 250,
        },
        conversationsCard: {
          maxWidth: 300,
        },
        myprofilePickerMainContainer: {
          maxHeight: 200,
        },
        myprofileBadgeContainer: {
          top: 30,
        },
        fontConnectConversation: {
          textAlign: "center",
        },
        myProfileOrgView: {
          flexDirection: "column",
        },
        myProfileOrgTypeInput: {
          width: "100%",
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
        connectWithSliderButton: {
          width: "80%",
          alignSelf: "center",
        },
        myProfilePersonalInfoWrapper: {
          top: 0,
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
      },

      dashboardMainContainer:
        Platform.OS === "web" && Dimensions.get("window").width > 720
          ? { height: 2800, flex: 1, display: "flex", flexDirection: "row" }
          : { flexDirection: "column" },

      authView2:
        Platform.OS === "web" && Dimensions.get("window").width > 720
          ? { left: "37.5%", width: 500, top: "20%", height: "auto" }
          : { left: "2%", width: "96%", top: "0%", height: "100%" },

      authView3:
        Platform.OS === "web" && Dimensions.get("window").width > 720
          ? { left: "32.5%", width: 600, top: "15%", height: "auto" }
          : { left: "2%", width: "96%", top: "0%", height: "100%" },

      createAccountButtonWrapper: {
        position: "absolute",
        top: "6%",
        right: "3.5%",
      },

      signUpBackButtonWrapper: {
        position: "absolute",
        top: "6%",
        left: "20%",
      },

      confirmationCodeWrapper: { display: "flex", flexDirection: "row" },

      authView:
        Platform.OS === "web" && Dimensions.get("window").width > 720
          ? { left: "35%", width: "40%", top: 100, height: "auto" }
          : { left: "2%", width: "96%", top: "0%", height: "100%" },

      signUpSidebarPanel:
        Platform.OS === "web" && Dimensions.get("window").width > 720
          ? {
              zIndex: 1,
              position: "fixed",
              left: 0,
              minWidth: 196,
              width: "15%",
              height: "100%",
              top: 0,
            }
          : {
              zIndex: 1,
              position: "relative",
              left: 0,
              width: "100%",
              height: 100 + Constants.statusBarHeight,
              top: 0,
            },
      signUpSidebarLogo: {
        zIndex: 2,
        position: "absolute",
        left: 20,
        width: 156,
        height: 43,
        top:
          Platform.OS === "web" && Dimensions.get("window").width > 720
            ? 20
            : 20 + Constants.statusBarHeight,
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
      signUpSidebarProgress:
        Platform.OS === "web" && Dimensions.get("window").width > 720
          ? { zIndex: 3, position: "fixed", left: 20, width: 20, height: 300, top: "40%" }
          : {
              zIndex: 3,
              display: "none",
              position: "relative",
              left: 20,
              width: 20,
              height: 300,
              top: "40%",
            },

      signUpSidebarProgressText1:
        Platform.OS === "web" && Dimensions.get("window").width > 720
          ? {
              zIndex: 3,
              position: "absolute",
              width: "95%",
              height: "10%",
              left: "50px",
              top: "calc(40vh - 18px)",
              fontFamily: "Graphik-Bold-App",
              fontSize: 12,
              lineHeight: 48,
              color: "#FFFFFF",
            }
          : {
              zIndex: 3,
              position: "absolute",
              width: "50%",
              height: "10%",
              left: "65%",
              top: 20 + Constants.statusBarHeight,
              fontFamily: "Graphik-Bold-App",
              fontSize: 12,
              lineHeight: 48,
              color: "#FFFFFF",
            },
      signUpSidebarProgressText2:
        Platform.OS === "web" && Dimensions.get("window").width > 720
          ? {
              zIndex: 3,
              position: "absolute",
              width: "95%",
              height: "10%",
              left: "50px",
              top: "calc(40vh + 36px)",
              fontFamily: "Graphik-Bold-App",
              fontSize: 12,
              lineHeight: 48,
              color: "#FFFFFF",
            }
          : {
              zIndex: 3,
              position: "absolute",
              width: "50%",
              height: "10%",
              left: "65%",
              top: 20 + Constants.statusBarHeight,
              fontFamily: "Graphik-Bold-App",
              fontSize: 12,
              lineHeight: 48,
              color: "#FFFFFF",
            },
      signUpSidebarProgressText3:
        Platform.OS === "web" && Dimensions.get("window").width > 720
          ? {
              zIndex: 3,
              position: "absolute",
              width: "95%",
              height: "10%",
              left: "50px",
              top: "calc(40vh + 90px)",
              fontFamily: "Graphik-Bold-App",
              fontSize: 12,
              lineHeight: 48,
              color: "#FFFFFF",
            }
          : {
              zIndex: 3,
              position: "absolute",
              width: "50%",
              height: "10%",
              left: "65%",
              top: 20 + Constants.statusBarHeight,
              fontFamily: "Graphik-Bold-App",
              fontSize: 12,
              lineHeight: 48,
              color: "#FFFFFF",
            },
      signUpSidebarProgressText4:
        Platform.OS === "web" && Dimensions.get("window").width > 720
          ? {
              zIndex: 3,
              position: "absolute",
              width: "95%",
              height: "10%",
              left: "50px",
              top: "calc(40vh + 144px)",
              fontFamily: "Graphik-Bold-App",
              fontSize: 12,
              lineHeight: 48,
              color: "#FFFFFF",
            }
          : {
              zIndex: 3,
              position: "absolute",
              width: "50%",
              height: "10%",
              left: "65%",
              top: 20 + Constants.statusBarHeight,
              fontFamily: "Graphik-Bold-App",
              fontSize: 12,
              lineHeight: 48,
              color: "#FFFFFF",
            },
      signUpSidebarProgressText5:
        Platform.OS === "web" && Dimensions.get("window").width > 720
          ? {
              zIndex: 3,
              position: "absolute",
              width: "95%",
              height: "10%",
              left: "50px",
              top: "calc(40vh + 198px)",
              fontFamily: "Graphik-Bold-App",
              fontSize: 12,
              lineHeight: 48,
              color: "#FFFFFF",
            }
          : {
              zIndex: 3,
              position: "absolute",
              width: "50%",
              height: "10%",
              left: "65%",
              top: 20 + Constants.statusBarHeight,
              fontFamily: "Graphik-Bold-App",
              fontSize: 12,
              lineHeight: 48,
              color: "#FFFFFF",
            },
      signUpSidebarProgressTextView: {
        zIndex: 3,
        position: "absolute",
        width: "100%",
        height: "100%",
        left: "0%",
        top: "0%",
      },

      signUpSidebarView:
        Platform.OS === "web" && Dimensions.get("window").width > 720
          ? { position: "fixed", width: "15%", height: "100%", left: "0%", top: "0%" }
          : { position: "relative", width: "100%", height: "20%", left: "0%", top: 0 },

      signUpSidebarText:
        Platform.OS === "web" && Dimensions.get("window").width > 720
          ? {
              zIndex: 3,
              position: "absolute",
              width: "80%",
              height: "10%",
              left: "10%",
              top: "40%",
              fontFamily: "Graphik-Bold-App",
              fontSize: 20,
              lineHeight: 30,
              color: "#FFFFFF",
            }
          : {
              display: "none",
              zIndex: 3,
              position: "absolute",
              width: "80%",
              height: "10%",
              left: "10%",
              top: "40%",
              fontFamily: "Graphik-Bold-App",
              fontSize: 24,
              lineHeight: 48,
              color: "#FFFFFF",
            },

      signUpProfile:
        Platform.OS === "web" && Dimensions.get("window").width > 1024
          ? { position: "absolute", left: "15%", width: "85%", top: 10 }
          : Platform.OS === "web" && Dimensions.get("window").width > 768
          ? { position: "absolute", left: "18%", width: "82.5%", top: 10 }
          : Platform.OS === "web" && Dimensions.get("window").width > 720
          ? { position: "absolute", left: "24%", width: "78%", top: 10 }
          : {
              position: "absolute",
              left: "2%",
              width: "96%",
              top: 100 + Constants.statusBarHeight,
              height: "100%",
            },

      signUpScreen1Content:
        Platform.OS === "web" && Dimensions.get("window").width > 720
          ? { position: "absolute", width: "100%" }
          : { position: "absolute", width: "100%", height: "100%", left: 0, top: 0 },
      signUpScreen1PaymentColumn1:
        Platform.OS === "web" && Dimensions.get("window").width > 720
          ? { position: "absolute", left: "7.5%", width: "100%", top: "50vh", height: "100%" }
          : { marginLeft: 20, marginRight: 20 },
      signUpScreen1PaymentColumn2:
        Platform.OS === "web" && Dimensions.get("window").width > 720
          ? { position: "absolute", left: "70%", width: "25%", top: 100, height: "100%" }
          : {},
      signUpScreen1PaymentBody:
        Platform.OS === "web" && Dimensions.get("window").width > 720
          ? { width: "100%", left: 0, top: 0, height: "100%" }
          : { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, flex: 1 },

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
    })
  }
}
