import { Gem } from "lucide-react";
import capaFacespa from "@/assets/cursos/capa-facespa.jpg";
import videoFacespa from "@/assets/cursos/video-facespa.mp4";
import { CursoShell } from "@/features/cursos/components/CursoShell";
import { cursoYugenFaceSpaData } from "@/features/cursos/data/cursoYugenFaceSpaContent";
import { faceSpaAulaAssets } from "@/features/cursos/data/cursoYugenFaceSpaAssets";

export default function CursoYugenFaceSpa({ embedded = false }: { embedded?: boolean }) {
  return (
    <CursoShell
      embedded={embedded}
      storageKey="resinkra_curso_yugen_facespa_progress"
      modulos={cursoYugenFaceSpaData}
      assets={faceSpaAulaAssets}
      courseTitle="Yūgen FaceSPA"
      courseSubtitle="Curso profissional completo · 幽玄フェイススパ"
      courseIcon={<Gem size={24} />}
      coverImage={capaFacespa}
      coverVideo={videoFacespa}
      completionMessage="Parabéns! Você concluiu o curso Yūgen FaceSPA. 🏆 Certificado desbloqueado!"
    />
  );
}
