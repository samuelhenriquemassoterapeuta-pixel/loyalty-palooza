import { Ear } from "lucide-react";
import capaAuriculoterapia from "@/assets/cursos/capa-auriculoterapia.jpg";
import { CursoHeroPage } from "@/features/cursos/components/CursoHeroPage";
import { cursoAuriculoterapiaData } from "@/features/cursos/data/cursoAuriculoterapiaContent";

export default function CursoAuriculoterapiaHero({ embedded }: { embedded?: boolean }) {
  return (
    <CursoHeroPage
      storageKey="resinkra_curso_auriculoterapia_progress"
      modulos={cursoAuriculoterapiaData}
      courseTitle="Auriculoterapia"
      courseSubtitle="Microssistema Auricular — Chinesa e Francesa"
      courseIcon={<Ear size={28} />}
      coverImage={capaAuriculoterapia}
      courseRoute="/curso-auriculoterapia"
      level="Intermediário"
      description="Curso de Auriculoterapia com 6 módulos e 30 horas — mapeamento auricular, sementes, agulhas, laser e protocolos clínicos."
      embedded={embedded}
    />
  );
}
