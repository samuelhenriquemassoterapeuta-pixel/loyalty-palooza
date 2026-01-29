-- Create table to track login attempts for rate limiting
CREATE TABLE public.login_attempts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  ip_address TEXT,
  attempted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  success BOOLEAN NOT NULL DEFAULT false
);

-- Create index for efficient queries
CREATE INDEX idx_login_attempts_email_time ON public.login_attempts (email, attempted_at DESC);
CREATE INDEX idx_login_attempts_ip_time ON public.login_attempts (ip_address, attempted_at DESC);

-- Enable RLS
ALTER TABLE public.login_attempts ENABLE ROW LEVEL SECURITY;

-- No direct access to login_attempts from client - only via edge function with service role
CREATE POLICY "No direct client access"
  ON public.login_attempts
  FOR ALL
  USING (false);

-- Create function to check rate limit (called by edge function)
CREATE OR REPLACE FUNCTION public.check_login_rate_limit(
  p_email TEXT,
  p_ip_address TEXT DEFAULT NULL,
  p_max_attempts INTEGER DEFAULT 5,
  p_window_minutes INTEGER DEFAULT 15
)
RETURNS TABLE (
  is_blocked BOOLEAN,
  attempts_count INTEGER,
  next_attempt_at TIMESTAMP WITH TIME ZONE
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_window_start TIMESTAMP WITH TIME ZONE;
  v_failed_count INTEGER;
  v_last_attempt TIMESTAMP WITH TIME ZONE;
BEGIN
  v_window_start := now() - (p_window_minutes || ' minutes')::INTERVAL;
  
  -- Count failed attempts in the window
  SELECT COUNT(*), MAX(attempted_at)
  INTO v_failed_count, v_last_attempt
  FROM public.login_attempts
  WHERE email = p_email
    AND attempted_at > v_window_start
    AND success = false;
  
  -- Return rate limit status
  is_blocked := v_failed_count >= p_max_attempts;
  attempts_count := v_failed_count;
  
  IF is_blocked THEN
    next_attempt_at := v_last_attempt + (p_window_minutes || ' minutes')::INTERVAL;
  ELSE
    next_attempt_at := NULL;
  END IF;
  
  RETURN NEXT;
END;
$$;

-- Create function to record login attempt
CREATE OR REPLACE FUNCTION public.record_login_attempt(
  p_email TEXT,
  p_ip_address TEXT DEFAULT NULL,
  p_success BOOLEAN DEFAULT false
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.login_attempts (email, ip_address, success)
  VALUES (p_email, p_ip_address, p_success);
  
  -- Clean up old attempts (older than 24 hours) to prevent table bloat
  DELETE FROM public.login_attempts
  WHERE attempted_at < now() - INTERVAL '24 hours';
END;
$$;

-- Grant execute to authenticated and anon users (functions are SECURITY DEFINER)
GRANT EXECUTE ON FUNCTION public.check_login_rate_limit TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.record_login_attempt TO anon, authenticated;