/**
 * @module _shared/validation
 * @description Schemas Zod centralizados para validação de entrada nas Edge Functions.
 *
 * Cada schema define as regras de validação para os dados recebidos via `req.json()`.
 * A validação é feita no servidor (Edge Function) como camada de segurança adicional,
 * mesmo que o frontend já valide via React Hook Form + Zod.
 *
 * ATENÇÃO: Validação no frontend é para UX. Validação no backend é para SEGURANÇA.
 * Nunca confie apenas na validação do cliente.
 *
 * A função `validate()` combina parsing + tratamento de erro em uma única chamada,
 * lançando exceção com mensagem amigável em caso de falha.
 *
 * @example
 * ```ts
 * import { transferirSchema, validate } from "../_shared/validation.ts";
 *
 * const body = await req.json();
 * const { destinatarioId, valor } = validate(transferirSchema, body);
 * // Se chegou aqui, os dados são válidos e tipados
 * ```
 */

import { z } from "https://esm.sh/zod@3.25.76";

// ────────────────────────────────────────────────────────
// Schemas de Autenticação
// ────────────────────────────────────────────────────────

/** Email validado, sanitizado (trim) e limitado a 255 caracteres. */
export const emailSchema = z.string().trim().email("Email inválido").max(255);

/** Senha com mínimo de 6 e máximo de 128 caracteres. */
export const passwordSchema = z.string().min(6, "Senha deve ter pelo menos 6 caracteres").max(128);

/** Nome com mínimo de 2 caracteres, sanitizado e limitado a 100. */
export const nomeSchema = z.string().trim().min(2, "Nome deve ter pelo menos 2 caracteres").max(100);

// ────────────────────────────────────────────────────────
// Schema: Transferência de Créditos entre Usuários
// ────────────────────────────────────────────────────────

/**
 * Validação para transferência de cashback entre usuários.
 *
 * Regras de negócio:
 * - `destinatarioId` deve ser UUID válido (previne injeção)
 * - `valor` deve ser positivo e ≤ R$ 10.000 (teto de segurança)
 * - `destinatarioNome` exibido na notificação de transferência
 *
 * @see transferir-creditos — Edge Function que consome este schema
 */
export const transferirSchema = z.object({
  destinatarioId: z.string().uuid("ID do destinatário inválido"),
  valor: z.number().positive("Valor deve ser positivo").max(10000, "Valor máximo: R$ 10.000"),
  destinatarioNome: z.string().trim().min(1).max(100),
});

// ────────────────────────────────────────────────────────
// Schemas: Vale Presente
// ────────────────────────────────────────────────────────

/**
 * Validação para criação de vale presente.
 *
 * Suporta dois tipos:
 * - `monetario` — Valor em R$ creditado como cashback ao resgate
 * - `experiencia` — Vinculado a um serviço específico (ex: "1 Sessão de Massagem")
 *
 * @see asaas-criar-cobranca — Cobrança PIX gerada após validação
 */
export const criarValeSchema = z.object({
  destinatario_nome: z.string().trim().min(1, "Nome do destinatário obrigatório").max(100),
  destinatario_email: z.string().trim().email("Email inválido").max(255).optional().or(z.literal("")),
  valor: z.number().positive("Valor deve ser positivo").max(5000, "Valor máximo: R$ 5.000"),
  mensagem: z.string().max(200, "Mensagem muito longa").optional(),
  tema: z.string().max(30).optional(),
  tipo: z.enum(["monetario", "experiencia"]).default("monetario"),
  experiencia_nome: z.string().max(100).optional(),
  experiencia_descricao: z.string().max(200).optional(),
  /** ISO date string para entrega programada (ex: aniversário) */
  data_entrega_agendada: z.string().optional(),
});

/**
 * Validação para resgate de vale presente.
 *
 * O código é sanitizado (trim + uppercase) para evitar erros de digitação.
 * Limitado a 4-20 caracteres (formato gerado: 8 caracteres hexadecimais).
 *
 * @see resgatar_vale_presente — Função SQL que processa o resgate
 */
export const resgatarValeSchema = z.object({
  codigo: z.string().trim().min(4, "Código muito curto").max(20, "Código muito longo").toUpperCase(),
});

// ────────────────────────────────────────────────────────
// Schema: Buscar Usuário (Admin only)
// ────────────────────────────────────────────────────────

/**
 * Validação para busca de usuário por email.
 *
 * ATENÇÃO: Esta funcionalidade é restrita a administradores.
 * A Edge Function `buscar-usuario` verifica `has_role(userId, 'admin')`
 * antes de processar a busca, prevenindo enumeração de emails.
 *
 * @see buscar-usuario — Edge Function que consome este schema
 */
export const buscarUsuarioSchema = z.object({
  email: z.string().trim().email("Email inválido").max(255),
});

// ────────────────────────────────────────────────────────
// Schema: Agendamento de Sessão
// ────────────────────────────────────────────────────────

/**
 * Validação para criação de agendamento.
 *
 * - `servico` é o nome do serviço (vinculado à tabela `servicos`)
 * - `data_hora` deve ser ISO 8601 com timezone (ex: "2026-02-20T14:00:00Z")
 * - `terapeuta_id` é opcional (sistema pode atribuir automaticamente)
 * - `observacoes` limitadas a 500 caracteres
 */
export const agendamentoSchema = z.object({
  servico: z.string().trim().min(1, "Serviço obrigatório").max(100),
  data_hora: z.string().datetime("Data/hora inválida"),
  terapeuta_id: z.string().uuid().optional().nullable(),
  observacoes: z.string().max(500).optional().nullable(),
});

// ────────────────────────────────────────────────────────
// Função Utilitária de Validação
// ────────────────────────────────────────────────────────

/**
 * Valida dados contra um schema Zod e retorna o resultado tipado.
 *
 * Em caso de falha, lança um `Error` com a mensagem do primeiro campo inválido.
 * O erro deve ser capturado no catch da Edge Function e retornado como `errorResponse()`.
 *
 * @template T - Tipo inferido pelo schema Zod
 * @param schema - Schema Zod para validação
 * @param data - Dados brutos recebidos (geralmente de `req.json()`)
 * @returns Dados validados e tipados conforme o schema
 * @throws {Error} Com mensagem amigável do primeiro campo inválido
 *
 * @example
 * ```ts
 * try {
 *   const { valor, destinatarioId } = validate(transferirSchema, await req.json());
 *   // valor é number, destinatarioId é string (UUID) — tipados!
 * } catch (e) {
 *   return errorResponse(e.message, 400);
 * }
 * ```
 */
export function validate<T>(schema: z.ZodSchema<T>, data: unknown): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    const firstError = result.error.errors[0]?.message || "Dados inválidos";
    throw new Error(firstError);
  }
  return result.data;
}
