import { handleCors } from "../_shared/cors.ts";
import { createServiceClient } from "../_shared/supabase-client.ts";
import { requireAuth } from "../_shared/auth.ts";
import { jsonResponse, errorResponse } from "../_shared/response.ts";
import { createLogger } from "../_shared/logger.ts";

Deno.serve(async (req: Request) => {
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  const log = createLogger("corporativo-billing");

  try {
    // 1. Require authentication
    const { userId } = await requireAuth(req);
    const supabase = createServiceClient();

    // 2. Verify admin role
    const { data: isAdmin } = await supabase.rpc("has_role", {
      _user_id: userId,
      _role: "admin",
    });

    if (!isAdmin) {
      return errorResponse("Acesso restrito a administradores", 403);
    }

    const { action, empresa_id, plano } = await req.json();
    const ASAAS_API_KEY = Deno.env.get("ASAAS_API_KEY");
    const ASAAS_BASE = "https://api.asaas.com/v3";

    if (!ASAAS_API_KEY) {
      log.warn("ASAAS_API_KEY não configurada");
      return errorResponse("Integração de pagamento não configurada", 503);
    }

    switch (action) {
      case "criar_assinatura": {
        if (!empresa_id || !plano) {
          return errorResponse("empresa_id e plano são obrigatórios", 400);
        }

        // Buscar dados da empresa
        const { data: empresa } = await supabase
          .from("empresas_corporativas")
          .select("*")
          .eq("id", empresa_id)
          .single();

        if (!empresa) {
          return errorResponse("Empresa não encontrada", 404);
        }

        // Criar cliente no Asaas (se não existir)
        let customerId = empresa.asaas_customer_id;
        if (!customerId) {
          const customerResp = await fetch(`${ASAAS_BASE}/customers`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "access_token": ASAAS_API_KEY,
            },
            body: JSON.stringify({
              name: empresa.razao_social || empresa.nome,
              cpfCnpj: empresa.cnpj,
              email: empresa.email_financeiro || empresa.contato_email,
            }),
          });

          const customer = await customerResp.json();
          if (!customer.id) {
            log.error("Falha ao criar cliente no Asaas", { response: customer });
            return errorResponse("Falha ao criar cliente no sistema de pagamento", 502);
          }
          customerId = customer.id;

          await supabase
            .from("empresas_corporativas")
            .update({ asaas_customer_id: customerId })
            .eq("id", empresa_id);
        }

        // Criar assinatura recorrente
        const subscriptionResp = await fetch(`${ASAAS_BASE}/subscriptions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "access_token": ASAAS_API_KEY,
          },
          body: JSON.stringify({
            customer: customerId,
            billingType: "BOLETO",
            nextDueDate: plano.proximo_vencimento,
            value: plano.valor_mensal,
            cycle: "MONTHLY",
            description: `Plano ${plano.tipo} — ${empresa.razao_social || empresa.nome}`,
            externalReference: empresa_id,
          }),
        });

        const subscription = await subscriptionResp.json();
        if (!subscription.id) {
          log.error("Falha ao criar assinatura no Asaas", { response: subscription });
          return errorResponse("Falha ao criar assinatura no sistema de pagamento", 502);
        }

        // Salvar contrato
        await supabase.from("corporativo_contratos").insert({
          empresa_id,
          tipo_plano: plano.tipo,
          valor_mensal: plano.valor_mensal,
          max_colaboradores: plano.max_colaboradores || 50,
          data_inicio: new Date().toISOString().split("T")[0],
          asaas_subscription_id: subscription.id,
          status: "ativo",
        });

        log.info("Assinatura corporativa criada", {
          empresaId: empresa_id,
          subscriptionId: subscription.id,
        });

        return jsonResponse({ success: true, subscriptionId: subscription.id });
      }

      default:
        return errorResponse("Ação não suportada", 400);
    }
  } catch (error) {
    if (error instanceof Response) return error;
    log.error("Erro no billing corporativo", {}, error as Error);
    return errorResponse("Erro interno do servidor", 500);
  }
});
