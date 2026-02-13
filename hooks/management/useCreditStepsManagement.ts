import { DocumentStep, StepStatus } from '@/utils/Types/Global'
import { useEffect, useMemo, useState } from 'react'
import { FieldValues, UseFormReturn } from 'react-hook-form'
import { Alert } from 'react-native'
import { z } from 'zod'

let persistedCompletedSteps: Record<string, boolean> = {}
let persistedCurrentStep = 1
const persistedListeners = new Set<() => void>()

const emitPersisted = () => {
  persistedListeners.forEach((l) => l())
}

interface Props<T extends FieldValues> {
  steps: DocumentStep[]
  formMethods: UseFormReturn<T> // hook do react-hook-form
  stepSchemas?: Record<string, z.ZodType<any>> // schema opcional por step
}

export const useCreditStepsManagement = <T extends FieldValues>({
  steps,
  formMethods,
  stepSchemas
}: Props<T>) => {
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>(persistedCompletedSteps)
  const [currentStep, setCurrentStep] = useState<number>(persistedCurrentStep)

  useEffect(() => {
    const listener = () => {
      setCompletedSteps(persistedCompletedSteps)
      setCurrentStep(persistedCurrentStep)
    }
    persistedListeners.add(listener)
    return () => {
      persistedListeners.delete(listener)
    }
  }, [])

  useEffect(() => {
    const nextIncomplete = steps.find(step => !completedSteps[step.id])
    if (nextIncomplete) setCurrentStep(nextIncomplete.stepNumber)
  }, [completedSteps, steps])

  const getCompletedStepsSnapshot = () => persistedCompletedSteps

  const isStepCompleted = (id: string) => !!getCompletedStepsSnapshot()[id]

  const isStepAccessible = (stepNumber: number) => {
    if (!Number.isFinite(stepNumber) || stepNumber <= 1) return true
    const previousStep = steps.find(s => s.stepNumber === stepNumber - 1)
    if (!previousStep) return false
    return !!getCompletedStepsSnapshot()[previousStep.id]
  }

  const getStepStatus = (step: DocumentStep): StepStatus => {
    if (isStepCompleted(step.id)) return 'completed'
    if (currentStep === step.stepNumber) return 'current'
    if (!isStepAccessible(step.stepNumber)) return 'locked'
    return 'available'
  }

  const goToStep = async (step: DocumentStep) => {
    if (!step) return
    if (!isStepAccessible(step.stepNumber)) {
      Alert.alert('Atenção', 'Complete o passo anterior primeiro')
      return
    }

    const currentStepSchema = stepSchemas?.[step.id]
    if (currentStepSchema) {
      try {
        await currentStepSchema.parseAsync(formMethods.getValues())
      } catch (err) {
        Alert.alert('Erro', 'Complete os campos obrigatórios antes de prosseguir')
        return
      }
    }

    persistedCurrentStep = step.stepNumber
    setCurrentStep(step.stepNumber)
    emitPersisted()
  }

  const markStepAsCompleted = async (id: string) => {
    const stepSchema = stepSchemas?.[id]
    if (stepSchema) {
      try {
        await stepSchema.parseAsync(formMethods.getValues())
      } catch (err) {
        Alert.alert('Erro', 'Preencha corretamente os campos antes de marcar como concluído')
        return
      }
    }

    persistedCompletedSteps = {
      ...persistedCompletedSteps,
      [id]: true
    }
    setCompletedSteps(persistedCompletedSteps)
    emitPersisted()
  }

  const resetSteps = () => {
    persistedCompletedSteps = {}
    persistedCurrentStep = 1
    setCompletedSteps({})
    setCurrentStep(1)
    emitPersisted()
  }

  const completedCount = useMemo(
    () => Object.values(completedSteps).filter(Boolean).length,
    [completedSteps]
  )

  const allCompleted = useMemo(
    () => steps.every(step => completedSteps[step.id]),
    [completedSteps, steps]
  )

  const finish = async () => {
    if (!allCompleted) {
      Alert.alert('Atenção', 'Complete todos os passos antes de finalizar')
      return
    }

    if (stepSchemas) {
      try {
        for (const schema of Object.values(stepSchemas)) {
          await schema.parseAsync(formMethods.getValues())
        }
      } catch (err) {
        Alert.alert('Erro', 'Alguma etapa não está preenchida corretamente')
        return
      }
    }

    Alert.alert(
      'Finalizar Pedido',
      'Deseja enviar o pedido de crédito?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Enviar', onPress: () => console.log('Pedido enviado') }
      ]
    )
  }

  return {
    currentStep,
    completedSteps,
    completedCount,
    allCompleted,
    isStepCompleted,
    isStepAccessible,
    getStepStatus,
    goToStep,
    markStepAsCompleted,
    resetSteps,
    finish
  }
}
