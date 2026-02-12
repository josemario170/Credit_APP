import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { FormProvider, useForm, UseFormReturn } from 'react-hook-form'
import { CreditRequestDTO, creditRequestSchema } from '../Schemas/global'

interface Props {
  children: React.ReactNode
  methods?: UseFormReturn<CreditRequestDTO>
}


export const CreditFormProvider = ({ children, methods }: Props) => {
  const internalMethods = useForm<CreditRequestDTO>({
    resolver: zodResolver(creditRequestSchema),
    mode: 'onChange'
  })

  const resolvedMethods = methods ?? internalMethods

  return <FormProvider {...resolvedMethods}>{children}</FormProvider>
}
