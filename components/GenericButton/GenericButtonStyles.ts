import { StyleSheet } from "react-native"

export const GenericButtonStyles = StyleSheet.create({
  PrimaryButtonStyle: {
    height: 48,
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: "#FF4438",
    borderRadius: 50,
  },
  DisabledButtonStyle: {
    backgroundColor: "#E4E1E1",
  },
  DisabledLabelStyle: {
    color: "#6A5E5D",
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
    alignItems: "center",
    height: 48,
    paddingHorizontal: 16,
    paddingVertical: 4,
    backgroundColor: "#483938",
    borderRadius: 50,
  },
  TertiaryLabelStyle: {
    color: "#FFFFFF",
    fontFamily: "Graphik-Regular-App",
    fontSize: 15,
    textAlign: "center",
  },
  QuarternaryButtonStyle: {
    backgroundColor: "#FF4438",
    boxShadow: "inset 0px -1px 0px #D1382E",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 18,
  },
  QuarternaryLabelStyle: {
    color: "white",
    fontFamily: "Graphik-Semibold-App",
    fontSize: 15,
    lineHeight: 24,
  },
})
