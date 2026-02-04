import { colors } from "@/utils/Constants/Styles";
import cartStyles from "@/utils/Constants/styles/screens/cart";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleProp, TouchableOpacity, View, ViewStyle } from "react-native";

interface Props {
    children: React.ReactNode
    color?: string
    chevronColor?: string
    back?: boolean
    icon?: React.ComponentType<{ color?: string; size?: number; style?: StyleProp<ViewStyle> }>
    grantedSpace?: boolean  
}
export default function BlackRootAlternative({ children, color = "black", chevronColor, back = true, icon: Icon, grantedSpace = true }: Props) {
    const router = useRouter()
    return (
        <View style={[cartStyles.headerBar, { backgroundColor: color }]}>
           {
            back ? (
                <TouchableOpacity onPress={() => router.back()} style={cartStyles.headerBackButton}>
                    <Ionicons name="chevron-back" size={24} color={chevronColor || colors.white} />
                </TouchableOpacity>
            ) : Icon ? (
                <Icon size={24} style={cartStyles.headerBackButton} />
            ) : (
                <View style={{width: 40}} />
            )
           }
           {children}
         {grantedSpace && <View style={{width: 40}} />}
        </View>
    )
}