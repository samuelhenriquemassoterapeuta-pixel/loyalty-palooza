import { handleCors } from "../_shared/cors.ts";
import { jsonResponse, errorResponse } from "../_shared/response.ts";

Deno.serve(async (req) => {
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    const { prompt } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");
    if (!prompt || typeof prompt !== "string") return errorResponse("Prompt é obrigatório", 400);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model: "google/gemini-2.5-flash-image", messages: [{ role: "user", content: `Generate a professional, high-quality photo for a spa/wellness service. The image should be elegant, calming, and luxurious. Description: ${prompt}. Style: professional photography, soft lighting, spa atmosphere, warm tones.` }], modalities: ["image", "text"] }),
    });

    if (!response.ok) {
      if (response.status === 429) return errorResponse("Limite de requisições excedido.", 429);
      if (response.status === 402) return errorResponse("Créditos insuficientes para gerar imagem.", 402);
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return errorResponse("Erro ao gerar imagem", 500);
    }

    const data = await response.json();
    const imageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    if (!imageUrl) return errorResponse("Não foi possível gerar a imagem", 500);

    return jsonResponse({ imageUrl });
  } catch (e) {
    console.error("Error:", e);
    return errorResponse(e instanceof Error ? e.message : "Erro desconhecido", 500);
  }
});
