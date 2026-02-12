import { ArrowSet } from '@/assets/images/SVGS/export';
import { colors, windowHeight } from '@/utils/Constants/Styles';
import { HomeStyles } from '@/utils/Constants/styles/screens/Home/homeStyles';
import { Image } from 'expo-image';
import React from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import { ThemedText } from '../ui/themed-text';
import ButtonTransparent from './Buttons/ButtonTransparent';

interface propsHeader {
    title: string;
    text?: string;
    onBackPress?: () => void;
    showBackButton?: boolean;
    image?: string;
    subScreen?: boolean;
}

const Header = ({ title, onBackPress = () => { }, showBackButton = true, text, image, subScreen }: propsHeader) => {
    return (
        <View style={[HomeStyles.banner, {
            height: windowHeight * 0.22,
            backgroundColor: image ? colors.primary : "transparent"
        }]}>
            <Image
                source={image || require("@/assets/images/BannerTop.png")}
                style={[StyleSheet.absoluteFill, {
                    opacity: image ? 0.08 : 1,
                }]}
                contentFit="cover"
            />
            <View style={styles.headerContent}>
                {
                    showBackButton &&
                    <ButtonTransparent onPress={onBackPress}
                        icon={
                            !subScreen ? <ArrowSet width={20} height={20} color="#FFFFFF" /> :
                                <View style={{ flexDirection: 'row', alignItems: 'center', height: "100%", width: "100%" }}>
                                    <ArrowSet width={12} height={12} color="#FFFFFF" />
                                    <ArrowSet width={12} height={12} color="#FFFFFF" />
                                </View>
                        }
                    >
                    </ButtonTransparent>
                }
                <View style={styles.textContainer}>
                    <ThemedText type='subtitle' lightColor='white'>
                        {title}
                    </ThemedText>
                    {text && (
                        <ThemedText 
                            type='default' 
                            lightColor='white'
                            style={styles.subtitleText}
                        >
                            {text}
                        </ThemedText>
                    )}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: '#1F4D3B',
        position: "absolute",
        top: 0,
        left: 0,
    },
    headerContainer: {
        backgroundColor: '#1F4D3B',
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        padding: 20,
        paddingTop: windowHeight * 0.06
    },
    textContainer: {
        flex: 1,
        height: "100%",
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    subtitleText: {
        flexWrap: 'wrap', // Permite quebra de linha
        flexShrink: 1, 
        maxWidth: windowHeight * 0.4,
        fontSize: 14,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FFFFFF',
        textAlign: 'center',
    },
    spacer: {
        position: 'absolute',
        right: 0,
        width: 40,
        height: 40,
    },
    bottomCurve: {
        height: 20,
        backgroundColor: '#1F4D3B',
        marginHorizontal: -16,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
});

export default Header;