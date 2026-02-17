import { handleCors } from "../_shared/cors.ts";
import { createServiceClient } from "../_shared/supabase-client.ts";
import { requireAuthUser } from "../_shared/auth.ts";
import { jsonResponse, errorResponse } from "../_shared/response.ts";

const ASAAS_API_URL = "https://api.asaas.com/v3";

Deno.serve(async (req) => {
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    const ASAAS_API_KEY = Deno.env.get("ASAAS_API_KEY");
    if (!ASAAS_API_KEY) throw new Error("ASAAS_API_KEY não configurada");

    await requireAuthUser(req);
    const supabase = createServiceClient();

    const url = new URL(req.url);
    const paymentId = url.searchParams.get("paymentId");

    if (!paymentId) throw new Error("paymentId é obrigatório");

    const res = await fetch(`${ASAAS_API_URL}/payments/${paymentId}`, {
      headers: { access_token: ASAAS_API_KEY },
    });

    const paymentData = await res.json();

    await supabase
      .from("pagamentos_asaas")
      .update({ status: paymentData.status })
      .eq("asaas_payment_id", paymentId);

    return jsonResponse({
      status: paymentData.status,
      confirmedDate: paymentData.confirmedDate,
      paymentDate: paymentData.paymentDate,
      value: paymentData.value,
    });
  } catch (error: any) {
    if (error instanceof Response) return error;
    return errorResponse(error.message);
  }
});
