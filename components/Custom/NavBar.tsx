import { ContractsSVG, HomeSVG, OptionsSVG, WalletSVG } from '@/assets/images/SVGS/export';
import { colors, windowHeight, windowWidth } from '@/utils/Constants/Styles';
import React, { useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { ThemedText } from '../ui/themed-text';

const BottomNavbar = ({ onTabPress }: any) => {
  const [activeTab, setActiveTab] = useState('home');

  const tabs = [
    {
      id: 'home',
      label: 'Início',
      icon: HomeSVG,
    },
    {
      id: 'wallet',
      label: 'Carteira',
      icon: WalletSVG,
    },
    {
      id: 'contracts',
      label: 'Contratos',
      icon: ContractsSVG,
    },
    {
      id: 'options',
      label: 'Opções',
      icon: OptionsSVG,
    },
  ];

  const handleTabPress = (tabId: string) => {
    setActiveTab(tabId);
    if (onTabPress) {
      onTabPress(tabId);
    }
  };

  const TabItem = ({ tab }: { tab: typeof tabs[0] }) => {
    const isActive = activeTab === tab.id;
    const IconComponent = tab.icon;

    return (
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => handleTabPress(tab.id)}
        activeOpacity={0.7}
      >
        <View style={{
          width: 24,
          height: 24,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 12,
        }}>
          <IconComponent
            width={22}
            height={22}
            color={isActive ? '#FFFFFF' : colors.gray500}
          />
        </View>
        <ThemedText
          type="smallSemiBold"
          style={{ fontWeight: isActive ? '600' : '500' }}
          lightColor={isActive ? '#FFFFFF' : colors.gray500}
        >
          {tab.label}
        </ThemedText>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.navbarContainer}>
      <View style={styles.navbar}>
        {tabs.map((tab) => (
          <TabItem key={tab.id} tab={tab} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navbarContainer: {
    paddingBottom: 8,
    position: "absolute",
    bottom: windowHeight * 0.002,
    width: windowWidth,
    backgroundColor: "white",
  },
  navbar: {
    flexDirection: 'row',
    backgroundColor: '#1F4D3B',
    borderRadius: 16,
    marginHorizontal: 12,
    padding: 8,
    height: 82,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    gap: 8,
  },
});

export default BottomNavbar;
