import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { ArrowLeft, Globe, Instagram, Phone, Mail, Sparkles, Medal, Award, Trophy, Crown, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageLoading } from "@/components/LoadingSpinner";

const tierIcons: Record<string, any> = { bronze: Medal, prata: Award, ouro: Trophy, diamante: Crown };

const PerfilParceiro = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { data: parceiro, isLoading } = useQuery({
    queryKey: ["perfil-parceiro", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("parceiros")
        .select("*")
        .eq("slug", slug)
        .eq("ativo", true)
        .eq("verificado", true)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });

  // Fetch partner's active coupons
  const { data: cuponsAtivos = [] } = useQuery({
    queryKey: ["parceiro-cupons-publicos", parceiro?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("parceiro_cupons")
        .select("codigo, descricao, tipo_desconto, valor_desconto, valido_ate")
        .eq("parceiro_id", parceiro!.id)
        .eq("ativo", true)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!parceiro?.id,
  });

  if (isLoading) return <PageLoading text="Carregando perfil..." />;

  if (!parceiro) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-xl font-bold mb-2">Parceiro não encontrado</h1>
          <Button onClick={() => navigate("/")}>Voltar</Button>
        </div>
      </div>
    );
  }

  const TierIcon = tierIcons[parceiro.faixa_comissao_atual] || Medal;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="bg-gradient-to-br from-accent/80 to-primary/80 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent)]" />
        <div className="max-w-2xl mx-auto px-4 pt-6 pb-12 relative">
          <button onClick={() => navigate(-1)} className="p-2 rounded-xl bg-white/10 hover:bg-white/20 mb-6 transition-all">
            <ArrowLeft size={20} className="text-white" />
          </button>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
              {parceiro.logo_url ? (
                <img src={parceiro.logo_url} alt={parceiro.nome_empresa} className="w-16 h-16 rounded-xl object-cover" />
              ) : (
                <Sparkles className="w-8 h-8 text-white" />
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">{parceiro.nome_empresa}</h1>
              <div className="flex items-center gap-2 mt-1">
                <Badge className="bg-white/20 text-white border-none text-[10px] capitalize gap-1">
                  <TierIcon className="w-3 h-3" /> Parceiro {parceiro.faixa_comissao_atual}
                </Badge>
                {parceiro.verificado && <Badge className="bg-white/20 text-white border-none text-[10px]">✓ Verificado</Badge>}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 -mt-6 pb-12 space-y-4">
        {/* Description */}
        {parceiro.descricao && (
          <Card className="border-border/50">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">{parceiro.descricao}</p>
            </CardContent>
          </Card>
        )}

        {/* Contact & Links */}
        <Card className="border-border/50">
          <CardContent className="p-4 space-y-2">
            {parceiro.site_url && (
              <a href={parceiro.site_url} target="_blank" rel="noopener" className="flex items-center gap-2 text-sm text-accent hover:underline">
                <Globe className="w-4 h-4" /> {parceiro.site_url.replace(/^https?:\/\//, "")}
              </a>
            )}
            {parceiro.instagram && (
              <a href={`https://instagram.com/${parceiro.instagram.replace("@", "")}`} target="_blank" rel="noopener" className="flex items-center gap-2 text-sm text-accent hover:underline">
                <Instagram className="w-4 h-4" /> @{parceiro.instagram.replace("@", "")}
              </a>
            )}
            {parceiro.telefone && (
              <a href={`tel:${parceiro.telefone}`} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" /> {parceiro.telefone}
              </a>
            )}
            {parceiro.email_comercial && (
              <a href={`mailto:${parceiro.email_comercial}`} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" /> {parceiro.email_comercial}
              </a>
            )}
          </CardContent>
        </Card>

        {/* Active Coupons */}
        {cuponsAtivos.length > 0 && (
          <Card className="border-border/50">
            <CardContent className="p-4">
              <h3 className="text-sm font-semibold text-foreground mb-3">🎟️ Cupons Disponíveis</h3>
              <div className="space-y-2">
                {cuponsAtivos.map((c: any) => (
                  <div key={c.codigo} className="flex items-center justify-between p-3 rounded-xl bg-accent/5 border border-accent/20">
                    <div>
                      <code className="font-mono font-bold text-accent">{c.codigo}</code>
                      {c.descricao && <p className="text-xs text-muted-foreground mt-0.5">{c.descricao}</p>}
                    </div>
                    <Badge className="bg-accent/10 text-accent border-accent/30">
                      {c.tipo_desconto === "percentual" ? `${c.valor_desconto}% OFF` : `R$ ${Number(c.valor_desconto).toFixed(0)} OFF`}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* CTA */}
        <Button className="w-full gap-2" size="lg" onClick={() => navigate("/agendamento")}>
          <ExternalLink className="w-4 h-4" /> Agendar com Desconto
        </Button>
      </div>
    </div>
  );
};

export default PerfilParceiro;
