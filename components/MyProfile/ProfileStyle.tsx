import { Platform } from "react-native"

export const ProfileStyle = {
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
  /*    myProfileTopButtons: {
      flexDirection: "column",
      alignItems: "flex-start",
    },

    myProfileTopButtons: {
      flexDirection: "column",
      alignItems: "center",
    },
*/
  profileFontTitle: {
    fontFamily: "Graphik-Bold-App",
    fontWeight: "bold",
    fontSize: 20,
    height: 75,
    lineHeight: 32,
    flex: 3,
  },
  /*   profileFontTitle: {
      marginBottom: 15,
    },
    profileFontTitle: {
      minWidth: 300,
      flex: 0,
      textAlign: "center",
      marginBottom: 20,
    },*/

  myProfileTopButtonsExternalContainer: {
    flexDirection: "column",
  },

  myProfileErrorValidation: {
    color: "red",
    fontWeight: "bold",
    flex: 0.75,
    paddingLeft: 20,
    textAlign: "right",
    paddingBottom: 20,
  },
  /*  myProfileErrorValidation: {
      flex: 1,
      paddingLeft: 0,
      paddingBottom: 15,
      paddingTop: 0,
      textAlign: "left",
    },
    myProfileErrorValidation: {
      textAlign: "center",
      paddingLeft: 0,
      paddingBottom: 20,
    },*/

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
  /*   profileScreenRightCard: {
      marginLeft: 10,
      flex: 65,
    },
    profileScreenRightCard: {
      marginLeft: 10,
      flex: 65,
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
    },*/

  fontFormSmall: {
    fontFamily: "Graphik-Regular-App",
    fontSize: 12,
    lineHeight: 21,
    textTransform: "uppercase",
    color: "#333333",
    opacity: 0.5,
    marginTop: 10,
  },

  fontFormSmallDarkGrey: {
    fontFamily: "Graphik-Regular-App",
    fontSize: 16,
    lineHeight: 26,
    color: "#333333",
    paddingTop: 6,
    width: "100%",
  },
  fontBold: {
    fontFamily: "Graphik-Bold-App",
    fontWeight: "bold",
    fontSize: 24,
  },
  fontRegular: {
    fontFamily: "Graphik-Regular-App",
  },
  myprofilePicker: {
    height: 45,
    width: 308,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#dddddd",
  },
  /*   myprofilePicker: {
      marginBottom: 10,
      width: "75%",
    },
    myprofilePicker: {
      width: 250,
    },*/

  fontFormMandatory: {
    fontFamily: "Graphik-Regular-App",
    fontSize: 26,
    lineHeight: 33,
    color: "#F0493E",
  },

  fontFormRole: {
    fontFamily: "Graphik-Regular-App",
    fontSize: 16,
    lineHeight: 21,
    textAlign: "center",
    color: "#333333",
    opacity: 0.6,
  },
  /*   fontFormRole: {
      textAlign: "center",
    },
*/
  fontFormName: {
    fontFamily: "Graphik-Bold-App",
    fontSize: 30,
    lineHeight: 36,
    textAlign: "center",
    color: "#333333",
    fontWeight: "bold",
  },
  /*  fontFormName: {
      marginTop: 30,
    },
    fontFormName: {
      textAlign: "center",
    },*/
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
  /*  groupNameInput: {
      fontSize: 24,
      lineHeight: 30,
      width: "50%",
    },

    groupNameInput: {
      width: "100%",
    },*/
  connectWithSliderButton: {
    padding: 0,
    height: "auto",
    borderColor: "#F0493E",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  /*  connectWithSliderButton: {
      height: 45,
      paddingTop: 6,
      paddingBottom: 6,
      paddingLeft: 10,
      paddingRight: 10,
      width: "100%",
    },
    connectWithSliderButton: {
      height: 45,
      width: "100%",
    },

    connectWithSliderButton: {
      width: "80%",
      alignSelf: "center",
    },
*/
  myprofileAboutMe: {
    fontFamily: "Graphik-Bold-App",
    fontWeight: "bold",
    fontSize: 24,
  },

  myprofilePickerMainContainer: {
    width: "100%",
    alignItems: "flex-start",
    marginTop: 5,
    //flexGrow: 0.5,
  },
  /*  myprofilePickerMainContainer: {
      flexGrow: 0.2,
    },

    myprofilePickerMainContainer: {
      maxHeight: 300,
    },
    myprofilePickerMainContainer: {
      maxHeight: 200,
    },*/

  myProfileTopButtonsInternalContainer: {
    flex: 1,
    flexDirection: "row",
    alignSelf: "flex-end",
    justifyContent: "flex-end",
  },
  /*  myProfileTopButtonsInternalContainer: {
      flex: 3,
    },
    myProfileTopButtonsInternalContainer: {
      flex: 1,
    },
    myProfileTopButtonsInternalContainer: {
      flex: 0,
      flexDirection: "row",
      alignSelf: "auto",
      width: "100%",
    },*/
  myProfileOrgView: {
    flex: 1,
    flexDirection: "row",
  },
  /*  myProfileOrgView: {
      flexDirection: "column",
    },

    myProfileOrgView: {
      flexDirection: "column",
    },
    myProfileOrgView: {
      flexDirection: "column",
    },
*/
  fileInputWrapper: {
    left: 0,
    width: 250,
    top: 310,
    overflow: "hidden",
    position: "absolute",
  },

  /*   fileInputWrapper: {
      position: "static",
      width: "100%",
      top: 265,
      left: 0,
    },
*/
  myprofilePickerContainer: {
    flexGrow: 0,
    flexDirection: "column",
    alignItems: "center",
  },
  myprofilePickerContainerView: {
    flexDirection: "row",
  },
  /*   myprofilePickerContainerView: {
      flexDirection: "column",
    },*/
  fontFormAboutMe: {
    fontFamily: "Graphik-Regular-App",
    fontSize: 16,
    lineHeight: 28,
    color: "#333333",
    borderColor: "#dddddd",
    borderWidth: 1,
    height: 80,
    width: "100%",
    paddingBottom: 60,
    paddingLeft: 10,
  },
  fontFormSmallGrey: {
    fontFamily: "Graphik-Regular-App",
    fontSize: 16,
    lineHeight: 16,
    color: "#333333",
    opacity: 0.5,
    marginBottom: 19,
  },
  myProfileMainContainer: {
    marginBottom: 20,
    display: "flex",
    flexDirection: "row",
  },
  /*   myProfileMainContainer: {
      flexDirection: "column",
    },*/

  fontFormSmallDarkGreyCoordinates: {
    fontFamily: "Graphik-Regular-App",
    fontSize: 16,
    lineHeight: 22,
    color: "#333333",
    paddingTop: 5,
    width: "100%",
  },
  /*  fontFormSmallDarkGreyCoordinates: {
      width: "100%",
      marginBottom: 15,
    },

    fontFormSmallDarkGreyCoordinates: {
      width: "100%",
      marginBottom: 15,
    },*/

  myProfileImage: {
    width: "250px",
    height: "290px",
    borderRadius: 120,
  },
  /*   myProfileImage: {
      width: "160px",
      height: "200px",
      borderRadius: 120,
    },*/

  myProfileImageWrapper: {
    alignSelf: "center",
    marginBottom: 90,
  },

  /*   myProfileImageWrapper: {
      marginBottom: 0,
    },*/

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
  /*  fontFormUserType: {
      textAlign: "center",
    },
*/
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
  /*  myProfileCoordinates: {
      flexDirection: "column",
      marginBottom: 130,
    },
    myProfileCoordinates: {
      flexDirection: "column",
      marginBottom: 80,
    },
    myProfileCoordinates: {
      flexDirection: "column",
      alignSelf: "flex-start",
      marginBottom: 75,
    },*/

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

  /*  profileScreenLeftCard: {
      marginRight: 10,
      flex: 35,
      minHeight: "50%",
    },
    profileScreenLeftCard: {
      marginRight: 10,
      flex: 35,
      minHeight: "50%",
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
    },*/

  myProfilePersonalInfoWrapper: {
    marginBottom: 35,
    alignSelf: "center",
    width: "100%",
  },
  /*  myProfilePersonalInfoWrapper: {
      marginBottom: 35,
      alignSelf: "center",
      width: "100%",
      top: 100,
    },
    myProfilePersonalInfoWrapper: {
      top: 0,
    },*/

  fontStartConversation: {
    fontFamily: "Graphik-Regular-App",
    fontSize: 16,
    color: "#F0493E",
    padding: 5,
  },

  fontFormSmallHeader: {
    fontFamily: "Graphik-Regular-App",
    fontSize: 14,
    lineHeight: 26,
    letterSpacing: -0.3,
    textTransform: "uppercase",
    color: "#333333",
  },
  /*   fontFormSmallHeader: {
      marginTop: 100,
    },
*/
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
  /*  myProfileOrgTypeInput: {
      width: "100%",
    },
    myProfileOrgTypeInput: {
      marginTop: 10,
    },

    myProfileOrgTypeInput: {
      width: "100%",
    },*/

  myprofileBadgeContainer: {
    flex: 0,
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "flex-start",
    top: 20,
    marginBottom: 120,
  },
  /* myprofileBadgeContainer: {
      top: 30,
    },*/

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
  /*
  fontFormMediumInput: {
    maxWidth: 175,
  },
  fontFormMediumInput: {
    maxWidth: 287,
  },

  fontFormMediumInput: {
    maxWidth: 250,
  },*/
}
