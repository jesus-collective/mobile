import { StyleSheet } from "react-native"

export const GenericButtonStyles = StyleSheet.create({
  PrimaryButtonStyle: {
    height: 48,
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: "#FF4438",
    borderRadius: 50,
  },
  PrimaryLabelStyle: {
    color: "#FFFFFF",
    fontFamily: "Graphik-Regular-App",
    fontWeight: "600",
    letterSpacing: 1,
    fontSize: 16,
    textTransform: "uppercase",
    textAlign: "center",
  },
  SecondaryButtonStyle: {
    height: 48,
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: "#FFECEB",
    borderRadius: 50,
  },
  SecondaryLabelStyle: {
    color: "#FF4438",
    fontFamily: "Graphik-Regular-App",
    fontWeight: "600",
    letterSpacing: 1,
    fontSize: 16,
    textTransform: "uppercase",
    textAlign: "center",
  },
  TertiaryButtonStyle: {
    height: 32,
    paddingHorizontal: 16,
    paddingVertical: 4,
    backgroundColor: "#483938",
    borderRadius: 50,
  },
  TertiaryLabelStyle: {
    color: "#FFFFFF",
    fontFamily: "Graphik-Regular-App",
    fontSize: 15,
    textTransform: "capitalize",
    textAlign: "center",
  },
})
