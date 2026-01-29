import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, action, success } = await req.json();

    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create Supabase client with service role for database access
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Get client IP from headers
    const ipAddress = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
                      req.headers.get("x-real-ip") || 
                      "unknown";

    if (action === "check") {
      // Check if rate limited
      const { data, error } = await supabaseAdmin.rpc("check_login_rate_limit", {
        p_email: email.toLowerCase(),
        p_ip_address: ipAddress,
        p_max_attempts: 5,
        p_window_minutes: 15,
      });

      if (error) {
        console.error("Rate limit check error:", error);
        return new Response(
          JSON.stringify({ error: "Failed to check rate limit" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const result = data?.[0] || { is_blocked: false, attempts_count: 0, next_attempt_at: null };

      return new Response(
        JSON.stringify({
          isBlocked: result.is_blocked,
          attemptsCount: result.attempts_count,
          nextAttemptAt: result.next_attempt_at,
          remainingAttempts: Math.max(0, 5 - result.attempts_count),
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } else if (action === "record") {
      // Record login attempt
      const { error } = await supabaseAdmin.rpc("record_login_attempt", {
        p_email: email.toLowerCase(),
        p_ip_address: ipAddress,
        p_success: success || false,
      });

      if (error) {
        console.error("Record attempt error:", error);
        return new Response(
          JSON.stringify({ error: "Failed to record attempt" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } else {
      return new Response(
        JSON.stringify({ error: "Invalid action. Use 'check' or 'record'" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
  } catch (error) {
    console.error("Edge function error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
