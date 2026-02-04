import { colors } from "@/utils/Constants/Styles";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

interface SelectCardProps {
  isSelected: boolean;
  onPress: () => void;
  children: React.ReactNode;
}

export const SelectCard = ({ isSelected, onPress, children }: SelectCardProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.card, isSelected ? styles.selected : styles.unselected]}
    >
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    borderWidth: 2,
    borderRadius: 12,
    padding: 12,
  },
  selected: {
    borderColor: colors.primary,
    backgroundColor: "#F2F2F2",
  },
  unselected: {
    borderColor: "#BFBFBF",
    backgroundColor: "white",
  },
});
