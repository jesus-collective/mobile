import { Dimensions, Platform } from "react-native"
import EStyleSheet from "react-native-extended-stylesheet"

const resourceStyles = EStyleSheet.create({
  resourceRichTextH1: {
    margin: 10,
    fontSize: 36,
    lineHeight: 43,
    fontWeight: 600,
    color: "#404040",
  },
  resourceRichTextH2: {
    margin: 10,
    fontSize: 24,
    lineHeight: 34,
    fontWeight: 600,
    color: "#404040",
  },
  resourceRichTextH3: {
    margin: 10,
    fontSize: 14,
    lineHeight: 21,
    fontWeight: 600,
    color: "#404040",
  },
  resourceRichTextH4: {
    margin: 10,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: 600,
    color: "#404040",
  },
  resourceRichTextBody1: {
    margin: 10,
    fontSize: 27,
    lineHeight: 38,
    fontWeight: 400,
    color: "#404040",
  },
  resourceRichTextBody2: {
    margin: 10,
    fontSize: 18,
    lineHeight: 27,
    fontWeight: 400,
    color: "#404040",
  },
  resourceRichTextBody3: {
    margin: 10,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 400,
    color: "#404040",
  },
  resourceContentEpisodesDescription:
    Platform.OS === "web"
      ? {
          wordBreak: "break-word",
          fontFamily: "Graphik-Regular-App",
          fontSize: 20,
          lineHeight: 25,
          color: "#333333",
          paddingBottom: 0,
        }
      : {
          fontFamily: "Graphik-Regular-App",
          fontSize: 20,
          lineHeight: 25,
          color: "#333333",
          paddingBottom: 0,
        },

  resourceContentEpisodesText:
    Platform.OS === "web"
      ? {
          wordBreak: "break-word",
          fontFamily: "Graphik-Regular-App",
          fontSize: 18,
          lineHeight: 28,
          color: "#333333",
          paddingBottom: 0,
        }
      : {
          fontFamily: "Graphik-Regular-App",
          fontSize: 18,
          lineHeight: 28,
          color: "#333333",
          paddingBottom: 0,
        },

  resourceContentEpisodesDownloadInfo:
    Platform.OS === "web"
      ? {
          wordBreak: "break-word",
          fontFamily: "Graphik-Regular-App",
          fontSize: 18,
          lineHeight: 28,
          color: "#333333",
          paddingBottom: 25,
        }
      : {
          fontFamily: "Graphik-Regular-App",
          fontSize: 18,
          lineHeight: 28,
          color: "#333333",
          paddingBottom: 25,
        },
  resourceContentEpisodesEpisodeTitle:
    Platform.OS === "web"
      ? {
          wordBreak: "break-word",
          fontFamily: "Graphik-Bold-App",
          fontSize: 28,
          lineHeight: 33,
          color: "#333333",
          paddingBottom: 0,
        }
      : {
          fontFamily: "Graphik-Bold-App",
          fontSize: 28,
          lineHeight: 33,
          color: "#333333",
          paddingBottom: 0,
        },

  resourceContentEpisodesVideoText:
    Platform.OS === "web"
      ? {
          wordBreak: "break-word",
          fontFamily: "Graphik-Bold-App",
          fontSize: 20,
          lineHeight: 25,
          color: "#333333",
          paddingBottom: 0,
        }
      : {
          fontFamily: "Graphik-Bold-App",
          fontSize: 20,
          lineHeight: 25,
          color: "#333333",
          paddingBottom: 0,
        },
  fontResourceHeaderBold: {
    fontFamily: "Graphik-Regular-App",
    fontWeight: "600",
    fontSize: 54,
    lineHeight: 54,
    alignSelf: "center",
    textAlign: "center",
    color: "#000",
    width: "100%",
    marginBottom: 5,
  },
  resourceHeaderAgeGroupBox: {
    height: "58px",
    backgroundColor: "#ffffff",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    paddingRight: 21,
    paddingLeft: 21,
    width: "40%",
    borderRadius: 4,
    alignSelf: "center",
    marginTop: 30,
    marginBottom: 30,
  },
  resourceHeaderAgeGroupBoxText: {
    textAlign: "center",
    alignSelf: "center",
    color: "#000000",
    fontSize: 30,
    lineHeight: 35,
    fontWeight: "bold",
    fontFamily: "Graphik-Regular-App",
  },
  resourceCard: {
    minHeight: 330,
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
  fontResourceHeaderDescription: {
    fontFamily: "Graphik-Regular-App",
    fontWeight: "normal",
    fontSize: 18,
    lineHeight: 27,
    textAlign: "center",
    color: "#000",
    width: "100%",
    alignSelf: "center",
  },
  resourcesScreenMainContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  resourcesScreenLeftContainer: {
    flex: 70,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  resourcesScreenRightContainer: {
    flex: 30,
    flexDirection: "column",
    alignContent: "flex-start",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  ResourcesMyGroupsNoWrap:
    Platform.OS === "web"
      ? {
          overflow: "scroll",
          overflowY: "hidden",
          minHeight: 375,
          flexWrap: "nowrap",
          // flexWrap: this.props.wrap ? "wrap" : "nowrap",
          flexGrow: 1,
          width: "100%",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }
      : {
          overflow: "scroll",
          minHeight: 375,
          flexWrap: "nowrap",
          // flexWrap: this.props.wrap ? "wrap" : "nowrap",
          flexGrow: 1,
          width: "100%",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "flex-start",
        },
  ResourcesMyGroupsWrap:
    Platform.OS === "web"
      ? {
          overflow: "scroll",
          minHeight: "calc(100vw + 100vh + 10rem)",
          flexWrap: "wrap",
          // flexWrap: this.props.wrap ? "wrap" : "nowrap",
          flexGrow: 1,
          width: "100%",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          alignContent: "flex-start",
        }
      : {
          overflow: "scroll",
          minHeight: "calc(100vw + 100vh + 10rem)",
          flexWrap: "wrap",
          // flexWrap: this.props.wrap ? "wrap" : "nowrap",
          flexGrow: 1,
          width: "100%",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          alignContent: "flex-start",
        },
  resourcesOverviewScreenMainContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    height: "100%",
    backgroundColor: "#F9FAFC",
  },
  resourceContentMainContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    backgroundColor: "#F9FAFC",
  },
  resourceContentLeftContainer: {
    flex: 70,
    flexDirection: "column",
    justifyContent: "flex-start",
    paddingLeft: 30,
    paddingRight: 0,
    marginLeft: 30,
    marginTop: 30,
    backgroundColor: "#ffffff",
    borderRadius: 4,
    shadowOffset: { width: 0, height: 5 },
    shadowColor: "rgba(0, 0, 0, 0.19)",
    shadowRadius: 30,
    height: "100%",
  },
  resourceContentRightContainer: {
    flex: 30,
    flexDirection: "column",
    justifyContent: "flex-start",
    paddingLeft: 30,
    paddingRight: 30,
    marginRight: 30,
    marginTop: 30,
    backgroundColor: "#ffffff",
    borderRadius: 4,
    shadowOffset: { width: 0, height: 5 },
    shadowColor: "rgba(0, 0, 0, 0.45)",
    shadowRadius: 30,
    height: 900,
  },
  resourceContentCurrentSeriesContainer: {
    //  minHeight: 200,
    height: 150,
    flexWrap: "nowrap",
    // flexWrap: this.props.wrap ? "wrap" : "nowrap",
    flexGrow: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  resourceContentCurrentSeriesCard: {
    padding: "0px",
    marginLeft: "10px",
    marginRight: "10px",
    //flex: 1,
    borderRadius: 4,
    shadowOffset: { width: 0, height: 5 },
    shadowColor: "rgba(0, 0, 0, 0.45)",
    shadowRadius: 30,
    borderColor: "#F9FAFC",
  },
  resourceContentCurrentSeriesIframeContainer: {
    width: "100%",
    height: Dimensions.get("window").width * 0.12,
    paddingLeft: "0px",
    paddingRight: "0px",
    margin: "0px",
    paddingTop: 0,
    backgroundColor: "#F9FAFC",
  },
  resourceContentMoreSeriesContainer: {
    minHeight: 375,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  resourceContentLoadMoreButtonContainer: {
    flexGrow: 0.2,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  resourceContentMoreSeriesRowContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
  },
  resourceContentMoreSeriesCard: {
    padding: "0px",
    marginLeft: "10px",
    marginRight: "10px",
    marginBottom: 53,
    flex: 1,
    borderRadius: 4,
    shadowOffset: { width: 0, height: 5 },
    shadowColor: "rgba(0, 0, 0, 0.45)",
    shadowRadius: 30,
    borderColor: "#F9FAFC",
    backgroundColor: "#F9FAFC",
    minHeight: 250,
  },
  resourceContentMoreSeriesCardDummy: {
    padding: "0px",
    marginLeft: "10px",
    marginRight: "10px",
    marginBottom: 53,
    flex: 1,
    borderColor: "#ffffff00",
    backgroundColor: "#ffffff00",
    shadowColor: "#ffffff00",
    minHeight: 250,
  },
  resourceContentMoreSeriesIframeContainer: {
    width: "100%",
    height: Dimensions.get("window").width * 0.09,
    paddingLeft: "0px",
    paddingRight: "0px",
    margin: "0px",
    paddingTop: 0,
    backgroundColor: "#F9FAFC",
  },
  resourceContentEpisodeMainContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  resourceContentEpisodeLeftContainer: {
    flex: 70,
    flexDirection: "column",
    justifyContent: "flex-start",
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 50,
    marginLeft: 30,
    marginTop: 30,
    backgroundColor: "#ffffff",
    borderRadius: 4,
    shadowOffset: { width: 0, height: 5 },
    shadowColor: "rgba(0, 0, 0, 0.45)",
    shadowRadius: 30,
  },
  resourceContentEpisodeRightContainer: {
    flex: 30,
    flexDirection: "column",
    justifyContent: "flex-start",
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 20,
    marginRight: 30,
    marginTop: 30,
    backgroundColor: "#ffffff",
    borderRadius: 4,
    shadowOffset: { width: 0, height: 5 },
    shadowColor: "rgba(0, 0, 0, 0.45)",
    shadowRadius: 30,
    height: 900,
  },
  resourceContentEpisodesContainer: {
    minHeight: 375,
    flexGrow: 0,
    width: "100%",
    marginTop: 30,
  },
  resourceContentEpisodeCard: {
    padding: "0px",
    marginLeft: "10px",
    marginRight: "10px",
    marginBottom: "25px",
    borderRadius: 4,
    width: "100%",
    shadowOffset: { width: 0, height: 5 },
    shadowColor: "rgba(0, 0, 0, 0.45)",
    shadowRadius: 30,
    borderColor: "#ffffff",
    height: Dimensions.get("window").width * 0.18,
  },
  resourceContentEpisodesIframe: {
    width: Dimensions.get("window").width * 0.26,
    height: Dimensions.get("window").width * 0.26 * (9 / 16),
    paddingLeft: "0px",
    paddingRight: "0px",
    margin: "0px",
    paddingTop: 0,
    backgroundColor: "#F9FAFC",
  },
  resourceContentEpisodesCardInnerContainer: {
    display: "flex",
    flexDirection: "row",
  },
  resourceContentEpisodesButtonsContainer: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 0,
    borderBottomColor: "rgba(0, 0, 0, 0.2)",
    borderBottomWidth: 1,
    borderTopColor: "rgba(0, 0, 0, 0.2)",
    borderTopWidth: 1,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },
  resourceContentEpisodesButtonsContainer2: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 0,
    borderBottomColor: "rgba(0, 0, 0, 0.2)",
    borderBottomWidth: 1,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },

  resourcefileInputWrapper: {
    width: "100%",

    position: "absolute",
  },
  resourcefileFieldWrapper:
    Platform.OS === "web"
      ? {
          alignSelf: "center",
          top: "24vw",
          width: "75%",
          overflow: "none",
          position: "absolute",
          backgroundColor: "#ffffff",
          height: 195,
          borderRadius: 8,
          shadowOffset: { width: 0, height: 0 },
          shadowColor: "rgba(0, 0, 0, 0.19)",
          shadowRadius: 30,
          justifyContent: "center",
        }
      : {
          alignSelf: "center",
          top: "5vw",
          width: "50%",
          overflow: "hidden",
          position: "absolute",
        },
  resourceImageIcon: {
    color: "#aaaaaa",
  },
  resourcesOverviewRightCard:
    Platform.OS === "web"
      ? {
          display: "inline",
          marginTop: 30,
          overflow: "visible",
          width: "100%",
          paddingTop: 40,
          paddingLeft: 30,
          paddingRight: 30,
        }
      : {
          display: "flex",
          marginTop: 30,
          overflow: "visible",
          width: "100%",
          paddingTop: 40,
          paddingLeft: 30,
          paddingRight: 30,
        },
  resourceHeaderContainer: {
    //    backgroundColor: "#000000",
    height: Dimensions.get("window").width * (24 / 100) + " + 200px",
  },
  resourceHeaderImgContainer: {
    //    backgroundColor: "#000000",
    height: Dimensions.get("window").width * (24 / 100) + " + 100px",
  },
  resourceHeaderImgContainer2: {
    height: "100px",
  },
  resourceHeaderImg:
    Platform.OS === "web"
      ? {
          position: "relative",
          width: "100%",
          height: "100%",
          opacity: 0.5,
        }
      : {
          position: "relative",
          width: "100%",
          height: "100%",
          opacity: 0.5,
        },
  resourceHeaderImgView: {
    backgroundColor: "#000000",
    position: "relative",
    width: "100%",
    height: "100%",
    borderRadius: 0,
  },
  resourcesSubMenu: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginRight: 65,
  },
  episodeTitle:
    Platform.OS === "web"
      ? {
          wordBreak: "break-word",
          fontFamily: "Graphik-Bold-App",
          fontSize: 20,
          lineHeight: 25,
          color: "#333333",
        }
      : { fontFamily: "Graphik-Bold-App", fontSize: 20, lineHeight: 25, color: "#333333" },
  episodeDescription:
    Platform.OS === "web"
      ? {
          wordBreak: "break-word",
          fontSize: 14,
          lineHeight: 22,
          fontFamily: "Graphik-Regular-App",
          color: "#333333",
        }
      : { fontSize: 14, lineHeight: 22, fontFamily: "Graphik-Regular-App", color: "#333333" },

  seriesTitle:
    Platform.OS === "web"
      ? {
          wordBreak: "break-word",
          fontFamily: "Graphik-Bold-App",
          fontSize: 22,
          lineHeight: 30,
          color: "#333333",
          paddingBottom: 0,
        }
      : {
          fontFamily: "Graphik-Bold-App",
          fontSize: 22,
          lineHeight: 30,
          color: "#333333",
          paddingBottom: 0,
        },

  moreSeriesTitle:
    Platform.OS === "web"
      ? {
          wordBreak: "break-word",
          fontFamily: "Graphik-Bold-App",
          fontSize: 18,
          lineHeight: 24,
          color: "#333333",
          paddingBottom: 0,
        }
      : {
          fontFamily: "Graphik-Bold-App",
          fontSize: 18,
          lineHeight: 24,
          color: "#333333",
          paddingBottom: 0,
        },

  seriesDescription:
    Platform.OS === "web"
      ? {
          wordBreak: "break-word",
          fontFamily: "Graphik-Regular-App",
          fontSize: 14,
          lineHeight: 22,
          color: "#333333",
          opacity: 0.6,
          paddingBottom: 0,
        }
      : {
          fontFamily: "Graphik-Regular-App",
          fontSize: 14,
          lineHeight: 22,
          color: "#333333",
          opacity: 0.6,
          paddingBottom: 0,
        },

  headerSeriesTitle:
    Platform.OS === "web"
      ? {
          wordBreak: "break-word",
          fontFamily: "Graphik-Bold-App",
          fontSize: 20,
          lineHeight: 25,
          color: "#333333",
          paddingBottom: 0,
        }
      : {
          fontFamily: "Graphik-Bold-App",
          fontSize: 20,
          lineHeight: 25,
          color: "#333333",
          paddingBottom: 0,
        },

  headerSeriesDescription:
    Platform.OS === "web"
      ? {
          wordBreak: "break-word",
          fontFamily: "Graphik-Bold-App",
          fontSize: 20,
          lineHeight: 25,
          color: "#333333",
          paddingBottom: 0,
        }
      : {
          fontFamily: "Graphik-Bold-App",
          fontSize: 20,
          lineHeight: 25,
          color: "#333333",
          paddingBottom: 0,
        },

  headerEpisodeTitle:
    Platform.OS === "web"
      ? {
          wordBreak: "break-word",
          fontFamily: "Graphik-Bold-App",
          fontSize: 20,
          lineHeight: 25,
          color: "#333333",
          paddingBottom: 0,
        }
      : {
          fontFamily: "Graphik-Bold-App",
          fontSize: 20,
          lineHeight: 25,
          color: "#333333",
          paddingBottom: 0,
        },

  headerEpisodeDescription:
    Platform.OS === "web"
      ? {
          wordBreak: "break-word",
          fontFamily: "Graphik-Bold-App",
          fontSize: 20,
          lineHeight: 25,
          color: "#333333",
          paddingBottom: 0,
        }
      : {
          fontFamily: "Graphik-Bold-App",
          fontSize: 20,
          lineHeight: 25,
          color: "#333333",
          paddingBottom: 0,
        },

  whoIsThisForText:
    Platform.OS === "web"
      ? {
          alignSelf: "flex-start",
          wordBreak: "break-word",
          fontFamily: "Graphik-Regular-App",
          fontSize: 26,
          lineHeight: 33,
          color: "#333333",
          paddingBottom: 20,
        }
      : {
          alignSelf: "flex-start",
          fontFamily: "Graphik-Regular-App",
          fontSize: 26,
          lineHeight: 33,
          color: "#333333",
          paddingBottom: 20,
        },
    resourceGroupCard: 
      Platform.OS === "web" 
      ? {
          height: 463,
          width: 425,
          alignSelf: "flex-start",
          padding: "0%",
          // paddingLeft: "0.25rem",
          // paddingRight: "0.25rem",
          borderRadius: 8,
          shadowOffset: { width: 0, height: 7 },
          shadowColor: "rgba(0, 0, 0, 0.5)",
          shadowRadius: 30,
          borderStyle: "solid",
          borderColor: "#FFFFFF",
          marginRight: 36,
          marginTop: 0,
          marginLeft: 0,
          marginBottom: 36,
        }
        : {
          height: 463,
          width: 425,
          alignSelf: "flex-start",
          padding: "0%",
          // paddingLeft: "0.25rem",
          // paddingRight: "0.25rem",
          borderRadius: 8,
          shadowOffset: { width: 0, height: 7 },
          shadowColor: "rgba(0, 0, 0, 0.5)",
          shadowRadius: 30,
          borderStyle: "solid",
          borderColor: "#FFFFFF",
          marginRight: 36,
          marginTop: 0,
          marginLeft: 0,
          marginBottom: 0,
        },
    resourceGridContainer: {
      overflow: "scroll",
    },
    resourcesRichTextContainer: {
      width: '80%',
    },
    resourcesListText: {
      fontFamily: "Graphik-Bold-App",
      fontSize: 14,
      fontStyle: "normal",
      fontWeight: 800,
      lineHeight: 21,
      textTransform: "uppercase",
      letterSpacing: 0.5,
      textAlign: "left",
      color: "#404040",
    },
    resourcesListText2: {
      fontFamily: "Graphik-Bold-App",
      fontSize: 14,
      fontStyle: "normal",
      fontWeight: 800,
      lineHeight: 21,
      textTransform: "uppercase",
      letterSpacing: 0.5,
      textAlign: "left",
      color: "#404040",
    },

  "@media (min-width: 350) and (max-width: 768)": {
    resourcefileFieldWrapper: {
      top: "30vw",
      width: "90%",
      height: 110,
    },
    resourceContentLeftContainer: {
      flexDirection: "column",
      justifyContent: "flex-start",
      paddingLeft: 0,
      paddingRight: 0,
      marginLeft: 0,
      marginTop: 0,
      width: "100%",
      backgroundColor: "#ffffff",
      borderRadius: 4,
      shadowOffset: { width: 0, height: 5 },
      shadowColor: "rgba(0, 0, 0, 0.45)",
      shadowRadius: 30,
    },
    resourceContentRightContainer: {
      flexDirection: "column",
      justifyContent: "flex-start",
      paddingLeft: 0,
      paddingRight: 0,
      marginRight: 0,
      marginTop: 0,
      backgroundColor: "#ffffff",
      borderRadius: 4,
      width: "100%",
      shadowOffset: { width: 0, height: 5 },
      shadowColor: "rgba(0, 0, 0, 0.45)",
      shadowRadius: 30,
    },
    resourceContentMoreSeriesIframeContainer: {
      width: "100%",
      height: Dimensions.get("window").width * 0.55,
      paddingLeft: "0px",
      paddingRight: "0px",
      margin: "0px",
      paddingTop: 0,
      backgroundColor: "#F9FAFC",
    },
    resourceContentCurrentSeriesIframeContainer: {
      width: "100%",
      height: Dimensions.get("window").width * 0.55,
      paddingLeft: "0px",
      paddingRight: "0px",
      margin: "0px",
      paddingTop: 0,
      backgroundColor: "#F9FAFC",
    },
    resourceContentCurrentSeriesContainer: {
      width: "100%",
      height: 150,
      // minHeight: 3 * (200 + Dimensions.get('window').width * 0.55),
      flexGrow: 0,
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "flex-start",
    },
    resourceContentCurrentSeriesCard: {
      padding: "0px",
      marginLeft: "10px",
      marginRight: "10px",
      marginBottom: 20,
      //  flex: 1,
      borderRadius: 4,
      shadowOffset: { width: 0, height: 5 },
      shadowColor: "rgba(0, 0, 0, 0.45)",
      shadowRadius: 30,
      borderColor: "#F9FAFC",
      backgroundColor: "#F9FAFC",
    },
    resourceContentEpisodesCardInnerContainer: {
      display: "flex",
      flexDirection: "column",
    },
    resourceContentEpisodesIframe: {
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").width * (9 / 16),
      paddingLeft: "0px",
      paddingRight: "0px",
      margin: "0px",
      paddingTop: 0,
      backgroundColor: "#F9FAFC",
    },
    resourceContentEpisodesEpisodeTitle:
      Platform.OS === "web"
        ? {
            wordBreak: "break-word",
            fontFamily: "Graphik-Bold-App",
            fontSize: 18,
            lineHeight: 25,
            color: "#333333",
            paddingBottom: 0,
          }
        : {
            fontFamily: "Graphik-Bold-App",
            fontSize: 18,
            lineHeight: 25,
            color: "#333333",
            paddingBottom: 0,
          },
    resourceContentEpisodeMainContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
    },
    resourceContentEpisodesButtonsContainer: {
      display: "flex",
      flexDirection: "row",
      flexGrow: 0,
      borderBottomColor: "rgba(0, 0, 0, 0.2)",
      borderBottomWidth: 1,
      borderTopColor: "rgba(0, 0, 0, 0.2)",
      borderTopWidth: 1,
      marginLeft: 15,
      marginRight: 15,
    },
    resourceContentEpisodesButtonsContainer2: {
      display: "flex",
      flexDirection: "row",
      flexGrow: 0,
      borderBottomColor: "rgba(0, 0, 0, 0.2)",
      borderBottomWidth: 1,
      marginLeft: 15,
      marginRight: 15,
    },
    fontResourceHeaderBold: {
      fontSize: 50,
      width: 650,
      height: 50,
      paddingTop: 0,
    },
    fontResourceHeaderDescription: {
      width: "75%",
    },
    resourceHeaderAgeGroupBox: {
      width: "35%",
    },
    resourceGridContainer: {
      flexDirection: "row",
    },
    resourcesRichTextContainer: {
      width: '90%',
    },
  },
  "@media (min-width: 769) and (max-width: 1024)": {
    resourcefileFieldWrapper: {
      top: "26vw",
      height: 150,
    },
    fontResourceHeaderBold: {
      fontSize: 62,
      width: 700,
      height: 70,
      paddingTop: 5,
      marginBottom: 0,
    },
    resourceGridContainer: {
      flexDirection: 'row'
    },
    resourcesRichTextContainer: {
      width: '90%',
    },
  },
  "@media (min-width: 769px) and (max-width: 1279px)": {
    resourceContentMoreSeriesIframeContainer: {
      width: "100%",
      height: Dimensions.get("window").width * 0.12,
      paddingLeft: "0px",
      paddingRight: "0px",
      margin: "0px",
      paddingTop: 0,
      backgroundColor: "#F9FAFC",
    },
    resourceHeaderAgeGroupBox: {
      width: "40%",
    },
  },
  "@media (min-width: 320px) and (max-width: 720px)": {
    resourcesScreenMainContainer: {
      flexDirection: "column",
    },
    ResourcesMyGroups: {
      flexDirection: "column",
      flexWrap: "wrap",
    },
    resourcefileFieldWrapper: {
      top: "61vw",
      borderRadius: 0,
      height: 164, 
      width: '100%',
    },
    resourcesOverviewScreenMainContainer: {
      flexDirection: "column",
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
      top: 300,
    },
    resourceContentEpisodeMainContainer: {
      flexDirection: "column",
      minHeight: "400",
    },
    resourceContentEpisodeLeftContainer: {
      marginLeft: 0,
      marginTop: 0,
      flexGrow: 1,
    },
    resourceContentEpisodeRightContainer: {
      marginRight: 0,
      marginTop: 0,
      top: 200,
    },
    fontResourceHeaderBold: {
      fontSize: 45,
      lineHeight: 54,
      paddingTop: 26,
      height: 70,
    },
    fontResourceHeaderDescription: {
      height: 155,
    },
    resourceHeaderAgeGroupBox: {
      width: "70%",
    },
    resourceHeaderImgContainer: {
      height: 229,
    },
    resourceGroupCard: {
      height: 487,
      width: '87vw',
      alignSelf: "center",
      padding: "0%",
      borderRadius: 8,
      shadowOffset: { width: 0, height: 7 },
      shadowColor: "rgba(0, 0, 0, 0.5)",
      shadowRadius: 30,
      borderStyle: "solid",
      borderColor: "#FFFFFF",
      marginRight: 21,
      marginTop: 0,
      marginLeft: 21,
      marginBottom: 36,
      },
    resourceRichTextH1: {
      marginLeft: 21,
      },
    resourceRichTextH2: {
      marginLeft: 21,
      },
    resourceRichTextH3: {
      marginLeft: 21,
      },
    resourceRichTextH4: {
      marginLeft: 21,
      },
    resourceRichTextBody1: {
      marginLeft: 21,
      },
    resourceRichTextBody2: {
      marginLeft: 21,
      },
    resourceRichTextBody3: {
      marginLeft: 21,
      },
    resourcesListText: {
      marginLeft: 21,
    },
    resourcesListText2: {
      marginLeft: 21,
    },
  },
})
export default resourceStyles
