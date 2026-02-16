import { Sparkles } from "lucide-react";
import capaHeadspa from "@/assets/cursos/capa-headspa.jpg";
import videoHeadspa from "@/assets/cursos/video-headspa.mp4";
import { CursoHeroPage } from "@/components/curso/CursoHeroPage";
import { cursoHeadSpaData } from "@/data/cursoHeadSpaContent";

export default function CursoHeadSpaHero({ embedded }: { embedded?: boolean }) {
  return (
    <CursoHeroPage
      storageKey="resinkra_curso_headspa_progress"
      modulos={cursoHeadSpaData}
      courseTitle="Head SPA Coreano"
      courseSubtitle="Curso profissional completo · 두피 스파"
      courseIcon={<Sparkles size={28} />}
      coverImage={capaHeadspa}
      coverVideo={videoHeadspa}
      courseRoute="/curso-headspa"
      level="Iniciante ao Avançado"
      description="Formação completa em Head SPA Coreano: das escolas japonesa e coreana aos protocolos avançados, evidências científicas, biossegurança e certificação profissional."
      embedded={embedded}
    />
  );
}
