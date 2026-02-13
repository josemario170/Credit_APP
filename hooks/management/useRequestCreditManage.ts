import { documentSteps } from '@/constants/stepsForm'
import { useCreditStepsManagement } from '@/hooks/management/useCreditStepsManagement'
import { creditRequestSchema } from '@/utils/Schemas/global'
import { zodResolver } from '@hookform/resolvers/zod'
import { router } from 'expo-router'
import { useCallback, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Alert } from 'react-native'

const STEP_VALIDATIONS = {
  bi: [
    'cliente.nome',
    'cliente.bi',
    'cliente.dataNascimento',
    'cliente.sexo',
    'cliente.residencia',
    'cliente.telefone',
    'cliente.idade'
  ],
  contribuinte: [
    'pedido.numeroPedido',
    'pedido.finalidade',
    'pedido.numeroCiclo',
    'pedido.produto',
    'pedido.valorSolicitado',
    'pedido.dataSolicitacao',
    'pedido.dataCriacao'
  ],
  empresa: [
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
  ],
  trabalho: [
    'negocio.tipoNegocio',
    'negocio.cartaoContribuinte',
    'negocio.endereco',
    'negocio.tempoNegocio'
  ]
} as const

const STEP_LABELS = {
  bi: 'Dados do Cliente',
  contribuinte: 'Dados do Crédito',
  empresa: 'Dados Sociais',
  trabalho: 'Dados do Negócio'
} as const

const getNestedValue = (obj: any, path: string) => {
  return path.split('.').reduce((current, key) => current?.[key], obj)
}

const isValueFilled = (value: any): boolean => {
  if (value === null || value === undefined) return false
  if (typeof value === 'string') return value.trim().length > 0
  if (typeof value === 'number') return !isNaN(value)
  if (value instanceof Date) return !isNaN(value.getTime())
  return false
}

const getFieldLabel = (fieldPath: string): string => {
  const fieldMap: Record<string, string> = {
    'cliente.nome': 'Nome',
    'cliente.bi': 'Nº do Bilhete',
    'cliente.dataNascimento': 'Data de Nascimento',
    'cliente.sexo': 'Género',
    'cliente.residencia': 'Residência',
    'cliente.telefone': 'Telefone',
    'cliente.idade': 'Idade',
    'pedido.numeroPedido': 'Nº do Pedido',
    'pedido.finalidade': 'Finalidade',
    'pedido.numeroCiclo': 'Nº do Ciclo',
    'pedido.produto': 'Produto',
    'pedido.valorSolicitado': 'Valor Solicitado',
    'pedido.dataSolicitacao': 'Data de Solicitação',
    'pedido.dataCriacao': 'Data de Criação',
    'dadosSociais.numeroColaboradores': 'Número de Colaboradores',
    'dadosSociais.tipoColaboracao': 'Tipo de Colaboração',
    'dadosSociais.numeroMulheres': 'Número de Mulheres',
    'dadosSociais.numeroJovens': 'Número de Jovens',
    'dadosSociais.faturamentoMensalMedio': 'Faturamento Mensal Médio',
    'dadosSociais.numeroFontesRenda': 'Número de Fontes de Renda',
    'dadosSociais.nivelAcademico': 'Nível Académico',
    'dadosSociais.tipoProduto': 'Tipo de Produto',
    'dadosSociais.cicloPlantio': 'Ciclo de Plantio',
    'dadosSociais.estadoCivil': 'Estado Civil',
    'dadosSociais.numeroFilhos': 'Número de Filhos',
    'dadosSociais.numeroMenores': 'Número de Menores',
    'negocio.tipoNegocio': 'Tipo de Negócio',
    'negocio.cartaoContribuinte': 'Cartão de Contribuinte',
    'negocio.endereco': 'Endereço',
    'negocio.tempoNegocio': 'Tempo de Negócio'
  }
  
  return fieldMap[fieldPath] || fieldPath
}

export const useRequestCreditForm = () => {
  const formMethods = useForm({
    resolver: zodResolver(creditRequestSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      cliente: {
        nome: '',
        bi: '',
        dataNascimento: undefined,
        idade: 0,
        sexo: undefined,
        residencia: '',
        telefone: '900000000'
      },
      pedido: {
        numeroPedido: '',
        finalidade: '',
        numeroCiclo: 1,
        produto: 'KIXI AGRO CABINDA',
        valorSolicitado: 0,
        dataSolicitacao: new Date(),
        dataCriacao: new Date(),
        valorAprovado: undefined
      },
      dadosSociais: {
        numeroColaboradores: 0,
        tipoColaboracao: undefined,
        numeroMulheres: 0,
        numeroJovens: 0,
        faturamentoMensalMedio: 0,
        numeroFontesRenda: 0,
        nivelAcademico: '',
        tipoProduto: '',
        cicloPlantio: '',
        estadoCivil: '',
        numeroFilhos: 0,
        numeroMenores: 0
      },
      negocio: {
        tipoNegocio: '',
        cartaoContribuinte: '',
        endereco: '',
        tempoNegocio: ''
      },
      avalistas: []
    }
  })
  
  const [showingStepId, setShowingStepId] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    currentStep,
    isStepCompleted,
    isStepAccessible,
    getStepStatus,
    goToStep,
    markStepAsCompleted,
    finish
  } = useCreditStepsManagement({ 
    steps: documentSteps, 
    formMethods 
  })

  const activeStep = useMemo(
    () => showingStepId ? documentSteps.find(s => s.id === showingStepId) : null,
    [showingStepId]
  )

  const currentStepData = useMemo(
    () => documentSteps.find(s => s.stepNumber === currentStep) ?? documentSteps[0],
    [currentStep]
  )

  const isFormVisible = showingStepId !== null

  const openStep = useCallback((stepId: string) => {
    setShowingStepId(stepId)
  }, [])

  const closeStep = useCallback(() => {
    setShowingStepId(null)
  }, [])

  const handleBackPress = useCallback(() => {
    if (activeStep) {
      closeStep()
    } else {
      router.back()
    }
  }, [activeStep, closeStep])

  const validateStepFields = useCallback((stepId: string): { 
    isValid: boolean
    missingFields: string[]
    fieldErrors: Record<string, string>
  } => {
    const fieldsToValidate = STEP_VALIDATIONS[stepId as keyof typeof STEP_VALIDATIONS]
    const formValues = formMethods.getValues()
    const formErrors = formMethods.formState.errors
    const missingFields: string[] = []
    const fieldErrors: Record<string, string> = {}

    for (const field of fieldsToValidate) {
      const value = getNestedValue(formValues, field)
      if (!isValueFilled(value)) {
        missingFields.push(field)
      }
      
      const error = getNestedValue(formErrors, field)
      if (error?.message) {
        fieldErrors[field] = error.message
      }
    }

    return {
      isValid: missingFields.length === 0 && Object.keys(fieldErrors).length === 0,
      missingFields,
      fieldErrors
    }
  }, [formMethods])

  const showValidationAlert = useCallback((
    missingFields: string[], 
    fieldErrors: Record<string, string>
  ) => {
    const stepLabel = STEP_LABELS[showingStepId as keyof typeof STEP_LABELS] || 'Formulário'
    
    let message = ''
    
    if (missingFields.length > 0) {
      const fieldLabels = missingFields.map(f => `• ${getFieldLabel(f)}`).join('\n')
      message += `Campos não preenchidos:\n${fieldLabels}\n\n`
    }
    
    if (Object.keys(fieldErrors).length > 0) {
      const errorMessages = Object.entries(fieldErrors)
        .map(([field, error]) => `• ${getFieldLabel(field)}: ${error}`)
        .join('\n')
      message += `Erros de validação:\n${errorMessages}`
    }
  }, [showingStepId])

  const handleNext = useCallback(async () => {
    if (!showingStepId || isSubmitting) return

    setIsSubmitting(true)

    try {
      const fieldsToValidate = STEP_VALIDATIONS[showingStepId as keyof typeof STEP_VALIDATIONS]
      const isFormValid = await formMethods.trigger(fieldsToValidate as any)

      const { isValid, missingFields, fieldErrors } = validateStepFields(showingStepId)

      if (!isFormValid || !isValid) {
        showValidationAlert(missingFields, fieldErrors)
        setIsSubmitting(false)
        return
      }

      await markStepAsCompleted(showingStepId)

      if (showingStepId === 'trabalho') {
        const allData = formMethods.getValues()
        console.log('Dados completos:', allData)
        
        await finish()
        closeStep()
        setIsSubmitting(false)
        return
      }

      const nextStep = documentSteps.find(
        s => s.stepNumber === currentStepData.stepNumber + 1
      )
      
      if (nextStep) {
        await goToStep(nextStep)
      }
      
      closeStep()
    } catch (error) {
      console.error('Erro ao avançar:', error)
      Alert.alert(
        'Erro',
        'Ocorreu um erro ao processar o formulário. Verifique os dados e tente novamente.',
        [{ text: 'OK' }]
      )
    } finally {
      setIsSubmitting(false)
    }
  }, [
    showingStepId,
    isSubmitting,
    formMethods,
    validateStepFields,
    showValidationAlert,
    markStepAsCompleted,
    finish,
    closeStep,
    currentStepData,
    goToStep
  ])

  return {
    formMethods,
    showingStepId,
    activeStep,
    isFormVisible,
    isSubmitting,
    steps: documentSteps,
    getStepStatus,
    isStepAccessible,
    isStepCompleted,
    openStep,
    closeStep,
    handleNext,
    handleBackPress
  }
}