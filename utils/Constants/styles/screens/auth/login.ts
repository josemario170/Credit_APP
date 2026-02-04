import { colors } from "@/utils/Constants/Styles";
import { Radius, Spacing } from "@/utils/Constants/styles/tokens";
import { StyleSheet } from "react-native";

export const LoginStyles = StyleSheet.create({
  root: {
  },
  subtitle: {
    marginBottom: Spacing.lg,
  },
  tabSwitchContainer: {
    backgroundColor: colors.primary,
    borderRadius: Radius.full,
    marginBottom: Spacing.md,
    padding: 3,
    paddingBottom: 3,
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  tab: {
    flex: 1,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Radius.full,
    paddingVertical: 8,
  },
  tabActive: {
    backgroundColor: colors.white,
  },
  tabInactive: {
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: "transparent",
  },
  formGroup: {
    position: "relative",
  },
  inputGap: {
    marginBottom: Spacing.sm,
  },
  eyeBtn: {
    position: "absolute",
    right: "4%",
    top: "71%",
  },
  ctaContainer: {
    marginTop: Spacing.sm,
  },
  forgotWrapper: {
    marginTop: 10,
  },
  dividerWrapper: {
    marginTop: 18,
    position: "relative",
    alignItems: "center",
  },
  dividerText: {
    backgroundColor: colors.white,
    paddingHorizontal: 4,
    width: 118,
    zIndex: 10,
    textAlign: "center",
  },
  dividerLine: {
    height: 1,
    backgroundColor: colors.gray300,
    width: "100%",
    position: "absolute",
    marginTop: "2.5%",
  },
  providers: {
    marginTop: 18,
  },
  providerGradient: {
    borderRadius: Radius.full,
    overflow: "hidden",
  },
  providerBtn: {
    borderRadius: Radius.full,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.md,
  },
  signupRow: {
    marginTop: 23,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
});
