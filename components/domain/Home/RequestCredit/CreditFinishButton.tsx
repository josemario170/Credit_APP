import { ThemedText } from '@/components/ui/themed-text'
import { colors } from '@/utils/Constants/Styles'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

interface Props {
  total: number
  completed: number
  onPress: () => void
  text?: string
}

export const CreditFinishButton = ({
  total,
  completed,
  onPress,
  text
}: Props) => {
  const allCompleted = total === completed
  const remaining = total - completed

  return (
    <TouchableOpacity
      style={[
        styles.button,
        !allCompleted && styles.disabled
      ]}
      onPress={onPress}
      disabled={!allCompleted}
    >
      <ThemedText
        type="defaultSemiBold"
        lightColor={allCompleted ? 'gray' : 'white'}
      >
        {allCompleted ? 'Finalizar Pedido' : text || `Complete ${remaining} ${remaining === 1 ? 'passo' : 'passos'}`}
      </ThemedText>

      {allCompleted && (
        <MaterialCommunityIcons
          name="check-circle"
          size={20}
          color="#fff"
        />
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
    gap: 8
  },
  disabled: {
    backgroundColor: '#0b2e005f'
  }
})
