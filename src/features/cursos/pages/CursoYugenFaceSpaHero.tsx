import { Gem } from "lucide-react";
import capaFacespa from "@/assets/cursos/capa-facespa.jpg";
import videoFacespa from "@/assets/cursos/video-facespa.mp4";
import { CursoHeroPage } from "@/features/cursos/components/CursoHeroPage";
import { cursoYugenFaceSpaData } from "@/features/cursos/data/cursoYugenFaceSpaContent";

export default function CursoYugenFaceSpaHero({ embedded }: { embedded?: boolean }) {
  return (
    <CursoHeroPage
      storageKey="resinkra_curso_yugen_facespa_progress"
      modulos={cursoYugenFaceSpaData}
      courseTitle="Yūgen FaceSPA"
      courseSubtitle="Curso profissional completo · 幽玄フェイススパ"
      courseIcon={<Gem size={28} />}
      coverImage={capaFacespa}
      coverVideo={videoFacespa}
      courseRoute="/curso-yugen-facespa"
      level="Profissional"
      description="Formação em filosofia oriental (Qi/Tsubos), anatomia facial, técnica Kobido, uso de Gua Sha e estratégias de fidelização baseadas em Omotenashi."
      embedded={embedded}
    />
  );
}
