
-- Fix security definer view
DROP VIEW IF EXISTS public.chat_analytics;
CREATE VIEW public.chat_analytics WITH (security_invoker = true) AS
SELECT 
  DATE(created_at) as date,
  agent,
  platform,
  COUNT(*) as total_messages,
  COUNT(DISTINCT user_id) as unique_users,
  AVG(response_time_ms) as avg_response_time_ms,
  SUM(tokens_used) as total_tokens
FROM public.chat_interactions
GROUP BY DATE(created_at), agent, platform
ORDER BY date DESC, agent;
