import { ThemedText } from '@/components/ui/themed-text'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { StyleSheet, TextInput, View } from 'react-native'

interface Props {
  label?: string
  name: string
  placeholder?: string
  numberOfLines?: number
}

export const ThemeTextArea = ({
  label,
  name,
  placeholder,
  numberOfLines = 4
}: Props) => {
  const { control } = useFormContext()
  
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <View style={styles.wrapper}>
          {label && <ThemedText type="defaultSemiBold" style={styles.label}>{label}</ThemedText>}
          <TextInput
            style={[styles.input, { height: numberOfLines * 24 }]}
            value={value}
            onChangeText={onChange}
            placeholder={placeholder}
            multiline
            textAlignVertical="top"
            keyboardType="default"
            scrollEnabled={false} 
          />
        </View>
      )}
    />
  )
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    marginBottom: 12
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    color: '#6B7280'
  },
  input: {
    backgroundColor: '#eaeaea61',
    borderBottomWidth: 2,
    borderBottomColor: '#e8e7e7',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: '#111'
  }
})