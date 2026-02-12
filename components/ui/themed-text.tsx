import { StyleSheet, Text, type TextProps } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link' | 'small' | 'extraSmall' | 'smallSemiBold';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        type === 'small' ? styles.small : undefined,
        type === 'extraSmall' ? styles.extraSmall : undefined,
        type === 'smallSemiBold' ? styles.smallSemiBold : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Manrope-Regular',
    fontWeight: 'regular',
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    fontFamily: 'Manrope-SemiBold',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
    fontFamily: 'Manrope-Bold',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 32,
    fontFamily: 'Manrope-Bold',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
    fontFamily: 'Manrope-Regular',
    fontWeight: 'regular',
  },
  small:{
    fontSize: 14,
    lineHeight: 16,
    fontFamily: 'Manrope-Regular',
    fontWeight: 'regular',
  },
  extraSmall:{
    fontSize: 12,
    lineHeight: 16,
    fontFamily: 'Manrope-Regular',
    fontWeight: 'regular',
  },
  smallSemiBold:{
    fontSize: 14,
    lineHeight: 16,
    fontFamily: 'Manrope-SemiBold',
    fontWeight: '600',
  }

});
