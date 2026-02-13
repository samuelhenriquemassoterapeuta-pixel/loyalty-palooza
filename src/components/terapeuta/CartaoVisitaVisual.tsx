import { Star, Phone, Mail, Calendar, MapPin } from "lucide-react";
import QRCode from "react-qr-code";
import logoImg from "@/assets/resinkra-logo.png";

interface CartaoVisitaVisualProps {
  nome: string;
  especialidade?: string | null;
  foto_url?: string | null;
  email?: string | null;
  telefone?: string | null;
  media_avaliacoes?: number;
  total_avaliacoes?: number;
  terapeutaId: string;
  fillContainer?: boolean;
}

export const CartaoVisitaVisual = ({
  nome,
  especialidade,
  foto_url,
  email,
  telefone,
  media_avaliacoes,
  total_avaliacoes,
  terapeutaId,
  fillContainer = false,
}: CartaoVisitaVisualProps) => {
  const cardUrl = `${window.location.origin}/terapeuta/${terapeutaId}`;
  const hasRating = media_avaliacoes && media_avaliacoes > 0;

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br from-primary via-[hsl(76,16%,30%)] to-primary text-primary-foreground ${
        fillContainer ? "w-full h-full" : "w-[340px] aspect-[9/16]"
      } rounded-2xl flex flex-col`}
    >
      {/* Decorative pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 10%, hsl(76 16% 56% / 0.4) 0%, transparent 40%), radial-gradient(circle at 85% 85%, hsl(136 11% 75% / 0.3) 0%, transparent 40%)",
        }}
      />

      {/* Top logo strip */}
      <div className="relative z-10 flex justify-center pt-6 pb-2">
        <img src={logoImg} alt="Resinkra" className="h-8 opacity-80" />
      </div>

      {/* Photo */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center gap-4 px-6">
        <div className="w-28 h-28 rounded-full border-4 border-primary-foreground/30 overflow-hidden bg-muted/20 shadow-lg">
          {foto_url ? (
            <img src={foto_url} alt={nome} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-3xl font-bold opacity-60">
              {nome.charAt(0)}
            </div>
          )}
        </div>

        {/* Name & specialty */}
        <div className="text-center space-y-1">
          <h2 className="text-xl font-bold tracking-tight font-serif">{nome}</h2>
          {especialidade && (
            <p className="text-sm opacity-80 font-medium">{especialidade}</p>
          )}
        </div>

        {/* Rating */}
        {hasRating && (
          <div className="flex items-center gap-1.5 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-3 py-1.5">
            <Star className="w-4 h-4 fill-warning text-warning" />
            <span className="text-sm font-semibold">{media_avaliacoes.toFixed(1)}</span>
            <span className="text-xs opacity-60">({total_avaliacoes})</span>
          </div>
        )}

        {/* Contact info */}
        <div className="w-full space-y-2 mt-2">
          {telefone && (
            <div className="flex items-center gap-2.5 bg-primary-foreground/10 backdrop-blur-sm rounded-xl px-4 py-2.5">
              <Phone className="w-4 h-4 opacity-70" />
              <span className="text-sm">{telefone}</span>
            </div>
          )}
          {email && (
            <div className="flex items-center gap-2.5 bg-primary-foreground/10 backdrop-blur-sm rounded-xl px-4 py-2.5">
              <Mail className="w-4 h-4 opacity-70" />
              <span className="text-sm truncate">{email}</span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom: QR + CTA */}
      <div className="relative z-10 flex flex-col items-center gap-3 px-6 pb-6 pt-4">
        <div className="bg-white rounded-xl p-2.5 shadow-md">
          <QRCode value={cardUrl} size={80} level="M" />
        </div>
        <div className="flex items-center gap-1.5 text-xs opacity-60">
          <Calendar className="w-3.5 h-3.5" />
          <span>Escaneie para agendar</span>
        </div>
      </div>
    </div>
  );
};
