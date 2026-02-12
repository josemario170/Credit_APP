import Header from '@/components/Custom/Header'
import { ThemeMoneyInput } from '@/components/Custom/Inputs/moneyInput'
import { ThemeTextArea } from '@/components/Custom/Inputs/Textarea'
import { ThemeTextInput } from '@/components/Custom/Inputs/Themed-Input'
import Button from '@/components/domain/Home/Home/CustomButton'
import { SafeScreen } from '@/components/ui/safe-screen'
import { documentSteps } from '@/constants/stepsForm'
import { useCreditStepsManagement } from '@/hooks/management/useCreditStepsManagement'
import { windowHeight } from '@/utils/Constants/Styles'
import { router } from 'expo-router'
import React, { useLayoutEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TouchableWithoutFeedback, View } from 'react-native'

const CreditForm = () => {
    const formMethods = useFormContext() as any
    const { trigger, setValue } = formMethods

    const {
        goToStep,
        markStepAsCompleted,
    } = useCreditStepsManagement({ steps: documentSteps, formMethods })

    const generatePedidoNumber = () => {
        const timestamp = Date.now()
        return `PED-${timestamp.toString().slice(-6)}`
    }
    
    useLayoutEffect(() => {
        const today = new Date()
        setValue('pedido.numeroPedido', generatePedidoNumber())
        setValue('pedido.dataCriacao', today)
        setValue('pedido.dataSolicitacao', today)
        setValue('pedido.numeroCiclo', 1)
        setValue('pedido.produto', 'KIXI AGRO CABINDA')
        setValue('pedido.valorAprovado', 100)
    }, [setValue])

    const handleNext = async () => {
        const ok = await trigger([
            'pedido.numeroPedido',
            'pedido.finalidade',
            'pedido.numeroCiclo',
            'pedido.produto',
            'pedido.valorSolicitado',
            'pedido.dataSolicitacao',
            'pedido.dataCriacao',
            'pedido.valorAprovado'
        ] as any)
        console.log(ok)

        if (!ok) return
        console.log(formMethods.getValues())
        await markStepAsCompleted(documentSteps[1].id)
        goToStep(documentSteps[2])
    }

    const numberParser = (text: string) => {
        const clean = text.replace(/[^0-9.]/g, '')
        if (!clean) return undefined
        const n = Number(clean)
        return Number.isFinite(n) ? n : undefined
    }

    return (
        <SafeScreen>
            <Header
                title={documentSteps[1].title}
                onBackPress={() => router.back()}
                text={documentSteps[1].description}
                image={documentSteps[1].image}
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
                                    label="Nº do Ciclo"
                                    placeholder="1"
                                    name='pedido.numeroCiclo'
                                    keyboardType="numeric"
                                    valueParser={numberParser}
                                />
                                <ThemeTextInput
                                    label="Produto"
                                    placeholder="Digite o produto"
                                    name='pedido.produto'
                                    autoCapitalize="words"
                                    disabled
                                />
                                <ThemeMoneyInput
                                    label="Valor Solicitado"
                                    placeholder="0"
                                    name='pedido.valorSolicitado'
                                />
                                <ThemeTextArea
                                    label="Finalidade do Crédito"
                                    placeholder="Digite a finalidade"
                                    name='pedido.finalidade'
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
        paddingBottom: 16,
    },
    buttonContainer: {
        paddingHorizontal: 16,
        paddingVertical: 2,
        paddingTop: 8,
        backgroundColor: 'white',
    },
})

export default CreditForm