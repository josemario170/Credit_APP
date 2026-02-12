import { ThemedText } from '@/components/ui/themed-text'
import { colors } from '@/utils/Constants/Styles'
import { DocumentStep, StepStatus } from '@/utils/Types/Global'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface Props {
  step: DocumentStep
  status: StepStatus
  isAccessible: boolean
  onPress: () => void
}

export const CreditStepCard = ({
  step,
  status,
  isAccessible,
  onPress
}: Props) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        status === 'completed' && styles.completed,
        status === 'current' && styles.current,
        status === 'locked' && styles.locked
      ]}
      onPress={onPress}
      disabled={!isAccessible}
      activeOpacity={isAccessible ? 0.7 : 1}
    >
      {status !== 'locked' && (
        <Image
          source={require('@/assets/images/BannerTop.png')}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
        />
      )}

      {status === 'locked' && (
        <View style={styles.lockIcon}>
          <MaterialCommunityIcons
            name="lock"
            size={20}
            color="#ffffff63"
          />
        </View>
      )}

      <View style={[styles.imageWrapper, !isAccessible && { opacity: 0.5 }]}>
        <Image source={step.image} contentFit="contain" style={styles.image} />
      </View>

      <View style={styles.textWrapper}>
        <ThemedText
          type="smallSemiBold"
          style={[styles.title, !isAccessible && styles.textLocked]}
        >
          {step.title}
        </ThemedText>

        <View style={styles.badge}>
          <MaterialCommunityIcons
            name="circle"
            size={8}
            color={status === 'completed' ? "#cbc9c9ff" : status === 'current' ? colors.constrastText : '#949494'}
          />
          <Text
            style={[
              styles.badgeText,
              { color: status === 'completed' ? "#cbc9c9ff" : status === 'current' ? colors.constrastText : '#949494' }
            ]}
          >
            {status === 'completed' ? 'Concluído' : status === 'current' ? 'Em andamento' : 'Por preencher'}
          </Text>
        </View>
      </View>

      <MaterialCommunityIcons
        name="chevron-right"
        size={24}
        color={isAccessible ? '#fff' : '#D1D5DB'}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 16,
    paddingHorizontal: 20,
    backgroundColor: '#F9FAFB',
    overflow: 'hidden'
  },
  completed: {
    backgroundColor: '#F0FDF4'
  },
  current: {
    backgroundColor: colors.primary,
    elevation: 4
  },
  locked: {
    backgroundColor: '#35343442',
    opacity: 0.6
  },
  lockIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#7b7b7b8b',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12
  },
  imageWrapper: {
    width: 80,
    height: 80,
    justifyContent: 'center'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  textWrapper: {
    marginRight: 8
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: 'white'
  },
  textLocked: {
    color: '#7d7d7d'
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 4
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '500'
  }
})
