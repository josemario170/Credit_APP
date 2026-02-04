import { colors, windowHeight, windowWidth } from "@/utils/Constants/Styles";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const stylesByWrapper = StyleSheet.create({
    backgroundWrapper: {
        ...StyleSheet.absoluteFillObject,
    },
    backgroundImage: {
        width: windowWidth,
        height: windowHeight / 1.8,
        resizeMode: "cover",
    }
})
export default function CustomRoot({ children }: { children: React.ReactNode }) {
    return (
        <SafeAreaView style={[stylesByWrapper.backgroundWrapper, {backgroundColor: colors.bgGrayCustom}]}>
            {children}
        </SafeAreaView >
    )
}