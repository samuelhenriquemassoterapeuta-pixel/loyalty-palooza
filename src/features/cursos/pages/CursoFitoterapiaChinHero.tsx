import { TreePine } from "lucide-react";
import capaFitoterapiaChinesa from "@/assets/cursos/capa-fitoterapia-chinesa.jpg";
import { CursoHeroPage } from "@/features/cursos/components/CursoHeroPage";
import { cursoFitoterapiaChinContent as cursoFitoterapiaChinData } from "@/features/cursos/data/cursoFitoterapiaChinContent";

export default function CursoFitoterapiaChinHero({ embedded }: { embedded?: boolean }) {
  return (
    <CursoHeroPage
      storageKey="resinkra_curso_fitoterapia_chin_progress"
      modulos={cursoFitoterapiaChinData}
      courseTitle="Fitoterapia Chinesa"
      courseSubtitle="Matéria Médica e Fórmulas Clássicas"
      courseIcon={<TreePine size={28} />}
      coverImage={capaFitoterapiaChinesa}
      courseRoute="/curso-fitoterapia-chinesa"
      level="Avançado"
      description="Curso de Fitoterapia Chinesa com 7 módulos e 35 horas — classificação de ervas, fórmulas clássicas, combinações e prescrição segura."
      embedded={embedded}
    />
  );
}
