import { DocumentStep, StepStatus } from '@/utils/Types/Global'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { CreditStepCard } from './CreditStepCard'


interface Props {
  steps: DocumentStep[]
  getStatus: (step: DocumentStep) => StepStatus
  isAccessible: (stepNumber: number) => boolean
  isCompleted: (id: string) => boolean
  onStepPress: (step: DocumentStep) => void
}

export const CreditStepsList = ({
  steps,
  getStatus,
  isAccessible,
  isCompleted,
  onStepPress
}: Props) => {
  return (
    <View style={styles.container}>
      {steps.map((step, index) => {
        const status = getStatus(step)

        return (
          <View key={step.id}>
            <CreditStepCard
              step={step}
              status={status}
              isAccessible={isAccessible(step.stepNumber)}
              onPress={() => onStepPress(step)}
            />

            {index < steps.length - 1 && (
              <View style={styles.connector}>
                <View
                  style={[
                    styles.connectorInner,
                    isCompleted(step.id) && styles.completed
                  ]}
                />
              </View>
            )}
          </View>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 0
  },
  connector: {
    height: 24,
    alignItems: 'center',
    marginLeft: 32
  },
  connectorInner: {
    width: 2,
    height: '100%',
    backgroundColor: '#E5E7EB'
  },
  completed: {
    backgroundColor: '#10B981'
  }
})
