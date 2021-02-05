import { Dimensions } from "react-native"
import EStyleSheet from "react-native-extended-stylesheet"

const { height, width } = Dimensions.get("window")
const smallScreen = width < 563
const HelpModalStyles = EStyleSheet.create({
  HelpModalHeader: {
    fontSize: 24,
    marginVertical: 16,
    fontFamily: "Graphik-Bold-App",
  },
  HelpModalLabel: {
    marginVertical: 4,
    fontFamily: "Graphik-Regular-App",
    fontSize: 14,
  },
  HelpModalContainer: {
    paddingHorizontal: 12,
    paddingVertical: 16,
    top: smallScreen ? 0 : "unset",
    position: "absolute",
    right: smallScreen ? "unset" : 0,
    bottom: 120,
    backgroundColor: "white",
    shadowColor: "#333333",
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.25,
    width: smallScreen ? width : 400,
    height: smallScreen ? height : 300,
  },
  HelpModalTextInput: {
    marginVertical: 4,
    borderStyle: "solid",
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderColor: "lightgrey",
    borderWidth: 2,
    shadowColor: "#333333",
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.25,
  },
  HelpModalTextArea: {
    marginBottom: 16,
    borderStyle: "solid",
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderColor: "lightgrey",
    borderWidth: 2,
    shadowColor: "#333333",
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.25,
  },
})
export default HelpModalStyles
