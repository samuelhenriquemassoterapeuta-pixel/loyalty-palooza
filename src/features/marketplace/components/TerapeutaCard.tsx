import { motion } from "framer-motion";
import { Star, MapPin, Heart, BadgeCheck, Clock, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { MarketplaceTerapeuta } from "../hooks/useMarketplace";

interface TerapeutaCardProps {
  terapeuta: MarketplaceTerapeuta;
  index: number;
  isFavorito: boolean;
  onToggleFavorito: () => void;
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 260, damping: 24 },
  },
};

export function TerapeutaCard({ terapeuta, index, isFavorito, onToggleFavorito }: TerapeutaCardProps) {
  const navigate = useNavigate();

  return (
    <motion.div
      variants={fadeUp}
      className="glass-card rounded-2xl overflow-hidden cursor-pointer group relative"
      onClick={() => navigate(`/marketplace/${terapeuta.slug}`)}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Destaque badge */}
      {terapeuta.destaque && (
        <div className="absolute top-2 left-2 z-10 flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
          <Sparkles size={10} />
          Destaque
        </div>
      )}

      {/* Favoritar */}
      <button
        onClick={(e) => { e.stopPropagation(); onToggleFavorito(); }}
        className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
      >
        <Heart
          size={16}
          className={isFavorito ? "fill-destructive text-destructive" : "text-muted-foreground"}
        />
      </button>

      {/* Foto */}
      <div className="aspect-[4/3] bg-muted/30 relative overflow-hidden">
        {terapeuta.foto_url ? (
          <img
            src={terapeuta.foto_url}
            alt={terapeuta.nome}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl bg-gradient-to-br from-primary/10 to-primary/5">
            💆
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="flex items-center gap-1">
              <h3 className="font-semibold text-sm text-foreground truncate">{terapeuta.nome}</h3>
              {terapeuta.verificado && (
                <BadgeCheck size={14} className="text-primary shrink-0" />
              )}
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
              <MapPin size={10} />
              <span className="truncate">{terapeuta.cidade}, {terapeuta.estado}</span>
            </div>
          </div>

          {/* Rating */}
          {terapeuta.total_avaliacoes > 0 && (
            <div className="flex items-center gap-0.5 shrink-0">
              <Star size={12} className="fill-warning text-warning" />
              <span className="text-xs font-semibold text-foreground">
                {terapeuta.media_avaliacoes.toFixed(1)}
              </span>
              <span className="text-[10px] text-muted-foreground">
                ({terapeuta.total_avaliacoes})
              </span>
            </div>
          )}
        </div>

        {/* Especialidades */}
        <div className="flex flex-wrap gap-1">
          {terapeuta.especialidades.slice(0, 3).map((esp) => (
            <span
              key={esp}
              className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-medium"
            >
              {esp}
            </span>
          ))}
          {terapeuta.especialidades.length > 3 && (
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground">
              +{terapeuta.especialidades.length - 3}
            </span>
          )}
        </div>

        {/* Preço e atendimentos */}
        <div className="flex items-center justify-between pt-1 border-t border-border/50">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock size={10} />
            <span>{terapeuta.total_atendimentos} atendimentos</span>
          </div>
          <p className="text-sm font-bold text-primary">
            R$ {terapeuta.preco_minimo.toFixed(0)}
            {terapeuta.preco_maximo > terapeuta.preco_minimo && (
              <span className="text-[10px] font-normal text-muted-foreground"> - {terapeuta.preco_maximo.toFixed(0)}</span>
            )}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
