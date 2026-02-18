import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createUserClient, createServiceClient } from "../_shared/supabase-client.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("Not authenticated");

    const userClient = createUserClient(authHeader);
    const { data: { user } } = await userClient.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    const svc = createServiceClient();

    // Fetch last 30 days of checkins
    const since = new Date(Date.now() - 30 * 86400000).toISOString().split("T")[0];
    const { data: checkins } = await svc
      .from("wellness_checkins")
      .select("humor, energia, sono_horas, agua_litros, estresse, exercicio_min, dor")
      .eq("user_id", user.id)
      .gte("data", since)
      .order("data");

    if (!checkins || checkins.length < 7) {
      return json({ correlations: [], message: "Dados insuficientes. Continue registrando para ver correlações!" });
    }

    // Calculate correlations between metrics
    const metrics = {
      humor: checkins.map(c => c.humor),
      energia: checkins.map(c => c.energia),
      sono: checkins.map(c => c.sono_horas).map(v => v ?? 0),
      agua: checkins.map(c => c.agua_litros).map(v => v ?? 0),
      estresse: checkins.map(c => c.estresse).map(v => v ?? 0),
      exercicio: checkins.map(c => c.exercicio_min).map(v => v ?? 0),
    };

    const pairs: Array<{ a: string; b: string; labelA: string; labelB: string }> = [
      { a: "sono", b: "humor", labelA: "Sono", labelB: "Humor" },
      { a: "sono", b: "energia", labelA: "Sono", labelB: "Energia" },
      { a: "agua", b: "energia", labelA: "Água", labelB: "Energia" },
      { a: "agua", b: "humor", labelA: "Água", labelB: "Humor" },
      { a: "exercicio", b: "humor", labelA: "Exercício", labelB: "Humor" },
      { a: "exercicio", b: "energia", labelA: "Exercício", labelB: "Energia" },
      { a: "estresse", b: "humor", labelA: "Estresse", labelB: "Humor" },
      { a: "estresse", b: "energia", labelA: "Estresse", labelB: "Energia" },
      { a: "sono", b: "estresse", labelA: "Sono", labelB: "Estresse" },
    ];

    const correlations: Array<{
      metricA: string;
      metricB: string;
      correlation: number;
      insight: string;
      emoji: string;
      direction: "positive" | "negative";
    }> = [];

    for (const pair of pairs) {
      const a = metrics[pair.a as keyof typeof metrics];
      const b = metrics[pair.b as keyof typeof metrics];

      // Skip if insufficient variance
      if (a.every(v => v === 0) || b.every(v => v === 0)) continue;

      const r = pearsonCorrelation(a, b);
      const absR = Math.abs(r);

      if (absR >= 0.3) { // Only show meaningful correlations
        const pct = Math.round(absR * 100);
        const direction = r > 0 ? "positive" as const : "negative" as const;

        let insight: string;
        let emoji: string;

        if (r > 0.5) {
          insight = `Quando seu ${pair.labelA.toLowerCase()} é maior, seu ${pair.labelB.toLowerCase()} tende a melhorar ${pct}%`;
          emoji = "📈";
        } else if (r > 0.3) {
          insight = `Há uma conexão moderada entre ${pair.labelA.toLowerCase()} e ${pair.labelB.toLowerCase()} (+${pct}%)`;
          emoji = "🔗";
        } else if (r < -0.5) {
          insight = `Mais ${pair.labelA.toLowerCase()} está ligado a menos ${pair.labelB.toLowerCase()} (${pct}%)`;
          emoji = "📉";
        } else {
          insight = `${pair.labelA} e ${pair.labelB} têm relação inversa leve (${pct}%)`;
          emoji = "↔️";
        }

        correlations.push({
          metricA: pair.labelA,
          metricB: pair.labelB,
          correlation: Math.round(r * 100) / 100,
          insight,
          emoji,
          direction,
        });
      }
    }

    // Sort by strongest correlation
    correlations.sort((a, b) => Math.abs(b.correlation) - Math.abs(a.correlation));

    return json({ correlations: correlations.slice(0, 5), total_days: checkins.length });
  } catch (e) {
    return new Response(
      JSON.stringify({ error: e.message }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

function pearsonCorrelation(x: number[], y: number[]): number {
  const n = x.length;
  if (n === 0) return 0;

  const sumX = x.reduce((a, b) => a + b, 0);
  const sumY = y.reduce((a, b) => a + b, 0);
  const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0);
  const sumX2 = x.reduce((sum, xi) => sum + xi * xi, 0);
  const sumY2 = y.reduce((sum, yi) => sum + yi * yi, 0);

  const numerator = n * sumXY - sumX * sumY;
  const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));

  if (denominator === 0) return 0;
  return numerator / denominator;
}

function json(data: unknown) {
  return new Response(JSON.stringify(data), {
    headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" },
  });
}
