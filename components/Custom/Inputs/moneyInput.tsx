import { ThemedText } from '@/components/ui/themed-text'
import React, { useEffect, useMemo, useState } from 'react'
import { useController, useFormContext } from 'react-hook-form'
import { StyleSheet, TextInput, View } from 'react-native'

type PropsText = {
  label?: string
  name: string
  placeholder?: string
  error?: string
}

export const ThemeMoneyInput = ({ label, name, placeholder, error }: PropsText) => {
  const { control } = useFormContext()

  const {
    field: { onChange, value }
  } = useController({ control, name })

  // Função de formatação
  const formatMoney = (val: string) => {
    const numbersOnly = val.replace(/\D/g, '')

    if (!numbersOnly) return ''

    const number = parseInt(numbersOnly, 10)
    const cents = number % 100
    const reais = Math.floor(number / 100)

    const reaisFormatted = reais.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    const centsFormatted = cents.toString().padStart(2, '0')

    return `${reaisFormatted},${centsFormatted}`
  }

  const formattedFromValue = useMemo(() => {
    if (value === null || value === undefined) return ''
    return formatMoney(String(value))
  }, [value])

  const [internalValue, setInternalValue] = useState<string>(formattedFromValue)

  useEffect(() => {
    setInternalValue(formattedFromValue)
  }, [formattedFromValue])

  const handleChange = (text: string) => {
    const formatted = formatMoney(text)
    setInternalValue(formatted)

    const numeric = parseInt(text.replace(/\D/g, ''), 10)
    onChange(Number.isNaN(numeric) ? 0 : numeric)
  }

  return (
    <View style={styles.wrapper}>
      {label && <ThemedText type="defaultSemiBold" style={styles.label}>{label}</ThemedText>}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={internalValue}
          keyboardType="numeric"
          onChangeText={handleChange}
          placeholder={placeholder || '0,00'}
        />
        <ThemedText type="defaultSemiBold" style={styles.currency}>AOA(KZ)</ThemedText>
      </View>
      {error && <ThemedText style={styles.error}>{error}</ThemedText>}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    color: '#6B7280',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eaeaea61',
    borderBottomWidth: 2,
    borderBottomColor: '#e8e7e7',
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 18,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#111',
  },
  currency: {
    fontSize: 16,
    color: '#9E9E9E',
    marginLeft: 8,
  },
  error: {
    color: '#FF0000',
    fontSize: 12,
    marginTop: 4,
  }
})
