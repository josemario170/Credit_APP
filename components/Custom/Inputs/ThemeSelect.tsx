import { ThemedText } from '@/components/ui/themed-text'
import { colors } from '@/utils/Constants/Styles'
import React, { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

type Variant = 'default' | 'success' | 'error' | 'outline'

interface Option {
  label: string
  value: string
}

interface Props {
  name: string
  label?: string
  options: Option[]
  variant?: Variant
}

export const ThemeSelect = ({ name, label, options, variant = 'default' }: Props) => {
  const [visible, setVisible] = useState(false)
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

  return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      render={({ field: { value, onChange } }) => {
        const selectedLabel = options.find(o => o.value === value)?.label || 'Selecionar'

        return (
          <View style={styles.wrapper}>
            {label && <Text style={styles.label}>{label}</Text>}

            <TouchableOpacity
              style={[styles.inputContainer, { borderBottomColor: getBorderColor() }]}
              activeOpacity={0.8}
              onPress={() => {
                setFocused(true)
                setVisible(true)
              }}
            >
              <ThemedText style={styles.selectText}>{selectedLabel}</ThemedText>
            </TouchableOpacity>

            <Modal visible={visible} transparent animationType="slide">
              <View style={styles.overlay}>
                <TouchableOpacity
                  style={styles.backdrop}
                  activeOpacity={1}
                  onPress={() => {
                    setVisible(false)
                    setFocused(false)
                  }}
                />

                <View style={styles.sheet}>
                  <View style={styles.dragIndicator} />

                  <FlatList
                    data={options}
                    keyExtractor={(item) => item.value}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => {
                      const isSelected = item.value === value
                      return (
                        <TouchableOpacity
                          style={styles.option}
                          onPress={() => {
                            onChange(item.value)
                            setVisible(false)
                            setFocused(false)
                          }}
                        >
                          <Text
                            style={[
                              styles.optionText,
                              isSelected && { color: colors.primary }
                            ]}
                          >
                            {item.label}
                          </Text>
                        </TouchableOpacity>
                      )
                    }}
                  />
                </View>
              </View>
            </Modal>

            {getByPath(errors, name) && (
              <Text style={styles.error}>{getByPath(errors, name)?.message as any}</Text>
            )}
          </View>
        )
      }}
    />
  )
}

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
    backgroundColor: '#eaeaea61',
    borderBottomWidth: 2,
    borderTopRightRadius: 14,
    borderTopLeftRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 18
  },

  selectText: {
    fontSize: 16,
    color: '#111'
  },

  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#00000055'
  },

  backdrop: {
    flex: 1
  },

  sheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '60%',
    paddingBottom: 20
  },

  dragIndicator: {
    width: 40,
    height: 5,
    backgroundColor: '#ddd',
    borderRadius: 10,
    alignSelf: 'center',
    marginVertical: 10
  },

  option: {
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: '#f0f0f0'
  },

  optionText: {
    fontSize: 16,
    color: '#111'
  },

  error: {
    color: '#E53935',
    marginTop: 4,
    fontSize: 12
  }
})
