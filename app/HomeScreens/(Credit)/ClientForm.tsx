import Header from '@/components/Custom/Header'
import { ThemeTextInput } from '@/components/Custom/Inputs/Themed-Input'
import { ThemeDateInput } from '@/components/Custom/Inputs/ThemeDateInput'
import { ThemeSelect } from '@/components/Custom/Inputs/ThemeSelect'
import Button from '@/components/domain/Home/Home/CustomButton'
import { SafeScreen } from '@/components/ui/safe-screen'
import { documentSteps } from '@/constants/stepsForm'
import { useCreditStepsManagement } from '@/hooks/management/useCreditStepsManagement'
import { windowHeight } from '@/utils/Constants/Styles'
import { router } from 'expo-router'
import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TouchableWithoutFeedback, View } from 'react-native'

const ClientForm = () => {
    const formMethods = useFormContext() as any
    const { setValue, watch, trigger, getValues, formState: { errors } } = formMethods

    const dataNascimento = watch('cliente.dataNascimento')

    useEffect(() => {
        const telefoneAtual = getValues('cliente.telefone')
        if (!telefoneAtual) {
            setValue('cliente.telefone', '900000000', { shouldValidate: false, shouldDirty: false })
        }
    }, [getValues, setValue])

    useEffect(() => {
        if (!dataNascimento) return
        const date = dataNascimento instanceof Date ? dataNascimento : new Date(dataNascimento as any)
        if (Number.isNaN(date.getTime())) return
        setValue('cliente.idade', new Date().getFullYear() - date.getFullYear(), { shouldValidate: false })
    }, [dataNascimento, setValue])

    const {
        goToStep,
        markStepAsCompleted,
    } = useCreditStepsManagement({ steps: documentSteps, formMethods })

    const handleNext = async () => {
        const ok = await trigger([
            'cliente.nome',
            'cliente.bi',
            'cliente.dataNascimento',
            'cliente.sexo',
            'cliente.residencia'
        ] as any)

        if (!ok) return
        console.log(formMethods.getValues(), errors)
        await markStepAsCompleted(documentSteps[0].id)
        goToStep(documentSteps[1])
    }

    return (
        <SafeScreen>
            <Header
                title={documentSteps[0].title}
                onBackPress={() => router.back()}
                text={documentSteps[0].description}
                image={documentSteps[0].image}
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
                                    label="Nome do Solicitante"
                                    placeholder="digite o nome"
                                    name='cliente.nome'
                                    error={errors.cliente?.nome?.message}
                                    autoCapitalize="words"
                                />
                                <ThemeTextInput
                                    label="Nº do Bilhete"
                                    placeholder="00000000AB0000"
                                    name='cliente.bi'
                                    error={errors.cliente?.bi?.message}
                                    autoCapitalize="characters"
                                />
                                <ThemeDateInput
                                    label="Data de Nascimento"
                                    name='cliente.dataNascimento'
                                    error={errors.cliente?.dataNascimento?.message}
                                />
                                <ThemeSelect
                                    label="Género"
                                    options={[
                                        { label: 'Masculino', value: 'M' },
                                        { label: 'Feminino', value: 'F' },
                                    ]}
                                    name='cliente.sexo'
                                />
                                <ThemeTextInput
                                    label="Residência"
                                    placeholder="digite o local de residência"
                                    name='cliente.residencia'
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

export default ClientForm