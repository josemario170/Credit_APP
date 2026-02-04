import { ArrowLeftSvg } from "@/Assets/images/svgs/exports";
import { useRouter } from "expo-router";
import { TouchableOpacity, View } from "react-native";

interface BackRootProps {
    onBack?: () => void;
    children: React.ReactNode;
}

export default function BackRoot({children, onBack}: BackRootProps) {
    const router = useRouter();
    return (
       <View>
        <TouchableOpacity onPress={onBack ? onBack : () => router.back()}>
            <ArrowLeftSvg />
        </TouchableOpacity>
        {children}
       </View>
    )
}