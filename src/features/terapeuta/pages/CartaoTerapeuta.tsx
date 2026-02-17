import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Share2, Phone, Mail, Star, Calendar, MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { CartaoVisitaExport } from "@/features/terapeuta/components/CartaoVisitaExport";
import { PageLoading } from "@/components/LoadingSpinner";
import { toast } from "sonner";
import logoImg from "@/assets/resinkra-logo.png";

interface TerapeutaCartao {
  id: string;
  nome: string;
  especialidade: string | null;
  foto_url: string | null;
  email: string | null;
  telefone: string | null;
  disponivel: boolean;
  media_avaliacoes: number;
  total_avaliacoes: number;
}

const CartaoTerapeuta = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [terapeuta, setTerapeuta] = useState<TerapeutaCartao | null>(null);
  const [loading, setLoading] = useState(true);
  const [showExport, setShowExport] = useState(false);

  useEffect(() => {
    const fetchTerapeuta = async () => {
      if (!id) return;
      const { data, error } = await supabase.rpc("get_terapeuta_cartao", {
        terapeuta_uuid: id,
      });
      if (error || !data?.length) {
        toast.error("Terapeuta não encontrado");
        setLoading(false);
        return;
      }
      setTerapeuta(data[0] as TerapeutaCartao);
      setLoading(false);
    };
    fetchTerapeuta();
  }, [id]);

  const handleShare = async () => {
    const url = window.location.href;
    const text = `Conheça ${terapeuta?.nome} — ${terapeuta?.especialidade || "Terapeuta"} na Resinkra ✨`;
    if (navigator.share) {
      try {
        await navigator.share({ title: terapeuta?.nome, text, url });
      } catch {}
    } else {
      await navigator.clipboard.writeText(url);
      toast.success("Link copiado!");
    }
  };

  const handleWhatsApp = () => {
    if (!terapeuta?.telefone) return;
    const phone = terapeuta.telefone.replace(/\D/g, "");
    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent("Olá! Vi seu perfil na Resinkra e gostaria de agendar 😊")}`,
      "_blank"
    );
  };

  if (loading) return <PageLoading />;

  if (!terapeuta) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-6">
        <p className="text-muted-foreground">Terapeuta não encontrado</p>
        <Button variant="outline" onClick={() => navigate("/")}>Voltar</Button>
      </div>
    );
  }

  const hasRating = terapeuta.media_avaliacoes > 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero header */}
      <div className="relative bg-gradient-to-br from-primary via-[hsl(76,16%,30%)] to-primary text-primary-foreground pb-24 pt-6 px-4">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 10%, hsl(76 16% 56% / 0.4) 0%, transparent 40%), radial-gradient(circle at 85% 85%, hsl(136 11% 75% / 0.3) 0%, transparent 40%)",
          }}
        />
        <div className="relative z-10 max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-8">
            <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-primary-foreground/10 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <img src={logoImg} alt="Resinkra" className="h-6 opacity-80" />
            <button onClick={handleShare} className="p-2 rounded-full hover:bg-primary-foreground/10 transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-lg mx-auto px-4 -mt-20 relative z-10 pb-8 space-y-4">
        {/* Profile card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="overflow-visible shadow-lg">
            <CardContent className="pt-0 pb-6 flex flex-col items-center -mt-12">
              <Avatar className="w-24 h-24 border-4 border-card shadow-md">
                <AvatarImage src={terapeuta.foto_url || undefined} alt={terapeuta.nome} />
                <AvatarFallback className="text-2xl font-bold bg-primary text-primary-foreground">
                  {terapeuta.nome.charAt(0)}
                </AvatarFallback>
              </Avatar>

              <h1 className="text-xl font-bold mt-3 font-serif">{terapeuta.nome}</h1>
              {terapeuta.especialidade && (
                <p className="text-sm text-muted-foreground">{terapeuta.especialidade}</p>
              )}

              {hasRating && (
                <div className="flex items-center gap-1.5 mt-2 bg-warning/10 rounded-full px-3 py-1">
                  <Star className="w-4 h-4 fill-warning text-warning" />
                  <span className="text-sm font-semibold">{terapeuta.media_avaliacoes.toFixed(1)}</span>
                  <span className="text-xs text-muted-foreground">({terapeuta.total_avaliacoes} avaliações)</span>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex gap-2 mt-4 w-full">
                <Button className="flex-1" onClick={() => navigate("/agendamento")}>
                  <Calendar className="w-4 h-4 mr-1.5" />
                  Agendar
                </Button>
                {terapeuta.telefone && (
                  <Button variant="outline" size="icon" onClick={handleWhatsApp}>
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                )}
                <Button variant="outline" size="icon" onClick={handleShare}>
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Contact info */}
        {(terapeuta.telefone || terapeuta.email) && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card>
              <CardContent className="py-4 space-y-3">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Contato</h3>
                {terapeuta.telefone && (
                  <a href={`tel:${terapeuta.telefone}`} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                      <Phone className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm">{terapeuta.telefone}</span>
                  </a>
                )}
                {terapeuta.email && (
                  <a href={`mailto:${terapeuta.email}`} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                      <Mail className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm">{terapeuta.email}</span>
                  </a>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Export section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card>
            <CardContent className="py-4">
              <button
                onClick={() => setShowExport(!showExport)}
                className="w-full flex items-center justify-between text-sm font-semibold text-muted-foreground uppercase tracking-wider"
              >
                Compartilhar Cartão Visual
                <Share2 className="w-4 h-4" />
              </button>
              {showExport && (
                <div className="mt-4">
                  <CartaoVisitaExport terapeuta={terapeuta} />
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default CartaoTerapeuta;
