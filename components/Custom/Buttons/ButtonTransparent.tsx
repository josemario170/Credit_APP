import { ButtonTransparentStyles } from "@/utils/Constants/styles/components";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View, ViewStyle } from "react-native";

interface ButtonTransparentProps {
  label?: string;
  children?: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  icon?: keyof typeof Ionicons.glyphMap | React.ReactNode;
  className?: string;
  textClassName?: string;
  style?: ViewStyle;
}

const ButtonTransparent = ({
  label,
  children,
  onPress,
  disabled,
  icon,
  className = "",
  textClassName = "",
  style,
}: ButtonTransparentProps) => {
  const hasIcon = !!icon;

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      disabled={disabled}
      onPress={onPress}
      style={[ButtonTransparentStyles.container, style]}
    >
      {hasIcon && (
        typeof icon === "string" ? (
          <Ionicons
            name={icon as keyof typeof Ionicons.glyphMap}
            size={20}
            color="#737373"
            style={ButtonTransparentStyles.icon}
          />
        ) : (
          <View style={ButtonTransparentStyles.icon}>{icon}</View>
        )
      )}

      <View style={[ButtonTransparentStyles.content]}>
        {children ? (
          children
        ) : (
          <Text style={ButtonTransparentStyles.text}>
            {label}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ButtonTransparent;
