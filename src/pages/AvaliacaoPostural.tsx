import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Plus, ArrowLeftRight, Scan } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AppLayout } from "@/components/AppLayout";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { useAvaliacoesPosturais, AvaliacaoPostural } from "@/hooks/useAvaliacaoPostural";
import { AvaliacaoCard } from "@/components/avaliacao-postural/AvaliacaoCard";
import { AvaliacaoDetail } from "@/components/avaliacao-postural/AvaliacaoDetail";
import { ComparacaoView } from "@/components/avaliacao-postural/ComparacaoView";
import { PausasPosturaisSection } from "@/components/pausas-posturais/PausasPosturaisSection";

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 260, damping: 24 },
  },
};

export default function AvaliacaoPosturalPage() {
  const navigate = useNavigate();
  const { avaliacoes, isLoading, criar, remover } = useAvaliacoesPosturais();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showComparacao, setShowComparacao] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<AvaliacaoPostural | null>(null);

  const selected = avaliacoes.find((a) => a.id === selectedId);

  const handleNova = async () => {
    const result = await criar.mutateAsync(undefined);
    setSelectedId(result.id);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    await remover.mutateAsync(deleteTarget);
    setDeleteTarget(null);
    if (selectedId === deleteTarget.id) setSelectedId(null);
  };

  if (isLoading) {
    return (
      <AppLayout>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <LoadingSpinner />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="min-h-screen bg-background pb-24 lg:pb-8">
        <div className="max-w-lg lg:max-w-4xl xl:max-w-5xl mx-auto px-4 lg:px-8 pt-6 safe-top">
          <AnimatePresence mode="wait">
            {selected ? (
              <AvaliacaoDetail
                key="detail"
                avaliacao={selected}
                onBack={() => setSelectedId(null)}
              />
            ) : showComparacao ? (
              <ComparacaoView
                key="comparacao"
                avaliacoes={avaliacoes}
                onClose={() => setShowComparacao(false)}
              />
            ) : (
              <motion.div
                key="list"
                variants={stagger}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5"
              >
                {/* Header */}
                <motion.div variants={fadeUp}>
                  <div className="flex items-center gap-3 mb-1">
                    <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="shrink-0">
                      <ArrowLeft size={20} />
                    </Button>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Scan size={22} className="text-primary" />
                        <h1 className="text-xl font-bold text-foreground">Avaliação Postural</h1>
                      </div>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        Capture e compare fotos padronizadas para acompanhar sua postura
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Actions */}
                <motion.div variants={fadeUp} className="flex gap-2">
                  <Button onClick={handleNova} disabled={criar.isPending} className="gap-1.5 flex-1">
                    <Plus size={16} />
                    Nova Avaliação
                  </Button>
                  {avaliacoes.length >= 2 && (
                    <Button
                      variant="outline"
                      onClick={() => setShowComparacao(true)}
                      className="gap-1.5"
                    >
                      <ArrowLeftRight size={16} />
                      Comparar
                    </Button>
                  )}
                </motion.div>

                {/* Stats */}
                {avaliacoes.length > 0 && (
                  <motion.div variants={fadeUp} className="grid grid-cols-3 gap-3">
                    <div className="p-3 rounded-xl bg-card border border-border text-center">
                      <p className="text-lg font-bold text-foreground">{avaliacoes.length}</p>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Avaliações</p>
                    </div>
                    <div className="p-3 rounded-xl bg-card border border-border text-center">
                      <p className="text-lg font-bold text-foreground">
                        {avaliacoes.filter((a) => a.foto_anterior && a.foto_posterior && a.foto_lateral_direita && a.foto_lateral_esquerda).length}
                      </p>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Completas</p>
                    </div>
                    <div className="p-3 rounded-xl bg-card border border-border text-center">
                      <p className="text-lg font-bold text-foreground">
                        {[...new Set(avaliacoes.flatMap((a) => [a.foto_anterior, a.foto_posterior, a.foto_lateral_direita, a.foto_lateral_esquerda].filter(Boolean)))].length}
                      </p>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Fotos</p>
                    </div>
                  </motion.div>
                )}

                {/* Assessment list */}
                <motion.div variants={fadeUp} className="space-y-3">
                  {avaliacoes.length > 0 && (
                    <p className="section-label px-1">Histórico de Avaliações</p>
                  )}
                  {avaliacoes.map((av, i) => (
                    <AvaliacaoCard
                      key={av.id}
                      avaliacao={av}
                      index={i}
                      onSelect={() => setSelectedId(av.id)}
                      onDelete={() => setDeleteTarget(av)}
                    />
                  ))}
                  {avaliacoes.length === 0 && (
                    <div className="text-center py-16">
                      <Scan size={48} className="mx-auto mb-4 text-muted-foreground/30" />
                      <h3 className="font-semibold text-foreground mb-1">Nenhuma avaliação ainda</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Crie sua primeira avaliação postural com fotos nas 4 vistas padronizadas
                      </p>
                      <Button onClick={handleNova} disabled={criar.isPending} className="gap-1.5">
                        <Plus size={16} />
                        Criar Primeira Avaliação
                    </Button>
                    </div>
                  )}
                </motion.div>

                {/* Pausas Posturais Section */}
                <motion.div variants={fadeUp}>
                  <Separator className="my-2" />
                </motion.div>
                <motion.div variants={fadeUp}>
                  <PausasPosturaisSection />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Remover avaliação?"
        description="Todas as fotos desta avaliação serão removidas permanentemente."
        onConfirm={handleDelete}
        variant="destructive"
      />
    </AppLayout>
  );
}
