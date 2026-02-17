import { handleCors } from "../_shared/cors.ts";
import { createServiceClient } from "../_shared/supabase-client.ts";
import { jsonResponse, errorResponse } from "../_shared/response.ts";

Deno.serve(async (req) => {
  const corsRes = handleCors(req);
  if (corsRes) return corsRes;

  try {
    const supabase = createServiceClient();

    // 1. Process expired cashback
    const { data: expired, error: expiredError } = await supabase.rpc("process_expired_cashback");

    if (expiredError) {
      console.error("Error processing expired cashback:", expiredError);
    } else {
      console.log("Expired cashback processed:", expired);
    }

    // 2. Notify users about cashback expiring soon (within 7 days)
    const { data: expiring, error: expiringError } = await supabase.rpc("notify_expiring_cashback");

    if (expiringError) {
      console.error("Error notifying expiring cashback:", expiringError);
    } else {
      console.log("Expiring cashback notifications sent:", expiring);
    }

    return jsonResponse({
      success: true,
      expired: expired || [],
      expiring: expiring || [],
    });
  } catch (error: any) {
    console.error("Error in processar-expiracoes:", error);
    return errorResponse(error.message, 500);
  }
});
