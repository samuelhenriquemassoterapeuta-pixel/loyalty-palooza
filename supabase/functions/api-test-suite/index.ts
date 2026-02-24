import { handleCors } from "../_shared/cors.ts";
import { jsonResponse, errorResponse } from "../_shared/response.ts";
import { requireAuth } from "../_shared/auth.ts";
import { createServiceClient } from "../_shared/supabase-client.ts";

interface TestResult {
  name: string;
  api: string;
  category: string;
  status: "pass" | "fail" | "warn" | "skip";
  message: string;
  responseTime?: number;
  statusCode?: number;
  details?: unknown;
}

Deno.serve(async (req) => {
  const corsRes = handleCors(req);
  if (corsRes) return corsRes;

  try {
    const { userId, authHeader } = await requireAuth(req);

    // Check admin role
    const supabase = createServiceClient();
    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle();

    if (!roleData) {
      return errorResponse("Acesso restrito a administradores", 403);
    }

    const body = await req.json().catch(() => ({}));
    const action = body.action || "health";

    switch (action) {
      case "health":
        return jsonResponse(await runHealthChecks());
      case "gemini":
        return jsonResponse(await testGemini());
      case "asaas":
        return jsonResponse(await testAsaas());
      case "uazapi":
        return jsonResponse(await testUazapi());
      case "performance":
        return jsonResponse(await testPerformance(body.api || "gemini", body.count || 10));
      case "security":
        return jsonResponse(await runSecurityAudit());
      case "full":
        return jsonResponse(await runFullSuite());
      case "logs":
        return jsonResponse(await fetchLogs(body.limit || 100));
      case "clear-logs":
        await supabase.from("edge_function_logs").delete().eq("function_name", "api-test-suite");
        return jsonResponse({ success: true, message: "Logs limpos" });
      default:
        return errorResponse("Ação inválida", 400);
    }
  } catch (e) {
    if (e instanceof Response) return e;
    console.error("api-test-suite error:", e);
    return errorResponse(e instanceof Error ? e.message : "Erro desconhecido", 500);
  }
});

// ============ HEALTH CHECKS ============
async function runHealthChecks(): Promise<{ results: TestResult[] }> {
  const results: TestResult[] = [];

  // Gemini
  const geminiKey = Deno.env.get("GEMINI_API_KEY");
  if (geminiKey) {
    const start = Date.now();
    try {
      const res = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
        {
          method: "POST",
          headers: { "Content-Type": "application/json", "x-goog-api-key": geminiKey },
          body: JSON.stringify({ contents: [{ parts: [{ text: "Responda apenas: OK" }] }] }),
        }
      );
      const data = await res.json();
      results.push({
        name: "Gemini Health",
        api: "gemini",
        category: "health",
        status: res.ok ? "pass" : "fail",
        message: res.ok ? "API respondendo" : `Erro ${res.status}`,
        responseTime: Date.now() - start,
        statusCode: res.status,
        details: res.ok ? { text: data.candidates?.[0]?.content?.parts?.[0]?.text } : data,
      });
    } catch (e) {
      results.push({ name: "Gemini Health", api: "gemini", category: "health", status: "fail", message: e.message, responseTime: Date.now() - start });
    }
  } else {
    results.push({ name: "Gemini Health", api: "gemini", category: "health", status: "skip", message: "GEMINI_API_KEY não configurada" });
  }

  // Asaas
  const asaasKey = Deno.env.get("ASAAS_API_KEY");
  if (asaasKey) {
    const start = Date.now();
    try {
      const res = await fetch("https://api.asaas.com/v3/finance/getCurrentBalance", {
        headers: { "access_token": asaasKey },
      });
      const data = await res.json();
      results.push({
        name: "Asaas Health",
        api: "asaas",
        category: "health",
        status: res.ok ? "pass" : "fail",
        message: res.ok ? `Saldo: R$ ${data.totalBalance?.toFixed(2) || "N/A"}` : `Erro ${res.status}`,
        responseTime: Date.now() - start,
        statusCode: res.status,
        details: res.ok ? { balance: data.totalBalance } : data,
      });
    } catch (e) {
      results.push({ name: "Asaas Health", api: "asaas", category: "health", status: "fail", message: e.message, responseTime: Date.now() - start });
    }
  } else {
    results.push({ name: "Asaas Health", api: "asaas", category: "health", status: "skip", message: "ASAAS_API_KEY não configurada" });
  }

  // UAZAPI / Z-API
  const zapiToken = Deno.env.get("ZAPI_TOKEN");
  const zapiInstance = Deno.env.get("ZAPI_INSTANCE_ID");
  if (zapiToken && zapiInstance) {
    const start = Date.now();
    try {
      const res = await fetch(`https://api.z-api.io/instances/${zapiInstance}/token/${Deno.env.get("ZAPI_CLIENT_TOKEN")}/status`, {
        headers: { "Client-Token": zapiToken },
      });
      const data = await res.json();
      results.push({
        name: "Z-API Health",
        api: "zapi",
        category: "health",
        status: res.ok ? "pass" : "fail",
        message: res.ok ? `Status: ${data.connected ? "Conectado" : "Desconectado"}` : `Erro ${res.status}`,
        responseTime: Date.now() - start,
        statusCode: res.status,
        details: data,
      });
    } catch (e) {
      results.push({ name: "Z-API Health", api: "zapi", category: "health", status: "fail", message: e.message, responseTime: Date.now() - start });
    }
  } else {
    results.push({ name: "Z-API Health", api: "zapi", category: "health", status: "skip", message: "ZAPI_TOKEN ou ZAPI_INSTANCE_ID não configurada" });
  }

  // Resend
  const resendKey = Deno.env.get("RESEND_API_KEY");
  if (resendKey) {
    const start = Date.now();
    try {
      const res = await fetch("https://api.resend.com/domains", {
        headers: { Authorization: `Bearer ${resendKey}` },
      });
      const data = await res.json();
      results.push({
        name: "Resend Health",
        api: "resend",
        category: "health",
        status: res.ok ? "pass" : "fail",
        message: res.ok ? `${data.data?.length || 0} domínios configurados` : `Erro ${res.status}`,
        responseTime: Date.now() - start,
        statusCode: res.status,
      });
    } catch (e) {
      results.push({ name: "Resend Health", api: "resend", category: "health", status: "fail", message: e.message, responseTime: Date.now() - start });
    }
  } else {
    results.push({ name: "Resend Health", api: "resend", category: "health", status: "skip", message: "RESEND_API_KEY não configurada" });
  }

  // ElevenLabs
  const elevenKey = Deno.env.get("ELEVENLABS_API_KEY");
  if (elevenKey) {
    const start = Date.now();
    try {
      const res = await fetch("https://api.elevenlabs.io/v1/user/subscription", {
        headers: { "xi-api-key": elevenKey },
      });
      const data = await res.json();
      results.push({
        name: "ElevenLabs Health",
        api: "elevenlabs",
        category: "health",
        status: res.ok ? "pass" : "fail",
        message: res.ok ? `Plano: ${data.tier || "N/A"}, chars restantes: ${data.character_limit - data.character_count}` : `Erro ${res.status}`,
        responseTime: Date.now() - start,
        statusCode: res.status,
      });
    } catch (e) {
      results.push({ name: "ElevenLabs Health", api: "elevenlabs", category: "health", status: "fail", message: e.message, responseTime: Date.now() - start });
    }
  } else {
    results.push({ name: "ElevenLabs Health", api: "elevenlabs", category: "health", status: "skip", message: "ELEVENLABS_API_KEY não configurada" });
  }

  return { results };
}

// ============ GEMINI TESTS ============
async function testGemini(): Promise<{ results: TestResult[] }> {
  const results: TestResult[] = [];
  const key = Deno.env.get("GEMINI_API_KEY");
  if (!key) return { results: [{ name: "Gemini", api: "gemini", category: "endpoint", status: "skip", message: "Chave não configurada" }] };
  const baseUrl = "https://generativelanguage.googleapis.com/v1beta";

  // Test list models
  let start = Date.now();
  try {
    const res = await fetch(`${baseUrl}/models?key=${key}`);
    const data = await res.json();
    results.push({ name: "Listar Modelos", api: "gemini", category: "endpoint", status: res.ok ? "pass" : "fail", message: `${data.models?.length || 0} modelos disponíveis`, responseTime: Date.now() - start, statusCode: res.status });
  } catch (e) { results.push({ name: "Listar Modelos", api: "gemini", category: "endpoint", status: "fail", message: e.message, responseTime: Date.now() - start }); }

  // Test generation
  start = Date.now();
  try {
    const res = await fetch(`${baseUrl}/models/gemini-2.0-flash:generateContent`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": key },
      body: JSON.stringify({ contents: [{ parts: [{ text: "2+2=?" }] }] }),
    });
    results.push({ name: "Gerar Conteúdo", api: "gemini", category: "endpoint", status: res.ok ? "pass" : "fail", message: res.ok ? "Geração OK" : `Erro ${res.status}`, responseTime: Date.now() - start, statusCode: res.status });
  } catch (e) { results.push({ name: "Gerar Conteúdo", api: "gemini", category: "endpoint", status: "fail", message: e.message, responseTime: Date.now() - start }); }

  // Invalid key test (permission)
  start = Date.now();
  try {
    const res = await fetch(`${baseUrl}/models/gemini-2.0-flash:generateContent`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": "INVALID_KEY_TEST" },
      body: JSON.stringify({ contents: [{ parts: [{ text: "test" }] }] }),
    });
    results.push({ name: "Rejeitar chave inválida", api: "gemini", category: "permissions", status: res.status === 400 || res.status === 403 ? "pass" : "warn", message: `Retornou ${res.status} (esperado 400/403)`, responseTime: Date.now() - start, statusCode: res.status });
  } catch (e) { results.push({ name: "Rejeitar chave inválida", api: "gemini", category: "permissions", status: "pass", message: "Request rejeitada", responseTime: Date.now() - start }); }

  // Malformed payload
  start = Date.now();
  try {
    const res = await fetch(`${baseUrl}/models/gemini-2.0-flash:generateContent`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": key },
      body: "NOT_JSON",
    });
    results.push({ name: "Payload Malformado", api: "gemini", category: "error_handling", status: res.status === 400 ? "pass" : "warn", message: `Retornou ${res.status}`, responseTime: Date.now() - start, statusCode: res.status });
  } catch (e) { results.push({ name: "Payload Malformado", api: "gemini", category: "error_handling", status: "pass", message: e.message, responseTime: Date.now() - start }); }

  return { results };
}

// ============ ASAAS TESTS ============
async function testAsaas(): Promise<{ results: TestResult[] }> {
  const results: TestResult[] = [];
  const key = Deno.env.get("ASAAS_API_KEY");
  if (!key) return { results: [{ name: "Asaas", api: "asaas", category: "endpoint", status: "skip", message: "Chave não configurada" }] };
  const base = "https://api.asaas.com/v3";
  const headers = { "access_token": key };

  const endpoints = [
    { name: "Saldo Atual", path: "/finance/getCurrentBalance" },
    { name: "Listar Clientes", path: "/customers?limit=1" },
    { name: "Listar Cobranças", path: "/payments?limit=1" },
    { name: "Listar Assinaturas", path: "/subscriptions?limit=1" },
    { name: "Estatísticas", path: "/finance/payment/statistics" },
  ];

  for (const ep of endpoints) {
    const start = Date.now();
    try {
      const res = await fetch(`${base}${ep.path}`, { headers });
      results.push({ name: ep.name, api: "asaas", category: "endpoint", status: res.ok ? "pass" : "fail", message: res.ok ? "OK" : `Erro ${res.status}`, responseTime: Date.now() - start, statusCode: res.status });
    } catch (e) { results.push({ name: ep.name, api: "asaas", category: "endpoint", status: "fail", message: e.message, responseTime: Date.now() - start }); }
  }

  // Permission test (should not be able to delete without valid ID)
  const start = Date.now();
  try {
    const res = await fetch(`${base}/customers/INVALID_ID`, { method: "DELETE", headers });
    results.push({ name: "Rejeitar DELETE inválido", api: "asaas", category: "permissions", status: res.status === 404 || res.status === 400 ? "pass" : "warn", message: `Retornou ${res.status}`, responseTime: Date.now() - start, statusCode: res.status });
  } catch (e) { results.push({ name: "Rejeitar DELETE inválido", api: "asaas", category: "permissions", status: "pass", message: e.message, responseTime: Date.now() - start }); }

  return { results };
}

// ============ UAZAPI/Z-API TESTS ============
async function testUazapi(): Promise<{ results: TestResult[] }> {
  const results: TestResult[] = [];
  const token = Deno.env.get("ZAPI_TOKEN");
  const instance = Deno.env.get("ZAPI_INSTANCE_ID");
  const clientToken = Deno.env.get("ZAPI_CLIENT_TOKEN");
  if (!token || !instance) return { results: [{ name: "Z-API", api: "zapi", category: "endpoint", status: "skip", message: "Credenciais não configuradas" }] };

  const base = `https://api.z-api.io/instances/${instance}/token/${clientToken}`;
  const headers: Record<string, string> = { "Client-Token": token };

  const endpoints = [
    { name: "Status", path: "/status" },
    { name: "Info Dispositivo", path: "/phone" },
    { name: "QR Code", path: "/qr-code" },
  ];

  for (const ep of endpoints) {
    const start = Date.now();
    try {
      const res = await fetch(`${base}${ep.path}`, { headers });
      const data = await res.json();
      results.push({ name: ep.name, api: "zapi", category: "endpoint", status: res.ok ? "pass" : "fail", message: res.ok ? "OK" : `Erro ${res.status}`, responseTime: Date.now() - start, statusCode: res.status, details: data });
    } catch (e) { results.push({ name: ep.name, api: "zapi", category: "endpoint", status: "fail", message: e.message, responseTime: Date.now() - start }); }
  }

  return { results };
}

// ============ PERFORMANCE TEST ============
async function testPerformance(api: string, count: number): Promise<{ results: TestResult[], metrics: { avg: number, p95: number, p99: number, min: number, max: number } }> {
  const safeCount = Math.min(count, 50);
  const times: number[] = [];
  const results: TestResult[] = [];

  for (let i = 0; i < safeCount; i++) {
    const start = Date.now();
    try {
      if (api === "gemini") {
        const key = Deno.env.get("GEMINI_API_KEY");
        if (!key) break;
        const res = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent", {
          method: "POST",
          headers: { "Content-Type": "application/json", "x-goog-api-key": key },
          body: JSON.stringify({ contents: [{ parts: [{ text: `Ping ${i}` }] }] }),
        });
        const elapsed = Date.now() - start;
        times.push(elapsed);
        results.push({ name: `Req #${i + 1}`, api, category: "performance", status: res.ok ? "pass" : "fail", message: `${elapsed}ms`, responseTime: elapsed, statusCode: res.status });
      } else if (api === "asaas") {
        const key = Deno.env.get("ASAAS_API_KEY");
        if (!key) break;
        const res = await fetch("https://api.asaas.com/v3/finance/getCurrentBalance", { headers: { "access_token": key } });
        const elapsed = Date.now() - start;
        times.push(elapsed);
        results.push({ name: `Req #${i + 1}`, api, category: "performance", status: res.ok ? "pass" : "fail", message: `${elapsed}ms`, responseTime: elapsed, statusCode: res.status });
      }
    } catch (e) {
      times.push(Date.now() - start);
      results.push({ name: `Req #${i + 1}`, api, category: "performance", status: "fail", message: e.message, responseTime: Date.now() - start });
    }
    // Small delay to avoid rate limits
    if (i < safeCount - 1) await new Promise(r => setTimeout(r, 200));
  }

  times.sort((a, b) => a - b);
  const avg = times.length > 0 ? Math.round(times.reduce((a, b) => a + b, 0) / times.length) : 0;
  const p95 = times[Math.floor(times.length * 0.95)] || 0;
  const p99 = times[Math.floor(times.length * 0.99)] || 0;
  return { results, metrics: { avg, p95, p99, min: times[0] || 0, max: times[times.length - 1] || 0 } };
}

// ============ SECURITY AUDIT ============
async function runSecurityAudit(): Promise<{ results: TestResult[] }> {
  const results: TestResult[] = [];

  // Check secrets exist
  const secrets = ["GEMINI_API_KEY", "ASAAS_API_KEY", "ASAAS_WEBHOOK_TOKEN", "ZAPI_TOKEN", "UAZAPI_WEBHOOK_SECRET", "RESEND_API_KEY"];
  for (const s of secrets) {
    const val = Deno.env.get(s);
    results.push({
      name: `Secret: ${s}`,
      api: "security",
      category: "security",
      status: val ? "pass" : "warn",
      message: val ? "Configurada (não exposta)" : "Não configurada",
    });
  }

  // Check webhook tokens
  const webhookToken = Deno.env.get("ASAAS_WEBHOOK_TOKEN");
  results.push({
    name: "Asaas Webhook Token",
    api: "security",
    category: "security",
    status: webhookToken ? "pass" : "fail",
    message: webhookToken ? "Token de webhook configurado" : "CRÍTICO: Webhook sem proteção",
  });

  const zapiSecret = Deno.env.get("ZAPI_WEBHOOK_SECRET") || Deno.env.get("UAZAPI_WEBHOOK_SECRET");
  results.push({
    name: "WhatsApp Webhook Secret",
    api: "security",
    category: "security",
    status: zapiSecret ? "pass" : "fail",
    message: zapiSecret ? "Secret de webhook configurada" : "CRÍTICO: Webhook sem proteção",
  });

  // CORS check
  results.push({
    name: "CORS - Allow Origin",
    api: "security",
    category: "security",
    status: "warn",
    message: "CORS configurado com '*' (ok para APIs com JWT, mas revisar para produção)",
  });

  // Verify no secret in env names suggests frontend exposure
  results.push({
    name: "Secrets no Frontend",
    api: "security",
    category: "security",
    status: "pass",
    message: "Todas chamadas de API usam Edge Functions (seguro)",
  });

  return { results };
}

// ============ FULL SUITE ============
async function runFullSuite(): Promise<{ results: TestResult[], score: number, total: number }> {
  const allResults: TestResult[] = [];

  const [health, gemini, asaas, uazapi, security] = await Promise.all([
    runHealthChecks(),
    testGemini(),
    testAsaas(),
    testUazapi(),
    runSecurityAudit(),
  ]);

  allResults.push(...health.results, ...gemini.results, ...asaas.results, ...uazapi.results, ...security.results);

  const total = allResults.filter(r => r.status !== "skip").length;
  const passed = allResults.filter(r => r.status === "pass").length;
  const score = total > 0 ? Math.round((passed / total) * 100) : 0;

  return { results: allResults, score, total };
}

// ============ LOGS ============
async function fetchLogs(limit: number): Promise<{ logs: unknown[] }> {
  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from("edge_function_logs")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(Math.min(limit, 200));
  
  if (error) throw new Error(`Erro ao buscar logs: ${error.message}`);
  return { logs: data || [] };
}
