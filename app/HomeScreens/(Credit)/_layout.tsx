import { CreditFormProvider } from '@/utils/contexts/RequestCreditProvider'
import { Slot } from 'expo-router'

export default function CreditLayout() {
  return (
    <CreditFormProvider>
      <Slot />
    </CreditFormProvider>
  )
}
