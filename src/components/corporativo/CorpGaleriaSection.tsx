import { motion } from "framer-motion";
import { Camera, Play } from "lucide-react";
import { useState } from "react";
import eventoCasamento from "@/assets/corporativo/evento-casamento.jpg";
import eventoDebutante from "@/assets/corporativo/evento-debutante.jpg";
import eventoFormatura from "@/assets/corporativo/evento-formatura.jpg";
import eventoEsportivo from "@/assets/corporativo/evento-esportivo.jpg";
import empresasInternacionais from "@/assets/corporativo/empresas-internacionais.jpg";
import eventoSipat from "@/assets/corporativo/evento-sipat.jpg";
import eventoConvencao from "@/assets/corporativo/evento-convencao.jpg";
import eventoQvt from "@/assets/corporativo/evento-qvt.jpg";

import videoBemEstar from "@/assets/corporativo/video-bem-estar.mp4";
import videoCasamento from "@/assets/corporativo/video-casamento.mp4";
import videoDebutante from "@/assets/corporativo/video-debutante.mp4";
import videoEsportivo from "@/assets/corporativo/video-esportivo.mp4";
import videoFormatura from "@/assets/corporativo/video-formatura.mp4";

const fotos = [
  { src: eventoCasamento, label: "Casamentos", desc: "Massoterapia premium para noivos e convidados" },
  { src: eventoDebutante, label: "Debutantes", desc: "Relaxamento especial para aniversariantes e convidados" },
  { src: eventoFormatura, label: "Formaturas", desc: "Momentos de bem-estar nas celebrações acadêmicas" },
  { src: eventoEsportivo, label: "Eventos Esportivos", desc: "Recuperação muscular pós-competição" },
  { src: empresasInternacionais, label: "Corporativos", desc: "Atendimento em multinacionais e escritórios" },
  { src: eventoSipat, label: "SIPAT", desc: "Semanas de prevenção com massoterapia" },
  { src: eventoConvencao, label: "Convenções", desc: "Quick massage em feiras e congressos" },
  { src: eventoQvt, label: "QVT", desc: "Programas de qualidade de vida no trabalho" },
];

const videos = [
  { src: videoBemEstar, label: "Bem-Estar Corporativo", desc: "Como funciona nosso atendimento in-loco" },
  { src: videoCasamento, label: "Casamentos", desc: "Massoterapia relaxante para celebrações" },
  { src: videoDebutante, label: "Debutantes", desc: "Experiência de spa para festas de 15 anos" },
  { src: videoEsportivo, label: "Esportivo", desc: "Recuperação muscular em eventos esportivos" },
  { src: videoFormatura, label: "Formaturas", desc: "Momentos de descompressão para formandos" },
];

export const CorpGaleriaSection = () => {
  const [activeTab, setActiveTab] = useState<"fotos" | "videos">("fotos");

  return (
    <div className="space-y-6">
      {/* Tab switcher */}
      <div className="flex gap-2 justify-center">
        <button
          onClick={() => setActiveTab("fotos")}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeTab === "fotos"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          <Camera size={14} />
          Fotos ({fotos.length})
        </button>
        <button
          onClick={() => setActiveTab("videos")}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeTab === "videos"
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          <Play size={14} />
          Vídeos ({videos.length})
        </button>
      </div>

      {/* Photos grid */}
      {activeTab === "fotos" && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {fotos.map((foto, index) => (
            <motion.div
              key={foto.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden shadow-card"
            >
              <img
                src={foto.src}
                alt={foto.label}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <span className="text-xs font-semibold text-white block">{foto.label}</span>
                <span className="text-[10px] text-white/70 leading-tight block mt-0.5">{foto.desc}</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Videos grid */}
      {activeTab === "videos" && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <motion.div
              key={video.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="rounded-2xl overflow-hidden shadow-card bg-card"
            >
              <div className="aspect-video">
                <video
                  src={video.src}
                  controls
                  preload="metadata"
                  className="w-full h-full object-cover"
                  poster=""
                />
              </div>
              <div className="p-3">
                <h4 className="text-sm font-semibold text-foreground">{video.label}</h4>
                <p className="text-xs text-muted-foreground mt-0.5">{video.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
