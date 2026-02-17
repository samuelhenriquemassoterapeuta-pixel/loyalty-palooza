import { z } from "https://esm.sh/zod@3.25.76";

// ── Auth ──
export const emailSchema = z.string().trim().email("Email inválido").max(255);
export const passwordSchema = z.string().min(6, "Senha deve ter pelo menos 6 caracteres").max(128);
export const nomeSchema = z.string().trim().min(2, "Nome deve ter pelo menos 2 caracteres").max(100);

// ── Transferência ──
export const transferirSchema = z.object({
  destinatarioId: z.string().uuid("ID do destinatário inválido"),
  valor: z.number().positive("Valor deve ser positivo").max(10000, "Valor máximo: R$ 10.000"),
  destinatarioNome: z.string().trim().min(1).max(100),
});

// ── Vale Presente ──
export const criarValeSchema = z.object({
  destinatario_nome: z.string().trim().min(1, "Nome do destinatário obrigatório").max(100),
  destinatario_email: z.string().trim().email("Email inválido").max(255).optional().or(z.literal("")),
  valor: z.number().positive("Valor deve ser positivo").max(5000, "Valor máximo: R$ 5.000"),
  mensagem: z.string().max(200, "Mensagem muito longa").optional(),
  tema: z.string().max(30).optional(),
  tipo: z.enum(["monetario", "experiencia"]).default("monetario"),
  experiencia_nome: z.string().max(100).optional(),
  experiencia_descricao: z.string().max(200).optional(),
  data_entrega_agendada: z.string().optional(),
});

export const resgatarValeSchema = z.object({
  codigo: z.string().trim().min(4, "Código muito curto").max(20, "Código muito longo").toUpperCase(),
});

// ── Buscar Usuário ──
export const buscarUsuarioSchema = z.object({
  email: z.string().trim().email("Email inválido").max(255),
});

// ── Agendamento ──
export const agendamentoSchema = z.object({
  servico: z.string().trim().min(1, "Serviço obrigatório").max(100),
  data_hora: z.string().datetime("Data/hora inválida"),
  terapeuta_id: z.string().uuid().optional().nullable(),
  observacoes: z.string().max(500).optional().nullable(),
});

/** Utility to validate and return typed data or throw errorResponse */
export function validate<T>(schema: z.ZodSchema<T>, data: unknown): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    const firstError = result.error.errors[0]?.message || "Dados inválidos";
    throw new Error(firstError);
  }
  return result.data;
}
