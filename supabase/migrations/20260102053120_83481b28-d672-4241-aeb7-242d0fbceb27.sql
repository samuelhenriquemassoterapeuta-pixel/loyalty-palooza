
-- Função para criar notificação de agendamento
CREATE OR REPLACE FUNCTION public.notify_new_agendamento()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.notificacoes (user_id, titulo, mensagem, tipo)
  VALUES (
    NEW.user_id,
    'Agendamento confirmado! ✅',
    'Sua sessão de ' || NEW.servico || ' foi agendada para ' || to_char(NEW.data_hora AT TIME ZONE 'America/Sao_Paulo', 'DD/MM/YYYY às HH24:MI') || '.',
    'agendamento'
  );
  RETURN NEW;
END;
$$;

-- Trigger para notificar novo agendamento
CREATE TRIGGER on_new_agendamento
  AFTER INSERT ON public.agendamentos
  FOR EACH ROW EXECUTE FUNCTION public.notify_new_agendamento();

-- Função para criar notificação de pedido
CREATE OR REPLACE FUNCTION public.notify_new_pedido()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.notificacoes (user_id, titulo, mensagem, tipo)
  VALUES (
    NEW.user_id,
    'Pedido recebido! 🛒',
    'Seu pedido #' || LEFT(NEW.id::text, 8) || ' no valor de R$ ' || REPLACE(TO_CHAR(NEW.total, 'FM999990D00'), '.', ',') || ' foi registrado. Retire na clínica.',
    'pedido'
  );
  RETURN NEW;
END;
$$;

-- Trigger para notificar novo pedido
CREATE TRIGGER on_new_pedido
  AFTER INSERT ON public.pedidos
  FOR EACH ROW EXECUTE FUNCTION public.notify_new_pedido();

-- Função para lembrete de agendamento (quando cancelado)
CREATE OR REPLACE FUNCTION public.notify_agendamento_status()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  IF NEW.status = 'cancelado' AND OLD.status != 'cancelado' THEN
    INSERT INTO public.notificacoes (user_id, titulo, mensagem, tipo)
    VALUES (
      NEW.user_id,
      'Agendamento cancelado',
      'Sua sessão de ' || NEW.servico || ' foi cancelada. Agende uma nova quando quiser!',
      'agendamento'
    );
  END IF;
  RETURN NEW;
END;
$$;

-- Trigger para status do agendamento
CREATE TRIGGER on_agendamento_status_change
  AFTER UPDATE ON public.agendamentos
  FOR EACH ROW EXECUTE FUNCTION public.notify_agendamento_status();

-- Habilitar realtime para notificações
ALTER PUBLICATION supabase_realtime ADD TABLE public.notificacoes;
