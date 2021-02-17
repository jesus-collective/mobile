import { isChrome } from "react-device-detect"
import { Platform } from "react-native"
import EStyleSheet from "react-native-extended-stylesheet"

const courseStyles = EStyleSheet.create({
  courseHomeFileCard: {
    width: "90%",
    borderColor: "#FFFFFF",
    paddingLeft: 30,
    paddingRight: 30,
    shadowOffset: { width: 0, height: 6 },
    shadowColor: "rgba(0, 0, 0, 1)",
    shadowRadius: 20,
    marginTop: 30,
    paddingTop: 30,
    paddingBottom: 30,
  },
  courseHomeTouchableContainer: { zIndex: -1 },
  courseHomeUserEditCard: {
    width: "90%",
    borderColor: "#FFFFFF",
    paddingLeft: 30,
    paddingRight: 30,
    shadowOffset: { width: 0, height: 6 },
    shadowColor: "rgba(0, 0, 0, 1)",
    shadowRadius: 20,
    marginTop: 30,
    paddingTop: 30,
    paddingBottom: 30,
  },
  courseHomeCoachingCard: {
    width: "90%",
    borderColor: "#FFFFFF",
    paddingLeft: 30,
    shadowOffset: { width: 0, height: 6 },
    shadowColor: "rgba(0, 0, 0, 1)",
    shadowRadius: 20,
    marginTop: 15,
    paddingTop: 20,
    paddingBottom: 20,
  },
  courseHomeDeleteTriad: {
    backgroundColor: "#F0493E",
    width: "20px",
    marginTop: 10,
    borderRadius: 5,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
  },
  courseCoachingCard: {
    width: "100%",
    borderColor: "#FFFFFF",
    paddingLeft: 30,
    paddingRight: 30,
    shadowOffset: { width: 0, height: 6 },
    shadowColor: "rgba(0, 0, 0, 1)",
    shadowRadius: 20,
    marginTop: 100,
    paddingTop: 30,
    paddingBottom: 30,
    height: 400,
  },
  courseDetailLessonCardEdit: {
    minHeight: "40px",
    width: "50.5vw",
    borderColor: "#FFFFFF",
    paddingTop: 30,
    paddingRight: 30,
    paddingBottom: 30,
    paddingLeft: 30,
    shadowOffset: { width: 0, height: 6 },
    shadowColor: "rgba(0, 0, 0, 1)",
    shadowRadius: 20,
    marginBottom: 10,
    marginTop: 10,
  },
  courseDetailLessonCardNoEdit: {
    minHeight: "40px",
    width: "50.5vw",
    borderColor: "#FFFFFF",
    paddingTop: 10,
    paddingRight: 30,
    paddingBottom: 10,
    paddingLeft: 30,
    shadowOffset: { width: 0, height: 6 },
    shadowColor: "rgba(0, 0, 0, 1)",
    shadowRadius: 20,
    marginBottom: 10,
    marginTop: 10,
  },
  courseDetailLessonCardCreate: {
    minHeight: "40px",
    maxHeight: "80px",
    width: "50.5vw",
    borderColor: "#FFFFFF",
    paddingTop: 30,
    paddingRight: 30,
    paddingBottom: 50,
    paddingLeft: 30,
    shadowOffset: { width: 0, height: 6 },
    shadowColor: "rgba(0, 0, 0, 1)",
    shadowRadius: 20,
    marginBottom: 30,
  },
  courseCard: {
    minHeight: 330,
    alignSelf: "flex-start",
    padding: "0%",
    paddingLeft: "0.25rem",
    paddingRight: "0.25rem",
    borderRadius: 4,
    shadowOffset: { width: 0, height: 5 },
    shadowColor: "rgba(0, 0, 0, 0.45)",
    shadowRadius: 30,
    borderColor: "#ffffff",
  },
  courseMktNameInput: {
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
  courseMktDescriptionInput: {
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
  courseEditableURL: {
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
  courseDateInput: {
    padding: 3,
    paddingLeft: 0,
    flex: 0,
    fontSize: 14,
    lineHeight: 16,
    fontFamily: "Graphik-bold-App",
    width: "100%",
    marginBottom: 20,
  },
  courseDescriptionInput: {
    borderColor: "white",
    borderWidth: 1,
    marginTop: 0,
    borderRadius: 5,
    padding: 3,
    paddingLeft: 0,
    flex: 0,
    minHeight: "auto",
    fontSize: 16,
    lineHeight: 23,
    fontWeight: "normal",
    fontFamily: "Graphik-Regular-App",
    width: "100%",
    marginBottom: 8,
  },
  courseDetailHeading: {
    fontFamily: "Graphik-Bold-App",
    fontSize: 20,
    lineHeight: 26,
    color: "#333333",
    paddingTop: 12,
  },
  courseFormLargeInput: {
    fontFamily: "Graphik-Regular-App",
    fontSize: 16,
    lineHeight: 28,
    letterSpacing: -0.3,
    color: "#333333",
    width: "90%",
    height: 30,
    borderWidth: 0,
    borderColor: "#dddddd",
    overflow: "hidden",
    marginTop: 7,
  },
  courseDetails: {
    fontFamily: "Graphik-Bold-App",
    fontWeight: "bold",
    fontSize: 24,
    marginTop: 60,
  },
  courseTimeNonEditable: {
    fontFamily: "Graphik-Regular-App",
    fontSize: 16,
    lineHeight: 26,
    color: "#333333",
    paddingTop: 12,
    width: "100%",
    marginTop: 5,
    marginBottom: 5,
    marginRight: 20,
  },
  courseFontStartConversation: {
    color: "#ffffff",
    fontFamily: "Graphik-Regular-App",
    fontSize: 16,
    padding: 10,
    fontWeight: "600",
  },
  fontCourseHeaderBold: {
    fontFamily: "Graphik-Bold-App",
    fontWeight: "400",
    fontSize: 45,
    lineHeight: 45,
    textAlign: "left",
    color: "#FFFFFF",
    marginBottom: 15,
    marginLeft: "5%",
  },

  fontCourseHeader: {
    fontFamily: "Graphik-Regular-App",
    fontWeight: "normal",
    fontSize: 30,
    lineHeight: 25,
    textAlign: "left",
    color: "#FFFFFF",
    marginLeft: "5%",
  },
  fontCourseHeaderTime: {
    fontFamily: "Graphik-Regular-App",
    fontWeight: "normal",
    fontSize: 14,
    lineHeight: 20,
    textAlign: "left",
    color: "#FFFFFF",
    marginLeft: "5%",
    textTransform: "uppercase",
    marginTop: 30,
  },
  fontCourseHeaderDescription: {
    fontFamily: "Graphik-Regular-App",
    fontWeight: "normal",
    fontSize: 20,
    lineHeight: 30,
    textAlign: "left",
    color: "#FFFFFF",
    marginLeft: "5%",
  },
  courseFontConnectWithName: {
    fontFamily: "Graphik-Bold-App",
    fontWeight: "bold",
    fontSize: 20,
    lineHeight: 25,
    color: "#000000",
    letterSpacing: -0.3,
    alignSelf: "center",
    marginBottom: 10,
  },
  courseFontConnectConversation: {
    fontFamily: "Graphik-Regular-App",
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: -0.3,
    color: "#333333",
    paddingBottom: 9,
    alignSelf: "center",
  },
  courseFormName: {
    fontFamily: "Graphik-Bold-App",
    fontWeight: "bold",
    fontSize: 16,
    lineHeight: 21,
    color: "#333333",
  },
  courseHomeConversationButton: {
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 0,
    paddingRight: 0,
    marginBottom: 20,
    marginLeft: 0,
    marginRight: 0,
    //   color:"#F0493E",
    backgroundColor: "#F0493E",
    borderWidth: 1,
    borderColor: "#F0493E",
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0,
    borderRadius: 4,
    justifyContent: "center",
  },
  courseAssignmentScreenLeftCard:
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
          marginLeft: 30,
          marginRight: 32,
          marginTop: 30,
          borderRadius: 4,
          shadowOffset: { width: 0, height: 5 },
          shadowColor: "rgba(0, 0, 0, 0.45)",
          shadowRadius: 30,
          height: "80vh",
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
          marginLeft: 30,
          marginRight: 32,
          marginTop: 30,
          borderRadius: 4,
          shadowOffset: { width: 0, height: 5 },
          shadowColor: "rgba(0, 0, 0, 0.45)",
          shadowRadius: 30,
          height: "80vh",
          width: 446,
          paddingBottom: 40,
        },
  courseAssignmentScreenRightCard:
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
  courseAssignmentMainContainer:
    Platform.OS === "web"
      ? {
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          backgroundColor: "#F9FAFC",
          width: "96%",
          flex: "none",
          height: "auto",
          paddingBottom: 30,
        }
      : {
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          backgroundColor: "#F9FAFC",
          width: "96%",
          height: "auto",
          paddingBottom: 30,
        },
  coursesScreenMainContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    backgroundColor: "#F9FAFC",
    height: "auto",
    paddingBottom: 30,
  },
  coursePageMessageBoard: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: "#F9FAFC",
  },
  coursePageMessageBoardLeftMini: {
    alignSelf: "center",
    flex: 1.5,
  },
  courseConversationCard: {
    paddingTop: 10,
    paddingBottom: 0,
    borderStyle: "solid",
    borderColor: "#FFFFFF",
    width: 200,
    paddingRight: 0,
    paddingLeft: 0,
    shadowOffset: { height: 0, width: 6 },
    shadowRadius: 20,
    shadowColor: "rgba(0,0,0,1)",
    marginTop: 30,
    marginRight: 20,
  },
  courseHomeConversationCard: {
    flexDirection: "column",
  },
  courseSidebarNavTextActive: {
    fontFamily: "Graphik-Regular-App",
    fontSize: 20,
    lineHeight: 28,
    color: "#ffffff",
  },
  courseSidebarNavTextInactive: {
    fontFamily: "Graphik-Regular-App",
    fontSize: 20,
    lineHeight: 28,
    color: "#ffffff",
    opacity: 0.5,
  },
  courseSidebarNavIconActive: {
    marginRight: 12,
    width: "30px",
    height: "30px",
    top: 6,
  },
  courseSidebarNavIconInactive: {
    marginRight: 12,
    width: "30px",
    height: "30px",
    top: 6,
    opacity: 0.5,
  },
  coursesRightCard: {
    flex: 70,
    flexDirection: "column",
    alignContent: "flex-start",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingTop: 30,
    paddingRight: 30,
    paddingBottom: 30,
    paddingLeft: 30,
    height: "auto",
  },
  courseSideBar: {
    flex: 15,
    backgroundColor: "#000000",
    height: "100vh",
  },
  courseDetailJCButtonRegular: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  courseDetailJCButtonMini: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  courseDetailJCButtonAssignments: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginRight: 30,
  },
  courseHeaderContainer: {
    backgroundColor: "#F0493E",
    flex: 32,
  },
  courseHomeMainTextContainer: {
    flex: 80,
    height: 200,
    marginRight: 50,
  },
  courseHomeSyllabusContainer: {
    flexDirection: "row",
  },
  CourseHomeActivityContainer:
    Platform.OS === "web"
      ? {
          flex: 5,
          flexDirection: "row",
          marginTop: 30,
          width: "90%",
          paddingBottom: 50,
          borderBottomWidth: 1,
          borderBottomStyle: "solid",
          borderBottomColor: "#333333",
        }
      : {
          flex: 5,
          flexDirection: "row",
          marginTop: 30,
          width: "90%",
          paddingBottom: 50,
          borderBottomWidth: 1,

          borderBottomColor: "#333333",
        },
  courseHomeCalendar: {
    width: "90%",
    borderColor: "#FFFFFF",
    paddingLeft: 60,
    paddingRight: 60,
    shadowOffset: { width: 0, height: 6 },
    shadowColor: "rgba(0, 0, 0, 0.19)",
    shadowRadius: 20,
    marginTop: 15,
    paddingTop: 20,
    paddingBottom: 20,
  },
  courseHomeMainContainer: {
    flex: 85,
  },
  courseProfileImageButtonsContainer: {
    flexDirection: "column",
    marginTop: 30,
    flex: 20,
  },
  courseHomeLeftContainer: {
    flex: 70,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  courseHomeRightContainer: {
    flex: 30,
    flexDirection: "column",
    alignContent: "flex-start",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  courseDetailLeftContainer: {
    flex: 70,
    flexDirection: "column",
    alignContent: "flex-start",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingRight: 30,
  },
  courseDetailRightContainer: {
    flex: 30,
    flexDirection: "column",
    alignContent: "flex-start",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  courseHomeDescriptionText: {
    marginTop: 30,
    marginLeft: 30,
    marginRight: 30,
    fontFamily: "Graphik-Regular-App",
    fontSize: 20,
    lineHeight: 30,
  },
  courseDetailButtonTrio:
    Platform.OS === "web"
      ? {
          flex: "auto",
          flexDirection: "row",
          alignContent: "flex-end",
          marginTop: 30,
          borderBottomWidth: 1,
          borderBottomStyle: "solid",
          borderBottomColor: "#333333",
          borderBottomOpacity: 0.5,
          width: "100%",
          height: 45,
          paddingHorizontal: 25,
        }
      : {
          flex: "auto",
          flexDirection: "row",
          alignItems: "flex-end",
          marginTop: 30,
          borderBottomWidth: 1,
          borderBottomColor: "#333333",
          borderBottomOpacity: 0.5,
          width: "100%",
          height: 50,
          paddingHorizontal: 25,
        },
  courseMessageBoardButtonsView: {
    marginRight: 10,
  },
  courseDetailActivityCard: {
    flexDirection: "row",
    minHeight: "40px",
    height: "unset",
  },
  courseDetailActivityInnerCard: {
    flexDirection: "column",
    height: "unset",
    width: "unset",
    alignSelf: "center",
    flex: 2,
  },
  courseCheckmark: {
    width: "30px",
    height: "30px",
  },
  courseActivityDetails: {
    flexDirection: "row",
    height: "unset",
    marginBottom: 12,
  },
  courseCompletedCallOut: {
    fontSize: 12,
    lineHeight: 21,
    fontFamily: "Graphik-Bold-App",
    color: "#FFF",
    marginLeft: 30,
    marginRight: 15,
    paddingLeft: 10,
    paddingRight: 10,
    textTransform: "uppercase",
    backgroundColor: "#71C209",
    borderRadius: 50,
    height: 20,
    alignSelf: "center",
  },
  courseActivityButtonEditable: {
    flexDirection: "column",
    marginTop: 10,
    height: "unset",
  },
  courseActivityButtonNonEditable: {
    flexDirection: "column",
    height: "unset",
    marginTop: 15,
    alignSelf: "flex-start",
  },
  courseDetailLessonText: {
    fontSize: 40,
    lineHeight: 55,
    fontFamily: "Graphik-Bold-App",
    color: "#333333",
    marginBottom: 20,
  },
  courseDetailLongDescriptionText: {
    fontFamily: "Graphik-Regular-App",
    fontSize: 16,
    lineHeight: 26,
    color: "#333333",
    marginTop: 0,
    paddingTop: 0,
    minHeight: 50,
    maxHeight: 275,
    overflow: "scroll",
  },
  courseHomeScreenMainContainer: {
    flexDirection: "row",
  },
  courseHomeScreenSubMainContainer: {
    flex: 80,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingLeft: "5%",
  },
  courseMyCohortContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  courseMyFacilitatorContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  courseMyLearningGroupContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  courseProfileImageContainer: {
    paddingTop: 40,
  },
  courseDetailActivityInnerCardCenter: {
    flexDirection: "column",
    flex: 7,
    alignSelf: "center",
    height: "unset",
  },
  courseDetailMainContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingLeft: "5%",
    paddingRight: "2%",
  },
  courseDetailMessageBoardContainer: {
    flex: 95,
    flexDirection: "row",
    marginTop: 10,
    width: "100%",
  },
  courseDetailCourseInfoContainer: isChrome
    ? {
        width: "100%",
        minHeight: "auto",
        height: "unset",
      }
    : {
        width: "100%",
        minHeight: "fit-content",
      },
  courseHomeCourseActivityText: {
    fontSize: 16,
    lineHeight: 25,
    fontFamily: "Graphik-Regular-App",
    marginTop: 15,
  },

  courseWordCountSmall: {
    textAlign: "right",
    marginBottom: 30,
  },
  courseWordCount: {
    textAlign: "right",
    marginBottom: 30,
    marginRight: 30,
  },
  courseSponsorContainer: {
    display: "flex",
    flexDirection: "row",
    width: "105%",
    justifyContent: "space-between",
    flexGrow: 0,
    marginBottom: 20,
    height: 45,
  },
  courseZoomMainContainer: {
    flexDirection: "row",
    marginTop: 30,
    flex: 0.5,
  },
  courseLessonContainer: {
    marginTop: 30,
    minHeight: "auto",
  },
  courseDetailTime: {
    flex: 0.4,
    height: "auto",
    flexDirection: "row",
    marginLeft: 20,
  },
  courseDetailHR: {
    borderBottomColor: "#333333",
    opacity: 0.2,
    borderBottomWidth: 1,
    width: "95%",
    marginBottom: 30,
    marginTop: 50,
  },
  courseHomeCalendarLabels: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-start",
  },
  courseDetailYoutube: {
    flexDirection: "row",
    marginTop: 30,
    flex: 0.5,
  },
  courseDetailHr: {
    borderBottomColor: "#333333",
    opacity: 0.2,
    borderBottomWidth: 1,
    width: "95%",
    marginBottom: 30,
  },
  courseDetailAssignmentTime: {
    flex: 0.4,
    height: "auto",
    flexDirection: "row",
    marginLeft: 20,
  },
  courseDetailAssignmentTime2: {
    flex: 0.4,
    height: "auto",
    flexDirection: "row",
    marginLeft: 20,
  },
  courseDetailMainHeading: {
    flex: 0.6,
    height: "auto",
  },
  courseDetailSidebarTop: {
    flex: 0.6,
    height: "auto",
  },
  courseDetailCalendarImage: {
    width: "22px",
    height: "22px",
    marginRight: 5,
    marginTop: 43,
  },
  courseDetailCalendarText: {
    fontSize: 16,
    lineHeight: 21,
    fontFamily: "Graphik-Regular-App",
    color: "#333333",
    marginTop: 45,
  },
  courseDetailCalendarImage2: {
    width: "22px",
    height: "22px",
    marginRight: 5,
    marginTop: 43,
  },
  courseDetailCalendarText2: {
    fontSize: 16,
    lineHeight: 21,
    fontFamily: "Graphik-Regular-App",
    color: "#333333",
    marginTop: 45,
  },
  courseDetailLeftSide: {
    flex: 70,
    flexDirection: "column",
    alignContent: "flex-start",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  miniMessageBoardRight: {
    flexDirection: "row",
    flex: 7,
    alignItems: "space-between",
    justifyContent: "space-between",
  },
  "@media (min-width: 350) and (max-width: 768)": {
    courseAssignmentScreenRightCard: {
      marginLeft: 30,
      flex: 65,
      width: "auto",
      minHeight: "calc(40vw * 2)",
    },
    courseMktNameInput: {
      fontSize: 24,
      lineHeight: 30,
      width: "100%",
    },
    fontCourseHeaderBold: {
      fontSize: 34,
      lineHeight: 40,
    },
    courseSideBar: {
      flex: 20,
    },
    courseHomeMainContainer: {
      flex: 80,
    },
    courseHeaderContainer: {
      flex: 24,
    },
    courseHomeSyllabusContainer: {
      flexDirection: "column",
    },
    courseProfileImageButtonsContainer: {
      flex: 100,
      marginRight: 30,
    },
    courseHomeLeftContainer: {
      flex: 60,
    },
    courseHomeRightContainer: {
      flex: 40,
    },
    courseHomeMainTextContainer: {
      marginRight: 0,
    },
    courseHomeDescriptionText: {
      marginLeft: 0,
    },
    courseConversationCard: {
      width: "93%",
    },
    courseHomeCalendar: {
      width: "85%",
      paddingLeft: 10,
      paddingRight: 10,
    },
    CourseHomeActivityContainer: {
      flexDirection: "column",
      marginTop: 15,
      paddingBottom: 25,
      flex: 0.75,
    },
    fontCourseHeader: {
      fontSize: 24,
      lineHeight: 30,
    },
    courseDetailLeftContainer: {
      flex: 60,
    },
    courseDetailRightContainer: {
      flex: 40,
    },
    courseDetailButtonTrio: {
      flexDirection: "column",
      paddingBottom: 60,
      borderBottomWidth: 0,
      borderBottomColor: "#ffffff",
    },
    courseDetailJCButtonMini: {
      marginTop: 50,
    },
    coursePageMessageBoard: {
      flexDirection: "column",
    },
    courseFormName: {
      marginTop: 10,
    },
    courseDetailLessonCardNoEdit: {
      width: "40vw",
    },
    courseDetailActivityCard: {
      flexDirection: "column",
    },
    courseDetailActivityInnerCard: {
      flexDirection: "row",
      marginTop: 15,
      alignSelf: "flex-start",
      marginBottom: 8,
    },
    courseCheckmark: {
      marginBottom: 15,
      marginTop: 10,
    },
    courseDetailHeading: {
      textAlign: "left",
    },
    courseActivityDetails: {
      alignSelf: "flex-start",
    },
    courseCompletedCallOut: {
      marginLeft: 0,
      marginRight: 0,
    },
    courseActivityButtonNonEditable: {
      alignSelf: "flex-start",
    },
    courseSidebarNavIconActive: {
      marginRight: 6,
      width: "25px",
      height: "25px",
      top: 5,
    },
    courseSidebarNavIconInactive: {
      marginRight: 6,
      width: "25px",
      height: "25px",
      top: 5,
    },
    courseDetailLessonText: {
      width: "95%",
      marginBottom: 0,
    },
    courseDetailCourseInfoContainer: {
      //maxHeight: 225,
      height: "unset",
    },
    courseDetailActivityInnerCardCenter: {
      width: "100%",
    },
    courseMyCohortContainer: {
      flexWrap: "nowrap",
      overflow: "scroll",
    },
    courseMyFacilitatorContainer: {
      flexWrap: "nowrap",
      overflow: "scroll",
    },
    assignmentCheckmark: {
      alignSelf: "flex-start",
    },
    courseAssignmentMainContainer: {
      flexDirection: "column",
    },
    courseAssignmentScreenLeftCard:
      Platform.OS === "web"
        ? {
            width: "auto",
            overflowY: "none",
            paddingTop: 30,
            paddingBottom: 80,
            marginRight: 30,
            height: "auto",
          }
        : {
            width: "auto",

            paddingTop: 30,
            paddingBottom: 80,
            marginRight: 30,
            height: "auto",
          },
    courseZoomMainContainer: {
      flexDirection: "column",
      flex: 0.4,
    },
    courseDetailTime: {
      flex: 0.4,
      height: "auto",
      marginLeft: 0,
      top: 50,
    },
    courseDetailYoutube: {
      flexDirection: "column",
      flex: 0.4,
    },
    courseDetailHr: {
      flex: 0.1,
    },
    courseDetailAssignmentTime: {
      flex: 0.1,
      marginLeft: 0,
    },
    courseDetailAssignmentTime2: {
      marginLeft: 0,
    },
    courseDetailMainHeading: {
      flex: 0.75,
    },
    courseHomeCalendarLabels: {
      flexDirection: "column",
      marginTop: 15,
    },
    courseDetailMessageBoardContainer: {
      marginTop: 40,
    },
    courseDetailCalendarText: {
      marginTop: 23,
    },
  },
  "@media (min-width: 769) and (max-width: 1024)": {
    courseAssignmentScreenRightCard: {
      marginLeft: 10,
    },
    courseSidebarNavIconActive: {
      marginRight: 8,
    },
    courseSidebarNavIconInactive: {
      marginRight: 8,
    },
    courseHeaderContainer: {
      flex: 18,
    },
    courseHomeMainTextContainer: {
      marginRight: 0,
    },
    courseHomeSyllabusContainer: {
      flex: 0.4,
    },
    courseConversationCard: {
      width: "93%",
    },
    CourseHomeActivityContainer: {
      flex: 0,
    },
    courseHomeCalendar: {
      width: "85%",
      paddingLeft: 20,
      paddingRight: 20,
    },
    courseDetailButtonTrio: {
      flex: 2,
      marginBottom: 70,
      flexDirection: "column",
      borderBottomWidth: 0,
      borderBottomColor: "#ffffff",
    },
    coursePageMessageBoard: {
      flexDirection: "column",
    },
    courseFormName: {
      marginTop: 10,
    },
    courseMessageBoardButtonsView: {
      marginTop: 40,
    },
    courseDetailActivityInnerCard: {
      flex: 3,
    },
    courseDetailActivityInnerCardCenter: {
      flex: 6,
    },
    courseDetailLessonCardNoEdit: {
      paddingLeft: 20,
      paddingRight: 20,
    },
    courseDetailCourseInfoContainer: {
      //maxHeight: 225,
      height: "unset",
    },
    courseWordCount: {
      marginRight: 10,
    },
    courseDetailJCButtonAssignments: {
      marginRight: 10,
    },
    courseAssignmentScreenLeftCard: {
      flex: 35,
    },
    courseDetailTime: {
      flex: 0.6,
      marginLeft: 0,
    },
    courseDetailHR: {
      flex: 0,
    },
    courseHomeCalendarLabels: {
      flexDirection: "column",
      marginTop: 15,
    },
    courseTimeNonEditable: {
      marginTop: 0,
      paddingTop: 0,
    },
    courseZoomMainContainer: {
      flexDirection: "column",
    },
  },
  "@media (min-width: 769px) and (max-width: 1279px)": {
    courseDetailButtonTrio: {
      flex: 2,
    },
  },
  "@media (min-width: 320px) and (max-width: 720px)": {
    coursesScreenMainContainer: {
      flexDirection: "column",
    },
    courseAssignmentScreenRightCard: {
      width: "auto",
      marginLeft: 15,
      marginRight: 15,
      minHeight: "calc(60vw * 2)",
    },
    coursePageMessageBoard: {
      flexDirection: "row",
    },
    fontCourseHeaderBold: {
      fontSize: 40,
      lineHeight: 42,
      marginRight: "5%",
    },
    courseHeaderContainer: {
      display: "none",
    },
    fontCourseHeaderDescription: {
      marginRight: "5%",
      lineHeight: 30,
    },
    courseHomeScreenMainContainer: {
      flexDirection: "column",
    },
    fontCourseHeaderTime: {
      marginBottom: 5,
    },
    courseSideBar: {
      flex: 8,
    },
    courseHomeScreenSubMainContainer: {
      flexDirection: "column",
      paddingRight: "5%",
    },
    courseMyCohortContainer: {
      flexWrap: "nowrap",
      overflow: "scroll",
    },
    courseMyFacilitatorContainer: {
      flexWrap: "nowrap",
      overflow: "scroll",
    },
    courseMyLearningGroupContainer: {
      flexWrap: "nowrap",
      overflow: "scroll",
    },
    courseProfileImageContainer: {
      marginTop: 700,
    },
    courseHomeDescriptionText: {
      marginTop: 0,
      marginRight: 0,
    },
    courseHomeRightContainer: {
      top: 1350,
      marginTop: 50,
    },
    courseProfileImageButtonsContainer: {
      marginRight: 0,
      marginBottom: 200,
    },
    courseDetailMainContainer: {
      flexDirection: "column",
      paddingRight: "5%",
    },
    courseDetailLessonCardNoEdit: {
      width: "100%",
    },
    courseDetailRightContainer: {
      flex: "420vh",
    },
    courseDetailMessageBoardContainer: {
      marginTop: 100,
    },
    courseDetailActivityInnerCard: {
      alignSelf: "flex-start",
    },
    courseDetailHeading:
      Platform.OS === "web"
        ? {
            textAlign: "flex-start",
          }
        : {
            textAlign: "left",
          },
    courseActivityDetails: {
      alignSelf: "flex-start",
    },
    courseActivityButtonNonEditable: {
      alignSelf: "flex-start",
    },
    courseDetailActivityInnerCardCenter: {
      alignSelf: "flex-start",
    },
    courseDetailLeftContainer: {
      flex: 10,
      minHeight: "auto",
    },
    courseDetailCourseInfoContainer: {
      marginBottom: 30,
    },
    courseHomeCourseActivityText: {
      marginTop: 75,
    },
    courseHomeFileCard: {
      width: "100%",
    },
    courseHomeCoachingCard: {
      width: "100%",
    },
    courseHomeCalendar: {
      width: "140%",
    },
    courseAssignmentScreenLeftCard: {
      marginLeft: 15,
      marginRight: 15,
      marginTop: 15,
    },
    courseWordCountSmall: {
      marginTop: 50,
    },
    courseWordCount: {
      marginRight: 0,
      marginTop: 20,
    },
    courseDetailJCButtonAssignments: {
      marginRight: 0,
    },
    courseSponsorContainer: {
      height: 20,
    },
    courseMktDescriptionInput: {
      width: "110%",
      minHeight: 300,
    },
    courseZoomMainContainer: {
      flex: "none",
      height: "auto",
    },
    courseDetailSidebarTop: {
      flex: 0.4,
    },
    courseDetailLessonText: {
      marginBottom: 20,
    },
    courseDetailTime: {
      top: 0,
    },
    courseDetailYoutube: {
      flex: "none",
      height: "auto",
    },
    courseDetailCalendarImage: {
      marginTop: 0,
    },
    courseDetailCalendarText: {
      marginTop: 3,
    },
    courseDetailCalendarImage2: {
      marginTop: 15,
    },
    courseDetailCalendarText2: {
      marginTop: 18,
    },
    courseDetailLeftSide: {
      flex: "none",
      height: "auto",
    },
    courseDetailJCButtonRegular: {
      marginTop: 20,
    },
    courseHomeMainTextContainer: {
      marginTop: 30,
    },
    courseHomeCalendarLabels: {
      marginBottom: 30,
    },
    miniMessageBoardRight: {
      flex: 5,
    },
  },
})
export default courseStyles
