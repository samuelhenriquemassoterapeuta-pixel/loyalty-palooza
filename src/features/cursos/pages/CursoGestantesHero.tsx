import { Heart } from "lucide-react";
import capaGestantes from "@/assets/cursos/capa-gestantes.jpg";
import { CursoHeroPage } from "@/features/cursos/components/CursoHeroPage";
import { cursoGestantesData } from "@/features/cursos/data/cursoGestantesContent";

export default function CursoGestantesHero({ embedded }: { embedded?: boolean }) {
  return (
    <CursoHeroPage
      storageKey="resinkra_curso_gestantes_progress"
      modulos={cursoGestantesData}
      courseTitle="Massagem para Gestantes"
      courseSubtitle="Terapia Manual Segura para Gestantes e Puérperas"
      courseIcon={<Heart size={28} />}
      coverImage={capaGestantes}
      courseRoute="/curso-gestantes"
      level="Intermediário"
      description="Curso completo de Massagem para Gestantes com 6 módulos e 30 horas — técnicas seguras, contraindicações e protocolos por trimestre."
      embedded={embedded}
    />
  );
}
