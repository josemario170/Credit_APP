import React, { useMemo, useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import RNText from "./Text";

interface CountryConfig {
  flag?: string;
  callingCode: string; 
}

interface PhoneNumberInputProps {
  value?: string; 
  onChangePhone?: (phone: string) => void;
  country?: CountryConfig;
  onPressChangeCountry?: () => void;
  placeholder?: string;
  className?: string;
}

const DEFAULT_COUNTRY: CountryConfig = {
  flag: "🇦🇴",
  callingCode: "+244",
};

export default function PhoneNumberInput({
  value,
  onChangePhone,
  country = DEFAULT_COUNTRY,
  onPressChangeCountry,
  placeholder = "Número de telefone",
  className = "",
}: PhoneNumberInputProps) {
  const [internal, setInternal] = useState("");
  const phone = value !== undefined ? value : internal;

  const error = useMemo(() => {
    if (!phone) return "";
    if (phone[0] !== "9") return "O número deve começar com 9.";
    if (phone.length > 0 && phone.length < 9) return "O número deve ter 9 dígitos.";
    return "";
  }, [phone]);

  const handleChange = (text: string) => {
    let digits = text.replace(/\D/g, "");

    if (digits.length > 0 && digits[0] !== "9") {
      // remove first non-9 and re-check; ensure we only allow starting with 9
      digits = digits.replace(/^[0-8]/, "");
      if (digits.length > 0 && digits[0] !== "9") digits = "";
    }

    if (digits.length > 9) digits = digits.slice(0, 9);

    if (onChangePhone) onChangePhone(digits);
    if (value === undefined) setInternal(digits);
  };

  return (
    <View className={`w-full ${className}`}>
      <View className="flex-row items-center gap-2">
        <TouchableOpacity
          onPress={onPressChangeCountry}
          activeOpacity={onPressChangeCountry ? 0.7 : 1}
          className="flex-row items-center justify-center px-3 py-3 rounded-xl border border-gray-300/80"
        >
          <RNText size="md" weight="regular" color="#111">
            {country.flag ?? ""}
          </RNText>
          <RNText size="md" weight="regular" color="#111" style={{ marginLeft: 6 }}>
            {country.callingCode}
          </RNText>
        </TouchableOpacity>

        <TextInput
          keyboardType="number-pad"
          inputMode="numeric"
          value={phone}
          onChangeText={handleChange}
          placeholder={placeholder}
          placeholderTextColor="#9ca3af"
          maxLength={9}
          className="flex-1 text-base text-gray-800 px-4 py-3 rounded-xl border border-gray-300/80"
        />
      </View>

      {error ? (
        <RNText size="sm" weight="regular" color="#EF4444" style={{ marginTop: 6 }}>
          {error}
        </RNText>
      ) : null}
    </View>
  );
}