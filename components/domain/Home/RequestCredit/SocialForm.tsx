import { ThemeMoneyInput } from '@/components/Custom/Inputs/moneyInput'
import { ThemeTextInput } from '@/components/Custom/Inputs/Themed-Input'
import { ThemeSelect } from '@/components/Custom/Inputs/ThemeSelect'
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

const SocialForm = () => {
    const formMethods = useFormContext() as any
    const { formState: { errors } } = formMethods

    const numberParser = (text: string) => {
        const clean = text.replace(/[^0-9.]/g, '')
        if (!clean) return undefined
        const n = Number(clean)
        return Number.isFinite(n) ? n : undefined
    }

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
                                label="Número de colaboradores"
                                placeholder="0"
                                name="dadosSociais.numeroColaboradores"
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
                                name="dadosSociais.numeroMulheres"
                                keyboardType="numeric"
                                valueParser={numberParser}
                                error={errors.dadosSociais?.numeroMulheres?.message}
                            />
                            
                            <ThemeTextInput
                                label="Número de jovens"
                                placeholder="0"
                                name="dadosSociais.numeroJovens"
                                keyboardType="numeric"
                                valueParser={numberParser}
                                error={errors.dadosSociais?.numeroJovens?.message}
                            />

                            <ThemeMoneyInput
                                label="Faturamento mensal médio"
                                placeholder="0"
                                name="dadosSociais.faturamentoMensalMedio"
                                error={errors.dadosSociais?.faturamentoMensalMedio?.message}
                            />

                            <ThemeTextInput
                                label="Número de fontes de renda"
                                placeholder="0"
                                name="dadosSociais.numeroFontesRenda"
                                keyboardType="numeric"
                                valueParser={numberParser}
                                error={errors.dadosSociais?.numeroFontesRenda?.message}
                            />

                            <ThemeSelect
                                label="Nível académico"
                                name="dadosSociais.nivelAcademico"
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
                                name="dadosSociais.tipoProduto"
                                autoCapitalize="words"
                                error={errors.dadosSociais?.tipoProduto?.message}
                            />
                            
                            <ThemeTextInput
                                label="Ciclo de plantio"
                                placeholder="Ex: 3 meses"
                                name="dadosSociais.cicloPlantio"
                                autoCapitalize="words"
                                error={errors.dadosSociais?.cicloPlantio?.message}
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
                                name="dadosSociais.numeroFilhos"
                                keyboardType="numeric"
                                valueParser={numberParser}
                                error={errors.dadosSociais?.numeroFilhos?.message}
                            />
                            
                            <ThemeTextInput
                                label="Número de menores"
                                placeholder="0"
                                name="dadosSociais.numeroMenores"
                                keyboardType="numeric"
                                valueParser={numberParser}
                                error={errors.dadosSociais?.numeroMenores?.message}
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

export default SocialForm