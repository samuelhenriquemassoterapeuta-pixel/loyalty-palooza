import { Sparkles } from "lucide-react";
import capaHeadspa from "@/assets/cursos/capa-headspa.jpg";
import videoHeadspa from "@/assets/cursos/video-headspa.mp4";
import { CursoShell } from "@/components/curso/CursoShell";
import { cursoHeadSpaData } from "@/data/cursoHeadSpaContent";
import { headSpaAulaAssets } from "@/data/cursoHeadSpaAssets";

export default function CursoHeadSpa({ embedded = false }: { embedded?: boolean }) {
  return (
    <CursoShell
      embedded={embedded}
      storageKey="resinkra_curso_headspa_progress"
      modulos={cursoHeadSpaData}
      assets={headSpaAulaAssets}
      courseTitle="Head SPA Coreano"
      courseSubtitle="Curso profissional completo · 두피 스파"
      courseIcon={<Sparkles size={24} />}
      coverImage={capaHeadspa}
      coverVideo={videoHeadspa}
      completionMessage="Parabéns! Você concluiu o curso de Head SPA Coreano. 🏆 Certificado desbloqueado!"
    />
  );
}
