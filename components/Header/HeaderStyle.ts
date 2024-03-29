import { Dimensions, Platform } from "react-native"
const { width } = Dimensions.get("window")

export const HeaderStyle = {
  container: {
    backgroundColor: "#ffffff",
    paddingLeft: 24,
    flexDirection: "row",
    paddingVertical: width > 750 ? 8 : 0,
    borderBottomColor: "#E4E1E1",
    borderBottomWidth: 1,
  },
  resourceContainer: {
    backgroundColor: "#292929",
    paddingTop: 8,
    paddingBottom: 8,
    overflowX: width >= 320 && width <= 480 ? "scroll" : "visible",
  },
  adminContainer: {
    backgroundColor: "#292929",
  },
  icon: {
    color: "#6A5E5D",
    fontSize: 22,
    width: 24,
    height: 24,
  },
  resourceIcon: {
    color: "#ffffff",
    fontSize: 20,
  },
  leftButtons: {
    display: Platform.OS === "web" && width > 750 ? "none" : "flex",
    justify: "center",
  },
  // leftButtonsSubNav: {

  //     display: Platform.OS === 'web' && Dimensions.get('window').width > 720 ? 'none' : 'flex',
  // },
  centerMenuButtons: {
    display: Platform.OS === "web" && width > 750 ? "flex" : "none",
    fontWeight: 600, // this is missing
    lineHeight: 24,
  },
  centerMenuButtonsSubNav: {
    display: "flex",
    paddingBottom: 12,
    overflowX: width >= 320 && width <= 480 ? "scroll" : "visible",
  },
  centerMenuButtonsText: {
    color: "#A39C9B",
    fontSize: "clamp(12px, 1.042vw, 15px)",
    fontWeight: "bold",
    marginRight: 30,
    display: width <= 600 ? "none" : "flex",
  },
  centerMenuButtonsTextSelected: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "bold",
    marginRight: 30,
    display: Platform.OS === "web" && width <= 600 ? "none" : "flex",
  },
  centerMenuButtonsTextResources: {
    color: "#A39C9B",
    fontSize: "clamp(12px, 1.042vw, 15px)",
    fontWeight: "bold",
    display: width <= 600 ? "none" : "flex",
  },
  resourcesMenuButtonsText: {
    color: "#666666",
    fontSize: 14,
    lineHeight: 21,
    fontWeight: "normal",
    marginLeft: "11rem",

    "@media (min-width: 769) and (max-width: 1024)": {
      marginLeft: "8rem",
    },

    "@media (min-width: 350) and (max-width: 768)": {
      marginLeft: "2.5rem",
    },
    display: width <= 750 ? "none" : "flex",
  },
  dropdownText: {
    fontFamily: "Graphik-Regular-App",
    fontSize: 16,
    lineHeight: 21,
    paddingLeft: 10,
    paddingRight: 20,
  },
  logo: {
    resizeMode: "stretch",
    width: 126,
    height: 33,
    marginRight: 48,

    marginTop: 5,
    marginBottom: 10,
    "@media (max-width: 1300)": {
      marginRight: 16,
      width: 24.82,
      height: 30,
    },
  },

  headerRightContainer: {
    flexGrow: 1,
    marginRight: 12,
  },
}
