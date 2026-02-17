import { handleCors } from "../_shared/cors.ts";
import { createServiceClient } from "../_shared/supabase-client.ts";
import { jsonResponse, errorResponse } from "../_shared/response.ts";

Deno.serve(async (req) => {
  const corsRes = handleCors(req);
  if (corsRes) return corsRes;

  try {
    const supabase = createServiceClient();

    const { data, error } = await supabase.rpc("process_expired_vales");

    if (error) throw error;

    const count = data?.length || 0;

    return jsonResponse({
      success: true,
      message: `${count} vale(s) expirado(s) processado(s)`,
      expired: data,
    });
  } catch (err: any) {
    return errorResponse(err.message, 500);
  }
});
