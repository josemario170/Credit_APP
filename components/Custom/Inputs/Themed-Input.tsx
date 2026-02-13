import { colors } from '@/utils/Constants/Styles'
import React, { forwardRef, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle
} from 'react-native'

type Variant = 'default' | 'success' | 'error' | 'outline'

interface Props extends TextInputProps {
  name: string
  label?: string
  variant?: Variant
  prefix?: string
  containerStyle?: ViewStyle
  disabled?: boolean
  valueParser?: (text: string) => any
  error?: string
}

export const ThemeTextInput = forwardRef<TextInput, Props>(
  ({ name, label, variant = 'default', prefix, containerStyle, disabled, valueParser, error, ...props }, ref) => {
    const [focused, setFocused] = useState(false)
    const { control, formState: { errors } } = useFormContext()

    const getByPath = (obj: any, path: string) =>
      path.split('.').reduce((acc, key) => (acc ? acc[key] : undefined), obj)

    const errorMessage = getByPath(errors, name)?.message as any
    const finalError = error ?? errorMessage

    const getBorderColor = () => {
      if (variant === 'error' || finalError) return '#E53935'
      if (variant === 'success') return colors.primary
      if (focused) return colors.primary
      if (variant === 'outline') return '#CFCFCF'
      return '#e8e7e7ff'
    }

    return (
      <Controller
        control={control}
        name={name}
        defaultValue={props.defaultValue ?? ''}
        render={({ field: { value, onChange, onBlur } }) => (
          <View style={[styles.wrapper, containerStyle]}>
            {label && <Text style={styles.label}>{label}</Text>}

            <View
              style={[
                styles.inputContainer,
                { borderBottomColor: getBorderColor() }
              ]}
            >
              {prefix && <Text style={styles.prefix}>{prefix}</Text>}

              <TextInput
                ref={ref}
                style={styles.input}
                placeholderTextColor="#9E9E9E"
                value={value as any}
                onChangeText={(text) => onChange(valueParser ? valueParser(text) : text)}
                onBlur={() => {
                  setFocused(false)
                  onBlur()
                }}
                onFocus={() => setFocused(true)}
                editable={!disabled}
                {...props}
              />
            </View>

            {finalError && <Text style={styles.error}>{finalError}</Text>}
          </View>
        )}
      />
    )
  }
)

const styles = StyleSheet.create({
  wrapper: {
    width: '100%'
  },

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

  prefix: {
    fontSize: 16,
    color: '#424242',
    marginRight: 8
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
