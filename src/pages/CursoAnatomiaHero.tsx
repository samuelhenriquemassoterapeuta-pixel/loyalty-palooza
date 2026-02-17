import { Bone } from "lucide-react";
import capaAnatomia from "@/assets/cursos/capa-anatomia.jpg";
import videoAnatomia from "@/assets/cursos/video-anatomia.mp4";
import { CursoHeroPage } from "@/components/curso/CursoHeroPage";
import { cursoAnatomiaData } from "@/data/cursoAnatomiaContent";

export default function CursoAnatomiaHero({ embedded }: { embedded?: boolean }) {
  return (
    <CursoHeroPage
      storageKey="resinkra_curso_anatomia_progress"
      modulos={cursoAnatomiaData}
      courseTitle="Anatomia Humana"
      courseSubtitle="Anatomia aplicada à massoterapia"
      courseIcon={<Bone size={28} />}
      coverImage={capaAnatomia}
      coverVideo={videoAnatomia}
      courseRoute="/curso-anatomia"
      level="Iniciante"
      description="Curso completo de Anatomia Humana com 15 módulos e 130 horas — do iniciante ao avançado, com base científica e visão de mercado."
      embedded={embedded}
    />
  );
}
