import Button from '@/components/domain/Home/Home/CustomButton'
import BusinessForm from '@/components/domain/Home/RequestCredit/BusinessForm'
import ClientForm from '@/components/domain/Home/RequestCredit/ClientForm'
import CreditForm from '@/components/domain/Home/RequestCredit/CreditForm'
import SocialForm from '@/components/domain/Home/RequestCredit/SocialForm'
import React from 'react'
import { StyleSheet, View } from 'react-native'

interface FormContentProps {
  stepId: string
  onNext: () => void
}

const FORM_COMPONENTS = {
  bi: ClientForm,
  contribuinte: CreditForm,
  empresa: SocialForm,
  trabalho: BusinessForm
} as const

const BUTTON_TEXT = {
  trabalho: 'Finalizar',
  default: 'Próxima etapa'
} as const

export const FormContent = ({ stepId, onNext }: FormContentProps) => {
  const FormComponent = FORM_COMPONENTS[stepId as keyof typeof FORM_COMPONENTS]
  const buttonText = stepId === 'trabalho' ? BUTTON_TEXT.trabalho : BUTTON_TEXT.default

  if (!FormComponent) return null

  return (
    <View style={styles.container}>
      <FormComponent />
      <View style={styles.buttonContainer}>
        <Button onPress={onNext} variant="default">
          {buttonText}
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24
  },
  buttonContainer: {
    paddingVertical: 2,
    backgroundColor: 'white'
  }
})