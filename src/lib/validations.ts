import { z } from "zod";

// ── Auth schemas (already used in Auth.tsx) ──
export const emailSchema = z.string().trim().email("Email inválido").max(255);
export const passwordSchema = z.string().min(6, "Senha deve ter pelo menos 6 caracteres").max(128);
export const nomeSchema = z.string().trim().min(2, "Nome deve ter pelo menos 2 caracteres").max(100);

// ── Transferência ──
export const transferirSchema = z.object({
  email: z.string().trim().email("Email inválido"),
  valor: z
    .string()
    .transform((v) => parseFloat(v.replace(",", ".")))
    .pipe(z.number().positive("Valor deve ser maior que zero").max(10000, "Valor máximo: R$ 10.000")),
});

// ── Vale Presente ──
export const criarValeSchema = z.object({
  destinatario: z.string().trim().min(1, "Nome do destinatário obrigatório").max(100),
  email: z.string().trim().email("Email inválido").max(255).optional().or(z.literal("")),
  valor: z.number().positive("Valor deve ser maior que zero").max(5000, "Valor máximo: R$ 5.000"),
  mensagem: z.string().max(200, "Mensagem pode ter no máximo 200 caracteres").optional(),
});

export const resgatarValeSchema = z.object({
  codigo: z.string().trim().min(4, "Código muito curto").max(20, "Código muito longo"),
});
