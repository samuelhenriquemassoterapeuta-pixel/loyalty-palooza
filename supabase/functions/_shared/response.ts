import { corsHeaders } from "./cors.ts";

/** Returns a JSON success response with CORS headers. */
export function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

/** Returns a JSON error response with CORS headers. */
export function errorResponse(message: string, status = 400): Response {
  return new Response(
    JSON.stringify({ success: false, error: message }),
    { status, headers: { ...corsHeaders, "Content-Type": "application/json" } },
  );
}

/** Returns a streaming response (for AI chat) with CORS headers. */
export function streamResponse(body: ReadableStream | null): Response {
  return new Response(body, {
    headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
  });
}
