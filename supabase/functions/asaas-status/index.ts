import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const ASAAS_API_URL = "https://api.asaas.com/v3";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const ASAAS_API_KEY = Deno.env.get("ASAAS_API_KEY");
    if (!ASAAS_API_KEY) throw new Error("ASAAS_API_KEY não configurada");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Auth
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("Não autorizado");

    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) throw new Error("Não autorizado");

    const url = new URL(req.url);
    const paymentId = url.searchParams.get("paymentId");

    if (!paymentId) throw new Error("paymentId é obrigatório");

    // Check status on Asaas
    const res = await fetch(`${ASAAS_API_URL}/payments/${paymentId}`, {
      headers: { access_token: ASAAS_API_KEY },
    });

    const paymentData = await res.json();

    // Update local record
    await supabase
      .from("pagamentos_asaas")
      .update({ status: paymentData.status })
      .eq("asaas_payment_id", paymentId);

    return new Response(
      JSON.stringify({
        status: paymentData.status,
        confirmedDate: paymentData.confirmedDate,
        paymentDate: paymentData.paymentDate,
        value: paymentData.value,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
