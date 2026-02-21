import { createClient } from "https://esm.sh/@supabase/supabase-js@2.89.0";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

type LogLevel = "info" | "warn" | "error";

interface LogEntry {
  functionName: string;
  level: LogLevel;
  message: string;
  statusCode?: number;
  metadata?: Record<string, unknown>;
  userId?: string;
  durationMs?: number;
  errorStack?: string;
}

/**
 * Logger estruturado que salva no banco E no console.
 *
 * Uso:
 *   const log = createLogger('asaas-webhook');
 *   log.info('Webhook recebido', { event: 'PAYMENT_CONFIRMED' });
 *   log.error('Falha no processamento', { paymentId }, error);
 */
export function createLogger(functionName: string) {
  const startTime = Date.now();
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  const log = async (entry: LogEntry) => {
    // Console (sempre)
    const consoleMsg = JSON.stringify({
      timestamp: new Date().toISOString(),
      function: entry.functionName,
      level: entry.level,
      message: entry.message,
      ...entry.metadata,
    });

    if (entry.level === "error") {
      console.error(consoleMsg);
    } else if (entry.level === "warn") {
      console.warn(consoleMsg);
    } else {
      console.log(consoleMsg);
    }

    // Banco (async, não bloqueia)
    try {
      await supabase.from("edge_function_logs").insert({
        function_name: entry.functionName,
        level: entry.level,
        message: entry.message,
        status_code: entry.statusCode,
        metadata: entry.metadata || {},
        user_id: entry.userId,
        duration_ms: entry.durationMs || Date.now() - startTime,
        error_stack: entry.errorStack,
      });
    } catch (e) {
      console.error("Falha ao salvar log no banco:", e);
    }
  };

  return {
    info: (message: string, metadata?: Record<string, unknown>, userId?: string) =>
      log({ functionName, level: "info", message, metadata, userId }),

    warn: (message: string, metadata?: Record<string, unknown>, userId?: string) =>
      log({ functionName, level: "warn", message, metadata, userId }),

    error: (
      message: string,
      metadata?: Record<string, unknown>,
      error?: Error,
      userId?: string
    ) =>
      log({
        functionName,
        level: "error",
        message,
        metadata,
        errorStack: error?.stack,
        userId,
      }),

    // Log de resposta com status code e duração
    response: (statusCode: number, message: string, metadata?: Record<string, unknown>) =>
      log({
        functionName,
        level: statusCode >= 400 ? "error" : "info",
        message,
        statusCode,
        durationMs: Date.now() - startTime,
        metadata,
      }),
  };
}
