import { StyleSheet } from "react-native";
import { colors } from "../Styles";
import { Radius, Spacing, Typography } from "./tokens";

export const InputStyles = StyleSheet.create({
  container: {
    width: "100%",
  },
  label: {
    color: colors.gray700,
    marginBottom: 4,
    fontWeight: "500",
    fontFamily: "Manrope-Regular",
    paddingLeft: 10,
    paddingBottom: 2
  },
  inputContainer: {
    position: "relative",
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: "#BFBFBF",
    backgroundColor: colors.gray100,
  },
  icon: {
    position: "absolute",
    left: 12,
    top: "50%" as any,
    transform: [{ translateY: -10 }],
    zIndex: 1,
    width: 20,
    height: 20,
  },
  input: {
    paddingVertical: 12,
    paddingLeft: 40,
    paddingRight: 16,
    color: "black",
    fontSize: Typography.size.base,
    fontFamily: Typography.family.regular,
  },
});

export const ButtonTransparentStyles = StyleSheet.create({
  container: {
    position: "relative",
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: "#BFBFBF",
    backgroundColor: "#6b6b6b86",
    borderRadius: Radius.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    zIndex: 1,
    width: 20,
    height: 20,
  },
  content: {
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
  },
  text: {
    color: "white",
    fontSize: Typography.size.base,
    fontFamily: Typography.family.regular,
  },
});



export const CustomModalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  topBannerWrap: {
    alignItems: 'center',
    marginBottom: -8,
    zIndex: 0,
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    zIndex: 1,
  },
  barContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },
  bar: {
    width: 64,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#d1d5db',
  },
});