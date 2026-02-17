import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, UserCheck, UserX, AlertTriangle, Star, UserPlus, Search, Phone, TrendingUp } from "lucide-react";

const SEGMENTO_CONFIG: Record<string, { label: string; icon: typeof Users; color: string; desc: string }> = {
  fiel: { label: "Fiel", icon: Star, color: "bg-amber-500/15 text-amber-600 border-amber-500/30", desc: "10+ sessões" },
  recorrente: { label: "Recorrente", icon: UserCheck, color: "bg-highlight/15 text-highlight border-highlight/30", desc: "3-9 sessões" },
  novo: { label: "Novo", icon: UserPlus, color: "bg-primary/15 text-primary border-primary/30", desc: "1-2 sessões" },
  em_risco: { label: "Em risco", icon: AlertTriangle, color: "bg-warning/15 text-warning border-warning/30", desc: "30-90 dias sem visita" },
  inativo: { label: "Inativo", icon: UserX, color: "bg-destructive/15 text-destructive border-destructive/30", desc: "90+ dias sem visita" },
  nunca_visitou: { label: "Nunca visitou", icon: Users, color: "bg-muted text-muted-foreground border-border", desc: "Sem sessões" },
};

interface ClienteSegmentado {
  user_id: string;
  nome: string;
  email: string;
  telefone: string;
  tier_nome: string;
  total_sessoes: number;
  total_gasto: number;
  ultima_visita: string | null;
  dias_sem_visita: number | null;
  ticket_medio: number;
  total_pedidos: number;
  data_cadastro: string;
  segmento: string;
}

const SegmentacaoClientesTab = () => {
  const [filtroSegmento, setFiltroSegmento] = useState<string | null>(null);
  const [busca, setBusca] = useState("");

  const { data: clientes = [], isLoading } = useQuery({
    queryKey: ["segmentacao-clientes"],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("get_segmentacao_clientes");
      if (error) throw error;
      return data as ClienteSegmentado[];
    },
  });

  const contagens = clientes.reduce<Record<string, number>>((acc, c) => {
    acc[c.segmento] = (acc[c.segmento] || 0) + 1;
    return acc;
  }, {});

  const filtrados = clientes.filter((c) => {
    if (filtroSegmento && c.segmento !== filtroSegmento) return false;
    if (busca) {
      const q = busca.toLowerCase();
      return (c.nome || "").toLowerCase().includes(q) || (c.telefone || "").includes(q);
    }
    return true;
  });

  if (isLoading) return <p className="text-center text-muted-foreground py-8">Carregando segmentação...</p>;

  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {Object.entries(SEGMENTO_CONFIG).map(([key, cfg]) => {
          const Icon = cfg.icon;
          const count = contagens[key] || 0;
          const isActive = filtroSegmento === key;
          return (
            <button
              key={key}
              onClick={() => setFiltroSegmento(isActive ? null : key)}
              className={`p-3 rounded-2xl border text-left transition-all ${
                isActive ? "ring-2 ring-primary shadow-md" : "hover:shadow-sm"
              } ${cfg.color}`}
            >
              <Icon size={16} className="mb-1" />
              <p className="text-lg font-bold">{count}</p>
              <p className="text-[10px] font-medium">{cfg.label}</p>
              <p className="text-[9px] opacity-70">{cfg.desc}</p>
            </button>
          );
        })}
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar por nome ou telefone..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Total & clear filter */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {filtrados.length} cliente{filtrados.length !== 1 ? "s" : ""}
          {filtroSegmento && ` · ${SEGMENTO_CONFIG[filtroSegmento]?.label}`}
        </p>
        {filtroSegmento && (
          <Button size="sm" variant="ghost" onClick={() => setFiltroSegmento(null)}>
            Limpar filtro
          </Button>
        )}
      </div>

      {/* Client list */}
      <div className="space-y-2">
        {filtrados.slice(0, 50).map((c) => {
          const seg = SEGMENTO_CONFIG[c.segmento] || SEGMENTO_CONFIG.nunca_visitou;
          return (
            <div key={c.user_id} className="p-4 rounded-2xl glass-card-strong space-y-2">
              <div className="flex items-center justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground text-sm truncate">{c.nome || "Sem nome"}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
                    {c.telefone && (
                      <span className="flex items-center gap-1">
                        <Phone size={10} /> {c.telefone}
                      </span>
                    )}
                    <span>Cadastro: {new Date(c.data_cadastro).toLocaleDateString("pt-BR")}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Badge variant="outline" className={`text-[10px] ${seg.color}`}>
                    {seg.label}
                  </Badge>
                  <Badge variant="outline" className="text-[10px]">{c.tier_nome}</Badge>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="p-1.5 rounded-lg bg-muted/50">
                  <p className="text-xs font-bold text-foreground">{c.total_sessoes}</p>
                  <p className="text-[9px] text-muted-foreground">Sessões</p>
                </div>
                <div className="p-1.5 rounded-lg bg-muted/50">
                  <p className="text-xs font-bold text-foreground">
                    R$ {Number(c.total_gasto).toFixed(0)}
                  </p>
                  <p className="text-[9px] text-muted-foreground">Gasto</p>
                </div>
                <div className="p-1.5 rounded-lg bg-muted/50">
                  <p className="text-xs font-bold text-foreground">
                    R$ {Number(c.ticket_medio).toFixed(0)}
                  </p>
                  <p className="text-[9px] text-muted-foreground">Ticket</p>
                </div>
                <div className="p-1.5 rounded-lg bg-muted/50">
                  <p className="text-xs font-bold text-foreground">
                    {c.dias_sem_visita != null ? `${c.dias_sem_visita}d` : "—"}
                  </p>
                  <p className="text-[9px] text-muted-foreground">Sem visita</p>
                </div>
              </div>
            </div>
          );
        })}
        {filtrados.length > 50 && (
          <p className="text-xs text-muted-foreground text-center py-2">
            Mostrando 50 de {filtrados.length} clientes
          </p>
        )}
      </div>
    </div>
  );
};

export default SegmentacaoClientesTab;
