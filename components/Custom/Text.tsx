import type { ReactNode } from "react";
import type { StyleProp, TextProps, TextStyle } from "react-native";
import { Text } from "react-native";

interface Variants extends TextProps {
  weight: 'regular' | 'medium' | 'bold' | 'extraBold';
  color: string;
  size: 'xs' | 'sm' | 'md' | 'lg' | 'large' | 'extra-large';
  children: ReactNode;
  style?: StyleProp<TextStyle>;
}

const RNText = ({ weight, color, size, children, style, ...rest }: Variants) => {
  return (
    <Text
      {...rest}
      style={[
        {
          fontFamily:
            weight === 'regular'
              ? 'Manrope-Regular'
              : weight === 'medium'
              ? 'Manrope-Medium'
              : weight === 'bold'
              ? 'Manrope-Bold'
              : 'Manrope-ExtraBold',
          color: color,
          fontSize: size === 'xs' ? 8 : size === 'sm' ? 12 : size === 'md' ? 16 : size === 'lg' ? 20 : size === 'large' ? 24 : size === 'extra-large' ? 28 : 20,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

export default RNText;