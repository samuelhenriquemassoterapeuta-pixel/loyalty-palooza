import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

/**
 * Google Ads REST API v18 — fetches campaign metrics via GAQL
 * Requires secrets: GOOGLE_ADS_DEVELOPER_TOKEN, GOOGLE_ADS_CLIENT_ID,
 * GOOGLE_ADS_CLIENT_SECRET, GOOGLE_ADS_REFRESH_TOKEN, GOOGLE_ADS_LOGIN_CUSTOMER_ID
 */

async function getAccessToken(): Promise<string> {
  const clientId = Deno.env.get("GOOGLE_ADS_CLIENT_ID");
  const clientSecret = Deno.env.get("GOOGLE_ADS_CLIENT_SECRET");
  const refreshToken = Deno.env.get("GOOGLE_ADS_REFRESH_TOKEN");

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error("Google Ads OAuth credentials not configured");
  }

  const resp = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
  });

  if (!resp.ok) {
    const text = await resp.text();
    console.error("OAuth token error:", text);
    throw new Error("Failed to obtain Google access token");
  }

  const data = await resp.json();
  return data.access_token;
}

async function queryGoogleAds(
  customerId: string,
  dateRange: string,
  accessToken: string
) {
  const developerToken = Deno.env.get("GOOGLE_ADS_DEVELOPER_TOKEN");
  const loginCustomerId = Deno.env.get("GOOGLE_ADS_LOGIN_CUSTOMER_ID");

  if (!developerToken) throw new Error("GOOGLE_ADS_DEVELOPER_TOKEN not configured");

  const gaql = `
    SELECT
      campaign.id,
      campaign.name,
      metrics.impressions,
      metrics.clicks,
      metrics.ctr,
      metrics.average_cpc,
      metrics.cost_micros,
      metrics.conversions,
      metrics.conversions_value,
      segments.date
    FROM campaign
    WHERE segments.date DURING ${dateRange}
    ORDER BY metrics.impressions DESC
  `;

  const headers: Record<string, string> = {
    Authorization: `Bearer ${accessToken}`,
    "developer-token": developerToken,
    "Content-Type": "application/json",
  };

  if (loginCustomerId) {
    headers["login-customer-id"] = loginCustomerId.replace(/-/g, "");
  }

  const cleanCustomerId = customerId.replace(/-/g, "");
  const url = `https://googleads.googleapis.com/v18/customers/${cleanCustomerId}/googleAds:searchStream`;

  const resp = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({ query: gaql }),
  });

  if (!resp.ok) {
    const text = await resp.text();
    console.error("Google Ads API error:", resp.status, text);
    throw new Error(`Google Ads API error: ${resp.status}`);
  }

  const data = await resp.json();

  // searchStream returns an array of result batches
  const results: any[] = [];
  for (const batch of data) {
    for (const row of batch.results || []) {
      const cost_micros = Number(row.metrics?.costMicros || 0);
      const conversions = Number(row.metrics?.conversions || 0);
      const conversions_value = Number(row.metrics?.conversionsValue || 0);

      results.push({
        campaign_id: row.campaign?.id || "",
        campaign_name: row.campaign?.name || "",
        date: row.segments?.date || "",
        impressions: Number(row.metrics?.impressions || 0),
        clicks: Number(row.metrics?.clicks || 0),
        ctr: Number(row.metrics?.ctr || 0),
        average_cpc: Number(row.metrics?.averageCpc || 0) / 1_000_000,
        cost_micros,
        conversions,
        conversion_value: conversions_value,
        roas: cost_micros > 0 ? (conversions_value / (cost_micros / 1_000_000)) : 0,
      });
    }
  }

  return results;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    // Auth check — admin only
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: claimsData, error: claimsError } = await supabase.auth.getClaims(
      authHeader.replace("Bearer ", "")
    );
    if (claimsError || !claimsData?.claims) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { customer_id, date_range = "LAST_7_DAYS", save_snapshot = false } = await req.json();

    if (!customer_id) {
      return new Response(JSON.stringify({ error: "customer_id is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Check if Google Ads credentials are configured
    const hasCredentials = Deno.env.get("GOOGLE_ADS_DEVELOPER_TOKEN") &&
      Deno.env.get("GOOGLE_ADS_CLIENT_ID") &&
      Deno.env.get("GOOGLE_ADS_CLIENT_SECRET") &&
      Deno.env.get("GOOGLE_ADS_REFRESH_TOKEN");

    if (!hasCredentials) {
      return new Response(
        JSON.stringify({
          error: "Google Ads credentials not configured",
          requires_setup: true,
          required_secrets: [
            "GOOGLE_ADS_DEVELOPER_TOKEN",
            "GOOGLE_ADS_CLIENT_ID",
            "GOOGLE_ADS_CLIENT_SECRET",
            "GOOGLE_ADS_REFRESH_TOKEN",
            "GOOGLE_ADS_LOGIN_CUSTOMER_ID",
          ],
        }),
        { status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const accessToken = await getAccessToken();
    const metrics = await queryGoogleAds(customer_id, date_range, accessToken);

    // Optionally save snapshot to database
    if (save_snapshot && metrics.length > 0) {
      const serviceClient = createClient(
        Deno.env.get("SUPABASE_URL")!,
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
      );

      const rows = metrics.map((m) => ({
        campaign_id: m.campaign_id,
        campaign_name: m.campaign_name,
        date_range,
        snapshot_date: new Date().toISOString().split("T")[0],
        impressions: m.impressions,
        clicks: m.clicks,
        ctr: m.ctr,
        average_cpc: m.average_cpc,
        cost_micros: m.cost_micros,
        conversions: m.conversions,
        conversion_value: m.conversion_value,
        roas: m.roas,
        customer_id,
      }));

      const { error: insertError } = await serviceClient
        .from("google_ads_metrics")
        .insert(rows);
      if (insertError) console.error("Snapshot save error:", insertError);
    }

    return new Response(
      JSON.stringify({ data: metrics, count: metrics.length }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("fetch-google-ads error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
