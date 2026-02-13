import Header from '@/components/Custom/Header'
import { ThemeMoneyInput } from '@/components/Custom/Inputs/moneyInput'
import { ThemeTextInput } from '@/components/Custom/Inputs/Themed-Input'
import { ThemeSelect } from '@/components/Custom/Inputs/ThemeSelect'
import Button from '@/components/domain/Home/Home/CustomButton'
import { SafeScreen } from '@/components/ui/safe-screen'

import { documentSteps } from '@/constants/stepsForm'
import { useCreditStepsManagement } from '@/hooks/management/useCreditStepsManagement'
import { windowHeight } from '@/utils/Constants/Styles'
import { router } from 'expo-router'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TouchableWithoutFeedback, View } from 'react-native'

const SocialForm = () => {
    const formMethods = useFormContext() as any
    const { trigger, formState: { errors } } = formMethods

    const {
        goToStep,
        markStepAsCompleted,
    } = useCreditStepsManagement({ steps: documentSteps, formMethods })

    const handleNext = async () => {
        const ok = await trigger([
            'dadosSociais.numeroColaboradores',
            'dadosSociais.tipoColaboracao',
            'dadosSociais.numeroMulheres',
            'dadosSociais.numeroJovens',
            'dadosSociais.faturamentoMensalMedio',
            'dadosSociais.numeroFontesRenda',
            'dadosSociais.nivelAcademico',
            'dadosSociais.tipoProduto',
            'dadosSociais.cicloPlantio',
            'dadosSociais.estadoCivil',
            'dadosSociais.numeroFilhos',
            'dadosSociais.numeroMenores'
        ] as any)

        if (!ok) return
        await markStepAsCompleted(documentSteps[2].id)
        goToStep(documentSteps[3])
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
                title={documentSteps[2].title}
                onBackPress={() => router.back()}
                text={documentSteps[2].description}
                image={documentSteps[2].image}
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
                                    label="Número de colaboradores"
                                    placeholder="0"
                                    name='dadosSociais.numeroColaboradores'
                                    keyboardType="numeric"
                                    valueParser={numberParser}
                                    error={errors.dadosSociais?.numeroColaboradores?.message}
                                />
                                <ThemeSelect
                                    label="Tipo de colaboração"
                                    name="dadosSociais.tipoColaboracao"
                                    options={[
                                        { label: 'Permanente', value: 'permanente' },
                                        { label: 'Sazonal', value: 'sazonal' }
                                    ]}
                                />

                                <ThemeTextInput
                                    label="Número de mulheres"
                                    placeholder="0"
                                    name='dadosSociais.numeroMulheres'
                                    keyboardType="numeric"
                                    valueParser={numberParser}
                                    error={errors.dadosSociais?.numeroMulheres?.message}
                                />
                                <ThemeTextInput
                                    label="Número de jovens"
                                    placeholder="0"
                                    name='dadosSociais.numeroJovens'
                                    keyboardType="numeric"
                                    valueParser={numberParser}
                                    error={errors.dadosSociais?.numeroJovens?.message}
                                />

                                <ThemeMoneyInput
                                    label="Faturamento mensal médio"
                                    placeholder="0"
                                    name='dadosSociais.faturamentoMensalMedio'
                                    error={errors.dadosSociais?.faturamentoMensalMedio?.message}
                                />

                                <ThemeTextInput
                                    label="Número de fontes de renda"
                                    placeholder="0"
                                    name='dadosSociais.numeroFontesRenda'
                                    keyboardType="numeric"
                                    valueParser={numberParser}
                                    error={errors.dadosSociais?.numeroFontesRenda?.message}
                                />

                                <ThemeSelect
                                    label="Nível académico"
                                    name='dadosSociais.nivelAcademico'
                                    options={[
                                        { label: 'Ensino Secundário', value: 'ensino_basico' },
                                        { label: 'Ensino médio', value: 'ensino_medio' },
                                        { label: 'Ensino superior', value: 'ensino_superior' },
                                        { label: 'Mestrado', value: 'mestrado' },
                                        { label: 'Doutorado', value: 'doutorado' }
                                    ]}
                                />

                                <ThemeTextInput
                                    label="Tipo de produto"
                                    placeholder="Ex: Milho"
                                    name='dadosSociais.tipoProduto'
                                    autoCapitalize="words"
                                />
                                <ThemeTextInput
                                    label="Ciclo de plantio"
                                    placeholder="Ex: 3 meses"
                                    name='dadosSociais.cicloPlantio'
                                    autoCapitalize="words"
                                />

                                <ThemeSelect
                                    label="Estado civil"
                                    name="dadosSociais.estadoCivil"
                                    options={[
                                        { label: 'Solteiro(a)', value: 'solteiro' },
                                        { label: 'Casado(a)', value: 'casado' },
                                        { label: 'União de facto', value: 'uniao_de_facto' },
                                        { label: 'Divorciado(a)', value: 'divorciado' },
                                        { label: 'Viúvo(a)', value: 'viuvo' }
                                    ]}
                                />

                                <ThemeTextInput
                                    label="Número de filhos"
                                    placeholder="0"
                                    name='dadosSociais.numeroFilhos'
                                    keyboardType="numeric"
                                    valueParser={numberParser}
                                    error={errors.dadosSociais?.numeroFilhos?.message}
                                />
                                <ThemeTextInput
                                    label="Número de menores"
                                    placeholder="0"
                                    name='dadosSociais.numeroMenores'
                                    keyboardType="numeric"
                                    valueParser={numberParser}
                                    error={errors.dadosSociais?.numeroMenores?.message}
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

export default SocialForm