import { ThemeTextInput } from '@/components/Custom/Inputs/Themed-Input'
import { ThemeDateInput } from '@/components/Custom/Inputs/ThemeDateInput'
import { ThemeSelect } from '@/components/Custom/Inputs/ThemeSelect'
import React, { useEffect } from 'react'
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

const ClientForm = () => {
    const formMethods = useFormContext() as any
    const { setValue, watch, getValues, formState: { errors } } = formMethods
    
    const dataNascimento = watch('cliente.dataNascimento')

    useEffect(() => {
        const telefoneAtual = getValues('cliente.telefone')
        if (!telefoneAtual) {
            setValue('cliente.telefone', '900000000', { 
                shouldValidate: false, 
                shouldDirty: false 
            })
        }
    }, [getValues, setValue])

    useEffect(() => {
        if (!dataNascimento) return
        
        const date = dataNascimento instanceof Date 
            ? dataNascimento 
            : new Date(dataNascimento as any)
        
        if (Number.isNaN(date.getTime())) return
        
        const idade = new Date().getFullYear() - date.getFullYear()
        setValue('cliente.idade', idade, { shouldValidate: false })
    }, [dataNascimento, setValue])

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
                                label="Nome do Solicitante"
                                placeholder="Digite o nome"
                                name="cliente.nome"
                                autoCapitalize="words"
                                error={errors.cliente?.nome?.message}
                            />
                            
                            <ThemeTextInput
                                label="Nº do Bilhete"
                                placeholder="00000000AB0000"
                                name="cliente.bi"
                                autoCapitalize="characters"
                                error={errors.cliente?.bi?.message}
                            />
                            
                            <ThemeDateInput
                                label="Data de Nascimento"
                                name="cliente.dataNascimento"
                            />
                            
                            <ThemeSelect
                                label="Género"
                                name="cliente.sexo"
                                options={[
                                    { label: 'Masculino', value: 'M' },
                                    { label: 'Feminino', value: 'F' }
                                ]}
                            />
                            
                            <ThemeTextInput
                                label="Residência"
                                placeholder="Digite o local de residência"
                                name="cliente.residencia"
                                autoCapitalize="words"
                                error={errors.cliente?.residencia?.message}
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

export default ClientForm