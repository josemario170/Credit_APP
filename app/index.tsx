import { Image } from "expo-image";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { ContractSVG, EyeToCloseSVG, EyeToOpenSVG, NotificationSvg, UserAvatar } from "@/assets/images/SVGS/export";
import BottomNavbar from "@/components/Custom/NavBar";
import ActionButtonsRow from "@/components/domain/Home/Home/ActionsButton";
import MovimentosScreen from "@/components/domain/Home/Home/TransictionsList";
import { SafeScreen } from "@/components/safe-screen";
import { ThemedText } from "@/components/themed-text";
import { colors } from "@/utils/Constants/Styles";
import { HomeStyles } from "@/utils/Constants/styles/screens/Home/homeStyles";
import { useState } from "react";

export default function HomeScreen() {
  const [showBalance, setShowBalance] = useState(true);
  const moneyDisplay = showBalance ? "1.000.000,00 AOA" : "** ** ** ** ** **";
  return (
    <SafeScreen>
      <View style={HomeStyles.banner}>
        <Image
          source={require("@/assets/images/BannerTop.png")}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
        />

        <View style={HomeStyles.overlay}>
          <View style={HomeStyles.headerRow}>
            <View style={HomeStyles.avatar}>
              <UserAvatar color="white" />
            </View>

            <View style={HomeStyles.userInfo}>
              <ThemedText type="small" lightColor="white">
                Bem-vindo,
              </ThemedText>
              <ThemedText type="subtitle" style={HomeStyles.userName}>
                José Mário
              </ThemedText>
            </View>
          </View>

          <View style={[HomeStyles.avatar, { backgroundColor: "white" }]}>
            <NotificationSvg color="black" />
          </View>
        </View>
      </View>

      <View style={HomeStyles.DashboardContent}>
        <View style={HomeStyles.DashboardTopPieceCard}>
          <ThemedText type="default" lightColor={colors.constrastText}>
            Saldo da Carteira
          </ThemedText>
          <TouchableOpacity onPress={() => setShowBalance(!showBalance)} style={{ alignItems: "center", justifyContent: "center", }}>
            <ThemedText type="subtitle" lightColor="white">
              {moneyDisplay}
            </ThemedText>
            <View style={{ paddingTop: 9, width: 22, height: 20, alignItems: "center", justifyContent: "center", }}>
              {showBalance ? <EyeToCloseSVG /> : <EyeToOpenSVG />}
            </View>
          </TouchableOpacity>
        </View>
        <View style={HomeStyles.DashboardBottomPieceCard}>
          <View style={HomeStyles.cardMiniSections}>
            <ThemedText type="extraSmall" lightColor={colors.gray300}>
              Inadiplência
            </ThemedText>
            <ThemedText type="subtitle" lightColor={colors.white}>
              14%
            </ThemedText>
          </View>
          <View style={HomeStyles.cardMiniSections}>
            <ThemedText type="extraSmall" lightColor={colors.gray300}>
              Contratos Activos
            </ThemedText>
            <ThemedText type="subtitle" lightColor={colors.white}>
              6
            </ThemedText>
          </View>
          <View style={{ alignItems: "flex-start", justifyContent: "center", paddingLeft: 8, height: "100%" }}>
            <ContractSVG width={28} height={28} />
          </View>
        </View>
      </View>

      <View style={HomeStyles.content}>
        <ActionButtonsRow />
        <MovimentosScreen />
        <BottomNavbar />
      </View>
    </SafeScreen>
  );
}
