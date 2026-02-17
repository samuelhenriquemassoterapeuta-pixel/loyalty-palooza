import { Leaf } from "lucide-react";
import capaFitoterapia from "@/assets/cursos/capa-fitoterapia.jpg";
import { CursoHeroPage } from "@/features/cursos/components/CursoHeroPage";
import { cursoFitoterapiaData } from "@/features/cursos/data/cursoFitoterapiaContent";

export default function CursoFitoterapiaHero({ embedded }: { embedded?: boolean }) {
  return (
    <CursoHeroPage
      storageKey="resinkra_curso_fitoterapia_progress"
      modulos={cursoFitoterapiaData}
      courseTitle="Fitoterapia e Fitoterápicos"
      courseSubtitle="Do Iniciante ao Avançado — 140h"
      courseIcon={<Leaf size={28} />}
      coverImage={capaFitoterapia}
      coverVideo=""
      courseRoute="/curso-fitoterapia"
      level="Iniciante ao Avançado"
      description="Formação completa em fitoterapia: dos fundamentos de botânica às preparações fitoterápicas, plantas medicinais por sistema, segurança, prescrição, legislação e mercado de trabalho."
      embedded={embedded}
    />
  );
}
