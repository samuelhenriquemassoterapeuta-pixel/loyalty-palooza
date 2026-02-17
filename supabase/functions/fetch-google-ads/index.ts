import { handleCors } from "../_shared/cors.ts";
import { requireAuth } from "../_shared/auth.ts";
import { createUserClient, createServiceClient } from "../_shared/supabase-client.ts";
import { jsonResponse, errorResponse } from "../_shared/response.ts";

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

async function queryGoogleAds(customerId: string, dateRange: string, accessToken: string) {
  const developerToken = Deno.env.get("GOOGLE_ADS_DEVELOPER_TOKEN");
  const loginCustomerId = Deno.env.get("GOOGLE_ADS_LOGIN_CUSTOMER_ID");

  if (!developerToken) throw new Error("GOOGLE_ADS_DEVELOPER_TOKEN not configured");

  const gaql = `
    SELECT campaign.id, campaign.name, metrics.impressions, metrics.clicks, metrics.ctr,
      metrics.average_cpc, metrics.cost_micros, metrics.conversions, metrics.conversions_value, segments.date
    FROM campaign WHERE segments.date DURING ${dateRange} ORDER BY metrics.impressions DESC`;

  const headers: Record<string, string> = {
    Authorization: `Bearer ${accessToken}`,
    "developer-token": developerToken,
    "Content-Type": "application/json",
  };

  if (loginCustomerId) headers["login-customer-id"] = loginCustomerId.replace(/-/g, "");

  const cleanCustomerId = customerId.replace(/-/g, "");
  const url = `https://googleads.googleapis.com/v18/customers/${cleanCustomerId}/googleAds:searchStream`;

  const resp = await fetch(url, { method: "POST", headers, body: JSON.stringify({ query: gaql }) });

  if (!resp.ok) {
    const text = await resp.text();
    console.error("Google Ads API error:", resp.status, text);
    throw new Error(`Google Ads API error: ${resp.status}`);
  }

  const data = await resp.json();
  const results: any[] = [];
  for (const batch of data) {
    for (const row of batch.results || []) {
      const cost_micros = Number(row.metrics?.costMicros || 0);
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
        conversions: Number(row.metrics?.conversions || 0),
        conversion_value: conversions_value,
        roas: cost_micros > 0 ? (conversions_value / (cost_micros / 1_000_000)) : 0,
      });
    }
  }
  return results;
}

Deno.serve(async (req) => {
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    await requireAuth(req);

    const { customer_id, date_range = "LAST_7_DAYS", save_snapshot = false } = await req.json();

    if (!customer_id) return errorResponse("customer_id is required", 400);

    const hasCredentials = Deno.env.get("GOOGLE_ADS_DEVELOPER_TOKEN") &&
      Deno.env.get("GOOGLE_ADS_CLIENT_ID") &&
      Deno.env.get("GOOGLE_ADS_CLIENT_SECRET") &&
      Deno.env.get("GOOGLE_ADS_REFRESH_TOKEN");

    if (!hasCredentials) {
      return jsonResponse({
        error: "Google Ads credentials not configured",
        requires_setup: true,
        required_secrets: ["GOOGLE_ADS_DEVELOPER_TOKEN", "GOOGLE_ADS_CLIENT_ID", "GOOGLE_ADS_CLIENT_SECRET", "GOOGLE_ADS_REFRESH_TOKEN", "GOOGLE_ADS_LOGIN_CUSTOMER_ID"],
      }, 503);
    }

    const accessToken = await getAccessToken();
    const metrics = await queryGoogleAds(customer_id, date_range, accessToken);

    if (save_snapshot && metrics.length > 0) {
      const serviceClient = createServiceClient();
      const rows = metrics.map((m) => ({
        campaign_id: m.campaign_id, campaign_name: m.campaign_name, date_range,
        snapshot_date: new Date().toISOString().split("T")[0],
        impressions: m.impressions, clicks: m.clicks, ctr: m.ctr,
        average_cpc: m.average_cpc, cost_micros: m.cost_micros,
        conversions: m.conversions, conversion_value: m.conversion_value,
        roas: m.roas, customer_id,
      }));
      const { error: insertError } = await serviceClient.from("google_ads_metrics").insert(rows);
      if (insertError) console.error("Snapshot save error:", insertError);
    }

    return jsonResponse({ data: metrics, count: metrics.length });
  } catch (e) {
    console.error("fetch-google-ads error:", e);
    if (e instanceof Response) return e;
    return errorResponse(e instanceof Error ? e.message : "Unknown error", 500);
  }
});
