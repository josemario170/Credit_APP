import { z } from "zod"
import { phoneRegex } from "./regex"

export const pedidoSchema = z.object({
  numeroPedido: z.string().min(1, "Número do pedido é obrigatório"),

  finalidade: z.string().min(1, "Finalidade é obrigatória"),

  foto: z.string().optional(),

  numeroCiclo: z.number().min(1, "Ciclo inválido"),

  produto: z.string().min(1, "Produto é obrigatório"),

  valorSolicitado: z.number().positive("Valor deve ser maior que zero"),

  dataSolicitacao: z.date(),

  dataCriacao: z.date(),

  valorAprovado: z.number().positive().optional()
})

export type PedidoDTO = z.infer<typeof pedidoSchema>

export const clienteSchema = z.object({
  nome: z.string().min(3, "Nome inválido"),

  dataNascimento: z.date(),

  idade: z.number().min(18).max(100),

  sexo: z.enum(["M", "F"], { message: "O género deve ser Masculino ou Feminino" }),

  bi: z
    .string()
    .nonempty("BI é obrigatório")
    .regex(/^\d{8}[A-Z]{2}\d{4}$/, "BI inválido. Formato correto: 00000000ZZ0000"),

  residencia: z.string().min(5, "Residência inválida"),

  telefone: z.string().regex(phoneRegex, "Telefone inválido")
})

export type ClienteDTO = z.infer<typeof clienteSchema>

export const dadosSociaisSchema = z.object({
  numeroColaboradores: z.number().min(0),

  tipoColaboracao: z.enum(["permanente", "sazonal"]),

  numeroMulheres: z.number().min(0),

  numeroJovens: z.number().min(0),

  faturamentoMensalMedio: z.number().min(0),

  numeroFontesRenda: z.number().min(0),

  nivelAcademico: z.string().min(1),

  tipoProduto: z.string().min(1),

  cicloPlantio: z.string().min(1),

  estadoCivil: z.string().min(1),

  numeroFilhos: z.number().min(0),

  numeroMenores: z.number().min(0)
})

export type DadosSociaisDTO = z.infer<typeof dadosSociaisSchema>

export const negocioSchema = z.object({
  tipoNegocio: z.string().min(3),

  cartaoContribuinte: z.string().min(5),

  endereco: z.string().min(5),

  tempoNegocio: z.string().min(1)
})

export type NegocioDTO = z.infer<typeof negocioSchema>

export const avalistaSchema = z.object({
  nomeCompleto: z.string().min(3),

  telefone: z.string().regex(phoneRegex, "Telefone inválido"),

  ocupacao: z.string().min(2),

  localTrabalho: z.string().min(3),

  rendaMensal: z.number().min(0)
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
