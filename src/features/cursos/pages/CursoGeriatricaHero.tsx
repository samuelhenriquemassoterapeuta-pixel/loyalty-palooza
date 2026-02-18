import { HeartHandshake } from "lucide-react";
import capaGeriatrica from "@/assets/cursos/capa-geriatrica.jpg";
import { CursoHeroPage } from "@/features/cursos/components/CursoHeroPage";
import { cursoGeriatricaData } from "@/features/cursos/data/cursoGeriatricaContent";

export default function CursoGeriatricaHero({ embedded }: { embedded?: boolean }) {
  return (
    <CursoHeroPage
      storageKey="resinkra_curso_geriatrica_progress"
      modulos={cursoGeriatricaData}
      courseTitle="Massagem Geriátrica"
      courseSubtitle="Terapia Manual Especializada para Idosos"
      courseIcon={<HeartHandshake size={28} />}
      coverImage={capaGeriatrica}
      courseRoute="/curso-geriatrica"
      level="Intermediário"
      description="Curso completo de Massagem Geriátrica com 7 módulos e 35 horas — adaptações, patologias comuns, cuidados paliativos e bem-estar na terceira idade."
      embedded={embedded}
    />
  );
}
