import { Dumbbell } from "lucide-react";
import capaEsportiva from "@/assets/cursos/capa-esportiva.jpg";
import { CursoHeroPage } from "@/features/cursos/components/CursoHeroPage";
import { cursoEsportivaData } from "@/features/cursos/data/cursoEsportivaContent";

export default function CursoEsportivaHero({ embedded }: { embedded?: boolean }) {
  return (
    <CursoHeroPage
      storageKey="resinkra_curso_esportiva_progress"
      modulos={cursoEsportivaData}
      courseTitle="Massagem Esportiva"
      courseSubtitle="Performance, Recuperação e Prevenção de Lesões"
      courseIcon={<Dumbbell size={28} />}
      coverImage={capaEsportiva}
      courseRoute="/curso-esportiva"
      level="Intermediário ao Avançado"
      description="Curso completo de Massagem Esportiva com 10 módulos e 50 horas — pré/pós-competição, liberação miofascial, crioterapia e protocolos por modalidade."
      embedded={embedded}
    />
  );
}
