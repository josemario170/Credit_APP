import { InputStyles } from "@/utils/Constants/styles/components";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TextInput, View, ViewStyle } from "react-native";

interface InputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
  icon?: keyof typeof Ionicons.glyphMap | React.ReactNode;
  className?: string;
  style?: ViewStyle;
  onFocus?: () => void;
  onBlur?: () => void;
}

const Input = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  icon,
  className,
  style,
  onFocus,
  onBlur,
}: InputProps) => {
  return (
    <View className={className} style={[InputStyles.container, style]}>
      {label && <Text style={InputStyles.label}>{label}</Text>}

      <View style={[InputStyles.inputContainer]}>
        {icon &&
          (typeof icon === "string" ? (
            <Ionicons
              name={icon as keyof typeof Ionicons.glyphMap}
              size={20}
              color="#737373"
              style={InputStyles.icon}
            />
          ) : (
            <View style={InputStyles.icon}>{icon}</View>
          ))}
        <TextInput
          placeholder={secureTextEntry ? "●●●●●●●●" : placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholderTextColor="#9ca3af"
          style={[InputStyles.input, { paddingLeft: icon ? 40 : 20 }]}
        />
      </View>
    </View>
  );
};

export default Input;
