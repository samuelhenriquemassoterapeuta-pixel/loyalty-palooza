import { ResinkraAILayout } from "@/components/resinkra-ai/ResinkraAILayout";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PenTool, FileText, TrendingUp, Sparkles, Plus, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useResinkraOnboarding } from "@/hooks/useResinkraOnboarding";
import { Navigate } from "react-router-dom";

const StatCard = ({ icon: Icon, label, value, color }: { icon: any; label: string; value: string | number; color: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="rounded-2xl border border-border bg-card backdrop-blur-sm p-5 hover:border-primary/30 transition-all shadow-card"
  >
    <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center mb-3`}>
      <Icon className="w-5 h-5 text-primary-foreground" />
    </div>
    <p className="text-2xl font-bold text-foreground">{value}</p>
    <p className="text-sm text-muted-foreground">{label}</p>
  </motion.div>
);

const ResinkraAIDashboard = () => {
  const { user } = useAuth();
  const { needsOnboarding, isLoading: onboardingLoading } = useResinkraOnboarding();

  const { data: stats } = useQuery({
    queryKey: ["resinkra-stats", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const [scriptsRes, weekRes] = await Promise.all([
        supabase.from("scripts").select("id, score_total", { count: "exact" }).eq("user_id", user!.id),
        supabase.from("scripts").select("id", { count: "exact" }).eq("user_id", user!.id)
          .gte("created_at", new Date(Date.now() - 7 * 86400000).toISOString()),
      ]);
      const total = scriptsRes.count || 0;
      const week = weekRes.count || 0;
      const scores = (scriptsRes.data || []).map(s => s.score_total).filter(Boolean);
      const avgScore = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
      return { total, week, avgScore };
    },
  });

  const { data: trends = [] } = useQuery({
    queryKey: ["resinkra-trends"],
    queryFn: async () => {
      const { data } = await supabase.from("trends").select("*").eq("is_active", true).order("relevance_score", { ascending: false }).limit(5);
      return data || [];
    },
  });

  if (onboardingLoading) return null;
  if (needsOnboarding) return <Navigate to="/resinkra-ai/onboarding" replace />;

  return (
    <ResinkraAILayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground font-serif">Dashboard</h1>
            <p className="text-muted-foreground text-sm mt-1">Visão geral dos seus roteiros</p>
          </div>
          <Link
            to="/resinkra-ai/create"
            className="btn-premium inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm"
          >
            <Plus className="w-4 h-4" /> Novo Roteiro
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard icon={FileText} label="Total de roteiros" value={stats?.total || 0} color="gradient-primary" />
          <StatCard icon={PenTool} label="Esta semana" value={stats?.week || 0} color="gradient-accent" />
          <StatCard icon={TrendingUp} label="Score médio" value={stats?.avgScore || 0} color="bg-highlight" />
        </div>

        {/* Trends */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-accent" /> Trends da Semana
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {trends.map((trend: any, i: number) => (
              <motion.div
                key={trend.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-xl border border-border bg-card p-4 hover:border-primary/30 transition-all cursor-pointer group shadow-card"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-foreground text-sm">{trend.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{trend.description}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <div className="flex gap-2 mt-3">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                    {trend.trend_type}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent/10 text-accent">
                    Score: {trend.relevance_score}/10
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Criar Roteiro", icon: PenTool, path: "/resinkra-ai/create", color: "gradient-primary" },
            { label: "Gerar Ganchos", icon: Sparkles, path: "/resinkra-ai/hooks", color: "gradient-accent" },
            { label: "Análise Viral", icon: TrendingUp, path: "/resinkra-ai/viral-analysis", color: "bg-highlight" },
            { label: "Banco de Ideias", icon: FileText, path: "/resinkra-ai/ideas", color: "bg-accent" },
          ].map((action) => (
            <Link
              key={action.path}
              to={action.path}
              className={`rounded-xl ${action.color} p-4 hover:scale-[1.02] transition-transform shadow-card`}
            >
              <action.icon className="w-6 h-6 text-primary-foreground mb-2" />
              <p className="text-sm font-semibold text-primary-foreground">{action.label}</p>
            </Link>
          ))}
        </div>
      </div>
    </ResinkraAILayout>
  );
};

export default ResinkraAIDashboard;
