import { Dimensions } from "react-native"
import EStyleSheet from "react-native-extended-stylesheet"
const { height, width } = Dimensions.get("window")
const smallScreen = width < 563
const FloatingButtonStyles = EStyleSheet.create({
  ChatFloatingButtonStyle: {
    position: "absolute",
    zIndex: 9999,
    right: smallScreen ? 25 : 0,
    top: smallScreen ? "unset" : height * 0.32 + 56,
    borderRadius: smallScreen ? 50 : "unset",
    bottom: smallScreen ? 25 : "unset",
    backgroundColor: smallScreen ? "#F0493E" : "white",
    width: smallScreen ? 50 : 96,
    height: smallScreen ? 50 : 60,
    shadowColor: "#333333",
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.25,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  ChatFloatingButtonTextStyle: {
    fontFamily: "Graphik-Regular-App",
    color: "#333333",
    fontSize: 20,
    marginLeft: 5,
    paddingBottom: 2,
  },
  /* ================ Left Positioned ============ */
  HelpFloatingButtonStyle: {
    position: "relative",
    zIndex: 9999,
    bottom: smallScreen ? 25 : 42,
    right: "unset",
    left: 25,
    width: smallScreen ? 50 : 175,
    height: 50,
    borderRadius: smallScreen ? 50 : 56,
    backgroundColor: "#333333",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#333333",
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.25,
  },
  /* ============================================== */
  HelpFloatingButtonTextStyle: {
    fontFamily: "Graphik-Bold-App",
    color: "white",
    fontSize: 16,
    marginLeft: 5,
    paddingBottom: 2,
  },
})
export default FloatingButtonStyles
