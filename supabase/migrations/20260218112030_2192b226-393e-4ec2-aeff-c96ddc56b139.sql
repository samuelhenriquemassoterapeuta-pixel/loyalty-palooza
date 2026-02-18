
-- Academy waitlist table for pre-launch signups
CREATE TABLE public.academy_waitlist (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.academy_waitlist ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public waitlist)
CREATE POLICY "Anyone can join waitlist"
ON public.academy_waitlist
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Only admins can view waitlist
CREATE POLICY "Admins can view waitlist"
ON public.academy_waitlist
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
