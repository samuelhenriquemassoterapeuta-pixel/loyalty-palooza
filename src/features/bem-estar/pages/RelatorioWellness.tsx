import { useState, useRef } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Download, FileText, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { format, subDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner";
import jsPDF from "jspdf";

const moodEmojis: Record<number, string> = { 1: "Péssimo", 2: "Ruim", 3: "Ok", 4: "Bom", 5: "Ótimo" };

const RelatorioWellness = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [generating, setGenerating] = useState(false);

  const { data: profile } = useQuery({
    queryKey: ["profile-report", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await supabase.from("profiles").select("nome").eq("id", user!.id).maybeSingle();
      return data;
    },
  });

  const { data: checkins, isLoading } = useQuery({
    queryKey: ["wellness-report-data", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const since = format(subDays(new Date(), 30), "yyyy-MM-dd");
      const { data } = await supabase
        .from("wellness_checkins")
        .select("*")
        .eq("user_id", user!.id)
        .gte("data", since)
        .order("data", { ascending: true });
      return data || [];
    },
  });

  const { data: streakData } = useQuery({
    queryKey: ["wellness-streak-report", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await supabase.from("wellness_streaks").select("*").eq("user_id", user!.id).maybeSingle();
      return data;
    },
  });

  const { data: metas } = useQuery({
    queryKey: ["wellness-metas-report", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await supabase.from("wellness_metas").select("*").eq("user_id", user!.id).maybeSingle();
      return data;
    },
  });

  const stats = checkins && checkins.length > 0 ? (() => {
    const avg = (arr: (number | null)[]) => {
      const valid = arr.filter((v): v is number => v != null);
      return valid.length ? Math.round((valid.reduce((a, b) => a + b, 0) / valid.length) * 10) / 10 : null;
    };
    return {
      dias: checkins.length,
      humor: avg(checkins.map(c => c.humor)),
      energia: avg(checkins.map(c => c.energia)),
      sono: avg(checkins.map(c => c.sono_horas)),
      agua: avg(checkins.map(c => c.agua_litros)),
      estresse: avg(checkins.map(c => c.estresse)),
      dor: avg(checkins.map(c => c.dor)),
      exercicio: avg(checkins.map(c => c.exercicio_min)),
    };
  })() : null;

  const generatePDF = async () => {
    if (!stats || !checkins) return;
    setGenerating(true);

    try {
      const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const w = doc.internal.pageSize.getWidth();
      let y = 20;

      // Header
      doc.setFillColor(34, 120, 90);
      doc.rect(0, 0, w, 35, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(20);
      doc.setFont("helvetica", "bold");
      doc.text("Relatório de Bem-Estar", 15, 16);
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(`${profile?.nome || "Usuário"} — ${format(new Date(), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}`, 15, 25);
      doc.text(`Últimos 30 dias (${stats.dias} check-ins)`, 15, 31);

      y = 45;
      doc.setTextColor(40, 40, 40);

      // Streak
      if (streakData) {
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text("🔥 Streak", 15, y);
        y += 7;
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.text(`Streak atual: ${streakData.streak_atual} dias | Recorde: ${streakData.melhor_streak} dias | Total check-ins: ${streakData.total_checkins}`, 15, y);
        y += 12;
      }

      // Averages
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("📊 Médias do Período", 15, y);
      y += 8;

      const metrics = [
        { label: "Humor", value: stats.humor != null ? `${stats.humor}/5 (${moodEmojis[Math.round(stats.humor)] || ""})` : "—" },
        { label: "Energia", value: stats.energia != null ? `${stats.energia}/5` : "—" },
        { label: "Sono", value: stats.sono != null ? `${stats.sono}h` : "—" },
        { label: "Água", value: stats.agua != null ? `${stats.agua}L` : "—" },
        { label: "Estresse", value: stats.estresse != null ? `${stats.estresse}/5` : "—" },
        { label: "Dor", value: stats.dor != null ? `${stats.dor}/10` : "—" },
        { label: "Exercício", value: stats.exercicio != null ? `${stats.exercicio}min` : "—" },
      ];

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");

      // Table header
      doc.setFillColor(240, 240, 240);
      doc.rect(15, y - 4, w - 30, 8, "F");
      doc.setFont("helvetica", "bold");
      doc.text("Métrica", 18, y);
      doc.text("Média", 80, y);
      y += 8;

      doc.setFont("helvetica", "normal");
      metrics.forEach(m => {
        doc.text(m.label, 18, y);
        doc.text(m.value, 80, y);
        y += 6;
      });

      y += 6;

      // Goals
      if (metas) {
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text("🎯 Metas Definidas", 15, y);
        y += 8;
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");

        const goals = [
          metas.meta_agua_litros && `Água: ≥${metas.meta_agua_litros}L`,
          metas.meta_sono_horas && `Sono: ≥${metas.meta_sono_horas}h`,
          metas.meta_energia_min && `Energia: ≥${metas.meta_energia_min}/5`,
          metas.meta_humor_min && `Humor: ≥${metas.meta_humor_min}/5`,
          metas.meta_estresse_max && `Estresse: ≤${metas.meta_estresse_max}/5`,
        ].filter(Boolean);

        goals.forEach(g => {
          doc.text(`• ${g}`, 18, y);
          y += 6;
        });
        y += 6;
      }

      // Daily log table
      if (checkins.length > 0) {
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text("📋 Registro Diário", 15, y);
        y += 8;

        doc.setFontSize(8);
        doc.setFillColor(240, 240, 240);
        doc.rect(15, y - 4, w - 30, 7, "F");
        doc.setFont("helvetica", "bold");
        const cols = [18, 40, 55, 68, 80, 93, 108, 125];
        const headers = ["Data", "Humor", "Energ.", "Sono", "Água", "Stress", "Dor", "Exerc."];
        headers.forEach((h, i) => doc.text(h, cols[i], y));
        y += 7;

        doc.setFont("helvetica", "normal");
        checkins.forEach(c => {
          if (y > 270) {
            doc.addPage();
            y = 20;
          }
          doc.text(format(new Date(c.data + "T12:00:00"), "dd/MM"), cols[0], y);
          doc.text(`${c.humor}/5`, cols[1], y);
          doc.text(`${c.energia}/5`, cols[2], y);
          doc.text(c.sono_horas != null ? `${c.sono_horas}h` : "—", cols[3], y);
          doc.text(c.agua_litros != null ? `${c.agua_litros}L` : "—", cols[4], y);
          doc.text(c.estresse != null ? `${c.estresse}/5` : "—", cols[5], y);
          doc.text(`${c.dor}/10`, cols[6], y);
          doc.text(`${c.exercicio_min}m`, cols[7], y);
          y += 5;
        });
      }

      // Footer
      const pages = doc.getNumberOfPages();
      for (let i = 1; i <= pages; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text("Resinkra — Relatório gerado automaticamente", 15, 290);
        doc.text(`Página ${i}/${pages}`, w - 30, 290);
      }

      doc.save(`relatorio-bem-estar-${format(new Date(), "yyyy-MM-dd")}.pdf`);
      toast.success("Relatório gerado com sucesso!");
    } catch (err) {
      console.error(err);
      toast.error("Erro ao gerar PDF");
    } finally {
      setGenerating(false);
    }
  };

  if (isLoading) {
    return (
      <AppLayout>
        <div className="max-w-2xl mx-auto px-4 py-6 space-y-4 pb-24">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-40 rounded-2xl" />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-5 pb-24">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} />
          </Button>
          <div>
            <h1 className="text-lg font-bold text-foreground">Relatório de Bem-Estar</h1>
            <p className="text-xs text-muted-foreground">Exporte seus dados dos últimos 30 dias</p>
          </div>
        </div>

        {/* Preview */}
        {stats ? (
          <>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="border-primary/20">
                <CardContent className="p-5 space-y-4">
                  <div className="flex items-center gap-2">
                    <FileText size={18} className="text-primary" />
                    <span className="font-semibold text-foreground">Prévia do Relatório</span>
                  </div>

                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>📅 Período: últimos 30 dias ({stats.dias} check-ins)</p>
                    {streakData && <p>🔥 Streak: {streakData.streak_atual} dias (recorde: {streakData.melhor_streak})</p>}
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { emoji: "😊", label: "Humor", value: stats.humor != null ? `${stats.humor}/5` : "—" },
                      { emoji: "⚡", label: "Energia", value: stats.energia != null ? `${stats.energia}/5` : "—" },
                      { emoji: "🌙", label: "Sono", value: stats.sono != null ? `${stats.sono}h` : "—" },
                      { emoji: "💧", label: "Água", value: stats.agua != null ? `${stats.agua}L` : "—" },
                      { emoji: "🧘", label: "Estresse", value: stats.estresse != null ? `${stats.estresse}/5` : "—" },
                      { emoji: "🏃", label: "Exercício", value: stats.exercicio != null ? `${stats.exercicio}min` : "—" },
                    ].map(s => (
                      <div key={s.label} className="text-center p-2.5 rounded-xl bg-muted/50">
                        <span className="text-lg">{s.emoji}</span>
                        <p className="text-sm font-bold text-foreground mt-0.5">{s.value}</p>
                        <p className="text-[10px] text-muted-foreground">{s.label}</p>
                      </div>
                    ))}
                  </div>

                  {metas && (
                    <div className="text-xs text-muted-foreground space-y-0.5 pt-1">
                      <p className="font-medium text-foreground">🎯 Metas incluídas no relatório:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {metas.meta_agua_litros && <span className="px-2 py-0.5 rounded-full bg-muted">Água ≥{metas.meta_agua_litros}L</span>}
                        {metas.meta_sono_horas && <span className="px-2 py-0.5 rounded-full bg-muted">Sono ≥{metas.meta_sono_horas}h</span>}
                        {metas.meta_energia_min && <span className="px-2 py-0.5 rounded-full bg-muted">Energia ≥{metas.meta_energia_min}</span>}
                        {metas.meta_estresse_max && <span className="px-2 py-0.5 rounded-full bg-muted">Estresse ≤{metas.meta_estresse_max}</span>}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            <Button
              onClick={generatePDF}
              disabled={generating}
              className="w-full gap-2"
              size="lg"
            >
              {generating ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Gerando PDF...
                </>
              ) : (
                <>
                  <Download size={18} />
                  Baixar Relatório em PDF
                </>
              )}
            </Button>
          </>
        ) : (
          <Card>
            <CardContent className="p-6 text-center space-y-3">
              <FileText size={32} className="mx-auto text-muted-foreground/30" />
              <p className="text-sm text-muted-foreground">
                Registre check-ins de bem-estar para gerar seu relatório.
              </p>
              <Button onClick={() => navigate("/wellness-tracker")} size="sm">
                Fazer Check-in
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  );
};

export default RelatorioWellness;
