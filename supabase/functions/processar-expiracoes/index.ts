import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    // 1. Process expired cashback
    const { data: expired, error: expiredError } = await supabase.rpc(
      "process_expired_cashback"
    );

    if (expiredError) {
      console.error("Error processing expired cashback:", expiredError);
    } else {
      console.log("Expired cashback processed:", expired);
    }

    // 2. Notify users about cashback expiring soon (within 7 days)
    const { data: expiring, error: expiringError } = await supabase.rpc(
      "notify_expiring_cashback"
    );

    if (expiringError) {
      console.error("Error notifying expiring cashback:", expiringError);
    } else {
      console.log("Expiring cashback notifications sent:", expiring);
    }

    return new Response(
      JSON.stringify({
        success: true,
        expired: expired || [],
        expiring: expiring || [],
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error in processar-expiracoes:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
