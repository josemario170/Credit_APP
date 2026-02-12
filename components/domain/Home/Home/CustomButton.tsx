import { colors } from "@/utils/Constants/Styles";
import React from "react";
import { Image, Text, TouchableOpacity } from "react-native";

type Variant = 'primary' | 'outline' | 'danger' | 'white' | 'default';
type Size = 'sm' | 'md' | 'lg';

type ButtonProps = {
  children: React.ReactNode;
  onPress: () => void;
  className?: string;
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  backgroundColor?: string;
};

const Button: React.FC<ButtonProps> = ({
  children,
  onPress,
  variant = 'primary',
  disabled = false,
  backgroundColor,
  }) => {

  const variants: Record<Variant, string> = {
    primary: colors.primary,
    outline: `border border-${colors.primary} text-${colors.primary}`,
    danger: 'bg-red-500',
    white: 'bg-white',
    default: colors.primary,
  };

  const sizes: Record<Size, string> = {
    sm: 'px-3 py-1',
    md: 'px-5 py-4',
    lg: 'px-7 py-3',
  };

  return (
    <TouchableOpacity
      aria-disabled={disabled}
      disabled={disabled}
      onPress={disabled ? undefined : onPress}
      style={{
        backgroundColor: backgroundColor ? backgroundColor : variant === 'primary' ? colors.primary : variant === "danger" ? '#FF0000' : variant === "white" ? '#FFFFFF' : variant === "default" ? colors.primary : 'transparent' ,
        padding: 14,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: variant === 'primary' ? 'transparent' : variant === "danger" ? '#FF0000' : variant === "white" ? '#FFFFFF' : 'black',
        width: variant === 'primary' ? '50%' : '100%',
        height: 58,
        alignSelf: 'center',
        opacity: disabled ? 0.6 : 1,
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
     {
      variant === 'primary' && (
         <Image source={require("@/assets/images/bg-button.png")}
        style={{position: "absolute", top: 0, left: -20, right: 0, bottom: 0,
          width: 100,
          height: 100,
        }}
      />
      )
     }
      <Text 
        style={{
          color: variant === 'primary' ? 'white' : variant === "danger" ? 'white' : variant === "white" ? 'auto' : variant === "default" ? colors.white : 'black',
          fontFamily: 'Manrope-Regular',
          textAlign: 'center',
        }}
      >{children}</Text>
    </TouchableOpacity>
  );
};

export default Button;
