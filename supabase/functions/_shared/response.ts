/**
 * @module _shared/response
 * @description Funções auxiliares para criar respostas HTTP padronizadas nas Edge Functions.
 *
 * Todas as respostas incluem automaticamente os headers CORS e Content-Type corretos.
 * Isso evita duplicação de código e garante consistência em todas as 44 Edge Functions.
 *
 * Três tipos de resposta disponíveis:
 * - `jsonResponse()` — Sucesso com dados JSON (padrão: 200)
 * - `errorResponse()` — Erro com mensagem (padrão: 400)
 * - `streamResponse()` — Streaming SSE para respostas de IA em tempo real
 *
 * @example
 * ```ts
 * // Sucesso
 * return jsonResponse({ users: [...], total: 42 });
 *
 * // Erro de validação
 * return errorResponse("Email inválido", 400);
 *
 * // Erro interno
 * return errorResponse("Falha ao processar pagamento", 500);
 *
 * // Streaming (chat IA)
 * return streamResponse(readableStream);
 * ```
 */

import { corsHeaders } from "./cors.ts";

/**
 * Retorna uma resposta JSON de sucesso com headers CORS.
 *
 * @param data - Dados a serem serializados como JSON (qualquer tipo serializável)
 * @param status - Código HTTP (padrão: 200). Use 201 para criação, 204 sem corpo, etc.
 * @returns Response HTTP com Content-Type application/json
 */
export function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

/**
 * Retorna uma resposta JSON de erro com headers CORS.
 *
 * O corpo sempre segue o formato: `{ success: false, error: "<mensagem>" }`
 * para que o frontend possa tratar erros de forma consistente.
 *
 * @param message - Mensagem de erro legível para o usuário
 * @param status - Código HTTP de erro (padrão: 400). Códigos comuns:
 *   - 400: Dados inválidos (validação)
 *   - 401: Não autorizado (token ausente/inválido)
 *   - 403: Proibido (sem permissão)
 *   - 404: Não encontrado
 *   - 429: Rate limit excedido
 *   - 500: Erro interno do servidor
 * @returns Response HTTP com corpo de erro padronizado
 */
export function errorResponse(message: string, status = 400): Response {
  return new Response(
    JSON.stringify({ success: false, error: message }),
    { status, headers: { ...corsHeaders, "Content-Type": "application/json" } },
  );
}

/**
 * Retorna uma resposta de streaming SSE (Server-Sent Events) com headers CORS.
 *
 * Utilizada exclusivamente pelas Edge Functions de IA (chat-assistente, resi-chat)
 * para enviar tokens incrementais ao frontend conforme o modelo gera a resposta.
 *
 * @param body - ReadableStream gerado pelo SDK de IA ou null
 * @returns Response HTTP com Content-Type text/event-stream
 *
 * @see chat-assistente — Edge Function que usa streaming
 * @see resi-chat — Edge Function de chat contextual com streaming
 */
export function streamResponse(body: ReadableStream | null): Response {
  return new Response(body, {
    headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
  });
}
