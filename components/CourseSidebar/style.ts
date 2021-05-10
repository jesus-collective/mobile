import { Dimensions, Platform } from "react-native"
import EStyleSheet from "react-native-extended-stylesheet"

export default class HeaderStyles {
  constructor() {
    this.update()
  }
  static instance: HeaderStyles
  public static getInstance(): HeaderStyles {
    if (!HeaderStyles.instance) {
      HeaderStyles.instance = new HeaderStyles()
    }

    return this.instance
  }
  style!: EStyleSheet.AnyObject

  update(): void {
    this.style = EStyleSheet.create({
      container: {
        backgroundColor: "#333333",
      },
      courseSidebarFontRegular: {
        fontFamily: "Graphik-Regular-App",
        color: "#cccccc",
        fontSize: 16,
        marginLeft: 5,
      },
      icon: {
        color: "#aaaaaa",
      },
      leftButtons: {
        display: Platform.OS === "web" && Dimensions.get("window").width > 720 ? "none" : "flex",
      },
      centerMenuButtons: {
        display: Platform.OS === "web" && Dimensions.get("window").width > 720 ? "flex" : "none",
      },
      centerMenuButtonsText: {
        color: "#aaaaaa",
        fontSize: 15,
        fontWeight: "bold",
        marginRight: 30,
      },
      logo: {
        resizeMode: "stretch",
        width: 126,
        height: 33,
        marginRight: 0,
        marginTop: 30,
        marginLeft: 35,
        marginBottom: 10,
      },
      // Media Query Desktop Large Tablet
      "@media (min-width: 769) and (max-width: 1024)": {
        logo: {
          marginLeft: "13%",
          width: 115,
          height: 30,
        },
      },
      // Media Query Desktop Tablet
      "@media (min-width: 350) and (max-width: 768)": {
        logo: {
          marginLeft: "15%",
          width: 110,
          height: 29,
        },
      },
      // Media Query Mobile
      "@media (min-width: 320px) and (max-width: 720px)": {
        logo: {
          marginLeft: "15%",
          width: 123,
          height: 32,
        },
      },
    })
  }
}
