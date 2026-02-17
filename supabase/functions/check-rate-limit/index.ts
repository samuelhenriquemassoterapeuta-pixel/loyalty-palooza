import { handleCors } from "../_shared/cors.ts";
import { createServiceClient } from "../_shared/supabase-client.ts";
import { jsonResponse, errorResponse } from "../_shared/response.ts";

Deno.serve(async (req) => {
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    const { email, action, success } = await req.json();
    if (!email) return errorResponse("Email is required", 400);

    const supabaseAdmin = createServiceClient();
    const ipAddress = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";

    if (action === "check") {
      const { data, error } = await supabaseAdmin.rpc("check_login_rate_limit", { p_email: email.toLowerCase(), p_ip_address: ipAddress, p_max_attempts: 5, p_window_minutes: 15 });
      if (error) { console.error("Rate limit check error:", error); return errorResponse("Failed to check rate limit", 500); }
      const result = data?.[0] || { is_blocked: false, attempts_count: 0, next_attempt_at: null };
      return jsonResponse({ isBlocked: result.is_blocked, attemptsCount: result.attempts_count, nextAttemptAt: result.next_attempt_at, remainingAttempts: Math.max(0, 5 - result.attempts_count) });
    } else if (action === "record") {
      const { error } = await supabaseAdmin.rpc("record_login_attempt", { p_email: email.toLowerCase(), p_ip_address: ipAddress, p_success: success || false });
      if (error) { console.error("Record attempt error:", error); return errorResponse("Failed to record attempt", 500); }
      return jsonResponse({ success: true });
    } else {
      return errorResponse("Invalid action. Use 'check' or 'record'", 400);
    }
  } catch (error) {
    console.error("Edge function error:", error);
    return errorResponse("Internal server error", 500);
  }
});
