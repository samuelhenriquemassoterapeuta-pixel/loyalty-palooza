import { AppLayout } from "@/components/AppLayout";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAdmin } from "@/hooks/useAdmin";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, Users, Calendar, TrendingUp, Loader2, BarChart3, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const DashboardRH = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAdmin();

  const { data: empresas = [], isLoading } = useQuery({
    queryKey: ["empresas-corporativas"],
    enabled: isAdmin,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("empresas_corporativas")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as any[];
    },
  });

  const { data: stats } = useQuery({
    queryKey: ["empresa-stats", empresas?.[0]?.id],
    enabled: !!empresas?.[0]?.id,
    queryFn: async () => {
      const { data, error } = await supabase.rpc("get_empresa_stats", {
        p_empresa_id: empresas[0].id,
      });
      if (error) throw error;
      return data as any;
    },
  });

  if (!isAdmin) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center py-20">
          <p className="text-muted-foreground">Acesso restrito a administradores.</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6 pb-24">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-xl font-bold text-foreground">Dashboard RH Corporativo</h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-2"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary">
            <Building2 size={20} />
            <span className="font-semibold text-sm">Programa QVT</span>
          </div>
          <h2 className="text-2xl font-bold text-foreground font-[family-name:var(--font-serif)]">
            Painel Corporativo
          </h2>
          <p className="text-muted-foreground text-sm">
            Acompanhe o engajamento e ROI do programa de bem-estar.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="animate-spin text-primary" size={32} />
          </div>
        ) : empresas.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center space-y-3">
              <Building2 className="mx-auto text-muted-foreground" size={48} />
              <p className="text-muted-foreground">
                Nenhuma empresa cadastrada. Cadastre pelo painel admin.
              </p>
            </CardContent>
          </Card>
        ) : (
          <>
            {stats && (
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Users, label: "Colaboradores", value: stats.colaboradores_ativos, color: "text-primary" },
                  { icon: Calendar, label: "Sessões", value: stats.total_sessoes, color: "text-accent" },
                  { icon: TrendingUp, label: "Média/Colaborador", value: stats.media_sessoes_por_colaborador, color: "text-primary" },
                  {
                    icon: BarChart3,
                    label: "Investimento",
                    value: `R$ ${Number(stats.total_gasto || 0).toFixed(0)}`,
                    color: "text-accent",
                  },
                ].map((kpi, i) => (
                  <motion.div
                    key={kpi.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Card>
                      <CardContent className="p-4 text-center">
                        <kpi.icon className={`mx-auto mb-2 ${kpi.color}`} size={24} />
                        <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
                        <p className="text-xs text-muted-foreground">{kpi.label}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}

            <div className="space-y-3">
              <h2 className="font-semibold text-foreground">Empresas parceiras</h2>
              {empresas.map((empresa: any) => (
                <Card key={empresa.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground">{empresa.nome}</h3>
                        <p className="text-xs text-muted-foreground">
                          {empresa.contato_nome} · Até {empresa.max_colaboradores} colaboradores
                        </p>
                      </div>
                      <Badge variant={empresa.ativa ? "default" : "secondary"}>
                        {empresa.ativa ? "Ativa" : "Inativa"}
                      </Badge>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="secondary" className="text-xs">
                        Plano {empresa.plano_qvt}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        R$ {Number(empresa.valor_mensal).toFixed(0)}/mês
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </AppLayout>
  );
};

export default DashboardRH;
