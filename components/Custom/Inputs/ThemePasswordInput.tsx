import { colors } from '@/utils/Constants/Styles'
import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View
} from 'react-native'

type Variant = 'default' | 'success' | 'error' | 'outline'

interface Props extends TextInputProps {
  name: string
  label?: string
  variant?: Variant
}

export const ThemePasswordInput = ({ name, label, variant = 'default', ...props }: Props) => {
  const [focused, setFocused] = useState(false)
  const [secure, setSecure] = useState(true)

  const { control, formState: { errors } } = useFormContext()

  const getBorderColor = () => {
    if (variant === 'error') return '#E53935'
    if (variant === 'success') return colors.primary
    if (focused) return colors.primary
    return '#e8e7e7ff'
  }

  return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      render={({ field: { value, onChange, onBlur } }) => (
        <View style={styles.wrapper}>
          {label && <Text style={styles.label}>{label}</Text>}

          <View style={[styles.inputContainer, { borderBottomColor: getBorderColor() }]}>
            <TextInput
              style={styles.input}
              value={value}
              secureTextEntry={secure}
              onChangeText={onChange}
              onBlur={() => {
                setFocused(false)
                onBlur()
              }}
              onFocus={() => setFocused(true)}
              {...props}
            />

            <TouchableOpacity onPress={() => setSecure(!secure)}>
              <Ionicons
                name={secure ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                color="#555"
              />
            </TouchableOpacity>
          </View>

          {errors[name] && <Text style={styles.error}>{errors[name]?.message as any}</Text>}
        </View>
      )}
    />
  )
}

const styles = StyleSheet.create({
  wrapper: { width: '100%' },
  label: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 6,
    padding: 4
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eaeaea61',
    borderBottomWidth: 2,
    borderTopRightRadius: 14,
    borderTopLeftRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 18
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#111'
  },
  error: {
    color: '#E53935',
    marginTop: 4,
    fontSize: 12
  }
})
