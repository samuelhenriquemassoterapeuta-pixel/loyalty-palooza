/**
 * @module edge-functions/financeiro-relatorio
 * @description Gera relatório financeiro completo (DRE + Fluxo de Caixa)
 * para download ou envio por email. Restrito a administradores.
 */

import { handleCors } from "../_shared/cors.ts";
import { createServiceClient } from "../_shared/supabase-client.ts";
import { requireAuth } from "../_shared/auth.ts";
import { jsonResponse, errorResponse } from "../_shared/response.ts";

Deno.serve(async (req) => {
  const corsRes = handleCors(req);
  if (corsRes) return corsRes;

  try {
    const { userId } = await requireAuth(req);
    const supabaseAdmin = createServiceClient();

    // Verify admin role
    const { data: roleData } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .single();

    if (!roleData) {
      return errorResponse("Acesso restrito a administradores", 403);
    }

    const body = await req.json().catch(() => ({}));
    const dataInicio = body.data_inicio || new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split("T")[0];
    const dataFim = body.data_fim || new Date().toISOString().split("T")[0];

    // Fetch DRE
    const { data: dre, error: dreError } = await supabaseAdmin.rpc("get_dre", {
      p_data_inicio: dataInicio,
      p_data_fim: dataFim,
    });

    if (dreError) {
      console.error("Erro ao buscar DRE:", dreError.message);
      return errorResponse("Erro ao gerar DRE", 500);
    }

    // Fetch Fluxo de Caixa
    const { data: fluxo, error: fluxoError } = await supabaseAdmin.rpc("get_fluxo_caixa", {
      p_meses: 6,
    });

    if (fluxoError) {
      console.error("Erro ao buscar fluxo:", fluxoError.message);
      return errorResponse("Erro ao gerar fluxo de caixa", 500);
    }

    // Fetch Resumo
    const { data: resumo, error: resumoError } = await supabaseAdmin.rpc("get_resumo_financeiro", {
      p_data_inicio: dataInicio,
      p_data_fim: dataFim,
    });

    if (resumoError) {
      console.error("Erro ao buscar resumo:", resumoError.message);
      return errorResponse("Erro ao gerar resumo", 500);
    }

    // Build CSV report
    const csvLines: string[] = [];
    csvLines.push("RELATÓRIO FINANCEIRO");
    csvLines.push(`Período: ${dataInicio} a ${dataFim}`);
    csvLines.push(`Gerado em: ${new Date().toISOString()}`);
    csvLines.push("");

    // DRE section
    if (dre) {
      csvLines.push("=== DRE - DEMONSTRATIVO DE RESULTADO ===");
      csvLines.push("Tipo,Categoria,Valor");
      csvLines.push(`Receita,Serviços,${dre.receitas?.servicos ?? 0}`);
      csvLines.push(`Receita,Produtos,${dre.receitas?.produtos ?? 0}`);
      csvLines.push(`Receita,Assinaturas,${dre.receitas?.assinaturas ?? 0}`);
      csvLines.push(`Receita,TOTAL,${dre.receitas?.total ?? 0}`);
      csvLines.push(`Despesa,Fixas,${dre.despesas?.fixas ?? 0}`);
      csvLines.push(`Despesa,Variáveis,${dre.despesas?.variaveis ?? 0}`);
      csvLines.push(`Despesa,Pessoal,${dre.despesas?.pessoal ?? 0}`);
      csvLines.push(`Despesa,Marketing,${dre.despesas?.marketing ?? 0}`);
      csvLines.push(`Despesa,Impostos,${dre.despesas?.impostos ?? 0}`);
      csvLines.push(`Despesa,Outras,${dre.despesas?.outras ?? 0}`);
      csvLines.push(`Despesa,TOTAL,${dre.despesas?.total ?? 0}`);
      csvLines.push(`Resultado,Lucro Líquido,${dre.resultado?.lucro_liquido ?? 0}`);
      csvLines.push(`Resultado,Margem Líquida,${dre.resultado?.margem_liquida ?? 0}%`);
      csvLines.push("");
    }

    // Cash Flow section
    if (fluxo && Array.isArray(fluxo)) {
      csvLines.push("=== FLUXO DE CAIXA ===");
      csvLines.push("Mês,Entradas,Saídas,Saldo Mês,Saldo Acumulado");
      for (const m of fluxo) {
        csvLines.push(`${m.mes},${m.entradas},${m.saidas},${m.saldo_mes},${m.saldo_acumulado}`);
      }
    }

    return jsonResponse({
      success: true,
      dre,
      fluxo_caixa: fluxo,
      resumo,
      csv: csvLines.join("\n"),
      periodo: { inicio: dataInicio, fim: dataFim },
    });
  } catch (error) {
    if (error instanceof Response) return error;
    const msg = error instanceof Error ? error.message : "Erro desconhecido";
    console.error("Erro no relatório financeiro:", msg);
    return errorResponse("Erro interno do servidor", 500);
  }
});
