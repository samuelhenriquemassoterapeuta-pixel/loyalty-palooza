import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.89.0";
import { createLogger } from "../_shared/logger.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const log = createLogger("corporativo-billing");

  try {
    const { action, empresa_id, plano } = await req.json();
    const ASAAS_API_KEY = Deno.env.get("ASAAS_API_KEY");
    const ASAAS_BASE = "https://api.asaas.com/v3";

    if (!ASAAS_API_KEY) {
      log.warn("ASAAS_API_KEY não configurada");
      return new Response(
        JSON.stringify({ error: "Integração de pagamento não configurada" }),
        { status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    switch (action) {
      case "criar_assinatura": {
        if (!empresa_id || !plano) {
          return new Response(
            JSON.stringify({ error: "empresa_id e plano são obrigatórios" }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        // Buscar dados da empresa
        const { data: empresa } = await supabase
          .from("empresas_corporativas")
          .select("*")
          .eq("id", empresa_id)
          .single();

        if (!empresa) throw new Error("Empresa não encontrada");

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
          if (!customer.id) throw new Error("Falha ao criar cliente no Asaas: " + JSON.stringify(customer));
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
        if (!subscription.id) throw new Error("Falha ao criar assinatura: " + JSON.stringify(subscription));

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

        return new Response(
          JSON.stringify({ success: true, subscriptionId: subscription.id }),
          { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      default:
        return new Response(
          JSON.stringify({ error: "Ação não suportada" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
    }
  } catch (error) {
    log.error("Erro no billing corporativo", {}, error as Error);
    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
