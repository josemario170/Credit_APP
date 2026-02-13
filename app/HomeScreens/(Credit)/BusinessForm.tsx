import Header from '@/components/Custom/Header'
import { ThemeTextInput } from '@/components/Custom/Inputs/Themed-Input'
import Button from '@/components/domain/Home/Home/CustomButton'
import { SafeScreen } from '@/components/ui/safe-screen'
import { documentSteps } from '@/constants/stepsForm'
import { useCreditStepsManagement } from '@/hooks/management/useCreditStepsManagement'
import { windowHeight } from '@/utils/Constants/Styles'
import { router } from 'expo-router'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TouchableWithoutFeedback, View } from 'react-native'

const BusinessForm = () => {
    const formMethods = useFormContext()
    const { finish, markStepAsCompleted } = useCreditStepsManagement({
        steps: documentSteps,
        formMethods
    })

    const handleNext = formMethods.handleSubmit(async () => {
        await markStepAsCompleted(documentSteps[3].id)
        finish()
    })

    const handleBack = () => {
        router.back()
    }

    return (
        <SafeScreen>
            <Header
                title={documentSteps[3].title}
                onBackPress={handleBack}
                text={documentSteps[3].description}
                image={documentSteps[3].image}
                subScreen
            />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <View
                    style={{
                        marginTop: windowHeight * 0.14,
                        backgroundColor: 'white',
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        paddingTop: 4,
                        flex: 1
                    }}
                >
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.scrollContent}
                        keyboardShouldPersistTaps="handled"
                        keyboardDismissMode="on-drag"
                    >
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <View style={{ gap: 16 }}>
                                <ThemeTextInput
                                    label="Tipo de Negócio"
                                    placeholder="Ex: Comércio, Agricultura, Serviços"
                                    name="negocio.tipoNegocio"
                                    autoCapitalize="words"
                                />

                                <ThemeTextInput
                                    label="Nº do Cartão de Contribuinte"
                                    placeholder="000000000"
                                    name="negocio.cartaoContribuinte"
                                    autoCapitalize="characters"
                                />

                                <ThemeTextInput
                                    label="Endereço do Negócio"
                                    placeholder="Digite o endereço completo"
                                    name="negocio.endereco"
                                    autoCapitalize="words"
                                />

                                <ThemeTextInput
                                    label="Tempo de Negócio"
                                    placeholder="Ex: 2 anos, 6 meses"
                                    name="negocio.tempoNegocio"
                                    autoCapitalize="words"
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    </ScrollView>

                    <View style={styles.buttonContainer}>
                        <Button
                            onPress={handleNext}
                            variant="default"
                        >
                            Próxima etapa
                        </Button>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeScreen>
    )
}

const styles = StyleSheet.create({
    keyboardView: {
        flex: 1
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 16
    },
    buttonContainer: {
        paddingHorizontal: 16,
        paddingVertical: 2,
        paddingTop: 8,
        backgroundColor: 'white'
    }
})

export default BusinessForm
