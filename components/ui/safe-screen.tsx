import { PropsWithChildren } from "react";
import { StatusBar, StatusBarStyle, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type SafeScreenProps = PropsWithChildren<{
  backgroundColor?: string;
  statuBarTheme?: StatusBarStyle;
  ignoreBottomInset?: boolean; // Nova prop
}>;

export function SafeScreen({
  children,
  backgroundColor = "#fff",
  statuBarTheme = "light-content",
  ignoreBottomInset = false,
}: SafeScreenProps) {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: ignoreBottomInset ? 0 : insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
          backgroundColor,
        },
      ]}
    >
      <StatusBar barStyle={statuBarTheme} />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});