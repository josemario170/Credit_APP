import { ThemeMoneyInput } from '@/components/Custom/Inputs/moneyInput'
import { ThemeTextArea } from '@/components/Custom/Inputs/Textarea'
import { ThemeTextInput } from '@/components/Custom/Inputs/Themed-Input'
import React, { useLayoutEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    TouchableWithoutFeedback,
    View
} from 'react-native'

const CreditForm = () => {
    const formMethods = useFormContext() as any
    const { setValue, formState: { errors } } = formMethods

    const generatePedidoNumber = () => {
        const timestamp = Date.now()
        return `PED-${timestamp.toString().slice(-6)}`
    }

    const numberParser = (text: string) => {
        const clean = text.replace(/[^0-9.]/g, '')
        if (!clean) return undefined
        const n = Number(clean)
        return Number.isFinite(n) ? n : undefined
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

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardView}
        >
            <View style={styles.formContainer}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                    keyboardDismissMode="on-drag"
                >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.fieldContainer}>
                            <ThemeTextInput
                                label="Nº do Ciclo"
                                placeholder="1"
                                name="pedido.numeroCiclo"
                                keyboardType="numeric"
                                valueParser={numberParser}
                                error={errors.pedido?.numeroCiclo?.message}
                            />
                            
                            <ThemeTextInput
                                label="Produto"
                                placeholder="Digite o produto"
                                name="pedido.produto"
                                autoCapitalize="words"
                                disabled
                                error={errors.pedido?.produto?.message}
                            />
                            
                            <ThemeMoneyInput
                                label="Valor Solicitado"
                                placeholder="0"
                                name="pedido.valorSolicitado"
                                error={errors.pedido?.valorSolicitado?.message}
                            />
                            
                            <ThemeTextArea
                                label="Finalidade do Crédito"
                                placeholder="Digite a finalidade"
                                name="pedido.finalidade"
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    keyboardView: {
        flex: 1
    },
    formContainer: {
        flex: 1,
        backgroundColor: 'white'
    },
    scrollContent: {
        paddingBottom: 16
    },
    fieldContainer: {
        gap: 16
    }
})

export default CreditForm