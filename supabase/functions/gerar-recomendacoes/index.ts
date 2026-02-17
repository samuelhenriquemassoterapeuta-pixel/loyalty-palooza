import { handleCors } from "../_shared/cors.ts";
import { createServiceClient } from "../_shared/supabase-client.ts";
import { requireAuthUser } from "../_shared/auth.ts";
import { jsonResponse, errorResponse } from "../_shared/response.ts";

interface Recomendacao {
  titulo: string;
  descricao: string;
  tipo: string;
  confianca: number;
}

function gerarRecomendacoesPorRegras(fichaNut: any, historico: any[], protocolosAtivos: any[], agendamentos: any[], servicosDisponiveis: any[], protocolosDisponiveis: any[]): Recomendacao[] {
  const recomendacoes: Recomendacao[] = [];
  const servicosUsados = new Set(agendamentos.map((a: any) => a.servico));
  const protocolosTiposAtivos = new Set(protocolosAtivos.map((p: any) => p.protocolos?.tipo));

  if (historico && historico.length > 0) {
    const cirurgiaRecente = historico.some((h: any) => { const diff = Date.now() - new Date(h.data_cirurgia).getTime(); return diff < 180 * 24 * 60 * 60 * 1000; });
    if (cirurgiaRecente && !protocolosTiposAtivos.has("drenagem_pos_operatorio")) {
      recomendacoes.push({ titulo: "Drenagem Linfática Pós-Operatória", descricao: "Baseado no seu histórico cirúrgico recente, a drenagem ajuda na recuperação e redução de inchaço.", tipo: "protocolo", confianca: 0.95 });
    }
  }

  if (fichaNut?.peso && fichaNut?.altura) {
    const alturaM = fichaNut.altura > 3 ? fichaNut.altura / 100 : fichaNut.altura;
    const imc = fichaNut.peso / (alturaM * alturaM);
    if (imc > 25 && !protocolosTiposAtivos.has("emagrecimento")) {
      recomendacoes.push({ titulo: "Protocolo de Emagrecimento", descricao: "Seu perfil indica que um protocolo com foco em redução de medidas pode trazer ótimos resultados.", tipo: "protocolo", confianca: imc > 30 ? 0.92 : 0.8 });
    }
  }

  if (fichaNut?.nivel_atividade === "sedentario") {
    recomendacoes.push({ titulo: "Plano de Alongamento Guiado", descricao: "Para quem tem rotina sedentária, o alongamento regular melhora postura e reduz dores.", tipo: "servico", confianca: 0.85 });
  }

  const servicosNaoUsados = servicosDisponiveis.filter((s: any) => !servicosUsados.has(s.nome));
  if (servicosNaoUsados.length > 0) {
    const sugestao = servicosNaoUsados[0];
    recomendacoes.push({ titulo: `Experimente: ${sugestao.nome}`, descricao: `Você ainda não experimentou esse serviço. ${sugestao.descricao || "Pode ser uma ótima adição ao seu cuidado."}`, tipo: "servico", confianca: 0.7 });
  }

  const protocolosSugestao = protocolosDisponiveis.filter((p: any) => !protocolosTiposAtivos.has(p.tipo));
  if (protocolosSugestao.length > 0 && recomendacoes.length < 4) {
    const p = protocolosSugestao[0];
    recomendacoes.push({ titulo: `Protocolo: ${p.nome}`, descricao: p.descricao || `Um protocolo de ${p.tipo} com duração de ${p.duracao_semanas} semanas.`, tipo: "protocolo", confianca: 0.65 });
  }

  if (fichaNut?.fumante) {
    recomendacoes.push({ titulo: "Aromaterapia Relaxante", descricao: "Sessões de aromaterapia podem ajudar no gerenciamento do estresse e bem-estar geral.", tipo: "tratamento", confianca: 0.6 });
  }

  if (fichaNut?.objetivo) {
    const obj = fichaNut.objetivo.toLowerCase();
    if (obj.includes("relaxa") || obj.includes("stress") || obj.includes("ansie")) {
      recomendacoes.push({ titulo: "Head Spa Terapêutico", descricao: "Baseado no seu objetivo de relaxamento, o Head Spa combina massagem craniana com aromaterapia.", tipo: "servico", confianca: 0.88 });
    }
    if (obj.includes("dor") || obj.includes("postur")) {
      recomendacoes.push({ titulo: "Avaliação Postural Completa", descricao: "Uma avaliação postural pode identificar desequilíbrios e guiar seu tratamento de forma mais precisa.", tipo: "servico", confianca: 0.87 });
    }
  }

  return recomendacoes.sort((a, b) => b.confianca - a.confianca).slice(0, 5);
}

Deno.serve(async (req) => {
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    const { userId } = await requireAuthUser(req);
    const supabase = createServiceClient();

    const [fichaNut, historico, protocolos, agendamentos] = await Promise.all([
      supabase.from("ficha_nutricional").select("*").eq("user_id", userId).maybeSingle(),
      supabase.from("historico_cirurgico").select("*").eq("user_id", userId),
      supabase.from("usuario_protocolos").select("*, protocolos(*)").eq("user_id", userId),
      supabase.from("agendamentos").select("*").eq("user_id", userId).order("data_hora", { ascending: false }).limit(10),
    ]);

    const { data: servicos } = await supabase.from("servicos").select("*").eq("disponivel", true);
    const { data: protocolosDisp } = await supabase.from("protocolos").select("*").eq("disponivel", true);

    const recommendations = gerarRecomendacoesPorRegras(fichaNut.data, historico.data || [], protocolos.data || [], agendamentos.data || [], servicos || [], protocolosDisp || []);

    if (recommendations.length > 0) {
      const inserts = recommendations.map((rec) => ({ user_id: userId, tipo: rec.tipo, titulo: rec.titulo, descricao: rec.descricao, confianca: rec.confianca, dados_base: { method: "rule-based", generated_at: new Date().toISOString() } }));
      await supabase.from("recomendacoes_ia").insert(inserts);
    }

    return jsonResponse({ count: recommendations.length });
  } catch (error: any) {
    if (error instanceof Response) return error;
    return errorResponse(error.message);
  }
});
