import Header from '@/components/Custom/Header'
import { CreditStepsList } from '@/components/domain/Home/RequestCredit/CreditStepsList'
import { FormContent } from '@/components/domain/Home/RequestCredit/FormContent'
import { SafeScreen } from '@/components/ui/safe-screen'
import { useRequestCreditForm } from '@/hooks/management/useRequestCreditManage'
import { windowHeight, windowWidth } from '@/utils/Constants/Styles'
import React from 'react'
import { FormProvider } from 'react-hook-form'
import { StyleSheet, View } from 'react-native'

const RequestCreditScreen = () => {
  const {
    formMethods,
    showingStepId,
    activeStep,
    isFormVisible,
    steps,
    getStepStatus,
    isStepAccessible,
    isStepCompleted,
    openStep,
    handleNext,
    handleBackPress
  } = useRequestCreditForm()

  return (
    <SafeScreen>
      <Header
        title={activeStep?.title ?? "Pedido de Crédito"}
        onBackPress={handleBackPress}
        text={activeStep?.description ?? "Preencha as etapas e conclua o processo."}
        image={activeStep?.image}
        subScreen={!!activeStep}
      />

      <View style={[styles.container, { paddingTop: isFormVisible ? 0 : 18 }]}>
        {!isFormVisible ? (
          <CreditStepsList
            steps={steps}
            getStatus={getStepStatus}
            isAccessible={isStepAccessible}
            isCompleted={isStepCompleted}
            onStepPress={(step) => openStep(step.id)}
          />
        ) : (
          <FormProvider {...formMethods}>
            <FormContent 
              stepId={showingStepId!} 
              onNext={handleNext} 
            />
          </FormProvider>
        )}
      </View>
    </SafeScreen>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: windowHeight * 0.15,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
    width: windowWidth
  }
})

export default RequestCreditScreen
