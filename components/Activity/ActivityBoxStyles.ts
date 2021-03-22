import { Dimensions } from "react-native"
import EStyleSheet from "react-native-extended-stylesheet"

const { height, width } = Dimensions.get("window")
const smallScreen = width < 563
const ActivityBoxStyles = EStyleSheet.create({
  ActivityBoxContainer: {
    width: smallScreen ? width : "100%",
    height: smallScreen ? height : height * 0.4,
  },
  ActivityBoxAlertContainer: {
    overflowY: "scroll",
    height: "100%",
  },
  ActivityBoxHeader: {
    fontFamily: "Graphik-Bold-App",
    fontSize: 20,
    margin: 4,
    lineHeight: 25,
    color: "#333333",
    letterSpacing: -0.3,
  },
  ActivityButtonContainer: {
    borderBottomWidth: 1,
    borderColor: "rgba(51,51,51,0.2)",
    margin: 4,
    height: 50,
    flexDirection: "row",
    marginBottom: 29,
  },
  ActivityButtonText: {
    fontFamily: "Graphik-Regular-App",
    fontSize: 16,
    lineHeight: 25,
    letterSpacing: -0.3,
  },
  ActivityEntryContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    padding: 16,
    margin: 4,
  },
  ActivityEntryText: {
    color: "#333333",
    fontFamily: "Graphik-Regular-App",
  },
  ActivityEntryCreatorText: {
    fontWeight: "700",
  },
  ActivityEntryTimeText: {
    color: "#333333",
    opacity: 0.5,
  },
})
export default ActivityBoxStyles
