import { Flame } from "lucide-react";
import capaVelas from "@/assets/cursos/capa-velas-aromaticas.jpg";
import { CursoHeroPage } from "@/features/cursos/components/CursoHeroPage";
import { cursoVelasAromaticasData } from "@/features/cursos/data/cursoVelasAromaticasContent";

export default function CursoVelasAromaticasHero({ embedded }: { embedded?: boolean }) {
  return (
    <CursoHeroPage
      storageKey="resinkra_curso_velas_aromaticas_progress"
      modulos={cursoVelasAromaticasData}
      courseTitle="Velas Aromáticas"
      courseSubtitle="Do iniciante ao avançado — fabricação e empreendedorismo"
      courseIcon={<Flame size={28} />}
      coverImage={capaVelas}
      coverVideo=""
      courseRoute="/curso-velas-aromaticas"
      level="Iniciante ao Avançado"
      description="Formação completa em velas aromáticas: dos fundamentos à fabricação avançada, aromaterapia, moldes, corantes, embalagem, precificação, marketing digital e gestão financeira. 98 horas de conteúdo."
      embedded={embedded}
    />
  );
}
