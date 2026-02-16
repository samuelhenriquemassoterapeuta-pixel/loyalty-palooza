
-- Table to store Google Ads campaign metrics snapshots
CREATE TABLE public.google_ads_metrics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  campaign_id TEXT NOT NULL,
  campaign_name TEXT NOT NULL,
  date_range TEXT NOT NULL DEFAULT 'LAST_7_DAYS',
  snapshot_date DATE NOT NULL DEFAULT CURRENT_DATE,
  impressions INTEGER NOT NULL DEFAULT 0,
  clicks INTEGER NOT NULL DEFAULT 0,
  ctr NUMERIC(8,6) NOT NULL DEFAULT 0,
  average_cpc NUMERIC(12,2) NOT NULL DEFAULT 0,
  cost_micros BIGINT NOT NULL DEFAULT 0,
  conversions NUMERIC(12,2) NOT NULL DEFAULT 0,
  conversion_value NUMERIC(14,2) NOT NULL DEFAULT 0,
  roas NUMERIC(10,4) NOT NULL DEFAULT 0,
  customer_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Index for fast lookups
CREATE INDEX idx_google_ads_metrics_customer_date ON public.google_ads_metrics (customer_id, snapshot_date DESC);
CREATE INDEX idx_google_ads_metrics_campaign ON public.google_ads_metrics (campaign_id, snapshot_date DESC);

-- Enable RLS
ALTER TABLE public.google_ads_metrics ENABLE ROW LEVEL SECURITY;

-- Only admins can read
CREATE POLICY "Admins can read google ads metrics"
ON public.google_ads_metrics
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Only admins can insert (via edge function with service role, but also allow admin)
CREATE POLICY "Admins can insert google ads metrics"
ON public.google_ads_metrics
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- Only admins can delete old data
CREATE POLICY "Admins can delete google ads metrics"
ON public.google_ads_metrics
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));
