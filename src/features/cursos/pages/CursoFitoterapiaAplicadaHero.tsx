import { Leaf } from "lucide-react";
import capaFitoterapiaAplicada from "@/assets/cursos/capa-fitoterapia-aplicada.jpg";
import { CursoHeroPage } from "@/features/cursos/components/CursoHeroPage";
import { cursoFitoterapiaAplicadaData } from "@/features/cursos/data/cursoFitoterapiaAplicadaContent";

export default function CursoFitoterapiaAplicadaHero({ embedded }: { embedded?: boolean }) {
  return (
    <CursoHeroPage
      storageKey="resinkra_curso_fitoterapia_aplicada_progress"
      modulos={cursoFitoterapiaAplicadaData}
      courseTitle="Fitoterapia Aplicada"
      courseSubtitle="Plantas Medicinais na Prática Clínica"
      courseIcon={<Leaf size={28} />}
      coverImage={capaFitoterapiaAplicada}
      courseRoute="/curso-fitoterapia-aplicada"
      level="Intermediário ao Avançado"
      description="Curso completo de Fitoterapia Aplicada com 8 módulos e 40 horas — formulações, protocolos fitoterápicos e integração com terapias manuais."
      embedded={embedded}
    />
  );
}
