import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import Button from "../../domain/Home/Home/CustomButton";
import RNText from "../Text";

interface OTPInputProps {
  length?: number;
  rounded?: boolean;
  onChange?: (value: string, completed: boolean) => void;
}

export default function OTPInput({
  length = 4,
  rounded = false,
  onChange,
}: OTPInputProps) {
  const [values, setValues] = useState<string[]>(Array(length).fill(""));
  const inputsRef = useRef<TextInput[]>([]);

  const handleChange = (text: string, index: number) => {
    if (text.length > 1) {
      const chars = text.split("").slice(0, length);
      setValues(chars);
      onChange?.(chars.join(""), chars.length === length);
      return;
    }

    const newValues = [...values];
    newValues[index] = text;
    setValues(newValues);
    if (text && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }

    const joined = newValues.join("");
    onChange?.(joined, joined.length === length);
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !values[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      {Array.from({ length }).map((_, i) => (
        <TextInput
          key={i}
          ref={(ref) => {
            if (ref) inputsRef.current[i] = ref;
          }}
          style={[
            styles.input,
            rounded ? styles.rounded : styles.noRounded,
          ]}
          keyboardType="number-pad"
          inputMode="numeric"
          maxLength={1}
          value={values[i]}
          onChangeText={(text) => handleChange(text, i)}
          onKeyPress={(e) => handleKeyPress(e, i)}
          textAlign="center"
          autoFocus={i === 0}
        />
      ))}
    </View>
  );
}

export const OTPTimerCountDown = ({onEnd}: {onEnd: () => void}) => {
  const DURATION = 5 * 60; 
  const [remaining, setRemaining] = useState(DURATION);

  useEffect(() => {
    const endTime = Date.now() + DURATION * 1000;
    const timer = setInterval(() => {
      const leftMs = endTime - Date.now();
      const leftSec = Math.max(0, Math.round(leftMs / 1000));
      setRemaining(leftSec);
      if (leftSec === 0) {
        clearInterval(timer);
      }
    }, 250);

    return () => clearInterval(timer);
  }, []);

  const mm = String(Math.floor(remaining / 60)).padStart(2, '0');
  const ss = String(remaining % 60).padStart(2, '0');

  return (
    <View>
      {
        remaining > 0 ? (
          <RNText className="mt-6 mb-4 text-center" size="md" weight="bold" color="gray">
            Reenviar código em {mm}:{ss}
          </RNText>
        ) : (
          <Button
            onPress={onEnd}
            className="mt-6 mb-4 text-center text-primary" size="md" variant="white">
            Reenviar código 
          </Button>
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  input: {
    width: 80,
    height: 80,
    borderWidth: 1.5,
    borderColor: "#ccc",
    fontSize: 24,
    textAlign: "center",
    flexDirection: "row",
    alignItems: "center",
    color: "#000",
    fontFamily: "Manrope-Regular",
  },
  rounded: {
    borderRadius: 999,
  },
  noRounded: {
    borderRadius: 8,
  },
});
