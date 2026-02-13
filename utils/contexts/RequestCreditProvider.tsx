import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { CreditRequestDTO, creditRequestSchema } from '../Schemas/global'

interface Props {
  children: React.ReactNode
}

export const CreditFormProvider = ({ children }: Props) => {
  const methods = useForm<CreditRequestDTO>({
    resolver: zodResolver(creditRequestSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      cliente: {
        nome: '',
        bi: '',
        dataNascimento: undefined,
        sexo: "M",
        residencia: '',
        telefone: '',
        idade: undefined
      },
      negocio: {
        tipoNegocio: '',
        cartaoContribuinte: '',
        endereco: '',
        tempoNegocio: ''
      },
      avalistas: [{
        nomeCompleto: '',
        telefone: '',
        ocupacao: '',
        localTrabalho: '',
        rendaMensal: 0
      }]
    }
  })

  return <FormProvider {...methods}>{children}</FormProvider>
}
