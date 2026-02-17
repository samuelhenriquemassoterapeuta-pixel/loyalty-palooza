import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Send, Bell, Users } from "lucide-react";

export const NotificacoesAdminTab = () => {
  const [titulo, setTitulo] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [tipo, setTipo] = useState("geral");
  const [destinatario, setDestinatario] = useState<"todos" | "usuario">("todos");
  const [userId, setUserId] = useState("");
  const [sending, setSending] = useState(false);

  const { data: profiles = [] } = useQuery({
    queryKey: ["admin-profiles-notif"],
    queryFn: async () => {
      const { data, error } = await supabase.from("profiles").select("id, nome").order("nome");
      if (error) throw error;
      return data;
    },
  });

  const { data: recentNotifs = [], refetch } = useQuery({
    queryKey: ["admin-recent-notifs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("notificacoes")
        .select("id, titulo, mensagem, tipo, created_at, user_id")
        .order("created_at", { ascending: false })
        .limit(20);
      if (error) throw error;
      return data;
    },
  });

  const enviar = async () => {
    if (!titulo || !mensagem) return toast.error("Preencha título e mensagem");
    setSending(true);
    try {
      if (destinatario === "usuario") {
        if (!userId) { toast.error("Selecione um usuário"); setSending(false); return; }
        const { error } = await supabase.from("notificacoes").insert({ user_id: userId, titulo, mensagem, tipo });
        if (error) throw error;
        toast.success("Notificação enviada!");
      } else {
        // Enviar para todos
        const inserts = profiles.map((p: any) => ({ user_id: p.id, titulo, mensagem, tipo }));
        if (inserts.length === 0) { toast.error("Nenhum usuário encontrado"); setSending(false); return; }
        const { error } = await supabase.from("notificacoes").insert(inserts);
        if (error) throw error;
        toast.success(`Notificação enviada para ${inserts.length} usuário(s)!`);
      }
      setTitulo("");
      setMensagem("");
      refetch();
    } catch (e: any) { toast.error(e.message); }
    setSending(false);
  };

  const tipoLabels: Record<string, string> = { geral: "Geral", cashback: "Cashback", agendamento: "Agendamento", pedido: "Pedido", promocao: "Promoção" };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground">Enviar Notificação</h3>
        <p className="text-sm text-muted-foreground">Envie notificações personalizadas para usuários</p>
      </div>

      <Card className="p-4 space-y-3">
        <div><Label>Título</Label><Input value={titulo} onChange={e => setTitulo(e.target.value)} placeholder="Título da notificação" /></div>
        <div><Label>Mensagem</Label><Textarea value={mensagem} onChange={e => setMensagem(e.target.value)} placeholder="Conteúdo da notificação..." rows={3} /></div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>Tipo</Label>
            <Select value={tipo} onValueChange={setTipo}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="geral">Geral</SelectItem>
                <SelectItem value="cashback">Cashback</SelectItem>
                <SelectItem value="agendamento">Agendamento</SelectItem>
                <SelectItem value="pedido">Pedido</SelectItem>
                <SelectItem value="promocao">Promoção</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Destinatário</Label>
            <Select value={destinatario} onValueChange={(v: any) => setDestinatario(v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os usuários</SelectItem>
                <SelectItem value="usuario">Usuário específico</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        {destinatario === "usuario" && (
          <div>
            <Label>Usuário</Label>
            <Select value={userId} onValueChange={setUserId}>
              <SelectTrigger><SelectValue placeholder="Selecionar..." /></SelectTrigger>
              <SelectContent>
                {profiles.map((p: any) => (
                  <SelectItem key={p.id} value={p.id}>{p.nome || "Sem nome"}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        <Button onClick={enviar} disabled={sending || !titulo || !mensagem} className="w-full gap-2">
          <Send className="w-4 h-4" />{sending ? "Enviando..." : `Enviar ${destinatario === "todos" ? `para ${profiles.length} usuários` : ""}`}
        </Button>
      </Card>

      <div>
        <h4 className="font-semibold text-sm mb-3 flex items-center gap-2"><Bell className="w-4 h-4" />Últimas notificações</h4>
        <div className="space-y-2">
          {recentNotifs.map((n: any) => (
            <div key={n.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{n.titulo}</p>
                <p className="text-xs text-muted-foreground line-clamp-2">{n.mensagem}</p>
              </div>
              <Badge variant="outline" className="text-[9px] shrink-0">{tipoLabels[n.tipo] || n.tipo}</Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
