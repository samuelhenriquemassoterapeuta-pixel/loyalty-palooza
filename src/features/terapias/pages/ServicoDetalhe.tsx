import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AppLayout } from "@/components/AppLayout";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Percent, CalendarDays, CheckCircle2, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageLoading } from "@/components/LoadingSpinner";

const ServicoDetalhe = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: servico, isLoading } = useQuery({
    queryKey: ["servico-detalhe", id],
    enabled: !!id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("servicos")
        .select("*")
        .eq("id", id!)
        .single();
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) return <PageLoading text="Carregando serviço..." />;
  if (!servico) {
    return (
      <AppLayout>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <p className="text-muted-foreground">Serviço não encontrado</p>
        </div>
      </AppLayout>
    );
  }

  const beneficios = (servico as any).beneficios || [];
  const imagens = (servico as any).imagens || [];
  const videoUrl = (servico as any).video_url;
  const imagemCapa = (servico as any).imagem_capa;
  const descricaoDetalhada = (servico as any).descricao_detalhada;
  const cashback = servico.cashback_percentual || 0;

  return (
    <AppLayout>
      <div className="min-h-screen bg-background gradient-hero pb-24 lg:pb-8">
        {/* Hero / Cover Image */}
        {imagemCapa && (
          <div className="relative w-full h-56 lg:h-72 overflow-hidden">
            <img
              src={imagemCapa}
              alt={servico.nome}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          </div>
        )}

        <div className="max-w-lg lg:max-w-3xl mx-auto px-4 safe-top">
          {/* Back button */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className={`flex items-center gap-3 ${imagemCapa ? "-mt-12 relative z-10" : "pt-4"} mb-4`}
          >
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-xl bg-card shadow-card hover:bg-muted/50 transition-colors"
            >
              <ArrowLeft size={22} className="text-foreground" />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            {/* Title & Price */}
            <div className="glass-card rounded-2xl p-5">
              <h1 className="text-2xl font-bold text-foreground">{servico.nome}</h1>
              {servico.descricao && (
                <p className="text-muted-foreground mt-1">{servico.descricao}</p>
              )}
              <div className="flex items-center gap-4 mt-4">
                <span className="text-2xl font-bold text-primary">
                  R$ {Number(servico.preco).toFixed(2).replace(".", ",")}
                </span>
                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock size={16} /> {servico.duracao} min
                </span>
                {cashback > 0 && (
                  <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-highlight/20 text-highlight text-xs font-semibold">
                    <Percent size={12} /> {cashback}% cashback
                  </span>
                )}
              </div>
            </div>

            {/* Detailed Description */}
            {descricaoDetalhada && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-card rounded-2xl p-5"
              >
                <h2 className="text-lg font-semibold text-foreground mb-3">Sobre o serviço</h2>
                <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                  {descricaoDetalhada}
                </p>
              </motion.div>
            )}

            {/* Benefits */}
            {beneficios.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="glass-card rounded-2xl p-5"
              >
                <h2 className="text-lg font-semibold text-foreground mb-3">Benefícios</h2>
                <div className="space-y-2">
                  {beneficios.map((b: string, i: number) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 size={18} className="text-primary mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">{b}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Video */}
            {videoUrl && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="glass-card rounded-2xl p-5"
              >
                <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Play size={18} className="text-primary" /> Vídeo
                </h2>
                {videoUrl.includes("youtube") || videoUrl.includes("youtu.be") || videoUrl.includes("vimeo") ? (
                  <div className="aspect-video rounded-xl overflow-hidden">
                    <iframe
                      src={videoUrl.replace("watch?v=", "embed/").replace("youtu.be/", "youtube.com/embed/")}
                      className="w-full h-full"
                      allowFullScreen
                      title={servico.nome}
                    />
                  </div>
                ) : (
                  <video
                    src={videoUrl}
                    controls
                    className="w-full rounded-xl"
                    preload="metadata"
                  />
                )}
              </motion.div>
            )}

            {/* Image Gallery */}
            {imagens.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="glass-card rounded-2xl p-5"
              >
                <h2 className="text-lg font-semibold text-foreground mb-3">Galeria</h2>
                <div className="grid grid-cols-2 gap-3">
                  {imagens.map((img: string, i: number) => (
                    <div key={i} className="aspect-square rounded-xl overflow-hidden">
                      <img
                        src={img}
                        alt={`${servico.nome} - ${i + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="pb-4"
            >
              <Button
                className="w-full py-6 text-lg font-semibold rounded-2xl shadow-button"
                onClick={() => navigate(`/agendamento?servico=${encodeURIComponent(servico.nome)}`)}
              >
                <CalendarDays className="mr-2" size={20} />
                Agendar este serviço
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ServicoDetalhe;
