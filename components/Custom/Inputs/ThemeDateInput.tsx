import { colors } from '@/utils/Constants/Styles'
import DateTimePicker from '@react-native-community/datetimepicker'
import React, { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { ThemedText } from '../../ui/themed-text'

type Variant = 'default' | 'success' | 'error' | 'outline'

interface Props {
  name: string
  label?: string
  variant?: Variant
  defaultValue?: Date
  error?: string
}

export const ThemeDateInput = ({ name, label, variant = 'default', defaultValue, error }: Props) => {
  const defaultDate = defaultValue || new Date(2000, 1, 1)
  const [show, setShow] = useState(false)
  const [focused, setFocused] = useState(false)

  const { control, formState: { errors } } = useFormContext()

  const getByPath = (obj: any, path: string) =>
    path.split('.').reduce((acc, key) => (acc ? acc[key] : undefined), obj)

  const getBorderColor = () => {
    if (variant === 'error') return '#E53935'
    if (variant === 'success') return colors.primary
    if (focused) return colors.primary
    return '#e8e7e7ff'
  }

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultDate}
      render={({ field: { value, onChange } }) => (
        <View style={styles.wrapper}>
          {label && <Text style={styles.label}>{label}</Text>}

          <TouchableOpacity
            style={[styles.inputContainer, { borderBottomColor: getBorderColor() }]}
            onPress={() => {
              setFocused(true)
              setShow(true)
            }}
          >
            <ThemedText type='defaultSemiBold' style={styles.dateText}>
              {formatDate(value)}
            </ThemedText>
          </TouchableOpacity>

          {show && (
            <DateTimePicker
              value={value}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(event, selectedDate) => {
                setShow(false)
                setFocused(false)
                if (selectedDate) onChange(selectedDate)
              }}
            locale='pt'
            />
          )}

          {(getByPath(errors, name) || error) && (
            <ThemedText style={styles.error}>{getByPath(errors, name)?.message as any || error}</ThemedText>
          )}
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
    backgroundColor: '#eaeaea61',
    borderBottomWidth: 2,
    borderTopRightRadius: 14,
    borderTopLeftRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 18
  },
  dateText: {
    fontSize: 16,
    color: '#111',
    fontWeight: 'black'
  },
  error: {
    color: '#E53935',
    marginTop: 4,
    fontSize: 12
  }
})
