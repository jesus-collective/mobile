import EStyleSheet from "react-native-extended-stylesheet"

const adminStyles = EStyleSheet.create({
  adminCRMTableHeading: {
    fontFamily: "Graphik-Bold-App",
    color: "#ffffff",
  },
  adminCRMTableParagraph: {
    fontFamily: "Graphik-Regular-App",
    color: "#000000",
    paddingLeft: 10,
  },
  adminCRMTableEmailStatus: {
    fontFamily: "Graphik-Regular-App",
    color: "#000000",
    paddingLeft: 10,
  },
  adminCRMModal: {
    fontFamily: "Graphik-Regular-App",
    color: "#000000",
  },
  adminText: {
    fontFamily: "Graphik-Regular-App",
    color: "#000000",
    width: "100%",
    paddingLeft: "3%",
    paddingTop: 30,
  },
  adminCRMModalInvite: {
    fontFamily: "Graphik-Regular-App",
    color: "#000000",
    textAlign: "left",
    width: "100%",
  },
  adminCRMModalInviteEmail: {
    fontFamily: "Graphik-Regular-App",
    color: "#000000",
    textAlign: "left",
    width: "100%",
    marginTop: 8,
    marginBottom: 8,
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: "#767676",
    borderRadius: 3,
    height: 45,
    fontSize: 15,
  },
  adminCRMModalHeading: {
    fontFamily: "Graphik-Bold-App",
    color: "#000000",
    fontSize: 24,
  },
  adminCRMTableContainer: {
    backgroundColor: "#F0493E",
    flex: 1,
    height: 40,
    alignSelf: "stretch",
    flexDirection: "row",
    paddingBottom: 10,
    paddingTop: 10,
    paddingRight: 10,
    paddingLeft: 10,
    width: 1300,
    justifyContent: "center",
  },
  adminCRMTableRow: {
    flex: 3,
    alignSelf: "stretch",
    justifyContent: "center",
  },
  adminCRMTableHeader: {
    flex: 3,
    alignSelf: "stretch",
  },
  adminSubNav: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    right: 15,
  },
  adminSubNavMainContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 25,
    marginBottom: 25,
  },
  adminSubNavTogglesView: {
    flexDirection: "row",
  },
  AdminFirstNameTableHeader: {
    flex: 1,
    alignSelf: "stretch",
  },
  AdminLastNameTableHeader: {
    flex: 1,
    alignSelf: "stretch",
  },
  AdminUserIdTableHeader: {
    flex: 3,
    alignSelf: "stretch",
  },
  AdminPhoneTableHeader: {
    flex: 1,
    alignSelf: "stretch",
  },
  AdminStatusTableHeader: {
    flex: 1,
    alignSelf: "stretch",
  },
  AdminEnabledTableHeader: {
    flex: 1,
    alignSelf: "stretch",
  },
  AdminGroupsTableHeader: {
    flex: 1,
    alignSelf: "stretch",
  },
  AdminPaymentsTableHeader: {
    flex: 1,
    alignSelf: "stretch",
  },
  AdminTableMainContainer: {
    width: "100%",
  },
  AdminTableRowContainer: {
    flex: 1,
    maxHeight: 40,
    alignSelf: "stretch",
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    alignContent: "center",
  },
  AdminFirstNameTableRow: {
    flex: 1,
    alignSelf: "stretch",
    justifyContent: "center",
  },
  AdminLastNameTableRow: {
    flex: 1,
    alignSelf: "stretch",
    justifyContent: "center",
  },
  AdminUserIdTableRow: {
    flex: 3,
    alignSelf: "stretch",
    justifyContent: "center",
  },
  AdminPhoneTableRow: {
    flex: 1,
    alignSelf: "stretch",
    justifyContent: "center",
  },
  AdminStatusTableRow: {
    flex: 1,
    alignSelf: "stretch",
    justifyContent: "center",
  },
  AdminGroupBTTableRow: {
    flex: 1,
    alignSelf: "stretch",
  },
  AdminPaymentBTTableRow: {
    flex: 1,
    alignSelf: "stretch",
  },
  AdminEnabledTableRow: {
    flex: 1,
    alignSelf: "stretch",
    justifyContent: "center",
  },
  "@media (min-width: 350) and (max-width: 768)": {
    adminSubNav: {
      flex: 4,
      justifyContent: "center",
      right: 0,
    },
    adminSubNavTogglesView: {
      flexDirection: "row",
      marginLeft: 15,
      marginRight: 15,
    },
    adminInviteButton: {
      alignItems: "center",
      marginLeft: 20,
    },
    AdminTableMainContainer: {
      overscrollX: "auto",
    },
    adminCRMTableContainer: {
      width: 768,
      alignSelf: "center",
      height: "auto",
      paddingLeft: 50,
      paddingRight: 0,
    },
    adminCRMTableHeader: {
      flex: 1,
    },
    AdminTableRowContainer: {
      alignSelf: "center",
      width: 768,
      marginTop: 30,
      marginBottom: 30,
      paddingLeft: 40,
    },
    adminCRMTableRow: {
      flex: 1,
    },
    AdminEnabledTableRow: {
      paddingLeft: 10,
    },
    adminCRMTableParagraph: {
      paddingRight: 20,
    },
    AdminUserIdTableHeader: {
      flex: 1,
    },
    AdminUserIdTableRow: {
      flex: 1,
    },
    AdminGroupBTTableRow: {
      left: 15,
    },
    AdminPaymentBTTableRow: {
      left: 25,
    },
  },
  "@media (min-width: 769) and (max-width: 1024)": {
    adminCRMTableContainer: {
      width: 1000,
    },

    adminCRMTableParagraph: {
      fontSize: 14,
    },
    adminCRMTableEmailStatus: {
      fontSize: 14,
      paddingLeft: 0,
    },
    adminCRMTableRow: {
      flex: 2.5,
    },
    adminCRMTableHeader: {
      flex: 2.5,
    },

    adminSubNav: {
      justifyContent: "center",
      right: 0,
    },
    AdminGroupBTTableRow: {
      left: 15,
    },
    AdminPaymentBTTableRow: {
      left: 25,
    },
  },
  "@media (min-width: 320px) and (max-width: 720px)": {
    adminSubNavTogglesView: {
      flexDirection: "column",
    },
    adminCRMTableContainer: {
      width: "100vw",
      paddingRight: 10,
      paddingLeft: 10,
    },
    adminInviteButton: {
      marginLeft: 0,
    },
    AdminTableRowContainer: {
      width: "100vw",
      paddingLeft: 0,
      maxHeight: 80,
    },
    adminCRMTableHeading: {
      fontSize: 14,
    },
    adminCRMTableParagraph: {
      paddingRight: 10,
    },
    adminCRMTableHeader: {
      alignSelf: "center",
    },
    AdminGroupsTableHeader: {
      alignSelf: "center",
    },
    AdminPaymentsTableHeader: {
      alignSelf: "center",
    },
    adminSubNav: {
      overflowX: "scroll",
      justifyContent: "flex-start",
      marginLeft: 10,
    },
    AdminUserIdTableHeader: {
      alignSelf: "center",
    },
    AdminGroupBTTableRow: {
      alignSelf: "center",
    },
    AdminPaymentBTTableRow: {
      alignSelf: "center",
    },
  },
})
export default adminStyles
