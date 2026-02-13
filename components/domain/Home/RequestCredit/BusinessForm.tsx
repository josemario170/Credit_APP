import { ThemeTextInput } from '@/components/Custom/Inputs/Themed-Input'
import React from 'react'
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

const BusinessForm = () => {
    const formMethods = useFormContext() as any
    const { formState: { errors } } = formMethods

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
                                label="Tipo de Negócio"
                                placeholder="Ex: Comércio, Agricultura, Serviços"
                                name="negocio.tipoNegocio"
                                autoCapitalize="words"
                                error={errors.negocio?.tipoNegocio?.message}
                            />
                            
                            <ThemeTextInput
                                label="Nº do Cartão de Contribuinte"
                                placeholder="000000000"
                                name="negocio.cartaoContribuinte"
                                autoCapitalize="characters"
                                error={errors.negocio?.cartaoContribuinte?.message}
                            />
                            
                            <ThemeTextInput
                                label="Endereço do Negócio"
                                placeholder="Digite o endereço completo"
                                name="negocio.endereco"
                                autoCapitalize="words"
                                error={errors.negocio?.endereco?.message}
                            />
                            
                            <ThemeTextInput
                                label="Tempo de Negócio"
                                placeholder="Ex: 2 anos, 6 meses"
                                name="negocio.tempoNegocio"
                                autoCapitalize="words"
                                error={errors.negocio?.tempoNegocio?.message}
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

export default BusinessForm