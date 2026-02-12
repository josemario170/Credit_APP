import Header from '@/components/Custom/Header'
import { CreditFinishButton } from '@/components/domain/Home/RequestCredit/CreditFinishButton'
import { CreditStepsList } from '@/components/domain/Home/RequestCredit/CreditStepsList'
import { SafeScreen } from '@/components/ui/safe-screen'
import { documentSteps } from '@/constants/stepsForm'
import { useCreditStepsManagement } from '@/hooks/management/useCreditStepsManagement'
import { windowHeight } from '@/utils/Constants/Styles'
import { HomeStyles } from '@/utils/Constants/styles/screens/Home/homeStyles'
import { router } from 'expo-router'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { ScrollView, StyleSheet, View } from 'react-native'

const RequestCreditScreen = () => {
  const formMethods = useFormContext()

  const {
    completedCount,
    isStepCompleted,
    isStepAccessible,
    getStepStatus,
    goToStep,
    finish
  } = useCreditStepsManagement({ steps: documentSteps, formMethods })

  return (
    <SafeScreen>
      <Header
        title="Pedido de Crédito"
        onBackPress={() => router.back()}
        text="Preencha as etapas e conclua o processo."
      />

      <View
        style={[
          HomeStyles.overlay,
          {
            paddingHorizontal: 16,
            marginTop: windowHeight * 0.20,
            backgroundColor: 'white',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingTop: 16,
            flex: 1
          }
        ]}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <CreditStepsList
            steps={documentSteps}
            getStatus={getStepStatus}
            isAccessible={isStepAccessible}
            isCompleted={isStepCompleted}
            onStepPress={goToStep}
          />
          <CreditFinishButton
            total={documentSteps.length}
            completed={completedCount}
            onPress={finish}
          />
        </ScrollView>
      </View>
    </SafeScreen>
  )
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 24
  }
})

export default RequestCreditScreen
