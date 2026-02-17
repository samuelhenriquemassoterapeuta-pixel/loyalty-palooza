import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Gift, Ban, Search, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const ValesPresenteTab = () => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");

  const { data: vales = [], isLoading } = useQuery({
    queryKey: ["admin-vales"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("vale_presentes")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const cancelarVale = async (id: string) => {
    if (!confirm("Cancelar este vale presente?")) return;
    const { error } = await supabase
      .from("vale_presentes")
      .update({ status: "cancelado" } as any)
      .eq("id", id);
    if (error) {
      toast.error("Erro ao cancelar vale");
      return;
    }
    toast.success("Vale cancelado!");
    queryClient.invalidateQueries({ queryKey: ["admin-vales"] });
  };

  const filtered = vales.filter(
    (v: any) =>
      v.destinatario_nome?.toLowerCase().includes(search.toLowerCase()) ||
      v.codigo?.toLowerCase().includes(search.toLowerCase())
  );

  const totalAtivos = vales.filter((v: any) => v.status === "ativo").length;
  const totalUsados = vales.filter((v: any) => v.status === "usado").length;
  const totalExpirados = vales.filter((v: any) => v.status === "expirado").length;
  const valorTotal = vales.reduce((sum: number, v: any) => sum + Number(v.valor || 0), 0);
  const valorUsado = vales
    .filter((v: any) => v.status === "usado")
    .reduce((sum: number, v: any) => sum + Number(v.valor || 0), 0);

  const statusColor = (status: string) => {
    switch (status) {
      case "ativo": return "default";
      case "usado": return "secondary";
      case "expirado": return "outline";
      case "cancelado": return "destructive";
      default: return "outline";
    }
  };

  const statusLabel = (status: string) => {
    switch (status) {
      case "ativo": return "✨ Ativo";
      case "usado": return "✅ Usado";
      case "expirado": return "⏰ Expirado";
      case "cancelado": return "❌ Cancelado";
      default: return status;
    }
  };

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="shadow-card">
          <CardContent className="p-3 text-center">
            <p className="text-2xl font-bold text-primary">{totalAtivos}</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Ativos</p>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-3 text-center">
            <p className="text-2xl font-bold text-foreground">{totalUsados}</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Usados</p>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-3 text-center">
            <p className="text-2xl font-bold text-muted-foreground">{totalExpirados}</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Expirados</p>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-3 text-center">
            <div className="flex items-center justify-center gap-1">
              <TrendingUp size={14} className="text-primary" />
              <p className="text-lg font-bold text-primary">
                R$ {valorUsado.toFixed(0)}
              </p>
            </div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
              de R$ {valorTotal.toFixed(0)} resgatados
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar por nome ou código..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* List */}
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 rounded-xl bg-muted animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12">
          <Gift className="w-10 h-10 text-muted-foreground/40 mx-auto mb-2" />
          <p className="text-muted-foreground text-sm">Nenhum vale presente encontrado</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((vale: any) => (
            <Card key={vale.id} className="shadow-card">
              <CardContent className="p-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-sm text-foreground truncate">
                        {vale.destinatario_nome}
                      </p>
                      <Badge variant={statusColor(vale.status) as any} className="text-[10px] shrink-0">
                        {statusLabel(vale.status)}
                      </Badge>
                      {vale.tipo === "experiencia" && (
                        <Badge variant="outline" className="text-[10px] shrink-0">
                          🎯 Experiência
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="font-mono font-semibold">{vale.codigo}</span>
                      <span>R$ {Number(vale.valor).toFixed(2).replace('.', ',')}</span>
                      <span>{format(new Date(vale.created_at), "dd/MM/yy", { locale: ptBR })}</span>
                    </div>
                    {vale.experiencia_nome && (
                      <p className="text-xs text-primary mt-1">{vale.experiencia_nome}</p>
                    )}
                    {vale.data_entrega_agendada && (
                      <p className="text-[10px] text-muted-foreground mt-0.5">
                        📅 Entrega agendada: {format(new Date(vale.data_entrega_agendada + "T12:00:00"), "dd/MM/yyyy", { locale: ptBR })}
                      </p>
                    )}
                  </div>
                  {vale.status === "ativo" && (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 px-2 text-destructive hover:text-destructive"
                      onClick={() => cancelarVale(vale.id)}
                    >
                      <Ban size={14} />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ValesPresenteTab;
