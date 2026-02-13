import { z } from "zod"
import { phoneRegex } from "./regex"

export const pedidoSchema = z.object({
  numeroPedido: z.string().min(1, "Número do pedido é obrigatório"),
  finalidade: z.string().min(1, "Finalidade é obrigatória"),
  foto: z.string().optional(),
  numeroCiclo: z.number().min(1, "Ciclo deve ser maior ou igual a 1"),
  produto: z.string().min(1, "Produto é obrigatório"),
  valorSolicitado: z.number().positive("Valor deve ser maior que zero"),
  dataSolicitacao: z.date({ required_error: "Data de solicitação é obrigatória" }),
  dataCriacao: z.date({ required_error: "Data de criação é obrigatória" }),
  valorAprovado: z.number().positive("Valor aprovado deve ser maior que zero").optional()
})

export type PedidoDTO = z.infer<typeof pedidoSchema>

export const clienteSchema = z.object({
  nome: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  dataNascimento: z.date({ required_error: "Data de nascimento é obrigatória" }),
  idade: z.number().min(18, "Idade mínima é 18 anos").max(100, "Idade máxima é 100 anos"),
  sexo: z.enum(["M", "F"], { 
    required_error: "Género é obrigatório",
    message: "O género deve ser Masculino ou Feminino" 
  }),
  bi: z
    .string()
    .nonempty("BI é obrigatório")
    .regex(/^\d{8}[A-Z]{2}\d{4}$/, "BI inválido. Formato correto: 00000000ZZ0000"),
  residencia: z.string().min(5, "Residência deve ter pelo menos 5 caracteres"),
  telefone: z.string().regex(phoneRegex, "Telefone inválido")
})

export type ClienteDTO = z.infer<typeof clienteSchema>

export const dadosSociaisSchema = z.object({
  numeroColaboradores: z.number().min(0, "Número de colaboradores não pode ser negativo"),
  tipoColaboracao: z.enum(["permanente", "sazonal"], {
    required_error: "Tipo de colaboração é obrigatório",
    message: "Tipo de colaboração deve ser Permanente ou Sazonal"
  }),
  numeroMulheres: z.number().min(0, "Número de mulheres não pode ser negativo"),
  numeroJovens: z.number().min(0, "Número de jovens não pode ser negativo"),
  faturamentoMensalMedio: z.number().min(0, "Faturamento mensal não pode ser negativo"),
  numeroFontesRenda: z.number().min(0, "Número de fontes de renda não pode ser negativo"),
  nivelAcademico: z.string().min(1, "Nível académico é obrigatório"),
  tipoProduto: z.string().min(1, "Tipo de produto é obrigatório"),
  cicloPlantio: z.string().min(1, "Ciclo de plantio é obrigatório"),
  estadoCivil: z.string().min(1, "Estado civil é obrigatório"),
  numeroFilhos: z.number().min(0, "Número de filhos não pode ser negativo"),
  numeroMenores: z.number().min(0, "Número de menores não pode ser negativo")
})

export type DadosSociaisDTO = z.infer<typeof dadosSociaisSchema>

export const negocioSchema = z.object({
  tipoNegocio: z.string().min(3, "Tipo de negócio deve ter pelo menos 3 caracteres"),
  cartaoContribuinte: z.string().min(5, "Cartão de contribuinte deve ter pelo menos 5 caracteres"),
  endereco: z.string().min(5, "Endereço deve ter pelo menos 5 caracteres"),
  tempoNegocio: z.string().min(1, "Tempo de negócio é obrigatório")
})

export type NegocioDTO = z.infer<typeof negocioSchema>

export const avalistaSchema = z.object({
  nomeCompleto: z.string().min(3, "Nome completo deve ter pelo menos 3 caracteres"),
  telefone: z.string().regex(phoneRegex, "Telefone inválido"),
  ocupacao: z.string().min(2, "Ocupação deve ter pelo menos 2 caracteres"),
  localTrabalho: z.string().min(3, "Local de trabalho deve ter pelo menos 3 caracteres"),
  rendaMensal: z.number().min(0, "Renda mensal não pode ser negativa")

  
})

export const avalistasSchema = z.array(avalistaSchema).min(1, "Adicione pelo menos um avalista")

export type AvalistaDTO = z.infer<typeof avalistaSchema>

export const creditRequestSchema = z.object({
  pedido: pedidoSchema,
  cliente: clienteSchema,
  dadosSociais: dadosSociaisSchema,
  negocio: negocioSchema,
  avalistas: avalistasSchema
})

export type CreditRequestDTO = z.infer<typeof creditRequestSchema>