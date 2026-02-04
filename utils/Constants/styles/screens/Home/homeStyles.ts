import { colors, windowHeight, windowWidth } from "@/utils/Constants/Styles";
import { StyleSheet } from "react-native";

export const HomeStyles = StyleSheet.create({
  banner: {
    height: windowHeight * 0.356,
    width: windowWidth,
    position: "absolute",
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    paddingTop: windowHeight * 0.07,
    paddingHorizontal: 24,
    paddingBottom: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: colors.ColorBgAvatar,
    alignItems: "center",
    justifyContent: "center",
  },

  userInfo: {
    flexDirection: "column",
  },

  userName: {
    color: "#fff",
  },

  DashboardContent:{
    width: windowWidth,
    paddingHorizontal: windowWidth * 0.1,
    paddingTop: windowHeight * 0.162,
  },
  DashboardTopPieceCard:{
    width: "100%",
    height: windowHeight * 0.14,
    borderTopStartRadius: 24,
    borderTopEndRadius: 24,
    backgroundColor: "#203e29e0",
    borderWidth: 1,
    borderColor: "#fefddb95",
    alignItems: "center",
    justifyContent: "center",
  },
  DashboardBottomPieceCard:{
    width: "100%",
    height: windowHeight * 0.09,
    borderBottomStartRadius: 24,
    borderBottomEndRadius: 24,
    backgroundColor: colors.primary,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 30,
  },
  cardMiniSections:{
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  content: {
    paddingHorizontal: 24,
  },

});
