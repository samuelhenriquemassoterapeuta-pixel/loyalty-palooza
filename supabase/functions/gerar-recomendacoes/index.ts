import { createClient } from "https://esm.sh/@supabase/supabase-js@2.89.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const lovableApiKey = Deno.env.get("LOVABLE_API_KEY")!;

    // Get user from auth header
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("Não autorizado");

    const anonClient = createClient(supabaseUrl, Deno.env.get("SUPABASE_ANON_KEY")!);
    const { data: { user }, error: authError } = await anonClient.auth.getUser(
      authHeader.replace("Bearer ", "")
    );
    if (authError || !user) throw new Error("Não autorizado");

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch user clinical data
    const [fichaNut, historico, protocolos, agendamentos] = await Promise.all([
      supabase.from("ficha_nutricional").select("*").eq("user_id", user.id).maybeSingle(),
      supabase.from("historico_cirurgico").select("*").eq("user_id", user.id),
      supabase.from("usuario_protocolos").select("*, protocolos(*)").eq("user_id", user.id),
      supabase.from("agendamentos").select("*").eq("user_id", user.id).order("data_hora", { ascending: false }).limit(10),
    ]);

    // Fetch available services
    const { data: servicos } = await supabase.from("servicos").select("*").eq("disponivel", true);
    const { data: protocolosDisp } = await supabase.from("protocolos").select("*").eq("disponivel", true);

    // Build profile summary for AI
    const profileSummary = {
      ficha_nutricional: fichaNut.data,
      historico_cirurgico: historico.data,
      protocolos_ativos: protocolos.data,
      ultimos_agendamentos: agendamentos.data?.map((a: any) => ({
        servico: a.servico,
        status: a.status,
        data: a.data_hora,
      })),
      servicos_disponiveis: servicos?.map((s: any) => s.nome),
      protocolos_disponiveis: protocolosDisp?.map((p: any) => ({
        nome: p.nome,
        tipo: p.tipo,
        descricao: p.descricao,
      })),
    };

    // Call AI gateway
    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${lovableApiKey}`,
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `Você é um assistente de saúde e bem-estar para uma clínica de massoterapia e estética. 
Analise o perfil clínico do paciente e sugira 3-5 tratamentos/protocolos personalizados.
Responda APENAS em JSON válido, como array de objetos:
[{"titulo":"...","descricao":"...","tipo":"tratamento|protocolo|servico","confianca":0.0-1.0}]
Considere: histórico cirúrgico, ficha nutricional, protocolos atuais, serviços já utilizados.
Sugira serviços que o paciente ainda NÃO utilizou quando relevante.
Seja conciso nas descrições (max 2 frases).`,
          },
          {
            role: "user",
            content: JSON.stringify(profileSummary),
          },
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      if (aiResponse.status === 429) {
        return new Response(JSON.stringify({ error: "Muitas requisições. Tente novamente em alguns minutos." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (aiResponse.status === 402) {
        return new Response(JSON.stringify({ error: "Créditos de IA insuficientes. Entre em contato com o suporte." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error(`AI gateway error: ${errorText}`);
    }

    const aiData = await aiResponse.json();
    const content = aiData.choices?.[0]?.message?.content || "[]";

    // Parse AI response - handle markdown code blocks
    let recommendations;
    try {
      const cleaned = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      recommendations = JSON.parse(cleaned);
    } catch {
      recommendations = [];
    }

    // Save recommendations to database
    if (Array.isArray(recommendations) && recommendations.length > 0) {
      const inserts = recommendations.map((rec: any) => ({
        user_id: user.id,
        tipo: rec.tipo || "tratamento",
        titulo: rec.titulo,
        descricao: rec.descricao,
        confianca: Math.min(1, Math.max(0, rec.confianca || 0.8)),
        dados_base: profileSummary,
      }));

      await supabase.from("recomendacoes_ia").insert(inserts);
    }

    return new Response(JSON.stringify({ count: recommendations.length }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
