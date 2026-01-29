-- Create audit_logs table for tracking sensitive operations
CREATE TABLE public.audit_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  table_name TEXT NOT NULL,
  operation TEXT NOT NULL CHECK (operation IN ('INSERT', 'UPDATE', 'DELETE')),
  record_id UUID NOT NULL,
  user_id UUID,
  old_data JSONB,
  new_data JSONB,
  ip_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create indexes for efficient queries
CREATE INDEX idx_audit_logs_table_name ON public.audit_logs (table_name);
CREATE INDEX idx_audit_logs_user_id ON public.audit_logs (user_id);
CREATE INDEX idx_audit_logs_created_at ON public.audit_logs (created_at DESC);
CREATE INDEX idx_audit_logs_record_id ON public.audit_logs (record_id);

-- Enable RLS
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Only admins can view audit logs
CREATE POLICY "Admins can view audit logs"
  ON public.audit_logs
  FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

-- No direct client access for insert/update/delete - only via triggers
CREATE POLICY "No direct client modifications"
  ON public.audit_logs
  FOR ALL
  USING (false)
  WITH CHECK (false);

-- Create audit logging function
CREATE OR REPLACE FUNCTION public.audit_log_changes()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id UUID;
  v_record_id UUID;
  v_old_data JSONB;
  v_new_data JSONB;
BEGIN
  -- Get current user id
  v_user_id := auth.uid();
  
  -- Determine the record id and data based on operation
  IF TG_OP = 'DELETE' THEN
    v_record_id := OLD.id;
    v_old_data := to_jsonb(OLD);
    v_new_data := NULL;
  ELSIF TG_OP = 'INSERT' THEN
    v_record_id := NEW.id;
    v_old_data := NULL;
    v_new_data := to_jsonb(NEW);
  ELSE -- UPDATE
    v_record_id := NEW.id;
    v_old_data := to_jsonb(OLD);
    v_new_data := to_jsonb(NEW);
  END IF;
  
  -- Insert audit log entry
  INSERT INTO public.audit_logs (table_name, operation, record_id, user_id, old_data, new_data)
  VALUES (TG_TABLE_NAME, TG_OP, v_record_id, v_user_id, v_old_data, v_new_data);
  
  -- Return appropriate record
  IF TG_OP = 'DELETE' THEN
    RETURN OLD;
  ELSE
    RETURN NEW;
  END IF;
END;
$$;

-- Add triggers to transacoes table (all operations)
CREATE TRIGGER audit_transacoes_changes
  AFTER INSERT OR UPDATE OR DELETE ON public.transacoes
  FOR EACH ROW
  EXECUTE FUNCTION public.audit_log_changes();

-- Add triggers to indicacoes table (all operations)
CREATE TRIGGER audit_indicacoes_changes
  AFTER INSERT OR UPDATE OR DELETE ON public.indicacoes
  FOR EACH ROW
  EXECUTE FUNCTION public.audit_log_changes();

-- Add triggers to pedidos table (all operations)
CREATE TRIGGER audit_pedidos_changes
  AFTER INSERT OR UPDATE OR DELETE ON public.pedidos
  FOR EACH ROW
  EXECUTE FUNCTION public.audit_log_changes();

-- Add trigger to pacotes_usuario for package purchases
CREATE TRIGGER audit_pacotes_usuario_changes
  AFTER INSERT OR UPDATE OR DELETE ON public.pacotes_usuario
  FOR EACH ROW
  EXECUTE FUNCTION public.audit_log_changes();